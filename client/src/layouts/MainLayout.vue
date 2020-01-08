<template>
    <div class="layout main-layout">
        <Header :name="name" :surname="surname"/>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Header from "../components/Header";

    export default {
        data: () => ({
            name: '',
            surname: ''
        }),
        components: {
            Header
        },
        created() {
            axios.get('/api/users/currentUser', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(r => {
                this.name = r.data.name;
                this.surname = r.data.surname;
            })
        }
    }
</script>
