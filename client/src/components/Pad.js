import Drums from "../testaudio/Drums";
import useSound from "use-sound";
import { useState, useEffect } from "react";

import KeyTrigger from "./KeyTrigger";

function Pad() {
  const [currentKit, setCurrentKit] = useState("soundMap1");

  const [kick1] = useSound(Drums.Kit1.kick);
  const [snare1] = useSound(Drums.Kit1.snare);
  const [hhclosed1] = useSound(Drums.Kit1.hhclosed);
  const [hhopen1] = useSound(Drums.Kit1.hhopen);

  const [kick2] = useSound(Drums.Kit2.kick);
  const [snare2] = useSound(Drums.Kit2.snare);
  const [hhclosed2] = useSound(Drums.Kit2.hhclosed);
  const [hhopen2] = useSound(Drums.Kit2.hhopen);

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

  // useEffect(() => {
  //   console.log('useEffect called')
  //   document.addEventListener("keydown", (e) => {
  //     if (e.key === "f" && currentKit === "soundMap1") {
  //       return console.log('keydown')
  //     } else if (e.key === "f" && currentKit === "soundMap2") {
  //       return kick2();
  //     } else if (e.key === "g" && currentKit === "soundMap1") {
  //       return snare1();
  //     } else if (e.key === "h") {
  //       // return console.log(e.key);
  //     } else if (e.key === "j") {
  //       // return console.log(e.key);
  //     } else {
  //       return null;
  //     }
  //   });
  // }, [currentKit]);

  return (
    <div className="pad">
      <div class='mb-5'>
        <button className="pad-button" onClick={() => triggerSample(3)}>
          Kick
        </button>
        <button className="pad-button" onClick={() => triggerSample(2)}>
          Snare
        </button>
        <button className="pad-button" onClick={() => triggerSample(1)}>
          ClosedHat
        </button>
        <button className="pad-button" onClick={() => triggerSample(0)}>
          OpenHat
        </button>
      </div>

      <div className="kit-div">
        <label class="mb-1 block text-sm font-medium">Kit: </label>
        <select onChange={(e) => setCurrentKit(e.target.value)} class="block rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50">
          <option value="soundMap1">808</option>
          <option value="soundMap2">FR6</option>
        </select>
      </div>
    </div>
  );
}

export default Pad;
