// import Kick from "../testaudio/kick.wav";
// import Snare from "../testaudio/snare.wav";
// import ClosedHH from "../testaudio/hh_closed.wav";
// import OpenHH from "../testaudio/hh_open-1.wav";
// import Drums from '../testaudio/Drums'
// import useSound from "use-sound";
// import { useEffect } from "react";

function Pad() {
  // const [kick] = useSound(Kit1.kick);
  // const [snare] = useSound(Kit1.snare);
  // const [hhclosed] = useSound(Kit1.hhclosed);
  // const [hhopen] = useSound(Kit1.hhopen);

  // console.log(Kit1)

  // useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     console.log(e.key)
  //     if (e.key === "f") {
  //       kick();
  //     } else if (e.key === "g") {
  //       snare();
  //     } else if (e.key === "h") {
  //       hhclosed();
  //     } else if (e.key === "j") {
  //       hhopen();
  //     } else {
  //       return null
  //     }
  //   });
  // }, []);

  return (
    <div className="pad">
      {/* <button className="pad-button" onClick={kick}>
        Kick
      </button>
      <button className="pad-button" onClick={snare}>
        Snare
      </button>
      <button className="pad-button" onClick={hhclosed}>
        OpenHat
      </button>
      <button className="pad-button" onClick={hhopen}>
        ClosedHat
      </button> */}
    </div>
  );
}

export default Pad;
