<template>
    <v-app>
        <main>
            <v-content>
                <v-container fluid>
                    <nuxt/>
                </v-container>
            </v-content>
        </main>
    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters([
            'isAuthenticated',
            'loggedUser'
        ]),
        data: () => ({
            user: {}
        }),
        methods: {
            getUser: function () {
                // GET /someUrl
                this.$http.get('/api/get/user').then(response => {
//                    console.log(response.body);
                    // get body data
                    this.user = response.body;
                    this.$store.commit('SET_USER', this.user)

                }, response => {
                    // error callback
//                    console.log('User Data');
                });
            }
        },
        mounted: function () {
            this.getUser();
        }
    }
</script>
<style scoped>
    .title {
        padding-left: 20px;
    }

    #e3, #e3 .container {
        min-height: 700px;
        overflow: hidden;
        z-index: 0;
    }

    #e3 .input-group__details:after {
        background-color: rgba(255, 255, 255, 0.32) !important;
    }

    #e3 .input-group--focused .input-group__append-icon {
        color: inherit !important;
    }
</style>

