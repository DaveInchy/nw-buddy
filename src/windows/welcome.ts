import DataClient from "../data";
import DesktopComponent from "../components/content/WelcomeAnimation";
import Minimap from "../minimap";
import Pin from "../pin";
import StorageInterface from "../storage";
import WindowManager from "../window";
import { logError, logMessage } from "../debug";
import { GameClassId, GamesFeatures, Hotkeys, WindowNames } from "../global";
import { mountApp as Mount } from "../modules/owReact/mount";
import { Player, playerModel } from "../player";
import { getCircularReplacer } from "../utils";

import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys
} from "@overwolf/overwolf-api-ts";

// Typescript imports

// Typescript Class imports

// Typescript Module imports

// React Components

class DesktopWindow extends WindowManager {
    private static _instance: any;
    public _app: any;
    public static _windowName = WindowNames.welcome;

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
        this._app = Mount(DesktopComponent);
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