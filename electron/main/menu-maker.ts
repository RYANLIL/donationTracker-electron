import { app, Menu, MenuItem, MenuItemConstructorOptions } from "electron";

const isMac = process.platform === "darwin";

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
        label: "Open FIle",
        click: () => {
          console.log("Open menu");
          //doOpenFIle();
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
const contextMenuTemplate: MenuItemConstructorOptions[] = [
  { role: "copy" },
  { role: "paste" },
];

export const mainMenu = Menu.buildFromTemplate(template);
export const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
