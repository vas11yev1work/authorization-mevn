<template>
    <div class="auth-wrap">
        <h3 class="title">Регистрация</h3>
        <form class="form">
            <div class="step" v-show="step === 1">
                <label class="form-item" :class="{'error-input': this.$v.name.$error}">
                    <small class="error-text" v-if="!this.$v.name.required">Заполните данное поле</small>
                    <input type="text" v-model="name" placeholder="Имя" class="main-field form-item" ref="name">
                </label>
                <label class="form-item" :class="{'error-input': this.$v.surname.$error}">
                    <small class="error-text" v-if="!this.$v.surname.required">Заполните данное поле</small>
                    <input
                        type="text"
                        v-model="surname"
                        placeholder="Фамилия"
                        class="main-field form-item"
                        ref="surname"
                        @keypress.enter="changeStep($event,2, 'next')"
                    >
                </label>
                <div class="buttons">
                    <div class="main-button" @click="changeStep($event,2, 'next')">
                        Далее
                    </div>
                </div>
            </div>
            <div class="step" v-show="step === 2">
                <label class="form-item" :class="{'error-input': this.$v.email.$error}">
                    <small class="error-text" v-if="!this.$v.email.required">Заполните данное поле</small>
                    <small class="error-text" v-if="!this.$v.email.email">Введите корректный email</small>
                    <input
                        type="email"
                        v-model="email"
                        placeholder="Email"
                        class="main-field form-item"
                        ref="email"
                    >
                </label>
                <label class="form-item" :class="{'error-input': this.$v.login.$error}">
                    <small class="error-text" v-if="!this.$v.login.required">Заполните данное поле</small>
                    <small class="error-text" v-if="!this.$v.login.minLength">Минимальная длина логина - 6 символов</small>
                    <small class="error-text" v-if="!this.$v.login.loginRegex">Логин должен состоять только из цифр и английских символов в нижнем регистре</small>
                    <input
                        type="text"
                        v-model="login"
                        placeholder="Логин"
                        class="main-field form-item"
                        ref="login"
                    >
                </label>
                <label class="form-item" :class="{'error-input': this.$v.password.$error}">
                    <small class="error-text" v-if="!this.$v.password.required">Заполните данное поле</small>
                    <small class="error-text" v-if="!this.$v.password.minLength">Минимальная длина пароля - 6 символов</small>
                    <input
                        type="password"
                        autocomplete="off"
                        v-model="password"
                        placeholder="Пароль"
                        class="main-field form-item"
                        ref="password"
                    >
                </label>
                <label class="form-item" :class="{'error-input': this.$v.repeatPassword.$error}">
                    <small class="error-text" v-if="!this.$v.repeatPassword.sameAsPassword">Пароли не совпадают</small>
                    <input
                        type="password"
                        autocomplete="off"
                        v-model="repeatPassword"
                        placeholder="Повторите пароль"
                        class="main-field form-item"
                        ref="repeatPassword"
                        @keyup.enter="registrationHandler($event)"
                    >
                </label>
                <div class="buttons">
                    <div class="back-button" @click="changeStep($event, 1, 'back')">
                        <img src="../assets/arrow.png" alt="arrow">
                    </div>
                    <button
                        class="main-button"
                        @click="registrationHandler($event)"
                        :disabled="status === 'PENDING'"
                        type="submit"
                    >
                        <span v-show="status !== 'PENDING'">Зарегистрироваться</span>
                        <div v-show="status === 'PENDING'">
                            <img src="../assets/loader.svg" alt="loader">
                        </div>
                    </button>
                </div>
            </div>
        </form>
        <router-link class="link" to="/login">
            Если у Вас уже есть аккаут, то войдите
        </router-link>
    </div>
</template>

<script>
    import { helpers, required, email, minLength, sameAs } from 'vuelidate/lib/validators';
    const loginRegex = helpers.regex('loginRegex', /^[a-z0-9_]*$/);
    export default {
        data: () => ({
            name: '',
            surname: '',
            email: '',
            login: '',
            password: '',
            repeatPassword: '',
            step: 1,
            status: null
        }),
        mounted() {
            this.$refs.name.focus();
        },
        methods: {
            async changeStep(e, step, type) {
                e.preventDefault();
                if (type === 'next') {
                    await this.$v.name.$touch();
                    await this.$v.surname.$touch();
                    if (!this.$v.name.$invalid && !this.$v.surname.$invalid) {
                        this.step = step;
                    }
                    this.$refs.email.focus();
                } else {
                    this.step = step;
                }
            },
            async registrationHandler(e) {
                e.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.status = 'ERROR';
                } else {
                    this.status = 'PENDING';
                    const {name, surname, email, login, password} = this;
                    const response = await this.$store.dispatch('registrationRequest', {
                        name,
                        surname,
                        email,
                        login,
                        password
                    });
                    if (typeof response !== 'undefined') {
                        this.$toasted.show(response.message, {
                            theme: "toasted-primary",
                            position: "top-right",
                            duration : 3000
                        });
                    }
                    this.status = 'OK';
                }
            }
        },
        validations: {
            name: {
                required
            },
            surname: {
                required
            },
            email: {
                required,
                email
            },
            login: {
                required,
                minLength: minLength(6),
                loginRegex
            },
            password: {
                required,
                minLength: minLength(6)
            },
            repeatPassword: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    }
</script>

<style lang="scss">
    .buttons {
        display: flex;
    }
</style>
