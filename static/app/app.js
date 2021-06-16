import Prodavnica from './components/prodavnica.js'
import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'
import TabelaProizvoda from './components/tabelaProizvoda.js';
import Kupci from './components/kupci.js'
import Proizvodi from './components/proizvodi.js'
import Proizvod from './components/proizvod.js'
import Login from './components/login.js'
import Logout from './components/logout.js'
import Korisnici from './components/korisnici.js';
import Korisnik from './components/korisnik.js';
import NoviProizvod from './components/noviProizvod.js';
import proizvodInstanca from './components/proizvodInstanca.js';
import TabelaKorpa from './components/tabelaKorpa.js';
import Korpa from './components/korpa.js';
import IzmenaKorpe from './components/izmenaKorpe.js';
import proizvodZaKupca from './components/proizvodZaKupca.js';
import proizvodZaKupcaInstanca from './components/proizvodZaKupcaInstanca.js';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Login},
        {path: "/kupci", component: Kupci},
        {path: "/logout", component: Logout},
        {path: "/proizvodi", component: Proizvodi},
        {path: "/proizvodi/:id", component: Proizvod},
        {path: "/korisnici", component: Korisnici},
        {path: "/korisnici/:id", component: Korisnik},
        {path: "/korisnikForma", component: KorisnikForma},
        {path: "/noviProizvod", component: NoviProizvod},
        {path: "/proizvodInstanca", component: proizvodInstanca},
        {path: "/korpa", component: Korpa},
        {path: "/korpa/:id", component: IzmenaKorpe},
        {path: "/proizvodiP", component: proizvodZaKupca},
        {path: "/proizvodiPI", component: proizvodZaKupcaInstanca},

    ], 
});

const app = Vue.createApp(Prodavnica);
app.component('tabela-korisnika', TabelaKorisnika);
app.component('tabela-proizvoda', TabelaProizvoda);
app.component('korisnik-forma', KorisnikForma);
app.component('nov-proizvod', NoviProizvod);
app.component('tabela-korpe', TabelaKorpa);
app.component('korpa-korpa', Korpa);
app.component('prikaz-p', proizvodZaKupca);
app.component('prikaz-proizvoda', proizvodZaKupcaInstanca);
app.use(router);
app.mount("#app");