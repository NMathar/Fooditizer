<template>
    <div class="title" v-if="content">
        <h2>Admin Menu</h2>
        <h4>//TODO: Show users</h4>
    </div>
</template>

<script>
    export default {
        data: () => ({
            content: false
        }),
        methods: {
            checkUser: function () {
                if (!this.$store.state.user) {
                    window.location.href = '/';
                }else{
                    this.content = true;
                }
            }
        },
        mounted: function () {
            this.checkUser();
        }
    }
</script>