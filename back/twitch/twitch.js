const fctDataBase = require("../tools/fctDBRequest");
const TwitchApi = require("node-twitch").default;

let alreadyPushChannelStartNew = []
let alreadyPushOverflow = []
let alreadyPushSpecificGame = []

const twitch = new TwitchApi({
    client_id: "t7f8n8gwo0206l8n3vduq1sqkeb26y", //a mettre dans le fichier config
    client_secret: "rkdrbtd9admj8t8l8kyyp7i5n1ngk7"
});

async function getStream(){
    const streams = await twitch.getStreams({ channel: "ponce" });
    console.log("Stream =============================");
    console.log(streams);
}

async function getLinkWithTwitch() {
    try {
        let data = await fctDataBase.request('SELECT * FROM link_actions_reactions ' +
            '    LEFT JOIN actions on actions.id = link_actions_reactions.id_actions ' +
            '    WHERE id_service=4;', []);
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

async function ChannelStartNewStream(data) {
    try {
        let params_action = JSON.parse(data.params_action)
        let params_reaction = JSON.parse(data.params_reaction)

        if (!params_action[0].value)
            return;
        let result_stream = await twitch.getStreams({ channel: params_action[0].value })
        if (result_stream.data && result_stream.data.length > 0 && !alreadyPushChannelStartNew.find(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)) {
            if (data.id_reactions === 3) {
                result_stream.data.forEach(item => require('../bot_discord/app').sendMessageTwitchInGuilds(params_reaction[1].value, params_reaction[0].value, item))
            } else if (data.id_reactions === 1) {
                result_stream.data.forEach(item => require('../bot_discord/app').sendMessageTwitchInMessage(params_reaction[0].value, item))
            } else if (data.id_reactions === 2) {
                result_stream.data.forEach(item => require('../bot_telegram/app').sendMessageTwitchInTelegramToGroup(item, params_reaction[0].value))
            } else if (data.id_reactions === 5) {
                result_stream.data.forEach(item => require('../bot_telegram/app').sendMessageTwitchInTelegramToUser(item, params_reaction[0].value))
            } else if (data.id_reactions === 4) {
                result_stream.data.forEach(item => require('../twitter/twitter').postTweet(data))
            } else if (data.id_reactions === 6) {
                result_stream.data.forEach(item => require('../spotify/spotify').playSpecificSong(params_reaction[0].value, params_reaction[1].value, data))
            } else if (data.id_reactions === 7) {
                result_stream.data.forEach(item => require('../reddit/reddit').postSubReddit(data))
            }
            alreadyPushChannelStartNew.push({id_user: data.id_user, streamerName: params_action[0].value, id_reactions: data.id_reactions})
        } else if (!result_stream.data || result_stream.data.length <= 0) {
            let index = alreadyPushChannelStartNew.findIndex(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)
            alreadyPushChannelStartNew.splice(index, 1);
        }

    } catch (err) {
        console.log(err);
    }
}

async function ChannelStartOverflow(data) {
    try {
        let params_action = JSON.parse(data.params_action)
        let params_reaction = JSON.parse(data.params_reaction)

        if (!params_action[0].value)
            return;
        let result_stream = await twitch.getStreams({ channel: params_action[0].value })
        if (result_stream.data && result_stream.data.length > 0 && parseInt(params_action[1].value) <= parseInt(result_stream.data[0].viewer_count) && !alreadyPushOverflow.find(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)) {
            if (data.id_reactions === 3) {
                result_stream.data.forEach(item => {
                    require('../bot_discord/app').sendClassicMessage(params_reaction[1].value, params_reaction[0].value, {title: 'New RECORD !!', message: `${params_action[0].value} have exceed ${params_action[1].value} viewer !`})
                    require('../bot_discord/app').sendMessageTwitchInGuilds(params_reaction[1].value, params_reaction[0].value, item)
                })
            } else if (data.id_reactions === 1) {
                result_stream.data.forEach(item => require('../bot_discord/app').sendClassicMessageToUser(params_reaction[0].value, {title: 'New RECORD !!', message: `${params_action[0].value} have exceed ${params_action[1].value} viewer !`}))
            } else if (data.id_reactions === 2) {
                result_stream.data.forEach(item => require('../bot_telegram/app').sendMessageTwitchInTelegramToGroupOverflow(item, params_reaction[0].value))
            } else if (data.id_reactions === 5) {
                result_stream.data.forEach(item => require('../bot_telegram/app').sendMessageTwitchInTelegramToUserOverflow(item, params_reaction[0].value))
            } else if (data.id_reactions === 4) {
                result_stream.data.forEach(item => require('../twitter/twitter').postTweet(data))
            } else if (data.id_reactions === 6) {
                result_stream.data.forEach(item => require('../spotify/spotify').playSpecificSong(params_reaction[0].value, params_reaction[1].value, data))
            } else if (data.id_reactions === 7) {
                result_stream.data.forEach(item => require('../reddit/reddit').postSubReddit(data))
            }
            alreadyPushOverflow.push({id_user: data.id_user, streamerName: params_action[0].value, id_reactions: data.id_reactions})
        } else if (!result_stream.data || result_stream.data.length <= 0 || parseInt(params_action[1].value) > parseInt(result_stream.data[0].viewer_count)) {
            let index = alreadyPushOverflow.findIndex(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)
            alreadyPushOverflow.splice(index, 1);
        }

    } catch (err) {
        console.log(err);
    }
}

async function ChannelStartSpecificGame(data) {
    try {
        let params_action = JSON.parse(data.params_action)
        let params_reaction = JSON.parse(data.params_reaction)

        if (!params_action[0].value)
            return;
        let result_stream = await twitch.getStreams({ channel: params_action[0].value })
        if (result_stream.data && result_stream.data.length > 0 && params_action[1].value === result_stream.data[0].game_name && !alreadyPushSpecificGame.find(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)) {
            if (data.id_reactions === 3) {
                result_stream.data.forEach(item => {
                    require('../bot_discord/app').sendMessageTwitchInGuilds(params_reaction[1].value, params_reaction[0].value, item)
                })
            } else if (data.id_reactions === 1) {
                result_stream.data.forEach(item => require('../bot_discord/app').sendClassicMessageToUser(params_reaction[0].value, {title: 'New RECORD !!', message: `${params_action[0].value} play to ${params_action[1].value}!`}))
            } else if (data.id_reactions === 2) {
                result_stream.data.forEach(item => require('../bot_telegram/app').sendMessageTwitchInTelegramToGroupSpecificGame(item, params_reaction[0].value))
            } else if (data.id_reactions === 5) {
                result_stream.data.forEach(item => require('../bot_telegram/app').sendMessageTwitchInTelegramToUserSpecificGame(item, params_reaction[0].value))
            } else if (data.id_reactions === 4) {
                result_stream.data.forEach(item => require('../twitter/twitter').postTweet(data))
            } else if (data.id_reactions === 6) {
                result_stream.data.forEach(item => require('../spotify/spotify').playSpecificSong(params_reaction[0].value, params_reaction[1].value, data))
            } else if (data.id_reactions === 7) {
                result_stream.data.forEach(item => require('../reddit/reddit').postSubReddit(data))
            }
            alreadyPushSpecificGame.push({id_user: data.id_user, streamerName: params_action[0].value, id_reactions: data.id_reactions})
        } else if (!result_stream.data || result_stream.data.length <= 0 || params_action[1].value !== result_stream.data[0].game_name) {
            let index = alreadyPushSpecificGame.findIndex(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)
            alreadyPushSpecificGame.splice(index, 1);
        }

    } catch (err) {
        console.log(err);
    }
}

async function reloadStreamsManagement() {
    try {
        let linkForTwitch = await getLinkWithTwitch()

        linkForTwitch.forEach(item => {
            if (item.id_actions === 7 || item.id_actions === 3) {
                ChannelStartNewStream(item)
            } else if (item.id_actions === 6) {
                ChannelStartOverflow(item)
            } else if (item.id_actions === 2) {
                ChannelStartSpecificGame(item)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getStream,
    reloadStreamsManagement
}