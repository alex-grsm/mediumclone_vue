<template>
    <ej-topbar />
    <router-view />
</template>

<script>
import EjTopbar from '@/components/Topbar'
import {actionTypes} from '@/store/modules/auth'

export default {
    name: 'EjApp',
    components: {
        EjTopbar,
    },
    mounted() {
        this.$store.dispatch(actionTypes.getCurrentUser)
    },
}
</script>
