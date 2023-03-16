function BPM({ setBpm }) {
  const handleChange = (e) => {
    setBpm(e.target.value);
  };
  return (
    <div>
      <label htmlFor="bpm">Bpm: </label>
      <input name="bpm" onChange={handleChange} type="number"></input>
    </div>
  );
}

export default BPM;
