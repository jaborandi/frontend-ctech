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
                                    Editar Emprestimo
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
                                            Status 
                                            <div id="ctrl-status-holder"> 
                                                <q-field  borderless   :error="isFieldValid('status')" :error-message="getFieldError('status')">
                                                <q-option-group  ref="ctrlstatus" v-model="formData.status" :options="app.menus.status"  inline size="md" ></q-option-group>
                                                </q-field>
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
			default: 'emprestimos',
		},
		pageStoreKey: {
			type: String,
			default: 'EMPRESTIMOS',
		},
		routeName: {
			type: String,
			default: 'emprestimosedit',
		},
		pagePath: {
			type : String,
			default : 'emprestimos/edit',
		},
		apiPath: {
			type: String,
			default: 'emprestimos/edit',
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
		status: "AGUARDANDO", 
		emprestado_em: new Date(), 
		devolver_em: new Date(), 
		feedback: "", 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	//event raised after form submit
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect){
			app.navigateTo(`/emprestimos`);
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
			title: "Editar Emprestimo"
		}
	});
</script>
<style scoped>
</style>
