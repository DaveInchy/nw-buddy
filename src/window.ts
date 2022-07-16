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

    this.setWindowBehavior()

    return this;
  }

  async setWindowBehavior() {
    try {
      if (!this.maximized) {
        this.currWindow.maximize();
      } else {
        this.currWindow.minimize();
      }
      this.maximized = !this.maximized;
    }
    catch (err) {
      logError(err);
    }

    return true;
  }

  async getWindowState() {
    logMessage('info', `Getting window state for ${JSON.stringify(this.currWindow)}`);
    return await this.currWindow.getWindowState();
  }

  async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }
}