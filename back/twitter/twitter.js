const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctData = require('./allData')

const twitter = {
    client_id: "YXVaTlVPUGJrYnBPcGJrdERwTFI6MTpjaQ", //a mettre dans le fichier config
    client_secret: "OhEVgTOExeb4OSe4A3EOzrKRzttKbPrUB10MULU-3B4jIKLMll"
};

async function getLinkWithTwitter() {
    try {
        let data = await fctDataBase.request('SELECT * FROM link_actions_reactions ' +
            '    LEFT JOIN actions on actions.id = link_actions_reactions.id_actions ' +
            '    WHERE id_service=1;', []);
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

module.exports = {
}