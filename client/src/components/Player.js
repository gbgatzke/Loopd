// import { useState, useEffect } from "react";
// import { Tone, Players } from "tone";

// function Player({ children }) {
//   const [player, setPlayer] = useState(null);
//   useEffect(() => {
//     const player = new Tone.Players(
//       {
//         BD: "./testaudio/kick.wav",
//         SN: "./testaudio/snare.wav",
//         OH: "./testaudio/hh_open-1.wav",
//         CH: "./testaudio/hh_closed.wav"
//       },
//       () => {
//         console.log("buffers loaded");
//         setPlayer(player);
//       }
//     ).toDestination();
//   }, []);

//   return children({ player });
// }

// export default Player;