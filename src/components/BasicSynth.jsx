import React, { Component } from 'react';
import Tone from 'tone'; 
import '../App.css';


class BasicSynth extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      panner: 0,
      noteArray: [
        'a4', 'E4', 'G4',
        'C5', 'E5', 'G5',
      ], 
      noteCount: 3
    }
  }

  startSynth = (noteArray, noteCount) => () => {
    console.log(noteArray);
    const synth = new Tone.Synth(); 
    synth.oscillator.type = 'triangle'; 

    
    const gain = new Tone.Gain(0.5); 
    
    var panner = new Tone.Panner(this.state.panner);
    panner.toMaster();
    var feedbackDelay = new Tone.FeedbackDelay("32n", 0.5).connect(panner);
    gain.connect(feedbackDelay); 
    synth.connect(gain); //signal flow: synth -> gain -> master
    
    let index = 0; 
    
    function repeat(time) {
      let note = noteArray[index % noteCount]; 
      synth.triggerAttackRelease(note, '8n', time); 
      index++; 
    }

    //repeated event every 8th note
    Tone.Transport.scheduleRepeat(time => {
      repeat(time);
    }, '16n'); 

    // Tone.Transport.bpm.value = 200; 
    // Tone.Transport.bpm.value = Math.random() * (120 - 119) + 116

    
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

  setNoteCount = (newNoteCount) => () => {
    this.setState({
      noteCount: (newNoteCount)
    })
  }

  whack = () => {
    var feedbackDelay = new Tone.FeedbackDelay("8n", 0.9).toMaster();
    var tom = new Tone.MembraneSynth({
      "octaves" : 4,
      "pitchDecay" : 0.1
    }).connect(feedbackDelay);
    tom.triggerAttackRelease("A2","32n");
  }


  render() {


    Tone.Transport.bpm.value = Math.random() * (120 - 119) + 116

    return (
      <div className="App">
        <h1>Basic Synth</h1>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        

      <button onClick={this.startSynth(this.state.noteArray, this.state.noteCount)}> Start</button>
      <button onClick={this.stopSynth}> Stop</button>

      <br/>


      <button onClick={this.setPanning(-1)}> Left</button>
      <button onClick={this.setPanning(0)}> Center</button>
      <button onClick={this.setPanning(1)}> Right</button>

      <br/>

      <button onClick={this.setNoteArray([
        'C3', 'C3', 'b3',
        'C3', 'a3', 'G4',])}> 
        Low C
      </button>
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


      <br/>
      <br/>


      <button onClick={this.setNoteCount(1)}>1</button>
      <button onClick={this.setNoteCount(3)}>3</button>
      <button onClick={this.setNoteCount(4)}>4</button>
      <button onClick={this.setNoteCount(6)}>6</button>

      <br/>

      <button onClick={this.whack}>Whack</button>


      </div>
    );
  }
}

export default BasicSynth;
