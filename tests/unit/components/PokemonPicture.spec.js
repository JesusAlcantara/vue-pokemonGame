import { shallowMount } from '@vue/test-utils';
import PokemonPicture from '@/components/PokemonPicture';

describe('PokemonPicture component', () => {

    it('should be match with snapshot', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
    })

    it('should show hidden image and pokemon 100', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        });
        const [ img1, img2 ] = wrapper.findAll('img');
        expect(img1.exists()).toBe(true);
        expect(img2).toBe(undefined);
        expect(img1.classes('hidden-pokemon')).toBe(true);
        expect(img1.attributes('src')).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg`);
    })

    it('should show Pokemon if showPokemon: true', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        });
        const image = wrapper.find('img');
        expect(image.exists()).toBe(true);
        expect(image.classes('hidden-pokemon')).toBe(false);
        expect(image.classes('fade-in')).toBe(true);
    })
})