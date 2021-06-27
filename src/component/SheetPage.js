import { Sheet } from './index';
import React from 'react';
import { useParams } from 'react-router';

const SheetPage = () => {
  let { filename } = useParams();
  return (
    <Sheet
      options={{ data: null, myFolderUrl: '/', title: filename }}
      className="sheet-fullpage"
    />
  );
};

export default SheetPage;
