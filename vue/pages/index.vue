<template>

    <div class="title">
        <h2>Vue2 on Total.js Platform with <3</h2>

        <!--<v-carousel>-->
            <!--<v-carousel-item v-for="(src, i) in images" v-bind:src="src" :key="i"></v-carousel-item>-->
        <!--</v-carousel>-->

        <h1>Login</h1>
        <v-btn v-if="!$store.state.user" error fab large dark href="/api/login/google/">
            G
        </v-btn>

        <v-btn v-if="$store.state.user" fab large dark to="/logout/">
            <v-icon>power_settings_new</v-icon>
        </v-btn>

        {{ $store.state.user }}

    </div>
</template>

<script>
//    import { mapGetters } from 'vuex'
    export default {
//        computed: mapGetters([
//            'state'
//        ]),
        data: () => ({
//            images: [
//                'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
//                'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
//                'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg',
//                'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg'
//            ]
        })
    }
</script>