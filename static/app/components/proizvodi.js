export default {
    template: `
<div>
    <h1>Proizvodi</h1>
    <tabela-proizvoda v-bind:proizvodi="proizvodi" v-on:uklanjanje="remove" v-on:izmena="setZaIzmenu"></tabela-proizvoda>
</div>
    `,
    data() {
        return {
            proizvodi: [],
        }
    },
    methods: {
        refreshProizvodi() {
            axios.get("api/proizvodi").then((response) => {
                this.proizvodi = response.data;
            });
        },
        remove(id)  {
            axios.delete(`api/proizvodi/${id}`).then((response) => {
                this.refreshProizvodi();
            });
        },
        setZaIzmenu(proizvod) {
            this.$router.push(`/proizvodi/${proizvod.id}`);
        }
    },
    created() {
        this.refreshProizvodi();
    }
}