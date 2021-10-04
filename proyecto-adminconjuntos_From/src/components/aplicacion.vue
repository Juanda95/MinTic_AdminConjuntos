<template>
    <v-container>
        <v-app-bar app color="#EDE7D9" dark height="145vh">
            <v-app-bar-nav-icon
                color="#32A287"
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            
            
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
                        <v-list class="" dense >
                            <v-list-item
                                v-for="item in itemsAdmin"
                                :key="item.title"
                                link
                                class="mt-4"
                                :to="'/'+item.url"
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
                            </v-list-item>
                        <br>
                    </v-list>
                    </div>
                </v-flex>
                <v-row class="boton mx-auto ml-10" >
                    <v-btn 
                    elevation="2" 
                    rounded 
                    color="#EDE7D9"
                    :to="'/'"> 
                        Cerrar sesión 
                    </v-btn>
                </v-row>
            </v-layout>
        </v-navigation-drawer>
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
</style>

<script>
    export default {
        name: 'barra',
        data: () => ({
            drawer: false,
            itemsResidente: [
                { title: "Noticias", icon: "mdi-newspaper-variant" }
            ],
            itemsAdmin: [
            { title: "Noticias", url: 'Home', icon: "mdi-newspaper-variant" },
            { title: "Contaduria", url: 'Contaduria', icon: "mdi-calculator-variant" },
            { title: "Propietarios", url: 'Propietarios', icon: "mdi-account-multiple" },
            ],
            usuario:{
                Nombre:"Juan",
                Apellido:"Elkin",
                tipoUsuario:"Residente",
                admin:true,
                Torre:'A',
                Apartamento:202
            },
        //
        }),
    };
</script>