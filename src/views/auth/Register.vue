<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-sm font-bold">
                Entre com sua Conta
              </h6>
            </div>
            <div class="btn-wrapper text-center">
              <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." class="w-5 mr-1" :src="github" />
                Github
              </button>
              <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." class="w-5 mr-1" :src="google" />
                Google
              </button>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>ou Faça Login com suas Credenciais</small>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Nome
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Nome"
                  v-model="name"
                />
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
                  v-model="email"
                  @change="verifyEmail"
                />
                <label
                  v-if="emailExists"
                  class="block text-xs font-bold mb-2"
                  style="margin-top: 10px"
                  htmlFor="email"
                >
                  Email já cadastrado
                </label> 
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
                />                              
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Confirme a sua Senha
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Confirmação de Senha"
                  v-model="passwordCheck"
                />
                <label
                  v-if="password.length < 8"
                  class="block text-xs font-bold mb-2"
                  style="margin-top: 10px"
                  htmlFor="password"
                >
                  Sua senha deve conter pelo menos 8 caracteres
                </label>  
                <label
                  v-if="password != passwordCheck"
                  class="block text-xs font-bold mb-2"
                  style="margin-top: 10px"
                  htmlFor="passwordCheck"
                >
                  As senhas não conferem
                </label>                
              </div>

              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    v-model="policyPrivacy"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Eu aceito as
                    <a href="javascript:void(0)" class="text-emerald-500">
                      Políticas de Privacidade
                    </a>
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  v-on:click="register"
                >
                  Criar Conta
                </button>
              </div>
            </form>
          </div>          
        </div>
        <div class="flex flex-wrap mt-6 relative text-center">
          <div class="w-full">
            <a href="/" class="text-blueGray-200">
              <small>Já é cadastrado? Clique para Fazer Login</small>
            </a>
          </div>          
        </div>        
      </div>      
    </div>
  </div>
</template>
<script>
import github from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";
import '@/assets/styles/tailwind.css';
import axios from "axios";

export default {
  data() {
    return {
      github,
      google,
      name: '',
      email: '',
      emailExists: false,
      password: '',
      passwordCheck: '',
      policyPrivacy: false
    };
  },
  methods: {
    async register() {      
      if(this.policyPrivacy == true && this.emailExists == false && this.password.length >= 8) {
          const res = await axios({
              url: process.env.VUE_APP_BACKEND_URL + "/register",
              method: "POST",
              data: {
                name: this.name,
                email: this.email,
                password: this.password
              },
            }).catch((err) => {
              if (err.response.status == 400) {
                this.$moshaToast({ title: 'Atenção', description: 'Informe um e-mail válido para se cadastrar'}, {type: 'danger', transition: 'slide'})              
              }
              // this.$toast.add({severity: 'error', summary: err, life: 3000})
            }).then(res => {            
              if (res.status == 201) {               
                this.$moshaToast({ title: 'Registrado', description: 'Parabéns, a sua conta foi criada com sucesso...'}, {type: 'success', transition: 'slide'})
                
                // location.href = "/" - Enviar uma variavel booleana via props para aparecer o toast acima na tela de login
              }
            });                          
      } else {
        if(this.policyPrivacy == false) {
            this.$moshaToast({ title: 'Políticas de Privacidade', description: 'Você deve aceitar as nossas políticas de privacidade para se cadastrar...'}, {type: 'info', transition: 'slide'})
        } if(this.emailExists == true) {
            this.$moshaToast({ title: 'Atenção', description: 'Email informado já cadastrado no sistema'}, {type: 'danger', transition: 'slide'})                          
        } if(this.password.length < 8) {
            this.$moshaToast({ title: 'Atenção', description: 'Por favor, verifique a senha informada'}, {type: 'danger', transition: 'slide'})                
        }
      }
    },
    // Verify if e-mail exists on database API
    async verifyEmail() {      
      const res = await axios({
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
  }
};
</script>
