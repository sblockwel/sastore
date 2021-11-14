<template>
    <div class="container">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Valor total</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pedido in pedido_list" :key="pedido.numero">
                    <th scope="row">{{ pedido.numero }}</th>
                    <th scope="row">{{ pedido.cliente.nome }}</th>
                    <td scope="row">{{ pedido.valor_total }}</td>
                    <td>
                        <button @click="remover(pedido.numero)"> <font-awesome-icon data-feather="trash" />Excluir</button>
                        <button @click="alterar(pedido.numero)"> <font-awesome-icon icon="edit" />Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="adicionar()">Criar novo pedido</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Lista de pedidos',
        data() {
            return {
                pedido_list: []
            };
        },
        mounted() {
            try {
                axios.get('http://192.168.1.22:8080/pedido')
                    .then(x => this.pedido_list = x.data);
                console.log(this.pedido_list);
            } catch (e) {
                console.error(e);
            }
        },
        methods: {
            remover(id) {
                axios.delete("http://192.168.1.22:8080/pedido/" + id)
                    .catch(error => alert(error));
                axios.get('http://192.168.1.22:8080/pedido')
                    .then(x => this.produto_list = x.data);
            },
            alterar(id) {
                this.$router.push({ name: 'editar_pedido', params: { id } });
            },
            adicionar() {
                this.$router.push({ name: 'cadastrar_pedido' })
            }
        }
    };
</script>

<style scoped>
</style>