export const SET_COURSE_TYPE = 'metadata/SET_COURSE_TYPE';
export const SET_COURSE_AUTHOR = 'metadata/SET_COURSE_AUTHOR';

export const setCourseType = courseType => ({
  type: SET_COURSE_TYPE,
  courseType,
});

export const setCourseAuthor = courseAuthor => ({
  type: SET_COURSE_AUTHOR,
  courseAuthor,
});