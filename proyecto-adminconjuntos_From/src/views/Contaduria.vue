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
          <p class="font-weight-bold black--text mx-auto titulo">Contaduria</p>
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

    <v-card class="mx-auto px-10" elevation="10" width="440">
      <v-row class="mt-1">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="picker"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="picker"
              label="Fecha Inicio"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              readonly
              v-on="on"
              prefix="Desde:"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="picker"
            scrollable
            locale="co-es"
            color="#32A287"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(picker)">
              Aceptar
            </v-btn>
          </v-date-picker>
        </v-menu>

      </v-row>
      <v-row class="">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="picker2"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="picker2"
              label="Fecha Final"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              prefix="Hasta:"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="picker2"
            scrollable
            locale="co-es"
            color="#32A287"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">
              Cancelar
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(picker2)">
              Aceptar
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          elevation="2"
          rounded
          color="purple"
          class="white--text  mb-3 mt-6"
          @click="initialize"
        >
          Cancelar
        </v-btn>
        <v-btn
          elevation="2"
          rounded
          color="purple"
          class="white--text ml-5 mb-3 mt-6"
          @click="Filtro(picker,picker2)"
        >
          Aceptar
        </v-btn>
      </v-row>
    </v-card>
    <br />
    <v-data-table
      :headers="headers"
      :items="datosPagos"
      sort-by="Cedula"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Pagos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                elevation="2"
                rounded
                color="purple"
                v-bind="attrs"
                v-on="on"
                class="white--text mx-auto mb-2 mt-2"
              >
                Nuevo Registro
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="form">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.Cedula"
                          label="Cedula"
                          type="number"
                          :rules="cedulaRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.Monto"
                          label="Monto"
                          type="number"
                          :rules="basicRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="menuPago"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.Fecha"
                              prepend-icon="mdi-calendar"
                              label="fecha"
                              readonly
                              v-on="on"
                              :rules="basicRules"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.Fecha"
                            @input="menuPago = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="purple" text @click="close"> Cancelar </v-btn>
                <v-btn
                  color="purple"
                  text
                  :disabled="!form"
                  :loading="isLoading"
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
        </v-toolbar>
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
  font-size: 60px;
  margin-left: vh;
}
</style>

<script>
export default {
  name: "Contaduria",
  data() {
    return {
      value: "",
      form: false,
      isLoading: false,
      dialog: false,
      menu2: false,
      menuPago: false,
      menu: false,
      drawer: true,
      Fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      picker2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      pickerPago: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
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
      dialogDelete: false,
      headers: [
        {
          text: "Cedula",
          align: "start",
          value: "Cedula",
        },
        { text: "Valor Pagado", value: "Monto" },
        { text: "Fecha", value: "Fecha" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      cedula: "",
      cedulaRules: [
        (v) => !!v || "Cedula requerida",
        (v) => (v && v.length <= 10) || "Max 10 caracteres",
        (v) => v.length >= 7 || "Min 7 caracteres",
      ],
      basicRules: [(v) => !!v || "Cedula is required"],
      datosPagos: [],
      editedIndex: -1,
      editedItem: {
        Cedula: 0,
        apto: 0,
        torre: 0,
        Monto: 0,
        Fecha: 0,
      },
      defaultItem: {
        Cedula: 0,
        apto: 0,
        torre: 0,
        Monto: 0,
        Fecha: 0,
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
  
  created () {
    this.initialize()
  },
  methods: {
    initialize() {
      this.axios
        .get("/Contaduria/all")
        .then((res) => {
          console.log(res.data);

          this.datosPagos = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });

      /* this.datosPagos = [
        {
          Cedula: "Frozen Yogurt",
          Monto: 24,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "Ice cream sandwich",
          Monto: 37,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "Eclair",
          Monto: 23,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "Cupcake",
          Monto: 67,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "Gingerbread",
          Monto: 49,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "Jelly bean",
          Monto: 94,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "Lollipop",
          Monto: 98,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "Honeycomb",
          Monto: 87,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "Donut",
          Monto: 51,
          Fecha: "2021-10-1",
        },
        {
          Cedula: "KitKat",
          Monto: 65,
          Fecha: "2021-10-1",
        },
      ]; */
    },

    editItem(item) {
      this.editedIndex = this.datosPagos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.datosPagos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.eliminarNota(this.editedItem._id);

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
      if (this.editedIndex > -1) {
        Object.assign(this.datosPagos[this.editedIndex], this.editedItem);
        this.editarNota(this.editedItem);
      } else {
        this.agregarNota();
      }
      this.close();
    },
    agregarNota() {
      this.axios
        .post("/Contaduria/", this.editedItem)
        .then((res) => {
          this.datosPagos.push(res.data);
          this.editedItem.Cedula = "";
          this.editedItem.Monto = "";
          this.editedItem.Fecha = "";
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    eliminarNota(id) {
      this.axios
        .delete(`/Contaduria/${id}`)
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
    editarNota(editedItem) {
      this.axios
        .put(`/Contaduria/${editedItem._id}`, editedItem)
        .then((res) => {
          const index = this.datosPagos.findIndex(
            (n) => n._id === res.data._id
          );
          this.datosPagos[index].Cedula = res.data.Cedula;
          this.datosPagos[index].Monto = res.data.Monto;
          this.datosPagos[index].Fecha = res.data.Fecha;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    Filtro(FechaIni, FechaFin) {
      if(FechaIni)
      this.axios
      .get(`/Contaduria/fecha/${FechaIni}T00:00:00.000Z/${FechaFin}T23:00:00.000Z`)
        .then((res) => {
          console.log(res.data);

          this.datosPagos = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
  },
};
</script>
