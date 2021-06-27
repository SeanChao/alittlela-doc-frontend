/**
 * 前后端交互：
create, delete
open, lock cell, update content, unlock cell, close file
trash bin
 */

/**
 * Home Page
 */

const mockFileList = [
  { filename: 'Awesome sheet!' },
  { filename: 'a little la' },
];

export const getFiles = () => {
  // TODO: HTTP Request
  return mockFileList;
};

/**
 * create a new spreadsheet
 * @param {string} filename the name of the new file
 */
export const createFile = (filename) => {
  // TODO: HTTP Request
  mockFileList.push({ filename: filename });
};

export const deleteFile = (filename) => {
  // TODO
  mockFileList.splice(
    mockFileList.findIndex((item) => item.filename === filename),
    1
  );
};
