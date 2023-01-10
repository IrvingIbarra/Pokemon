export class Pokeapi{
    constructor(){
        this.pokemones = null;
        this.pokemonesDiv = document.getElementById("pokemones");
        
        this.obtenerPokemones().bind(this)();
    

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
            this.pokemonesDiv.innerHTML = "";
            let results = this.pokemones.results;//resilts es un array de object con dos atributos: name y url
            for(let i =0; i < results.length; i++){
                let pokemon = results[i];
                const respuestaPokemon = await fetch(pokemon.url);
                if(respuestaPokemon.status === 200){
                    let infoPokemon = await respuestaPokemon.json();
                    this.pokemonesDiv.appendChild(this.drawPokemon(infoPokemon));
                }
            }
       }
    };
    return f;
    }
    drawPokemon(infoPokemon){
        let contenedor = document.createElement("div");
        contenedor.classList.add("col","mb-3");
        
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card","shadow","bg-primary","bg-gradient","rounded","text-center");
       

        let imagen = document.createElement("img");
        imagen.classList.add("card-img-top", "w-50","mx-auto");
        imagen.src = this.obtenerUrlImagen(infoPokemon.id);

        let body = document.createElement("div");
        body.classList.add("card-body");

        let id = document.createElement("small");
        id.classList.add("card-text");

        let idpokemon = document.createElement("span");
        idpokemon.innerHTML = infoPokemon.id;
        

        let titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.innerText = infoPokemon.name;

        let tipo = document.createElement("span");
        tipo.classList.add("badge", "rounded-pill","bg-secondary");
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
