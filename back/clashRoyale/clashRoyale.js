const express = require('express');
const axios = require('axios');
const fctDataBase = require("../tools/fctDBRequest");
const router = express.Router();
const crConfig = require('../config/api.json').clash_royale

let playersWonTrophies = []
let playersLostTrophies = []

async function getLinkWithClashRoyale() {
    try {
        let data = await fctDataBase.request('SELECT * FROM link_actions_reactions ' +
            '    LEFT JOIN actions on actions.id = link_actions_reactions.id_actions ' +
            '    WHERE id_service=7;', []);
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

async function getPlayerInfos(arData) {
    let params_action = JSON.parse(arData.params_action)

    if (!params_action[0].value)
        return;
    try {
        const response = await axios.get(`https://api.clashroyale.com/v1/players/%23${params_action[0].value}`, {
            'headers': {
                'Authorization': 'Bearer ' + crConfig.token
            }
        });
        return(response.data);
    } catch (err) {
        console.log('err: ', err)
    }
}

function triggerReaction(arData, crData, isWin) {
    let data = {
        pseudo: crData.name,
        isWin: isWin,
    }
    if (arData.id_reactions === 2) {
        let params_reaction = JSON.parse(arData.params_reaction);
        require('../bot_telegram/app').sendMessageCRToGroupTelegram(data, params_reaction[0].value)
    } else if (arData.id_reactions === 5) {
        let params_reaction = JSON.parse(arData.params_reaction);
        require('../bot_telegram/app').sendMessageCRToUserTelegram(data, params_reaction[0].value)
    } else if (arData.id_reactions === 3) {
        let params_reaction = JSON.parse(arData.params_reaction);
        require('../bot_discord/app').sendMessageCRInGuilds(params_reaction[1].value, params_reaction[0].value, data)
    } else if (arData.id_reactions === 1) {
        let params_reaction = JSON.parse(arData.params_reaction);
        require('../bot_discord/app').sendMessageCRInMessage(params_reaction[0].value, data)
    } else if (arData.id_reactions === 6) {
        let params_reaction = JSON.parse(arData.params_reaction);
        require('../spotify/spotify').playSpecificSong(params_reaction[0].value, params_reaction[1].value, arData)
    } else if (arData.id_reactions === 4) {
        require('../twitter/twitter').postTweet(arData);
    } else if (arData.id_reactions === 7) {
        require('../reddit/reddit').postSubReddit(arData)
    }
}

async function compareWinTrophies(arData) {
    let player = await getPlayerInfos(arData);
    if (player === undefined || player.tag === undefined) return;
    let playerTrophies = playersWonTrophies.find((e) => e.user_id === arData.id_user && e.id_reaction === arData.id_reactions && e.tag === player.tag);
    if (playerTrophies !== undefined) {
        if (playerTrophies.nb_trophies !== player.trophies) {
            if (playerTrophies.nb_trophies < player.trophies) {
                triggerReaction(arData, player, true);
            }
            playerTrophies.nb_trophies = player.trophies;
        }
    } else {
        playersWonTrophies.push({
            user_id: arData.id_user,
            tag: player.tag,
            id_reaction: arData.id_reactions,
            nb_trophies: player.trophies
        })
    }
}

async function compareLoseTrophies(arData) {
    let player = await getPlayerInfos(arData);
    if (player === undefined || player.tag === undefined) return;
    let playerTrophies = playersLostTrophies.find((e) => e.user_id === arData.id_user && e.id_reaction === arData.id_reactions && e.tag === player.tag);
    if (playerTrophies !== undefined) {
        if (playerTrophies.nb_trophies !== player.trophies) {
            if (playerTrophies.nb_trophies > player.trophies) {
                triggerReaction(arData, player, false);
            }
            playerTrophies.nb_trophies = player.trophies;
        }
    } else {
        playersLostTrophies.push({
            user_id: arData.id_user,
            tag: player.tag,
            id_reaction: arData.id_reactions,
            nb_trophies: player.trophies
        })
    }
}

async function reloadCRManagement() {
    try {
        let linkForClashRoyale = await getLinkWithClashRoyale()

        linkForClashRoyale.forEach(item => {
            if (item.id_actions === 10) {
                compareWinTrophies(item)
            } else if (item.id_actions === 11) {
                compareLoseTrophies(item)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    reloadCRManagement
}