<template>
  <div >
    <v-app-bar app color="#EDE7D9" dark height="145vh">
      <v-app-bar-nav-icon
        color="#32A287"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <p class="font-weight-bold black--text mx-auto titulo">Noticias</p>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" color="#32A287">
      <v-layout column>
        <v-flex class="align-left">
          <v-list-item align-left>
            <v-list-item-content>
              <p class="white--text text-h5 mt-5">{{usuario.informacion.condominio}}</p>
              <p class="white--text mb-0">
                Proyecto administrador del Condominio
              </p>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
        <hr color="gray" class="ml-2 mr-2" />
        <v-flex class="ml-4 mt-2 align-left row">
          <v-avatar>
            <img
              src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
              class="img-thumbnail"
              alt="..."
              style="border-radius: 100px; width: 65px; height: 65px"
            />
          </v-avatar>
          <h3 v-if="usuario.tipoUsuario==2" class="white--text mt-2 ml-5" Roboto>
            Residente
          </h3>
          <h3 v-else-if="usuario.tipoUsuario==1" class="white--text mt-2 ml-5" Roboto>
            Administrador
          </h3>
        </v-flex>
        <v-flex class="row ml-4 mt-4">
          <div class="white--text">Nombre:</div>
          <div class="ml-2 white--text">{{ usuario.informacion.Nombre }}</div>
        </v-flex>
        <v-flex class="row ml-4 mt-2">
          <div class="white--text">Cedula:</div>
          <div class="ml-2 white--text">{{ usuario.cedula}}</div>
        </v-flex>
        <div v-if="usuario.tipoUsuario==1"></div>
        
        <div v-else>
          <v-flex class="row ml-4  mt-2">
            <div class=" white--text">Torre:</div>
            <div class="ml-2 white--text">{{ usuario.informacion.Torre }}</div>
          </v-flex>
          <v-flex class="row ml-4 mt-2">
            <div class=" white--text">Apartamento:</div>
            <div class="ml-2 white--text">{{ usuario.informacion.Apartamento }}</div>
          </v-flex>
        </div>
        <hr color="gray" class="mt-4 ml-2 mr-2 mb-0" />
        <v-flex class="ml-0 mb-0">
          <div v-if="usuario.tipoUsuario==1">
            <v-list class="" dense>
              <v-list-item
                v-for="item in itemsAdmin"
                :key="item.title"
                link
                class="mt-4"
                :to="'/' + item.url"
              >
                <v-list-item-icon>
                  <v-icon align="center" large class="" color="white">
                    {{ item.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="titulo_item white--text text-h6">
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>

                <div v-if="item.title == 'Noticias'">
                  <v-dialog v-model="dialog" width="400px" flat>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="boton_noticias"
                        color="white"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        to="/home"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <v-card class="dialogo_vcard" color="#EDE7D9">
                      <v-card-title>
                        <span class="text-h5">Escriba su noticia</span>
                      </v-card-title>
                      <v-form ref="form" v-model="form" class="pa-4 pt-6">
                        <v-text-field
                          v-model="editedItem.titulo"
                          :rules="[rules.required]"
                          color="deep-purple"
                          label="Titulo"
                        ></v-text-field>
                        <v-textarea
                          class="mr-5 ml-5"
                          v-model="editedItem.cuerpo"
                          label="Cuerpo de la Noticia"
                          counter
                          maxlength="200"
                          :rules="[rules.required]"
                          full-width
                        ></v-textarea>
                      </v-form>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn text @click="close()">
                          cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          :disabled="!form"
                          class="white--text"
                          color="deep-purple accent-4"
                          @click="save()"
                        >
                          publicar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-list-item>
              <br />
            </v-list>
          </div>
          <div v-else>
            <v-list class="" dense>
              <v-list-item
                v-for="itemResidente in itemsResidente"
                :key="itemResidente.title"
                link
                class="mt-4"
              >
                <v-list-item-icon>
                  <v-icon align="center" large class="" color="white">
                    {{ itemResidente.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="titulo_item white--text text-h6">
                    {{ itemResidente.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <br />
            </v-list>
          </div>
        </v-flex>
        <v-row class="mx-auto ml-10 boton">
          <v-btn
            class="mx-auto"
            elevation="2"
            rounded
            color="#EDE7D9"
            @click="logout"
          >
            Cerrar sesión
          </v-btn>
        </v-row>
      </v-layout>
    </v-navigation-drawer>
    <div >
    <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="ml-2 text-h5">
                ¿Seguro que desea eliminar la Noticia?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
    <div v-if="usuario.tipoUsuario == 1">
      <v-card
        color="#EDE7D9"
        class="mx-auto mt-6"
        max-width="350"
        outlined
        v-for="noticia in Noticias"
        :key="noticia.id"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-row class=" mt-3 align-center">
              <p class="ml-3 text-subtitle-1 my-auto" name="">
                
                {{ new Date(noticia.fecha) | dateFormat('DD/MM/YYYY') }}
              </p>
              <p class="ml-3 text-subtitle-1 my-auto" name="">
                
                {{ new Date(noticia.fecha) | dateFormat('h:m a') }}
              </p>
              <v-spacer></v-spacer>
                <v-btn color="Black" icon @click="editItem(noticia)">
                  <v-icon>mdi-application-edit</v-icon>
                </v-btn>
                <v-btn class="mr-3" color="Black" icon @click="deleteItem(noticia)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              
            </v-row>

            <div>
                <p class="text-h6 mt-3 text-center mx-auto">
                  {{ noticia.titulo }}
                </p>
              </div>
            <div class=" mb-3 mt-4">
              <p class="text-justify">
                {{ noticia.cuerpo }}
              </p>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <div v-else-if="usuario.tipoUsuario == 2">
      <v-card
        v-for="noticia in Noticias"
        :key="noticia.id"
        color="#EDE7D9"
        class="mx-auto mt-6"
        max-width="350"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-row class=" mt-3 align-center">
              <p class="ml-3 text-subtitle-1 my-auto" name="">
                
                {{ new Date(noticia.fecha) | dateFormat('DD/MM/YYYY') }}
              </p>
              <p class="ml-3 text-subtitle-1 my-auto" name="">
                
                {{ new Date(noticia.fecha) | dateFormat('h:m a') }}
              </p>
            </v-row>
            <div>
                <p class="text-h6 mt-3 text-center mx-auto">
                  {{ noticia.titulo }}
                </p>
              </div>
            <div class=" mb-3 mt-4">
              <p class="text-justify">
                {{ noticia.cuerpo }}
              </p>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    </div>
  </div>
</template>

<style>
.v-main {
  background: #A49694;
  background-size: auto;
}
.pintar {
  background-color: #a49694;
}
.boton {
  position: absolute;
  bottom: 5%;
}
.titulo {
  font-size: 70px;
}
.titulo_item {
  float: unset;
  margin-top: 1%;
}

.dialogo_vcard {
  border: 5px solid purple !important;
}
</style>

<script>
//import NoticiasPost from "../components/NoticiasPostAdmin.vue";
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Vue from 'vue';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

Vue.use(VueFilterDateFormat);
export default {
  //components: { NoticiasPost },
  name: "App",
  data() {
    return {
      dialogDelete: false,
      titulo: undefined,
      email: undefined,
      cuerpo: undefined,
      form: false,
      isLoading: false,
      dialog: false,
      drawer: true,
      Noticias: [],
      editedIndex: -1,
      editedItem: {
        titulo: "",
        cuerpo: "",
      },
      defaultItem: {
        titulo: "",
        cuerpo: "",
      },
      itemsResidente: [{ title: "Noticias", icon: "mdi-newspaper-variant" }],
      itemsAdmin: [
        { title: "Noticias", url: "Home", icon: "mdi-newspaper-variant" },
        {
          title: "Contaduria",
          url: "Contaduria",
          icon: "mdi-calculator-variant",
        },
        {
          title: "Propietarios",
          url: "Propietarios",
          icon: "mdi-account-multiple",
        },
      ],
      usuario: {
        informacion:{
          condominio:""
        }
      },
      rules: {
        required: (v) => !!v || "This field is required",
      },
    };
  },
    watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  beforeCreate() {
    axios.defaults.headers.common['Authorization']= localStorage.getItem(
      'jwtToken'
    )
    axios
        .get("/Noticias/all")
        .then((res) => {
          console.log(res.data);

          this.Noticias = res.data;
          
          const token= localStorage.getItem('jwtToken').split(' ')[1];
          var token_decode=jwt_decode(token);
          //this.usuario.push(token_decode)
          this.usuario=token_decode;
          //console.log(token_decode);
          console.log(this.Noticias);
        })
        .catch((e) => {
          console.log(e.response);
          if(e.response.status===403||e.response.status===401){
            this.$router.push({
              name:'Inicio sesion'
            })
          }
        });    
  },


  methods: {
    initialize() {
      this.axios
        .get("/Noticias/all")
        .then((res) => {
          console.log(res.data);

          this.Noticias = res.data;
          console.log(this.Noticias);
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    editItem(item) {
      this.editedIndex = this.Noticias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.Noticias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      
    },

    deleteItemConfirm() {
      console.log(this.editedItem._id);
      this.eliminarNoticia(this.editedItem._id);

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        
        this.initialize();
      }, 300);
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.resetValidation()
      });
      this.initialize();
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.Noticias[this.editedIndex], this.editedItem);
        this.editarNoticia(this.editedItem);
      } else {
        this.Noticias.push(this.editedItem);
        this.agregarNoticia();
      }
      
      this.close();
      
    },
    agregarNoticia() {
      this.axios
        .post("/Noticias/", this.editedItem)
        .then((res) => {
          this.datosPagos.push(res.data);
          this.editedItem.titulo = "";
          this.editedItem.cuerpo = "";
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    eliminarNoticia(id) {
      this.axios
        .delete(`/Noticias/${id}`)
        .then((res) => {
          const index = this.editedItem.findIndex(
            (editedItem) => editedItem._id === res.data._id
          );
          this.editedItem.splice(index, 1);
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    editarNoticia(editedItem) {
      this.axios
        .put(`/Noticias/${editedItem._id}`, editedItem)
        .then((res) => {
          const index = this.Noticias.findIndex(
            (n) => n._id === res.data._id
          );
          this.Noticias[index].titulo = res.data.titulo;
          this.Noticias[index].cuerpo = res.data.cuerpo;
          
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    logout(){
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name:'Inicio sesion'
      })

    }
  },
};
</script>
