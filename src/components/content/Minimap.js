import "../../assets/css/app.tailwind.css";
import Map from "../elements/map/worldmap.l6";
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



export default function Minimap() {

    const tilemap = useRef(undefined);
    const canvas = useRef(undefined);
    const container = useRef(undefined);
    const wrapper = useRef(undefined);
    const map = useRef(undefined);

    return (
        <div ref={container} id="minimap" className="w-full h-full overflow-hidden" style={{"margin-left": "-50px"}}>

            <div ref={wrapper} id="minimap-context" className="rounded-full shadow-transparent border-0 border-stone-900 overflow-hidden" style={{width: "320px", height: "320px", position: "absolute", bottom: "400px", right: "50px", zIndex: "0", scrollBehavior: "smooth"}}>
                <canvas ref={canvas} id="minimap-canvas" className="transform-gpu duration-500" style={{ position: "absolute", padding: "0", top: "calc(0px + 50%)", left: "calc(0px + 50%)", width: "14336px", height: "14336px", zIndex: "4", }} width="14336" height="14336">

                </canvas>

                <div ref={tilemap} id="minimap-tilemap" className="transform-gpu duration-500" style={{ backgroundColor: "#0aF", position: "absolute", padding: "0", bottom: "calc(0px + 50%)", left: "calc(0px + 50%)", width: "14336px", height: "14336px", zIndex: "3", }}>
                    <Map ref={map} props={{ scale: 1 }} />
                </div>

                <img id="compassNeedle" src="../../img/compass-needle-pink.svg" className="transform-gpu transition-transform" style={{ maxWidth: "200px", maxHeight: "250px", position: "absolute", top: "50%", left: "50%", zIndex: "5", marginLeft: "-100px", marginTop: "-100px" }} />
            </div>

        </div>
    );
}