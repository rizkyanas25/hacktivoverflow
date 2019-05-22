<template>
  
    <v-flex xs12 sm8 offset-sm2 class="mt-3 mb-3">
      <v-card>
        <v-toolbar color="orange" dark>
          <v-toolbar-title>Question List</v-toolbar-title>
        </v-toolbar>

        <v-list three-line>
          <div v-for="question in questions" :key="question.id" style="margin:10px 25px 10px 25px">
            <QuestionCard :question="question"/>
          </div>
        </v-list>
      </v-card>
    </v-flex>

</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
import Axios from '@/api/Server.js'
export default {
  data () {
    return {
      questions: []
    }
  },
  components: {
    QuestionCard
  },
  methods: {
    fetchQuestion () {
      Axios({
        url: '/questions',
        method: 'get',
      })
      .then(({ data }) => {
        console.log(data.data)
        this.questions = data.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.fetchQuestion()
  }
}
</script>

<style>

</style>
