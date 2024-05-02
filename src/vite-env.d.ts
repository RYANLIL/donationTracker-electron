/// <reference types="vite/client" />

import { IPerson, PersonInfo } from "models/Persons";

declare global {
  interface Window {
    // expose in the `electron/preload/index.ts`
    ipcRenderer: import("electron").IpcRenderer;
    fileOps: {
      getAllPersons: () => Promise<IPerson[]>;
      getPersonDetails: (id: number) => Promise<PersonInfo>;
      savePersonDetails: (person: PersonInfo) => Promise<PersonInfo>;
    };
  }
}
