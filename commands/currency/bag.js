const db = require('megadb')
const Discord = require('discord.js')
module.exports = {
    name: 'bag',
    description: 'Muestra las cosas que tienes en tu mochila',
    usage: 'bag',
    aliases: ['inventory', 'mochila'],
    category: __dirname.split('\\').pop(),
    disable: true,

    execute: async (message, args) => {
        let config = new db.crearDB(message.author.id, 'usuarios')
        let bag = await config.get('inventory.bag')
        
        const embedBag = new Discord.MessageEmbed()
            .setAuthor(`Mochila de ${message.author.username}`, message.author.displayAvatarURL())
            .setColor('RANDOM')
            .setThumbnail(`https://pbs.twimg.com/media/DfH9bqqV4AAJkc5.jpg`)
            .setDescription('')
        if (!bag.length) {
            embedBag.setDescription('No hay objetos en tu mochila u.u')

        } else {
            embedBag.addField('Lista de items',bag.map(c => {
                return `• ${c.item} (x${c.cantidad})`
            }))
        }
        message.channel.send(embedBag)
    }
}
