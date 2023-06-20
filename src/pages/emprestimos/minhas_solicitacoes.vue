<template>
    <main class="main-page" id="">
        <template v-if="showHeader">
            <section class="page-section q-pa-md" >
                <div class="container-fluid">
                    <div class="row justify-between items-center q-col-gutter-md">
                        <div  class="col col-md-auto " >
                            <div class=" text-h6 text-primary" >
                                Emprestimos
                            </div>
                        </div>
                        <div  class="col-md-auto col-12 " >
                            <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   @click="app.openPageDialog({ page: 'emprestimos/add_membro', url: `/emprestimos/add_membro` , closeBtn: true  })"  class="full-width" >
                                Solicitar empréstimo 
                            </q-btn>
                            <template v-if="auth.canView('/emprestimos/add')">
                                <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   :to="`/emprestimos/add`" class="full-width" >
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
                    <div  class="col-3 comp-grid" >
                        <q-card  :flat="isSubPage" class="q-mb-sm q-pa-sm nice-shadow-16">
                            <div class="q-mb-sm text-bold text-primary" >
                                Filtrar por status
                            </div>
                            <div class="">
                                <q-option-group v-model="filters.status.value"  :options="filters.status.options" ></q-option-group>
                            </div>
                        </q-card>
                    </div>
                    <div  class="col-9 comp-grid" >
                        <div class="row q-gutter-sm">
                            <filter-tags :controller="page.filterController" />
                        </div>
                        <div >
                            <template v-if="showBreadcrumbs && pageBreadCrumb.fieldName">
                                <q-card class="q-pa-md q-mb-sm text-bold nice-shadow-16">
                                    <q-breadcrumbs>
                                    <q-breadcrumbs-el icon="arrow_back" class="text-capitalize" :label="pageBreadCrumb.fieldName" to="/emprestimos"></q-breadcrumbs-el>
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
                            :columns="app.menus.emprestimosminhassolicitacoesheader" 
                            :rows="records"
                            :binary-state-sort="true"
                            separator="cell"
                            :dense="true"
                            row-key="id" 
                            v-model:pagination="pagination"
                            hide-bottom
                            @request="setPagination"
                            :loading="loading">
                            <!-- Start of Table Layout -->
                            <template v-slot:body="props">
                                <q-tr :class="{selected: isCurrentRecord(props.row)}" :props="props">
                                    <q-td  key="users_nome" :props="props">
                                        {{ props.row.users_nome }}
                                    </q-td>
                                    <q-td  key="inventario_nome" :props="props">
                                        {{ props.row.inventario_nome }}
                                    </q-td>
                                    <q-td  key="status" :props="props">
                                        {{ props.row.status }}
                                    </q-td>
                                    <q-td  key="emprestado_em" :props="props">
                                        <div v-if="props.row.emprestado_em">
                                            {{$utils.relativeDate(props.row.emprestado_em)}}
                                            <q-tooltip>
                                            {{ $utils.humanDatetime(props.row.emprestado_em) }}
                                            </q-tooltip>
                                        </div>
                                    </q-td>
                                    <q-td  key="quanto_tempo" :props="props">
                                        {{ props.row.quanto_tempo }} dias
                                    </q-td>
                                    <q-td key="btnactions" :props="props" auto-width>
                                        <div class="row q-col-gutter-xs justify-end">
                                            <q-btn icon="menu" padding="xs" round flat color="grey">
                                                <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                    <q-list dense rounded nav>
                                                        <template v-if="auth.canView('emprestimos/view')">
                                                            <q-item link clickable v-ripple :to="`/emprestimos/view/${props.row.id}`">
                                                                <q-item-section>
                                                                    <q-icon color="primary" size="sm" name="visibility"></q-icon>
                                                                </q-item-section>
                                                                <q-item-section>View</q-item-section>
                                                            </q-item>
                                                        </template>
                                                        <template v-if="auth.canView('emprestimos/edit')">
                                                            <q-item link clickable v-ripple :to="`/emprestimos/edit/${props.row.id}`">
                                                                <q-item-section>
                                                                    <q-icon color="positive" size="sm" name="edit"></q-icon>
                                                                </q-item-section>
                                                                <q-item-section>Edit</q-item-section>
                                                            </q-item>
                                                        </template>
                                                        <template v-if="auth.canView('emprestimos/delete')">
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
                                            <template v-if="auth.canView('emprestimos/delete')">
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
			default: 'EMPRESTIMOS-MINHAS_SOLICITACOES',
		},
		pageName : {
			type : String,
			default : 'emprestimos',
		},
		routeName : {
			type : String,
			default : 'emprestimosminhas_solicitacoes',
		},
		apiPath : {
			type : String,
			default : 'emprestimos/minhas_solicitacoes',
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
			default: false,
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
			},
			status: {
				tag: "Status",
				value: '',
				valueType: 'single',
				options: app.menus.status2,
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
			return "Emprestimos"
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
