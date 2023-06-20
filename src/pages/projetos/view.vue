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
                                    Visão
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
                                <div class="q-mb-3 row q-col-gutter-md justify-start">
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Id</div>
                                                    <div class="text-bold">{{ item.id }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Titulo</div>
                                                    <div class="text-bold">{{ item.titulo }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Descricao</div>
                                                    <div class="text-bold">{{ item.descricao }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Imagem</div>
                                                    <div class="text-bold">
                                                        <image-viewer image-size="medium" image-preview-size="large" :src="item.imagem" width="320px" height="320px" :num-display="1">
                                                        </image-viewer>
                                                    </div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Arquivos</div>
                                                    <div class="text-bold">{{ item.arquivos }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Inserido Por</div>
                                                    <div class="text-bold">{{ item.inserido_por }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Inserido Em</div>
                                                    <div class="text-bold">{{ item.inserido_em }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Atualizado Por</div>
                                                    <div class="text-bold">{{ item.atualizado_por }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Atualizado Em</div>
                                                    <div class="text-bold">{{ item.atualizado_em }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <q-card  class="q-pa-md nice-shadow-16">
                                            <div class="row q-col-gutter-x-md items-center">
                                                <div class="col">
                                                    <div class="text-grey text-weight-medium mb-1">Categoria</div>
                                                    <div class="text-bold">{{ item.categoria }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                    </div>
                                </div>
                                <div class="row q-col-gutter-xs justify-start q-ma-md">
                                    <div><q-btn icon="edit" label="Edit"  outline  :rounded="false"  no-caps  unelevated   padding="xs" color="positive" title="Editar"  @click="app.openPageDialog({ page:'projetos/edit', url: `/projetos/edit/${item.id}` , closeBtn: true })">
                                    </q-btn></div>
                                    <div><q-btn icon="delete_sweep" label="Delete"  outline  :rounded="false"  no-caps  unelevated   padding="xs" color="negative" title="Excluir"  @click="deleteItem(item.id)">
                                    </q-btn></div>
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
			default: 'PROJETOS',
		},
		pageName: {
			type: String,
			default: 'projetos',
		},
		routeName: {
			type: String,
			default: 'projetosview',
		},
		apiPath: {
			type: String,
			default: 'projetos/view',
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
