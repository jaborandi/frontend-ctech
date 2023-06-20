<template>
    <div id="master-detailpage">
        <q-tabs  inline-label v-model="selectedTab" active-color="primary" indicator-color="primary" align="left">
            <template v-if="auth.canView('permissoes/list')">
                <q-tab no-caps name="permissoes" icon="extension" label="Cargo Permissoes" />
            </template>
            <template v-if="auth.canView('users/list')">
                <q-tab no-caps name="users" icon="extension" label="Cargo Users" />
            </template>
        </q-tabs>
        <q-separator></q-separator>
        <q-tab-panels keep-alive v-model="selectedTab" animated>
            <template v-if="auth.canView('permissoes/list')">
                <q-tab-panel class="q-pa-none" name="permissoes">
                    <div class="reset-grid">
                        <list-permissoes-page ref="permissoesListPage"  field-name="permissoes.cargo_id" :field-value="masterRecord.cargo_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                            </list-permissoes-page>
                        </div>
                    </q-tab-panel>
                </template>
                <template v-if="auth.canView('users/list')">
                    <q-tab-panel class="q-pa-none" name="users">
                        <div class="reset-grid">
                            <list-users-page ref="usersListPage"  field-name="users.cargo_usuario" :field-value="masterRecord.cargo_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                                </list-users-page>
                            </div>
                        </q-tab-panel>
                    </template>
                </q-tab-panels>
            </div>
</template>
<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { usePageStore } from 'src/stores/page';
import { useApp } from 'src/composables/app.js';
import { useAuth } from 'src/composables/auth';
import listPermissoesPage from "../permissoes/list.vue";
import listUsersPage from "../users/list.vue";
const props = defineProps({
	isSubPage: {
		type : Boolean,
		default : true,
	},
	scrollIntoView: {
		type : Boolean,
		default : false,
	},
});
const app = useApp();
const auth = useAuth();
const store = usePageStore('CARGOS');
const masterRecord = computed(() => store.state.currentRecord);
const pageReady = computed(() => masterRecord.value != null);
const selectedTab = ref("permissoes");
function scrollToDetailPage() {
	if (props.scrollIntoView) {
		const pageElement = document.getElementById('master-detailpage');
		if(pageElement){
			pageElement.scrollIntoView({behavior:'smooth', block:'start'});
		}
	}
}
// pass form data from master to detail
function setDetailPageFormData(){
	const record = masterRecord.value;
	 
	// set permissoes form data
	const permissoesStore = usePageStore('permissoes');
	permissoesStore.setFormData({ cargo_id:record?.cargo_id });
	 
	// set users form data
	const usersStore = usePageStore('users');
	usersStore.setFormData({ cargo_usuario:record?.cargo_id });
}
watch(() => masterRecord, (current) => {
		setDetailPageFormData();
		scrollToDetailPage();
	},
	{ deep: true, immediate: true }
);
onMounted(()=>{
    scrollToDetailPage();
});
</script>
