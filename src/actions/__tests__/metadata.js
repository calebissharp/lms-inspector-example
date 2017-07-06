import * as metadataActions from '../metadata';

it('creates an action to set the course type', () => {
  const courseType = 'moodle';
  const expectedAction = {
    type: metadataActions.SET_COURSE_TYPE,
    courseType,
  };
  expect(metadataActions.setCourseType(courseType)).toEqual(expectedAction);
});

it('creates an action to set the course author', () => {
  const courseAuthor = 'me';
  const expectedAction = {
    type: metadataActions.SET_COURSE_AUTHOR,
    courseAuthor,
  };
  expect(metadataActions.setCourseAuthor(courseAuthor)).toEqual(expectedAction);
});