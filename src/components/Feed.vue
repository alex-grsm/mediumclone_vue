<template>
    <div>
        <ej-loading v-if="isLoading" />
        <ej-error-message v-if="error" />

        <div v-if="feed">
            <div
                class="article-preview"
                v-for="(article, index) in feed.articles"
                :key="index"
            >
                <div class="article-meta">
                    <router-link
                        :to="{
                            name: 'userProfile',
                            params: {slug: article.author.username},
                        }"
                    >
                        <img :src="article.author.image" />
                    </router-link>
                    <div class="info">
                        <router-link
                            :to="{
                                name: 'userProfile',
                                params: {slug: article.author.username},
                            }"
                            class="author"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">
                            {{ formatDate(article.createdAt) }}
                        </span>
                    </div>
                    <div class="pull-xs-right">
                        <ej-add-to-favorites
                            :is-favorited="article.favorited"
                            :article-slug="article.slug"
                            :favorites-count="article.favoritesCount"
                        />
                    </div>
                </div>
                <router-link
                    class="preview-link"
                    :to="{name: 'article', params: {slug: article.slug}}"
                >
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                    <ej-tag-list :tags="article.tagList" />
                </router-link>
            </div>
            <ej-pagination
                :total="feed.articlesCount"
                :limit="limit"
                :current-page="currentPage"
                :url="baseUrl"
            />
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
import queryString from 'query-string'

import {actionTypes} from '@/store/modules/feed'
import EjPagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'
import EjLoading from '@/components/Loading'
import EjErrorMessage from '@/components/ErrorMessage'
import EjTagList from '@/components/TagList'
import EjAddToFavorites from '@/components/AddToFavorites'

export default {
    name: 'EjFeed',
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    components: {
        EjPagination,
        EjLoading,
        EjErrorMessage,
        EjTagList,
        EjAddToFavorites
    },
    data() {
        return {
            limit,
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.error,
        }),
        currentPage() {
            return Number(this.$route.query.page || '1')
        },
        baseUrl() {
            // console.log('baseUrl', this.$route)
            return this.$route.path
        },
        offset() {
            return this.currentPage * limit - limit
        },
    },
    watch: {
        currentPage() {
            console.log('currentPage changed')
            this.fetchFeed()
        },
        apiUrl() {
            console.log('apiUrl changed')
            this.fetchFeed()
        }
    },
    mounted() {
        // console.log('init feed')
        this.fetchFeed()
    },
    methods: {
        formatDate(date) {
            return moment(date).format('MMMM D, YYYY')
        },
        fetchFeed() {
            const parsedUrl = queryString.parseUrl(this.apiUrl)
            const stringifiedParams = queryString.stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query,
            })
            // console.log(parsedUrl, stringifiedParams)
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
            // console.log( apiUrlWithParams)
            this.$store.dispatch(actionTypes.getFeed, {
                apiUrl: apiUrlWithParams,
            })
        },
    },
}
</script>
