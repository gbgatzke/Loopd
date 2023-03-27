import { useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../stores/UserStore";
import useSequenceStore from "../stores/SequenceStore";
import useUserSeqStore from "../stores/UserSeqStore";
import useBpmStore from "../stores/BpmStore";
import useKitStore from "../stores/KitStore";

import PlayButton from "./PlayButton";
import BPM from "./BPM";
import Presets from "./Presets";
import UserSequences from "./UserSequences";
import SelectKit from "./SelectKit";

function Toolbar({ isPlaying, setIsPlaying, setCurrentStep, initialState }) {
  const sequence = useSequenceStore((state) => state.sequence);
  const currentUser = useUserStore((state) => state.zuUser);
  const [userSeqs, updateSeqs] = useUserSeqStore((state) => [
    state.userSeqs,
    state.updateSeqs,
  ]);
  const bpm = useBpmStore((state) => state.bpm);
  const currentKit = useKitStore((state) => state.currentKit);
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
            updateSeqs([...userSeqs, sequence]);
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

  return (
    <div className="toolbar">
      <div className="toolbar-top">
        <Presets initialState={initialState} />
        {userSeqs ? <UserSequences initialState={initialState} /> : null}
        <span className="save-button">
          <button className="button" onClick={handleSave}>
            {saveModeOn ? "Save it!" : "Save this sequence?"}
          </button>
          {saveModeOn ? (
            <input
              onChange={(e) => setSequenceName(e.target.value)}
              type="text"
              placeholder="Name your sequence"
              class="block w-50 rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            ></input>
          ) : null}
        </span>
      </div>
      <div className="toolbar-bottom">
        <PlayButton isPlaying={isPlaying} onClick={handleClick} />
        <BPM />
        <SelectKit />
      </div>
    </div>
  );
}

export default Toolbar;
