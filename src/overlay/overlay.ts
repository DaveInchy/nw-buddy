import {
  IOWGamesEventsDelegate,
  OWGames,
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";

import { Window } from "../window";
import { Hotkeys, WindowNames, GamesFeatures, GameClassId, logMessage } from "../consts";
import utils from "../utils";

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

  public _playerPosData: string; // needs formatting, look at drawCoords()
  public _playerCharacter: string; // character NAME

  // overwolf event registers
  private _owGameEventsListener: OWGamesEvents;
  private _owGameEventsDeligate: IOWGamesEventsDelegate;

  // storage of game data from the API
  public _gameId: number;
  public _gameData: Object | any;
  private _gameProcData: Object | any;
  private _gameEventData: Object | any;
  _gameInfoUpdates: overwolf.Event<any>;
  _gameEventsUpdates: overwolf.Event<owEvents.NewGameEvents>;

  private constructor() {
    super(WindowNames.overlay);
    logMessage("info", "Overlay window created");

    this.setToggleHotkeyBehavior();
    this.setToggleHotkeyText();
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new Overlay();
    }

    return this._instance;
  }

  public async run() {

    // const gameFeatures = GamesFeatures.get(GameClassId);
    // if (gameFeatures && gameFeatures.length) {
    //   this._owGameEventsListener = new OWGamesEvents(
    //     this._owGameEventsDeligate,
    //     gameFeatures,
    //   20);

    //   this._gameEventsListener.start();
    // }
    const gameFeatures = GamesFeatures.get(GameClassId);
    if (gameFeatures && gameFeatures.length) {
      this._gameInfoUpdates = overwolf.games.events.onInfoUpdates2;
      this._gameInfoUpdates.addListener(this.setProcData.bind(this));
      this._gameEventsUpdates = overwolf.games.events.onNewEvents;
      this._gameEventsUpdates.addListener(this.setEventData.bind(this));
    }
    // initialize the game data ??? is this needed?
    // this._gameEventData = await this.getEventData();
    // this._gameProcData = await this.getProcData();

    utils.loop(async () => {

      // update the game data on this class as properties
      // this._gameId = GameClassId;
      // this._gameEventData = await this.getEventData();
      // this._gameProcData = await this.getProcData();

      // this._gameInfoData = this._gameEventData.game_info;
      // this._playerPosData = this._gameInfoData.location;
      // this._playerCharacter = this._gameInfoData.player_name;

      // // make a struct with the new data and store those properties on this class
      // this._gameData = {
      //   id: this._gameId,
      //   data: {
      //     procData: this._gameProcData,
      //     eventData: this._gameEventData,
      //     posData: this._playerPosData
      //   }
      // }
      // // After a long session of play, the html elements in the app will host an insane amount of gameData
      // // solution: clear the html elements every 5 seconds or for now just NOT log

      // await this.drawCoords(this._playerPosData);
      // logMessage("debug", `${this._playerPosData}`);
      // console.log(`data:${this._gameData}`);

    });
  }

  public async drawCoords(csv: string) {
    // get the commas and devide all the text in between the commas into an array
    const coords = csv.split(",");

    // format the x y z coordinates to a string devided by a space
    const formattedCoords: string = `x:${coords[1]} y:${coords[3]} z:${coords[5]}`;
    const elem = document.getElementById("minimap-position");
    elem.innerHTML = formattedCoords;
  }

  public async getRequiredFeatures(): Promise<string[]> {
    return GamesFeatures.get(GameClassId)
  }

  public async getProcData() {
    this._gameProcData = await OWGames.getRunningGameInfo();
    return this._gameProcData;
  }

  private setProcData(json): void {
    this._gameProcData = json;
    return;
  }

  private setEventData(e): void {
    this._gameEventData = e;
    return;
  }

  public async getEventData() {
    this._gameEventData = await this._owGameEventsListener.getInfo();
    return this._gameEventData;
  }

  // Displays the toggle minimize/restore hotkey in the window header
  private async setToggleHotkeyText() {
    const gameClassId = await GameClassId;
    const hotkeyText = await OWHotkeys.getHotkeyText(Hotkeys.overlay, gameClassId);
    const hotkeyElem = document.getElementById('hotkey');
    hotkeyElem.textContent = hotkeyText;
  }

  // Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  private async setToggleHotkeyBehavior() {

    const toggleInGameWindow = async (hotkeyResult: overwolf.settings.hotkeys.OnPressedEvent): Promise<void> => {
      logMessage("event", `pressed hotkey for ${hotkeyResult.name}`);
      const inGameState = await this.getWindowState();

      if (inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED) {
        this.currWindow.minimize();
      } else if (inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED) {
        this.currWindow.restore();
      }
    }

    OWHotkeys.onHotkeyDown(Hotkeys.overlay, toggleInGameWindow);
  }

  private async getRunningGameClassId(): Promise<number | null> {
    const info = await OWGames.getRunningGameInfo();
    return (info && info.isRunning && info.classId) ? info.classId : null;
  }
}

Overlay.instance().run();
