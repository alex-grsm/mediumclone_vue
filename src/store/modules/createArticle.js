import articleApi from '@/api/article'

const state = {
    isSubmiting: false,
    validationErrors: null,
}

export const mutationTypes = {
    createArticleStart: '[createArticle] createArticleStart',
    createArticleSuccess: '[createArticle] createArticleSuccess',
    createArticleFailure: '[createArticle] createArticleFailure',
}

export const actionTypes = {
    createArticle: '[createArticle] createArticle',
}

const mutations = {
    [mutationTypes.createArticleStart](state) {
        state.isSubmiting = true
    },
    [mutationTypes.createArticleSuccess](state) {
        state.isSubmiting = false
    },
    [mutationTypes.createArticleFailure](state, payload) {
        state.isSubmiting = false
        state.validationErrors = payload
    },
}

const actions = {
    [actionTypes.createArticle](context, {articleInput}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.createArticleStart)
            articleApi
                .createArticle(articleInput)
                .then(article => {
                    context.commit(mutationTypes.createArticleSuccess, article)
                    resolve(article)
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.createArticleFailure,
                        result.response.data.errors
                    )
                })
        })
    },
}

export default {
    state,
    actions,
    mutations,
}
