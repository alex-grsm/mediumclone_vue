<template>
    <div class="home-page">
        BANNER
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <ej-feed :api-url="apiUrl" />
                </div>
                <div class="col-md-3">POPULAR TAGS</div>
            </div>
        </div>
    </div>
</template>

<script>
import EjFeed from '@/components/Feed'

export default {
    name: 'EjGlobalFeed',
    components: {
        EjFeed,
    },
    data() {
        return {
            apiUrl: '/articles'
        }
    }
}
</script>
