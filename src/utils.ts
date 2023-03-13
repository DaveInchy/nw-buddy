import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys,
    OWWindow
} from "@overwolf/overwolf-api-ts";

export const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

export const wait = (intervalInMilliseconds: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, intervalInMilliseconds);
    });
}

export async function getProcData() {
    var data;
        data = await new Promise<overwolf.games.GetRunningGameInfoResult>((resolve) => {
            overwolf.games.getRunningGameInfo((result) => resolve(result))
        });
    return data || await OWGames.getRunningGameInfo();
}

export async function getEventData() {
    var data;
    overwolf.games.events.getInfo((info) => {
        data = info;
    });
    return data || await OWGamesEvents.prototype.getInfo();
}