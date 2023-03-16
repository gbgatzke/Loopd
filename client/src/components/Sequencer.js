import { useState, useEffect } from "react";
import Kick from "../testaudio/kick.wav";
import Snare from "../testaudio/snare.wav";
import ClosedHH from "../testaudio/hh_closed.wav";
import OpenHH from "../testaudio/hh_open-1.wav";
import useSound from "use-sound";

import Grid from "./Grid";
import Toolbar from "./Toolbar";

function Sequencer({ currentUser }) {
  const steps = 16;
  const initialCellState = { triggered: false, activated: false };

  const kickArray = new Array(16).fill(initialCellState);
  const snareArray = new Array(16).fill(initialCellState);
  const closedhhArray = new Array(16).fill(initialCellState);
  const openhhArray = new Array(16).fill(initialCellState);
  const initialState = [kickArray, snareArray, closedhhArray, openhhArray];

  const [sequence, setSequence] = useState(initialState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);

  const timeoutInterval = 250 / (bpm / 60);

  const [kick] = useSound(Kick);
  const [snare] = useSound(Snare);
  const [hhclosed] = useSound(ClosedHH);
  const [hhopen] = useSound(OpenHH);

  const soundMap = [hhopen, hhclosed, snare, kick];

  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    setSequence(sequenceCopy);
  };

  const triggerSample = (i) => {
    const sample = soundMap[i];
    sample();
  };

  const nextStep = (time) => {
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < sequence[i].length; j++) {
        const { triggered, activated } = sequence[i][j];
        sequence[i][j] = { activated, triggered: j === time };
        if (triggered && activated) {
          triggerSample(i);
        }
      }
    }
    setSequence(sequence);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
      }
    }, timeoutInterval);
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, isPlaying]);

  const saveSequence = (name) => {
    const sequenceObj = {
      name: name,
      sequence: sequence,
      bpm: bpm,
      user_id: currentUser.id,
    };

    console.log(sequenceObj.sequence);

    console.log(sequenceObj);
    fetch("/sequences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sequenceObj),
    }).then((r) => {
      if (r.ok) {
        r.json().then((sequence) => console.log(sequence));
      } else {
        r.json((errs) => console.log(errs));
      }
    });
    console.log("working on it!");
  };

  return (
    <div className="sequencer-window">
      <h1>Loopd!</h1>
      <Toolbar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setBpm={setBpm}
        setCurrentStep={setCurrentStep}
        saveSequence={saveSequence}
      />
      <Grid sequence={sequence} toggleStep={toggleStep}></Grid>
    </div>
  );
}

export default Sequencer;
