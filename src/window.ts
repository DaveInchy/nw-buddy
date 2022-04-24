import { OWWindow } from "@overwolf/overwolf-api-ts";
import { logMessage, logError } from "./debug";

// A base class for the app's foreground windows.
// Sets the modal and drag behaviors, which are shared accross the desktop and in-game windows.
export class Window{
  protected currWindow: OWWindow;
  protected mainWindow: OWWindow;
  protected maximized: boolean = false;

  constructor(windowName) {
    this.mainWindow = new OWWindow('background');
    this.currWindow = new OWWindow(windowName);

    var header: HTMLElement;
    if(windowName !== 'overlay') {
      header = document.getElementById('header');
      const closeButton = document.getElementById('closeButton');
      const maximizeButton = document.getElementById('maximizeButton');
      const minimizeButton = document.getElementById('minimizeButton');

      closeButton.addEventListener('click', () => {
        this.currWindow.close();
      });

      minimizeButton.addEventListener('click', () => {
        this.currWindow.minimize();
      });

      maximizeButton.addEventListener('click', () => {
        if (!this.maximized) {
          this.currWindow.maximize();
        } else {
          this.currWindow.restore();
        }

        this.maximized = !this.maximized;
      });
    } else {
      header = document.getElementById('minimap-title');
    }
    this.setDrag(header);
  }

  public async getWindowState() {
    logMessage('info', `Getting window state for ${JSON.stringify(this.currWindow)}`);
    return await this.currWindow.getWindowState();
  }

  public async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }
}
