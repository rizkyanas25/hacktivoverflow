<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="orange">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model="email" name="email" label="Email" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="password" name="password" label="Password" id="password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '@/api/Server.js'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let timerInterval
      Swal.fire({
        title: 'Logging in...',
        timer: 2000,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.timer
        ) {
          axios({
            method: 'post',
            url: '/login',
            data: {
              email: this.email,
              password: this.password
            },
            headers: {
              token: localStorage.token
            }
          })
          .then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('email', data.email)
            localStorage.setItem('name', data.name)
            localStorage.setItem('id', data.id)
            localStorage.setItem('profilePic', data.profilePic)
            this.$store.commit('login')
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
          })
          console.log('I was closed by the timer')
        }
      })
      
    }
  }
}
</script>

<style>

</style>
