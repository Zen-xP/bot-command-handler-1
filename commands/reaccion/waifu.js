const neko = require('neko-love.js')
const discord = require('discord.js')
module.exports = {
    name: 'waifu',
    description: 'Una waifu aleatoria',
    usage: 'waifu',
    aliases: ['w'],
    cooldown: 10,
    category: __dirname.split('\\').pop(),

    execute: async (message, args) => {
        const embed = new discord.MessageEmbed()
            .setDescription('Aqui esta tu waifu')
            .setColor('RANDOM')
        message.channel.send('Espera estoy buscando').then(m => {
            neko('waifu').then(url => {
                embed.setImage(url)
                m.delete()
                message.channel.send(embed)
            })
        })
    }
}
