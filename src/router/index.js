
import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

import { useAuth } from 'src/composables/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */


function passRouteToProps(route){
	return {
		queryParams: route.query,
		fieldName: route.params.fieldName, 
		fieldValue: route.params.fieldValue
	}
}


let routes = [{
	name: 'main',
	path: '/',
	component: () => import('layouts/MainLayout.vue'),
	children: [
		//Dashboard routes


//agendacinema routes
		{
			path: '/agendacinema/:fieldName?/:fieldValue?',
			name: 'agendacinemalist',
			component: () => import('pages/agendacinema/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/agendacinema/view/:id', 
			name: 'agendacinemaview', 
			component: () => import('pages/agendacinema/view.vue'), 
			props: true 
		},
		{ 
			path: '/agendacinema/add', 
			name: 'agendacinemaadd', 
			component: () => import('pages/agendacinema/add.vue'), 
			props: true 
		},
		{ 
			path: '/agendacinema/edit/:id', 
			name: 'agendacinemaedit', 
			component: () => import('pages/agendacinema/edit.vue'), 
			props: true 
		},

//agendafablab routes
		{
			path: '/agendafablab/:fieldName?/:fieldValue?',
			name: 'agendafablablist',
			component: () => import('pages/agendafablab/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/agendafablab/view/:id', 
			name: 'agendafablabview', 
			component: () => import('pages/agendafablab/view.vue'), 
			props: true 
		},
		{ 
			path: '/agendafablab/add', 
			name: 'agendafablabadd', 
			component: () => import('pages/agendafablab/add.vue'), 
			props: true 
		},
		{ 
			path: '/agendafablab/edit/:id', 
			name: 'agendafablabedit', 
			component: () => import('pages/agendafablab/edit.vue'), 
			props: true 
		},

//agendalaboratorio routes
		{
			path: '/agendalaboratorio/:fieldName?/:fieldValue?',
			name: 'agendalaboratoriolist',
			component: () => import('pages/agendalaboratorio/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/agendalaboratorio/view/:id', 
			name: 'agendalaboratorioview', 
			component: () => import('pages/agendalaboratorio/view.vue'), 
			props: true 
		},
		{ 
			path: '/agendalaboratorio/add', 
			name: 'agendalaboratorioadd', 
			component: () => import('pages/agendalaboratorio/add.vue'), 
			props: true 
		},
		{ 
			path: '/agendalaboratorio/edit/:id', 
			name: 'agendalaboratorioedit', 
			component: () => import('pages/agendalaboratorio/edit.vue'), 
			props: true 
		},

//cargos routes
		{
			path: '/cargos/:fieldName?/:fieldValue?',
			name: 'cargoslist',
			component: () => import('pages/cargos/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/cargos/view/:id', 
			name: 'cargosview', 
			component: () => import('pages/cargos/view.vue'), 
			props: true 
		},
		{ 
			path: '/cargos/add', 
			name: 'cargosadd', 
			component: () => import('pages/cargos/add.vue'), 
			props: true 
		},
		{ 
			path: '/cargos/edit/:id', 
			name: 'cargosedit', 
			component: () => import('pages/cargos/edit.vue'), 
			props: true 
		},

//catinvent routes
		{
			path: '/catinvent/:fieldName?/:fieldValue?',
			name: 'catinventlist',
			component: () => import('pages/catinvent/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/catinvent/view/:id', 
			name: 'catinventview', 
			component: () => import('pages/catinvent/view.vue'), 
			props: true 
		},
		{ 
			path: '/catinvent/add', 
			name: 'catinventadd', 
			component: () => import('pages/catinvent/add.vue'), 
			props: true 
		},
		{ 
			path: '/catinvent/edit/:id', 
			name: 'catinventedit', 
			component: () => import('pages/catinvent/edit.vue'), 
			props: true 
		},

//emprestimos routes
		{
			path: '/emprestimos/:fieldName?/:fieldValue?',
			name: 'emprestimoslist',
			component: () => import('pages/emprestimos/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/emprestimos/view/:id', 
			name: 'emprestimosview', 
			component: () => import('pages/emprestimos/view.vue'), 
			props: true 
		},
		{ 
			path: '/emprestimos/add', 
			name: 'emprestimosadd', 
			component: () => import('pages/emprestimos/add.vue'), 
			props: true 
		},
		{ 
			path: '/emprestimos/edit/:id', 
			name: 'emprestimosedit', 
			component: () => import('pages/emprestimos/edit.vue'), 
			props: true 
		},
		{ 
			path: '/emprestimos/add_membro', 
			name: 'emprestimosadd_membro', 
			component: () => import('pages/emprestimos/add_membro.vue'), 
			props: true 
		},
		{
			path: '/emprestimos/minhas_solicitacoes/:fieldName?/:fieldValue?',
			name: 'emprestimosminhas_solicitacoes',
			component: () => import('pages/emprestimos/minhas_solicitacoes.vue'),
			props: route => passRouteToProps(route)
		},

//eventos routes
		{
			path: '/eventos/:fieldName?/:fieldValue?',
			name: 'eventoslist',
			component: () => import('pages/eventos/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/eventos/view/:id', 
			name: 'eventosview', 
			component: () => import('pages/eventos/view.vue'), 
			props: true 
		},
		{ 
			path: '/eventos/add', 
			name: 'eventosadd', 
			component: () => import('pages/eventos/add.vue'), 
			props: true 
		},
		{ 
			path: '/eventos/edit/:id', 
			name: 'eventosedit', 
			component: () => import('pages/eventos/edit.vue'), 
			props: true 
		},

//inventario routes
		{
			path: '/inventario/:fieldName?/:fieldValue?',
			name: 'inventariolist',
			component: () => import('pages/inventario/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/inventario/view/:id', 
			name: 'inventarioview', 
			component: () => import('pages/inventario/view.vue'), 
			props: true 
		},
		{ 
			path: '/inventario/add', 
			name: 'inventarioadd', 
			component: () => import('pages/inventario/add.vue'), 
			props: true 
		},
		{ 
			path: '/inventario/edit/:id', 
			name: 'inventarioedit', 
			component: () => import('pages/inventario/edit.vue'), 
			props: true 
		},

//modelhaspermissions routes
		{
			path: '/modelhaspermissions/:fieldName?/:fieldValue?',
			name: 'modelhaspermissionslist',
			component: () => import('pages/modelhaspermissions/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/modelhaspermissions/view/:id', 
			name: 'modelhaspermissionsview', 
			component: () => import('pages/modelhaspermissions/view.vue'), 
			props: true 
		},
		{ 
			path: '/modelhaspermissions/add', 
			name: 'modelhaspermissionsadd', 
			component: () => import('pages/modelhaspermissions/add.vue'), 
			props: true 
		},
		{ 
			path: '/modelhaspermissions/edit/:id', 
			name: 'modelhaspermissionsedit', 
			component: () => import('pages/modelhaspermissions/edit.vue'), 
			props: true 
		},

//modelhasroles routes
		{
			path: '/modelhasroles/:fieldName?/:fieldValue?',
			name: 'modelhasroleslist',
			component: () => import('pages/modelhasroles/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/modelhasroles/view/:id', 
			name: 'modelhasrolesview', 
			component: () => import('pages/modelhasroles/view.vue'), 
			props: true 
		},
		{ 
			path: '/modelhasroles/add', 
			name: 'modelhasrolesadd', 
			component: () => import('pages/modelhasroles/add.vue'), 
			props: true 
		},
		{ 
			path: '/modelhasroles/edit/:id', 
			name: 'modelhasrolesedit', 
			component: () => import('pages/modelhasroles/edit.vue'), 
			props: true 
		},

//permissions routes
		{
			path: '/permissions/:fieldName?/:fieldValue?',
			name: 'permissionslist',
			component: () => import('pages/permissions/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/permissions/view/:id', 
			name: 'permissionsview', 
			component: () => import('pages/permissions/view.vue'), 
			props: true 
		},
		{ 
			path: '/permissions/add', 
			name: 'permissionsadd', 
			component: () => import('pages/permissions/add.vue'), 
			props: true 
		},
		{ 
			path: '/permissions/edit/:id', 
			name: 'permissionsedit', 
			component: () => import('pages/permissions/edit.vue'), 
			props: true 
		},

//permissoes routes
		{
			path: '/permissoes/:fieldName?/:fieldValue?',
			name: 'permissoeslist',
			component: () => import('pages/permissoes/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/permissoes/view/:id', 
			name: 'permissoesview', 
			component: () => import('pages/permissoes/view.vue'), 
			props: true 
		},
		{ 
			path: '/permissoes/add', 
			name: 'permissoesadd', 
			component: () => import('pages/permissoes/add.vue'), 
			props: true 
		},
		{ 
			path: '/permissoes/edit/:id', 
			name: 'permissoesedit', 
			component: () => import('pages/permissoes/edit.vue'), 
			props: true 
		},

//rolehaspermissions routes
		{
			path: '/rolehaspermissions/:fieldName?/:fieldValue?',
			name: 'rolehaspermissionslist',
			component: () => import('pages/rolehaspermissions/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/rolehaspermissions/view/:id', 
			name: 'rolehaspermissionsview', 
			component: () => import('pages/rolehaspermissions/view.vue'), 
			props: true 
		},
		{ 
			path: '/rolehaspermissions/add', 
			name: 'rolehaspermissionsadd', 
			component: () => import('pages/rolehaspermissions/add.vue'), 
			props: true 
		},
		{ 
			path: '/rolehaspermissions/edit/:id', 
			name: 'rolehaspermissionsedit', 
			component: () => import('pages/rolehaspermissions/edit.vue'), 
			props: true 
		},

//roles routes
		{
			path: '/roles/:fieldName?/:fieldValue?',
			name: 'roleslist',
			component: () => import('pages/roles/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/roles/view/:id', 
			name: 'rolesview', 
			component: () => import('pages/roles/view.vue'), 
			props: true 
		},
		{ 
			path: '/roles/add', 
			name: 'rolesadd', 
			component: () => import('pages/roles/add.vue'), 
			props: true 
		},
		{ 
			path: '/roles/edit/:id', 
			name: 'rolesedit', 
			component: () => import('pages/roles/edit.vue'), 
			props: true 
		},

//users routes
		{
			path: '/users/:fieldName?/:fieldValue?',
			name: 'userslist',
			component: () => import('pages/users/list.vue'),
			props: route => passRouteToProps(route)
		},
		{ 
			path: '/users/view/:id', 
			name: 'usersview', 
			component: () => import('pages/users/view.vue'), 
			props: true 
		},
		{ 
			path: '/index/register', 
			name: 'usersuserregister', 
			component: () => import('pages/index/userregister.vue'), 
			props: true 
		},
		{ 
			path: '/account/edit', 
			name: 'usersaccountedit', 
			component: () => import('pages/account/accountedit.vue'), 
			props: true 
		},
		{ 
			path: '/account', 
			name: 'usersaccountview', 
			component: () => import('pages/account/accountview.vue'), 
			props: true 
		},
		{ 
			path: '/users/add', 
			name: 'usersadd', 
			component: () => import('pages/users/add.vue'), 
			props: true 
		},
		{ 
			path: '/users/edit/:id', 
			name: 'usersedit', 
			component: () => import('pages/users/edit.vue'), 
			props: true 
		},

		
		
//Password reset routes
		{ 
			path: '/index/forgotpassword', 
			name: 'forgotpassword', 
			component: () => import('pages/index/forgotpassword.vue') 
		},
		{ 
			path: '/index/resetpassword', 
			name: 'resetpassword', 
			component: () => import('pages/index/resetpassword.vue') 
		},
		{ 
			path: '/index/resetpassword_completed', 
			name: 'resetpassword_completed', 
			component: () => import('pages/index/resetpassword_completed.vue') 
		},
		
		

		//Error pages
		{ path:  '/error/forbidden', name: 'forbidden',  component: () => import('pages/errors/forbidden.vue') },
		{ path: '/error/notfound',  name: 'notfound', component: () => import('pages/errors/pagenotfound.vue') }
	],
	
	},
	{ path: '/:catchAll(.*)*', component: () => import('pages/errors/pagenotfound.vue') }
];

export default route(async function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE == 'history' ? createWebHistory : createWebHashHistory)
	
	const mainRoute = routes.find(x => x.name = "main");
	
	const auth = useAuth();

	
	//get current user data from api on first load
	const { user } = await auth.getUserData();
	if(user){
		const homeRoute = {
			path: '/', 
			alias: '/home', 
			name: 'home', 
			component: () => import('pages/home/home.vue') 
		}
		mainRoute.children.push(homeRoute);
	}
	else{
		const indexRoute = { 
			path: '/',  
			alias: '/home', 
			name: 'index', 
			component: () => import('pages/index/index.vue') 
		}
		mainRoute.children.push(indexRoute);
	}

	const Router = createRouter({
	scrollBehavior(to, from, savedPostion){
		if(savedPostion) return savedPostion;
		return { top:0 }
	},
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  return Router
})

