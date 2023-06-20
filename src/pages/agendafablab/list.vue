<template>
    <main class="main-page" id="">
        <template v-if="showHeader">
            <section class="page-section q-pa-md" >
                <div class="container-fluid">
                    <div class="row justify-between items-center q-col-gutter-md">
                        <div  class="col col-md-auto " >
                            <div class=" text-h6 text-primary" >
                                Agenda Fablab
                            </div>
                        </div>
                        <div  class="col-md-auto col-12 " >
                            <template v-if="auth.canView('/agendafablab/add')">
                                <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   @click="app.openPageDialog({ page: 'agendafablab/add', url: `/agendafablab/add` , closeBtn: true  })"  class="full-width" >
                                    <q-icon name="add"></q-icon>                                
                                    Solicitar aluguel gratuito 
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
                    <div  class="col comp-grid"  v-if="1<0">
                        <div class="row q-gutter-sm">
                            <filter-tags :controller="page.filterController" />
                        </div>
                        <div >
                            <template v-if="showBreadcrumbs && pageBreadCrumb.fieldName">
                                <q-card class="q-pa-md q-mb-sm text-bold nice-shadow-16">
                                    <q-breadcrumbs>
                                    <q-breadcrumbs-el icon="arrow_back" class="text-capitalize" :label="pageBreadCrumb.fieldName" to="/agendafablab"></q-breadcrumbs-el>
                                    <q-breadcrumbs-el :label="pageBreadCrumb.fieldValue" ></q-breadcrumbs-el>
                                </q-breadcrumbs>
                            </q-card>
                        </template>
                        <!-- page records template -->
                        <div >
                            <q-table 
                            :flat="true"
                            table-header-class="text-h4 bg-grey-2"
                            :bordered="false"
                            :columns="app.menus.agendafablablistheader" 
                            :rows="records"
                            :binary-state-sort="true"
                            separator="horizontal"
                            :dense="true"
                            v-model:selected="selectedItems"
                            selection="multiple"
                            row-key="id" 
                            v-model:pagination="pagination"
                            hide-bottom
                            @request="setPagination"
                            :loading="loading">
                            <!-- Start of Table Layout -->
                            <template v-slot:body="props">
                                <q-tr :class="{selected: isCurrentRecord(props.row)}" :props="props">
                                    <q-td auto-width>
                                        <q-checkbox dense v-model="props.selected"></q-checkbox>
                                    </q-td>
                                    <q-td  key="id" :props="props">
                                        <q-btn padding="xs"   :rounded="false"  color="primary"  no-caps  unelevated   flat :to="`/agendafablab/view/${props.row.id}`">{{ props.row.id }}</q-btn>
                                    </q-td>
                                    <q-td  key="titulo" :props="props">
                                        {{ props.row.titulo }}
                                    </q-td>
                                    <q-td  key="data_inicio" :props="props">
                                        {{ props.row.data_inicio }}
                                    </q-td>
                                    <q-td  key="observacoes" :props="props">
                                        {{ props.row.observacoes }}
                                    </q-td>
                                    <q-td  key="confirmacao" :props="props">
                                        {{ props.row.confirmacao }}
                                    </q-td>
                                    <q-td  key="hora_inicio" :props="props">
                                        {{ props.row.hora_inicio }}
                                    </q-td>
                                    <q-td  key="data_termino" :props="props">
                                        {{ props.row.data_termino }}
                                    </q-td>
                                    <q-td  key="hora_termino" :props="props">
                                        {{ props.row.hora_termino }}
                                    </q-td>
                                    <q-td  key="inserido_por" :props="props">
                                        {{ props.row.inserido_por }}
                                    </q-td>
                                    <q-td key="btnactions" :props="props" auto-width>
                                        <div class="row q-col-gutter-xs justify-end">
                                            <q-btn icon="menu" padding="xs" round flat color="grey">
                                                <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                    <q-list dense rounded nav>
                                                        <template v-if="auth.canView('agendafablab/view')">
                                                            <q-item link clickable v-ripple :to="`/agendafablab/view/${props.row.id}`">
                                                                <q-item-section>
                                                                    <q-icon color="primary" size="sm" name="visibility"></q-icon>
                                                                </q-item-section>
                                                                <q-item-section>View</q-item-section>
                                                            </q-item>
                                                        </template>
                                                        <template v-if="auth.canView('agendafablab/edit')">
                                                            <q-item link clickable v-ripple :to="`/agendafablab/edit/${props.row.id}`">
                                                                <q-item-section>
                                                                    <q-icon color="positive" size="sm" name="edit"></q-icon>
                                                                </q-item-section>
                                                                <q-item-section>Edit</q-item-section>
                                                            </q-item>
                                                        </template>
                                                        <template v-if="auth.canView('agendafablab/delete')">
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
                                        </div>
                                    </q-td>
                                </q-tr>
                            </template>
                            <!-- End of Table Layout-->
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
                                            <template v-if="auth.canView('agendafablab/delete')">
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
                <div  class="col-12 comp-grid" >
                    <q-card  :flat="isSubPage" class="q-mb-sm q-pa-md nice-shadow-16">
                        <div class="" >
                            <AgendafablabListCalendar :records="records" />
                            </div>
                        </q-card>
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
	import { useListPage } from 'src/composables/listpage';
	import { usePageStore } from 'src/stores/page';
	import AgendafablabListCalendar from 'src/pages/agendafablab/agendafablablistcalendar.vue';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'id',
		},
		pageStoreKey: {
			type: String,
			default: 'AGENDAFABLAB',
		},
		pageName : {
			type : String,
			default : 'agendafablab',
		},
		routeName : {
			type : String,
			default : 'agendafablablist',
		},
		apiPath : {
			type : String,
			default : 'agendafablab/index',
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
			default: 999999999,
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
	const { load,      setPagination, deleteItem,  isCurrentRecord,     } = page.methods;
	
	const pageTitle = computed({
		get: function () {
			return "Agenda Fablab"
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
