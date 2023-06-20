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
                                    Editar Compra
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
                                                    Objeto 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlobjeto" v-model.trim="formData.objeto"  label="Objeto" type="text" placeholder="Entrar Objeto"      
                                                    class="" :error="isFieldValid('objeto')" :error-message="getFieldError('objeto')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Valor 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlvalor" v-model.trim="formData.valor"  label="Valor" type="text" placeholder="Entrar Valor"      
                                                    class="" :error="isFieldValid('valor')" :error-message="getFieldError('valor')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Data 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input  ref="ctrldata" v-model="formData.data" label="Data"    :error="isFieldValid('data')" :error-message="getFieldError('data')">
                                                    <template v-slot:append>
                                                        <q-icon name="date_range" class="cursor-pointer">
                                                        <q-popup-proxy ref="ctrldata" transition-show="scale" transition-hide="scale">
                                                        <q-date    mask="YYYY-MM-DD" v-model="formData.data" @input="$refs.ctrldata.hide()" />
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
                                                    Urgencia 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlurgencia" v-model.trim="formData.urgencia"  label="Urgencia" type="text" placeholder="Entrar Urgencia"      
                                                    class="" :error="isFieldValid('urgencia')" :error-message="getFieldError('urgencia')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Observacoes 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input  ref="ctrlobservacoes" rows="5"  v-model="formData.observacoes" placeholder="Entrar Observacoes"    type="textarea" :error="isFieldValid('observacoes')" :error-message="getFieldError('observacoes')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Justificativa 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input  ref="ctrljustificativa" rows="5"  v-model="formData.justificativa" placeholder="Entrar Justificativa"    type="textarea" :error="isFieldValid('justificativa')" :error-message="getFieldError('justificativa')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Status 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrlstatus" v-model.trim="formData.status"  label="Status" type="text" placeholder="Entrar Status"      
                                                    class="" :error="isFieldValid('status')" :error-message="getFieldError('status')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Adicionado Por 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrladicionado_por" v-model.trim="formData.adicionado_por"  label="Adicionado Por" type="text" placeholder="Entrar Adicionado Por"      
                                                    class="" :error="isFieldValid('adicionado_por')" :error-message="getFieldError('adicionado_por')">
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    Link Referencia 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <q-input   ref="ctrllink_referencia" v-model.trim="formData.link_referencia"  label="Link Referencia" type="text" placeholder="Entrar Link Referencia"      
                                                    class="" :error="isFieldValid('link_referencia')" :error-message="getFieldError('link_referencia')">
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
	import { required, } from 'src/services/validators';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app';
	import { useEditPage } from 'src/composables/editpage';
	import { usePageStore } from 'src/stores/page';
	
	const props = defineProps({
		id: [String, Number],
		pageName: {
			type: String,
			default: 'compras',
		},
		pageStoreKey: {
			type: String,
			default: 'COMPRAS',
		},
		routeName: {
			type: String,
			default: 'comprasedit',
		},
		pagePath: {
			type : String,
			default : 'compras/edit',
		},
		apiPath: {
			type: String,
			default: 'compras/edit',
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
		objeto: "", 
		valor: "", 
		data: new Date(), 
		urgencia: "", 
		observacoes: "", 
		justificativa: "", 
		status: "", 
		adicionado_por: "", 
		link_referencia: "", 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	//event raised after form submit
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect){
			app.navigateTo(`/compras`);
		}
	}
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
		}
	});
	
	const page = useEditPage({ store, props, formData, rules, afterSubmit });
	
	const {  saving, loading, pageReady,   } = toRefs(page.state);
	
	const {  currentRecord: editRecord } = toRefs(store.state);
	
	const { load, submitForm, isFieldValid, getFieldError,  } = page.methods;
	
	useMeta(() => {
		return {
			//set browser title
			title: "Editar Compra"
		}
	});
</script>
<style scoped>
</style>
