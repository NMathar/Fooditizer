<template>

    <div class="title">

        <v-layout row justify-center v-if="!loggedUser">
            <v-flex xs6>
                <v-card>
                    <v-card-title>
                        <span class="headline">Foditizer coded with <3</span>
                    </v-card-title>
                    <v-card-text>
                        <div class="login">
                            <h3>Login</h3>
                            <v-btn error fab large dark href="/api/login/google/">
                                G
                            </v-btn>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <!--<v-spacer></v-spacer>-->
                        <!--<v-btn class="blue&#45;&#45;text darken-1" flat @click.native="edituser">Speichern</v-btn>-->
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

        <div class="welcome" v-else>
            <p>Willkommen</p>
            <pre>
            {{$store.getters.loggedUser}}
            </pre>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: mapGetters(['loggedUser']),
        data: () => ({
        }),
        mounted: function () {
        }
    }
</script>

