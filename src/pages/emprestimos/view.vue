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
                                    Detalhes do empréstimo
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
                                            <q-item-label caption>Quem: </q-item-label>
                                            <q-item-label class="text-bold">
                                                <q-btn v-if="item.id_usuario" @click="app.openPageDrawer({ page: 'users/view', url: `/users/view/${item.id_usuario}` })" padding="xs" flat color="primary" no-caps >
                                                    <q-icon name="visibility" size="xs"  class="q-mr-xs"></q-icon>  {{ item.users_nome }}
                                                </q-btn>
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>O que: </q-item-label>
                                            <q-item-label class="text-bold">
                                                <q-btn v-if="item.id_inventario" @click="app.openPageDrawer({ page: 'inventario/view', url: `/inventario/view/${item.id_inventario}` })" padding="xs" flat color="primary" no-caps >
                                                    <q-icon name="visibility" size="xs"  class="q-mr-xs"></q-icon>  {{ item.inventario_nome }}
                                                </q-btn>
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Status: </q-item-label>
                                            <q-item-label class="text-bold">{{ item.status }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Justificativa: </q-item-label>
                                            <q-item-label class="text-bold">{{ item.justificativa }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Feedback: </q-item-label>
                                            <q-item-label class="text-bold">{{ item.feedback }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Emprestado Em: </q-item-label>
                                            <q-item-label class="text-bold">
                                                <div v-if="item.emprestado_em">
                                                    {{$utils.relativeDate(item.emprestado_em)}}
                                                    <q-tooltip>
                                                    {{ $utils.humanDatetime(item.emprestado_em) }}
                                                    </q-tooltip>
                                                </div>
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Quanto Tempo: </q-item-label>
                                            <q-item-label class="text-bold">{{ item.quanto_tempo }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label caption>Devolver Em: </q-item-label>
                                            <q-item-label class="text-bold">
                                                <div v-if="item.devolver_em">
                                                    {{$utils.relativeDate(item.devolver_em)}}
                                                    <q-tooltip>
                                                    {{ $utils.humanDatetime(item.devolver_em) }}
                                                    </q-tooltip>
                                                </div>
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator></q-separator>
                                </div>
                                <div class="row q-col-gutter-xs justify-start q-ma-md">
                                    <template v-if="auth.canView('emprestimos/edit')">
                                        <div><q-btn icon="edit" label="Edit"  outline  :rounded="false"  no-caps  unelevated   padding="xs" color="positive" title="Editar"  @click="app.openPageDialog({ page:'emprestimos/edit', url: `/emprestimos/edit/${item.id}` , closeBtn: true })">
                                        </q-btn></div>
                                    </template>
                                    <template v-if="auth.canView('emprestimos/delete')">
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
			default: 'EMPRESTIMOS',
		},
		pageName: {
			type: String,
			default: 'emprestimos',
		},
		routeName: {
			type: String,
			default: 'emprestimosview',
		},
		apiPath: {
			type: String,
			default: 'emprestimos/view',
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
