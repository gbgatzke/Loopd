
function BPM({ setBpm }) {

    const handleChange = (e) => {
        setBpm(e.target.value)
    }
    return(
        <div>
            <input onChange={handleChange} type="number"></input>
        </div>
    )
}

export default BPM