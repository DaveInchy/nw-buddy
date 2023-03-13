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

import { mountApp, mountComponent } from "../../modules/owReact/mount";
import { Player, playerModel } from '../../player';

import '../../assets/css/app.tailwind.css';
import Map from '../worldmap.l6';
import Minimap from '../../minimap';
import { getEventData } from '../../utils';

export default function InteractiveMap() {

    const tilemap = useRef(undefined);
    const canvas = useRef(undefined);
    const container = useRef(undefined);

    const [map, setMap] = useState(null);

    useLayoutEffect(() => {
        //var canvas = window.document.getElementById("canvas");
        //var tilemap = window.document.querySelector("#tilemap");
        //console.log(canvas, tilemap)
        setMap(new Minimap({
            type: "player",
            user: "",
            coords: {
                x: Number(0),
                y: Number(0),
                z: Number(0),
                direction: "N",
                angle: 0,
            },
            map: "surface",
            group: (`${Math.floor(Math.random() * 100)}`).toString(),
        }, canvas.current, tilemap.current));
    }, [])

    return (
        <div ref={container} className="min-h-[100%] min-w-[100%] max-w-[100%] max-h-[100%] overflow-hidden bg-stone-500">
            <canvas ref={canvas} id="canvas" className="transform-gpu duration-500" style={{position: "absolute", padding: "0", top: "calc(0px + 50%)", left: "calc(0px + 50%)", width: "14336px", height: "14336px", zIndex: "4",}} width="14336" height="14336">

            </canvas>

            <div ref={tilemap} id="tilemap" className="transform-gpu duration-500" style={{backgroundColor: "#0aF", position: "absolute", padding: "0", bottom: "calc(0px + 50%)", left: "calc(0px + 50%)", width: "14336px", height: "14336px", zIndex: "3",}}>
                <Map/>
            </div>

            <img id="compassNeedle" src="../../img/compass-needle-pink.svg" className="transform-gpu transition-transform" style={{maxWidth: "200px", maxHeight: "250px", position: "absolute", top: "50%", left: "50%", zIndex: "4", marginLeft: "-100px", marginTop: "-100px"}} />
        </div>
    );
}