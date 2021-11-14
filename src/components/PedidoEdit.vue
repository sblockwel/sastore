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
                <tr v-for="(item, idx) in itens" :key="item.id">
                    <td style="display:none;">{{ item.id }}</td>
                    <th scope="row">{{ item.produto.nome }}</th>
                    <td :contenteditable="isEditable(idx)" scope="row" id="qtd_produto">{{ item.quantidade }} </td>
                    <td>
                        <button @click.prevent="excluir(item.id)"> <font-awesome-icon data-feather="trash" />Excluir</button>
                        <button @click="editar(idx)"> <font-awesome-icon icon="edit" />{{ editing }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click.prevent="novo()">Adicionar produto</button>
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
                alteracaoIdx: -1,
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
            },
            editing() {
                return this.alteracaoIdx > -1 ? "Salvar" : "Editar";
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
            isEditable(idx) {
                return idx == this.alteracaoIdx;
            },
            novo() {
                let numero = this.pedido.numero;
                this.$router.push({ name: 'adicionar_item', params: { numero } });
            },
            editar(idx) {
                this.itemSelected = Object.assign({}, this.itens[idx])
                let quantidade = window.prompt("Digite a quantidade desejada: ", this.itemSelected.quantidade);
                try {
                    if (quantidade == null || quantidade == "") {
                        console.log("Edição cancelada;");
                    } else {
                        this.itemSelected.quantidade = parseInt(quantidade);
                        this.itens[idx] = this.itemSelected;

                        axios.put('http://192.168.1.22:8080/item/' + this.itemSelected.id, this.itemSelected)
                            .then((res) => {
                                //Perform Success Action
                            })
                            .catch((error) => {
                                // error.response.status Check status code
                            }).finally(() => {
                                let pedido = this.pedido;
                                this.$router.push({ name: 'editar_pedido', params: { pedido } });
                                this.itemSelected = null;
                            });
                    }
                } catch (e) {
                    console.error(e);
                }

            },
            excluir(id) {
                axios.delete('http://192.168.1.22:8080/item/' + id)
                    .then((res) => {
                        //Perform Success Action
                    })
                    .catch((error) => {
                        // error.response.status Check status code
                    }).finally(() => {
                        let pedido = this.pedido;
                        this.$router.push({ name: 'editar_pedido', params: { pedido } });
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