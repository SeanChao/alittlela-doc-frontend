import { Sheet } from './index';
import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WS_API = process.env.REACT_APP_WS_URL;

const SheetPage = (...props) => {
  // WebSocket config
  const socketUrl = `${WS_API}`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  // received message
  useMemo(() => {
    console.log(lastMessage);
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  let { filename } = useParams();
  const cellUpdateBefore = (...args) => {
    console.log(args);
  };
  const cellUpdated = (...args) => {
    console.log(args);
    sendMessage(JSON.stringify(args));
  };

  /**
   * Usage: Frame selection or trigger after setting selection
   * Parameter:
   * {Object} [sheet]: Current worksheet object
   * {Object | Array} [range]: Selection area, may be multiple selection areas
   */
  const rangeSelect = (...args) => {
    console.log('rangeSelect');
    console.log(args);
  };
  console.log('Connection: ' + connectionStatus);

  return (
    <>
      <Sheet
        options={{
          data: null,
          myFolderUrl: '/',
          title: filename,
          hook: { cellUpdateBefore, cellUpdated, rangeSelect },
        }}
        className="sheet-fullpage"
        {...props}
      />
    </>
  );
};

export default SheetPage;
