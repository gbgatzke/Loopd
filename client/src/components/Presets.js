

function Presets({ presets, setSequence }) {

    console.log(presets)

    const handlePreset = (e) => {
        console.log(e.target.value)
    }

    const list = presets.map(preset =>
        <option value={preset.name}>{preset.name}</option>
    )

    return(
        <div>
            <select onChange={handlePreset}>
                {list}
            </select>
        </div>
    )
}
export default Presets