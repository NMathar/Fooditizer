<template>
    <v-app>
        <v-navigation-drawer absolute persistent light v-model="drawer" overflow v-if="$store.state.user">

            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="$store.state.user.image"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ $store.state.user.displayName }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title" :to="item.href" :router="item.router" >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar fixed class="indigo darken-4" dark v-if="$store.state.user">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Fooditizer</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="logout" v-tooltip:bottom="{ html: 'Logout' }">
                <v-icon>power_settings_new</v-icon>
            </v-btn>

        </v-toolbar>
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
    import {mapGetters} from 'vuex'

    export default {
        computed: mapGetters([
            'isAuthenticated',
            'loggedUser'
        ]),
        data: () => ({
            user: {},
            drawer: true,
            items: [
                {href: '/', router: true, title: 'Home', icon: 'dashboard'},
                {href: '/admin', router: true, title: 'Admin', icon: 'dashboard'},
                {href: '/about', router: true, title: 'About', icon: 'question_answer'}
            ],
            right: null
        }),
        methods: {
            getUser: function () {
                // GET /someUrl
                this.$http.get('/api/get/user').then(response => {
//                    console.log(response.body);
                    // get body data
                    this.user = response.body;
                    this.$store.commit('SET_USER', this.user);

//                    if(!this.user){
//                        window.location.href = '/';
//                    }

                }, response => {
                    // error callback
//                    console.log('User Data');
                });
            },
            logout: function () {
                this.$http.get('/api/logoff/').then(response => {
//                    console.log(response.body);
                    if (response.body.success) {
                        this.$store.commit('SET_USER', null);
                        window.location.href = '/';
                    }

                }, response => {
                    // error callback
                });
            }
        },
        mounted: function () {
            this.getUser();
            console.log(this.$store.state.user);
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

