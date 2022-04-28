import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys
} from "@overwolf/overwolf-api-ts";

// Typescript imports
import { logMessage, logError } from "../debug";
import { Window as WindowManager } from "../window";
import { Hotkeys, WindowNames, GamesFeatures, GameClassId, getCircularReplacer } from "../global";

// Typescript Class imports
import StorageInterface from "../storage";
import DataClient from "../data";
import Minimap from "../minimap";
import Player from '../player';
import Pin from "../pin";

import ReactApp from "../assets/components/react";

import owWindowState = overwolf.windows.WindowStateEx;
import owEvents = overwolf.games.events;
import owUtils = overwolf.utils;

class DesktopWindow extends WindowManager {
    private static _instance: any;

    private constructor() {
        super(WindowNames.desktop);
        logMessage("startup", "constructing desktop window instance");

        // this.setHotkeyBehavior();
    }

    setHotkeyBehavior() {
        throw new Error("Method not implemented.");
    }

    public static instance() {
        if (!this._instance) {
            this._instance = new DesktopWindow();
        }
        logMessage("startup", "overlay window instance registered successfully");
        return this._instance;
    }

    public async run() {
        var App = ReactApp;
    }

    public async wait(intervalInMilliseconds: any) {
        return new Promise((resolve) => {
            setTimeout(resolve, intervalInMilliseconds);
        });
    }
}

DesktopWindow.instance().run();