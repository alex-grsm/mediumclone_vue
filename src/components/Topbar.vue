<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'globalFeed'}">
                MediumClone
            </router-link>

            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        :to="{name: 'globalFeed'}"
                        active-class="active"
                    >
                        Home
                    </router-link>
                </li>
                <template v-if="isLoggedIn">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{name: 'createArticle'}"
                            active-class="active"
                        >
                            <i class="ion-compose"></i>
                            New Article
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{name: 'settings'}"
                            active-class="active"
                        >
                            <i class="ion-gear-a"></i>
                            Settings
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{
                                name: 'userProfile',
                                params: {slug: currentUser.username},
                            }"
                            active-class="active"
                        >
                            <img class="user-pic" :src="currentUser.image" />
                            {{ currentUser.username }}
                        </router-link>
                    </li>
                </template>
                <template v-if="isAnonymous">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{name: 'login'}"
                            active-class="active"
                        >
                            Sign in
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{name: 'register'}"
                            active-class="active"
                        >
                            Sign up
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
import {getterTypes} from '@/store/modules/auth'
import {mapGetters} from 'vuex'

export default {
    name: 'EjTopbar',
    computed: {
        ...mapGetters({
            currentUser: getterTypes.currentUser,
            isLoggedIn: getterTypes.isLoggedIn,
            isAnonymous: getterTypes.isAnonymous,
        }),
        // ...mapState({
        // currentUser: state => state.auth.currentUser,
        // isLoggedIn: state => state.auth.isLoggedIn,
        // }),
        // currentUser() {
        //     return this.$store.getters[getterTypes.currentUser]
        // },
        // isLoggedIn() {
        //     return this.$store.getters[getterTypes.isLoggedIn]
        // },
        // isAnonymous() {
        //     return this.$store.getters[getterTypes.isAnonymous]
        // },
    },
}
</script>

<style lang="scss" scoped></style>
