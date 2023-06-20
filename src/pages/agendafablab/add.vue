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
                                    Adicionar agenda
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
                                            Titulo 
                                            <div id="ctrl-titulo-holder"> 
                                                <q-input   ref="ctrltitulo" v-model.trim="formData.titulo"  label="Titulo" type="text" placeholder="Entrar Titulo"      
                                                class="" :error="isFieldValid('titulo')" :error-message="getFieldError('titulo')">
                                                </q-input>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            Observações 
                                            <div id="ctrl-observacoes-holder"> 
                                                <q-input  ref="ctrlobservacoes" rows="5"  v-model="formData.observacoes" placeholder="Observações e detalhes desta agenda"    type="textarea" :error="isFieldValid('observacoes')" :error-message="getFieldError('observacoes')">
                                                </q-input>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            Data Inicio *
                                            <div id="ctrl-data_inicio-holder"> 
                                                <q-input  ref="ctrldata_inicio" v-model="formData.data_inicio" label="Data Inicio"   hint="Clique no ícone para selecionar" :error="isFieldValid('data_inicio')" :error-message="getFieldError('data_inicio')">
                                                <template v-slot:append>
                                                    <q-icon name="date_range" class="cursor-pointer">
                                                    <q-popup-proxy ref="ctrldata_inicio" transition-show="scale" transition-hide="scale">
                                                    <q-date    mask="YYYY-MM-DD" v-model="formData.data_inicio" @input="$refs.ctrldata_inicio.hide()" />
                                                    </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                                </q-input>      
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            Hora Inicio *
                                            <div id="ctrl-hora_inicio-holder"> 
                                                <q-input  ref="ctrlhora_inicio" v-model="formData.hora_inicio"   hint="Clique no ícone para selecionar" :error="isFieldValid('hora_inicio')" :error-message="getFieldError('hora_inicio')">
                                                <template v-slot:append>
                                                    <q-icon name="access_time" class="cursor-pointer">
                                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                    <q-time   mask="HH:mm" v-model="formData.hora_inicio" />
                                                    </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                                </q-input>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            Data Termino *
                                            <div id="ctrl-data_termino-holder"> 
                                                <q-input  ref="ctrldata_termino" v-model="formData.data_termino" label="Data Termino"   hint="Clique no ícone para selecionar" :error="isFieldValid('data_termino')" :error-message="getFieldError('data_termino')">
                                                <template v-slot:append>
                                                    <q-icon name="date_range" class="cursor-pointer">
                                                    <q-popup-proxy ref="ctrldata_termino" transition-show="scale" transition-hide="scale">
                                                    <q-date    mask="YYYY-MM-DD" v-model="formData.data_termino" @input="$refs.ctrldata_termino.hide()" />
                                                    </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                                </q-input>      
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            Hora Termino *
                                            <div id="ctrl-hora_termino-holder"> 
                                                <q-input  ref="ctrlhora_termino" v-model="formData.hora_termino"   hint="Clique no ícone para selecionar" :error="isFieldValid('hora_termino')" :error-message="getFieldError('hora_termino')">
                                                <template v-slot:append>
                                                    <q-icon name="access_time" class="cursor-pointer">
                                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                    <q-time   mask="HH:mm" v-model="formData.hora_termino" />
                                                    </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                                </q-input>
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
			default : 'agendafablab',
		},
		pageStoreKey: {
			type: String,
			default: 'AGENDAFABLAB',
		},
		routeName : {
			type : String,
			default : 'agendafablabadd',
		},
		apiPath : {
			type : String,
			default : 'agendafablab/add',
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
		observacoes: "", 
		data_inicio: "", 
		hora_inicio: "", 
		data_termino: "", 
		hora_termino: "", 
			})
		},
	});
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();// application state and methods
	
	const formData = reactive({ ...props.pageData });
	
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			data_inicio: { required },
		hora_inicio: { required },
		data_termino: { required },
		hora_termino: { required }
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
			app.navigateTo(`/agendafablab`);
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
