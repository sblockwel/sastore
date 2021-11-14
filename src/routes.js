import DashboardLayout from './layout/dashboard_layout.vue'
import HomeVue from './components/Home.vue'
import ProdutoList from './components/ProdutoList.vue'
import ProdutoEdit from './components/ProdutoEdit.vue'
import ClientList from './components/ClientList.vue'
import ClientEdit from './components/ClientEdit.vue'
import PedidoEdit from './components/PedidoEdit.vue'
import PedidoList from './components/PedidoList.vue'
import ItemPedido from './components/ItemPedido.vue'
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
                name: 'listar_produtos',
                component: ProdutoList
            },
            {
                path: 'produto_edit',
                name: 'editar_produto',
                component: ProdutoEdit
            },
            {
                path: 'clientes',
                name: 'listar_clientes',
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
            },
            {
                path: 'pedidos',
                name: 'listar_pedidos',
                component: PedidoList
            },
            {
                path: 'pedido',
                name: 'cadastrar_pedido',
                component: PedidoEdit
            },
            {
                path: 'pedido/:id',
                name: 'editar_pedido',
                component: PedidoEdit
            },
            {
                path: 'item/:id',
                name: 'editar_item',
                component: ItemPedido
            },
            {
                path: 'item/:numero',
                name: 'adicionar_item',
                component: ItemPedido
            }
        ]
    }
]

export default routes