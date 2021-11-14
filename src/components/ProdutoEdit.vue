<template>
    <div>
        <form action="post">
            <input hidden v-model="produto.id" />
            <div class="form-group">
                <label for="produto_nome">Nome do produto</label>
                <input v-model="produto.nome" />
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Cadastro de produto',
        data() {
            return {
                produto: {}
            };
        }
    }
</script>

<style scoped>
</style>