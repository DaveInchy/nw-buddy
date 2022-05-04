import "core-js/actual";

import { OWWindow } from "@overwolf/overwolf-api-ts";
import { logError, logMessage } from './debug';
import { WindowNames } from "./global";

export default class owWindow {

  maximized: boolean;
  windowName: string;
  currWindow: OWWindow;
  mainWindow: OWWindow;

  constructor(windowName) {

    this.maximized = false;
    this.windowName = windowName;
    this.mainWindow = new OWWindow('background');
    this.currWindow = new OWWindow(windowName);

    return this;
  }



  async getWindowState() {
    logMessage('info', `Getting window state for ${JSON.stringify(this.currWindow)}`);
    return await this.currWindow.getWindowState();
  }

  async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }
}