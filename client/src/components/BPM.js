import useBpmStore from "../stores/BpmStore";

function BPM() {
  const [bpm, updateBpm] = useBpmStore((state) => [state.bpm, state.updateBpm]);
  const handleChange = (e) => {
    updateBpm(e.target.value);
  };
  return (
    <div className="bpm">
      <label htmlFor="bpm" class="mb-1 block text-sm font-medium">
        Bpm:{" "}
      </label>
      <input
        name="bpm"
        onChange={handleChange}
        type="number"
        value={bpm}
        class="block w-12 rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
      ></input>
    </div>
  );
}

export default BPM;
