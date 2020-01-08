<template>
    <div id="wrap">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
    import AuthLayout from './layouts/AuthLayout';
    import MainLayout from './layouts/MainLayout';

    export default {
        components: {
            AuthLayout,
            MainLayout
        },
        computed: {
            layout() {
                return (this.$route.meta.layout || 'main') + '-layout'
            }
        }
    }
</script>

<style lang="scss">
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: #222222;
        font-family: 'Montserrat', sans-serif;
    }
    ul {
        list-style: none;
    }
    button, input {
        outline: none;
    }
    button {
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
    .main-field {
        height: 50px;
        width: 100%;
        border: 1px solid #E0E0E0;
        border-radius: 2px;
        padding: 0 20px;
        font-size: 14px;
        transition: .1s;
        &::placeholder {
            color: #9E9E9E;
        }
        &:focus {
            border: 1px solid #40A7E3;
        }
    }
    .main-button {
        width: 100%;
        height: 60px;
        background-color: #40A7E3;
        border: none;
        border-radius: 2px;
        text-transform: uppercase;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 600;
        transition: .1s;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
            color: #FFFFFF;
        }
        &:disabled {
            background-color: lighten(#40A7E3, 15%);
            cursor: default;
        }
        &:not(:disabled):hover {
            background-color: lighten(#40A7E3, 5%);
        }
    }
    .back-button {
        min-width: 60px;
        max-width: 60px;
        margin-right: 10px;
        border-radius: 2px;
        background-color: #40A7E3;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
            display: flex;
            width: 24px;
        }
    }
    .container {
        max-width: 1140px;
        width: 100%;
        margin: 0 auto;
    }
</style>
