const db = require('megadb')

module.exports = {
    name: 'autoreply',
    description: 'Configura si deseas que responda a mensajes automaticamente',
    usage: 'autoreply',
    aliases:['reply'],
    category: __dirname.split('\\').pop(),
    disable: false,
    cooldown: 5,

    execute: async(message, args)=>{
        let config = new db.crearDB(message.guild.id, 'servidores')
        let activado  = await config.get('mensajes.autoReply')
        if(activado == undefined || activado == true){
            config.establecer('mensajes.autoReply', false)
            message.channel.send('Ok **Desactive** la respuesta automatica a mensajes')
        }
        if(activado == false){
            config.establecer('mensajes.autoReply', true)
            message.channel.send('Ok **Active** la respuesta automatica a mensajes')
        }
    }
}
