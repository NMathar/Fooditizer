<template>

    <div class="title">
        <h2>Foditizer coded with <3</h2>

        <!--<v-carousel>-->
            <!--<v-carousel-item v-for="(src, i) in images" v-bind:src="src" :key="i"></v-carousel-item>-->
        <!--</v-carousel>-->
        <div class="login" v-if="!$store.state.user">
            <h3>Login</h3>
            <v-btn  error fab large dark href="/api/login/google/">
                G
            </v-btn>
        </div>

        {{ $store.state.user }}

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters([
            'state'
        ]),
        data: () => ({
//            images: [
//                'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
//                'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
//                'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg',
//                'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg'
//            ]
        }),
        mounted: function() {
//            console.log(mapGetters.isAuthenticated())
        }
    }
</script>