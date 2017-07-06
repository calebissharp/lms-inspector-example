import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import './index.css'

import * as fileActions from '../../actions/file';

export class Uploader extends Component {
  constructor(props) {
    super(props);
    
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    this.props.setFile(file.name, file);
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop} className="Uploader">
        <p className="Uploader-text">Drag or click here to upload files.</p>
      </Dropzone>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setFile(filename, file) {
    dispatch(fileActions.setFile(filename, file));
  },
});

export default connect(null, mapDispatchToProps)(Uploader);