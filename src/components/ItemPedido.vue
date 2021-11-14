<template>
    <div>
        <div class="form-group">
            <label for="produto"> Produto: </label>
            <select :readonly="item.id > 0" v-model="item.produto">
                <option v-for="produto in produto_list" :key="produto.id" :value="produto">
                    {{ produto.nome }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="quantidade"> Quantidade: </label>
            <input v-model="item.quantidade" type="number" />
        </div>
        <div class="form-group">
            <button @click.prevent="salvar" class="btn btn-primary">Salvar</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'item-pedido',
        data() {
            return {
                item: {
                    id: 0,
                    pedido: 0,
                    produto: {

                    },
                    cliente: {

                    },
                    quantidade: 0
                },
                produto_list: [
                    {
                        id: 0,
                        nome: "",
                        preco: 0
                    }
                ]
            }
        },
        computed: {
            isSaved() {
                return this.item.id > 0 ? "" : `readonly="readonly" tabindex="-1" aria-disabled="true"`;
            }
        },
        mounted() {
            axios.get('http://192.168.1.22:8080/produto/')
                .then(response => this.produto_list = response.data);
            if (this.$route.params.id != null) {
                try {
                    axios.get('http://192.168.1.22:8080/item/' + this.$route.params.id)
                        .then(x => this.item = x.data);
                    console.log(this.item);
                } catch (e) {
                    console.error(e);
                }
            } else if (this.$route.params.numero != null) {
                this.pedido = this.$route.params.numero;
            }
        },
        methods: {
            salvar() {
                if (this.item.quantidade <= 0) {
                    alert('Quantidade precisa ser informada e deve ser maior que zero.');
                    return;
                }
                if (this.item.id > 0) {
                    axios.put('http://192.168.1.22:8080/item/' + this.item.id, this.item)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            let id = this.item.pedido;
                            this.$router.push({ name: 'editar_pedido', params: { id } });
                        });
                } else {
                    //debugger
                    let data = {
                        'pedido': this.pedido,
                        'quantidade': this.item.quantidade,
                        'produto': this.item.produto.id
                    }
                    axios.post('http://192.168.1.22:8080/item/', data)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            let id = this.pedido;
                            this.$router.push({ name: 'editar_pedido', params: { id } });
                        });
                }
            }
        }
    }
</script>

<style scoped>
    select[readonly] {
        background: #eee; /*Simular campo inativo - Sugestão @GabrielRodrigues*/
        pointer-events: none;
        touch-action: none;
    }
</style>