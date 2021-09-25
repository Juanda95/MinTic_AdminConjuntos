<template>
        
                <v-card
                color="#EDE7D9"
                class="mx-auto mt-6"
                max-width="350"
                outlined
            
                >
                <v-list-item three-line>
                    <v-list-item-content>
                    <v-flex class="row  mt-3 align-center">
                        <div>
                            <v-list-item-title class="text-h5 ml-3">
                                Lorem Ipsum
                            </v-list-item-title>
                        </div>
                        <v-spacer></v-spacer>
                        <div >
                            <v-btn
                            color="Black"
                            icon
                            >
                                <v-icon>mdi-application-edit</v-icon>
                            </v-btn>
                            <v-btn
                            color="Black"
                            icon
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        
                        </div>
                        
                    </v-flex>
                    
                    <v-list-item-subtitle>24/09/2021 2:17</v-list-item-subtitle>
                    <div class=" mb-3 mt-4">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo metus tellus, eget sagittis tellus sollicitudin ac. Sed ultrices, neque ut condimentum gravida, justo turpis vestibulum eros, id posuere enim odio at enim. Integer ultricies libero dui, vitae blandit nisi aliquet nec. Integer feugiat pulvinar mollis.
                    </p> 
                    </div>
                    
                    </v-list-item-content>

                </v-list-item>
                </v-card>
                
</template>

<script>
    export default {
        name: 'App',
        data: () => ({
        //
        }),
    };
</script>