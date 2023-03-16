function PlayButton({ isPlaying, onClick }) {
  return (
    <button className="play-button" onClick={onClick}>
      {isPlaying ? "Stop" : "Play"}
    </button>
  );
}

export default PlayButton;
