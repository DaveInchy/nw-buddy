import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys
} from "@overwolf/overwolf-api-ts";

// Typescript imports
import { logMessage, logError } from "../debug";
import WindowManager from "../window";
import { Hotkeys, WindowNames, GamesFeatures, GameClassId, getCircularReplacer } from "../global";

// Typescript Class imports
import StorageInterface from "../storage";
import DataClient from "../data";
import Minimap from "../minimap";
import Player from '../player';
import Pin from "../pin";

import App from "../welcome/react";

import owWindowState = overwolf.windows.WindowStateEx;
import owEvents = overwolf.games.events;
import owUtils = overwolf.utils;

class WorldmapToolkit extends WindowManager {
    private static _instance: any;
    public _app: any;

    private constructor() {
        super(WindowNames.welcome);
        logMessage("startup", "constructing desktop window instance");
    }

    async setWindowBehavior() {
        try {
            if (!this.maximized) {
                this.currWindow.maximize();
            } else {
                this.currWindow.maximize();
            }
            this.maximized = !this.maximized;
        }
        catch (err) {
            logError(err);
        }

        return true;
    }

    public static instance() {
        if (!this._instance) {
            this._instance = new WorldmapToolkit();
        }
        logMessage("startup", "overlay window instance registered successfully");
        return this._instance;
    }

    public async run() {
        this.setWindowBehavior();
        this._app = App;
    }

    public async wait(intervalInMilliseconds: any) {
        return new Promise((resolve) => {
            setTimeout(resolve, intervalInMilliseconds);
        });
    }
}

WorldmapToolkit.instance().run();