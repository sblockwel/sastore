<template>
    <div class="d-flex justify-content-start p-4">
        <form v-on:submit.prevent="salvar">
            <input type="hidden" v-model="cliente.id" />
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-lg">Nome do cliente: </span>
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
                            this.$router.push({ name: 'listar_clientes' });
                        });
                } else {
                    axios.post('http://192.168.1.22:8080/cliente/', this.cliente)
                        .then((res) => {
                            //Perform Success Action
                        })
                        .catch((error) => {
                            // error.response.status Check status code
                        }).finally(() => {
                            this.$router.push({ name: 'listar_clientes' });
                        });
                }

            }
        }
    }
</script>

<style scoped>
</style>