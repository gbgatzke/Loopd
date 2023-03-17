function Presets({ presets, setSequence, initialState, setBpm }) {
  // console.log(presets)

  const handlePreset = (e) => {
    const presetSeq = presets.filter(
      (preset) => preset.name === e.target.value
    );
    if (e.target.value === "default") {
      setSequence(initialState);
      setBpm(120);
    }
    setSequence(JSON.parse(presetSeq[0].sequence));
    setBpm(presetSeq[0].bpm);
  };

  const list = presets.map((preset) => (
    <option key={preset.id} value={preset.name}>{preset.name}</option>
  ));

  return (
    <div>
      <label htmlFor="presets">Presets: </label>
      <select name="presets" onChange={handlePreset}>
        <option value="default">Default</option>
        {list}
      </select>
    </div>
  );
}
export default Presets;
