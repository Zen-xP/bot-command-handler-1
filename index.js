console.clear()
console.info('Iniciando.');
const Discord = require("discord.js"),
  fs = require("fs"),
  ascii = require('ascii-table'),
  config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.categoria = [];

// event handler para eventos propios
fs.readdirSync('./utils').map(evento => {
  const y = require(`./utils/${evento}`)
  process.on(y.name, y.run)
})
//fin de event handler

//ejecutamos los handlers
fs.readdirSync('./scripts').map(handler => {
  console.log('Ejecutando scripts..');
  try {
    const x = require(`./scripts/${handler}`)
    x.run(client, ascii, fs)
  } catch (err) {
    process.emit('error', 7, handler, err)
  }
})
//fin de la ejecucion de los handlers

process.emit('ok', 'Inicializacion correcta. \nIniciando sesion en discord...\n')

client.login(config.token).catch(err => {
  process.emit('error', 1, config.token, err)
})
//TU TOKEN VA EN EL ARCHIVO DE CONFIGURACION ./config.json
