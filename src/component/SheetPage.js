import { Sheet } from './index';
import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import useWebSocket, { ReadyState } from 'react-use-websocket';

//const WS_API = process.env.REACT_APP_WS_URL;
let row=null,column=null;
let cancel=0;

const SheetPage = (...props) => {
  // WebSocket config
  let { filename,userid } = useParams();
  const  socketUrl='ws://localhost:8080/ws?user='+userid+'&path='+filename  //'wss://echo.websocket.org'  // `${WS_API}`;
  const loadUrl='http://localhost:8080/read?user='+userid+'&path='+filename

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  // received message
  useMemo(() => {
    console.log('lastMessage-----------------------------');
    if(lastMessage==null)
      return
    var data = JSON.parse(lastMessage.data)
    console.log(data)
    let cellData
    switch (data.action){
      case 'lock':
        //todo lock the cell
        console.log(data.user, ' lock ', data.sheet, '-', data.column, '-', data.row)
        if (data.user !== userid) {
          let value = window.luckysheet.getCellValue(data.row, data.column);
          cellData={}
          if(value!==null)
            cellData['v']=value
          cellData["bg"]='#808080'
          cellData["lock"]='1'
          window.luckysheet.setCellValue(data.row, data.column, cellData);
        }else{
          row=data.row
          column=data.column
          console.log(row,column)
        }
        break
      case 'unlock':
        console.log(data.user, ' unlock ', data.sheet, '-', data.column, '-', data.row);
        if (data.user !== userid) {
          let value = window.luckysheet.getCellValue(data.row, data.column);
          cellData={}
          if(value!==null)
            cellData['v']=value
          cellData["bg"]=null
          cellData["lock"]=null
          window.luckysheet.setCellValue(data.row, data.column, cellData);
        }else{
          row=null
          column=null
        }
        break;
      case 'write':
        //todo after writing, the cell lock will be release automatically
        console.log(data.user,' write ',data.sheet,'-',data.column,'-',data.row)
        cellData=JSON.parse(data.updateData)
        cellData["bg"]=null
        cellData["lock"]=null
        window.luckysheet.clearCell(data.row, data.column)
        window.luckysheet.setCellValue(data.row,data.column,cellData)
        if(data.user===userid){
          row=null
          column=null
        }
        break
      default:
        console.log('other message')
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  //write
  const cellUpdateBefore = (...args) => {
    console.log('update before------------------------------')
    if(cancel===1)
      cancel=0;
    console.log(args);
  };
  const cellUpdated = (...args) => {
    console.log('cell updated------------------------------')
    console.log(args);
    console.log(row,column)
    if(args[3]["lock"]!=='1'&&row===args[0]&&column===args[1]) {
      console.log('send write message');
      sendJsonMessage(constructWriteMessage(...args));
    }
  };
  //after write
  const  constructWriteMessage=(...args)=>{
    //[0]:row; [1]:column; [2]:before value; [3]:update value; [4]:bool? don't know
    let message = {}
    message['action'] = 'write';
    message['sheet']='Sheet1'//0 //todo how to get the sheet name?
    message['column'] = args[1];
    message['row'] = args[0];
    message['user'] = userid;
    message['path'] = filename;
    message['updateData']=JSON.stringify(args[3])
    console.log(message);
    return message
  }



  /**
   * Usage: Frame selection or trigger after setting selection
   * Parameter:
   * {Object} [sheet]: Current worksheet object
   * {Object | Array} [range]: Selection area, may be multiple selection areas
   */
    // attention : I use cellEditBefore instead of this one. because it's easier.
    // you can select a range of many cells, but can only edit a cell at once
  const rangeSelect = (...args) => {
    //get lock
    console.log('rangeSelect---------------------------');
      if(cancel===1) {
        cancel = 0;
        console.log('cancel')
        //cancel, so unlock
        sendJsonMessage(constructMessageFromRangeSelect(...args))
      }
  };
  const  constructMessageFromRangeSelect=(...args)=>{
    let message = {}
    message['action'] = 'unlock';
    message['sheet']="Sheet1"//0;//todo
    message['column'] = args[1][0].column[0];
    message['row'] = args[1][0].row[0];
    message['user'] = userid;
    message['path'] = filename;
    console.log(message);
    return message
  }


  const cellEditBefore = (...args) => {
    console.log('cellEditBefore---------------------------');
    //cannot get sheet name ??? emmmm, but setCellValue API needn't it too???
    console.log('column: ',args[0][0].column[0]);
    console.log('row: ',args[0][0].row[0]);
    sendJsonMessage(constructMessageFromCellEdit(...args));
    cancel=1;
  };
  const  constructMessageFromCellEdit=(...args)=>{
    let message = {}
    message['action'] = 'lock';
    message['sheet']="Sheet1"//0;//todo
    message['column'] = args[0][0].column[0];
    message['row'] = args[0][0].row[0];
    message['user'] = userid;
    message['path'] = filename;
    console.log(message);
    return message
  }

  console.log('Connection------------------------------: ' + connectionStatus);


  return (
    <>
      <Sheet
        options={{
          data: null,
          myFolderUrl: '/',
          loadUrl:loadUrl,
          title: filename,
          gridKey:filename,
          hook: { cellUpdateBefore, cellUpdated, rangeSelect,cellEditBefore },
        }}
        className="sheet-fullpage"
        {...props}
      />
    </>
  );
};

export default SheetPage;
