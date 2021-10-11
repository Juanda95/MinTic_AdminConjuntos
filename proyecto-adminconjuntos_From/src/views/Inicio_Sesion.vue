<template>
  <v-container>
    <!-- Seccion de titulo -->
    <h1
      class="text-center white--text mt-3 font-weight-bold"
      style="font-size:51px;"
    >
      Administracion de
    </h1>
    <h1
      class="text-center white--text mt-3 font-weight-bold"
      style="font-size:51px;"
    >
      Condominios
    </h1>
    <br />

    <v-card class="mx-auto" light max-width="120vh" rounded="xl">
      <v-row class="mx-0" style="overflow:hidden;">
        <!-- Add `overflow: hidden;` here! -->
        <v-img
          src="..\assets\imagen_inicio_sesion.png"
          max-height="370"
          max-width="60vh"
          fixed
        ></v-img>
        <div class="mx-auto my-auto">
          <!-- titulo del formulario -->
          <h2 class="mt-5" style="text-align:center">Iniciar sesion</h2>
          <br />
          Ingese informacion
          <v-row class="justify-center">
            <v-col cols="6">
              <div v-if="errors && errors.length">
                <v-alert
                  dense
                  dismissible
                  elevation="4"
                  outlined
                  text
                  type="error"
                >
                  {{ error.message }}
                </v-alert>
              </div>
            </v-col>
          </v-row>

          <v-form>
            <!-- textfield de la cedula -->
            <v-text-field
              v-model.trim="login.cedula"
              id="cedula"
              :counter="10"
              label="Cedula"
              required
            ></v-text-field>
            <!-- textfield de la contraseña -->
            <v-text-field
              type="password"
              v-model.trim="login.password"
              id="password"
              label="Contraseña"
              required
            ></v-text-field>
            <!-- Boton de aceptar -->
            <v-row justify="center" class="mb-4 mt-3">
            <v-btn
              elevation="2"
              rounded
              color="purple"
              class="white--text align-center"
              @click="onSubmit()"
            >
              Ingresar
            </v-btn>
          </v-row>
          </v-form>
          <br />
          
        </div>
      </v-row>
    </v-card>
    <br />
    <br />
  </v-container>
</template>

<!-- estilos -->
<style>
/* clase que pone el fondo de la pagina */
.v-main {
  background: linear-gradient(
    109.24deg,
    #32a287 1.65%,
    rgba(68, 3, 129, 0.97) 112.46%
  );
  background-size: auto;
}
</style>


<script>
export default {
  data(){
    return {
      login:{},
      errors:[],
    }
  },


  computed: {
    
  },

  watch: {
    
  },

  created () {
    
  },

  methods: {
    onSubmit(){
      
      this.axios
        .post(`http://localhost:2000/api/login`,this.login)
        .then(res => {
          localStorage.setItem ('jwtToken',res.data.token)
          console.log(res.data)
          this.$router.push({
            name:'Home'
          })
          .catch(err =>{
            console.error(err)
            this.errors.push(err)
            console.log(this.errors)
          })
        })
    },
    
  },
}

</script>
