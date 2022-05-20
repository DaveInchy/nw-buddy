import React, { Component, useContext, useEffect, useState } from 'react';
import { logMessage, logError } from '../../debug';
import Vector2 from '../../vector2';

import "../styles/overlay.css";

import Sketch from 'react-p5';
import p5 from 'p5';

export default class WorldMapV2 {

    render()
    {

        function setup(sketch: p5, parent: Element)
        {
            sketch.createCanvas(500, 500)
                .parent(parent);
            sketch.background(0);
        }

        function draw(sketch: p5)
        {
            sketch.background("#0fff0f");
            sketch.fill(255);
            sketch.text("Loading...", 10, 10);
        }

        useEffect(() => {

        }, []);

        return (
            <div id="worldmap-size" className="bg-slate-900 border-2 border-slate-700 w-[640px] h-[480px]">

                <Sketch setup={setup} draw={draw} />

            </div>
        );
    }

}