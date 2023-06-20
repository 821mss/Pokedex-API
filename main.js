const containerPokemon= document.querySelector(".pokemonContainer");
var spinner = document.getElementById("spinner");

let min = 1;
let max = 8;

const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

anterior.addEventListener("click", ()=>{
    if(min != 1){
        min -= 9;
        removeChild(containerPokemon);
        fetchPokemons(min,max);
    }
})
siguiente.addEventListener("click", ()=>{
    min += 9;
    removeChild(containerPokemon);
    fetchPokemons(min,max)
})

//LLAMANDO ELEMENTOS DE LA API//
function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data)=>{
        createPokemons(data);
        spinner.style.display = "none";
    })
}
//Recorrido de los elementos de la API//
function fetchPokemons(min,max){
    spinner.style.display = "block";
    for(let i=min; i<= min+max; i++){
        fetchPokemon(i);
    }
}

//ELEMENTOS HTML//
function createPokemons(pokemon){

    const contenedorMain = document.createElement("div");
    contenedorMain.classList.add("contenedor");

    const card= document.createElement("div");
    card.classList.add("cardPokemon");

    const spriteContainer= document.createElement("div");
    spriteContainer.classList.add("imgContainer");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p")
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name
    
    //AGREGANDO ELEMENTOS HIJOS A CARD//
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    //AGREGANDO TODO LO CREADO EN MAIN.JS AL DIV CREADO EN EL INDEX.HTML//
    containerPokemon.appendChild(card);
}

function removeChild(parents){
    while(parents.firstChild){
        parents.removeChild(parents.firstChild);
    }
}
fetchPokemons(min,max);


