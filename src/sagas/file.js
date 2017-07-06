import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { FileInspector } from '../util/fileInspector';
import * as fileActions from '../actions/file';
import * as metadataActions from '../actions/metadata';

export function* inspectFile(action) {
  const courseType = yield call(FileInspector.inspect, action.file);
  yield put(metadataActions.setCourseType(courseType));
}

export default function* fileSaga() {
  yield takeLatest(fileActions.SET_FILE, inspectFile);
}