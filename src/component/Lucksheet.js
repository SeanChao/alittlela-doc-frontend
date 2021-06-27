/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

/**
 * Lucksheet instance
 * options.data: sheet file data
 *
 * @param {*} options luckysheet configuration options
 * @param  {...any} props other HTML props
 * @returns
 */
const Sheet = ({ options, ...props }) => {
  useEffect(() => {
    const luckysheet = window.luckysheet;
    luckysheet.create({
      container: 'luckysheet',
      plugins: ['chart'],
      ...options,
    });
  });
  return <div id="luckysheet" {...props}></div>;
};

export default Sheet;
