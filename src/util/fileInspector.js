import JSZip from 'jszip';
import pako from 'pako';

const fileTypes = {
  'zip': [0x50, 0x4b, 0x03, 0x04],
  'gzip': [0x1f, 0x8b, 0x08],
}

export const FileInspector = {
  inspect(file) { 
    return FileInspector.getFileBytes(file)
      .then(FileInspector.uncompress);
  },
  determineCompression(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);

    for (const type in fileTypes) {
      if (!fileTypes.hasOwnProperty(type)) continue;

      const firstByte = fileTypes[type][0];
      if(firstByte === bytes[0]) { return type }
    }
  },
  getFileBytes(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = evt => {
        if (evt.target.readyState === FileReader.DONE) {
          resolve(reader.result);
        } else {
          reject('could not get bytes');
        }
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  },
  uncompress(arrayBuffer, compressionType) {
    return new Promise((resolve, reject) => {
      const bytes = new Uint8Array(arrayBuffer);

      // if no compression type is given, determine compression type
      if (!compressionType) {
        compressionType = FileInspector.determineCompression(arrayBuffer);
      }

      if (compressionType === 'gzip') {
        const result = pako.inflate(bytes);
        resolve(result);
      } else if (compressionType === 'zip') {
        const zip = new JSZip();

        zip.loadAsync(arrayBuffer)
          .then(() => {
            zip.forEach((relativePath, zipEntry) => {
              const lms = FileInspector.checkForLMS(zipEntry);
              if(lms) resolve(lms);
            });
          });
      }
    });
  },
  checkForLMS(file) {
    const name = file.name;
    if(name.includes('moodle')) return 'moodle';
    if(name.includes('bb-')) return 'blackboard';
    if(name.includes('brainhoneymanifest')) return 'buzz';
    if(name.includes('d2l')) return 'd2l';
  },
};