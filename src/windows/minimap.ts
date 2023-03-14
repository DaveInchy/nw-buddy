import "../assets/css/overlay.css";
import Component from "../components/content/Minimap";
import DataClient from "../data";
import Minimap from "../minimap";
import Pin from "../pin";
import StorageInterface from "../storage";
import Vector2 from "../vector2";
import WindowManager from "../window";
import owOCR from "../modules/leonOCR/location.v3";
import { logError, logMessage } from "../debug";
import { GameClassId, GamesFeatures, Hotkeys, WindowNames } from "../global";
import { mountApp } from "../modules/ow-react/mount";
import { Player, playerModel } from "../player";
import { getCircularReplacer } from "../utils";

import {
  IOWGamesEventsDelegate,
  OWGames,
  OWGamesEvents,
  OWHotkeys,
  OWWindow
} from "@overwolf/overwolf-api-ts";

// Typescript imports

// Typescript Class imports

// Modules imports

// React Components


// CSS imports

import owWindowState = overwolf.windows.WindowStateEx;
import owEvents = overwolf.games.events;
import owGames = overwolf.games;
import owUtils = overwolf.utils;


class OverlayWindow extends WindowManager {
  private static _instance: OverlayWindow;

  public _gameInfoData: any;
  public _gameEventsData: any;

  private _owGameEventsListener: OWGamesEvents;
  private _owGameEventsDeligate: IOWGamesEventsDelegate;

  public _gameId: number;
  public _gameData: Object | any;
  public _gameMap: string | any;

  private _gameProcData: Object | any;
  private _gameEventData: Object | any;

  public _gameInfoUpdates: overwolf.Event<any>;
  public _gameEventsUpdates: overwolf.Event<any>;

  private _Minimap: Minimap;

  public _playerPosData: Array<string>;
  public _playerCharacter: string;
  public _playerLocation: any;
  public _player: playerModel;
  public _playerList: playerModel[];

  private _editorLoadedOnce: boolean = false;

  private _minimapShown: boolean = true;
  private _createPinShown: boolean = false;
  private _editorShown: boolean = false;
  private _overlayShown: boolean;
  private _group: string;

  sidebarShown: boolean;
  _Worldmap: Minimap;
  _worldMap: OWWindow;
  _worldMapShow: any;
  _worldMapShown: boolean;
  _worldmapWindow: OWWindow;
  _app: any;

  private constructor() {
    super(WindowNames.minimap);
    this.setHotkeyBehavior();
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new OverlayWindow();
    }
    logMessage("minimap", "Overlay Window Instance Register => Success");
    return this._instance;
  }

  public async run() {

    var loading = true;
    var ticksPerSecond = Number(10);

    var loadInterval = 5; // seconds
    var loadCounter = 0;

    logMessage("minimap","Preparing Overwolf Game Data Events...");

    await this.listenForEvents();

    while (loading) {
      logMessage("minimap", "Trying to hook into Overwolf Game Data => reloading in " + loadInterval * loadCounter + " sec");
      try {

        //all this code should be in the react component
        this._app = mountApp(Component);
        logMessage("react", "React '" + WindowNames.minimap + "' Mounted :\n" + JSON.stringify(this._app, getCircularReplacer()));

        var eventData = await this.getEventData();
        var processData = await this.getProcData();

        // this.setToggleHotkeyText();
        // this.setCreatePinHotkeyText();
        // this.setZoomHotkeysText();

        logMessage('debug', `GameInfo => ${JSON.stringify(eventData, getCircularReplacer())}`);

        this._playerCharacter = eventData.res.game_info.player_name || "localPlayer";
        this._playerLocation = eventData.res.game_info.location;

        //var playerLocation: [number, number, number] = await owOCR();

        logMessage(`debug`, `Player Location => ${JSON.stringify(this._playerLocation)}`);

        // var coords = [
        //   Number(playerLocation[1].toString().split('.')[0]),
        //   Number(playerLocation[0].toString().split('.')[0]),
        //   Number(playerLocation[2].toString().split('.')[0]),
        // ]

        this._playerPosData = this._playerLocation ? this._playerLocation.split(",") : coords;

        this._player = {
          type: "player",
          user: this._playerCharacter,
          coords: {
            x: Number(this._playerPosData[(this._playerLocation ? 1 : 0)]),
            y: Number(this._playerPosData[(this._playerLocation ? 3 : 1)]),
            z: Number(this._playerPosData[(this._playerLocation ? 5 : 2)]),
            direction: this._playerLocation ? this._playerPosData[13].toString() : "N",
            angle: 0,
          },
          map: this._gameMap ? this._gameMap : "surface",
          group: (`${Math.floor(Math.random() * 100)}`).toString(),
        };

        var canvas: HTMLCanvasElement = document.getElementById("minimap-canvas") as HTMLCanvasElement;
        var tilemap: HTMLDivElement = document.getElementById("minimap-tilemap") as HTMLDivElement;

        this._Minimap = new Minimap(this._player, canvas, tilemap);
        var coords: [number, number, number] = [this._player.coords.x, this._player.coords.y, this._player.coords.z];
        await this._Minimap.renderNeedle(coords);

        this.setHotkeyBehavior();

        loading = false;
        logMessage("game", "Success loading game data ...");
      } catch (e) {
        logError("Something went wrong, retry in 5s ...");
        logError(e);
      }
      await this.wait(1000 * loadInterval);
      loadCounter++;
    }

    // const _sideBar = Sidebar;

    logMessage("minimap", "Starting minimap game overlay ...");

    var updateCounter = 0;
    while (!loading) {
      try {
        await this.getProcData();
        // this._gameProcData = { "isInFocus": true, "isRunning": true, "allowsVideoCapture": true, "title": "New World", "displayName": "", "shortTitle": "", "id": 218161, "classId": 21816, "width": 1920, "height": 1080, "logicalWidth": 1920, "logicalHeight": 1080, "renderers": ["D3D11"], "detectedRenderer": "D3D11", "executionPath": "C:/Program Files (x86)/Steam/steamapps/common/New World/Bin64/NewWorld.exe", "sessionId": "1a25e84ec60a4498a8d03a75490654de", "commandLine": "\"\"", "type": 0, "typeAsString": "Game", "overlayInputHookError": false, "windowHandle": { "value": 70979940 }, "monitorHandle": { "value": 65537 }, "processId": 9428, "oopOverlay": false, "terminationUnixEpochTime": null, "overlayInfo": { "oopOverlay": false, "coexistingApps": [], "inputFailure": false, "hadInGameRender": true, "isCursorVisible": true, "exclusiveModeDisabled": false, "isFullScreenOptimizationDisabled": false }, "success": true }
        await this.getEventData();
        // {"success":true,"status":"success","res":{"gep_internal":{"version_info":"{\"local_version\":\"191.0.24\",\"public_version\":\"191.0.24\",\"is_updated\":true}"},"game_info":{"world_name":"live-1-30-3","map":"NewWorld_VitaeEterna","location":"player.position.x,11139.12,player.position.y,7327.32,player.position.z,166.61,player.rotation.x,0,player.rotation.y,0,player.rotation.z,19,player.compass,E","player_name":"n'Adina"}}}
        this._playerCharacter = this._gameEventData.res.game_info.player_name;
        this._playerLocation = this._gameEventData.res.game_info.location;
        this._gameMap = this._gameEventData.res.game_info.map;

        this._playerPosData = this._playerLocation.split(",");
        // logMessage('debug', `${JSON.stringify(this._gameEventData, getCircularReplacer())}`);

        this._player = {
          type: "player",
          user: this._playerCharacter,
          coords: {
            x: Number(this._playerPosData[(this._playerLocation ? 1 : 0)]),
            y: Number(this._playerPosData[(this._playerLocation ? 3 : 1)]),
            z: Number(this._playerPosData[(this._playerLocation ? 5 : 2)]),
            direction: this._playerLocation ? this._playerPosData[13].toString() : "N",
            angle: 0,
          },
          map: this._gameMap ? this._gameMap : "surface",
          group: (`${Math.floor(Math.random() * 100)}`).toString(),
        };

        // https://nw-radar-api.vercel.app/api/player/list
        // this._playerList = DataClient.setPlayer(this._player); // returns playerlist
        // [{"type":"player","user":"n'Adina","group":"0c218ed2585c4353b77fbbb2d6e915a8","coords":{"x":"8695.59","y":"4233.43","z":"179.55","direction":"SW"}}]
        // logMessage("debug", `playerList => ${JSON.stringify(this._playerList, getCircularReplacer())}`);

        this._overlayShown = this._gameProcData.overlayInfo.isCursorVisible === true
          ? ((this._createPinShown === true || this._editorShown === true || this.sidebarShown === true)
            ? this.currWindow.maximize() && true
            : this.currWindow.minimize() && false)
          : this.currWindow.maximize() && false;

        this._Minimap.renderCanvas(this._player, this._playerList);

        await this._Minimap.renderNeedle([Number(this._playerPosData[(this._playerLocation ? 1 : 0)]), Number(this._playerPosData[(this._playerLocation ? 3 : 1)]), Number(this._playerPosData[(this._playerLocation ? 5 : 2)])]);

        // keep checking for when the window for worldmap is stored in var _Worldmap on window _worldMap
        //  typeof this._Worldmap === 'object' ? this._Worldmap.renderCanvas(this._player, this._playerList) && this._Worldmap.setZoom(0.35) : null;

        updateCounter <= 1 ? this.showMinimap() : null;

        await this.wait(1000 / ticksPerSecond);
        updateCounter++;

      } catch (e) {
        logError(e)
      }
    }
  }

  public async releaseMouse() {
    await this.wait(1);
    logMessage("game", "Artificial keystroke: Tab => Release Mouse Cursor");
    return overwolf.utils.sendKeyStroke("Tab");
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

  public async listenForEvents() {
    logMessage("game", "Loading event listeners ...");
    try {
      const gameFeatures = GamesFeatures.get(GameClassId);
      if (gameFeatures && gameFeatures.length) {

        this._owGameEventsDeligate = {
          onNewEvents: (e) => {
            this.setEventData(e);
          },
          onInfoUpdates: (info) => {
            this.setProcData(info);
          },
        };

        this._owGameEventsListener = new OWGamesEvents(
          this._owGameEventsDeligate,  await this.getRequiredFeatures()
        );

        await this._owGameEventsListener.start();

        this._gameInfoUpdates = overwolf.games.events.onInfoUpdates2;
        this._gameInfoUpdates.addListener(this.setProcData.bind(this));

        this._gameEventsUpdates = overwolf.games.events.onNewEvents;
        this._gameEventsUpdates.addListener(this.setEventData.bind(this));

        logMessage("game", "Event listeners set up ...");
      }
    } catch(e) {
      logError(e);
      return;
    }
    return;
  }

  public drawTime(containerId) {
    var elem = document.getElementById(containerId);
    var time = new Date();
    var hours: any = time.getUTCHours() + 0; // Yearly summer/winter time switch
    var minutes: any = time.getUTCMinutes();
    var seconds: any = time.getUTCSeconds();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours + 1 ? hours + 1 : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds;
    seconds < 10 ? "0" + seconds : seconds;
    var strTime = hours + ":" + minutes + " " + ampm;
    elem.textContent = strTime;
  }

  public async drawCoords(containerId) {
    var coords = this._playerPosData;
    var x = coords[(this._playerLocation ? 1 : 0)];
    var y = coords[(this._playerLocation ? 3 : 1)];
    var z = coords[(this._playerLocation ? 5 : 2)];
    var direction = this._playerLocation ? coords[13] : "N";

    var elem = document.getElementById(containerId);
    elem ? elem.textContent = `${direction.toString()} :: ${x.toString().split(".")[0]}, ${y.toString().split(".")[0]}, ${z.toString().split(".")[0]}`: `0, 0, 0`;
  }

  public async getRequiredFeatures(): Promise<string[]> {
    return GamesFeatures.get(GameClassId);
  }

  public async getProcData() {
    this._gameProcData = await new Promise<overwolf.games.GetRunningGameInfoResult>((resolve) => {
      overwolf.games.getRunningGameInfo((result) => resolve(result))
    });
    this._gameProcData = this._gameProcData ? this._gameProcData : await OWGames.getRunningGameInfo();
    return this._gameProcData;
  }

  public async getEventData() {
    overwolf.games.events.getInfo((info) => {
      this._gameEventData = info;
    });
    this._gameEventData = this._gameEventData ? this._gameEventData : await OWGamesEvents.prototype.getInfo();
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

  private async setHotkeyBehavior() {

    OWHotkeys.onHotkeyDown(Hotkeys.minimap, async (): Promise<void> => {
      logMessage("hotkey", `pressed hotkey for ${Hotkeys.minimap.toString()}`);
      if (this._minimapShown) {
        this.showMinimap();
      } else {
        this.showMinimap();
      }
      return;
    });

    OWHotkeys.onHotkeyDown(Hotkeys.restart, async (): Promise<void> => {
      logMessage("hotkey", `pressed hotkey for ${Hotkeys.restart.toString()}`);
      window.location.href = window.location.href + "?restart=true";
      return;
    });

  }

  public async wait(intervalInMilliseconds: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, intervalInMilliseconds);
    });
  }
}

OverlayWindow.instance().run();