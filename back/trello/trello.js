const Trello = require("trello");
const trello = new Trello("2ee5c57dbc519efde518db41182a98ec", "df5a2946de7c1b9d6fe474dcb1548328713b97a417126a61add92c609f617000");


function myListId() {

}

trello.addCard('Clean car', 'Wax on, wax off', myListId,
    function (error, trelloCard) {
        if (error) {
            console.log('Could not add card:', error);
        }
        else {
            console.log('Added card:', trelloCard);
        }
    });