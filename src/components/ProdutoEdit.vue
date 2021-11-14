<template>
    <div>
        <meta charset="utf-8">
        <form v-on:submit.prevent="salvar">
            <input hidden v-model="produto.id" />
            <div class="form-group">
                <label for="produto_nome">Nome do produto</label>
                <input v-model="produto.nome" />
            </div>
            <div class="form-group">
                <label for="produto_valor">Valor do produto</label>
                <input v-model="produto.preco" />
            </div>
            <div class="form-group">
                <button id="btn_save" class="btn btn-primary"> {{ acao }}</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Cadastro de produto',
        data() {
            return {
                produto: {}
            };
        },
        computed: {
            acao() {
                return this.produto.id > 0 ? "Salvar" : "Cadastrar";
            }
        },
        mounted() {
            console.log(this.$route.params);
            if (this.$route.params.id != null) {
                axios.get('http://192.168.1.22:8080/produto/' + this.$route.params.id)
                    .then(x => this.produto = x.data);
            }
        },
        methods: {
            salvar() {
                if (this.produto.id > 0) {
                    axios.put('http://192.168.1.22:8080/produto/' + this.$route.params.id, this.produto)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            this.$router.push({ name: 'listar_produtos' });
                        });
                } else {
                    axios.post('http://192.168.1.22:8080/produto/', this.produto)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            this.$router.push({ name: 'listar_produtos' });
                        });
                }

            }
        }
    }
</script>

<style scoped>
</style>