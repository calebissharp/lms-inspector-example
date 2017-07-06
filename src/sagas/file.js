import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { FileInspector } from '../util/fileInspector';
import * as fileActions from '../actions/file';
import * as metadataActions from '../actions/metadata';

function* inspectFile(action) {
  try {
    const courseType = yield call(FileInspector.inspect, action.file);
    yield put(metadataActions.setCourseType(courseType));
  } catch (e) {

  }
}

export default function* fileSaga() {
  yield takeLatest(fileActions.SET_FILE, inspectFile);
}