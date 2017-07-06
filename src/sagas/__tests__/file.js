import { call, put, takeLatest } from 'redux-saga/effects';
import fileSaga, { inspectFile } from '../file';
import { FileInspector } from '../../util/fileInspector';
import * as metadataActions from '../../actions/metadata';
import * as fileActions from '../../actions/file';

const action = {
  file: {},
};

const gen = inspectFile(action);

it('inspects a file using FileInspector', () => {
  expect(gen.next().value).toEqual(call(FileInspector.inspect, action.file));
});

it('sets the course type after inspection', () => {
  const courseType = 'moodle'
  expect(gen.next(courseType).value).toEqual(put(metadataActions.setCourseType(courseType)));
});

it('watches for SET_FILE and then inspects the file', () => {
  expect(fileSaga().next().value).toEqual(takeLatest(fileActions.SET_FILE, inspectFile));
});