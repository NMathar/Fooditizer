<template>

    <div class="title">
        <h2>Vue2 on Total.js Platform with <3</h2>

        <!--<v-carousel>-->
            <!--<v-carousel-item v-for="(src, i) in images" v-bind:src="src" :key="i"></v-carousel-item>-->
        <!--</v-carousel>-->

        <v-btn error fab large dark>
            <v-icon>alarm</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        data: () => ({
            images: [
                'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
                'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
                'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg',
                'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg'
            ]
        })
    }
</script>