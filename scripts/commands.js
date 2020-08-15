module.exports = {
    run(client, ascii, fs) {
        console.info('Buscando comandos..');
        var table = new ascii().setHeading('Comando', 'Descripcion')
        const carpetas = fs.readdirSync('./commands')
        let commandFiles
        for (var i = 0; i < carpetas.length; i++) {
            client.categoria.push(carpetas[i])
            try {
                commandFiles = fs.readdirSync(`./commands/${carpetas[i]}`).filter((file) => file.endsWith(".js"))
            } catch (err) {
                process.emit('error', 3, undefined, err)
            }

            if (!commandFiles.length) {
                process.emitWarning(`La carpeta ./commands/${carpetas[i]} No tiene ningun comando`, 'Alerta');
            } else {
                for (var x = 0; x < commandFiles.length; x++) {
                    try {
                        const command = require(`../commands/${carpetas[i]}/${commandFiles[x]}`)

                        if (!command.name) {
                            process.emit('error', 6, `./commands/${carpetas[i]}/${commandFiles[x]}`)
                        }
                        if (!command.execute) {
                            process.emit('error', 5, `./commands/${carpetas[i]}/${commandFiles[x]}`)
                        }

                        client.commands.set(command.name, command);

                        table.addRow(command.name, command.description)
                    } catch (err) {
                        process.emit('error', 9, `./commands/${carpetas[i]}/${commandFiles[x]}`, err)
                    }
                }
                for (let x = 0; x < commandFiles.length; x++) {
                    try {
                        const y = require(`../commands/${carpetas[i]}/index.json`)
                        if (y.disable == undefined) {
                            process.emit('error', 81, `./commands/${carpetas[i]}/index.json`)
                            return
                        }
                    } catch (err) {
                        process.emit('error', 8, `./commands/${carpetas[i]}/index.json`, err)
                    }
                }
            }
        }
        process.emit('ok', table.toString())
        console.info('Correcto!\n');
    }
}
