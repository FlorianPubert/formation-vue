<template>
  <div class="sidebar">
    Build Sidebar
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Build',
});
</script>

<style scoped>
  .sidebar {
    font-size: 50px;
    transform: rotate(90deg);
    color: green;
  }
</style>
