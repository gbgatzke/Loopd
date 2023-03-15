import { useState, useEffect } from 'react'
import Kick from '../testaudio/kick.wav'
import Snare from '../testaudio/snare.wav'
import ClosedHH from '../testaudio/hh_closed.wav'
import OpenHH from '../testaudio/hh_open-1.wav'
import useSound from 'use-sound'

import Grid from './Grid'
import Toolbar from './Toolbar'

function Sequencer() {

    const steps = 16;
    const initialCellState = { triggered: false, activated: false };

    const kickArray = new Array(16).fill(initialCellState)
    const snareArray = new Array(16).fill(initialCellState)
    const closedhhArray = new Array(16).fill(initialCellState)
    const openhhArray = new Array(16).fill(initialCellState)
    const initialState = [
        kickArray, snareArray, closedhhArray, openhhArray
      ];

    const [ sequence, setSequence ] = useState(initialState)
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ currentStep, setCurrentStep ] = useState(0)
    const [ bpm, setBpm ] = useState(120)

    const timeoutInterval = 1000 / (bpm / 60)

    const [kick] = useSound(Kick)
    const [snare] = useSound(Snare)
    const [hhclosed] = useSound(ClosedHH)
    const [hhopen] = useSound(OpenHH)

    const soundMap = [kick, snare, hhclosed, hhopen]

    const toggleStep = (line, step) => {
        const sequenceCopy = [...sequence];
        const { triggered, activated } = sequenceCopy[line][step];
        sequenceCopy[line][step] = { triggered, activated: !activated };
        console.log("toggled");
        setSequence(sequenceCopy);
      };

      const nextStep = time => {
        for (let i = 0; i < sequence.length; i++) {
          for (let j = 0; j < sequence[i].length; j++) {
            const { triggered, activated } = sequence[i][j];
            sequence[i][j] = { activated, triggered: j === time };
            if (triggered && activated) {
              console.log(soundMap[i])
            }
          }
        }
        setSequence(sequence);
      };

      useEffect(() => {
        const timer = setTimeout(() => {
          if (isPlaying) {
            setCurrentStep((currentStep + 1) % steps);
            // nextStep(currentStep);
            console.log(currentStep)
          }
        }, timeoutInterval);
        return () => {
          clearTimeout(timer);
        };
      }, [currentStep, isPlaying]);

    return(
        <div>
            <Toolbar
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                setBpm={setBpm}
            />
            <Grid sequence={sequence}
            toggleStep={toggleStep}
            ></Grid>
        </div>
    )
}

export default Sequencer