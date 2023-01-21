"use strict";
//Voy a conectar la api para obtener los pokemons
const myPokeList$$= document.querySelector("#pokedex");
//$$esto nos dice que afecta directamente al HTML

//Tenemos que introducir un bucle para recorrer las urls.
const getPokemons = async () => {
  const datosPokemon = [];
  for (let i = 1; i <= 151; i++){
    const respuestaUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const response = await respuestaUrl.json();
    datosPokemon.push(response);
  } 
  console.log(datosPokemon);
  return datosPokemon;
  
};  

// Aquí estamos mapeando los datos que hemos extraido para que los muestre.
const mapPokemons = (pokemons) => {
  return pokemons.map((pokemon) => ({
    name: pokemon.name,
      image: pokemon.sprites.front_default,
      type: pokemon.types.map((type) => type.type.name).join(', '),
      id: pokemon.id
  })); 
}; 

 const drawPokemons = (pokemons) => {
  myPokeList$$.innerHTML = "";
  for (const pokemon of pokemons) {
    let pokemonLi = document.createElement("li");
    pokemonLi.className = "card";
    pokemonLi.innerHTML=`
    <img src="${pokemon.image}" class="card-image">
    <h4 class="card-title">#${pokemon.id} <br> ${pokemon.name}</h4>
    <p class="card-subtitle">${pokemon.type}</p>`;
    myPokeList$$.appendChild(pokemonLi)
  }
 }
 //Aquí creo el evento para que pueda vincularse al filtrado.
  const ponerInput = (pokemons) => {
  const buscarPokemon = document.querySelector("input");
  console.log(buscarPokemon);
  buscarPokemon.addEventListener('input', () => searchPokemon(buscarPokemon.value, pokemons));
  }; 

  //Aqui hago el filtro que reacciona con el anterior.
  const searchPokemon = (filtro, array) => {
    let pokemonFiltrado = array.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase()));
    drawPokemons(pokemonFiltrado);
  };



//Aquí estamos llamando a todas funciones creadas, y la que vamos a crear con init.
const init = async ()=> {
  const pokemons = await getPokemons()
  const mappedPokemons = mapPokemons(pokemons)
  drawPokemons(mappedPokemons)// Aquí llamo a los pokemons dibujados y mapeados que responden a las clases.
  ponerInput(mappedPokemons)
};
init();