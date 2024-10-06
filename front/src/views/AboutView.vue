<template>
  <div>
    AboutView
    <button @click="test">test</button>
    <Test ref="testRef"></Test>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Test from './Test.vue'

const x = ref(9)
const testRef = ref(null)

function test() {
  x.forEach(v => v)
}

onMounted(() => {
  setTimeout(() => {
    const a = testRef.value.testFn2()
  }, 1000)
  testRef.value.testFn2()
})

</script>
