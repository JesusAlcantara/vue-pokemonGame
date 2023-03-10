import pokemonApi from "@/api/pokemonApi";

export const getPokemons = () => {
    const pokemonsArr = Array.from(Array(650));
    return pokemonsArr.map(( _, index) => index + 1);
}

const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4))
    return pokemons;
}

export const getPokemonNames = async ([pokemon1, pokemon2, pokemon3, pokemon4] = []) => {
    const arrPromises = [
        pokemonApi.get(`/${pokemon1}`),
        pokemonApi.get(`/${pokemon2}`),
        pokemonApi.get(`/${pokemon3}`),
        pokemonApi.get(`/${pokemon4}`)
    ];
    const [p1, p2, p3, p4] = await Promise.all(arrPromises);
    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id }
    ]
}

export default getPokemonOptions;