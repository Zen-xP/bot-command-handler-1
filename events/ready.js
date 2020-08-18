const fs = require("fs");
const { log } = require("console");
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
    consola.addListener("data", d =>{
      const command = client.console.get(d.toString().toLowercase().trim())
      if(!command) return
    })
  }
}