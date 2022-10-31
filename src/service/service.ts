import {
  OWGames,
  OWGameListener,
  OWWindow,
  OWGameListenerDelegate
} from '@overwolf/overwolf-api-ts';

import { WindowNames, GameClassIds } from "../global";
import { logMessage, logError } from "../debug";
import RunningGameInfo = overwolf.games.RunningGameInfo;
import AppLaunchTriggeredEvent = overwolf.extensions.AppLaunchTriggeredEvent;

class BackgroundController {
  private static _instance: BackgroundController;
  private _windows: Record<string, OWWindow> = {};
  private _gameListener: OWGameListener;

  private constructor() {
    // Populating the background controller's window dictionary
    this._windows[WindowNames.overlay] = new OWWindow(WindowNames.overlay);
    this._windows[WindowNames.welcome] = new OWWindow(WindowNames.welcome);
  //  this._windows[WindowNames.generic] = new OWWindow(WindowNames.generic);

    // When a a supported game game is started or is ended, toggle the app's windows
    var deligation: OWGameListenerDelegate = {
      onGameStarted: (info: RunningGameInfo) => {
        if (this.isSupportedGame(info)) {
          this.toggleWindows(info);
        }
      },
      onGameEnded: (info: RunningGameInfo) => {
        if (this.isSupportedGame(info)) {
          this.toggleWindows(info);
        }
      }
    }
    this._gameListener = new OWGameListener(deligation);

    overwolf.extensions.onAppLaunchTriggered.addListener(
      e => this.onAppLaunchTriggered(e)
    );
  };

  public static instance(): BackgroundController {
    if (!BackgroundController._instance) {
      BackgroundController._instance = new BackgroundController();
    }

    return BackgroundController._instance;
  }

  // When running the app, start listening to games' status and decide which window should
  // be launched first, based on whether a supported game is currently running
  public async run() {
    this._gameListener.start();

    if (await this.isSupportedGameRunning()) {
      logMessage("info", "A supported game is running");
      this._windows[WindowNames.welcome].restore() && this._windows[WindowNames.welcome].maximize() && logMessage("info", "Welcome window restored");
      this._windows[WindowNames.overlay].restore() && this._windows[WindowNames.overlay].maximize() && logMessage("info", "Overlay window restored");
  //    this._windows[WindowNames.generic].restore() && this._windows[WindowNames.generic].maximize() && logMessage("info", "Desktop window restored");
    } else {
      this._windows[WindowNames.welcome].maximize() && this._windows[WindowNames.welcome].minimize() && logMessage("info", "Welcome window close");
      this._windows[WindowNames.overlay].maximize() && this._windows[WindowNames.overlay].minimize() && logMessage("info", "Overlay window close");
  //    this._windows[WindowNames.generic].maximize() && this._windows[WindowNames.generic].minimize() && logMessage("info", "Desktop window close");
    }
  }

  private async onAppLaunchTriggered(e: AppLaunchTriggeredEvent) {
    logMessage("event", `APP LAUNCHING => ${JSON.stringify(e)}`);

    if (!e) {
      return;
    }

    if (await this.isSupportedGameRunning()) {
      this._windows[WindowNames.overlay].restore();
      this._windows[WindowNames.welcome].restore();
  //    this._windows[WindowNames.generic].restore();
    } else {
      this._windows[WindowNames.welcome].minimize();
      this._windows[WindowNames.overlay].minimize();
    //  this._windows[WindowNames.generic].minimize();
    }

    if (e.origin.includes('gamelaunchevent')) {
      this._windows[WindowNames.overlay].maximize() && logMessage("info", "Minimap window restored");
    //  this._windows[WindowNames.generic].maximize() && logMessage("info", "Desktop window restored");
      this._windows[WindowNames.welcome].maximize() && logMessage("info", "Welcome window restored");
    }
  }

  private toggleWindows(info: RunningGameInfo) {
    if (!info || !this.isSupportedGame(info)) {
      return;
    }

    logMessage("event", `toggleWindows triggered.`);

    if (info.isRunning) {
      this._windows[WindowNames.overlay].restore();
      this._windows[WindowNames.welcome].restore();
      //this._windows[WindowNames.generic].restore();
    } else {
      //this._windows[WindowNames.generic].minimize();
      this._windows[WindowNames.welcome].minimize();
      this._windows[WindowNames.overlay].minimize();
    }
  }

  private async isSupportedGameRunning(): Promise<boolean> {
    const info = await OWGames.getRunningGameInfo();
    return info && info.isRunning && this.isSupportedGame(info);
  }

  // Identify whether the RunningGameInfo object we have references a supported game
  private isSupportedGame(info: RunningGameInfo) {
    return GameClassIds.includes(info.classId);
  }
}

BackgroundController.instance().run();
