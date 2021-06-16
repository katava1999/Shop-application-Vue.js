export default {
    props: ["proizvodiK"],
    data() {
        return {}
    },
    template: `
    
<ul class="list-group" v-for="proizvod in proizvodiK">
    <li class="list-group-item ">{{proizvod.id}}</li>
    <li class="list-group-item" >{{proizvod.naziv}}</li>
    <li class="list-group-item" >{{proizvod.opis}}</li>
    <li class="list-group-item" >{{proizvod.cena}}</li>
    <li class="list-group-item" >{{proizvod.dostupno}}</li>
    <button type="submit" class="btn btn-primary">Dodaj u korpu</button>
</ul>
    `
}