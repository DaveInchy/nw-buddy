import "core-js";

import { OWWindow } from "@overwolf/overwolf-api-ts";
import { logMessage, logError } from "./debug";
import { WindowNames } from "./global";

export class Window
{
    protected _instance: OWWindow;
    protected _windows: Record<string, OWWindow> = {};
    public currWindow: OWWindow;

    public constructor(windowName)
    {
      this._windows[windowName] = new OWWindow(windowName);
      this.currWindow = this._windows[windowName];
      this._instance = this._windows[windowName];
      this.prepare();
      return;
    }

    public prepare() {
    {
        this.currWindow.getWindowState().then(
            (state) =>
            {
                if (state.window_state === "minimized")
                {
                    this.currWindow.maximize();
                } else
                {
                    this.currWindow.minimize();
                }
            }
        );
    }
  }
}

export default class WindowManager extends Window
{
  protected maximized: boolean = false;
  protected windowName: string;

  constructor(windowName) {
    super(windowName);

    this.windowName = windowName;

    var header: HTMLElement;
    if(windowName === WindowNames.desktop) {
      header = document.getElementById('header');
      const closeButton = document.getElementById('closeButton');
      const maximizeButton = document.getElementById('maximizeButton');
      const minimizeButton = document.getElementById('minimizeButton');

      closeButton.addEventListener('click', () => {
        this._windows[windowName].close();
      });

      minimizeButton.addEventListener('click', () => {
        this._windows[windowName].minimize();
      });

      maximizeButton.addEventListener('click', () => {
        if (!this.maximized) {
          this._windows[windowName].maximize();
        } else {
          this._windows[windowName].restore();
        }

        this.maximized = !this.maximized;
      });
    } else {
      header = document.getElementById('minimap-title');
    }
    this.setDrag(header);
  }

  public async getWindowState() {
    logMessage('info', `Getting window state for ${JSON.stringify(this._windows[this.windowName])}`);
    return await this._windows[this.windowName].getWindowState();
  }

  public async setDrag(elem) {
    this._windows[this.windowName].dragMove(elem);
  }
}
