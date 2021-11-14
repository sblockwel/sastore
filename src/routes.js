import DashboardLayout from './layout/dashboard_layout.vue'
import HomeVue from './components/Home.vue'
import ProdutoList from './components/ProdutoList.vue'
import ProdutoEdit from './components/ProdutoEdit.vue'
import ClientList from './components/ClientList.vue'
import ClientEdit from './components/ClientEdit.vue'
const routes = [
    {
        path: '/',
        component: DashboardLayout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: HomeVue
            },
            {
                path: 'produtos',
                name: 'Lista de produtos',
                component: ProdutoList
            },
            {
                path: 'produto_edit',
                name: 'Cadastro de produto',
                component: ProdutoEdit
            },
            {
                path: 'clientes',
                name: 'listar_cliente',
                component: ClientList
            },
            {
                path: 'cliente/:id',
                name: 'editar_cliente',
                component: ClientEdit
            },
            {
                path: 'cliente',
                name: 'cadastro_cliente',
                component: ClientEdit
            }
        ]
    }
]

export default routes