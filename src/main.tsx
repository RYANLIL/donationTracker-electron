import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./demos/ipc";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Setting app version to window title
const setAppVersion = (
  _event: Electron.IpcRendererEvent,
  arg1: {
    appVersion: string;
    date: string;
  }
) => {
  console.log("[Receive Main-process message]:", arg1);
  document.title = `DRTracker v${arg1.appVersion}`;
};
window.ipcRenderer.on("main-process-message", setAppVersion);
