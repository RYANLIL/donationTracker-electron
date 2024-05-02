import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import { showSaveDialogBox } from "./dialogs";

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
            console.log("Open menu");
            showSaveDialogBox(browserWindow);
          },
        },
        { label: "exit", role: "close" },
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
