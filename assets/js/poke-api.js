
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = pokemon.types

    pokemon.types = pokemon.types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
   .then((response) => response.json())
   .then((convertPokeApiDetailToPokemon))
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {  
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json()) //Arrow function
        .then((jsonBody) => jsonBody.results) // O segundo then recebe a resposta do primeiro
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetail)))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
    }
