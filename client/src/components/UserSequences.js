import { useState } from "react";

function UserSequences({
  userSeqs,
  setSequence,
  setBpm,
  deleteSequence,
  initialState,
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
      setCurrentOption(false)
    } else {
      const selected = userSeqs.filter((seq) => seq.name === e.target.value);
      console.log(selected);
      setCurrentSequence(selected);
      setSequence(JSON.parse(selected[0].sequence));
      setBpm(selected[0].bpm);
      setCurrentOption(true)
    }
  };

  const handleClick = () => {
    deleteSequence(currentSequence[0].id);
    setSequence(initialState);
    setCurrentOption(false)
  };

  return (
    <div>
      <label htmlFor="user-seqs">My sequences: </label>
      <select name="user-seqs" onChange={handleChange}>
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
