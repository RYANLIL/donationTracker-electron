/// <reference types="vite/client" />

import { IPerson, PersonInfo } from "models/Persons";

declare global {
  interface Window {
    // expose in the `electron/preload/index.ts`
    ipcRenderer: import("electron").IpcRenderer;
    fileOps: {
      saveData: (data) => void;
      getAllPersons: () => Promise<IPerson[]>;
      getPersonDetails: (id) => Promise<PersonInfo>;
    };
  }
}
