const db = require('megadb')
const fs = require('fs')
module.exports = {
    name: 'disable',
    description: 'Desabilita un comado o categoria',
    usage: 'disable [-c categoria || -co comando] {nombre}',
    aliases: ['dis'],
    category: __dirname.split('\\').pop(),
    disable: false,
    cooldown: 5,

    execute: async (message, args, prefix, client) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('No tienes los permisos para ejecutar este comando')
            return
        }
        let config = new db.crearDB(message.guild.id, 'servidores')

        if (args[0] == '-co') {
            if (args[1]) {
                let comando = args[1]
                const command = client.commands.get(comando)
                    || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(comando));
                let disables = await config.obtener('configuracion.comandosDesactivados')

                if (disables.includes(command.name)) {
                    message.channel.send('El comando ya esta desactivado')
                    return
                }
                if (command.disable == false) {
                    message.channel.send('No se puede desactivar el comando por que es esencial')
                    return
                }
                if (command) {
                    config.push('configuracion.comandosDesactivados', command.name)
                    message.channel.send('Comando desactivado')
                    return
                }
                message.channel.send('No encontre el comando')
                return
            } else {
                message.channel.send('Debes poner un comando')
                return
            }
        } else if (args[0] == '-c') {
            if (args[1]) {
                let categorias = client.categoria
                let argumentos = args[1]
                let ya = await config.obtener('configuracion.categoriasDesactivadas')
                if (!categorias.includes(argumentos)) {
                    message.channel.send('Esa categoria no existe')
                    return
                }
                
                try {
                    const x = require(`../../commands/${argumentos}/index.json`)
                    if(x.disable == undefined){
                        process.emit('error', 81, `../../commands/${argumentos}/index.json`)
                        return
                    }
                    if (x.disable == false) {
                        message.channel.send('Lo siento pero no puedes desactivar esa categoria')
                        return
                    }
                } catch (err) {
                    process.emit('error', 8, `../../commands/${argumentos}/index.json`, err)
                }

                if (ya.includes(argumentos)) {
                    message.channel.send('Lo siento pero esta categoria ya esta desactivada')
                    return
                }

                if (categorias.includes(argumentos)) {
                    config.push('configuracion.categoriasDesactivadas', argumentos)
                    message.channel.send('Ok desabilite esa categoria')
                    return
                }
            } else {
                message.channel.send('Debes poner una categoria')
            }
        } else {
            message.channel.send('Debes especificar que tengo que desactivar asi [-c categoria || -co comando]')
            return
        }
    }
}
