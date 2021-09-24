

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      class="teal darken-1"
      v-model="drawer"
      app
    >
      <!--  -->
      <h2 style="color: white; font-family: robot"
      
      > 
        Administrador Condominio
      </h2>
      <template v-slot:append>
          <div class="ma-5" >
            <v-row justify="center">
            <v-btn 
            elevation="2"
            rounded
            >
              Cerrar sesión
            </v-btn>
            </v-row>
            
          </div>
        </template>
      
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>
