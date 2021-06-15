export default {
    template: `
<div>
    <h1>Pregled korpe</h1>
    <tabela-korpe v-bind:korpe="korpe" v-on:uklanjanje="remove" v-on:izmena="setZaIzmenu"></tabela-korpe>
</div>
    `,
    data() {
        return {
            korpe: [],
        }
    },
    methods: {
        refreshkorpe() {
            axios.get("api/korpa").then((response) => {
                this.korpe = response.data;
            });
        },
        remove(id)  {
            axios.delete(`api/korpa/${id}`).then((response) => {
                this.refreshkorpe();
            });
        },
        setZaIzmenu(korpa) {
            this.$router.push(`/korpa/${korpa.id}`);
        }
    },
    created() {
        this.refreshkorpe();
    }
}