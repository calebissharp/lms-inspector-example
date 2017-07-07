import JSZip from 'jszip';
import pako from 'pako';
import { TextDecoder, TextEncoder } from 'text-encoding';

export const FileInspector = {
  inspect: file => new Promise((resolve, reject) => {
    FileInspector.convertFileToArrayBuffer(file)
      .then(buffer => {
        const compression = FileInspector.determineCompression(buffer);

        if (compression === 'zip') {
          return FileInspector.uncompressZip(buffer)
        } else if (compression === 'gzip') {
          return FileInspector.uncompressGzip(buffer)
        }
      })
      .then(FileInspector.checkForLMS)
      .then(resolve);
  }), 
  convertFileToArrayBuffer: file => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject('Unable to read file');
    reader.readAsArrayBuffer(file);
  }),
  determineCompression: arrayBuffer => {
    const bytes = new Uint8Array(arrayBuffer);

    switch(bytes[0]) {
      case 0x50: return 'zip';
      case 0x1f: return 'gzip';
    };
  },
  uncompressZip: arrayBuffer => new Promise((resolve, reject) => {
    const zip = new JSZip();
    zip.loadAsync(arrayBuffer).then(() => {
      const files = [];
      zip.forEach((_, f) => files.push(f.name));
      resolve(files);
    });
  }),
  uncompressGzip: arrayBuffer => new Promise((resolve, reject) => {
    const uncompressed = pako.inflate(arrayBuffer);
    const string = new TextDecoder('utf-8').decode(uncompressed)
      .substring(0, 1300) // take only the first part of the file that contains filenames
      .replace(/\t|\d+|(f|c|d)\t|\?/g, '') // magical regexp to clean up messy uncompressed string
      .split(/\n/g) // split the string into an array of filenames
      .slice(1); // remove big empty first entry
    resolve(string);
  }),
  checkForLMS: filenames => {
    let result = '';

    filenames.forEach(name => {
      if(name.includes('course_settings')) result = 'canvas';
      if(name.includes('moodle') || name.includes('completion.xml')) result = 'moodle';
      if(name.includes('bb-')) result = 'blackboard';
      if(name.includes('brainhoneymanifest')) result = 'buzz';
      if(name.includes('d2l')) result = 'd2l';
    });

    return result;
  }
};