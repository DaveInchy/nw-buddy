import React from 'react';
import { connect } from 'react-redux'

import connectedPlayers from './connectedPlayers'
import trackedPlayer from './trackedPlayer'
import groupCode from './groupCode'
import { NO_GROUP } from './groupCode'
import connectionStatus from './connectionStatus'

const WEBSOCKET_URI2 = `wss://newworldminimap.com`
const WEBSOCKET_URI = `wss://localhost.newworldminimap.com:42224`

class LocationSharingController extends React.Component {
    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        this.websocket_uri_override = params.get('ws_override');

        if (code !== null){
          this.props.joinGroup(code)
        }

        this.ws = null
        this.resetWebsocket()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.groupCode !== prevProps.groupCode) {
            this.resetWebsocket()
        }
        // if (this.props.coords !== prevProps.coords) {
        //     this.broadcastPosition()
        // }
    }

    updatePlayerLocation(playerId, playerName, position) {
        const previousConnectedCount = Object.keys(this.props.connectedPlayers).length
        this.props.updatePlayerLocation({playerId, playerName, position})
        if (previousConnectedCount == 0) {
            console.log(`Tracking player ${playerId}`)
            this.props.trackPlayer(playerId)
        }
    }

    resetWebsocket() {
        if (this.ws !== null) {
            this.ws.close()
        }

        let full_wss_uri;
        if (this.props.groupCode === NO_GROUP) {
            // Connect to localhost wss
            full_wss_uri = `${this.websocket_uri_override || WEBSOCKET_URI}/Location`;
        } else {
            // Connect to heroku wss
            full_wss_uri = `${WEBSOCKET_URI2}/locationSharing?groupCode=${this.props.groupCode}`
        }
        console.log('Connecting to websocket uri:', full_wss_uri);
        this.ws = new WebSocket(full_wss_uri);

        this.ws.onmessage = (event) => {
            this.props.setConnectionStatus(1)
            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch (e) {
                console.error(`ERROR: Couldn't parse message '${event.data}'`);
                return;
            }
            if (msg.type === 'LOCAL_POSITION_UPDATE') {
                let { playerName, position } = msg;
                let playerId = "local"
                this.updatePlayerLocation(playerId, playerName, position)
            } else if (msg.type === 'PLAYER_DISCONNECT') {
                let { playerId } = msg;
                this.props.removePlayer({playerId})
            } else if (msg.type === 'POSITION_UPDATE') {
                let { playerName, playerId, position } = msg;
                this.updatePlayerLocation(playerId, playerName, position)
            } else {
                console.error(`Unhandled message: '${event.data}'`)
            }
        };
        this.ws.onopen = (e) => {
            console.log('Connection open', e);
            this.props.setConnectionStatus(2)
        };
        this.ws.onclose = (e) => {
            console.log('Connection closed', e);
            let status = (e.code === 1005 ? 4 : 3)
            this.props.setConnectionStatus(status)
        };
        this.ws.onerror = function(error) {
            console.error(`ERROR: '${error.message}'`);
            console.error('ERROR JSON: '+ JSON.stringify(error));
        };
    }

    // Browser doesn't need to broadcast position
    // broadcastPosition() {
    //     if (this.ws?.readyState === 1) {
    //         let msg = {
    //             playerName: this.props.playerName,
    //             position: this.props.coords,
    //         }
    //         this.ws.send(JSON.stringify(msg));
    //     }
    // }

    render() {
        return null
    }
}

function mapStateToProps(state) {
    const { groupCode, connectedPlayers } = state;
    return { groupCode, connectedPlayers };
}

const mapDispatchToProps = {
    updatePlayerLocation: connectedPlayers.actions.updatePlayerLocation,
    removePlayer: connectedPlayers.actions.removePlayer,
    setConnectionStatus: connectionStatus.actions.setStatus,
    trackPlayer: trackedPlayer.actions.trackPlayer,
    joinGroup: groupCode.actions.joinGroup,
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSharingController)
