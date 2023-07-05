<template>
    <div>
        <div v-if="isLoading">Loading...</div>
        <div v-if="error">Something bad happened</div>

        <div v-if="feed">
            <div
                class="article-preview"
                v-for="(article, index) in feed.articles"
                :key="index"
            >
                <div class="article-meta">
                    <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                        <img :src="article.author.image" />
                    </router-link>
                    <div class="info">
                        <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}" class="author">
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">
                            {{ formatDate(article.createdAt) }}
                        </span>
                    </div>
                    <div class="pull-xs-right">
                        ADD TO FAVORITES
                        <!-- <button class="btn btn-sm btn-outline-primary">
                            <i class="ion-heart"></i>
                            <span> 1507 </span>
                        </button> -->
                    </div>
                </div>
                <router-link class="preview-link" :to="{name: 'article', params: {slug: article.slug}}">
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                    TAG LIST
                </router-link>
            </div>
            <ej-pagination
                :total="total"
                :limit="limit"
                :current-page="currentPage"
                :url="url"
            />
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import EjPagination from '@/components/Pagination'

export default {
    name: 'EjFeed',
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    components: {
        EjPagination
    },
    data() {
        return {
            total: 500,
            limit: 10,
            currentPage: 5,
            url: '/tags/dragons',
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.error,
        }),
    },
    mounted() {
        console.log('init feed')
        this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl})
    },
    methods: {
        formatDate(date) {
            return moment(date).format('MMMM D, YYYY')
        }
    }
}
</script>
