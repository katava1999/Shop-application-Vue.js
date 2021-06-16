export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="ulogovan">
    <b>Morate biti prijavljeni kao Administrator</b>
</div>
<div>
    <nov-proizvod v-on:sacuvaj="create" v-bind:tekst="'Dodaj'"></nov-proizvod>
</div>
    `,
    data() {
        return {
            proizvodi: [],
            ulogovan:false
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
            }, _ =>{
                this.ulogovan=true;
            });
        }
    },
    created() {
        this.refreshProizvodi();
    }
}