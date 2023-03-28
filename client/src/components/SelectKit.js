import useKitStore from "../stores/KitStore";

function SelectKit() {
  const updateKit = useKitStore((state) => state.updateKit);
  return (
    <div className="kit-div">
      <label class="mb-1 block text-sm font-medium">Kit: </label>
      <select
        onChange={(e) => updateKit(e.target.value)}
        class="block rounded-md border-gray-300 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-black"
      >
        <option value="soundMap1">808</option>
        <option value="soundMap2">FR6</option>
      </select>
    </div>
  );
}

export default SelectKit;
