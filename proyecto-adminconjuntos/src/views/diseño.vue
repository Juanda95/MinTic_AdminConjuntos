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
            <v-flex class="ml-0">
                <v-list class=""
                dense
                >
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    class="mt-4"
                >
                    <v-list-item-icon>
                        
                        <v-icon
                        align="center"
                        large
                        class=""
                        color="white">
                        {{ item.icon }}
                        </v-icon>
                        

                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                        class="titulo_item white--text text-h6"
                        
                        >
                        
                        {{ item.title }}
                        </v-list-item-title>
                        
                    </v-list-item-content>
                    
                    <div v-if="(item.title=='Noticias')">
                        <v-dialog
                        
                        v-model="dialog"
                        width="400px"
                        flat
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="boton_noticias"
                                color="white"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                >
                                    <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            </template>
                            <v-card class="dialogo"
                            color="#EDE7D9">
                                    <v-card-title>
                            <span class="text-h5">Escriba su noticia</span>
                            </v-card-title>
                            
                            <v-text-field
                            label="Titulo*"
                            class="ma-5"
                            required
                            ></v-text-field>
                            <v-divider class="mr-5 ml-5" ></v-divider>
                            <v-textarea
                            class="mr-5 ml-5"
                            v-model="title"
                            label="Noticia"
                            counter
                            maxlength="200"
                            full-width
                            single-line
                            m
                            ></v-textarea>
                            
                            
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                elevation="2"
                                rounded
                                color="purple"
                                class="white--text"
                                @click="dialog = false"
                            >
                                Cancelar
                            </v-btn>
                            <v-btn
                                elevation="2"
                                rounded
                                color="purple"
                                class="white--text"
                                @click="dialog = false"
                                >
                                    Publicar
                            </v-btn>

                            </v-card-actions>
                            
                            
                        </v-card>
                        </v-dialog>
                    </div>
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
        <div>
            <noticias-post/>
        </div>
        <div>
            <noticias-post/>
        </div>
        <div>
            <noticias-post/>
        </div>

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
.titulo_item{
    float: unset;
    margin-top: 1%;
}
.dialogo{
    background-color: #EDE7D9;
/* purple */

border: 5px solid #440381;
box-sizing: border-box;
border-radius: 15px;
}
</style>

<script>
import NoticiasPost from '../components/NoticiasPost.vue';

    export default {
    components: { NoticiasPost },
        name: 'App',
        data() {
            return{
                dialog: false,
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


