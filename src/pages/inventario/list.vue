<template>
    <main class="main-page" id="">
        <template v-if="showHeader">
            <section class="page-section q-pa-md" >
                <div class="container-fluid">
                    <div class="row justify-between items-center q-col-gutter-md">
                        <div  class="col col-md-auto " >
                            <div class=" text-h6 text-primary" >
                                Inventario
                            </div>
                        </div>
                        <div  class="col-md-auto col-12 " >
                            <template v-if="auth.canView('/inventario/add')">
                                <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   :to="`/inventario/add`" class="full-width" >
                                    <q-icon name="add"></q-icon>                                
                                    Adicionar novo 
                                </q-btn>
                            </template>
                        </div>
                        <div  class="col-md-auto col-12 " >
                            <q-input debounce="1000"  placeholder="Pesquisa" v-model="filters.search.value" >
                            <template v-slot:append>
                                <q-icon name="search"></q-icon>
                            </template>
                            </q-input>
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
                            <template v-if="showBreadcrumbs && pageBreadCrumb.fieldName">
                                <q-card class="q-pa-md q-mb-sm text-bold nice-shadow-16">
                                    <q-breadcrumbs>
                                    <q-breadcrumbs-el icon="arrow_back" class="text-capitalize" :label="pageBreadCrumb.fieldName" to="/inventario"></q-breadcrumbs-el>
                                    <q-breadcrumbs-el :label="pageBreadCrumb.fieldValue" ></q-breadcrumbs-el>
                                </q-breadcrumbs>
                            </q-card>
                        </template>
                        <div >
                            <q-table :loading="loading" hide-bottom  grid card-container-class="q-col-gutter-md justify-start" 
                            :columns="app.menus.eventoslistheader" 
                            :rows="records" 
                            row-key="id" 
                            v-model:pagination="pagination"
                            @request="setPagination" 
                            no-data-label="Nenhum Registro Encontrado">
                            <template v-slot:item="props">
                                <div class="col-12 col-md-4">
                                    <q-card  class=" nice-shadow-16">
                                        <q-item>
                                            <q-item-section thumbnail>
                                                <q-img v-ripple @click="app.openPageDrawer({ page: 'inventario/view', url: `inventario/view/${props.row.id}` })" class="q-ml-sm cursor-pointer" height="60px" width="100px" :src="$utils.setImgUrl(props.row.foto, 'medium')">
                                                <template v-slot:error>
                                                    <div class="absolute-full  text-h2 text-bold flex flex-center bg-grey-3 text-grey-8">!</div>
                                                </template>
                                                </q-img>    
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label v-ripple @click="app.openPageDrawer({ page: 'inventario/view', url: `inventario/view/${props.row.id}` })" lines="2" class="text-bold text-primary cursor-pointer">{{ props.row.nome }}</q-item-label>
                                                <q-item-label caption>{{ props.row.status }}</q-item-label>
                                            </q-item-section>
                                            <q-item-section side top>
                                                <q-card-actions class="row q-col-gutter-xs justify-end">
                                                    <q-btn icon="menu" padding="xs" round flat color="grey">
                                                        <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                            <q-list dense rounded nav>
                                                                <template v-if="auth.canView('inventario/view')">
                                                                    <q-item link clickable v-ripple @click="app.openPageDrawer({ page: 'inventario/view', url: `/inventario/view/${props.row.id}` })">
                                                                        <q-item-section>
                                                                            <q-icon color="primary" size="sm" name="visibility"></q-icon>
                                                                        </q-item-section>
                                                                        <q-item-section>Ver</q-item-section>
                                                                    </q-item>
                                                                </template>
                                                                <template v-if="auth.canView('inventario/edit')">
                                                                    <q-item link clickable v-ripple :to="`/inventario/edit/${props.row.id}`">
                                                                        <q-item-section>
                                                                            <q-icon color="positive" size="sm" name="edit"></q-icon>
                                                                        </q-item-section>
                                                                        <q-item-section>Edit</q-item-section>
                                                                    </q-item>
                                                                </template>
                                                                <template v-if="auth.canView('inventario/delete')">
                                                                    <q-item link clickable v-ripple @click="deleteItem(props.row.id)">
                                                                        <q-item-section>
                                                                            <q-icon color="negative" size="sm" name="delete_sweep"></q-icon>
                                                                        </q-item-section>
                                                                        <q-item-section>Delete</q-item-section>
                                                                    </q-item>
                                                                </template>
                                                            </q-list>
                                                        </q-menu>
                                                    </q-btn>
                                                </q-card-actions>
                                            </q-item-section>
                                        </q-item>
                                    </q-card></div>
                                </template>
                                </q-table>
                                <div class="row justify-center">
                                    <q-td></q-td>
                                </div>
                            </div>
                            <!-- page loading indicator template -->
                            <template v-if="loading">
                                <q-inner-loading :showing="loading">
                                    <q-spinner color="primary" size="30px"> 
                                    </q-spinner>
                                </q-inner-loading>
                            </template>
                            <!-- page empty record template -->
                            <template v-if="pageReady && !records.length">
                                <q-card :flat="$q.screen.gt.md">
                                    <q-card-section>
                                        <div class="text-grey text-h6 text-center">
                                            Nenhum Registro Encontrado
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </template>
                            <!-- page footer template-->
                            <template v-if="showFooter">
                                <div class="">
                                    <q-separator />
                                    <div class="q-pa-md" v-show="pageReady">
                                        <div class="row items-center justify-between">
                                            <div class="row items-center q-col-gutter-md">
                                                <template v-if="auth.canView('inventario/delete')">
                                                    <div>
                                                        <q-btn round flat   no-caps  unelevated   color="negative" @click="deleteItem(selectedItems)" v-if="selectedItems.length" icon="delete_sweep" class="q-my-xs" title="Excluir selecionado">
                                                            <q-tooltip>Delete Selected Items</q-tooltip>
                                                        </q-btn>
                                                    </div>
                                                </template>
                                            </div>
                                            <div v-if="paginate && totalRecords > 0" class="row  items-center justify-between">
                                                <div class="col-auto">
                                                    <q-chip square>Registros {{recordsPosition}} do {{totalRecords}}</q-chip>
                                                </div>
                                                <div v-if="totalPages > 1">
                                                    <q-pagination  color="primary"  v-model="pagination.page" :direction-links="true" :boundary-links="true" :max-pages="5" :boundary-numbers="true" :max="totalPages"></q-pagination>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup>
	import {  computed, ref, toRefs } from 'vue';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app';
	import { useAuth } from 'src/composables/auth';
	import { utils } from 'src/utils';
	import { useListPage } from 'src/composables/listpage';
	import { usePageStore } from 'src/stores/page';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'id',
		},
		pageStoreKey: {
			type: String,
			default: 'INVENTARIO',
		},
		pageName : {
			type : String,
			default : 'inventario',
		},
		routeName : {
			type : String,
			default : 'inventariolist',
		},
		apiPath : {
			type : String,
			default : 'inventario/index',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		paginate: {
			type: Boolean,
			default: true,
		},
		scrollIntoView: {
			type: Boolean,
			default: true,
		},
		isSubPage: {
			type: Boolean,
			default: false,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		showBreadcrumbs: {
			type: Boolean,
			default: true,
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		importButton: {
			type: Boolean,
			default: false,
		},
		multiCheckbox: {
			type: Boolean,
			default: true,
		},
		mergeRecords: {
			type: Boolean,
			default: false,
		},
		page: {
			type: Number,
			default: 1,
		},
		limit: {
			type: Number,
			default: 10,
		},
		search: {
			type: String,
			default: '',
		},
		fieldName: null,
		fieldValue: null,
		queryParams: { 
			type: Object,
			default: () => ({})
		},
		sortBy: {
			type: String,
			default: '',
		},
		sortType: {
			type: String,
			default: 'desc', //desc or asc
		},
		emptyRecordMsg: {
			type: String,
			default: "Nenhum Registro Encontrado",
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
	
	const app = useApp();
	const auth = useAuth();
	
	const defaultStoreState = {
		filters: {
			search: {
				tag: "Search",
				value: '',
				valueType: 'single',
				options: [],
			}
		},
		pagination: {
			page: props.page,
			rowsPerPage: props.limit,
			rowsNumber: 0,
			sortBy: props.sortBy,
			descending: props.sortType == 'desc'
		},
		primaryKey: props.primaryKey
	}
	const store = usePageStore(props.pageStoreKey,  defaultStoreState);
	
	// page hooks where logics resides
	const page = useListPage({ store, props });
	
	const {records, filters,  totalRecords,  selectedItems, expandedRows, pagination,} = toRefs(store.state);
	const { pageReady, loading, } = toRefs(page.state);
	
	const {  pageBreadCrumb,   totalPages, recordsPosition, } = page.computedProps;
	
	//page methods
	const { load,      setPagination, deleteItem,       } = page.methods;
	
	const pageTitle = computed({
		get: function () {
			return "Inventario"
		}
	});
	
	useMeta(() => {
		return {
			title: pageTitle.value //set browser title
		}
	});
</script>
<style scoped>
</style>
