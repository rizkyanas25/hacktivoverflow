<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="orange">
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model="name" name="name" label="Name" type="text"></v-text-field>
              <v-text-field prepend-icon="person" v-model="email" name="email" label="Email" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="password" name="password" label="Password" id="password" type="password"></v-text-field>
              <label>Choose your picture:</label><br>
              <input v-on:change="setProfilePic" type="file" id="file" ref="profilePic"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" @click="register">Submit</v-btn>
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
      name: '',
      email: '',
      password: '',
      profilePic: ''
    }
  },
  methods: {
    register () {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('profilePic', this.profilePic)
      formData.append('email', this.email)
      formData.append('password', this.password)
      console.log(formData)
      axios({
        method: 'post',
        url: `/register`,
        data : formData,
      })
      .then(({ data }) => {
        console.log(data)
        this.$router.push('/login')
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'User created, please login',
          showConfirmButton: false,
          timer: 2000
        })
      })
      .catch(err => {
        console.log(err)
      })

    },
    setProfilePic () {
      this.profilePic = this.$refs.profilePic.files[0]
    }
  }
}
</script>

<style>

</style>
