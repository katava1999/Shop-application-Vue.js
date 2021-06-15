export default {
    props: ["korisnici"],
    emits: ["izmenaK", "uklanjanjeK"],
    data() {
        return {}
    },
    template: `
<table class="table table-striped">
<thead>
    <tr>
        <th>ID</th>
        <th>Korisnicko ime</th>
        <th>Lozinka</th>
        <th>Tip</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korisnik in korisnici">
        <td>{{korisnik.id}}</td>
        <td>{{korisnik.korisnicko_ime}}</td>
        <td>{{korisnik.lozinku}}</td>
        <td>{{korisnik.tip_id}}</td>
        <td><button class="btn btn-primary me-3" v-on:click="$emit('izmenaK', {...korisnik})">Izmeni</button><button
                v-on:click="$emit('uklanjanjeK', korisnik.id)" class="btn btn-danger">Ukloni</button></td>
    </tr>
    <korisnik-forma v-on:sacuvaj="create" v-bind:tekst="'Dodaj'"></korisnik-forma>
</tbody>
</table>
    `
}