<template>
    <div>
        <div class="d-flex justify-content-start pt-4 px-4">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Acoes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in cliente_list" :key="cliente.id">
                        <th scope="row">{{ cliente.id }}</th>
                        <td>{{ cliente.nome }}</td>
                        <td>
                            <button @click="remover(cliente.id)"> <fa-icon icon="trash" color="darkred" /></button>
                            <button @click="alterar(cliente.id)"> <fa-icon icon="pencil-alt" color="darkgreen"/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mx-auto d-flex justify-content-start px-4">
            <button class="btn btn-primary" @click="adicionar()">Cadastrar cliente</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../config.js';
    export default {
        name: 'Lista de clientes',
        data() {
            return {
                cliente_list: []
            };
        },
        async mounted() {
            try {
                await this.carregarClientes();
            } catch (e) {
                console.error(e);
            }
        },
        methods: {
            async carregarClientes() {
                return new Promise(() => axios.get(`${config.APIURL}/cliente`)
                    .then(response => this.cliente_list = response.data)
                    .catch(error => console.error(error)));
            },
            adicionar() {
                this.$router.push({ name: 'cadastrar_cliente' });
            },
            async remover(id) {
                await axios.delete(`${config.APIURL}/cliente/${id}`)
                    .catch(error => alert(error))
                    .finally(async () => await this.carregarClientes());
            },
            alterar(id) {
                this.$router.push({ name: 'editar_cliente', params: { id } });
            }
        }
    };
</script>

<style scoped>
</style>