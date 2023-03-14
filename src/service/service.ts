import { logError, logMessage } from "../debug";
import { GameClassIds, WindowNames } from "../global";

import {
  OWGames,
  OWGameListener,
  OWWindow,
  OWGameListenerDelegate
} from '@overwolf/overwolf-api-ts';

import RunningGameInfo = overwolf.games.RunningGameInfo;
import AppLaunchTriggeredEvent = overwolf.extensions.AppLaunchTriggeredEvent;

class BackgroundController {
  private static _instance: BackgroundController;
  private _windows: Record<string, OWWindow> = {};
  private _gameListener: OWGameListener;

  private constructor() {
    // Populating the background controller's window dictionary
    this._windows[WindowNames.splash] = new OWWindow(WindowNames.splash);
    this._windows[WindowNames.minimap] = new OWWindow(WindowNames.minimap);
    this._windows[WindowNames.worldmap] = new OWWindow(WindowNames.worldmap);

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

    overwolf.streaming.onStopStreaming.addListener(
      e => this.onStopStreaming(e)
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
      logMessage("window", "A supported game is running => Setup Overlay");
      this._windows[WindowNames.splash].restore() && this._windows[WindowNames.splash].maximize() && logMessage("window", "Splash window restored");
      this._windows[WindowNames.minimap].restore() && this._windows[WindowNames.minimap].maximize() && logMessage("window", "Minimap window restored");
      this._windows[WindowNames.worldmap].restore() && this._windows[WindowNames.worldmap].maximize() && logMessage("window", "Worldmap window restored");
    } else {
      this._windows[WindowNames.splash].maximize() && this._windows[WindowNames.splash].minimize() && logMessage("window", "Welcome window close");
      this._windows[WindowNames.minimap].maximize() && this._windows[WindowNames.minimap].minimize() && logMessage("window", "Minimap window close");
      this._windows[WindowNames.worldmap].maximize() && this._windows[WindowNames.worldmap].minimize() && logMessage("window", "Worldmap window close");
    }
  }

  private async onStopStreaming(e: overwolf.streaming.StopStreamingEvent) {
    if (!e) {
      return;
    }
    return;
  }

  private async onAppLaunchTriggered(e: AppLaunchTriggeredEvent) {
    logMessage("game", `Game Launching => ${JSON.stringify(e)}`);

    if (!e) {
      return;
    }

    if (await this.isSupportedGameRunning()) {
      this._windows[WindowNames.splash].restore();
      this._windows[WindowNames.minimap].restore();
      this._windows[WindowNames.worldmap].restore();
    } else {
      this._windows[WindowNames.splash].minimize();
      this._windows[WindowNames.minimap].minimize();
      this._windows[WindowNames.worldmap].minimize();
    }

    if (e.origin.includes('gamelaunchevent')) {
      this._windows[WindowNames.splash].maximize() && logMessage("window", "Splash window restored");
      this._windows[WindowNames.minimap].maximize() && logMessage("window", "Minimap window restored");
      this._windows[WindowNames.worldmap].maximize() && logMessage("window", "Worldmap window restored");
    }
  }

  private toggleWindows(info: RunningGameInfo) {
    if (!info || !this.isSupportedGame(info)) {
      return;
    }

    logMessage("event", `toggleWindows triggered.`);

    if (info.isRunning) {
      this._windows[WindowNames.splash].restore();
      this._windows[WindowNames.minimap].restore();
      this._windows[WindowNames.worldmap].restore();
    } else {
      this._windows[WindowNames.splash].minimize();
      this._windows[WindowNames.minimap].minimize();
      this._windows[WindowNames.worldmap].minimize();
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
