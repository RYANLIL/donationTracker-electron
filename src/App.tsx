import { useState } from "react";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.css";
import { AddFriendForm } from "./components/AddFriend";
import { FriendList } from "./components/FriendList";
import MainSummary from "./pages/main-page/MainSummary";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <AddFriendForm defaultAge={18} />
      <FriendList minAge={1} maxAge={220} /> */}

      <MainSummary />
    </div>
  );
}

export default App;
