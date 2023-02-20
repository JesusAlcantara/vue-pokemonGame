import PokemonPage from '@/pages/PokemonPage';
import { shallowMount, mount } from '@vue/test-utils';
import { mockPokemons } from '../mocks/pokemons.mock';

describe('PokemonPage page', () => {

    let wrapper;
    let mixPokemonArraySpy;
    beforeEach(() => {
        mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');
        capitalizedSpy = jest.spyOn(PokemonPage.methods, 'capitalized');
        wrapper = shallowMount(PokemonPage);
    })

    describe('Render cases', () => {
        it('should match with snapshot', () => {
            expect(wrapper.html()).toMatchSnapshot();
        })

        it('should match with snapshot when pokemons load', () => {
            const wrapper = shallowMount(PokemonPage, {
                data() {
                    return {
                        pokemonArr: mockPokemons,
                        pokemon: mockPokemons[0],
                        showPokemon: false,
                        showAnswer: false,
                        message: ''
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        })
    
        it('should show PokemonPicture and PokemonOptions', () => {
            const wrapper = shallowMount(PokemonPage, {
                data() {
                    return {
                        pokemonArr: mockPokemons,
                        pokemon: mockPokemons[0],
                        showPokemon: false,
                        showAnswer: false,
                        message: ''
                    }
                }
            });
            const picture = wrapper.find('pokemon-picture-stub');
            const options = wrapper.find('pokemon-options-stub');
            expect(picture.exists()).toBe(true);
            expect(options.exists()).toBe(true);
            expect(picture.attributes('pokemonid')).toBe('5');
            expect(options.attributes('pokemons')).toBeTruthy();
        })
    })

    describe('Methods', () => {
        it('should call "mixPokemonArray" in mount', () => {
            expect(mixPokemonArraySpy).toHaveBeenCalled();
        })

        it('should call checkAnswer', async () => {
            const wrapper = shallowMount(PokemonPage, {
                data() {
                    return {
                        pokemonArr: mockPokemons,
                        pokemon: mockPokemons[0],
                        showPokemon: false,
                        showAnswer: false,
                        message: ''
                    }
                }
            });
            await wrapper.vm.checkAnswer(5);
            expect(wrapper.find('h2').exists()).toBe(true);
            expect(wrapper.vm.showPokemon).toBe(true);
            expect(wrapper.find('h2').text()).toBe(`¡Correcto es ${capitalizedSpy(mockPokemons[0].name)}!`);
            await wrapper.vm.checkAnswer(10);
            expect(wrapper.vm.message).toBe(`Opps, el pokémon era ${capitalizedSpy(mockPokemons[0].name)}`);
        })
    })
})