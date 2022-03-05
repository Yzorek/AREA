const express = require('express');
const axios = require('axios');
const fctDataBase = require("../tools/fctDBRequest");
express.Router();
const https = require('https')
const {sendMessageSpotifyInGuilds} = require("../bot_discord/app");

let lastTrackInfo = []
let isUserCurrentlyPlaying = []

async function getLinkWithSpotify() {
    try {
        let data = await fctDataBase.request('SELECT * FROM link_actions_reactions ' +
            '    LEFT JOIN actions on actions.id = link_actions_reactions.id_actions ' +
            '    WHERE id_service=2;', []);
        let target = []

        data.rows.forEach(item => {
            if (item.is_active)
                target.push(item);
        })
        return target;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function getUserIdSpotify(arData) {
    let spotifyToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

        if (data.rowCount === 0) {
            console.log("This user doesn't exist");
        } else {
            spotifyToken = data.rows[0].spotify_token;
        }
    } catch (err) {
        console.log(err);
    }
    let bearer = 'Bearer ' + spotifyToken;
    try {
        let res = await axios.get(`https://api.spotify.com/v1/me`,
            {
                'headers': {
                    'Content-type': 'application/json',
                    'Authorization': bearer,
                }
            });
        return (res.data.id)
    } catch (err) {
        console.log(err.response.data.error)
    }
}

async function getLastTrackID(arData) {
    let spotifyToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

        if (data.rowCount === 0) {
            console.log("This user doesn't exist");
        } else {
            spotifyToken = data.rows[0].spotify_token;
        }
    } catch (err) {
        console.log(err);
    }
    let bearer = 'Bearer ' + spotifyToken;
    try {
        let res = await axios.get(`https://api.spotify.com/v1/me/tracks`,
            {
                'headers': {
                    'Content-type': 'application/json',
                    'Authorization': bearer,
                }
            });
        return (res.data.items[0])
    } catch (err) {
        console.log(err.response.data.error)
    }
}

async function getPlaybackState(arData) {
    let spotifyToken = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(arData.id_user)]);

        if (data.rowCount === 0) {
            console.log("This user doesn't exist");
        } else {
            spotifyToken = data.rows[0].spotify_token;
        }
    } catch (err) {
        console.log(err);
    }
    let bearer = 'Bearer ' + spotifyToken;
    try {
        let res = await axios.get(`https://api.spotify.com/v1/me/player`,
            {
                'headers': {
                    'Content-type': 'application/json',
                    'Authorization': bearer,
                }
            });
        return (res.data)
    } catch (err) {
        console.log(err.response.data.error)
    }
}

async function userLikedTrack(arData) {
    let me = await getUserIdSpotify(arData)
    let lastTrackID = await getLastTrackID(arData)
    if (lastTrackID === undefined || lastTrackID.track.id === undefined || lastTrackID.added_at === undefined) return;
    let trackAdded = lastTrackInfo.find((e) => e.user_id === me && e.id_reaction === arData.id_reactions)
    if (trackAdded !== undefined) {
        console.log(trackAdded.track_id)
        console.log("------------------------/////")
        console.log(lastTrackID.track.id)
        if (trackAdded.track_id !== lastTrackID.track.id) {
            if (Date.parse(trackAdded.date) < Date.parse(lastTrackID.added_at)) {
                let data = {
                    username: me,
                    track_uri: lastTrackID.track.uri,
                    playerState: false,
                }
                if (arData.id_reactions === 2) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageSpotifyLikedTrackInTelegramToGroup(data, params_reaction[0].value)
                } else if (arData.id_reactions === 3) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageSpotifyInGuilds(params_reaction[1].value, params_reaction[0].value, data)
                } else if (arData.id_reactions === 1) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageSpotifyInMessage(params_reaction[0].value, data)
                } else if (arData.id_reactions === 5) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageSpotifyLikedTrackToUserTelegram(data, params_reaction[0].value)
                } else if (arData.id_reactions === 4) {
                    require('../twitter/twitter').postTweet(arData)
                }
            }
            trackAdded.track_id = lastTrackID.track.id;
            trackAdded.date = lastTrackID.added_at;
        }
    } else {
        lastTrackInfo.push({
                user_id: me,
                id_reaction: arData.id_reactions,
                track_id: lastTrackID.track.id,
                date: lastTrackID.added_at,
            }
        )
    }
}

async function userPlayTrack(arData) {
    let me = await getUserIdSpotify(arData)
    let playerState = await getPlaybackState((arData))
    let userPlayState = isUserCurrentlyPlaying.find((e) => e.user_id === me && e.id_reaction === arData.id_reactions)
    if (userPlayState === undefined) {
        isUserCurrentlyPlaying.push({
            user_id: me,
            id_reaction: arData.id_reactions,
            playerState: undefined,
        })
    } else {
        if (userPlayState.playerState !== playerState.actions.disallows.resuming) {
            if (playerState.actions.disallows.resuming === true) {
                let data = {
                    username: me,
                    playerState: playerState.actions.disallows.resuming,
                    track_uri: playerState.item.uri,
                }
                if (arData.id_reactions === 2) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageSpotifyLikedTrackInTelegramToGroup(data, params_reaction[0].value)
                } else if (arData.id_reactions === 3) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageSpotifyInGuilds(params_reaction[1].value, params_reaction[0].value, data)
                } else if (arData.id_reactions === 1) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_discord/app').sendMessageSpotifyInMessage(params_reaction[0].value, data)
                } else if (arData.id_reactions === 5) {
                    let params_reaction = JSON.parse(arData.params_reaction);
                    require('../bot_telegram/app').sendMessageSpotifyLikedTrackToUserTelegram(data, params_reaction[0].value)
                } else if (arData.id_reactions === 4) {
                    require('../twitter/twitter').postTweet(arData)
                }
            }
            userPlayState.playerState = playerState.actions.disallows.resuming
        }
    }
}

async function reloadSpotifyManagement() {
    try {
        let linkForSpotify = await getLinkWithSpotify()

        linkForSpotify.forEach(item => {
            if (item.id_actions === 7) {
                console.log("==== Get Tracks ====")
                userLikedTrack(item)
            } else if (item.id_actions === 10) {
                console.log("==== Get State Playback ====")
                userPlayTrack(item)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    reloadSpotifyManagement,
}