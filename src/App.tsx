import { useState } from "react";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.css";
import MainSummary from "./pages/main-page/MainSummary";
import Update from "./components/update";

function App() {
  return (
    <div className="App">
      <MainSummary />
      <Update />
    </div>
  );
}

export default App;
