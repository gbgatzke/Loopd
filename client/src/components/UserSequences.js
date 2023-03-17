function UserSequences({ userSeqs, setSequence }) {
  const seqs = userSeqs.map((seq) => (
    <option value={seq.name}>{seq.name}</option>
  ));

  const handleChange = (e) => {
    const selected = userSeqs.filter((seq) => seq.name === e.target.value);
    setSequence(JSON.parse(selected[0].sequence));
  };

  return (
    <div>
      <label htmlFor="user-seqs">My sequences: </label>
      <select name="user-seqs" onChange={handleChange}>
        <option value="default"></option>
        {seqs}
      </select>
    </div>
  );
}

export default UserSequences;
