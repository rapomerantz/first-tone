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
        <BasicSynth />

        <hr/>
        {/* <StepSequencer /> */}
      </div>
    );
  }
}

export default App;
