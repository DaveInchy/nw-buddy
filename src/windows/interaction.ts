import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys
} from "@overwolf/overwolf-api-ts";

// Typescript imports
import WindowManager from "../window";

import {
    logMessage,
    logError
} from "../debug";

import {
    Hotkeys,
    WindowNames,
    GamesFeatures,
    GameClassId
} from "../global";

import {
    getCircularReplacer
} from "../utils";

// Typescript Class imports

// Typescript Module imports
import {
    mountApp as Mount
} from "../modules/owReact/mount";

// React Components
import Component from "../components/content/UserInterface";

class DesktopWindow extends WindowManager {
    private static _instance: any;
    public _app: any;
    public static _windowName = WindowNames.interaction;

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
        this._app = Mount(Component);
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