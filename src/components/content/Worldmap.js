import "../../assets/css/app.tailwind.css";
import Map from "./Map";
import { mountApp, mountComponent } from "../../modules/ow-react/mount";
import { Player, playerModel } from "../../player";
import { getEventData } from "../../utils";

import React, {
    useEffect,
    useLayoutEffect,
    useState,
    useRef
} from 'react';

import {
    IOWGamesEventsDelegate,
    OWGames,
    OWGamesEvents,
    OWHotkeys,
    OWWindow
} from "@overwolf/overwolf-api-ts";



export default function Worldmap() {

    const tilemap = useRef(undefined);
    const canvas = useRef(undefined);
    const container = useRef(undefined);
    const wrapper = useRef(undefined);
    const map = useRef(undefined);

    return (
        <div ref={container} id="worldmap" className="w-full h-full" style={{"min-height": "100px"}}>

            <Map />

        </div>
    );
}