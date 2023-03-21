import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PlayButton from "./PlayButton";
import BPM from "./BPM";
import Presets from "./Presets";
import UserSequences from "./UserSequences";
import SelectKit from "./SelectKit";

function Toolbar({
  isPlaying,
  setIsPlaying,
  bpm,
  setBpm,
  setCurrentStep,
  sequence,
  presets,
  setSequence,
  initialState,
  currentUser,
  userSeqs,
  setUserSeqs,
  deleteSequence,
  setCurrentKit,
  currentKit,
}) {
  const [saveModeOn, setSaveMode] = useState(false);
  const [sequenceName, setSequenceName] = useState("");

  const navigate = useNavigate();

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
      const sequenceObj = {
        name: sequenceName,
        sequence: JSON.stringify(sequence),
        bpm: bpm,
        kit: currentKit,
        user_id: currentUser.id,
      };
      fetch("/sequences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sequenceObj),
      }).then((r) => {
        if (r.ok) {
          r.json().then((sequence) => {
            setUserSeqs([...userSeqs, sequence]);
            setSequenceName("");
          });
        } else {
          r.json((errs) => console.log(errs));
        }
      });
      setSaveMode(false);
      navigate("/sequencer");
    }
  };

  if (!currentUser) {
    <h1>Loading...</h1>;
  }

  return (
    <div className="toolbar">
      <div className="toolbar-top">
        <PlayButton isPlaying={isPlaying} onClick={handleClick} />
        <BPM bpm={bpm} setBpm={setBpm} />
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
      </div>

      <div className="toolbar-bottom">
        <Presets
          presets={presets}
          setSequence={setSequence}
          setBpm={setBpm}
          initialState={initialState}
          setCurrentKit={setCurrentKit}
        />
        {userSeqs ? (
          <UserSequences
            userSeqs={userSeqs}
            setUserSeqs={setUserSeqs}
            setSequence={setSequence}
            setBpm={setBpm}
            deleteSequence={deleteSequence}
            initialState={initialState}
            setCurrentKit={setCurrentKit}
          />
        ) : null}
        <SelectKit setCurrentKit={setCurrentKit} />
      </div>
    </div>
  );
}

export default Toolbar;
