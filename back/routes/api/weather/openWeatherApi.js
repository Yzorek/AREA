const axios = require("axios");
const weatherConfig = require('../../../config/api.json').weather

async function currentWeatherData(req, res) {

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.countryCode}&appid=${weatherConfig.apiKey}&units=${req.body.units}`);

        res.status(200).send(response.data);
    } catch (err) {
        if (err.response) {
            res.status(500).send({message: err})
        }
    }
}


module.exports = {
    currentWeatherData
}