<template>
    <div>
        <form v-on:submit.prevent="salvar">
            <input type="hidden" v-model="cliente.id" />
            <div class="form-group">
                <label for="cliente_nome">Nome do cliente</label>
                <input v-model="cliente.nome" />
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
        name: 'Cadastro de cliente',
        data() {
            return {
                cliente: {
                    "id": 0,
                    "name": ""
                }
            };
        },
        computed: {
            acao() {
                return this.cliente.id > 0 ? "Salvar" : "Cadastrar";
            }
        },
        mounted() {
            console.log(this.$route.params);
            if (this.$route.params.id != null) {
                axios.get('http://192.168.1.22:8080/cliente/' + this.$route.params.id)
                    .then(x => this.cliente = x.data);
            }
        },
        methods: {
            salvar() {
                if (this.cliente.id > 0) {
                    axios.put('http://192.168.1.22:8080/cliente/' + this.$route.params.id, this.cliente)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            this.$router.push({ name: 'listar_cliente' });
                        });
                } else {
                    axios.post('http://192.168.1.22:8080/cliente/', this.cliente)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            this.$router.push({ name: 'listar_cliente' });
                        });
                }

            }
        }
    }
</script>

<style scoped>
</style>