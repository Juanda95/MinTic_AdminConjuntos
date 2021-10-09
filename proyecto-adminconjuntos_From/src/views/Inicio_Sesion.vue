<template>
  <v-main>
    <!-- Seccion de titulo -->
    <h1 class="text-center white--text mt-3 font-weight-bold" style="font-size:52px;">
      Administracion de
    </h1>
    <h1 class="text-center white--text mt-3 font-weight-bold" style="font-size:52px;">
      Condominios
    </h1>
    <br />

    <v-card class="mx-auto" light max-width="750" rounded="xl">
      <v-row class="mx-0" style="overflow:hidden;">
        <!-- Add `overflow: hidden;` here! -->
        <v-img
          src="..\assets\imagen_inicio_sesion.png"
          max-height="400"
          max-width="375"
          fixed
        ></v-img>
        <div class="mx-auto my-auto">
          <!-- titulo del formulario -->
          <h2 style="text-align:center">Iniciar sesion</h2>
          <br />
          Ingese informacion
          <v-form>
            <!-- textfield de la cedula -->
            <v-text-field
              v-model="name"
              :counter="10"
              label="Cedula"
              required
            ></v-text-field>
            <!-- textfield de la contraseña -->
            <v-text-field
              type="password"
              label="Contraseña"
              required
            ></v-text-field>
            <!-- Boton de aceptar -->
          </v-form>
          <br />
          <v-row justify="center" class="mb-4 mt-3">
            <v-btn
              elevation="2"
              rounded
              color="purple"
              class="white--text align-center"
            >
              Ingresar
            </v-btn>
          </v-row>
        </div>
      </v-row>
    </v-card>
    <br />
        <br />
  </v-main>
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
