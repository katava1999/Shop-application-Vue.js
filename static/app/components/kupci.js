export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="ulogovan">
    <b>Morate biti ulogovani kao Administrator</b>
</div>
<div>
    <korisnik-forma v-on:sacuvaj="create" v-bind:tekst="'Dodaj'"></korisnik-forma>
</div>
    `,
    data() {
        return {
            korisnici: [],
            korisnikZaIzmenu: {},
            ulogovan:false
        }
    },
    methods: {
        setkorisnikZaIzmenu(korisnik) {
            this.korisnikZaIzmenu = { ...korisnik };
        },
        refreshkorisnici() {
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        create(korisnik) {
            axios.post("api/korisnici", korisnik).then((response) => {
                this.$router.push("/korisnici");
                this.refreshkorisnici();
            }, _ =>{
                this.ulogovan=true;
            });
        },
        update(korisnik) {
            console.log(korisnik);
            axios.put(`api/korisnici/${korisnik.id}`, korisnik).then((response) => {
                this.refreshkorisnici();
            });
        },
        remove(id) {
            axios.delete(`api/korisnici/${id}`).then((response) => {
                this.refreshkorisnici();
            });
        }
    },
    created() {
        this.refreshkorisnici();
    }
}