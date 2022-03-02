const Trello = require("trello");
const trello = new Trello("2ee5c57dbc519efde518db41182a98ec", "79cc4d772f0086dfa5ca6ef4f162b75489c6f2cf985a0a0c57d3cd960aeceeb7");

trello.addCard('Clean car', 'Wax on, wax off', myListId,
    function (error, trelloCard) {
        if (error) {
            console.log('Could not add card:', error);
        }
        else {
            console.log('Added card:', trelloCard);
        }
    });