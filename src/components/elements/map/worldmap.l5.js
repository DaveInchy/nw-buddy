import React, { CSSProperties, Component, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import Storage from "../storage";
import Vector2 from "../vector2";
import bgWaves from "../assets/waves-anim.svg";
import overwolf, { OWGamesEvents } from "@overwolf/overwolf-api-ts";
import { logError, logMessage } from "../debug";

export default function Map({props, offsetX = 0, offsetY = 0}) {

    /* Guidelines & NOTES
     * Original Tilesize is 1024x1024
     * Layer needs to be below or on 6
     * The default layer should be 6
     * Mapsize is best if calculated on 56x56 grid with a tileSize of 256
     */
    // props
    const { scale } = props;

    if (scale !== undefined)
        var gameinfo = wait(10).then(async () => await OWGamesEvents.prototype.getInfo().then(data => data).catch(e => console.error(e)));

    // map constants
    const [layer, setLayer] = useState(5);
    const [ratio, setRatio] = useState(56 / (56 - 28))
    const [mapSize, setMapSize] = useState(new Vector2(56 - 28, 56 - 28));
    const [tileSize, setTileSize] = useState(new Vector2(256 * ratio, 256 * ratio));
    const [lastCoords, setLastCoords] = useState(new Vector2(tileSize.x * mapSize.x * scale / 2, tileSize.x * mapSize.x * scale / 2));

    // react vars
    const [jsxElems, setJsxElems] = useState([]);
    const [count, setCount] = useState(0);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const containerLayer = useRef(null);

    const [layerStyle, setLayerStyle] = useState({
        minWidth: (tileSize.x * mapSize.x) * scale + 'px',
        minHeight: (tileSize.y * mapSize.y) * scale + 'px',
        position: 'absolute',
        //backgroundColor: '#ccf0ff',
        //backgroundImage: `url(${bgWaves})`,
        top: '0px',
        left: '0px',
    })

    const [chunkStyle, setChunkStyle] = useState({
        minWidth: (tileSize.x * scale) + 'px',
        minHeight: (tileSize.y * scale) + 'px',
        maxWidth: (tileSize.x * scale) + 'px',
        maxHeight: (tileSize.y * scale) + 'px',
        position: 'absolute',
    })

    var mapTiles = [];

    useEffect(() => {

        if (!scale || !gameinfo || gameinfo.res.game_info.map === "NewWorld_VitaeEterna") {

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/09-2022/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

        }
        if (gameinfo.res.game_info.map !== "NewWorld_VitaeEterna") {

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_windsward_00/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_everfall_00/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_restlessshores_01/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_ebonscale_00/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_edengrove_00/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_reekwater_00/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_shattermtn_00/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_cutlasskeys_00/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

            for (let x = 0; x < mapSize.x; x++) {
                for (let y = 0; y < mapSize.y; y++) {
                    var tile = {
                        url: `https://cdn.newworldfans.com/newworldmap/05-2022/dungeons/nw_dungeon_brimstone_00/${layer}/${x}/${y}.png`,
                        position: new Vector2(x * tileSize.x, y * tileSize.y),
                    };
                    mapTiles.push(tile)
                }
            }

        }

        var mapGrid = mapTiles.map((v) => {
            var positionStyle = { ...chunkStyle, left: `${v.position.x}px`, top: `${v.position.y}px` }
            return (<img key={`tile#${v.position.x}x_${v.position.y}y`} style={positionStyle} src={v.url ? v.url : ""} />);
        })

        setJsxElems(mapGrid);
        setCount(count + 1);
    }, []);

    return (<div style={layerStyle} class="transform-gpu transition-transform">
        {jsxElems}
    </div>);

} typeof Component;