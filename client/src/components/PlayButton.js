
function PlayButton({ isPlaying, onClick }) {
    return(
        <button className='button' onClick={onClick}>{isPlaying ? 'Stop' : 'Play'}</button>
    )
}

export default PlayButton