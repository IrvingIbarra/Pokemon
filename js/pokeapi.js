export class Pokeapi{
    constructor(){
        let traerPokemones = this.obtenerPokemones().bind(this);
        traerPokemones();

    }

    obtenerPokemones(){
        let f = async ()=>{
            const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=11&offset=10',{
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'GET',
                

            });
            let resp = await respuesta.text();
            console.log(resp);
        };

        return f;
    }
}
