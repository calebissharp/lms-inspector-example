import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as metadataActions from '../../actions/metadata';

class CourseAuthorBox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.setCourseAuthor(e.target.value);
  }

  render() {
    return (
      <div className="CourseTypeBox">
        <FormControl
          type="text"
          value={this.props.courseType}
          placeholder="Course Author"
          onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Author: state.getIn(['metadata', 'course', 'author']),
});

const mapDispatchToProps = dispatch => ({
  setCourseAuthor(type) {
    dispatch(metadataActions.setCourseAuthor(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseAuthorBox);