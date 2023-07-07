<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
    name: 'EjErrorMessage',
    props: {
        message: {
            type: String,
            required: false,
            default: 'Something went wrong',
        },
    },
}
</script>
