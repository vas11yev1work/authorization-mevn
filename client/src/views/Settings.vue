<template>
    <div class="settings-wrap">
        <h1>Settings</h1>
        <span>Имя и фамилия</span>
        <div>
            <label>
                <input type="text" v-model="name" placeholder="Имя">
            </label>
            <label>
                <input type="text" v-model="surname" placeholder="Фамилия">
            </label>
            <button @click="changeName">Сохранить</button>
        </div>
        <span>Сменить пароль</span>
        <form>
            <label>
                <input autocomplete="off" type="password" placeholder="Текущий пароль">
            </label>
            <label>
                <input autocomplete="off" type="password" placeholder="Новый пароль">
            </label>
            <label>
                <input autocomplete="off" type="password" placeholder="Повторите новый пароль">
            </label>
            <button>Сменить пароль</button>
        </form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data: () => ({
            name: '',
            surname: ''
        }),
        methods: {
            async changeName() {
                await axios.put('/api/users/currentUser',{
                    name: this.name,
                    surname: this.surname
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.getCurrentUser();
            },
            getCurrentUser() {
                axios.get('/api/users/currentUser', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(r => {
                    this.name = r.data.name;
                    this.surname = r.data.surname;
                })
            }
        },
        created() {
            this.getCurrentUser();
        }
    }
</script>
