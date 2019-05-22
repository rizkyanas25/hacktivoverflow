<template>
  <div>
    <QuestionDetail/>
    <v-flex xs12 sm8 offset-sm2 class="mt-3 mb-3">
      <v-card>
        <v-list three-line>
          <div v-if="answers.length===0" style="text-align:center">
            <h4>There's no answer yet, submit yours</h4>
          </div>
          <div v-for="answer in answers" :key="answer.id" style="margin:10px 25px 10px 25px">
            <AnswerCard @fetch="fetchAnswers" :answer="answer"/>
          </div>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 sm8 offset-sm2 class="mt-3 mb-3">
      <form>
        <v-flex>
          <v-textarea
            v-model="answer"
            solo
            name="input-7-4"
            label="Answer this question..."
          ></v-textarea>
        </v-flex>

        <v-btn v-show="isLogin" @click="postAnswer">Submit</v-btn>
        <v-btn v-show="!isLogin" @click="toLogin">Login First</v-btn>
      </form>
    </v-flex>
  </div>
</template>

<script>
import QuestionDetail from '@/components/QuestionDetail.vue'
import AnswerCard from '@/components/AnswerCard.vue'
import axios from '@/api/Server.js'
import Swal from 'sweetalert2'

export default {
  components: {
    QuestionDetail,
    AnswerCard
    // AnswerList
  },
  data () {
    return {
      answer: '',
      answers: []
    }
  },
  methods: {
    postAnswer () {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000
      });
      axios({
        url: `/questions/${this.$route.params.questionId}/answers`,
        method: 'post',
        data: {
          content: this.answer,
          author: localStorage.name,
          userId: localStorage.id,
        }
      })
      .then(({data}) => {
        console.log(data)
        this.answer = ''
        this.fetchAnswers()
        this.$router.push(`/question/${this.$route.params.questionId}`)
        Toast.fire({
          type: 'success',
          title: 'Answer Posted'
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    fetchAnswers () {
      axios({
        url: `questions/${this.$route.params.questionId}/answers`,
        method: 'get'
      })
      .then(({data}) => {
        console.log(data.data)
        this.answers = data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    toLogin() {
      this.$router.push('/login')
    }
  },
  created () {
    this.fetchAnswers()
  },
  computed: {
    isLogin() {
      if (this.$store.state.isLogin === true) return true
      else return false
    }
  }
}
</script>

<style>

</style>
