const dataCountry = require("./data/country.json").country

function getDataCityByISO(req, res) {
    let country = dataCountry.find(item => item.iso2 === req.query.iso2)

    if (country) {
        const filterSearch = country.cities.filter(element => element.toLowerCase().includes(req.query.search.toLowerCase())).slice(0, 7);
        res.status(200).send(filterSearch)
    } else {
        res.status(404).send({message: 'iso not found.'})
    }
}

module.exports = {
    getDataCityByISO
}