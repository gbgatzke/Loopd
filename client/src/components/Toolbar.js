import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PlayButton from "./PlayButton";
import BPM from "./BPM";
import Presets from "./Presets";
import UserSequences from "./UserSequences";

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
}) {
  // const [userSeqs, setUserSeqs] = useState([]);
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
        user_id: currentUser.id,
      };
      fetch("/sequences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sequenceObj),
      }).then((r) => {
        if (r.ok) {
          r.json().then((sequence) => {
            const newSequence = new Array(JSON.parse(sequence.sequence));
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
      <Presets
        presets={presets}
        setSequence={setSequence}
        setBpm={setBpm}
        initialState={initialState}
      />
      {userSeqs ? (
        <UserSequences
          userSeqs={userSeqs}
          setUserSeqs={setUserSeqs}
          setSequence={setSequence}
          setBpm={setBpm}
          deleteSequence={deleteSequence}
          initialState={initialState}
        />
      ) : null}
    </div>
  );
}

export default Toolbar;
