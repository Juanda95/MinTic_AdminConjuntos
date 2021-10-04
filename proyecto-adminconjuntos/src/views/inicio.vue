<template>
<div class="hero">
    
    <!-- Seccion de titulo -->
    <h1 style="text-align:center; color:white; font-size: 55px;">Administracion de</h1>
    <h1 style="text-align:center; color:white; font-size: 55px;">Condominios</h1><br>
    <!-- division que contiene la imagen y el formulario -->
    <div style="background-color:white;
    margin: auto;
    width: 115vh;
    height: 60vh;
    padding:0px;">
    <!-- Division que contiene la imagen -->
        <div style="
        float:left;
        margin:0px;
        padding:0px">
        <!-- imagen -->
            <v-img src="..\assets\imagen_inicio_sesion.png"  max-height="60vh"  max-width="60vh" fixed></v-img>
        </div>
        <!-- division que contiene el formulario --> 
        <div  style="
        position:relative;
        width: 30%;
        margin: 0px;
        padding-top:10vh;
        padding-left:0px;
        padding-right:2vh;
        padding-bottom:10vh;
        margin-left:70vh">
        <!-- titulo del formulario -->
            <h2 style="text-align:center">Iniciar sesion</h2>
            <br>  
            formulario
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
            <br>
            <v-row justify="center" class="mb-5">
            <v-btn 
            elevation="2"
            rounded
            color="purple"
            class="white--text align-center"
            >
                Aceptar
            </v-btn>
            </v-row>
        </div>
    </div>
</div>
</template>

<!-- estilos -->
<style>
/* clase que pone el fondo de la pagina */
.hero {
  background: url('../assets/fondo_inicio_sesion.png');
  background-size: cover;
  height: 100vh;
}
</style>