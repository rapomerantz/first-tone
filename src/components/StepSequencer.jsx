import React, { Component } from 'react'
import Tone from 'tone'; 
import '../App.css';



export default class StepSequencer extends Component {

  stopSequenceSynth = () => {
    Tone.Transport.stop(); 
  }

  render() {

    let synth = new Tone.Synth(); 
    
    synth.oscillator.type = 'sine';

    
    const gain = new Tone.Gain(0.6);
    gain.toMaster();
    synth.connect(gain); 
    
    let index = 0;

    Tone.Transport.scheduleRepeat('4n');
    Tone.Transport.start();

    //create a looped note event every half-note
    var note = new Tone.Event(function(time, pitch){
      synth.triggerAttackRelease(pitch, "16n", time);
    }, "C4");

    //set the note to loop every half measure
    note.set({
      "loop" : true,
      "loopEnd" : "2n"
    });

    //start the note at the beginning of the Transport timeline
    note.start(0);

    //stop the note on the 4th measure
    note.stop("4m");


    return (
      <div>
        <h2>Step Sequencer</h2>
        <div className="stepSequence" >
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
          <input type="checkbox"/>
        </div> 

        <button onClick={this.stopSequenceSynth}>stopSequenceSynth</button>


      </div>
    )
  }
}
