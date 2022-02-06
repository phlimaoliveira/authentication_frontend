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
                  Email
                </label>
                <input
                  type="email"
                  required
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-on:keyup.enter="forgotPassword"
                  v-model="email"
                />
              </div>                            

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  v-on:click="forgotPassword"
                >
                  Recuperar Senha
                </button>
              </div>
            
          </div>
        </div> 

        <div class="flex flex-wrap mt-6 relative">
          <div class="w-full text-center">
            <a href="/login" class="text-blueGray-200">
              <small>Voltar a Página Inicial</small>
            </a>
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
      emailExists: false
    };
  },
  methods: {    
    async forgotPassword() {        
        if(this.validEmail(this.email)) {
            await this.verifyEmail()            
            if(!this.emailExists) {
                this.$moshaToast({ title: 'Atenção', description: 'E-mail informado não cadastrado no sistema'}, {type: 'danger', transition: 'slide'})
            } else {
                const res = await this.$http({
                  url: process.env.VUE_APP_BACKEND_URL + "/forgot_password",
                  method: "POST",
                  data: {
                    "email": this.email
                  }          
                }).catch((err) => {
                  this.$moshaToast({ title: 'Atenção!', description: 'Aconteceu algum erro em nosso sistema! Por favor, tente novamente mais tarde'}, {type: 'danger', transition: 'slide'})
                }).then(res => {
                  if(res.status == 200) {
                    this.$moshaToast({ title: 'Sucesso!', description: 'Foi enviado um e-mail para Recuperação de Senha! Por favor, verifique a sua caixa de entrada'}, {type: 'success', transition: 'slide'})
                  } else if(res.status == 401) {
                    this.$moshaToast({ title: 'Atenção!', description: 'Email não encontrado na nossa base de dados'}, {type: 'danger', transition: 'slide'})
                  }
                });                
            }            
        } else {
            this.$moshaToast({ title: 'Atenção', description: 'Informe um e-mail válido'}, {type: 'danger', transition: 'slide'})              
        }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async verifyEmail() {      
      const res = await this.$http({
          url: process.env.VUE_APP_BACKEND_URL + "/verify_email_user/"+this.email,
          method: "GET"          
        }).catch((err) => {
          console.log(err.response)
        }).then(res => {
          if(res.data == 'True') {
            this.emailExists = true
          } else {
            this.emailExists = false
          }
        });
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