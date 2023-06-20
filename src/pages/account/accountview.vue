<template>
    <main class="main-page" id="">
        <template v-if="pageReady">
            <section class="page-section " >
                <div class="container">
                    <div class="row q-col-gutter-x-md">
                        <div  class="col comp-grid" >
                            <div >
                                <div class="relative-position" style="min-height:100px">
                                    <div>
                                        <q-card class="q-pa-lg q-my-md nice-shadow-16">
                                            <div class="row q-col-gutter-lg">
                                                <div class="col-auto">
                                                    <image-viewer :ratio="1/1" image-size="medium" :src="$auth.userPhoto"></image-viewer>
                                                </div>
                                                <div class="col">
                                                    <div class="text-h5 text-bold text-primary text-capitalize"> {{ $auth.userName }} </div>
                                                    <div class="text-caption"> {{ $auth.userEmail }} </div>
                                                    <div v-if="$auth.userRole" class="text-capitalize text-grey text-bold">{{ $auth.userRole }}</div>
                                                </div>
                                            </div>
                                        </q-card>
                                        <div class="row q-col-gutter-md">
                                            <div class="col-sm-3 col-12">
                                                <q-card   :flat="isSubPage" class="nice-shadow-16">
                                                    <q-tabs vertical class="text-primary" v-model="tab" no-caps inline-label>
                                                        <q-tab name="accountview" icon="account_box" label="detalhe da conta" style="justify-content:initial" />
                                                        <q-tab name="accountedit" icon="edit" label="Editar conta" style="justify-content:initial" />
                                                        <q-tab name="changepassword" icon="lock" label="Mudar senha" style="justify-content:initial" />
                                                    </q-tabs>
                                                </q-card>
                                            </div>
                                            <dsiv class="col-sm-9 col-12">
                                            <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
                                                <q-tab-panel name="accountview">
                                                    <div class="row q-col-gutter-md justify-start">
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
                                                                        <div class="text-grey text-weight-medium mb-1">Name</div>
                                                                        <div class="text-bold">{{ item.name }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Phone</div>
                                                                        <div class="text-bold">{{ item.phone }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Email</div>
                                                                        <div class="text-bold">{{ item.email }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Cor Postit</div>
                                                                        <div class="text-bold">{{ item.cor_postit }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Cor Letra</div>
                                                                        <div class="text-bold">{{ item.cor_letra }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Nome</div>
                                                                        <div class="text-bold">{{ item.nome }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Score</div>
                                                                        <div class="text-bold">{{ item.score }}</div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-12 col-md-4">
                                                            <q-card  class="q-pa-md nice-shadow-16">
                                                                <div class="row q-col-gutter-x-md items-center">
                                                                    <div class="col">
                                                                        <div class="text-grey text-weight-medium mb-1">Cargo Usuario</div>
                                                                        <div class="text-bold">
                                                                            <q-btn v-if="item.cargo_usuario" @click="app.openPageDialog({ page: 'cargos/view', url: `/cargos/view/${item.cargo_usuario}` , closeBtn: true })" padding="xs" flat color="primary" no-caps >
                                                                                <q-icon name="visibility" size="xs"  class="q-mr-xs"></q-icon>  Cargos Detail
                                                                            </q-btn>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </q-card>
                                                        </div>
                                                    </div>
                                                </q-tab-panel>
                                                <q-tab-panel name="accountedit">
                                                    <div class="reset-grid">
                                                        <account-edit-page is-sub-page></account-edit-page>
                                                        </div>
                                                    </q-tab-panel>
                                                    <q-tab-panel name="changepassword">
                                                        <change-password-page is-sub-page></change-password-page>
                                                    </q-tab-panel>
                                                </q-tab-panels>
                                                </dsiv>
                                            </div>
                                        </div>
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
	import  AccountEditPage  from "./accountedit.vue";
	import  ChangePasswordPage  from "./changepassword.vue";
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
			default: 'ACCOUNT',
		},
		pageName: {
			type: String,
			default: 'users',
		},
		routeName: {
			type: String,
			default: 'usersaccountview',
		},
		apiPath: {
			type: String,
			default: 'account',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
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
		showHeader: {
			type: Boolean,
			default: true,
		},
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp(props);
	const auth = useAuth();
	const page = useViewPage({ store, props });
	
	const { currentRecord } = toRefs(store.state);
	const { loading, pageReady } = toRefs(page.state);
	const item = currentRecord;
	const { load, deleteItem, } = page.methods;
	
	const tab = ref('accountview');
	
	
	useMeta(() => {
		return {
			//set browser title
			title: "Minha conta"
		}
	});
</script>
<style scoped>
</style>
