const neko = require('neko-love.js')
const discord = require('discord.js')
module.exports = {
    name: 'pat',
    description: 'Acaricia a un usuario',
    usage: 'pat{usuario}',
    cooldown: 5,
    category: __dirname.split('\\').pop(),

    execute: async (message, args, prefix, client) => {
        let mencion = args[0]
        if (!mencion) {
            message.channel.send('Debes mencionar a alguien').then(m => m.delete({ timeout: 3000 }))
            return
        }
        if (mencion.startsWith('<@')) {
            let usuario = message.mentions.users.first()
            if (!usuario) {
                message.channel.send('Debes mencionar a alguien').then(m => m.delete({ timeout: 3000 }))
                return
            }
            if (usuario == client.user.id) {
                let imagenes = ['https://media.tenor.com/images/390b31b65d0bd4549068aad0da96760a/tenor.png',
                    'https://i.pinimg.com/originals/e4/9b/b3/e49bb30c33413912c53dbd9a159f369c.gif',
                    'https://i.pinimg.com/564x/fd/69/26/fd6926297fbedb494b83a3a52a9b2132.jpg',
                    'https://www.vippng.com/png/detail/498-4982609_anime-animegirl-japan-manga-animelove-love-cute-menhera.png',
                    'https://pm1.narvii.com/6865/0e04f81f167b74b938b617aeaeb48538711f0014r1-592-512v2_00.jpg',
                    'https://pbs.twimg.com/media/Dcfr1IrVAAAu7Ka.jpg'
                ]
                let random = Math.floor(Math.random() * imagenes.length)
                const embed = new discord.MessageEmbed()
                    .setDescription(`<@${message.author.id}> Me acaricia UwU`)
                    .setColor('RANDOM')
                    .setImage(imagenes[random])
                message.channel.send(embed)
                return
            }
            if (usuario == message.author.id) {
                const embed = new discord.MessageEmbed()
                    .setDescription(`<@${message.author.id}> Se auto acaricia`)
                    .setColor('RANDOM')
                message.channel.send('Espera estoy buscando').then(m => {
                    neko('pat').then(url => {
                        embed.setImage(url)
                        m.delete()
                        message.channel.send(embed)
                    })
                })
                return
            }
            const embed = new discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> Acaricia a <@${usuario.id}>`)
                .setColor('RANDOM')
            message.channel.send('Espera estoy buscando').then(m => {
                neko('pat').then(url => {
                    embed.setImage(url)
                    m.delete()
                    message.channel.send(embed)
                })
            })
            return
        }

    }
}
