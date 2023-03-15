import Kick from '../testaudio/kick.wav'
import Snare from '../testaudio/snare.wav'
import ClosedHH from '../testaudio/hh_closed.wav'
import OpenHH from '../testaudio/hh_open-1.wav'
import useSound from 'use-sound'
import { useEffect } from 'react'

function Pad() {

    const [kick] = useSound(Kick)
    const [snare] = useSound(Snare)
    const [hhclosed] = useSound(ClosedHH)
    const [hhopen] = useSound(OpenHH)

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'f') {
                kick()
            } else if (e.key === 'g') {
                snare()
            } else if (e.key === 'h') {
                hhclosed()
            } else if (e.key === 'j') {
                hhopen()
            } else {
                return null
            }
        })
    },[])

    return(
        <div className="pad">
            <button 
                className="pad-button"
                onClick={kick}
            >Kick</button>
            <button 
                className="pad-button"
                onClick={snare}
            >Snare</button>
            <button 
                className="pad-button"
                onClick={hhclosed}
            >OpenHat</button>
            <button 
                className="pad-button"
                onClick={hhopen}
            >ClosedHat</button>
        </div>
    )
}

export default Pad