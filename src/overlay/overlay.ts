import {
  IOWGamesEventsDelegate,
  OWGames,
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";

import { Window } from "../window";
import {
  Hotkeys,
  WindowNames,
  GamesFeatures,
  GameClassId,
  Config,
  getCircularReplacer
} from "../consts";

import DataClient from "../database.client";
import DebugClient, { logMessage, logError } from "../debug.client";

import WindowState = overwolf.windows.WindowStateEx;
import owWindowState = WindowState;
import owRunningGameInfo = overwolf.games.RunningGameInfo;
import owEvents = overwolf.games.events;

import "./overlay.css";

// The window displayed in-game while a game is running.
class Overlay extends Window {
  private static _instance: Overlay;
  private _gameEventsListener: OWGamesEvents;

  public _gameInfoData: any;
  public _gameEventsData: any;

  // overwolf event registers
  private _owGameEventsListener: OWGamesEvents;
  private _owGameEventsDeligate: IOWGamesEventsDelegate;

  // storage of game data from the API
  public _gameId: number;
  public _gameData: Object | any;
  private _gameProcData: Object | any;
  private _gameEventData: Object | any;;

  _gameInfoUpdates: overwolf.Event<any>;
  _gameEventsUpdates: overwolf.Event<owEvents.NewGameEvents>;

  public _playerPosData: Array<string>; // needs formatting, look at drawCoords()
  public _playerCharacter: string; // character NAME
  public _playerLocation: any;
  public _player: any;
  public _playerList: any;

  private constructor() {
    super(WindowNames.overlay);
    logMessage("overlay", "window constructed");

    this.setToggleHotkeyBehavior();
    this.setToggleHotkeyText();
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new Overlay();
    }
    logMessage("overlay", "window registered successfully");
    return this._instance;
  }

  public async run() {
    logMessage("overlay", "window running");

    this.currWindow.maximize();
    await this.listenForEvents();

    // initialize the game data ??? is this needed?
    this._gameEventData = await this.getEventData();
    this._gameProcData = await this.getProcData();

    this._playerCharacter = this._gameEventData.res.game_info.player_name;
    this._playerLocation = this._gameEventData.res.game_info.location;
    this._playerPosData = this._playerLocation.split(",");

    this._player = {
      "user": this._playerCharacter,
      "x": this._playerPosData[1],
      "y": this._playerPosData[3],
      "z": this._playerPosData[5],
      "direction": this._playerPosData[13].toString()
    };

    DataClient.addPlayer(this._player);

    var ticksPerSecond = Number(1);
    while (true) {
      // Check if the game's cursor is active or not, hide the overlay if it is
      this._gameProcData.overlayInfo.isCursorVisible === true ? this.currWindow.minimize() && true : this.currWindow.maximize() && false;

      // update the game data
      await this.getProcData();

      // logMessage("debug", `${JSON.stringify(this._gameEventData)}`);
      // this._gameProcData = { "isInFocus": true, "isRunning": true, "allowsVideoCapture": true, "title": "New World", "displayName": "", "shortTitle": "", "id": 218161, "classId": 21816, "width": 1920, "height": 1080, "logicalWidth": 1920, "logicalHeight": 1080, "renderers": ["D3D11"], "detectedRenderer": "D3D11", "executionPath": "C:/Program Files (x86)/Steam/steamapps/common/New World/Bin64/NewWorld.exe", "sessionId": "1a25e84ec60a4498a8d03a75490654de", "commandLine": "\"\"", "type": 0, "typeAsString": "Game", "overlayInputHookError": false, "windowHandle": { "value": 70979940 }, "monitorHandle": { "value": 65537 }, "processId": 9428, "oopOverlay": false, "terminationUnixEpochTime": null, "overlayInfo": { "oopOverlay": false, "coexistingApps": [], "inputFailure": false, "hadInGameRender": true, "isCursorVisible": true, "exclusiveModeDisabled": false, "isFullScreenOptimizationDisabled": false }, "success": true }

      // update the game data
      await this.getEventData();

      // {"success":true,"status":"success","res":{"gep_internal":{"version_info":"{\"local_version\":\"191.0.24\",\"public_version\":\"191.0.24\",\"is_updated\":true}"},"game_info":{"world_name":"live-1-30-3","map":"NewWorld_VitaeEterna","location":"player.position.x,11139.12,player.position.y,7327.32,player.position.z,166.61,player.rotation.x,0,player.rotation.y,0,player.rotation.z,19,player.compass,E","player_name":"n'Adina"}}}

      // handle player location
      this._playerCharacter = this._gameEventData.res.game_info.player_name;
      this._playerLocation = this._gameEventData.res.game_info.location;
      this._playerPosData = this._playerLocation.split(",");

      this._player = {
        "user": this._playerCharacter,
        "x": this._playerPosData[1],
        "y": this._playerPosData[3],
        "z": this._playerPosData[5],
        "direction": this._playerPosData[13].toString()
      };

      this._playerList = DataClient.updatePlayer(this._player);

      // logMessage("info", `[overlay] player position: ${this._playerPosData}`);
      // logMessage("info", `[overlay] location '${this._gameEventData.res.game_info.location}'`);

      this.drawCoords();
      this.drawTime();
      this.drawTitle();

      //this._playerList = await this.requestPlayerList();
      //this._playerList !== undefined ? logMessage("info", `[overlay] player list: ${JSON.stringify(this._playerList)}`) : logError(`[overlay] player list: ${this._playerList}`);

      await this.wait(1000 / ticksPerSecond);
    }

  }

  public drawTitle() {
    const elem = document.getElementById("title");
    elem.innerHTML = `${Config[1].dock_button_title}`;
  }

  public async listenForEvents() {
    logMessage("overlay", "Registering event listeners");
    const gameFeatures = GamesFeatures.get(GameClassId);
    if (gameFeatures && gameFeatures.length) {
      this._gameInfoUpdates = overwolf.games.events.onInfoUpdates2;
      this._gameInfoUpdates.addListener(this.setProcData.bind(this));
      this._gameEventsUpdates = overwolf.games.events.onNewEvents;
      this._gameEventsUpdates.addListener(this.setEventData.bind(this));

      this._owGameEventsDeligate = {
        onNewEvents: (e) => {
          this.setEventData(e);
        },
        onInfoUpdates: (e) => {
          this.setProcData(e);
        }
      };

      this._owGameEventsListener = new OWGamesEvents(this._owGameEventsDeligate, await this.getRequiredFeatures());
      var result = this._owGameEventsListener.start() && true || false;
      while(!result)
      {
        logMessage("overlay", "event listeners failed to start, retry in 3 second");
        await this.wait(3000);
        result = await this.listenForEvents()
      }
      logMessage("overlay", "event listeners started");
      return result;
    }
  }

  public drawTime() {
    var elem = document.getElementById('minimap-current-time');
    var time = new Date();
    var hours: any = time.getUTCHours() + 1;
    var minutes: any = time.getUTCMinutes();
    var seconds: any = time.getUTCSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am'; hours = hours % 12; hours = hours ? hours : 12; minutes = minutes < 10 ? '0'+minutes : minutes; seconds; seconds < 10 ? '0'+seconds : seconds;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    elem.innerHTML = strTime;
  }

  public async wait(intervalInMilliseconds: any) {
    return new Promise(resolve => {
      setTimeout(resolve, intervalInMilliseconds);
    });
  }

  public drawCoords() {
    var coords = this._playerPosData;
    var x = coords[1];
    var y = coords[3];
    var z = coords[5];

    var elem = document.getElementById("minimap-position");
    elem.innerHTML = `${x.toString().split('.')[0]}, ${y.toString().split('.')[0]}, ${z.toString().split('.')[0]}`;
  }

  public async getRequiredFeatures(): Promise<string[]> {
    return GamesFeatures.get(GameClassId);
  }

  public async getProcData() {
    this._gameProcData = await OWGames.getRunningGameInfo();
    return this._gameProcData;
  }

  public async getEventData() {
    this._gameEventData = await this._owGameEventsListener.getInfo();
    return this._gameEventData;
  }

  private setProcData(json): void {
    this._gameProcData = json;
    return;
  }

  private setEventData(e): void {
    this._gameEventData = e;
    return;
  }

  // Displays the toggle minimize/restore hotkey in the window header
  private async setToggleHotkeyText() {
    const gameClassId = GameClassId;
    const hotkeyText = await OWHotkeys.getHotkeyText(Hotkeys.overlay, gameClassId);
    const hotkeyElem = document.getElementById('hotkey');
    hotkeyElem.textContent = hotkeyText;
  }

  // Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  private async setToggleHotkeyBehavior() {

    const toggleInGameWindow = async (hotkeyResult: overwolf.settings.hotkeys.OnPressedEvent): Promise<void> => {
      logMessage("event", `pressed hotkey for ${Hotkeys.overlay}`);
      const inGameState = await this.getWindowState();

      if (inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED) {
        this.currWindow.minimize();
      } else if (inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED) {
        this.currWindow.maximize();
      }
    }

    OWHotkeys.onHotkeyDown(Hotkeys.overlay, toggleInGameWindow);
  }
}

Overlay.instance().run();
