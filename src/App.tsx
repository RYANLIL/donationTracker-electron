import { useState } from "react";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.css";
import MainSummary from "./pages/main-page/MainSummary";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <MainSummary />
    </div>
  );
}

export default App;
