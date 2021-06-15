export default {
    template: `
<div>
    <nov-proizvod v-on:sacuvaj="create" v-bind:tekst="'Dodaj'"></nov-proizvod>
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
        create(proizvod) {
            axios.post("api/proizvodi", proizvod).then((response) => {
                this.$router.push("/proizvodi");
                this.refresh();
            });
        }
    },
    created() {
        this.refreshProizvodi();
    }
}