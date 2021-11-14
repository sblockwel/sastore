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
                            <button @click="remover(cliente.id)"> <fa-icon icon="trash" /></button>
                            <button @click="alterar(cliente.id)"> <fa-icon icon="pencil-alt" /></button>
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
    import axios from 'axios'
    export default {
        name: 'Lista de clientes',
        data() {
            return {
                cliente_list: []
            };
        },
        mounted() {
            try {
                axios.get('http://192.168.1.22:8080/cliente')
                    .then(x => this.cliente_list = x.data);
                console.log(this.cliente_list);
            } catch (e) {
                console.error(e);
            }
        },
        methods: {
            adicionar() {
                this.$router.push({ name: 'cadastrar_cliente' });
            },
            remover(id) {
                axios.delete("http://192.168.1.22:8080/cliente/" + id)
                    .catch(error => alert(error));
                axios.get('http://192.168.1.22:8080/cliente')
                    .then(x => this.cliente_list = x.data);
            },
            alterar(id) {
                this.$router.push({ name: 'editar_cliente', params: { id } });
            }
        }
    };
</script>

<style scoped>
</style>