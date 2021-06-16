export default {
    template: `
<div>
    <h1>Proizvodi Za kupca</h1>
    <prikaz-p v-bind:proizvodiK="proizvodiK"></prikaz-p>
</div>
    `,
    data() {
        return {
            proizvodiK: [],
        }
    },
    methods: {
        refreshProizvodiK() {
            axios.get("api/proizvodi").then((response) => {
                this.proizvodiK = response.data;
            });
        }
        
    },
    created() {
        this.refreshProizvodiK();
    }
}