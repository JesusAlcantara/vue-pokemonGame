import pokemonApi from '@/api/pokemonApi';

describe('PokemonApi', () => {
    it('axios should be well configured', () => {
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
    })
})