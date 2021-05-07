require('dotenv').config()

const {menu, pausa, leerInput, listar}=require('./helpers/inquirer')
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

            //Buscar los lugares
            const resultados = await busquedas.ciudad(nombreCiudad);
            
            //Seleccionar el lugar
            const id = await listar(resultados);
            if(id==='0') continue;
            const lugarSeleccionado = resultados.find(lugar=>lugar.id===id);

            //Guardar en DB
            busquedas.agregarHistorial(lugarSeleccionado.nombre);

            //Datos del clima
            const clima = await busquedas.climaCiudad(lugarSeleccionado.lat, lugarSeleccionado.lng)

            //Mostrar resultados
            console.log('\nInformación de la ciudad\n'.green);
            console.log('Ciudad:',lugarSeleccionado.nombre.green);
            console.log('Lat:',lugarSeleccionado.lat);
            console.log('Lng:',lugarSeleccionado.lng);
            console.log('Temperatura:', clima.temp);
            console.log('Mínima:', clima.min);
            console.log('Máxima:', clima.max);
            console.log('Estado del clima:', clima.desc.green);
            break;

            case 2:
                // busquedas.historialCapitalizado
                busquedas.historialCapitalizado.forEach((lugar, index)=>{
                    const idx=`${index+1}.`.green;
                    console.log(`${idx} ${lugar}`)
                })
            break;
        }

        if(opt!==0) await pausa();
    }while(opt!==0)
}

main();