<template>
    <p>Signing off...</p>
</template>

<script>
    export default {
        methods: {
            unsetToken: function () {
                this.$store.commit('SET_USER', null)
            },
            logout: function () {
                this.$http.get('/api/logoff/').then(response => {
                    console.log(response.body);
                }, response => {
                    // error callback
                });
            }
        },
        mounted () {
            this.unsetToken();
            this.logout();
        }
    }
</script>