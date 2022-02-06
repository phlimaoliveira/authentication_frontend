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
            
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Nova Senha
                </label>
                <input
                  type="password"
                  required
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Nova Senha"                  
                  v-model="password"
                />
              </div> 

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Confirmação de Senha
                </label>
                <input
                  type="password"
                  required
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Confirmação de Senha"
                  v-on:keyup.enter="resetPassword"
                  v-model="confirmPassword"
                />
              </div>  

              <label
                  v-if="password.length < 8"
                  class="block text-xs font-bold mb-2"
                  style="margin-top: 10px"
                  htmlFor="password"
                >
                  Sua senha deve conter pelo menos 8 caracteres
                </label>  
                <label
                  v-if="password != confirmPassword"
                  class="block text-xs font-bold mb-2"
                  style="margin-top: 10px"
                  htmlFor="passwordCheck"
                >
                  As senhas não conferem
                </label>                         

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  v-on:click="resetPassword"
                >
                  Resetar Senha
                </button>
              </div>
            
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
      emailExists: false,
      password: '',
      confirmPassword: ''
    };
  },
  methods: { 
    async resetPassword() {
        if(this.password == this.confirmPassword) {
          if(this.password.length <= 8) {
            this.$moshaToast({ title: 'Atenção', description: 'Sua senha deve conter pelo menos 8 caracteres'}, {type: 'danger', transition: 'slide'})                
          } else {
            const token = { Authorization: `Bearer `+this.$route.params.reset_token }
            
            const res = await this.$http({
              url: process.env.VUE_APP_BACKEND_URL + "reset_password",
              method: "POST",
              data: {
                "password": this.password
              },
              headers: token         
            }).catch((err) => {              
              if(err.response.status == 401) {                
                this.$moshaToast({ title: 'Atenção!', description: 'O Token expirou! Por favor solicite esta operação novamente...'}, {type: 'danger', transition: 'slide'})
                this.$router.push({name: 'login'})
              } else {
                this.$moshaToast({ title: 'Atenção!', description: 'Aconteceu algum erro em nosso sistema! Por favor, tente novamente mais tarde'}, {type: 'danger', transition: 'slide'})
              }              
            }).then(res => {
              try {
                if(res.status == 200) {
                  this.$moshaToast({ title: 'Sucesso!', description: 'Sua senha foi alterada!'}, {type: 'success', transition: 'slide'})
                  this.$router.push({name: 'login'})
                }
              } catch(error) {

              }
            });  
          }
        } else {
          this.$moshaToast({ title: 'Atenção', description: 'Por favor, verifique a senha informada'}, {type: 'danger', transition: 'slide'})                
        }        
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