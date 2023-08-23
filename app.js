const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=40';
const mainContainer = document.querySelector('#main');
const typeColors = {
	normal: '#A8A878',
	fighting: '#C03028',
	flying: '#A890F0',
	poison: '#A040A0',
	ground: '#E0C068',
	rock: '#B8A038',
	bug: '#A8B820',
	ghost: '#705898',
	steel: '#B8B8D0',
	fire: '#F08030',
	water: '#6890F0',
	grass: '#78C850',
	electric: '#F8D030',
	psychic: '#F85888',
	ice: '#98D8D8',
	dragon: '#7038F8',
	dark: '#705848',
	fairy: '#EE99AC',
	unknown: '#68A090',
	shadow: '#484848',
};
async function fetchAllPokemons() {
	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.status}`);
		}

		const data = await response.json();
		return data.results.slice(0, 40); // Get the first 20 Pokémon
	} catch (error) {
		console.error('Fetch error:', error);
	}
}

async function fetchPokemonData(url) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
	}
}

async function main() {
	try {
		const allPokemons = await fetchAllPokemons();

		for (const pokemon of allPokemons) {
			const pokemonData = await fetchPokemonData(pokemon.url);
			const { id, name, sprites, types, abilities } = pokemonData;
			const image = sprites.front_default;

			updateDom(id, image, name, types, abilities);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

function updateDom(pokemonId, image, name, types) {
	const pokemon = document.createElement('div');
	pokemon.classList.add('pokemon');
	mainContainer.appendChild(pokemon);
	const img = document.createElement('img');
	img.src = image;
	const h2 = document.createElement('h2');
	h2.textContent = name;
	const pTypes = document.createElement('p');
	pTypes.textContent = `Types: ${types
		.map((type) => type.type.name)
		.join(', ')}`;

	pokemon.appendChild(img);
	pokemon.appendChild(h2);
	pokemon.appendChild(pTypes);
	pokemon.style.backgroundColor = typeColors[types[0].type.name];
}

main();
