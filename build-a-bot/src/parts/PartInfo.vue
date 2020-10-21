<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div >
      {{part.description}}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Constants from '../data/parts';

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
    part() {
      const { partType, id } = this;
      let parts;
      switch (partType) {
        case 'heads': {
          parts = Constants.HEADS;
          break;
        }
        case 'arms': {
          parts = Constants.ARMS;
          break;
        }
        case 'torsos': {
          parts = Constants.TORSOS;
          break;
        }
        case 'bases': {
          parts = Constants.BASES;
          break;
        }
        default: {
          parts = Constants.HEADS;
          break;
        }
      }

      return parts.find((part) => part.id === +id);
    },
  },
});
</script>
