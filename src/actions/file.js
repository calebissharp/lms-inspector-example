export const SET_FILE = 'file/SET_FILE';

export const setFile = (filename, file) => ({
  type: SET_FILE,
  filename,
  file,
});