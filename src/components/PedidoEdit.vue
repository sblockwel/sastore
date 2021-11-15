<template>
    <div class="">
        <form v-on:submit.prevent="salvar">
            <input type="hidden" v-model="pedido.numero" />
        </form>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-lg">Selecione o cliente:</span>
            <select :readonly="pedido.numero > 0" v-model="pedido.cliente">
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente">
                    {{ cliente.nome }}
                </option>
            </select>
        </div>
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Nome do produto</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Acoes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in itens" :key="item.id">
                    <td style="display:none;">{{ item.id }}</td>
                    <th scope="row">{{ item.produto.nome }}</th>
                    <td :contenteditable="isEditable(idx)" scope="row" id="qtd_produto">{{ item.quantidade }} </td>
                    <td>
                        <button @click.prevent="excluir(item.id)"> <fa-icon icon="trash" color="darkred" /></button>
                        <button @click="editar(idx)"> <fa-icon :icon="icon(idx)" color="darkgreen" /></button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click.prevent="novo()">Adicionar produto</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../config.js';
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
                itens: [],
                clientes: [],
                show: false
            };
        },
        computed: {
            acao() {
                return this.pedido.numero > 0 ? "Salvar" : "Cadastrar";
            }
        },
        mounted() {
            console.log(this.$route.params);
            axios.get(`${config.APIURL}/cliente/`)
                .then(res => {
                    this.clientes = res.data;
                    if (this.$route.params.id != null) {
                        let id = this.$route.params.id
                        axios.get(`${config.APIURL}/pedido/${id}`)
                            .then(x => {
                                this.pedido = x.data;
                                console.log(x.data);
                                axios.get(`${config.APIURL}/pedido/itens/${id}`)
                                    .then(res => this.itens = res.data);
                            });
                    }
                });
        },
        methods: {
            icon(idx) {
                return idx > -1 ? "pencil-alt" : "check";
            },
            isEditable(idx) {
                return idx == this.alteracaoIdx;
            },
            editPedido(numero) {
                this.$router.push({ name: 'adicionar_item', params: { numero } });
            },
            novo() {
                if (this.pedido.numero == 0) {
                    if (this.pedido.cliente == null || this.pedido.cliente.id == 0 || this.pedido.cliente.id == undefined) {
                        alert('Nenhum cliente selecionado!')
                        return;
                    }
                    let data = {
                        "cliente": this.pedido.cliente.id,
                        "dataEmissao": new Date()
                    }
                    axios.post(`${config.APIURL}/pedido/`, data)
                        .then(response => {
                            this.pedido.id = response.data.id;
                            this.pedido.numero = response.data.numero;
                        })
                        .finally(() => this.editPedido(this.pedido.numero));
                } else {
                    this.editPedido(this.pedido.numero);
                }
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

                        axios.put(`${config.APIURL}/item/${this.itemSelected.id}`, this.itemSelected)
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
                axios.delete(`${config.APIURL}/item/${id}`)
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
                    axios.put(`${config.APIURL}/pedido/${this.$route.params.id}`, this.pedido)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            this.$router.push({ name: 'listar_pedidos' });
                        });
                } else {
                    axios.post(`${config.APIURL}/pedido/`, this.pedido)
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