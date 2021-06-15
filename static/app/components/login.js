export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="neuspesanLogin">
  Neuspesna prijava na sistem! Pokusajte ponovo
</div>
    <form v-on:submit.prevent="login()">
  <div class="mb-3">
    <label class="form-label">Korisničko ime</label>
    <input type="text" v-model="korisnik.korisnicko_ime" class="form-control" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Tip:</label>
    <select class="form-select" v-model="korisnik.tip_id">
        <option value="1">Administrator</option>
        <option value="2">Kupac</option>
    </select>
    </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
    `,
    data: function() {
        return {
            korisnik: {
                "korisnicko_ime": "",
                "tip_id": ""
            },
            neuspesanLogin:false
        };
    },
    methods: {
        login: function() {
            // console.log(this.korisnik);
            if(this.korisnik.tip_id == "1"){
                axios.post(`api/login`, this.korisnik).then((response) => {
                this.$router.push("/korisnici");
            
            });
        } else if(this.korisnik.tip_id == "2"){
            axios.post(`api/login`, this.korisnik).then((response) => {
                this.$router.push("/proizvodi");
            
            });
            
        }else {
            this.neuspesanLogin=true
        }
    }
        
    }
}