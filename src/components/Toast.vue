<template>
  <section class="toast">
    <span v-html="html"></span>
  </section>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return{
        html: '',

      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>