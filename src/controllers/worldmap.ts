import "core-js/web";
import "regenerator-runtime/runtime";

import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys
} from "@overwolf/overwolf-api-ts";

// Typescript imports
import { logMessage, logError } from "../debug";
import { Hotkeys, WindowNames, GamesFeatures, GameClassId, getCircularReplacer } from "../global";

// Typescript Module imports
import Mount from "../mount.js";

// React Components
import WorldMap from "../components/content/worldmap"

// Typescript Class imports
import WindowManager from "../window";
import Storage from "../storage";
import DataClient from "../data";
import Minimap from "../minimap";
import Player from '../player';
import Pin from "../pin";

import owWindowState = overwolf.windows.WindowStateEx;
import owEvents = overwolf.games.events;
import owUtils = overwolf.utils;

class DesktopWindow extends WindowManager {
    private static _instance: any;
    public _app: any;
    public static _windowName = WindowNames.worldmap;

    private constructor() {
        super(DesktopWindow._windowName);
        logMessage("window", "Initializing '" + DesktopWindow._windowName + "' instance");
    }

    public static instance() {
        if (!this._instance) {
            this._instance = new DesktopWindow();
        }
        logMessage("window", "Instance '" + DesktopWindow._windowName + "' successfully initialized");
        return this._instance;
    }

    public async run() {
        this._app = Mount(WorldMap);
        this.setWindowBehavior();
        logMessage("react", "React '" + DesktopWindow._windowName + "' Mounted :\n" + JSON.stringify(this._app, getCircularReplacer()));
    }

    public async wait(intervalInMilliseconds: any) {
        return new Promise((resolve) => {
            setTimeout(resolve, intervalInMilliseconds);
        });
    }
}

DesktopWindow.instance().run();