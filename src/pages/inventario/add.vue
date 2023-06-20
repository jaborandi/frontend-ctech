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
                                    Adicionar novo
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="row q-col-gutter-x-md">
                        <div  class="col-md-9 col-12 comp-grid" >
                            <div >
                                <q-form ref="observer" @submit.prevent="submitForm()">
                                <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-16">
                                    <div class="row q-col-gutter-x-md">
                                        <div class="col-12">
                                            Status 
                                            <div id="ctrl-status-holder"> 
                                                <q-field  borderless   :error="isFieldValid('status')" :error-message="getFieldError('status')">
                                                <q-option-group  ref="ctrlstatus" v-model="formData.status" :options="app.menus.status2"  inline size="md" ></q-option-group>
                                                </q-field>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            Categoria 
                                            <div id="ctrl-categoria-holder"> 
                                                <api-data-source @loaded="response => mapOptionField(response, 'categoria')"  api-path="components_data/categoria_option_list"  v-slot="req">
                                                    <nice-select  @update:model-value="(val)=>categoriaAutofill(val)"   :loading="req.loading"   ref="ctrlcategoria" v-model="formData.categoria" :options="req.response" label="Categoria"  :error="isFieldValid('categoria')" :error-message="getFieldError('categoria')">
                                                    </nice-select>  
                                                </api-data-source>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            Nome 
                                            <div id="ctrl-nome-holder"> 
                                                <q-input   ref="ctrlnome" v-model.trim="formData.nome"  label="Nome" type="text" placeholder="Entrar Nome"   list="nome_list"    
                                                class="" :error="isFieldValid('nome')" :error-message="getFieldError('nome')">
                                                </q-input>
                                                <api-data-source   api-path="components_data/nome_option_list"  v-slot="req">
                                                    <datalist id="nome_list">
                                                    <option v-for="(menu, index) in req.response" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                    </datalist>
                                                </api-data-source>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            Descrição do item 
                                            <div id="ctrl-descricao-holder"> 
                                                <q-input  ref="ctrldescricao" rows="5"  v-model="formData.descricao" placeholder="Entrar Descrição do item"    type="textarea" :error="isFieldValid('descricao')" :error-message="getFieldError('descricao')">
                                                </q-input>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            Foto 
                                            <div id="ctrl-foto-holder"> 
                                                <div class="q-mb-sm">
                                                    <q-uploader-input :max-files="1" :max-file-size="3" accept=".docx,.doc,.xls,.xlsx,.xml,.csv,.pdf,.xps,.jpg,.png,.gif,.jpeg,.zip,.gzip,.rar,.7z,.mp3,.mp4,.webm,.wav,.avi,.mpg,.mpeg" :multiple="false" delete-icon="clear" style="width:100%" label="Escolha arquivos ou solte-os aqui" upload-path="fileuploader/upload/foto" v-model="formData.foto"></q-uploader-input>
                                                    <!-- <small class="q-pa-sm text-negative"></small> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="showSubmitButton" class="text-center q-my-md">
                                        <q-btn type="submit"    :rounded="false"  color="primary"  no-caps  unelevated    icon-right="send" :loading="saving">
                                            {{ submitButtonLabel }}
                                            <template v-slot:loading>
                                                <q-spinner-oval />
                                            </template>
                                        </q-btn>
                                    </div>
                                </q-card>
                                </q-form>
                                <slot :submit="submitForm" :saving="saving"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </main>
</template>
<script setup>
	import {  computed, ref, reactive, toRefs } from 'vue';
	import { required, } from 'src/services/validators';
	import { usePageStore } from 'src/stores/page';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app';
	import { ApiService } from 'src/services/api';
	import { useAddPage } from 'src/composables/addpage';
	
	const props = defineProps({
		pageName : {
			type : String,
			default : 'inventario',
		},
		pageStoreKey: {
			type: String,
			default: 'INVENTARIO',
		},
		routeName : {
			type : String,
			default : 'inventarioadd',
		},
		apiPath : {
			type : String,
			default : 'inventario/add',
		},
		submitButtonLabel: {
			type: String,
			default: "Enviar",
		},
		formValidationError: {
			type: String,
			default: "O formulário é inválido",
		},
		formValidationMsg: {
			type: String,
			default: "Por favor, preencha o formulário",
		},
		msgTitle: {
			type: String,
			default: "Criar registro",
		},
		msgAfterSave: {
			type: String,
			default: "Registro adicionado com sucesso",
		},
		msgBeforeSave: {
			type: String,
			default: "",
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
		pageData: { // use to set formData default values from another page
			type: Object,
			default: () => ({
		status: "DISPONIVEL", 
		categoria: "", 
		nome: "", 
		descricao: "", 
		foto: "", 
			})
		},
	});
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();// application state and methods
	
	const formData = reactive({ ...props.pageData });
	
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
		}
	});
	
	const page = useAddPage({ store, props, formData, rules, beforeSubmit, afterSubmit });// page form hook
	
	//event raised before form submit
	function beforeSubmit(){
		return true;
	}
	//event raised after form submit
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		page.setFormDefaultValues(); // reset form data
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect){
			app.navigateTo(`/inventario`);
		}
	}
	
	const {  saving, pageReady,   } = toRefs(page.state);
	
	const { submitForm, isFieldValid, getFieldError, mapOptionField } = page.methods;
	
	useMeta(() => {
		return {
			//set browser title
			title: "Adicionar novo"
		}
	});
	
	//auto fill other inputs on categoria change
	async function categoriaAutofill(val){
		const resp = await ApiService.get(`components_data/inventario_categoria_autofill?value=${val}`);
		const data = resp.data[0];
		if(data){
formData.descricao = data.detalhes;
		}
	}
	
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
