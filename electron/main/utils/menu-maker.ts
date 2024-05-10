import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import { setBackUpLocationDialogBox, backUpDatabaseDialogBox } from "./dialogs";

const isMac = process.platform === "darwin";

export function setMainMenu(browserWindow: BrowserWindow) {
  const macMenuTemplate: MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }],
    },
  ];

  const windowsMenuTemplate: MenuItemConstructorOptions[] = [
    {
      label: "File",
      submenu: [
        {
          label: "BackUp Database",
          click: () => {
            backUpDatabaseDialogBox(browserWindow);
          },
        },
        {
          label: "Set Backup Location",
          click: () => {
            console.log("Choose Back Up Folder");
            setBackUpLocationDialogBox(browserWindow);
          },
        },
        { label: "Exit", role: "close" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "zoomIn" },
        { role: "zoomOut" },
        { role: "reload" },
        { role: "forceReload" },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Check for updates",
          click: () => browserWindow.webContents.send("check-for-update"),
        },
      ],
    },
  ];

  const template = [...(isMac ? macMenuTemplate : windowsMenuTemplate)];

  return Menu.buildFromTemplate(template);
  //Menu.setApplicationMenu(mainMenu);
}

export function setContextMenu() {
  const contextMenuTemplate: MenuItemConstructorOptions[] = [
    { role: "copy" },
    { role: "paste" },
  ];
  return Menu.buildFromTemplate(contextMenuTemplate);
}
