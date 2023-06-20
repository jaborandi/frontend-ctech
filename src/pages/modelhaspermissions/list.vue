<template>
    <main class="main-page" id="">
        <template v-if="showHeader">
            <section class="page-section q-pa-md" >
                <div class="container-fluid">
                    <div class="row justify-between items-center q-col-gutter-md">
                        <div  class="col col-md-auto " >
                            <div class=" text-h6 text-primary" >
                                Model Has Permissions
                            </div>
                        </div>
                        <div  class="col-md-auto col-12 " >
                            <template v-if="auth.canView('/modelhaspermissions/add')">
                                <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   :to="`/modelhaspermissions/add`" class="full-width" >
                                    <q-icon name="add"></q-icon>                                
                                    Adicionar novo 
                                </q-btn>
                            </template>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <section class="page-section " >
            <div class="container-fluid">
                <div class="row q-col-gutter-x-md">
                    <div  class="col comp-grid" >
                        <div class="row q-gutter-sm">
                            <filter-tags :controller="page.filterController" />
                        </div>
                        <div >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup>
</script>
<style scoped>
</style>
