<template>
    <div class="dashboard" v-if="isAuthenticated">
        <h2>&nbsp;</h2>
        <div class="text-xs-center">
            <v-btn fab large error @click.native="" type="file">
                <v-icon dark>remove</v-icon>
            </v-btn>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-btn fab dark large class="indigo" @click.native="">
                <v-icon dark>add</v-icon>
            </v-btn>

            <h2>&nbsp;</h2>
            <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
            ></v-text-field>
            <h3>{{scan}}</h3>

            <label class="fileContainer">
                <v-btn
                        class="blue-grey white--text"
                >
                    Scan
                    <v-icon right dark>view_column</v-icon>
                </v-btn>
                <input type="file" @change="processFile($event)">
            </label>


        </div>
    </div>

</template>
<script>
    import {mapGetters} from 'vuex'
    import Quagga from 'quagga';

    export default {
        computed: mapGetters([
            'isAuthenticated',
            'loggedUser'
        ]),
        data: () => ({
            search: '',
            scan: ''
        }),
        methods: {
            processFile (event) {
//                console.log(event.target.files[0]);
                this.decodeImage(URL.createObjectURL(event.target.files[0]));
            },
            decodeImage (src) {
                let self = this;
                Quagga.decodeSingle({
                    decoder: {
                        readers: ["ean_reader"] // List of active readers
                    },
                    locate: true, // try to locate the barcode in the image
                    src: src // or 'data:image/jpg;base64,' + data
                }, function (result) {
                    if (result.codeResult) {
//                        console.log("result", result.codeResult.code);
                        self.scan = result.codeResult.code;
                    } else {
                        self.scan = '';
//                        console.log("not detected");
                    }
                });
            }
        },
        mounted: function () {
            let self = this;
            setTimeout(function () {
                if (!self.isAuthenticated) {
                    window.location.href = '/';
                }
            }, 500);


        }
    }

</script>

<style>
    .fileContainer {
        overflow: hidden;
        position: relative;
    }

    .fileContainer [type=file] {
        cursor: inherit;
        display: block;
        font-size: 999px;
        filter: alpha(opacity=0);
        min-height: 100%;
        min-width: 100%;
        opacity: 0;
        position: absolute;
        right: 0;
        text-align: right;
        top: 0;
    }
</style>