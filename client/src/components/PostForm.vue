<template>
    <v-container justify-center>
      <form>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="title"
            label="title"
            placeholder="Title"
            solo
          ></v-text-field>
        </v-flex>

        <v-flex xs6>
          <v-textarea
            v-model="content"
            solo
            name="input-7-4"
            placeholder="Type your question"
          ></v-textarea>
        </v-flex>

        <v-btn v-show="!edit" @click="postQuestion">submit</v-btn>
        <v-btn v-show="edit" @click="editQuestion">update</v-btn>
        <!-- <v-btn @click="clear">clear</v-btn> -->
      </form>
    </v-container>
</template>

<script>

import axios from '@/api/Server.js'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    postQuestion () {
      axios({
        url: '/questions',
        method: 'post',
        data: {
          title: this.title,
          content: this.content,
          author: localStorage.name,
          userId: localStorage.id
        },
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.$router.push('/')
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000
        });
        Toast.fire({
          type: 'success',
          title: 'Question Posted!'
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    editQuestion () {
      axios({
        url: `/questions/${this.$route.params.questionId}/edit`,
        method: 'patch',
        data: {
          title: this.title,
          content: this.content
        }
      })
      .then(({data}) => {
        console.log(data)
        this.$router.push('/')
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000
        });
        Toast.fire({
          type: 'success',
          title: 'Question Updated'
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    if (this.edit) {
      axios({
        url: `/questions/${this.$route.params.questionId}`,
        method: 'get'
      })
      .then(({data}) => {
        console.log(data.data)
        this.title = data.data.title
        this.content = data.data.content
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    edit() {
      if (this.$route.params.questionId !== undefined) return true
      else return false
    }
  }

}
</script>

<style>

</style>
