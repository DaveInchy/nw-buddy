import { Component, useState } from "react";
import { logError, logMessage } from '../debug';
import bgWaves from '../assets/waves-anim.svg';
import Vector2 from "../vector2";

export default class mapGrid extends Component
{
    chunkCount = new Vector2(56,56);
    chunkSize = new Vector2(256,256);

    mapSize = new Vector2(this.chunkCount.x * this.chunkSize.x, this.chunkCount.y * this.chunkSize.y)

    containerStyle = {
        minWidth: this.chunkSize.x * this.chunkCount.x + 'px',
        minHeight: this.chunkSize.y * this.chunkCount.y + 'px',
        position: 'absolute',
        backgroundColor: '#ccf0ff',
        backgroundImage: `url(${bgWaves})`,
        top: '0px',
        left: '0px',
    };

    chunkStyle = {
        minWidth: this.chunkSize.x + 'px',
        minHeight: this.chunkSize.y + 'px',
        position: 'absolute',
    };

    mapChunks = new Array();

    componentDidMount = () => {
        for (let x = 0; x < this.chunkCount.x; x++) {
            for (let y = 0; y < this.chunkCount.y; y++) {
                var chunk = {
                    url: `https://cdn.newworldfans.com/newworldmap/09-2022/${layer}/${x}/${y}.png`,
                    position: new Vector2(x * this.chunkSize.x, y * this.chunkSize.y),
                };
                this.mapChunks.push(chunk);
            }
        }
    }

    getChunkList = () => {
        return this.mapChunks.map((chunk) => {
            var positionStyle = { ...this.chunkStyle, left: `${chunk.position.x}px`, top: `${chunk.position.y}px` }
            return (<img key={`\[${chunk.position.x}\,\ ${chunk.position.y}\]`} style={positionStyle} src={v.url ? v.url : ""} />);
        });
    }

    render() {
        return <div id={'mapGrid'} style={this.containerStyle}>
            {this.getChunkList().map((chunkTile) => <chunkTile/>)}
        </div>;
    }
}