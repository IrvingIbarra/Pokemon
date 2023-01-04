export class Pokeapi{
    constructor(){
        this.pokemones = null;
        let traerPokemones = this.obtenerPokemones().bind(this);
        traerPokemones();

    }

    obtenerPokemones(){
        let f = async ()=>{
            const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=11&offset=10',{
            method: 'GET'
            });
            if(respuesta.status === 200){
                this.pokemones = await respuesta.json();
                this.drawPokemones().bind(this)();
            }
            
        };

        return f;
    }

    drawPokemones(){
        let f =async ()=>{
        if(this.pokemones){
            let results = this.pokemones.results;//resilts es un array de object con dos atributos: name y url
            for(let i =0; i < results.length; i++){
                let pokemon = results[i];
                const respuestaPokemon = await fetch(pokemon.url);
                if(respuestaPokemon.status === 200){
                    let infoPokemon = await respuestaPokemon.json();
                    console.log(infoPokemon);
                }
            }
       }
    };
    return f;
    }

}
