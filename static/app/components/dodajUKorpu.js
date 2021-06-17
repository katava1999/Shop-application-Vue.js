export default {
    props: ["korpa", "korisnici", "proizvodi", "tekst"],
    emits: ["sacuvajU"],
    data() {
        return {
            novaKorpa: this.korpa ? {...this.korpa} : {}
        }
    },
    watch: {
        korpa: function(newValue, oldValue) {
             this.novaKorpa = {...this.korpa};
         }
    },
    template: `
    <form v-on:submit.prevent="$emit('sacuvaj', {...novaKorpa})">
        <div>
            <label>Korisnik_id:
                <select v-model="novaKorpa.korisnik_id" required>
                    <option v-for="korisnik in korisnici" v-bind:value="korisnik.id">{{korisnik.id}} | {{korisnik.korisnicko_ime}}</option>
                </select>
            </label>
        </div>
        <div>
            <label>Proizvodi:
                <select v-model="novaKorpa.proizvod_id" required>
                    <option v-for="proizvod in proizvodi" v-bind:value="proizvod.id">{{proizvod.id}} | {{proizvod.id}} | {{proizvod.naziv}}</option>
                </select>
            </label>
        </div>
        <div>
            <label>Datum: <input type="datetime-local" v-model="novaKorpa.datum" required></label>
        </div>
        <div>
            <label>Kolicina: <input type="number" v-model="novaKorpa.kolicina" required></label>
        </div>
        <div>
            <input type="submit" v-bind:value="tekst">
        </div>
    </form>
    `
}