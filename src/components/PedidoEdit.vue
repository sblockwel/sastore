<template>
    <div>
        <form v-on:submit.prevent="salvar">
            <input type="hidden" v-model="pedido.numero" />
        </form>
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Nome do produto</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in itens" :key="item.id">
                    <td style="display:none;">{{ item.id }}</td>
                    <th scope="row">{{ item.produto.nome }}</th>
                    <td scope="row">{{ item.quantidade }}</td>
                    <td>
                        <button @click.prevent="remover(item.numero)"> <font-awesome-icon data-feather="trash" />Excluir</button>
                        <button @click.prevent="editar(item.id)"> <font-awesome-icon icon="edit" />Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Cadastro de pedido',
        components: {
        },
        data() {
            return {
                pedido: {
                    "numero": 0,
                    "cliente": {}
                },
                itemSelected: {},
                itens: [
                    {
                        pedido: 0,
                        quantidade: 0,
                        produto: {
                            "id": 0,
                            "nome": ""
                        }
                    },
                ]
            };
        },
        computed: {
            acao() {
                return this.pedido.numero > 0 ? "Salvar" : "Cadastrar";
            }
        },
        mounted() {
            console.log(this.$route.params);
            if (this.$route.params.id != null) {
                axios.get('http://192.168.1.22:8080/pedido/' + this.$route.params.id)
                    .then(x => this.pedido = x.data);
                axios.get('http://192.168.1.22:8080/pedido/itens/' + this.$route.params.id)
                    .then(res => this.itens = res.data);

            }
        },
        methods: {
            editar(id) {
                this.$router.push({ name: 'editar_item', params: { id } });
            },
            excluir(id) {
                axios.delete('http://192.168.1.22:8080/item/' + this.itemSelected.id)
                    .then((res) => {
                        //Perform Success Action
                    })
                    .catch((error) => {
                        // error.response.status Check status code
                    }).finally(() => {
                        this.$router.push({ name: 'listar_pedidos' });
                    });
            },
            salvar() {
                if (this.pedido.id > 0) {
                    axios.put('http://192.168.1.22:8080/pedido/' + this.$route.params.id, this.pedido)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            this.$router.push({ name: 'listar_pedidos' });
                        });
                } else {
                    axios.post('http://192.168.1.22:8080/pedido/', this.pedido)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            this.$router.push({ name: 'listar_pedidos' });
                        });
                }

            }
        }
    }
</script>

<style scoped>
</style>