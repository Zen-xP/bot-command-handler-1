module.exports = {
    name: 'error',
    run(exitCode, args, err){
        console.clear()
        if(!exitCode){
            console.error(`ERROR indefinido no se proviciono el codigo de error`)
        }
        if(exitCode == 1){
            console.error(`ERROR exit code 1: El token provicionado es invalido\nToken: ${args}\n\n${err}`);
        }
        if(exitCode == 2){
            console.error(`ERROR exit code 2: No hay ningun evento en la carpeta ./events/\n`)
        }
        if(exitCode == 3){
            console.error(`ERROR exit code 3: Hay un archivo en ./commands muevelo a una carpeta!\n\n${err}`)
        }
        if(exitCode == 4){
            console.error(`ERROR exit code 4: La carpeta ./events/${args} no es valida, solo se admiten archivos\n\n${err}`);
        }
        if(exitCode == 5){
            console.error(`ERROR exit code 5: El archivo ${args} no tiene una exportacion valida\n`)
        }
        if(exitCode == 6){
            console.error(`ERROR exit code 6: El archivo ${args} no tiene configurado el name\n`);
        }
        if(exitCode == 7){
            console.error(`ERROR exit code 7: el archivo ./scripts/${args} no tiene una correcta exportacion o contiene un error\n\n${err}`);
        }
        if(exitCode == 8){
            console.error(`ERROR exit code 8: no existe el archivo de configuracion de categoria ${args}\n\n${err}`);
        }
        if(exitCode == 81){
            console.error(`ERROR exit code 81: no esta correctamente configurado el archivo de configuracion ${args}\n`);
        }
        if(exitCode == 9){
            console.error(`ERROR exit code 9: el archivo ${args} contiene un error\n\n${err}`);
        }
        process.exit()
    }
}
