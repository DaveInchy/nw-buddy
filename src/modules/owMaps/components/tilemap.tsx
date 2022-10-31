import React, { Component, useRef, useState, useEffect, useLayoutEffect, CSSProperties } from 'react';
import { logError, logMessage } from '../utils/debug';
import Vector2 from '../utils/vector2';

export default function TileMap({ props }) {

    /* Guidelines & NOTES
     * Original Tilesize is 1024x1024
     * Layer needs to be below or on 6
     * The default layer should be 6
     * Mapsize is best if calculated on 56x56 grid with a tileSize of 256
     */

    const [updateCounter, setUpdateCounter] = useState(0)
    const [mapSize, setMapSize] = useState(new Vector2(56, 56));
    const [tileSize, setTileSize] = useState(new Vector2(256, 256));
    const [jsxElems, setJsxElems] = useState([]);
    const [layer, setLayer] = useState(6);

    const bgWaves = require('../res/waves-anim.svg');

    const styles = {
        layer: {
            minWidth: tileSize.x * mapSize.x + 'px',
            minHeight: tileSize.y * mapSize.y + 'px',
            position: 'absolute',
            top: '0px',
            left: '0px',
            overflow: 'hidden',
            zIndex: '15',
            backgroundColor: '#eef8ff',
            backgroundImage: `url(${bgWaves})`,
        },
        chunk: {
            minWidth: tileSize.x + 'px',
            minHeight: tileSize.y + 'px',
            position: 'absolute',
        },
    } as { layer: CSSProperties, chunk: CSSProperties };

    var mapTiles = [];

    useEffect(() => {
        for (let x = 0; x < mapSize.x; x++) {
            for (let y = 0; y < mapSize.y; y++) {
                var tile = {
                    url: `https://cdn.newworldfans.com/newworldmap/09-2022/${layer}/${x}/${y}.png`,
                    position: new Vector2(x * tileSize.x, y * tileSize.y),
                };
                mapTiles.push(tile)
            }
        }

        var mapGrid: JSX.Element[] = mapTiles.map((v) => {
            var positionStyle: any = { ...styles.chunk, left: `${v.position.x}px`, top: `${v.position.y}px` }
            return (<img style={positionStyle} src={v.url ? v.url : ""} />);
        })

        setJsxElems(mapGrid);
    }, []);

    return (
        <div style={styles.layer}>
            {jsxElems}
        </div>
    );
}