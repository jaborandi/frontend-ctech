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
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Titulo 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrltitulo" v-model.trim="formData.titulo"  label="Titulo" type="text" placeholder="Entrar Titulo"      
                                                    class="" :error="isFieldValid('titulo')" :error-message="getFieldError('titulo')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Descricao 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input  ref="ctrldescricao" rows="5"  v-model="formData.descricao" placeholder="Entrar Descricao"    type="textarea" :error="isFieldValid('descricao')" :error-message="getFieldError('descricao')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Imagem 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <div class="q-mb-sm">
                                                        <q-uploader-input :max-files="1" :max-file-size="3" accept=".jpg,.png,.gif,.jpeg" :multiple="false" delete-icon="clear" style="width:100%" label="Escolha arquivos ou solte-os aqui" upload-path="fileuploader/upload/imagem" v-model="formData.imagem"></q-uploader-input>
                                                        <!-- <small class="q-pa-sm text-negative"></small> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Arquivos 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlarquivos" v-model.trim="formData.arquivos"  label="Arquivos" type="text" placeholder="Entrar Arquivos"      
                                                    class="" :error="isFieldValid('arquivos')" :error-message="getFieldError('arquivos')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Inserido Por 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlinserido_por" v-model.trim="formData.inserido_por"  label="Inserido Por" type="text" placeholder="Entrar Inserido Por"      
                                                    class="" :error="isFieldValid('inserido_por')" :error-message="getFieldError('inserido_por')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Inserido Em 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input  ref="ctrlinserido_em" v-model="formData.inserido_em"    :error="isFieldValid('inserido_em')" :error-message="getFieldError('inserido_em')">
                                                    <template v-slot:prepend>
                                                        <q-icon name="date_range" class="cursor-pointer">
                                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                        <q-date      mask="YYYY-MM-DD HH:mm" v-model="formData.inserido_em" />
                                                        </q-popup-proxy>
                                                        </q-icon>
                                                    </template>
                                                    <template v-slot:append>
                                                        <q-icon name="access_time" class="cursor-pointer">
                                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                        <q-time v-model="formData.inserido_em" mask="YYYY-MM-DD HH:mm" />
                                                        </q-popup-proxy>
                                                        </q-icon>
                                                    </template>
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Atualizado Por 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlatualizado_por" v-model.trim="formData.atualizado_por"  label="Atualizado Por" type="text" placeholder="Entrar Atualizado Por"      
                                                    class="" :error="isFieldValid('atualizado_por')" :error-message="getFieldError('atualizado_por')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Atualizado Em 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input  ref="ctrlatualizado_em" v-model="formData.atualizado_em"    :error="isFieldValid('atualizado_em')" :error-message="getFieldError('atualizado_em')">
                                                    <template v-slot:prepend>
                                                        <q-icon name="date_range" class="cursor-pointer">
                                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                        <q-date      mask="YYYY-MM-DD HH:mm" v-model="formData.atualizado_em" />
                                                        </q-popup-proxy>
                                                        </q-icon>
                                                    </template>
                                                    <template v-slot:append>
                                                        <q-icon name="access_time" class="cursor-pointer">
                                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                        <q-time v-model="formData.atualizado_em" mask="YYYY-MM-DD HH:mm" />
                                                        </q-popup-proxy>
                                                        </q-icon>
                                                    </template>
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Categoria 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlcategoria" v-model.trim="formData.categoria"  label="Categoria" type="text" placeholder="Entrar Categoria"      
                                                    class="" :error="isFieldValid('categoria')" :error-message="getFieldError('categoria')">
                                                    </q-input>
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
	import { useAddPage } from 'src/composables/addpage';
	
	const props = defineProps({
		pageName : {
			type : String,
			default : 'projetos',
		},
		pageStoreKey: {
			type: String,
			default: 'PROJETOS',
		},
		routeName : {
			type : String,
			default : 'projetosadd',
		},
		apiPath : {
			type : String,
			default : 'projetos/add',
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
		titulo: "", 
		descricao: "", 
		imagem: "", 
		arquivos: "", 
		inserido_por: "", 
		inserido_em: new Date(), 
		atualizado_por: "", 
		atualizado_em: new Date(), 
		categoria: "", 
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
			app.navigateTo(`/projetos`);
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
	
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
