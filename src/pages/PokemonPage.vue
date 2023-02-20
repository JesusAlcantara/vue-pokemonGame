<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>

    <div v-else>
        <h1>¿Cuál es este pokémon?</h1>
        <pokemon-picture 
            :pokemonId="pokemon.id"
            :showPokemon="showPokemon"
        />
        <pokemon-options 
            :pokemons="pokemonArr"
            @selectionPokemon="checkAnswer"
            :class="activeOptions"
        />
        
        <div 
            v-if="showAnswer"
            class="result-container"
        >
            <h2 
                class="fade-in"
                :class="messageClass"
            >
                {{ message }}
            </h2>
            <div v-if="!resp">
                <h2 :class="messageClass">Has capturado {{ counter }} pokémon.</h2>
                <button 
                    @click="newGame()"
                    class="magic-button"
                >
                    Nuevo Juego
                </button>
            </div>
            <div v-else>
                <button 
                    @click="nextGame()"
                    class="magic-button"
                >
                    Siguiente
                </button>
            </div>
        </div>
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
            message: '',
            counter: 0,
            resp: false
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
                this.message = `¡Correcto es ${this.capitalized(this.pokemon.name)}!`;
                this.resp = true;
                this.counter++;
            } else {
                this.message = `Opps, el pokémon era ${this.capitalized(this.pokemon.name)}`,
                this.resp = false;
            }
        },
        newGame () {
            this.showPokemon = false;
            this.showAnswer = false;
            this.pokemonArr = [];
            this.pokemon = null;
            this.counter = 0;
            this.mixPokemonArray();
        },
        nextGame () {
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
    computed: {
        activeOptions () {
            return { 'active-options': this.showAnswer };
        },
        messageClass () {
            return { 'message-class': this.showAnswer };
        }
    },
    mounted() {
        this.mixPokemonArray();
    }
}
</script>

<style scoped>
    .result-container {
        display: grid;
        justify-content: center;
        align-items: center;
    }
    .active-options {
        pointer-events: none;
        cursor: default;
    }
    .magic-button {
        background: black;
        cursor: pointer;
        border: none;
        padding: 16px 32px;
        color: #FFF;
        font-size: 24px;
        font-weight: bold;
        position: relative;
        border-radius: 12px;
        margin: 10px
    }
    .message-class {
        color: #FFF;
        background-color: black;
        width: 500px;
        border-radius: 10px;
        left: 50%;
    }
</style>