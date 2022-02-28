const fctDataBase = require("../tools/fctDBRequest");
const TwitchApi = require("node-twitch").default;

let alreadyPushChannelStartNew = []
let alreadyPushOverflow = []

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

        let result_stream = await twitch.getStreams({ channel: params_action[0].value })
        //console.log(result_stream, params_action[0].value)
        if (result_stream.data && result_stream.data.length > 0 && !alreadyPushChannelStartNew.find(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)) {
            if (data.id_reactions === 3) {
                result_stream.data.forEach(item => require('../bot_discord/app').sendMessageTwitchInGuilds(params_reaction[1].value, params_reaction[0].value, item))
            } else if (data.id_reactions === 1) {
                result_stream.data.forEach(item => require('../tools/fctMail').sendMailTwitch(params_reaction[0].value, item))
            }
            alreadyPushChannelStartNew.push({id_user: data.id_user, streamerName: params_action[0].value, id_reactions: data.id_reactions})
            console.log("New stream")
        } else if (!result_stream.data || result_stream.data.length <= 0) {
            let index = alreadyPushChannelStartNew.findIndex(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)
            alreadyPushChannelStartNew.splice(index, 1);
            console.log("Stream disconnect")
        } else {
            console.log("Already Emit")
        }

    } catch (err) {
        console.log(err);
    }
}

async function ChannelStartOverflow(data) {
    try {
        let params_action = JSON.parse(data.params_action)
        let params_reaction = JSON.parse(data.params_reaction)

        let result_stream = await twitch.getStreams({ channel: params_action[0].value })
        //console.log(result_stream, params_action[0].value)
        if (result_stream.data && result_stream.data.length > 0 && parseInt(params_action[1].value) >= result_stream.viewer_count && !alreadyPushOverflow.find(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)) {
            if (data.id_reactions === 3) {
                result_stream.data.forEach(item => require('../bot_discord/app').sendMessageTwitchInGuilds(params_reaction[1].value, params_reaction[0].value, item))
            } else if (data.id_reactions === 1) {
                result_stream.data.forEach(item => require('../tools/fctMail').sendMailTwitch(params_reaction[0].value, item))
            }
            alreadyPushOverflow.push({id_user: data.id_user, streamerName: params_action[0].value, id_reactions: data.id_reactions})
            console.log("New stream overflow")
        } else if (!result_stream.data || result_stream.data.length <= 0 || parseInt(params_action[1].value) < result_stream.viewer_count) {
            let index = alreadyPushOverflow.findIndex(elem => elem.id_user === data.id_user && elem.streamerName === params_action[0].value && elem.id_reactions === data.id_reactions)
            alreadyPushOverflow.splice(index, 1);
            console.log("Stream disconnect overflow or below")
        } else {
            console.log("Already Emit overflow or sup")
        }

    } catch (err) {
        console.log(err);
    }
}

async function reloadStreamsManagement() {
    try {
        let linkForTwitch = await getLinkWithTwitch()

        linkForTwitch.forEach(item => {
            console.log(item);
            if (item.id_actions === 9 || item.id_actions === 4) {
                console.log("==== Result Stream ====")
                ChannelStartNewStream(item)
            } else if (item.id_actions === 8) {
                console.log("==== Amout view ====")
                ChannelStartOverflow(item)
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