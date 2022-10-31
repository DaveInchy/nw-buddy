import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys
} from "@overwolf/overwolf-api-ts";

// Typescript imports
import { logMessage, logError } from "../debug";
import WindowManager from "../window";
import { Hotkeys, WindowNames, GamesFeatures, GameClassId } from "../global";
import { getCircularReplacer } from "../utils";

// Typescript Class imports
import { Player, playerModel } from '../player';
import StorageInterface from "../storage";
import DataClient from "../data";
import Minimap from "../minimap";
import Pin from "../pin";

// Typescript Module imports
import { mountApp as Mount } from "../modules/owReact/mount";

// React Components
import DesktopComponent from "../components/content/loading";

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