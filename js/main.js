const pokeItem = document.querySelector('#item');
const pokeInfo = document.querySelector('#info');
const url = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemon = async (url) => {
    try {
        const response = await fetch(url);
        const pokemons = await response.json();
        pokemons.results.forEach(async (item, index) => {
            const link = document.createElement('p');
            link.className = 'name';
            link.innerText = `${index+1}. ${item.name[0].toUpperCase() + item.name.slice(1)}`;
            pokeItem.append(link);

            link.addEventListener('click', () => {
                pokeInfo.innerHTML = '';
                getInfo(index+1);
            })
        });
    } catch (err) {
        console.log(err);
    }
};
getPokemon(url);

const getInfo = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    creatCard(pokemon);
}

const creatCard = (pokemon) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <img src="${pokemon.sprites.front_default}"/>
    <p>name: ${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
    <p>type: ${pokemon.types[0].type.name}</p>
    <p>height: ${pokemon.height}</p>
    <p>weight: ${pokemon.weight}</p>
    `
    pokeInfo.append(card);
} 

