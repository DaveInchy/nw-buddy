import React, { Component, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { logMessage, logError } from '../../debug';
import Vector2 from '../../vector2';

import "../styles/overlay.css";

import Sketch from 'react-p5';
import p5 from 'p5';

export default class WorldMap extends Component {

    render()
    {

        var wmSketch = useRef(null);
        var wmFrame = useRef(null);
        var wmCanvas = useRef(null);

        const [count, setCount] = useState(0);

        useEffect(() => {

        }, []);

        useEffect(() => {
            var c: number = count;
            var sketch: p5 = wmSketch.current;
            var frame: HTMLDivElement = wmFrame.current;
            var canvas: p5.Renderer = sketch.createCanvas(frame.clientWidth, frame.clientHeight);
        }, [count]);

        return (
            <div ref={wmFrame} className="worldmap-frame">
                <Sketch ref={wmSketch} setup={() => setCount(count+1)} />
            </div>
        );
    }

}
