import useSequenceStore from "../stores/SequenceStore";
import usePresetStore from "../stores/PresetStore";
import useBpmStore from "../stores/BpmStore";
import useKitStore from "../stores/KitStore";
import { useEffect } from "react";

function Presets({ initialState }) {
  const [presets, fetchPresets] = usePresetStore((state) => [
    state.presets,
    state.fetchPresets,
  ]);
  const updateSequence = useSequenceStore((state) => state.updateSequence);
  const updateBpm = useBpmStore((state) => state.updateBpm);
  const updateKit = useKitStore((state) => state.updateKit);

  useEffect(() => {
    fetchPresets();
  }, []);

  const handlePreset = (e) => {
    const presetSeq = presets.filter(
      (preset) => preset.name === e.target.value
    );
    if (e.target.value === "default") {
      updateSequence(initialState);
      updateBpm(120);
      updateKit("soundMap1");
    }
    updateSequence(JSON.parse(presetSeq[0].sequence));
    updateBpm(presetSeq[0].bpm);
    updateKit(presetSeq[0].kit);
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
      <select
        name="presets"
        onChange={handlePreset}
        class="block w-50 rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
      >
        <option value="default">Default</option>
        {list}
      </select>
    </div>
  );
}
export default Presets;
