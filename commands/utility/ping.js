
module.exports = {
    name: 'ping',
    description: 'Muestra el ping entre la API de Discord y el bot',
    usage: 'ping',
    category: __dirname.split('\\').pop(),
    disable: true,

    execute: async (message, args) => {

        let ping = Math.floor(message.client.ws.ping);
        message.channel.send(":ping_pong: Pong!")
            .then(m => {
                m.edit(`:incoming_envelope: Ping Mensajes: \`${ Math.floor(+ m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${+ ping} ms\``);
            });
    }
}
