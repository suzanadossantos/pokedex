const pokemonList = document.getElementById('pokemon')
const loadMoreButton = document.getElementById('button')

const maxRecords = 1
const limit = 1
let offset = 0;

///Funcao que retorna os pokemons na div
function convertPokemonToLi(pokemon) {
    return `
    <div class="divisao">
        <h2>${pokemon.name}</h2>

        <p>#${pokemon.number}</p>

        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        
        <img src="${pokemon.photo}" alt="${pokemon.name}">
            
        <div id="details">
            <h3>About</h3>

            <div class="item">
                <p class="item1">Abilities</p>
                <p class="item2">${pokemon.abilities}</p>
            </div>
    
            <div class="item">
                <p class="item1">Height</p>
                <p class="item2">${pokemon.height}</p>
            </div>
    
            <div class="item">
                <p class="item1">Weight</p>
                <p class="item2">${pokemon.weight}</p>
            </div>
        </div>
    </div>
    <br>
    `
}

//Implementando outros
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

//Botao de buscar mais
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})