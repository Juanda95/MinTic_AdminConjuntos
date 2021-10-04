<template>
  <div>
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
              <p class="white--text text-h5 mt-5">Nombre del Condominio</p>
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
          <h3 class="white--text mt-2 ml-5" Roboto>
            {{ usuario.tipoUsuario }}
          </h3>
        </v-flex>
        <v-flex class="row ml-4 mt-4">
          <div class="white--text">Nombre:</div>
          <div class="ml-2 white--text">{{ usuario.Nombre }}</div>
        </v-flex>
        <v-flex class="row ml-4 mt-2">
          <div class=" white--text">Apellido:</div>
          <div class="ml-2 white--text">{{ usuario.Apellido }}</div>
        </v-flex>
        <div v-if="usuario.admin"></div>
        <div v-else>
          <v-flex class="row ml-4  mt-2">
            <div class=" white--text">Torre:</div>
            <div class="ml-2 white--text">{{ usuario.Torre }}</div>
          </v-flex>
          <v-flex class="row ml-4 mt-2">
            <div class=" white--text">Apartamento:</div>
            <div class="ml-2 white--text">{{ usuario.Apartamento }}</div>
          </v-flex>
        </div>
        <hr color="gray" class="mt-4 ml-2 mr-2 mb-0" />
        <v-flex class="ml-0 mb-0">
          <div v-if="usuario.admin">
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
                          v-model="email"
                          :rules="[rules.required]"
                          color="deep-purple"
                          label="Email address"
                        ></v-text-field>
                        <v-textarea
                          class="mr-5 ml-5"
                          v-model="cuerpo"
                          label="Noticia"
                          counter
                          maxlength="200"
                          :rules="[rules.required]"
                          full-width
                        ></v-textarea>
                      </v-form>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn text @click="$refs.form.reset()">
                          cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          :disabled="!form"
                          class="white--text"
                          color="deep-purple accent-4"
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
            :to="'/'"
          >
            Cerrar sesión
          </v-btn>
        </v-row>
      </v-layout>
    </v-navigation-drawer>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
    <div>
      <noticias-post />
    </div>
  </div>
</template>

<style>
.v-main {
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
import NoticiasPost from "../components/NoticiasPostAdmin.vue";

export default {
  components: { NoticiasPost },
  name: "App",
  data() {
    return {
      titulo: undefined,
      email: undefined,
      cuerpo: undefined,
      form: false,
      isLoading: false,
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
      rules: {
        required: (v) => !!v || "This field is required",
      },
    };
  },
};
</script>
