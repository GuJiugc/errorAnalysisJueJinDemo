<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
import { defineProps, ref, onBeforeMount } from 'vue'
const props = defineProps({
  msg: {
    type: String,
    default: ''
  }
})

const x = ref('')

onBeforeMount(() => {
  console.log(props.msg.join(','))
})

</script>

<style scoped>

</style>
