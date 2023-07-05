<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign Up</h1>
                    <p class="text-xs-center">
                        <router-link :to="{name: 'login'}">
                            Have an account?
                        </router-link>
                    </p>
                    <ej-validation-errors
                        v-if="validationErrors"
                        :validation-errors="validationErrors"
                    />
                    <form @submit.prevent="onSubmit" class="form">
                        <fieldset class="form-group">
                            <input
                                type="text"
                                class="form-control form-control-lg"
                                placeholder="Username"
                                v-model="username"
                            />
                        </fieldset>

                        <fieldset class="form-group">
                            <input
                                type="text"
                                class="form-control form-control-lg"
                                placeholder="Email"
                                v-model="email"
                            />
                        </fieldset>

                        <fieldset class="form-group">
                            <input
                                type="password"
                                class="form-control form-control-lg"
                                placeholder="Password"
                                v-model="password"
                            />
                        </fieldset>

                        <button
                            class="btn btn-lg btn-primary pull-xs-right"
                            :disabled="isSubmitting"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

import EjValidationErrors from '@/components/ValidationErrors'
import { actionTypes } from '@/store/modules/auth'

export default {
    name: 'RegisterView',
    components: {
        EjValidationErrors,
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.auth.isSubmitting,
            validationErrors: state => state.auth.validationErrors,
        }),
        // isSubmitting() {
        //     return this.$store.state.auth.isSubmitting
        // },
        // validationErrors() {
        //     return this.$store.state.auth.validationErrors
        // },
    },
    methods: {
        onSubmit() {
            console.log('submit')
            this.$store
                .dispatch(actionTypes.register, {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                })
                .then(user => {
                    console.log('successfully register user', user)
                    this.$router.push({name: 'globalFeed'})
                })
        },
    },
}
</script>

<style lang="scss" scoped></style>
