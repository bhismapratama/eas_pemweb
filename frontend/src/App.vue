<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
.router-link-active {
  @apply bg-gray-900 text-white hover:text-white hover:bg-gray-900
}
</style>