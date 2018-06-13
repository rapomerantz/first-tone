import React, { Component } from 'react';
import Tone from 'tone'; 
import '../App.css';
import BasicSynthButton from './BasicSynthButton'


class BasicSynth extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      panner: 0,
      noteArray: [
        'a4', 'E4', 'G4',
        'C5', 'E5', 'G5',
      ], 
      noteCount: 3,
      eigthNoteToggle: true,
      delay: true
    }
  }

  startSynth = (noteArray, noteCount, reverse) => () => {
    
//IF/ELSE STATEMENTS
    let delayMix; 
    if (reverse) {
      noteArray = noteArray.reverse(); 
    }
    if (this.state.delay) {
      delayMix = 0.5; 
    }
    else {
      delayMix = 0; 
    }

//CREATE NEW SYNTH
    const synth = new Tone.Synth(); 
    synth.oscillator.type = 'sine'; 

//DEFINE SIGNAL PATH
    let gain = new Tone.Gain(0.5); 
    let panner = new Tone.Panner(this.state.panner);
    let feedbackDelay = new Tone.FeedbackDelay("32n", delayMix).connect(panner);

    synth.connect(gain); //signal flow: synth -> gain -> master
    gain.connect(feedbackDelay); 
    panner.toMaster();
    

//DEFINE ARPEGGIO
    let index = 0; 
    function repeat(time) {
      let note = noteArray[index % noteCount]; 
      synth.triggerAttackRelease(note, '8n', time); 
      index++; 
    }

    //repeated event every 16TH note
    Tone.Transport.scheduleRepeat(time => {
      repeat(time);
      this.setState({
        eigthNoteToggle: !this.state.eigthNoteToggle
      })
    }, '16n'); 

    // Tone.Transport.bpm.value = 200; 
    // Tone.Transport.bpm.value = Math.random() * (120 - 119) + 116
    Tone.Transport.start(); 
    console.log(Tone.Transport)
  }

  stopSynth = () => {
    setTimeout(() => {
      Tone.Transport.stop(); 
    })
  }

  toggleDelay = () => {
    this.setState({
      delay: !this.state.delay
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
      noteCount: newNoteCount
    })
  }

  whack = () => {
    var feedbackDelay = new Tone.FeedbackDelay("8n", 0.0).toMaster();
    var tom = new Tone.MembraneSynth({
      "octaves" : 9,
      "pitchDecay" : Math.random() * (30 - 1) + 1
    }).connect(feedbackDelay);
    tom.triggerAttackRelease("A2","32n");
  }



  render() {    
    //TEMPO SET RANDOMLY UPON RENDER between 116-120
    Tone.Transport.bpm.value = Math.random() * (111 - 111) + 111

    let flasherDiv; 
    if (this.state.eigthNoteToggle) {
      flasherDiv = <div style={{ 'height': '5em', 
                                  'width': '5em', 
                                  'background-color': 'red',
                                  'border-radius': '10px' }}>
                                  1</div>
    } else {
      flasherDiv = <div style={{ 'height': '5em', 
                                  'width': '5em', 
                                  'background-color': 'green',
                                  'border-radius': '10px'  }}>
                                  2</div>
    }

    return (
      <div id="inner">
        <p id="stateStringify">{JSON.stringify(this.state, null, 2)}</p>
        <h1>Arpeggi</h1>
        {flasherDiv}

        
      <div id="startStop">
        <button onClick={this.startSynth(this.state.noteArray, this.state.noteCount, false)}>Start</button>
        <button onClick={this.stopSynth}>Stop</button>
      </div>

        <button onClick={this.startSynth(this.state.noteArray, this.state.noteCount, true)}>Start Reverse</button>
        <button onClick={this.toggleDelay}>Delay On/Off</button>
        
      <br/>

      <BasicSynthButton buttonArgument = '-1' buttonFunction={this.setPanning} buttonText='Left'/>
      <BasicSynthButton buttonArgument = '0' buttonFunction={this.setPanning} buttonText='Center'/>
      <BasicSynthButton buttonArgument = '1' buttonFunction={this.setPanning} buttonText='Right'/>

      <br/>

      <BasicSynthButton buttonArgument = {['c3', 'c3', 'c4',
                                          'c5', 'c3', 'G5',]} 
                        buttonFunction={this.setNoteArray} 
                        buttonText='Low C'/>
      <BasicSynthButton buttonArgument = {['c4', 'e4', 'G4',
                                          'c5', 'e5', 'G5',]} 
                        buttonFunction={this.setNoteArray} 
                        buttonText='C Maj'/>
      <BasicSynthButton buttonArgument = {['E4', 'F#4', 'G4',
                                          'D5', 'F#5', 'G5',]} 
                        buttonFunction={this.setNoteArray} 
                        buttonText='C Lydian / E'/>

      <br/>
      <br/>

      <BasicSynthButton buttonArgument = '1' buttonFunction={this.setNoteCount} buttonText='1'/>
      <BasicSynthButton buttonArgument = '2' buttonFunction={this.setNoteCount} buttonText='2'/>
      <BasicSynthButton buttonArgument = '3' buttonFunction={this.setNoteCount} buttonText='3'/>
      <BasicSynthButton buttonArgument = '4' buttonFunction={this.setNoteCount} buttonText='4'/>
      <BasicSynthButton buttonArgument = '5' buttonFunction={this.setNoteCount} buttonText='5'/>
      <BasicSynthButton buttonArgument = '6' buttonFunction={this.setNoteCount} buttonText='6'/>
      <BasicSynthButton buttonArgument = '7' buttonFunction={this.setNoteCount} buttonText='7'/>

      <br/>

      <button onClick={this.whack}>Whack</button>


      </div>
    );
  }
}

export default BasicSynth;
