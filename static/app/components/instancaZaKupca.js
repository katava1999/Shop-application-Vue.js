export default {
    template: `
<div>
    <h1>Proizvodi za kupca</h1>
    <prikaz-proizvoda v-bind:proizvodiZaKupca="proizvodiZaKupca"></prikaz-proizvoda>
</div>
    `,
    data() {
        return {
            proizvodiZaKupca: {},
        }
    },
    methods: {
        refreshProizvodiZakupca() {
            axios.get("api/proizvodi").then((response) => {
                this.proizvodiZaKupca = response.data;
            });
        }
    },
    created() {
        this.refreshProizvodiZakupca();
    }
}