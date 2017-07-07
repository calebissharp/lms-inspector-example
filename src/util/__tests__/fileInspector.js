import fs from 'fs';
import path from 'path';
import { FileInspector } from '../fileInspector';

// zip
const buzzArrayBuffer = new Uint8Array(fs.readFileSync(path.resolve(__dirname, 'samples/buzz.zip'))).buffer;
const blackboardArrayBuffer = new Uint8Array(fs.readFileSync(path.resolve(__dirname, 'samples/blackboard.zip'))).buffer;
const canvasArrayBuffer = new Uint8Array(fs.readFileSync(path.resolve(__dirname, 'samples/canvas.imscc'))).buffer;
const d2lArrayBuffer = new Uint8Array(fs.readFileSync(path.resolve(__dirname, 'samples/d2l.zip'))).buffer;
const moodleZipArrayBuffer = new Uint8Array(fs.readFileSync(path.resolve(__dirname, 'samples/moodle.zip'))).buffer;
// gzip
const moodleArrayBuffer = new Uint8Array(fs.readFileSync(path.resolve(__dirname, 'samples/moodle.mbz'))).buffer;

it('converts a file to an ArrayBuffer', () => {
  const buffer = new ArrayBuffer(10);
  const file = new File([buffer], 'filename');
  FileInspector.convertFileToArrayBuffer(file)
    .then(result => expect(buffer).toEqual(result));
});

it('can determine the kind of compression an ArrayBuffer has', () => {
  expect(FileInspector.determineCompression(buzzArrayBuffer)).toEqual('zip');
  expect(FileInspector.determineCompression(moodleArrayBuffer)).toEqual('gzip');
});

it('can uncompress a zip', () => {
  FileInspector.uncompressZip(buzzArrayBuffer)
    .then(files => expect(files[0]).toEqual('brainhoneymanifest.xml'));
});

it('can uncompress a gzip', () => {
  FileInspector.uncompressGzip(moodleArrayBuffer)
    .then(files => expect(files[0]).toEqual('activities/'));
});

it('can determine what kind of lms a list of files is for', () => {
  FileInspector.uncompressZip(buzzArrayBuffer)
    .then(files => expect(FileInspector.checkForLMS(files)).toEqual('buzz'));
  FileInspector.uncompressZip(blackboardArrayBuffer)
    .then(files => expect(FileInspector.checkForLMS(files)).toEqual('blackboard'));
  FileInspector.uncompressZip(canvasArrayBuffer)
    .then(files => expect(FileInspector.checkForLMS(files)).toEqual('canvas'));
  FileInspector.uncompressZip(d2lArrayBuffer)
    .then(files => expect(FileInspector.checkForLMS(files)).toEqual('d2l'));
  FileInspector.uncompressZip(moodleZipArrayBuffer)
    .then(files => expect(FileInspector.checkForLMS(files)).toEqual('moodle'));

  FileInspector.uncompressGzip(moodleArrayBuffer)
  .then(files => expect(FileInspector.checkForLMS(files)).toEqual('moodle'));
});

it('inspects a file', () => {
  FileInspector.inspect(new File([buzzArrayBuffer], 'buzz.zip'))
    .then(type => expect(type).toEqual('buzz'));
});