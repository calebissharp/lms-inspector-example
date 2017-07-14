import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import './index.css';

import Uploader from '../Uploader';
import CourseTypeBox from '../CourseTypeBox';
import CourseAuthorBox from '../CourseAuthorBox';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1>LMS Inspector</h1>
        <Row>
          <Col xs={2}>
            <CourseTypeBox />
          </Col>
          <Col xs={2}>
            <CourseAuthorBox />
          </Col>
        </Row>
        {this.props.file.name}
        <Uploader />
        <Button bsStyle="primary">Upload</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.getIn(['file', 'file']),
});

export default connect(mapStateToProps)(App);
