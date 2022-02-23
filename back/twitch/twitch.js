const fctDataBase = require("../tools/fctDBRequest");
const TwitchApi = require("node-twitch").default;

const twitch = new TwitchApi({
    client_id: "t7f8n8gwo0206l8n3vduq1sqkeb26y", //a mettre dans le fichier config
    client_secret: "lgz8jjf6itmd6ya6liqzni85fi2lt2"
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

async function reloadStreamsManagement() {
    try {
        let linkForTwitch = await getLinkWithTwitch()


    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getStream,
    reloadStreamsManagement
}