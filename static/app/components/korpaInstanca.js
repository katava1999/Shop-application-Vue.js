export default {
    template: `
<div>
    <dodaj-korpu v-on:sacuvajU="create" v-bind:tekst="'Dodaj'" v-bind:korisnici="'korisnici'" v-bind:proizvodi="'proizvodi'"></dodaj-korpu>
</div>
    `,
    data() {
        return {
            korpa: {},
            korisnici:{},
            proizvodi:{}
        }
    },
    methods: {
        refreshK() {
            axios.get("api/korpa").then((response) => {
                this.korpa = response.data;
            });
        },
        refreshKorisnici() {
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        refreshProizvodi() {
            axios.get("api/proizvodi").then((response) => {
                this.proizvodi = response.data;
            });
        },
        create(korpa) {
            axios.post("api/korpa", korpa).then((response) => {
                this.$router.push("/korpa");
                this.refreshK();
            });
        }
    },
    created() {
        this.refreshK();
        this.refreshKorisnici();
        this.refreshProizvodi();
    }
}