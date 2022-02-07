const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function newWidgetWeatherConfig(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request('INSERT INTO widget_config_weather(id_user, id_widget, id_weather_config) VALUES ($1, $2, $3);', [parseInt(dataToken.id), req.body.idWidget, req.body.idConfig]);
        res.status(200).send({
            message: 'done!',
        });
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    newWidgetWeatherConfig
}