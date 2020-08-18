const ascii = require("ascii-table")

module.exports = {
    name: "guilds",
    execute(client) {
        var guilds = new ascii().setHeading("Nombre", "ID", "Region", "Miembros")
        client.guilds.cache.map(g => {
            guilds.addRow(g.name, g.id, g.region, g.memberCount)
        })
        console.log(guilds.toString());
        delete guilds
        console.log(`Total: ${client.guilds.cache.size} servidores`);
    }
}