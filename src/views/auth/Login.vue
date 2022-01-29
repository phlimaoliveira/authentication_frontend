<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >          
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0" style="margin-top: 30px">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Senha
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Senha"
                  v-model="password"
                  v-on:keyup.enter="login"
                />
              </div>              

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  v-on:click="login"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-blueGray-200">
              <small>Esqueceu a Senha?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="/register" class="text-blueGray-200">
              <small>Crie sua Conta</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {      
      email: '',
      password: ''
    };
  },
  methods: {    
    async login() {
      if(!this.validEmail(this.email)) {
        this.$moshaToast({ title: 'Atenção', description: 'Informe um e-mail válido'}, {type: 'danger', transition: 'slide'})                      
      } else {
        const res = await this.$http({
          url: process.env.VUE_APP_BACKEND_URL + "/login",
          method: "POST",
          data: {
            email: this.email,
            password: this.password
          },
        }).catch((err) => {  
          console.log(err)
          if (err.response.status == 401) {
            this.$moshaToast({ title: 'Atenção', description: 'Login não autorizado, por favor verifique as suas credenciais'}, {type: 'danger', transition: 'slide'})              
          }          
        }).then(res => {
          try {
            if (res.status == 202) {
              // this.$moshaToast({ title: 'Sucesso', description: 'Login realizado com sucesso'}, {type: 'success', transition: 'slide'})              
              localStorage.setItem('access_token', res.data.access_token)
              this.$router.push({ name: 'admin' })
            } else if(res.status == 401) {
              this.$moshaToast({ title: 'Atenção', description: 'Login não autorizado, por favor verifique as suas credenciais'}, {type: 'danger', transition: 'slide'})              
            }
          } catch {}          
        });        
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  mounted() {    
    if(localStorage.getItem('access_token')) {
      this.$router.push({ name: 'admin' })
    }
  }
};
</script>

<style>


</style>