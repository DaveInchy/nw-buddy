import {
  OWGames,
  OWGameListener,
  OWWindow
} from '@overwolf/overwolf-api-ts';

import { WindowNames, GameClassIds, logMessage } from "../consts";

import RunningGameInfo = overwolf.games.RunningGameInfo;
import AppLaunchTriggeredEvent = overwolf.extensions.AppLaunchTriggeredEvent;

class BackgroundController {
  private static _instance: BackgroundController;
  private _windows: Record<string, OWWindow> = {};
  private _gameListener: OWGameListener;

  private constructor() {
    // Populating the background controller's window dictionary
    this._windows[WindowNames.overlay] = new OWWindow(WindowNames.overlay);
    this._windows[WindowNames.console] = new OWWindow(WindowNames.console);

    // When a a supported game game is started or is ended, toggle the app's windows
    this._gameListener = new OWGameListener({
      onGameStarted: this.toggleWindows.bind(this),
      onGameEnded: this.toggleWindows.bind(this)
    });

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
      this._windows[WindowNames.console].restore() && logMessage("info", "Console window restored");
      this._windows[WindowNames.overlay].restore() && logMessage("info", "Overlay window restored");
    }
  }

  private async onAppLaunchTriggered(e: AppLaunchTriggeredEvent) {
    logMessage("event", `App launch triggered: ${JSON.stringify(e)}`);

    if (!e || e.origin.includes('gamelaunchevent')) {
      return;
    }

    if (await this.isSupportedGameRunning()) {
      this._windows[WindowNames.overlay].restore();
      this._windows[WindowNames.console].restore();
    } else {
      this._windows[WindowNames.console].close();
      this._windows[WindowNames.overlay].close();
    }
  }

  private toggleWindows(info: RunningGameInfo) {
    logMessage("event", `toggleWindows triggered.`);
    if (!info || !this.isSupportedGame(info)) {
      return;
    }

    if (info.isRunning) {
      this._windows[WindowNames.overlay].restore();
      this._windows[WindowNames.console].restore();
    } else {
      this._windows[WindowNames.console].close();
      this._windows[WindowNames.overlay].close();
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
