import { useState, useEffect } from "react";
import useUserSeqStore from "../stores/UserSeqStore";
import useSequenceStore from "../stores/SequenceStore";
import useBpmStore from "../stores/BpmStore";
import useKitStore from "../stores/KitStore";

function UserSequences({ initialState }) {
  const updateSequence = useSequenceStore((state) => state.updateSequence);
  const [userSeqs, fetchSeqs, deleteSequence] = useUserSeqStore((state) => [
    state.userSeqs,
    state.fetchSeqs,
    state.deleteSequence,
  ]);
  const updateBpm = useBpmStore((state) => state.updateBpm);
  const updateKit = useKitStore((state) => state.updateKit);

  const [currentOption, setCurrentOption] = useState(false);
  const [currentSequence, setCurrentSequence] = useState(null);

  useEffect(() => {
    fetchSeqs();
  }, []);
  const seqs = userSeqs.map((seq) => (
    <option key={seq.id} value={seq.name}>
      {seq.name}
    </option>
  ));

  const handleChange = (e) => {
    if (e.target.value === "default") {
      updateSequence(initialState);
      updateBpm(120);
      setCurrentOption(false);
      updateKit("soundMap1");
    } else {
      const selected = userSeqs.filter((seq) => seq.name === e.target.value);
      setCurrentSequence(selected);
      updateSequence(JSON.parse(selected[0].sequence));
      updateBpm(selected[0].bpm);
      updateKit(selected[0].kit);
      setCurrentOption(true);
    }
  };

  const handleClick = () => {
    deleteSequence(currentSequence[0].id);
    updateSequence(initialState);
    setCurrentOption(false);
  };

  return (
    <div className="userseq-div">
      <label
        htmlFor="user-seqs"
        class="ml-auto mr-auto mb-1 block text-sm font-medium"
      >
        My sequences:{" "}
      </label>
      <select
        name="user-seqs"
        onChange={handleChange}
        class="block mr-auto ml-auto w-50 rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-black"
      >
        <option value="default">Default</option>
        {seqs}
      </select>
      {currentOption ? (
        <button onClick={handleClick} className="button">
          Delete this sequence?
        </button>
      ) : null}
    </div>
  );
}

export default UserSequences;
