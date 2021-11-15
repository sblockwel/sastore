<template>    
    <div>
        <teleport to="head">
        </teleport>
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/home"> <fa-icon icon="store"/> SAStore</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </header>

        <navigation-content></navigation-content>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <router-view></router-view>
        </main>
    </div>
</template>
<script charset="utf-8">
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import '../assets/js/site.js'
    import NavigationContent from './navigation.vue'
    export default {
        components: {
            NavigationContent
        },
        mounted() {
            let featherScript = document.createElement('script')
            featherScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js')
            document.body.appendChild(featherScript)

            document.documentElement.setAttribute('lang', 'pt-br')
        }
    }
</script>
<style scoped>
    @import '../assets/css/site.css';
</style>