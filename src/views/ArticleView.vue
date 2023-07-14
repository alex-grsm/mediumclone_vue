<template>
    <div class="article-page">
        <div class="banner">
            <div class="container" v-if="article">
                <h1>{{ article.title }}</h1>
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
                            class="author"
                            :to="{
                                name: 'userProfile',
                                params: {slug: article.author.username},
                            }"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">
                            {{ formatDate(article.createdAt) }}
                        </span>
                    </div>
                    <span v-if="!isAuthor">
                        <ej-add-to-favorites
                            :is-favorited="article.favorited"
                            :article-slug="article.slug"
                            :favorites-count="article.favoritesCount"
                            :simple-btn="false"
                        />
                    </span>
                    <span v-if="isAuthor">
                        <router-link
                            class="btn btn-outline-secondary btn-sm"
                            :to="{
                                name: 'editArticle',
                                params: {slug: article.slug},
                            }"
                        >
                            <i class="ion-edit"></i> Edit Article
                        </router-link>
                        <button
                            class="btn btn-sm btn-outline-danger"
                            @click="deleteArticle"
                        >
                            <i class="ion-trash-a"></i> Delete Article
                        </button>
                    </span>
                </div>
            </div>
        </div>

        <div class="container page">
            <ej-loading v-if="isLoading" />
            <ej-error-message v-if="error" :message="error" />

            <div class="row article-content" v-if="article">
                <div class="col-md-12">
                    <div>
                        <p>
                            {{ article.body }}
                        </p>
                    </div>
                    <ej-tag-list :tags="article.tagList" />
                </div>
            </div>
            <hr />
        </div>
    </div>
</template>

<script>
import EjLoading from '@/components/Loading'
import EjErrorMessage from '@/components/ErrorMessage'
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {mapState, mapGetters} from 'vuex'
import moment from 'moment'
import EjTagList from '@/components/TagList'
import EjAddToFavorites from '@/components/AddToFavorites'

export default {
    name: 'EjArticle',
    components: {
        EjLoading,
        EjErrorMessage,
        EjTagList,
        EjAddToFavorites
    },
    computed: {
        ...mapState({
            isLoading: state => state.article.isLoading,
            error: state => state.article.error,
            article: state => state.article.data,
        }),
        ...mapGetters({
            currentUser: authGetterTypes.currentUser,
        }),
        isAuthor() {
            if (!this.currentUser || !this.article) {
                return false
            }
            return this.currentUser.username === this.article.author.username
        },
    },
    mounted() {
        // console.log(this.$route)
        this.$store.dispatch(articleActionTypes.getArticle, {
            slug: this.$route.params.slug,
        })
    },
    methods: {
        formatDate(date) {
            return moment(date).format('MMMM D, YYYY')
        },
        deleteArticle() {
            this.$store
                .dispatch(articleActionTypes.deleteArticle, {
                    slug: this.$route.params.slug,
                })
                .then(() => {
                    this.$router.push({name: 'globalFeed'})
                })
        },
    },
}
</script>
