<template>
  <v-flex xs12 sm8 offset-sm2 class="mt-3 mb-3">
      <v-card>
        <v-list three-line>
          <div v-for="answer in answers" :key="answer.id" style="margin:10px 25px 10px 25px">
            <AnswerCard @fetch="fetchAnswers" :answer="answer"/>
          </div>
        </v-list>
      </v-card>
    </v-flex>
</template>

<script>
import axios from '@/api/Server.js'
import AnswerCard from '@/components/AnswerCard.vue'

export default {
  components: {
    AnswerCard
  },
  data () {
    return {
      answers: []
    }
  },
  methods: {
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
    }
  },
  created () {
    this.fetchAnswers()
  }

}
</script>

<style>

</style>
