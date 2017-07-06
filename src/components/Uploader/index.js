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
      <div className="Uploader">
        <Dropzone onDrop={this.onDrop} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setFile(filename, file) {
    dispatch(fileActions.setFile(filename, file));
  },
});

export default connect(null, mapDispatchToProps)(Uploader);