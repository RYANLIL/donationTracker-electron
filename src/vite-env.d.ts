/// <reference types="vite/client" />

import { IPerson } from "models/Persons";

declare global {
  interface Window {
    // expose in the `electron/preload/index.ts`
    ipcRenderer: import("electron").IpcRenderer;
    fileOps: {
      saveData: (data) => void;
      getAllPersons: () => Promise<IPerson[]>;
    };
  }
}
