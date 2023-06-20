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
                                                <q-option-group  ref="ctrlstatus" v-model="formData.status" :options="app.menus.status"  inline size="md" ></q-option-group>
                                                </q-field>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            Quem está pegando? 
                                            <div id="ctrl-id_usuario-holder"> 
                                                <nice-select use-input  api-path="components_data/id_usuario_option_list"  ref="ctrlid_usuario"  v-model="formData.id_usuario" label="Quem está pegando?"  :error="isFieldValid('id_usuario')" :error-message="getFieldError('id_usuario')">
                                                </nice-select>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            O que está pegando? 
                                            <div id="ctrl-id_inventario-holder"> 
                                                <api-data-source @loaded="response => mapOptionField(response, 'id_inventario')"  api-path="components_data/id_inventario_option_list"  v-slot="req">
                                                    <nice-select     :loading="req.loading"   ref="ctrlid_inventario" v-model="formData.id_inventario" :options="req.response" label="O que está pegando?"  :error="isFieldValid('id_inventario')" :error-message="getFieldError('id_inventario')">
                                                    <template v-slot:option="scope">
                                                        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                                                            <q-item-section v-if="scope.opt.image" avatar>
                                                                <image-viewer :src="scope.opt.image" image-size="small"></image-viewer>
                                                            </q-item-section>
                                                            <q-item-section>
                                                                <q-item-label>{{ scope.opt.label }}</q-item-label>
                                                                <q-item-label v-if="scope.opt.caption" caption>{{ scope.opt.caption }}</q-item-label>
                                                            </q-item-section>
                                                        </q-item>
                                                    </template>
                                                    <template v-slot:selected-item="scope">
                                                        <q-item  v-if="scope.opt">
                                                            <q-item-section v-if="scope.opt.image" avatar>
                                                                <image-viewer :src="scope.opt.image" image-size="small"></image-viewer>
                                                            </q-item-section>
                                                            <q-item-section>
                                                                <q-item-label>{{ scope.opt.label }}</q-item-label>
                                                                <q-item-label v-if="scope.opt.caption" caption>{{ scope.opt.caption }}</q-item-label>
                                                            </q-item-section>
                                                        </q-item>
                                                    </template>
                                                    </nice-select>  
                                                </api-data-source>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            Emprestado Em 
                                            <div id="ctrl-emprestado_em-holder"> 
                                                <q-input  ref="ctrlemprestado_em" v-model="formData.emprestado_em" label="Emprestado Em"    :error="isFieldValid('emprestado_em')" :error-message="getFieldError('emprestado_em')">
                                                <template v-slot:append>
                                                    <q-icon name="date_range" class="cursor-pointer">
                                                    <q-popup-proxy ref="ctrlemprestado_em" transition-show="scale" transition-hide="scale">
                                                    <q-date    mask="YYYY-MM-DD" v-model="formData.emprestado_em" @input="$refs.ctrlemprestado_em.hide()" />
                                                    </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                                </q-input>      
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            Devolver Em 
                                            <div id="ctrl-devolver_em-holder"> 
                                                <q-input  ref="ctrldevolver_em" v-model="formData.devolver_em" label="Devolver Em"    :error="isFieldValid('devolver_em')" :error-message="getFieldError('devolver_em')">
                                                <template v-slot:append>
                                                    <q-icon name="date_range" class="cursor-pointer">
                                                    <q-popup-proxy ref="ctrldevolver_em" transition-show="scale" transition-hide="scale">
                                                    <q-date    mask="YYYY-MM-DD" v-model="formData.devolver_em" @input="$refs.ctrldevolver_em.hide()" />
                                                    </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                                </q-input>      
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            Feedback 
                                            <div id="ctrl-feedback-holder"> 
                                                <q-input  ref="ctrlfeedback" rows="5"  v-model="formData.feedback" placeholder="Feedback ou informações adicionais"    type="textarea" :error="isFieldValid('feedback')" :error-message="getFieldError('feedback')">
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
	import { required, numeric, } from 'src/services/validators';
	import { usePageStore } from 'src/stores/page';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app';
	import { useAddPage } from 'src/composables/addpage';
	
	const props = defineProps({
		pageName : {
			type : String,
			default : 'emprestimos',
		},
		pageStoreKey: {
			type: String,
			default: 'EMPRESTIMOS',
		},
		routeName : {
			type : String,
			default : 'emprestimosadd',
		},
		apiPath : {
			type : String,
			default : 'emprestimos/add',
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
		status: "AGUARDANDO", 
		id_usuario: "", 
		id_inventario: "", 
		emprestado_em: new Date(), 
		devolver_em: new Date(), 
		feedback: "", 
			})
		},
	});
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();// application state and methods
	
	const formData = reactive({ ...props.pageData });
	
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			id_usuario: { numeric }
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
			app.navigateTo(`/emprestimos`);
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
