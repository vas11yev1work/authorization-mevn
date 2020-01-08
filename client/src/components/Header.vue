<template>
    <header>
        <div class="container">
            <div class="header">
                <div class="title">
                    <router-link to="/">
                        <h3>{{ name }} {{ surname }}</h3>
                    </router-link>
                </div>
                <ul class="menu">
                    <li class="menu-item">
                        <router-link to="/">Главная</router-link>
                    </li>
                    <li class="menu-item">
                        <router-link to="/settings">Настройки</router-link>
                    </li>
                    <li class="menu-item">
                        <a href="#" @click="logout">Выход</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: ''
            },
            surname: {
                type: String,
                default: ''
            }
        },
        methods: {
            async logout() {
                await this.$store.dispatch('logout');
                await this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss" scoped>
    header {
        height: 60px;
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        background-color: #40A7E3;
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
                h3 {
                    color: #FFFFFF;
                    font-weight: 500;
                }
            }
            .menu {
                font-size: 14px;
                display: flex;
                .menu-item {
                    margin-left: 40px;
                }
                a {
                    color: #FFFFFF;
                }
            }
        }
    }
</style>
