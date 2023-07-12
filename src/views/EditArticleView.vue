<template>
    <div>
        <ej-loading v-if="isLoading" />
        <ej-article-form
            v-if="initialValues"
            :initialValues="initialValues"
            :errors="validationErrors"
            :isSubmiting="isSubmiting"
            @articleSubmit="onSubmit"
        />
    </div>
</template>

<script>
import {mapState} from 'vuex'

import EjArticleForm from '@/components/ArticleForm'
import EjLoading from '@/components/Loading'
import {actionTypes} from '@/store/modules/editArticle'

export default {
    name: 'EjEditArticle',
    components: {
        EjArticleForm,
        EjLoading,
    },
    // data() {
    //     return {
    //         initialValues: {
    //             title: '',
    //             description: '',
    //             body: '',
    //             tagList: [],
    //         },
    //         // validationErrors: null,
    //         // isSubmiting: false,
    //     }
    // },
    computed: {
        ...mapState({
            isLoading: state => state.editArticle.isLoading,
            article: state => state.editArticle.article,
            isSubmitting: state => state.editArticle.isSubmitting,
            validationErrors: state => state.editArticle.validationErrors,
        }),
        initialValues() {
            if (!this.article) {
                return null
            }
            return {
                title: this.article.title,
                description: this.article.description,
                body: this.article.body,
                tagList: this.article.tagList,
            }
        },
    },
    mounted() {
        this.$store.dispatch(actionTypes.getArticle, {
            slug: this.$route.params.slug,
        })
    },
    methods: {
        onSubmit(articleInput) {
            // console.log('onSubmit in editArticle', articleInput)
            const slug = this.$route.params.slug
            this.$store
                .dispatch(actionTypes.updateArticle, {articleInput, slug})
                .then(article => {
                    this.$router.push({
                        name: 'article',
                        params: {slug: article.slug},
                    })
                })
        },
    },
}
</script>
