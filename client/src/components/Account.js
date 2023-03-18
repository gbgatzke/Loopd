import { useState } from "react";

function Account({ currentUser }) {
  const [editLive, setEditLive] = useState(false);

  if (!editLive) {
    return (
      <div>
        <h1>Account!</h1>
        <button onClick={() => setEditLive(!editLive)}>edit is falsery?</button>
      </div>
    );
  }
  return (
    <div>
        <h1>Edit Account!</h1>
        <form>
            <label htmlFor="name">Name: </label>
            <input name="name" value={currentUser.name}/>
            <label htmlFor="username">Username: </label>
            <input name="username" value={currentUser.username}/>
            <button>Save changes!</button>
        </form>
    </div>
  
  );
}

export default Account;
