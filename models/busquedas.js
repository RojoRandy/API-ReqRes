const axios = require('axios');

class Busquedas{

    historial = [];
    
    constructor(){
        //TODO: Leer DB si existe
    }

    async ciudad(nombre=''){
        //TODO: Petición http

        try{
            const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/durango.json?access_token=pk.eyJ1IjoicmFuZHlyb2pvIiwiYSI6ImNrb2J3bzBobDI5cGoybnM3MHdsZDkwemUifQ.csBB3P7HkFTaa3PaVaa-Gg&limit=5&language=es')
            console.log(response.data)

            return [];
        }
        catch(err){
            return [];
        }
    }
}

module.exports = Busquedas;