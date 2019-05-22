<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <div style="margin-top:-10px">
          <v-img src="https://cdn1.iconfinder.com/data/icons/animal-face/512/fox-512.png" width="25%" style=""></v-img>
        </div>
        <div style="margin-top:-50px; margin-left:65px">
          <router-link to="/" style="text-decoration:none">
            <span style="color:orange">hacktiv</span>
            <span class="font-weight-light" style="color:black">overflow</span>
          </router-link>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs3 sm3 md3 style="margin-left:-60px; margin-top:10px">
        <v-form v-on:submit.prevent="search">
          <v-text-field
            label="search"
            placeholder="Search"
            solo
          ></v-text-field>
        </v-form>
      </v-flex>
      <v-spacer></v-spacer>
      <div v-show="!isLogin" xs3 sm3 md3>
        <v-btn flat small @click.prevent="toLogin">
          <span class="">Login</span>
        </v-btn>
        <v-btn small color="orange" @click.prevent="toRegister">
          <span class="">Register</span>
        </v-btn>
      </div>
      <div v-show="isLogin" xs3 sm3 md3>
        <v-btn small color="white" @click.prevent="toAsk">
          <span class="">Ask something</span>
        </v-btn>
        <v-btn flat small color="red" @click.prevent="logout">
          <span class="">Logout</span>
        </v-btn>
      </div>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-actions class="grey darken-3 justify-center">
        <strong class="mr-2">Rizky Anas Bukhori</strong>&copy;2018 
      </v-card-actions>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      loggedIn: false
    }
  },
  methods: {
    checkLoggedIn () {
      if (localStorage.token !== undefined) {
        console.log('masuk')
        // this.loggedIn = true
        this.$store.commit('login')
      } else {
        // this.loggedIn = false
        this.$store.commit('logout')
      }
    },
    toLogin () {
      this.$router.push('/login')
    },
    toRegister () {
      this.$router.push('/register')
    },
    toAsk () {
      this.$router.push('/ask')
    },
    logout () {
      Swal.fire({
        title: 'Logging out?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, gotta go!'
      }).then((result) => {
        if (result.value) {
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          localStorage.removeItem('name')
          localStorage.removeItem('profilePic')
          localStorage.removeItem('id')
          console.log('logout')
          this.$store.commit('logout')
          this.$router.push('/')
          // Swal.fire(
          //   'Bye!',
          //   'success'
          // )
        }
      })
    },
    search () {
      console.log('lola')
    }
  },
  mounted () {
    this.checkLoggedIn()
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>
