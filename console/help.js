module.exports = {
    name: "help",
    execute(client) {
        var consola = client.console.map(c => {
            return c.name;
        })
        console.log(consola.join(" || "));
    }
}