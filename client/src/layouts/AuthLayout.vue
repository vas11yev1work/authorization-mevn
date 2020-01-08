<template>
    <div class="layout auth-layout">
        <router-view/>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    .auth-layout {
        display: flex;
        justify-content: center;
        .auth-wrap {
            max-width: 320px;
            width: 100%;
            margin-top: 120px;
            .title {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 10px;
            }
            .description {
                font-size: 14px;
                color: #9E9E9E;
            }
            .link {
                &:hover {
                    text-decoration: underline;
                }
                color: #9E9E9E;
                font-size: 14px;
                display: block;
                text-align: center;
                margin-top: 20px;
            }
            .form {
                margin-top: 20px;
                .form-item {
                    margin-bottom: 10px;
                    display: block;
                    .error-text {
                        display: none;
                        font-size: 12px;
                        font-weight: 600;
                        color: #F26464;
                        margin-bottom: 2px;
                    }
                    &.error-input {
                        .main-field {
                            border: 1px solid #F26464;
                        }
                        .error-text {
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>
