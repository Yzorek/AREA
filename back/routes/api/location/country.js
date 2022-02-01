const dataCountry = require("./data/country.json").country

function getDataCountry(req, res) {
    const filterSearch = dataCountry.filter(element => element.label.includes(req.query.search)).slice(0, 7);
    res.status(200).send(filterSearch)
}

module.exports = {
    getDataCountry
}