<template>
  <v-container>
    <v-app-bar app color="#EDE7D9" dark height="145vh">
      <v-app-bar-nav-icon
        color="#32A287"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-col>
        <v-row class="mt-5">
          <v-spacer></v-spacer>
          <v-avatar>
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              class="img-thumbnail"
              alt="..."
              style="border-radius: 100px; width: 65px; height: 65px"
            />
          </v-avatar>
          <h3 class="black--text ml-3 font-weight-bold headline" Roboto>
            Administrador
          </h3>
        </v-row>
        <v-row>
          <p class="font-weight-bold black--text mx-auto titulo">
            Propietarios
          </p>
        </v-row>
      </v-col>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" color="#32A287">
      <v-layout column>
        <v-flex class="align-left">
          <v-list-item align-left>
            <v-list-item-content>
              <p class="white--text text-h5 mt-5 ">{{usuario.informacion.condominio}}</p>
              <p class="white--text mb-0">
                Proyecto administrador del Condominio
              </p>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
        <hr color="gray" class="ml-2 mr-2" />
        <v-flex class="ml-0 mb-0">
          <div v-if="usuario.tipoUsuario===1">
            <v-list class="" dense>
              <v-list-item
                v-for="itemAdmin in itemsAdmin"
                :key="itemAdmin.title"
                link
                class="mt-4"
                :to="'/' + itemAdmin.url"
              >
                <v-list-item-icon>
                  <v-icon align="center" large class="" color="white">
                    {{ itemAdmin.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="titulo_item white--text text-h6">
                    {{ itemAdmin.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <br />
            </v-list>
          </div>
        </v-flex>
        <v-row class="boton mx-auto ml-10">
          <v-btn elevation="2" rounded color="#EDE7D9" :to="'/'">
            Cerrar sesión
          </v-btn>
        </v-row>
      </v-layout>
    </v-navigation-drawer>
    <div class="" color="#EDE7D9">
      <v-card class="mx-auto mt-3" elevation="10" width="700">
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-form ref="form" v-model="form">
          <v-row class="px-10">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.informacion.Nombre"
                :rules="nameRules"
                :counter="30"
                label="Nombre y Apellido"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field
                v-model="editedItem.informacion.Torre"
                :rules="torreRules"
                :counter="1"
                label="Torre"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="editedItem.informacion.Correo"
                :rules="emailRules"
                label="Correo"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="px-10">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.cedula"
                :rules="cedulaRules"
                type="number"
                :counter="10"
                label="Cedula"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="editedItem.informacion.Apartamento"
                :rules="apartamentoRules"
                type="number"
                :counter="3"
                label="Apartamento"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="5">
              <v-text-field
                color="purple"
                label="Phone number"
                :rules="numeroRules"
                v-model="editedItem.informacion.Celular"
                type="text"
                maxlength="14"
                @input="acceptNumber"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="close()">
            Limpiar
          </v-btn>
          <v-btn
            :disabled="!form"
            class="white--text"
            color="deep-purple accent-4"
            depressed
            @click="save"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
      <br />
      <v-data-table
        :headers="headers"
        :items="Propietarios"
        sort-by="cedula"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="ml-2 text-h5">
                ¿Seguro que desea eliminar el Registro?</v-card-title
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
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<style>
.v-main {
  background: #A49694;
  background-size: auto;
}
.boton {
  position: absolute;
  bottom: 5%;
}

.titulo_item {
  float: unset;
  margin-top: 1%;
}
.dialogo_vcard {
  border: 5px solid purple !important;
}
.titulo {
  font-size: 70px;
}
.perfil {
  position: absolute;
  top: 5%;
}
</style>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
export default {
  name: "Contaduria",
  data() {
    return {
      value: "",
      form: false,
      phone: undefined,
      dialog: false,
      drawer: true,
      dialogDelete: false,
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
      valid: true,
      nameRules: [
        (v) => !!v || "Nombre y Apellido requerido",
        (v) =>
          (v && v.length <= 30) ||
          "el campo debe de tener menos de 20 caracteres",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Correo requerido",
        (v) => /.+@.+\..+/.test(v) || "Correo no valido",
      ],
      cedulaRules: [
        (v) => !!v || "Cedula requerida",
        (v) => (v && v.length <= 10) || "Max 10 caracteres",
        (v) => v.length == 10 || "Min 10 caracteres",
      ],
      Torre: "",
      torreRules: [
        (v) => !!v || "Torre requerida",
        (v) => (v && v != " ") || "el campo debe ser diferente",
      ],
      apartamentoRules: [
        (v) => !!v || "Apartamento requerido",
        (v) => (v && v.length <= 3) || "el campo debe de tener 3 caracteres",
        (v) => v.length >= 3 || "Min 3 caracteres",
      ],
      numero: "",
      numeroRules: [
        (v) => !!v || "Celular requerido",
        (v) => (v && v.length <= 10) || "max 10 caracteres",
        (v) => v.length >= 10 || "Min 10 caracteres",
      ],
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "informacion.Nombre",
        },
        { text: "Cedula", value: "cedula" },
        { text: "Torre", value: "informacion.Torre" },
        { text: "Apartamento", value: "informacion.Apartamento" },
        { text: "Correo", value: "informacion.Correo" },
        { text: "Celular", value: "informacion.Celular" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      basicRules: [(v) => !!v || "Name is required"],
      Propietarios: [],
      editedIndex: -1,
      editedItem: {
        cedula: 0,
        informacion: {
          Nombre: "",
          Torre: 0,
          Apartamento: 0,
          Celular: 0,
          Correo: "",
        },
      },
      defaultItem: {
        cedula: 0,
        informacion: {
          Nombre: "",
          Torre: 0,
          Apartamento: 0,
          Celular: 0,
          Correo: "",
        },
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    },
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
    this.axios
        .get("/Usuarios/all")
        .then((res) => {
          console.log(res.data);

          this.Propietarios = res.data;
          const token= localStorage.getItem('jwtToken').split(' ')[1];
          var token_decode=jwt_decode(token);
          //this.usuario.push(token_decode)
          this.usuario=token_decode;
          if(this.usuario.tipoUsuario===2){
            this.$router.push({
              name:'Home'
            })
          }
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
    acceptNumber() {
      var x = this.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
    initialize() {
      this.axios
        .get("/Usuarios/all")
        .then((res) => {
          console.log(res.data);

          this.Propietarios = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
      /* this.Propietarios = [
        {
          Nombre: "Frozen Yogurt",
          cedula: 159,
          Torre: 6.0,
          apto: 24,
          Celular: 4.0,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "Ice cream sandwich",
          cedula: 237,
          Torre: 9.0,
          apto: 37,
          Celular: 4.3,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "Eclair",
          cedula: 262,
          Torre: 16.0,
          apto: 23,
          Celular: 6.0,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "Cupcake",
          cedula: 305,
          Torre: 3.7,
          apto: 67,
          Celular: 4.3,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "Gingerbread",
          cedula: 356,
          Torre: 16.0,
          apto: 49,
          Celular: 3.9,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "Jelly bean",
          cedula: 375,
          Torre: 0.0,
          apto: 94,
          Celular: 0.0,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "Lollipop",
          cedula: 392,
          Torre: 0.2,
          apto: 98,
          Celular: 0,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "Honeycomb",
          cedula: 408,
          Torre: 3.2,
          apto: 87,
          Celular: 6.5,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "Donut",
          cedula: 452,
          Torre: 25.0,
          apto: 51,
          Celular: 4.9,
          Correo: "sdsd@gnail.vom",
        },
        {
          Nombre: "KitKat",
          cedula: 518,
          Torre: 26.0,
          apto: 65,
          Celular: 7,
          Correo: "sdsd@gnail.vom",
        },
      ]; */
    },

    editItem(item) {
      this.activarEdicion(item.cedula);
    },

    deleteItem(item) {
      this.editedIndex = this.Propietarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.eliminarPropietario(this.editedItem.cedula);
      this.closeDelete();
      this.$refs.form.reset();
    },

    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.editar = false;
        this.$refs.form.reset();
      });
      this.initialize();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.initialize();
    },

    save() {
      if (this.editar) {
        this.editarPropietario(this.editedItem);
      } else {
        this.AgregarPropietario();
      }

      this.close();
      this.initialize();
    },

    AgregarPropietario() {
      this.editedItem.password = this.editedItem.cedula;
      this.editedItem.informacion.condominio = this.usuario.informacion.condominio;
      this.editedItem.tipoUsuario = 2;
      this.axios
        .post("/Usuarios/", this.editedItem)
        .then((res) => {
          this.Propietarios.push(res.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    eliminarPropietario(cedula) {
      this.axios
        .delete(`/Usuarios/${cedula}`)
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

    editarPropietario(editedItem) {
      this.axios
        .put(`/Usuarios/${editedItem._id}`, editedItem)
        .then((res) => {
          const index = this.Propietarios.findIndex(
            (n) => n._id === res.data._id
          );
          this.Propietarios[index].Cedula = res.data.Cedula;
          this.Propietarios[index].informacion.Nombre = res.data.Nombre;
          this.Propietarios[index].informacion.Torre = res.data.Torre;
          this.Propietarios[index].informacion.Correo = res.data.Correo;
          this.Propietarios[index].informacion.Apartamento =
            res.data.Apartamento;
          this.Propietarios[index].informacion.Celular = res.data.Celular;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    activarEdicion(cedula) {
      this.editar = true;
      this.axios
        .get(`/Usuarios/${cedula}`)
        .then((res) => {
          this.editedItem = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
  },
};
</script>
