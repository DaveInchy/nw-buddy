import React, {
    Component,
    useEffect,
    useState
} from "react";

import {
    logError,
    logMessage
} from '../debug';

import Vector2 from "../vector2";

import World7 from './worldmap.l7';
import World6 from './worldmap.l6';
import World5 from './worldmap.l5';
import World4 from './worldmap.l4';
import World3 from './worldmap.l3';

function WorldComponent()
{

    const [Elements, setElements] = useState([]);

    const Selection = 1;
    const ScaleFactors = [1, 1, 1, 1, 2];
    const FromToLayer = [3, 4, 5, 6, 7];
    const CurrentLayer = () => FromToLayer[FromToLayer.length - Selection];
    const CurrentScale = () => ScaleFactors[ScaleFactors.length - Selection];

    useEffect(() => {
        var worldLayers = new Array(
            World3,
            World4,
            World5,
            World6,
            World7,
        );

        const getWorldLayers = () => worldLayers.map((Layer, index, array) => {
            return <Layer props={{ scale: ScaleFactors[index] }} />
        })

        setElements(getWorldLayers());
    }, []);

    return (<div id={'worldmap-container'} style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: ``,
        height: "14336px",
        backgroundColor: "#ccf0ff",
    }}>
        {Elements}
    </div>);
}
export default WorldComponent;