<template>
    <div>
        <div class="form-group">
            <label for="produto"> Produto: </label>
            <select v-model="item.produto">
                <option v-for="produto in produto_list" :key="produto.id" :value="produto">
                    {{ produto.nome }}
                </option>
            </select>
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

                    }
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
            }
        },
        methods: {
            salvar() {
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
            }
        }
    }
</script>

<style scoped>
</style>