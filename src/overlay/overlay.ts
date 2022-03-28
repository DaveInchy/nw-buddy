import {
  IOWGamesEventsDelegate,
  OWGames,
  OWGamesEvents,
  OWHotkeys,
  OWWindow
} from "@overwolf/overwolf-api-ts";
import { Window } from "../window";
import { logMessage, logError } from "../debug";
import {
  Hotkeys,
  WindowNames,
  GamesFeatures,
  GameClassId,
  Config,
  getCircularReplacer
} from "../global";
import DataClient from "../data";
import Minimap from "../minimap";
import StorageInterface from "../storage";

import owWindowState = overwolf.windows.WindowStateEx;
import owEvents = overwolf.games.events;
import owUtils = overwolf.utils;

import "./tailwind.css";
import Pin from "../pin";

// The window displayed in-game while a game is running.
class Overlay extends Window {
  private static _instance: Overlay;

  public _gameInfoData: any;
  public _gameEventsData: any;

  private _owGameEventsListener: OWGamesEvents;
  private _owGameEventsDeligate: IOWGamesEventsDelegate;

  public _gameId: number;
  public _gameData: Object | any;

  private _gameProcData: Object | any;
  private _gameEventData: Object | any;

  _gameInfoUpdates: overwolf.Event<any>;
  _gameEventsUpdates: overwolf.Event<owEvents.NewGameEvents>;

  private _Minimap: Minimap;

  public _playerPosData: Array<string>; // needs formatting, look at drawCoords()
  public _playerCharacter: string; // character NAME
  public _playerLocation: any;
  public _player: any;
  public _playerList: any;

  private _minimapShown: boolean = false;
  private _createPinShown: boolean = false;
  private _overlayShown: boolean = false;

  private constructor() {
    super(WindowNames.overlay);
    logMessage("startup", "constructing overlay window instance");

    this.setHotkeyBehavior();

    this.setToggleHotkeyText();
    this.setCreatePinHotkeyText();
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new Overlay();
    }
    logMessage("startup", "overlay window instance registered successfully");
    return this._instance;
  }

  public async run() {
    var loading = true;
    var ticksPerSecond = Number(2);

    var loadInterval = 5; // seconds
    var loadCounter = 0;

    logMessage("startup", "loading radar canvas ...");

    var canvas: HTMLCanvasElement = document.querySelector(
      "canvas#minimap-canvas"
    );

    logMessage("startup","loading game data ...");

    while (loading) {

      loadCounter++;
      await this.wait(loadInterval * 1000);

      logMessage("startup","try again => [" + loadInterval * loadCounter + " sec]");

      try {

        await this.listenForEvents();

        this._gameEventData = await this.getEventData();
        this._gameProcData = await this.getProcData();

        this._playerCharacter = this._gameEventData.res.game_info.player_name;
        this._playerLocation = this._gameEventData.res.game_info.location;
        this._playerPosData = this._playerLocation.split(",");

        this._player = {
          user: this._playerCharacter,
          x: this._playerPosData[1],
          y: this._playerPosData[3],
          z: this._playerPosData[5],
          direction: this._playerPosData[13].toString(),
        };

        this._Minimap = new Minimap(this._player, canvas)

        loading = false;
        logMessage("startup", "success loading game data ...");
      } catch (e) {
        logError("error loading game data ...");
        logError(e);
      }
    }

    logMessage("startup", "starting runtime service ...");

    var updateCounter = 0;
    while (!loading) {
      // logMessage("runtime", "ticking ...[" + updateCounter + "]");

      // update the game data
      await this.getProcData();
      // logMessage("debug", `${JSON.stringify(this._gameEventData, getCircularReplacer())}`);
      // this._gameProcData = { "isInFocus": true, "isRunning": true, "allowsVideoCapture": true, "title": "New World", "displayName": "", "shortTitle": "", "id": 218161, "classId": 21816, "width": 1920, "height": 1080, "logicalWidth": 1920, "logicalHeight": 1080, "renderers": ["D3D11"], "detectedRenderer": "D3D11", "executionPath": "C:/Program Files (x86)/Steam/steamapps/common/New World/Bin64/NewWorld.exe", "sessionId": "1a25e84ec60a4498a8d03a75490654de", "commandLine": "\"\"", "type": 0, "typeAsString": "Game", "overlayInputHookError": false, "windowHandle": { "value": 70979940 }, "monitorHandle": { "value": 65537 }, "processId": 9428, "oopOverlay": false, "terminationUnixEpochTime": null, "overlayInfo": { "oopOverlay": false, "coexistingApps": [], "inputFailure": false, "hadInGameRender": true, "isCursorVisible": true, "exclusiveModeDisabled": false, "isFullScreenOptimizationDisabled": false }, "success": true }

      // update the game data
      await this.getEventData();
      // logMessage("debug", `${JSON.stringify(this._gameEventData, getCircularReplacer())}`);
      // {"success":true,"status":"success","res":{"gep_internal":{"version_info":"{\"local_version\":\"191.0.24\",\"public_version\":\"191.0.24\",\"is_updated\":true}"},"game_info":{"world_name":"live-1-30-3","map":"NewWorld_VitaeEterna","location":"player.position.x,11139.12,player.position.y,7327.32,player.position.z,166.61,player.rotation.x,0,player.rotation.y,0,player.rotation.z,19,player.compass,E","player_name":"n'Adina"}}}

      // handle player location
      this._playerCharacter = this._gameEventData.res.game_info.player_name;
      this._playerLocation = this._gameEventData.res.game_info.location;
      this._playerPosData = this._playerLocation.split(",");

      this._player = {
        user: this._playerCharacter,
        x: this._playerPosData[1],
        y: this._playerPosData[3],
        z: this._playerPosData[5],
        direction: this._playerPosData[13].toString(),
      };

      updateCounter % ticksPerSecond || updateCounter === 0
        ? DataClient.addPlayer(this._player)
        : null;
      updateCounter >= 1
        ? DataClient.updatePlayer(this._player)
        : undefined;

      // logMessage(
      //   "player",
      //   `playerlist: ${JSON.stringify(this._playerList, getCircularReplacer())}`
      // );
      // https://nw-radar-api.vercel.app/api/player/list
      // logMessage("info",   `[overlay] player position: ${this._playerPosData}`);
      // logMessage("info", `[overlay] location '${this._gameEventData.res.game_info.location}'`);

      this._Minimap.renderCanvas(this._player);

      this.drawCoords();
      this.drawTime();
      this.drawTitle(this._playerCharacter);

      // Check if the game's cursor is active or not, hide the overlay if it is
      this._overlayShown = this._gameProcData.overlayInfo.isCursorVisible === true
      ? (this._createPinShown
        ? this.currWindow.maximize()
        : this.currWindow.minimize()
      ) && true
      : this.currWindow.maximize() && false;

      updateCounter <= 1 ? this.showMinimap() : null;

      await this.wait(1000 / ticksPerSecond);
      updateCounter++;
    }
  }

  public async releaseMouse() {
    await this.wait(1000);
    logMessage("game", "artificial keystroke: Enter");
    return overwolf.utils.sendKeyStroke("Enter");
  }

  public showMinimap() {
    const elem = document.getElementById("minimap");
    elem.style.display = "block";
    this._minimapShown = true;
  }

  public hideMinimap() {
    const elem = document.getElementById("minimap");
    elem.style.display = "none";
    this._minimapShown = false;
  }

  public showCreatePin() {
    const elem = document.getElementById("create-pin");
    elem.style.display = "block";

    const elemButton: HTMLButtonElement = elem.querySelector("#pinButton");
    const elemInput: HTMLInputElement = elem.querySelector("#pinTag");

    this._createPinShown = true;
    this._overlayShown = true;

    elemButton.addEventListener("click", event => {
      event.preventDefault();
      var pin: Pin = new Pin("default", this._player.x, this._player.y, this._playerCharacter);
      var canvas: HTMLCanvasElement = document.querySelector( "canvas#minimap-canvas" );
      StorageInterface.set(`${elemInput.value}`, JSON.stringify(pin, getCircularReplacer()));
      logMessage("game", `created pin: ${elemInput.value}`);
      logMessage("game", `all stored pins: \n${JSON.stringify(StorageInterface.getAll(), getCircularReplacer())}`);
      elemInput.value = "";
      this._Minimap.refreshRender();
      this.hideCreatePin();
    });

    this.releaseMouse();
  }

  public hideCreatePin() {
    const elem = document.getElementById("create-pin");
    elem.style.display = "none";

    const elemButton: HTMLButtonElement = elem.querySelector("#pinButton");
    const elemInput: HTMLInputElement = elem.querySelector("#pinTag");

    this._createPinShown = false;

    elemButton.removeEventListener("click", event => event.preventDefault(), false);
  }

  public async drawTitle(title: string) {
    const elem = document.getElementById("title");
    elem.innerHTML = title;
  }

  public async listenForEvents() {
    logMessage("startup", "loading event listeners ...");

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
        },
      };

      this._owGameEventsListener = new OWGamesEvents(
        this._owGameEventsDeligate,
        await this.getRequiredFeatures()
      );
      await this._owGameEventsListener.start();
      logMessage("startup", "event listeners loaded ...");
    }
    return;
  }

  public drawTime() {
    var elem = document.getElementById("minimap-current-time");
    var time = new Date();
    var hours: any = time.getUTCHours() + 1;
    var minutes: any = time.getUTCMinutes();
    var seconds: any = time.getUTCSeconds();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds;
    seconds < 10 ? "0" + seconds : seconds;
    var strTime = hours + ":" + minutes + " " + ampm;
    elem.innerHTML = strTime;
  }

  public drawCoords() {
    var coords = this._playerPosData;
    var x = coords[1];
    var y = coords[3];

    var elem = document.getElementById("minimap-position");
    elem.innerHTML = `${x.toString().split(".")[0]}, ${
      y.toString().split(".")[0]
    }`; // , ${z.toString().split('.')[0]}`;
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

  private async setToggleHotkeyText() {
    const gameClassId = GameClassId;
    const hotkeyText = await OWHotkeys.getHotkeyText(
      Hotkeys.minimap,
      gameClassId
    );
    const hotkeyElem = document.getElementById("minimap-hotkey");
    hotkeyElem.textContent = hotkeyText;
  }

  private async setCreatePinHotkeyText() {
    const gameClassId = GameClassId;
    const hotkeyText = await OWHotkeys.getHotkeyText(
      Hotkeys.create,
      gameClassId
    );
    const hotkeyElem = document.getElementById("create-hotkey");
    hotkeyElem.textContent = hotkeyText;
  }

  // @TODO create each interface and shortcut for each interface
  private async setHotkeyBehavior() {

    const toggleMinimap = async (): Promise<void> => {
      logMessage("event", `pressed hotkey for ${Hotkeys.minimap.toString()}`);
      if (this._minimapShown) {
        this.hideMinimap();
        this._minimapShown = false;
      } else {
        this.showMinimap();
        this._minimapShown = true;
      }
      return;
    };

    const toggleCreatePin = async (): Promise<void> => {
      logMessage("event", `pressed hotkey for ${Hotkeys.create.toString()}`);
      if (this._createPinShown) {
        this.hideCreatePin();
        this._createPinShown = false;
      } else {
        this.showCreatePin();
        this._createPinShown = true;
      }
      return;
    };

    OWHotkeys.onHotkeyDown(Hotkeys.minimap, toggleMinimap);
    OWHotkeys.onHotkeyDown(Hotkeys.create, toggleCreatePin);
  }

  public async wait(intervalInMilliseconds: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, intervalInMilliseconds);
    });
  }
}

Overlay.instance().run();

