module.exports = {
  name: 'ready',
  run(client) {
    console.log(`El bot ${client.user.username} esta listo!`)
    client.user.setPresence({
      activity: {
        name: "En pruebas",
        type: "ONLINE",
      },
      status: "online",
    });
  }
}