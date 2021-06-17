export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="ulogovan">
    <b>Morate biti prijavljeni kao Kupac</b>
</div>
<div>
    <h1>Proizvodi Za kupca</h1>
    <prikaz-p v-bind:proizvodiK="proizvodiK" v-on:izmena="setZaIzmenu"></prikaz-p>
</div>
    `,
    data() {
        return {
            proizvodiK: [],
            ulogovan: false,


        }
    },
    methods: {
        refreshProizvodiK() {
            axios.get("api/proizvodi").then((response) => {
                this.proizvodiK = response.data;
            }, _ =>{
                this.ulogovan=true;
            });
        },
        setZaIzmenu(proizvod) {
            this.$router.push(`/proizvodi/${proizvod.id}`);
        }
    },
    created() {
        this.refreshProizvodiK();
    }
}