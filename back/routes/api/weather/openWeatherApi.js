const axios = require("axios");
const weatherConfig = require('../../../config/api.json').weather

async function currentWeatherData(req, res) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.city},${req.query.countryCode}&appid=${weatherConfig.apiKey}&units=${req.query.units}`);

        res.status(200).send({
            coord: response.data.coord,
            weather: response.data.weather[0],
            main: response.data.main,
            wind: response.data.wind,
            sys: response.data.sys,
            name: response.data.name,
        });
    } catch (err) {
        if (err.response) {
            res.status(500).send({message: err})
        }
    }
}


module.exports = {
    currentWeatherData
}