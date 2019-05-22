<template>
  <a @click.prevent="toDetail" style="text-decoration:none; color:black"> 
    <div>
      <h1>{{question.title}}</h1>
      <h5>Ask by {{question.author}} at {{time}}</h5>
    </div>

    <div class="right" style="margin-right:30px; margin-top:-30px">

    <v-badge color="orange" right class="mr-4">
      <i class="far fa-eye"></i>
      <template v-slot:badge>
        <span>{{question.viewers.length}}</span>
      </template>
    </v-badge>

    <v-badge color="orange" right class="mr-4">
      <i class="far fa-thumbs-up"></i>
      <template v-slot:badge>
        <span>{{question.voteUp.length-question.voteDown.length}}</span>
      </template>
    </v-badge>

    <v-badge color="orange" right >
      <i class="far fa-comments"></i>
      <template v-slot:badge>
        <span>{{question.answers.length}}</span>
      </template>
    </v-badge>

    </div>
    <v-divider></v-divider>
  </a>
</template>

<script>
import moment from 'moment'
export default {
  props: ['question'],
  methods: {
    toDetail() {
      this.$router.push(`/question/${this.question._id}`)
    }
  },
  computed: {
    time() {
      moment(this.question.createdAt).format();  
      return moment(this.question.createdAt).startOf('day').fromNow(); 
    }
  }
}
</script>

<style>

</style>
