import PlayButton from "./PlayButton"
import BPM from './BPM'

function Toolbar({ isPlaying, setIsPlaying, setBpm }) {
    return(
        <div>
            <PlayButton isPlaying={isPlaying} onClick={() => setIsPlaying(!isPlaying)}/>
            <BPM setBpm={setBpm}/>
            {/* <TrackList /> */}
        </div>
    )
}

export default Toolbar