module.exports = {
    name: 'ban',
    description: 'Para banear a alguien',
    usage: 'ban[usuario]',
    category: __dirname.split('\\').pop(),

    execute: async(message, args)=>{
        message.channel.send('Se ejecutó el comando ban')
    }
}
