const fs = require("fs");

module.exports = {
  name: 'ready',
  run(client) {
    console.log(`El bot ${client.user.username} esta listo!`)
    console.log("======================================================");
    client.user.setPresence({
      activity: {
        name: "En pruebas",
        type: "PLAYING",
      },
      status: "ONLINE",
    });
    fs.readdirSync("./console").map(m=>{
      const i = require(`../console/${m}`)
      client.console.set(i.name, i)
    })
    var consola = process.openStdin()
    function y(){
      process.stdout.write("->")
    }
    y()
    consola.addListener("data", d =>{
      var data = d.toString().toLowerCase().trim()
      if (!data) return y()
      const command = client.console.get(data)
      if(!command) return console.log("Ese comando no existe"), y()
      command.execute(client, y)
      y()
    })
  }
}