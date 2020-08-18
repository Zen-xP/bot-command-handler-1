const Discord = require('discord.js');
const fs = require('fs');
const cooldowns = new Discord.Collection();
const db = require('megadb')
const sh = require('chalk')

module.exports = {
    name: 'message',
    run: async (client, message) => {
        //ejecucion de modulos
        let prefix = '/'
        fs.readdirSync('./modules')
            .map(async modulo => {
                const x = require(`../modules/${modulo}`)
                x.run(message, client, prefix)
                return
            })
        //fin de ejecucion de modulos
        let configuracion = new db.crearDB(message.guild.id, 'servidores')

        prefix = await configuracion.get('configuracion.prefix')

        if (message.author.bot) return

        //manejo de comandos
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        let Desactivados = await configuracion.obtener('configuracion.comandosDesactivados')
        let Categorias = await configuracion.obtener('configuracion.categoriasDesactivadas')

        const command = client.commands.get(commandName)
            || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (Categorias.includes(command.category)) {
            return message.channel.send(`La categoria ${command.category} esta desactivada`)
        }
        if (Desactivados.includes(command.name)) {
            return message.channel.send(`El comando ${command.name} esta desactivado`)
        }

        if (!message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES')) {
            if (message.member.permissions.has('ADMINISTRATOR')) {
                message.author.send('Para poder usarme en ese canal debes darme permisos').catch(err => err)
                return
            } else {
                return
            }
        }
        //fin manejo de comandos

        //Cooldowns
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                message.delete().catch(err => err)
                return message.reply(`Por favor espera ${timeLeft.toFixed(1)} segundos para volver usar el comando`).then((m) => m.delete({ timeout: expirationTime - now }));
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        //Fin de coodowns

        //ejecucion de comandos
        try {

            process.stdout.write(sh.green(`\nEjecutando el comando ${command.name}...\n`));
            process.stdout.write("->")
            command.execute(message, args, prefix, client);

        } catch (err) {

            console.error("Hubo un error durante la ejecucion el error se mostrará a continuación: \n" + err);

            var sad = [
                "https://gluc.mx/u/fotografias/m/2019/12/30/f608x342-21614_51337_0.png",
                "https://media3.giphy.com/media/Xqlsn2kLPBquI/giphy.gif",
                "https://media1.tenor.com/images/0b796a2198f36cdb21c4357592a10ecf/tenor.gif?itemid=12913371",
                "https://i.pinimg.com/originals/73/b1/3b/73b13bcd2590cd93ca1ca9bbc7f917be.gif",
                "https://64.media.tumblr.com/0e42f221a783ae10e79fd8c710b59898/tumblr_o1usx7DyI91s7fey2o1_500.gif",
            ];
            var aleatorio_sad = Math.floor(Math.random() * sad.length);
            const embed_error = new Discord.MessageEmbed()
                .setTitle("oh no! D:")
                .setImage(sad[aleatorio_sad])
                .setDescription("hubo un error al intentar ajecutar el comando, por favor espera y vuelve a intentarlo")
                .setColor("RANDOM")
                .setFooter(
                    "Comando ejecutado por: " + message.member.displayName,
                    message.author.displayAvatarURL()
                )
                .setTimestamp();

            message.channel.send(embed_error);
        }
        //fin de ejecucion de comandos
    }
}