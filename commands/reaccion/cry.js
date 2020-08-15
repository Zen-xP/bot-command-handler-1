const neko = require('neko-love.js')
const discord = require('discord.js')
module.exports = {
    name: 'cry',
    description: 'Empeza a llorar',
    usage: 'cry',
    category: __dirname.split('\\').pop(),
    cooldown: 5,

    execute: async (message, args) => {
        const embed = new discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> Empezo a llorar`)
            .setColor('RANDOM')
        message.channel.send('Espera estoy buscando').then(m => {
            neko('cry').then(url => {
                embed.setImage(url)
                m.delete()
                message.channel.send(embed)
            })
        })
    }
}
