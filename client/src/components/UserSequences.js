import { useState } from "react";

function UserSequences({
  userSeqs,
  setSequence,
  setBpm,
  deleteSequence,
  initialState,
  setCurrentKit,
}) {
  const [currentOption, setCurrentOption] = useState(false);
  const [currentSequence, setCurrentSequence] = useState(null);
  const seqs = userSeqs.map((seq) => (
    <option key={seq.id} value={seq.name}>
      {seq.name}
    </option>
  ));

  const handleChange = (e) => {
    if (e.target.value === "default") {
      setSequence(initialState);
      setBpm(120);
      setCurrentOption(false);
      setCurrentKit("soundMap1");
    } else {
      const selected = userSeqs.filter((seq) => seq.name === e.target.value);
      console.log(selected);
      setCurrentSequence(selected);
      setSequence(JSON.parse(selected[0].sequence));
      setBpm(selected[0].bpm);
      setCurrentKit(selected[0].kit);
      setCurrentOption(true);
    }
  };

  const handleClick = () => {
    deleteSequence(currentSequence[0].id);
    setSequence(initialState);
    setCurrentOption(false);
  };

  return (
    <div className="userseq-div">
      <label htmlFor="user-seqs" class="ml-auto mr-auto mb-1 block text-sm font-medium">
        My sequences:{" "}
      </label>
      <select
        name="user-seqs"
        onChange={handleChange}
        class="block mr-auto ml-auto w-50 rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
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
