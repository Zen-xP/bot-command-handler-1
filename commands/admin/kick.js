module.exports = {
    name: 'kick',
    description: 'Para expulsar a alguien',
    usage: 'kick',
    aliases:['ki','ck'],
    category: __dirname.split('\\').pop(),

    execute: async(message, args)=>{
        message.channel.send('Se ejecutó el comando kick')
    }
}
