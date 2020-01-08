<template>
    <div class="auth-wrap">
        <h3 class="title">Авторизация</h3>
        <p class="description">Введите логин и пароль для авторизации на сайте</p>
        <form class="form">
            <label class="form-item" :class="{'error-input': this.$v.login.$error}">
                <small class="error-text" v-if="!this.$v.login.required">Заполните данное поле</small>
                <input type="text" v-model="login" placeholder="Логин или email" class="main-field" ref="login">
            </label>
            <label class="form-item" :class="{'error-input': this.$v.password.$error}">
                <small class="error-text" v-if="!this.$v.password.required">Заполните данное поле</small>
                <input type="password" autocomplete="off" v-model="password" placeholder="Пароль" class="main-field" ref="password">
            </label>
            <button
                class="main-button"
                @click="loginHandler($event)"
                :disabled="status === 'PENDING'"
            >
                <span v-show="status !== 'PENDING'">Войти</span>
                <div v-show="status === 'PENDING'">
                    <img src="../assets/loader.svg" alt="loader">
                </div>
            </button>
        </form>
        <router-link class="link" to="/registration">
            Если у Вас еще нет аккаута, то зарегистрируйтесь
        </router-link>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    export default {
        data: () => ({
            login: '',
            password: '',
            status: null
        }),
        mounted() {
            this.$refs.login.focus();
            const {registration} = this.$route.query;
            const {regLogin} = this.$route.query;
            if (registration === 'true') {
                this.$toasted.show('Вы успешно зарегистрировались', {
                    theme: "toasted-primary",
                    position: "top-right",
                    duration : 3000
                });
            }
            if (!regLogin) {
                this.$refs.login.focus();
            } else {
                this.login = regLogin;
                this.$refs.password.focus();
            }
        },
        methods: {
            async loginHandler(e) {
                e.preventDefault();
                await this.$v.$touch();
                if (this.$v.$invalid){
                    this.status = 'ERROR';
                } else {
                    this.status = 'PENDING';
                    const {login, password} = this;
                    const response = await this.$store.dispatch('loginRequest', {
                        login,
                        password
                    });
                    if (typeof response !== 'undefined') {
                        this.$toasted.show(response.message, {
                            theme: "toasted-primary",
                            position: "top-right",
                            duration : 2000
                        });
                    }
                    this.status = 'OK';
                }
            }
        },
        validations: {
            login: {
                required
            },
            password: {
                required
            }
        }
    }
</script>
