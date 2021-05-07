const fs = require('fs');

const axios = require('axios');

class Busquedas{

    historial = [];
    dbPath='./db/database.json';
    
    constructor(){
        //TODO: Leer DB si existe
        this.leerBD();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language':'es'
        }
    }
    
    get paramsWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang':'es'
        }
    }

    get historialCapitalizado(){
        return this.historial.map(lugar=>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p=>p.charAt(0).toUpperCase() + p.slice(1));
            return palabras.join(' ');
        })
    }

    async ciudad(nombre=''){

        try{
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${nombre}.json`,
                params: this.paramsMapbox
            })

            const resp =  await instance.get();
            return resp.data.features.map(lugar=> ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        }
        catch(err){
            return [];
        }
    }

    async climaCiudad(lat, lon){

        try {
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            })
            const resp = await instance.get();

            const {weather, main} = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.error(error)
        }
    }

    agregarHistorial(lugar=''){
        //Prevenir duplicados
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return
        }

        this.historial.unshift(lugar.toLocaleLowerCase());
        //Grabar en DB

        this.guardarBD();
    }

    guardarBD(){
        const payload={
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerBD(){
        //Debe de existir
        if(!fs.existsSync(this.dbPath)){
            return;
        }

        //Cargar la información 
        const db = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data=JSON.parse(db);
        this.historial = data.historial
    }
}

module.exports = Busquedas;