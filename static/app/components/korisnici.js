export default {
    template: `
<div>
    <h1>Korisnici</h1>
    <tabela-korisnika v-bind:korisnici="korisnici" v-on:uklanjanjeK="remove" v-on:izmenaK="setZaIzmenu"></tabela-korisnika>
</div>
    `,
    data() {
        return {
            korisnici: [],
            
        }
    },
    methods: {
        refreshkorisnici() {
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        remove(id)  {
            axios.delete(`api/korisnici/${id}`).then((response) => {
                this.refreshkorisnici();
            });
        },
        setZaIzmenu(korisnik) {
            this.$router.push(`/korisnici/${korisnik.id}`);
        }
    },
    created() {
        this.refreshkorisnici();
    }
}