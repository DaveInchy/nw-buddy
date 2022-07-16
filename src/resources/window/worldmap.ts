import "core-js/web";
import "regenerator-runtime/runtime";

import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys
} from "@overwolf/overwolf-api-ts";

// Typescript imports
import { logMessage, logError } from "../../debug";
import WindowManager from "../../window";
import { Hotkeys, WindowNames, GamesFeatures, GameClassId, getCircularReplacer } from "../../global";

// Typescript Class imports
import StorageInterface from "../../storage";
import DataClient from "../../data";
import Minimap from "../../minimap";
import Player from '../../player';
import Pin from "../../pin";

// Setup React for this window (hooks into main[id="container"])
import setAppHandle from "../../modules/react-app-injector/index";
import Component from "../content/worldmap"

import owWindowState = overwolf.windows.WindowStateEx;
import owEvents = overwolf.games.events;
import owUtils = overwolf.utils;

class Worldmap extends WindowManager {
    private static _instance: any;
    private _state: any;
    public _app: any;

    private constructor() {
        super(WindowNames.worldmap);
        logMessage(WindowNames.worldmap, "constructing worldmap window instance");
    }

    public static instance() {
        if (!this._instance) {
            this._instance = new Worldmap();
        }
        logMessage(WindowNames.worldmap, "overlay window instance constructed");
        return this._instance;
    }

    public async run() {
        this._app = setAppHandle(Component);

        logMessage(WindowNames.worldmap, "worldmap content mounted");
        this.setWindowBehavior();
        this._state = this.getWindowState();
    }

    public async wait(intervalInMilliseconds: any) {
        return new Promise((resolve) => {
            setTimeout(resolve, intervalInMilliseconds);
        });
    }
}

Worldmap.instance().run();