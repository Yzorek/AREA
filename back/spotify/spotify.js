const express = require('express');
const axios = require('axios');
const fctDataBase = require("../tools/fctDBRequest");
const moment = require("moment");
express.Router();

const spotify = {
    client_id: "187c0fc794714871bbe61948b5232d56", //a mettre dans le fichier config
    client_secret: "0204c7a6e66c4be698d5286f5bf5e7a6"
};

let lastTrackInfo = []
let isUserCurrentlyPlaying = []

async function getRefreshToken(userId) {
    let spotifyToken = "";
    let date = "";
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(userId)]);

        if (data.rowCount === 0) {
            console.log("This user doesn't exist");
        } else {
            spotifyToken = data.rows[0].spotify_refresh;
            date = data.rows[0].spotify_date;
        }
    } catch (err) {
        console.log(err);
    }
    if (moment().diff(date, 'seconds') < 3000) {
        return;
    }
    if (spotifyToken === null || spotifyToken === undefined) {
        try {
            await fctDataBase.request('DELETE FROM link_service WHERE id_user=$1 AND id_service=\'2\';', [parseInt(userId)]);
        } catch (err) {
            console.log(err);
        }
        return;
    }
    try {
        let body = new URLSearchParams({
            'refresh_token': spotifyToken,
            'grant_type': 'refresh_token',
            'client_id': spotify.client_id
        });
        let auth = 'Basic ' + Buffer.from(spotify.client_id + ":" + spotify.client_secret).toString("base64");
        const response = await axios.post(`https://accounts.spotify.com/api/token`, body,
        {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': auth,
            }
        });
        try {
            await fctDataBase.request('UPDATE clients SET spotify_token=$1 WHERE id=$2;', [response.data.access_token, parseInt(userId)]);
            await fctDataBase.request('UPDATE clients SET spotify_refresh=$1 WHERE id=$2;', [response.data.refresh_token, parseInt(userId)]);
            await fctDataBase.request('UPDATE clients SET spotify_date=$1 WHERE id=$2;', [moment().format('YYYY-MM-DDTHH:mm:ss'), parseInt(userId)]);
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}

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

async function getSpotifyUsers() {
    try {
        let data = await fctDataBase.request('SELECT * FROM link_service WHERE id_service=\'2\';');
        let target = []

        data.rows.forEach(item => {
            target.push(item.id_user);
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
        console.log(err)
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
        console.log(err)
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
        console.log(err)
    }
}

async function searchForItem(arData, song) {
    console.log(arData)
    console.log('song: ', song);
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
        let res = await axios.get(`https://api.spotify.com/v1/search?q=${song}&type=track`,
            {
                'headers': {
                    'Authorization': bearer,
                    'Content-type': 'application/json',
                }
            });
        console.log(res.data)
        return (res.data)
    } catch (err) {
        console.log(err)
    }
}

async function getTrackByArtist(info, artist) {
    let trackFound = undefined
    if (info)
        trackFound = info.tracks.items.find(item => item.album.artists.some(item => item.name === artist))
    return (trackFound)
}

async function playSpecificSong(artist, song, arData) {
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
        let item = await searchForItem(arData, song)
        let track = await getTrackByArtist(item, artist)
        let res = await axios.put(`https://api.spotify.com/v1/me/player/play`,
            {
                "context_uri": "spotify:album:" + track.album.id,
                "offset": {
                    "position": track.track_number - 1,
                },
                "position_ms": 0,
            },
            {
                'headers': {
                    'Authorization': bearer,
                    'Content-type': 'application/json',
                }
            });
        return (res.data)
    } catch (err) {
        console.log(err)
    }
}

async function userLikedTrack(arData) {
    let me = await getUserIdSpotify(arData)
    let lastTrackID = await getLastTrackID(arData)
    if (lastTrackID === undefined || lastTrackID.track.id === undefined || lastTrackID.added_at === undefined) return;
    let trackAdded = lastTrackInfo.find((e) => e.user_id === me && e.id_reaction === arData.id_reactions)
    if (trackAdded !== undefined) {
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
        if (playerState.actions) {
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
}

async function reloadSpotifyManagement() {
    try {
        let linkForSpotify = await getLinkWithSpotify()
        let spotifySubed = await getSpotifyUsers()

        spotifySubed.forEach(userId => {
            getRefreshToken(userId);
        })

        linkForSpotify.forEach(item => {
            if (item.id_actions === 5) {
                userLikedTrack(item)
            } else if (item.id_actions === 8) {
                userPlayTrack(item)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getLinkWithSpotify,
    reloadSpotifyManagement,
    playSpecificSong,
}