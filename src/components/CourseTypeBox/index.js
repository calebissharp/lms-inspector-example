import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as metadataActions from '../../actions/metadata';

class CourseTypeBox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.setCourseType(e.target.value);
  }

  render() {
    return (
      <div className="CourseTypeBox">
        <FormControl
          type="text"
          value={this.props.courseType}
          placeholder="Course Type"
          onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courseType: state.getIn(['metadata', 'course', 'type']),
});

const mapDispatchToProps = dispatch => ({
  setCourseType(type) {
    dispatch(metadataActions.setCourseType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseTypeBox);