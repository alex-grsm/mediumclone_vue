<template>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>

    <div class="sidebar" v-if="popularTags">
        <p>Popular Tags</p>
        <div class="tag-list">
            <router-link
                class="tag-default tag-pill"
                v-for="popularTag in popularTags"
                :key="popularTag"
                :to="{name: 'tag', params: {slug: popularTag}}"
            >
                {{ popularTag }}
            </router-link>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'

export default {
    name: 'EjPopularTags',
    computed: {
        ...mapState({
            isLoading: state => state.popularTags.isLoading,
            popularTags: state => state.popularTags.data,
            error: state => state.popularTags.error,
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getPopularTags)
    },
}
</script>
