<template>
    <h1>¿Quién es este pokémon?</h1>
    <pokemon-picture />
    <pokemon-options />
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';

export default {
    components: {
        PokemonPicture,
        PokemonOptions
    }

}
</script>