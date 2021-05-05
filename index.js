const {menu, pausa, leerInput}=require('./helpers/inquirer')
const Busquedas = require('./models/busquedas');

const main = async()=>{

    const busquedas = new Busquedas();
    let opt;

    do{
        opt = await menu();

        switch(opt){
            case 1:
            //Mostrar mensaje

            const nombreCiudad = await leerInput('Ciudad: ');
            await busquedas.ciudad(nombreCiudad);

            //Buscar los lugares

            //Seleccionar el lugar

            //Datos del clima

            //Mostrar resultados
            console.log('\nInformación de la ciudad\n'.green);
            console.log('Ciudad:',);
            console.log('Lat:',);
            console.log('Lng:',);
            console.log('Temperatura:',);
            console.log('Mínima:',);
            console.log('Máxima:',);
            break;
        }

        if(opt!==0) await pausa();
    }while(opt!==0)
}

main();