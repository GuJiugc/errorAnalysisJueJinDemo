<template>
    <div>
        测试组件
    </div>
</template>

<script setup>
import { defineExpose } from 'vue';

function testFn() {
    const z = 9998
    return z
}

function testFn2() {
    const a = testFn()
    return a.split('')
}

defineExpose({
    testFn,
    testFn2
})
</script>