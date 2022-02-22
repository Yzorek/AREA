const commands = [
    {name: 'ping', fct: require("./commands/ping/ping"), description: 'Command for testing if bot is active.'},
    {name: 'help', fct: require("./commands/help/help"), description: 'Command for display all commands.'},
]

module.exports = {
    commands,
}