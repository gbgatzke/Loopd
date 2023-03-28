import { useState, useEffect } from "react";
import useSequenceStore from "../stores/SequenceStore";
import useBpmStore from "../stores/BpmStore";
import useKitStore from "../stores/KitStore";
import Drums from "../testaudio/Drums";
import useSound from "use-sound";

import Grid from "./Grid";
import Toolbar from "./Toolbar";

function Sequencer() {
  const [sequence, updateSequence] = useSequenceStore((state) => [
    state.sequence,
    state.updateSequence,
  ]);
  const [bpm, updateBpm] = useBpmStore((state) => [state.bpm, state.updateBpm]);
  const currentKit = useKitStore((state) => state.currentKit);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = 16;
  const initialCellState = { triggered: false, activated: false };
  const initialState = [
    new Array(16).fill(initialCellState),
    new Array(16).fill(initialCellState),
    new Array(16).fill(initialCellState),
    new Array(16).fill(initialCellState),
  ];
  const timeoutInterval = 250 / (bpm / 60);
  const [kick1] = useSound(Drums.Kit1.kick);
  const [snare1] = useSound(Drums.Kit1.snare);
  const [hhclosed1] = useSound(Drums.Kit1.hhclosed);
  const [hhopen1] = useSound(Drums.Kit1.hhopen);

  const [kick2] = useSound(Drums.Kit2.kick);
  const [snare2] = useSound(Drums.Kit2.snare);
  const [hhclosed2] = useSound(Drums.Kit2.hhclosed);
  const [hhopen2] = useSound(Drums.Kit2.hhopen);

  useEffect(() => {
    updateSequence(initialState);
    updateBpm(120);
  }, []);

  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    updateSequence(sequenceCopy);
  };

  const triggerSample = (i) => {
    if (currentKit === "soundMap1") {
      const soundMap1 = [hhopen1, hhclosed1, snare1, kick1];
      const sample = soundMap1[i];
      sample();
    } else if (currentKit === "soundMap2") {
      const soundMap2 = [hhopen2, hhclosed2, snare2, kick2];
      const sample = soundMap2[i];
      sample();
    }
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
    updateSequence(sequence);
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

  return (
    <div className="sequencer-window">
      <h1 class="text-6xl font-semibold m-5 mb-16">Loopd!</h1>
      <Toolbar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentStep={setCurrentStep}
        initialState={initialState}
      />
      <div className="grid-window">
        <div class="flex items-stretch">
          <div class="ml-auto grid grid-cols-1 content-around">
            <p class="ml-auto">Open hat </p>
            <p class="ml-auto">Closed hat </p>
            <p class="ml-auto">Snare </p>
            <p class="ml-auto">Kick </p>
          </div>
          <div class="mr-auto">
            <Grid toggleStep={toggleStep}></Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sequencer;
