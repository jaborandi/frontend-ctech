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
                                    Editar Agenda Laboratorio
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
                                <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-16">
                                    <q-form ref="observer"  @submit.prevent="submitForm()">
                                    <!--[form-content-start]-->
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
                                                    Numero de Pessoas 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlnumero_pessoas" v-model.trim="formData.numero_pessoas"  label="Numero de Pessoas" type="number" placeholder="N°"   min="1" max="15" step="1"    
                                                    class="" :error="isFieldValid('numero_pessoas')" :error-message="getFieldError('numero_pessoas')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Confirmacao 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-field  borderless   :error="isFieldValid('confirmacao')" :error-message="getFieldError('confirmacao')">
                                                    <q-option-group  ref="ctrlconfirmacao" v-model="formData.confirmacao" :options="app.menus.confirmacao"  inline size="md" ></q-option-group>
                                                    </q-field>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Observações 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input  ref="ctrlobservacoes" rows="5"  v-model="formData.observacoes" placeholder="Observações e detalhes relevantes sobre esta agenda"    type="textarea" :error="isFieldValid('observacoes')" :error-message="getFieldError('observacoes')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Data Inicio 
                                                </div>
                                                <div class="col-sm-9 col-12">
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
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Hora Inicio 
                                                </div>
                                                <div class="col-sm-9 col-12">
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
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Data Termino 
                                                </div>
                                                <div class="col-sm-9 col-12">
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
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Hora Termino 
                                                </div>
                                                <div class="col-sm-9 col-12">
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
                                    </div>
                                    <!--[form-content-end]-->
                                    <div v-if="showSubmitButton" class="text-center q-my-md">
                                        <q-btn    :rounded="false"  color="primary"  no-caps  unelevated   type="submit" icon-right="send" :loading="saving">
                                            {{ submitButtonLabel }}
                                            <template v-slot:loading>
                                                <q-spinner-oval />
                                            </template>
                                        </q-btn>
                                    </div>
                                    </q-form>
                                    <slot :submit="submitForm" :saving="saving"></slot>
                                </q-card>
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
	import {  computed, ref, reactive, toRefs } from 'vue';
	import { required, minValue, maxValue, numeric, } from 'src/services/validators';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app';
	import { useEditPage } from 'src/composables/editpage';
	import { usePageStore } from 'src/stores/page';
	
	const props = defineProps({
		id: [String, Number],
		pageName: {
			type: String,
			default: 'agendalaboratorio',
		},
		pageStoreKey: {
			type: String,
			default: 'AGENDALABORATORIO',
		},
		routeName: {
			type: String,
			default: 'agendalaboratorioedit',
		},
		pagePath: {
			type : String,
			default : 'agendalaboratorio/edit',
		},
		apiPath: {
			type: String,
			default: 'agendalaboratorio/edit',
		},
		submitButtonLabel: {
			type: String,
			default: "Atualizar",
		},
		msgTitle: {
			type: String,
			default: "Atualizar registro",
		},
		msgBeforeSave: {
			type: String,
			default: "",
		},
		msgAfterSave: {
			type: String,
			default: "Registro atualizado com sucesso",
		},
		formValidationError: {
			type: String,
			default: "O formulário é inválido",
		},
		formValidationMsg: {
			type: String,
			default: "Por favor, preencha o formulário",
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
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	
	const formDefaultValues = Object.assign({
		titulo: "", 
		numero_pessoas: "", 
		confirmacao: "", 
		observacoes: "", 
		data_inicio: "", 
		hora_inicio: "", 
		data_termino: "", 
		hora_termino: "", 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	//event raised after form submit
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect){
			app.navigateTo(`/agendalaboratorio`);
		}
	}
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			numero_pessoas: { numeric, minValue: minValue(1), maxValue: maxValue(15) }
		}
	});
	
	const page = useEditPage({ store, props, formData, rules, afterSubmit });
	
	const {  saving, loading, pageReady,   } = toRefs(page.state);
	
	const {  currentRecord: editRecord } = toRefs(store.state);
	
	const { load, submitForm, isFieldValid, getFieldError,  } = page.methods;
	
	useMeta(() => {
		return {
			//set browser title
			title: "Editar Agenda Laboratorio"
		}
	});
</script>
<style scoped>
</style>
