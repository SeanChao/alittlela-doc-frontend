/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

/**
 * compare the previous and next props and determine whether to update the component
 * true: equal, do not update
 * false: not equal, update
 */
const sheetPropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.data == nextProps.data &&
    prevProps.myFolderUrl == nextProps.myFolderUrl &&
    prevProps.title == nextProps.title
  );
};
/**
 * Lucksheet instance
 * options.data: sheet file data, ref: https://mengshukeji.github.io/LuckysheetDocs/guide/config.html
 *
 * @param {*} options luckysheet configuration options
 * @param  {...any} props other HTML props
 * @returns
 */
const Sheet = React.memo(function SheetComponent({ options, ...props }) {
  useEffect(() => {
    const luckysheet = window.luckysheet;
    luckysheet.create({
      container: 'luckysheet',
      plugins: ['chart'],
      ...options,
    });
  });
  return <div id="luckysheet" {...props}></div>;
}, sheetPropsEqual);

export default Sheet;
