<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>

    <div v-else>
        <h1>Cuál es este pokémon?</h1>
        <pokemon-picture 
            :pokemonId="pokemon.id"
            :showPokemon="showPokemon"
        />
        <pokemon-options 
            :pokemons="pokemonArr"
            @selectionPokemon="checkAnswer"
        />
        
        <template v-if="showAnswer">
            <h2 class="fade-in">
                {{ message }}
            </h2>
            <button @click="newGame()">
                Nuevo Juego
            </button>
        </template>
    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';
import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonArray () {
            this.pokemonArr = await getPokemonOptions();
            const rndInt = Math.floor(Math.random() * 4);
            this.pokemon = this.pokemonArr[rndInt];
        },
        checkAnswer (selectedId) {
            this.showPokemon = true;
            this.showAnswer = true;
            if ( selectedId === this.pokemon.id ) {
                this.message = `¡Correcto es ${this.capitalized(this.pokemon.name)}!`
            } else {
                this.message = `Opps, el pokémon era ${this.capitalized(this.pokemon.name)}`
            }
        },
        newGame () {
            this.showPokemon = false;
            this.showAnswer = false;
            this.pokemonArr = [];
            this.pokemon = null;
            this.mixPokemonArray();
        },
        capitalized(name) {
            const capitalizedFirst = name[0].toUpperCase();
            const rest = name.slice(1);
            return capitalizedFirst + rest;
        }
    },
    mounted() {
        this.mixPokemonArray();
    }
}
</script>