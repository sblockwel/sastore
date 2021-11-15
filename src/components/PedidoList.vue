<template>
    <div>
        <div class="d-flex justify-content-start pt-4 px-4">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Numero</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Valor total</th>
                        <th scope="col">Acoes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pedido in pedido_list" :key="pedido.numero">
                        <td scope="row">{{ pedido.numero }}</td>
                        <td scope="row">{{ pedido.cliente.nome }}</td>
                        <td scope="row">{{ pedido.valorTotal }}</td>
                        <td>
                            <button @click="remover(pedido.id)"> <fa-icon icon="trash" color="darkred"/></button>
                            <button @click="alterar(pedido.id)"> <fa-icon icon="pencil-alt" color="darkgreen" /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mx-auto d-flex justify-content-start px-4">
            <button class="btn btn-primary" @click="adicionar()">Criar novo pedido</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../config.js';
    export default {
        name: 'Lista de pedidos',
        data() {
            return {
                pedido_list: []
            };
        },
        async mounted() {
            try {
                await this.carregarPedidos();
                console.log(this.pedido_list);
            } catch (e) {
                console.error(e);
            }
        },
        methods: {
            async carregarPedidos() {
                return new Promise(() => axios.get(`${config.APIURL}/pedido`)
                    .then(x => this.pedido_list = x.data)
                    .catch(error => console.error(error)));
            },
            async remover(id) {
                axios.delete(`${config.APIURL}/pedido/${id}`)
                    .catch(error => alert(error))
                    .finally(() => this.carregarPedidos());
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