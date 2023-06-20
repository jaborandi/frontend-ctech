<template>
    <main class="main-page" id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section q-pa-md" >
                    <div class="container">
                        <div class="row items-center q-col-gutter-md">
                            <div  v-if="!isSubPage"  class="col-auto " >
                                <q-btn @click="$router.go(-1)"      flat :rounded="false"  size=""  color="primary"  no-caps  unelevated   class="" >
                                    <q-icon name="arrow_back"></q-icon>                             
                                </q-btn>
                            </div>
                            <div  class="col col-md-auto " >
                                <div class=" text-h6 text-primary" >
                                    Detalhes do evento
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="row q-col-gutter-x-md">
                        <div  class="col comp-grid" >
                            <div >
                                <div class="q-mb-3 ">
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>: </q-item-label>
                                            <q-item-label class="text-bold"><div class="text-center">
                                                <q-img v-ripple @click="app.openPageDialog({ page: 'eventos/view', closeBtn: true })" :src="$utils.setImgUrl(item.foto, 'large')"></q-img>
                                                <h3>{{ item.titulo }}</h3>
                                                <div v-html="item.observacoes"></div>
                                            </div></q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Link: </q-item-label>
                                            <q-item-label class="text-bold"><a :href="item.link" target="_blank"><q-chip>Clique aqui para acessar</q-chip></a></q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Data Inicio: </q-item-label>
                                            <q-item-label class="text-bold">{{$utils.humanDate( item.data_inicio )}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Hora Inicio: </q-item-label>
                                            <q-item-label class="text-bold">{{$utils.humanTime( item.hora_inicio )}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Data Termino: </q-item-label>
                                            <q-item-label class="text-bold">{{$utils.humanDate( item.data_termino )}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Hora Termino: </q-item-label>
                                            <q-item-label class="text-bold">{{$utils.humanTime( item.hora_termino )}}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                </div>
                                <div class="row q-col-gutter-xs justify-start q-ma-md">
                                    <template v-if="auth.canView('eventos/edit')">
                                        <div><q-btn icon="edit" label="Edit"  outline  :rounded="false"  no-caps  unelevated   padding="xs" color="positive" title="Editar"  @click="app.openPageDialog({ page:'eventos/edit', url: `/eventos/edit/${item.id}` , closeBtn: true })">
                                        </q-btn></div>
                                    </template>
                                    <template v-if="auth.canView('eventos/delete')">
                                        <div><q-btn icon="delete_sweep" label="Delete"  outline  :rounded="false"  no-caps  unelevated   padding="xs" color="negative" title="Excluir"  @click="deleteItem(item.id)">
                                        </q-btn></div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template v-if="loading">
            <div style="min-height:200px" class="q-pa-sm text-center relative-position">
                <q-inner-loading color="primary" label="Carregando..." showing></q-inner-loading>
            </div>
        </template>
    </main>
</template>
<script setup>
	import {  computed, ref, toRefs } from 'vue';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { utils } from 'src/utils';
	import { useViewPage } from 'src/composables/viewpage.js';
	import { usePageStore } from 'src/stores/page';
	
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'id',
		},
		pageStoreKey: {
			type: String,
			default: 'EVENTOS',
		},
		pageName: {
			type: String,
			default: 'eventos',
		},
		routeName: {
			type: String,
			default: 'eventosview',
		},
		apiPath: {
			type: String,
			default: 'eventos/view',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		scrollIntoView: {
			type: Boolean,
			default: true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		titleBeforeDelete: {
			type: String,
			default: "Apagar registro",
		},
		msgBeforeDelete: {
			type: String,
			default: "Tem certeza de que deseja excluir este registro?",
		},
		msgAfterDelete: {
			type: String,
			default: "Registro excluído com sucesso",
		},
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp(props);
	const auth = useAuth();
	
	const page = useViewPage({store, props}); // where page logics resides
	
	const {  currentRecord } = toRefs(store.state);
	const { loading, pageReady } = toRefs(page.state);
	const item = currentRecord;
	
	const  { load, deleteItem,    } = page.methods;
	
	
	useMeta(() => {
		return {
			//set browser title
			title: "Visão"
		}
	});
</script>
<style scoped>
</style>
