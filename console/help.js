module.exports = {
    name: "help",
    execute(client){
        client.console.map(c=>{
            console.log(c.name);
        })
    }
}