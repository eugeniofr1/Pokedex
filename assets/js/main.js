const pokemonList = document.getElementById('pokemonList') 
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 300
const limit = 10;
let offset = 0;

//1, 2, 3, 4, 5        0 - 5
//6, 7, 8, 9, 10,      5 - 5 
//11,                  10 - 5 (remove o botão)


function loadPokemonItens(offset, limit){
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => 
        `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#0${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            
            
        </li>
    `).join('')
                
            /*const listItems = []
            for (let i = 1; i < pokemons.length; i++) {  
                const pokemon = pokemons[i]
                listItems.push(convertpokemonToLi(pokemon))
            } */
    
       })
}
   
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords){
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
    
    
})






//debugger  Para debugar no node ou navegador

 

