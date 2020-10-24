<template>
  <div>
    <h2>Arms</h2>
    The arms are how your robot will interact with the world.
    They come in a variety of shapes and functions.
    <div v-for="(arm, idx) in arms" :key="idx">
      <h4>{{arm.title}}</h4>
      <div>{{arm.description}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { defineComponent } from 'vue';
import Namespace from '@/store/namespace';

export default defineComponent({
  name: 'RobotArms',
  computed: {
    ...mapState(Namespace.ROBOTS, [
      'arms',
    ]),
  },
});
</script>
