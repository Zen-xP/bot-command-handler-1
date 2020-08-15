const ascii = require('ascii-table')
const fs = require('fs');

module.exports = {
    run(client) {
        console.info('Buscando eventos...');
        var table = new ascii('Eventos')
        let eventos = fs.readdirSync('./events')

        if (!eventos.length) {
            process.emit('error', 2)
        }

        for (let z = 0; z < eventos.length; z++) {
            try {
                const event = require(`../events/${eventos[z]}`);
                client.on(event.name, event.run.bind(null, client));
                table.addRow(event.name);

            } catch (err) {
                process.emit('error', 4, eventos[z], err);
            }
        }
        console.log(table.toString());
        console.info('correcto!\n');
    }
}