<template>
    <div>
        <v-app-bar
        app
        color="#EDE7D9"
        dark
        height="145vh"
        

        >
        <v-app-bar-nav-icon color="#32A287" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-row
        justify="center"
        class="mr-5">
            <p class=" font-weight-bold black--text titulo">
            Noticias
            </p>
        </v-row>
            

        
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" color="#32A287">
        <v-layout column>
            <v-flex class=" align-left">
                <v-list-item align-left>
                    <v-list-item-content>
                        <p class="white--text text-h5 mt-5">
                        Nombre del Condominio
                        </p>
                        <p class="white--text mb-0">
                        Proyecto administrador 
                        del Condominio
                        </p>
                    </v-list-item-content>
                </v-list-item>
            </v-flex>
            <hr color="gray" class=" ml-2  mr-2" >
            <v-flex class="ml-4 mt-2 align-left row">
                <v-avatar >
                    <img src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png" 
                    class="img-thumbnail" 
                    alt="..."
                    style="border-radius: 100px; width: 65px; height: 65px;">
                </v-avatar>
                <h3 
                    class="white--text mt-2 ml-5"
                    Roboto
                    >
                    Administrador
                </h3>
            </v-flex>
            <v-flex class="row ml-4 mt-4"> 
                <div class=" white--text ">
                Nombre:
                </div>
                <div class="ml-2 white--text " >
                    Carlos
                </div>
            </v-flex>
            <div class="ml-4 mt-2 white--text ">
                Apellido:
            </div>
            <hr color="gray" class=" ml-2  mr-2" >
            <v-flex>
                <v-list class=""
                dense
                >
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                >
                    <v-list-item-icon>
                        <v-icon
                        align="left"
                        large
                        color="white">
                        {{ item.icon }}
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title
                        class="ml-7 white--text text-h6 ">
                        {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <br>
                </v-list>
            </v-flex>
                <v-row class="boton">
                    <v-btn 
                    elevation="2"
                    rounded
                    color="#EDE7D9"
                    >
                    Cerrar sesión
                    </v-btn>
                </v-row>
            
            
        </v-layout>

        
    </v-navigation-drawer>
                <noticias-post/>
                
        </div>
                

                

</template>

<style>
.v-main{
    background-color: #A49694;
}
.boton{
    position: absolute;
    bottom: 5%;
    margin-left: 20%;
}
.titulo{
    font-size: 70px;
}
</style>

<script>
import NoticiasPost from '../components/NoticiasPost.vue';

    export default {
    components: { NoticiasPost },
        name: 'App',
        data() {
            return{
                drawer:true,
                items: [
                { title: 'Noticias', icon: 'mdi-newspaper-variant' },
                { title: 'Contaduria', icon: 'mdi-calculator-variant' },
                { title: 'Propietarios', icon: 'mdi-account-multiple' },
        ],
            };
        }
    };
</script>


