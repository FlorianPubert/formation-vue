<template>
  <div class="sidebar">
    Standard Sidebar
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Standard',
});
</script>

<style scoped>
  .sidebar {
    font-size: 50px;
    transform: rotate(90deg);
  }
</style>
