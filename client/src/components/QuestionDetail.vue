<template>
  <v-flex xs12 sm8 offset-sm2 class="mt-3 mb-3">
    <v-card>
      <v-toolbar color="orange" dark>
        <v-toolbar-title>{{question.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-show="isLogin" style="font-size:20px">
          <router-link to="" style="text-decoration:none; color:white">
            <i @click="upVote" class="far fa-thumbs-up"></i>  
          </router-link>
          {{voteUpTotal}}
          <router-link to="" style="text-decoration:none; color:white">
            <i @click="downVote" class="far fa-thumbs-down ml-3"></i> 
          </router-link>
          {{voteDownTotal}}          
        </div>
        <div v-show="!isLogin" style="font-size:20px">
          <router-link to="" style="text-decoration:none; color:gray">
            <i class="far fa-thumbs-up"></i>  
          </router-link>
          {{voteUpTotal}}
          <router-link to="" style="text-decoration:none; color:gray">
            <i class="far fa-thumbs-down ml-3"></i> 
          </router-link>
          {{voteDownTotal}}          
        </div>
      </v-toolbar>

      <v-list three-line>
        <v-container>
          <p>{{question.content}}</p>
          <h5>Asked by {{question.author}} at {{time}}</h5>
        </v-container>
        <div v-show="check">
          <v-btn small @click="editQuestion()">Edit</v-btn>
          <v-btn small @click="deleteQuestion()">Delete</v-btn>
        </div>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import axios from '@/api/Server.js'
import moment from 'moment'
import Swal from 'sweetalert2'

export default {
  props: [],
  data () {
    return {
      question: {
        voteUp: 0,
        voteDown: 0
      }
    }
  },
  methods: {
    fetchDetail() {
      console.log(localStorage.id)
      axios({
        url: `questions/${this.$route.params.questionId}`,
        method: 'get',
        headers: {
          userId: localStorage.id
        }
      })
      .then(({data}) => {
        console.log(data.data)
        this.question = data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    upVote() {
      console.log('upvote')
      axios({
        url: `questions/${this.$route.params.questionId}/upvote`,
        method: 'patch',
        data: {
          userId: localStorage.id
        }
      })
      .then(({data}) => {
        console.log(data.data)
        this.fetchDetail()
      })
      .catch(err => {
        console.log(err)
      })
    },
    downVote() {
      console.log('downvote')
      axios({
        url: `questions/${this.$route.params.questionId}/downvote`,
        method: 'patch',
        data: {
          userId: localStorage.id
        }
      })
      .then(({data}) => {
        console.log(data.data)
        this.fetchDetail()
      })
      .catch(err => {
        console.log(err)
      })
    },
    editQuestion() {
      console.log('edit')
      this.$router.push(`/question/${this.$route.params.questionId}/edit`)
    },
    deleteQuestion() {
      console.log('delete')
      Swal.fire({
        title: 'Delete this question ?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            url: `/questions/${this.$route.params.questionId}`,
            method: 'delete'
          })
          .then(({data}) => {
            console.log(data)
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
          })
          Swal.fire(
            'Deleted!',
            'Your question has been deleted.',
            'success'
          )
        }
      })
    }
  },

  created() {
    this.fetchDetail()
  },
  
  computed: {
    voteUpTotal () {
      return this.question.voteUp.length
    },
    voteDownTotal () {
      return this.question.voteDown.length
    },
    time() {
      moment(this.question.createdAt).format();  
      return moment(this.question.createdAt).startOf('day').fromNow(); 
    },
    check() {
      if(this.question.userId === localStorage.id) return true
      else return false
    },
    isLogin() {
      if (this.$store.state.isLogin === true) return true
      else return false
    }
  }
}
</script>

<style>

</style>
