<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div >
      {{part.description}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { defineComponent } from 'vue';
import Namespace from '@/store/namespace';

export default defineComponent({
  name: 'PartInfo',
  props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  computed: {
    ...mapState(Namespace.ROBOTS, [
      'heads',
      'arms',
      'torsos',
      'bases',
    ]),
    part() {
      const { partType, id } = this;
      let parts;
      switch (partType) {
        case 'heads': {
          parts = this.heads;
          break;
        }
        case 'arms': {
          parts = this.arms;
          break;
        }
        case 'torsos': {
          parts = this.torsos;
          break;
        }
        case 'bases': {
          parts = this.bases;
          break;
        }
        default: {
          parts = this.heads;
          break;
        }
      }
      return parts.find((part) => part.id === +id);
    },
  },
});
</script>
