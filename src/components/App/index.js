import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import './index.css';

import Uploader from '../Uploader';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Button bsStyle="primary">Upload</Button>
        <Uploader />
      </div>
    );
  }
}

export default App;
