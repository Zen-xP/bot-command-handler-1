module.exports = {
    name: 'error',
    run(client, error) {
        client.logger.log(`Ocurrio un error \n${JSON.stringify(error)}`, "error");
    }
}