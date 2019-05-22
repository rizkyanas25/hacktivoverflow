<template>
  <div style="text-decoration:none; color:black"> 
    <div>
      <p>{{answer.content}}</p>
      <h5>Answered by {{answer.author}} at {{time}}</h5>
    </div>

    <div v-show="isLogin" class="right" style="margin-right:30px; margin-top:-30px">

      <router-link to="" style="text-decoration:none; color:black">
        <i @click="upVote" class="far fa-thumbs-up"></i>  
      </router-link>
      {{answer.voteUp.length}}
      <router-link to="" style="text-decoration:none; color:black">
        <i @click="downVote" class="far fa-thumbs-down ml-3"></i> 
      </router-link>
      {{answer.voteDown.length}}      

    </div>

    <div v-show="!isLogin" class="right" style="margin-right:30px; margin-top:-30px">

      <router-link to="" style="text-decoration:none; color:grey">
        <i class="far fa-thumbs-up"></i>  
      </router-link>
      {{answer.voteUp.length}}
      <router-link to="" style="text-decoration:none; color:grey">
        <i class="far fa-thumbs-down ml-3"></i> 
      </router-link>
      {{answer.voteDown.length}}      

    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import axios from '@/api/Server.js'
import moment from 'moment'


export default {
  props: ['answer'],
  data () {
    return {
      answerUpdated: {}
    }
  },
  methods: {
    fetchAnswer () {
      axios({
        url: `questions/${this.$route.params.questionId}/answers/${this.answer._id}`,
        method: get
      })
      .then(({data}) => {
        this.answerUpdated = data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    upVote() {
      console.log('upvote')
      axios({
        url: `questions/${this.$route.params.questionId}/answers/${this.answer._id}/upvote`,
        method: 'patch',
        data: {
          userId: localStorage.id
        }
      })
      .then(({data}) => {
        console.log(data.data)
        this.$emit('fetch')
        // this.$router.push(`/question/${this.$route.params.questionId}`)
      })
      .catch(err => {
        console.log(err)
      })
    },
    downVote() {
      console.log('downvote')
      axios({
        url: `questions/${this.$route.params.questionId}/answers/${this.answer._id}/downvote`,
        method: 'patch',
        data: {
          userId: localStorage.id
        }
      })
      .then(({data}) => {
        console.log(data.data)
        this.$emit('fetch')
        // this.$router.push(`/question/${this.$route.params.questionId}`)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    time() {
      moment(this.answer.createdAt).format();  
      return moment(this.answer.createdAt).startOf('day').fromNow(); 
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
