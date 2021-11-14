<template>
    <div class="container">
        <meta charset="utf-8">

        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="produto in produto_list" :key="produto.id">
                    <th scope="row">{{ produto.id }}</th>
                    <td>{{ produto.nome }}</td>
                    <td>{{ produto.preco }}</td>
                    <td>
                        <button @click="remover(produto.id)"> <font-awesome-icon data-feather="trash" />Excluir</button>
                        <button @click="alterar(produto.id)"> <font-awesome-icon icon="edit" />Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Lista de produtos',
        data() {
            return {
                produto_list: []
            };
        },
        mounted() {
            try {
                axios.get('http://192.168.1.22:8080/produto')
                    .then(x => this.produto_list = x.data);
                console.log(this.produto_list);
            } catch (e) {
                console.error(e);
            }
        },
        methods: {
            remover(id) {
                axios.delete("http://192.168.1.22:8080/produto/" + id)
                    .catch(error => alert(error));
                axios.get('http://192.168.1.22:8080/produto')
                    .then(x => this.produto_list = x.data);
            },
            alterar(id) {
                this.$router.push({ name: 'editar_produto', params: { id } });
            }
        }
    };
</script>

<style scoped>
</style>