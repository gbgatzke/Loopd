

function SelectKit({ setCurrentKit }) {
    return(
        <div className='kit-div'>
            <label>Kit: </label>
            <select onChange={(e) => setCurrentKit(e.target.value)}>
                <option value='soundMap1'>808</option>
                <option value='soundMap2'>FR6</option>
            </select>
        </div>
    )
}

export default SelectKit