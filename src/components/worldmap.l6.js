import React, { Component, useRef, useState, useEffect, useLayoutEffect, CSSProperties, useReducer } from 'react';
import { logError, logMessage } from '../debug';
import bgWaves from '../assets/waves-anim.svg';
import Vector2 from '../vector2';
import Storage from '../storage';

export default function Map({props, offsetX = 0, offsetY = 0}) {

    /* Guidelines & NOTES
     * Original Tilesize is 1024x1024
     * Layer needs to be below or on 6
     * The default layer should be 6
     * Mapsize is best if calculated on 56x56 grid with a tileSize of 256
     */

    // map constants
    const [layer, setLayer] = useState(6);
    const [mapSize, setMapSize] = useState(new Vector2(56, 56));
    const [tileSize, setTileSize] = useState(new Vector2(256, 256));
    const [lastCoords, setLastCoords] = useState(new Vector2(tileSize.x * mapSize.x / 2, tileSize.x * mapSize.x / 2));

    // react vars
    const [jsxElems, setJsxElems] = useState([]);
    const [count, setCount] = useState(0);
    const [updated, setUpdated] = useState(1);
    const [ignored, forceUpdate] = useReducer(x=>x+1,0);
    const containerLayer = useRef(null);

    const [layerStyle, setLayerStyle] = useState({
        minWidth: tileSize.x * mapSize.x + 'px',
        minHeight: tileSize.y * mapSize.y + 'px',
        position: 'absolute',
        //backgroundColor: '#ccf0ff',
        //backgroundImage: `url(${bgWaves})`,
        top: '0px',
        left: '0px',
    })

    const [chunkStyle, setChunkStyle] = useState({
        minWidth: tileSize.x + 'px',
        minHeight: tileSize.y + 'px',
        maxWidth: tileSize.x + 'px',
        maxHeight: tileSize.y + 'px',
        position: 'absolute',
    })

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

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_windsward_00/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_everfall_00/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_restlessshores_01/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_ebonscale_00/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_edengrove_00/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_reekwater_00/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_shattermtn_00/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_cutlasskeys_00/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        // for (let x = 0; x < mapSize.x; x++) {
        //     for (let y = 0; y < mapSize.y; y++) {
        //         var tile = {
        //             url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_brimstone_00/${layer}/${x}/${y}.png`,
        //             position: new Vector2(x * tileSize.x, y * tileSize.y),
        //         };
        //         mapTiles.push(tile)
        //     }
        // }

        var mapGrid = mapTiles.map((v) => {
            var positionStyle = { ...chunkStyle, left: `${v.position.x}px`, top: `${v.position.y}px` }
            return (<img key={`tile#${v.position.x}x_${v.position.y}y`} style={positionStyle} src={v.url ? v.url : ""} />);
        })

        setJsxElems(mapGrid);
        setCount(count + 1);
    }, []);

    return (<div style={layerStyle} className="transform-gpu transition-transform">
        {jsxElems}
    </div>);

} typeof Component;