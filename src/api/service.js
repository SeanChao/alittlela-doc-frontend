import { get } from './request';
/**
 * 前后端交互：
create, delete
open, lock cell, update content, unlock cell, close file
trash bin
 */

/**
 * Home Page
 */

export const getFiles = () => {
  return get('/files');
};

/**
 * create a new spreadsheet
 * @param {string} filename the name of the new file
 */
export const createFile = (filename) => {
  return get('/create', { path: filename });
};

export const deleteFile = (filename) => {
  return get('/delete', { path: filename });
};

export const getBin = () => {
  return get('/bin');
};
