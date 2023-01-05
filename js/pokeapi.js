export class Pokeapi{
    constructor(){
        this.pokemones = null;
        this.pokemonesDiv = document.getElementById("pokemones");
        
        this.obtenerPokemones().bind(this);
    

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
    drawPokemon(infoPokemon){
        let contenedor = document.createElement("div");
        contenedor.classList.add("col");
        contenedor.classList.add("mb-3");

        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("shadow");
        tarjeta.classList.add("bg-primary");
        tarjeta.classList.add("bg-gradient");
        tarjeta.classList.add("rounded");
        tarjeta.classList.add("text-center");

        let imagen = document.createElement("img");
        imagen.classList.add("card-img-top");
        imagen.classList.add("w-50");
        imagen.classList.add("mx-auto");
        imagen.src = this.obtenerUrlImagen(infoPokemon.id);

        let body = Document.createElement("div");
        body.classList.add("card-body");

        let id = document.getElementById("small");
        id.classList.add("card-text");

        let idpokemon = document.getElementById("span");
        idpokemon.innerHTML = infoPokemon.id;
        

        let titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.innerText = infoPokemon.name;

        let tipo = document.createElement("span");
        tipo.classList.add("badge");
        tipo.classList.add("rounded-pill");
        tipo.classList.add("bg-secondary");
        tipo.innerHTML = infoPokemon.species.name;

        id.appendChild(idpokemon);

        body.appendChild(id);
        body.appendChild(titulo);
        body.appendChild(tipo);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(body);

        contenedor.appendChild(tarjeta);

        return contenedor;

    }
    
    obtenerUrlImagen(id){
        return "https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/" + id + ".png"
    }

}
