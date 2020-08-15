const fs = require('fs')
const discord = require('discord.js')
const version = require('../../package.json')

module.exports = {
    name: 'help',
    description: 'Para obtener ayuda sobre los comandos',
    usage: 'help',
    aliases: ['he', 'lp'],
    category: __dirname.split('\\').pop(),
    disable: false,

    execute: async (message, args, prefix, client) => {
        const carpetas = fs.readdirSync('././commands')
        let argumentos = args[0]

        if (!argumentos) {
            argumentos = '__________'
        } else {
            argumentos = argumentos.toLowerCase()
        }
        const command = client.commands.get(argumentos) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(argumentos));

        let numero = 0
        client.commands.map(() => {
            return numero++
        })

        if (!args.length) {
            const embed = new discord.MessageEmbed()
                .setTitle(`Comados de ${client.user.username}`)
                .setDescription(`Ahora mismo hay \`${carpetas.length}\` categorias y \`${numero}\` comandos para ti\n`)
                .setColor('RANDOM')
                .addField('• Categorias', carpetas.map(category => {
                    let hola = ''
                    return hola + `\`${prefix}help ${category}\` ║ ${category.charAt(0).toUpperCase() + category.substr(1)}`
                }))
                .addField('• Enlaces útiles:','[Donaciones](https://ko-fi.com/bototaku) || [Documentacion](https://ko-fi.com/bototaku)')
                .setFooter(`${client.user.username} version ${version.version}`, client.user.displayAvatarURL())
                .setThumbnail('https://cdn.discordapp.com/attachments/736287295522603098/742490666692509776/274-2748314_freetoedit-menherachan-animegirl-animecute-png-kawaii-anime-girl.png')
            message.channel.send(embed)
            return
        }

        if (!command) {
            if (carpetas.indexOf(argumentos) > -1) {
                const comandos = fs
                    .readdirSync(`././commands/${argumentos}`)
                    .filter(c => c.endsWith('.js'))
                const detalles = new discord.MessageEmbed()
                    .setTitle(`Categoria ${argumentos}, encontré ${comandos.length} comandos`)
                    .setDescription(`Para obtener ayuda más detallada sobre un comando utiliza \`${prefix}help[comando]\``)
                    .setThumbnail('https://cdn.discordapp.com/attachments/736287295522603098/742490666692509776/274-2748314_freetoedit-menherachan-animegirl-animecute-png-kawaii-anime-girl.png')
                    .setColor('RANDOM')
                    .setFooter(`${client.user.username} version ${version.version}`, client.user.displayAvatarURL());
                if (!comandos.length) {
                    detalles.addField('• Comandos', 'No hay comandos en esta categoria')
                } else {
                    detalles.addField('• Comandos', comandos
                        .map(comando => {
                            var si = ''
                            const no = require(`../${argumentos}/${comando}`)
                            return si + `\`${prefix}${no.name}\` ║ ${no.description}`
                        }))
                }
                message.channel.send(detalles)
                return
            } else {
                return
            }
        } else {
            const comando = new discord.MessageEmbed()
                .setTitle(`Hacerca de el comando ${command.name.charAt(0).toUpperCase() + command.name.substr(1)}`)
                .addField(`• Nombre: `, `${command.name.charAt(0).toUpperCase() + command.name.substr(1)}`)
                .addField(`• Descripcion: `, command.description)
                .addField(`• Uso: `, `\`${prefix}${command.usage}\``)
                .setColor('RANDOM')
                .setFooter(`Consultado por: ${message.author.username}`, message.author.displayAvatarURL())
                .setThumbnail('https://cdn.discordapp.com/attachments/736287295522603098/742490666692509776/274-2748314_freetoedit-menherachan-animegirl-animecute-png-kawaii-anime-girl.png')
            if (!command.aliases) {
                message.channel.send(comando)
                return
            } else {
                comando.addField(`• Aliases:`, command.aliases.map(si => {
                    var no = ''
                    return no + `\`${prefix}${si}\``
                }))
                message.channel.send(comando)
                return
            }
        }
    }
}
