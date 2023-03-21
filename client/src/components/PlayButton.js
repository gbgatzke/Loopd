function PlayButton({ isPlaying, onClick }) {
  return (
    <div className="play-div">
      <button className="play-button" onClick={onClick}>
        {isPlaying ? "Stop" : "Play"}
      </button>
    </div>
  );
}

export default PlayButton;
