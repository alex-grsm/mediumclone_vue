import articleApi from '@/api/article'

const state = {
    isSubmiting: false,
    validationErrors: null,
    isLoading: false,
    article: null,
}

export const mutationTypes = {
    updateArticleStart: '[editArticle] updateArticleStart',
    updateArticleSuccess: '[editArticle] updateArticleSuccess',
    updateArticleFailure: '[editArticle] updateArticleFailure',

    getArticleStart: '[editArticle] getArticleStart',
    getArticleSuccess: '[editArticle] getArticleSuccess',
    getArticleFailure: '[editArticle] getArticleFailure',
}

export const actionTypes = {
    updateArticle: '[editArticle] updateArticle',
    getArticle: '[editArticle] getArticle'
}

const mutations = {
    [mutationTypes.updateArticleStart](state) {
        state.isSubmiting = true
    },
    [mutationTypes.updateArticleSuccess](state) {
        state.isSubmiting = false
    },
    [mutationTypes.updateArticleFailure](state, payload) {
        state.isSubmiting = false
        state.validationErrors = payload
    },

    [mutationTypes.getArticleStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false
        state.article = payload
    },
    [mutationTypes.getArticleFailure](state) {
        state.isLoading = false
    },
}

const actions = {
    [actionTypes.updateArticle](context, {slug, articleInput}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.updateArticleStart)
            articleApi
                .updateArticle(slug, articleInput)
                .then(article => {
                    context.commit(mutationTypes.updateArticleSuccess, article)
                    resolve(article)
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.updateArticleFailure,
                        result.response.data.errors
                    )
                })
        })
    },
    [actionTypes.getArticle](context, {slug}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getArticleStart)
            articleApi
                .getArticle(slug)
                .then(article => {
                    context.commit(mutationTypes.getArticleSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationTypes.getArticleFailure)
                })
        })
    },
}

export default {
    state,
    actions,
    mutations,
}
