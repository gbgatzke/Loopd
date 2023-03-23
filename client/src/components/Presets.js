function Presets({
  presets,
  setSequence,
  initialState,
  setBpm,
  setCurrentKit,
}) {
  const handlePreset = (e) => {
    const presetSeq = presets.filter(
      (preset) => preset.name === e.target.value
    );
    if (e.target.value === "default") {
      setSequence(initialState);
      setBpm(120);
      setCurrentKit("soundMap1");
    }
    setSequence(JSON.parse(presetSeq[0].sequence));
    setBpm(presetSeq[0].bpm);
    setCurrentKit(presetSeq[0].kit);
  };

  const list = presets.map((preset) => (
    <option key={preset.id} value={preset.name}>
      {preset.name}
    </option>
  ));

  return (
    <div className="preset-div">
      <label htmlFor="presets" class="mb-1 block text-sm font-medium">
        Presets:{" "}
      </label>
      <select name="presets" onChange={handlePreset} class="block w-50 rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50">
        <option value="default">Default</option>
        {list}
      </select>
    </div>
  );
}
export default Presets;
