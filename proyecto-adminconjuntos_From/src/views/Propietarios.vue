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
            {{ usuario.tipoUsuario }}
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
              <p class="white--text text-h5 mt-5">Nombre del Condominio</p>
              <p class="white--text mb-0">
                Proyecto administrador del Condominio
              </p>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
        <hr color="gray" class="ml-2 mr-2" />
        <v-flex class="ml-0 mb-0">
          <div v-if="usuario.admin">
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

    <v-card class="mx-auto mt-3" elevation="10" width="700">
      <v-form ref="form" v-model="form">
        <v-row class="px-10">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="editedItem.name"
              :rules="nameRules"
              :counter="20"
              label="Nombre y Apellido"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              v-model="editedItem.torre"
              :rules="torreRules"
              :counter="1"
              label="Torre"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="editedItem.correo"
              :rules="emailRules"
              label="Correo"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="px-10">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="editedItem.cedulaCC"
              :rules="cedulaRules"
              type="number"
              :counter="10"
              label="Cedula"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="editedItem.apto"
              :rules="apartamentoRules"
              type="number"
              :counter="3"
              label="Apartamento"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="5">
            <v-text-field
              box
              color="purple"
              label="Phone number"
              :rules="numeroRules"
              v-model="editedItem.celular"
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
                <v-btn
          text
          color="purple"
          @click="$refs.form.reset()"
        >
          Limpiar
        </v-btn>
        <v-btn
          :disabled="!form"
          :loading="isLoading"
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
      :items="desserts"
      sort-by="cedulaCC"
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
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<style>
.v-main {
  background-color: #a49694;
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
export default {
  name: "Contaduria",
  data() {
    return {
      value: "",
      form: false,
      phone: undefined,
      dialog: false,
      drawer: true,
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
        Nombre: "Juan",
        Apellido: "Elkin",
        tipoUsuario: "Administrador",
        admin: true,
        Torre: "A",
        Apartamento: 202,
      },
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Nombre y Apellido requerido",
        (v) =>
          (v && v.length <= 20) ||
          "el campo debe de tener menos de 20 caracteres",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Correo requerido",
        (v) => /.+@.+\..+/.test(v) || "Correo no valido",
      ],
      cedula: "",
      cedulaRules: [
        (v) => !!v || "Cedula requerida",
        (v) => (v && v.length <= 10) || "Max 10 caracteres",
        (v) => v.length == 10 || "Min 10 caracteres",
      ],
      torre: "",
      torreRules: [
        (v) => !!v || "Torre requerida",
        (v) => (v && v != " ") || "el campo debe ser diferente",
      ],
      Apartamento: "",
      apartamentoRules: [
        (v) => !!v || "Apartamento requerido",
        (v) => (v && v.length <= 3) || "el campo debe de tener 3 caracteres",
        (v) => v.length >= 3 || "Min 3 caracteres",
      ],
      numero: "",
      numeroRules: [
        (v) => !!v || "celular requerido",
        (v) => (v && v.length <= 14) || "max 10 caracteres",
        (v) => v.length >= 14 || "Min 10 caracteres",
      ],
    headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Cedula", value: "cedulaCC" },
        { text: "Torre", value: "torre" },
        { text: "Apartamento", value: "apto" },
        { text: "Correo", value: "correo" },
        { text: "celular", value: "celular" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      basicRules: [(v) => !!v || "Name is required"],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        cedulaCC: 0,
        torre: 0,
        apto: 0,
        celular: 0,
        correo: "",
      },
      defaultItem: {
        name: "",
        cedulaCC: 0,
        torre: 0,
        apto: 0,
        celular: 0,
        correo: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Pago" : "Editar Pago";
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

mounted(){
  this.initialize();
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
      this.desserts = [
        {
          name: "Frozen Yogurt",
          cedulaCC: 159,
          torre: 6.0,
          apto: 24,
          celular: 4.0,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "Ice cream sandwich",
          cedulaCC: 237,
          torre: 9.0,
          apto: 37,
          celular: 4.3,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "Eclair",
          cedulaCC: 262,
          torre: 16.0,
          apto: 23,
          celular: 6.0,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "Cupcake",
          cedulaCC: 305,
          torre: 3.7,
          apto: 67,
          celular: 4.3,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "Gingerbread",
          cedulaCC: 356,
          torre: 16.0,
          apto: 49,
          celular: 3.9,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "Jelly bean",
          cedulaCC: 375,
          torre: 0.0,
          apto: 94,
          celular: 0.0,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "Lollipop",
          cedulaCC: 392,
          torre: 0.2,
          apto: 98,
          celular: 0,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "Honeycomb",
          cedulaCC: 408,
          torre: 3.2,
          apto: 87,
          celular: 6.5,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "Donut",
          cedulaCC: 452,
          torre: 25.0,
          apto: 51,
          celular: 4.9,
          correo: "sdsd@gnail.vom",
        },
        {
          name: "KitKat",
          cedulaCC: 518,
          torre: 26.0,
          apto: 65,
          celular: 7,
          correo: "sdsd@gnail.vom",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$refs.form.reset();
    },

    close() {
      this.dialog = false;
      
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      
      this.close();
    },



  },
};
</script>
