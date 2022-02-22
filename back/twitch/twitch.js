const TwitchApi = require("node-twitch").default;

const twitch = new TwitchApi({
    client_id: "t7f8n8gwo0206l8n3vduq1sqkeb26y",
    client_secret: "lgz8jjf6itmd6ya6liqzni85fi2lt2"
});

async function getStream(){
    const streams = await twitch.getStreams({ channel: "ponce" });
    console.log("Stream =============================");
    console.log(streams);
}

module.exports = {
    getStream
}