function Presets({ presets, setSequence, initialState, setBpm, setCurrentKit }) {
  const handlePreset = (e) => {
    const presetSeq = presets.filter(
      (preset) => preset.name === e.target.value
    );
    if (e.target.value === "default") {
      setSequence(initialState);
      setBpm(120);
      setCurrentKit('soundMap1')
    }
    setSequence(JSON.parse(presetSeq[0].sequence));
    setBpm(presetSeq[0].bpm);
    setCurrentKit(presetSeq[0].kit)
  };

  const list = presets.map((preset) => (
    <option key={preset.id} value={preset.name}>
      {preset.name}
    </option>
  ));

  return (
    <div className='preset-div'>
      <label htmlFor="presets">Presets: </label>
      <select name="presets" onChange={handlePreset}>
        <option value="default">Default</option>
        {list}
      </select>
    </div>
  );
}
export default Presets;
