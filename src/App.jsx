import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tone from 'tone'; 

import BasicSynth from './components/BasicSynth.jsx'
import StepSequencer from './components/StepSequencer.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <BasicSynth />
          {/* <hr/> */}
          {/* <StepSequencer /> */}
        </div>
      </div>
    );
  }
}

export default App;
