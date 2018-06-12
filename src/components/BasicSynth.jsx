import React, { Component } from 'react';
import Tone from 'tone'; 
import '../App.css';


class BasicSynth extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      panner: 0,
      noteArray: [
        'C4', 'E4', 'G4',
        'C5', 'E5', 'G5',
      ]
    }
  }

  startSynth = (noteArray) => () => {

    console.log(noteArray);
    
    const synth = new Tone.Synth(); 
    synth.oscillator.type = 'sine'; 

    const gain = new Tone.Gain(0.5); 

    var panner = new Tone.Panner(this.state.panner);
    panner.toMaster();
    gain.connect(panner); 
    synth.connect(gain); //signal flow: synth -> gain -> master

    let index = 0; 
    
    function repeat(time) {
      let note = noteArray[index % noteArray.length]; 
      synth.triggerAttackRelease(note, '8n', time); 
      index++; 
    }

    //repeated event every 8th note
    Tone.Transport.scheduleRepeat(time => {
      repeat(time);
    }, '8n'); 


    Tone.Transport.bpm.value = 200; 

    Tone.Transport.start(); 
  }

  stopSynth = () => {
    setTimeout(() => {
      Tone.Transport.stop(); 
    })
  }

  setPanning = (panValue) => () => {
    this.setState({
      panner: panValue,
    });
  }

  setNoteArray = (newArray) => () => {    
    this.setState({
      noteArray: newArray
    })
  }


  render() {

    

    return (
      <div className="App">
        <h1>Basic Synth</h1>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        

      <button onClick={this.startSynth(this.state.noteArray)}> Start</button>
      <button onClick={this.stopSynth}> Stop</button>
      <br/>
      <button onClick={this.setPanning(-1)}> Left</button>
      <button onClick={this.setPanning(0)}> Center</button>
      <button onClick={this.setPanning(1)}> Right</button>
      <br/>
      <button onClick={this.setNoteArray([
        'C4', 'E4', 'G4',
        'C5', 'E5', 'G5',])}> 
        C Maj
      </button>
      <button onClick={this.setNoteArray([
        'E4', 'F#4', 'G4',
        'D5', 'F#5', 'G5',])}> 
        C Lydian / E
      </button>
      <button onClick={this.setNoteArray([
        'C4', 'E4', 'G4',
        'C5', 'E5', 'G5',])}> 
        C Maj
      </button>




      </div>
    );
  }
}

export default BasicSynth;
