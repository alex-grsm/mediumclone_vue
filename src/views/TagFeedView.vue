<template>
    <div class="home-page">
        <ej-banner />
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <ej-feed-toggler :tag-name="tagName" />
                    <ej-feed :api-url="apiUrl" />
                </div>
                <div class="col-md-3">
                    <ej-popular-tags />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EjFeed from '@/components/Feed'
import EjPopularTags from '@/components/PopularTags'
import EjBanner from '@/components/Banner'
import EjFeedToggler from '@/components/FeedToggler'

export default {
    name: 'EjYourFeed',
    components: {
        EjFeed,
        EjPopularTags,
        EjBanner,
        EjFeedToggler
    },
    computed: {
        tagName() {
            return this.$route.params.slug
        },
        apiUrl() {
            return `/articles?tag=${this.tagName}`
        }
    }
}
</script>
