<template>
  <div>
    <div class="header">
      <span v-if="open" @click="open = !open" >&#x25B2; Collapse</span>
      <span v-if="!open" @click="open = !open">&#x25BC; Expand</span>
    </div>
    <slot v-if="open">
      <div>DefaultContent</div>
    </slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CollapsibleSection',
  data() {
    return { open: true };
  },
});
</script>

<style scoped>
  .header {
    background-color: #bbb;
    padding: 3px;
    cursor: pointer;
  }
</style>
