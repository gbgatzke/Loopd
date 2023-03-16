import { useState } from "react";
import PlayButton from "./PlayButton";
import BPM from "./BPM";
import Presets from "./Presets";

function Toolbar({
  isPlaying,
  setIsPlaying,
  setBpm,
  setCurrentStep,
  saveSequence,
  presets,
  setSequence
}) {
  const [saveModeOn, setSaveMode] = useState(false);
  const [sequenceName, setSequenceName] = useState("");

  const handleStep = () => {
    if (isPlaying) {
      setCurrentStep(0);
    }
  };
  const handleClick = () => {
    setIsPlaying(!isPlaying);
    handleStep();
  };

  const handleSave = () => {
    if (!saveModeOn) {
      setSaveMode(true);
    } else {
      saveSequence(sequenceName);
      setSaveMode(false);
    }
  };
  return (
    <div className="toolbar">
      <PlayButton isPlaying={isPlaying} onClick={handleClick} />
      <BPM setBpm={setBpm} />
      <span className="save-button">
        <button className="button" onClick={handleSave}>
          {saveModeOn ? "Save it!" : "Save this sequence?"}
        </button>
        {saveModeOn ? (
          <input
            onChange={(e) => setSequenceName(e.target.value)}
            type="text"
            placeholder="Name your sequence"
          ></input>
        ) : null}
      </span>
      <Presets presets={presets} setSequence={setSequence}/>
    </div>
  );
}

export default Toolbar;
