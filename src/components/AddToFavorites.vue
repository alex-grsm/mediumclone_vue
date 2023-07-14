<template>
    <button v-if="!simpleBtn" @click="handleLike" :class="btnClass">
        <i class="ion-heart"></i>
        <span class="text">{{
            isFavoritedOptimistic
                ? ' Favorite Article '
                : ' Unfavorite Article '
        }}</span>
        <span class="counter">({{ favoritesCountOptimistic }})</span>
    </button>

    <button v-if="simpleBtn" @click="handleLike" :class="btnClass">
        <i class="ion-heart"></i> <span>{{ favoritesCountOptimistic }}</span>
    </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
    name: 'EjAddToFavorites',
    props: {
        isFavorited: {
            type: Boolean,
            required: true,
        },
        articleSlug: {
            type: String,
            required: true,
        },
        favoritesCount: {
            type: Number,
            required: true,
        },
        simpleBtn: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isFavoritedOptimistic: this.isFavorited,
            favoritesCountOptimistic: this.favoritesCount,
        }
    },
    computed: {
        btnClass() {
            return {
                btn: true,
                'btn-sm': true,
                'btn-primary': this.isFavoritedOptimistic,
                'btn-outline-primary': !this.isFavoritedOptimistic,
            }
        },
    },
    methods: {
        handleLike() {
            this.$store.dispatch(actionTypes.addToFavorites, {
                slug: this.articleSlug,
                isFavorited: this.isFavoritedOptimistic,
            })
            if (this.isFavoritedOptimistic) {
                // this.favoritesCountOptimistic = this.isFavoritedOptimistic - 1
                this.favoritesCountOptimistic -= 1
            } else {
                // this.favoritesCountOptimistic = this.isFavoritedOptimistic + 1
                this.favoritesCountOptimistic++
            }
            this.isFavoritedOptimistic = !this.isFavoritedOptimistic
        },
    },
}
</script>
