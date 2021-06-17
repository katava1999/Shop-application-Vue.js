export default {
    template: `
<div>
    <dodaj-korpu v-on:sacuvajU="refreshK" v-bind:tekst="'Dodaj'"></dodaj-korpu>
</div>
    `,
    data() {
        return {
            korpa: [],
        }
    },
    methods: {
        refreshK() {
            axios.get("api/korpa").then((response) => {
                this.korpa = response.data;
            }, _ =>{
                this.ulogovan=true;
            });
        },
        create(korpa) {
            axios.post("api/korpa", proizvod).then((response) => {
                this.$router.push("/korpa");
                this.refresh();
            });
        }
    },
    created() {
        this.refreshK();
    }
}