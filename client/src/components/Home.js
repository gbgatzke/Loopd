import { Link } from "react-router-dom";
import useUserStore from "../stores/UserStore";

function Home() {
  const currentUser = useUserStore((state) => state.zuUser);

  if (!currentUser) {
    return (
      <div>
        <h1 class="text-6xl font-semibold m-5">Please login!</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 class="text-6xl font-semibold m-5 mb-16">Welcome, {currentUser.name}!</h1>
      <Link to="/pad">
        <button className="button">Make sounds!</button>
      </Link>
      <Link to="/sequencer">
        <button className="button">Make a pattern!</button>
      </Link>
    </div>
  );
}

export default Home;
