export default {
    props: ["proizvodiK"],
    data() {
        return {}
    },
    template: `
<ul class="list-group" v-for="proizvod in proizvodiK">
    <li class="list-group-item ">{{proizvod.id}}</li>
    <li class="list-group-item" >{{proizvod.naziv}}</li>
</ul>
    `
}