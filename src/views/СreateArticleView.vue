<template>
    <ej-article-form
        :initial-values="initialValues"
        :errors="validationErrors"
        :is-submiting="isSubmiting"
        @articleSubmit="onSubmit"
    />
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/createArticle'
import EjArticleForm from '@/components/ArticleForm'

export default {
    name: 'EjCreateArticle',
    components: {
        EjArticleForm,
    },
    data() {
        return {
            initialValues: {
                title: '',
                description: '',
                body: '',
                tagList: [],
            },
            // validationErrors: null,
            // isSubmiting: false,
        }
    },
    computed: {
        ...mapState({
            isSubmiting: state => state.createAricle.isSubmiting,
            validationErrors: state => state.createAricle.validationErrors,
        }),
    },
    methods: {
        onSubmit(articleInput) {
            // console.log('onSubmit in createArticle', articleInput)
            this.$store
                .dispatch(actionTypes.createArticle, {articleInput})
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
