<template>
  <div class="content">
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content" v-if="selectedRobot.head">
          <div class="top-row">
            <img :src="selectedRobot.head.src"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
            <img :src="selectedRobot.torso.src"/>
            <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src"/>
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']">
        <PartSelector
          v-if="heads.length > 0"
          :parts="heads"
          :position="'top'"
          @partSelected="part => selectedRobot.head=part"/>
      </div>
    </div>
    <div class="middle-row">
      <PartSelector
        v-if="arms.length > 0"
        :parts="arms"
        :position="'left'"
        @partSelected="part => selectedRobot.leftArm=part"/>
      <PartSelector
        v-if="torsos.length > 0"
        :parts="torsos"
        :position="'center'"
        @partSelected="part => selectedRobot.torso=part"/>
      <PartSelector
        v-if="arms.length > 0"
        :parts="arms"
        :position="'right'"
        @partSelected="part => selectedRobot.rightArm=part"/>
    </div>
    <div class="bottom-row">
      <PartSelector
        v-if="bases.length > 0"
        :parts="bases"
        :position="'bottom'"
        @partSelected="part => selectedRobot.base=part"/>
    </div>
  </div>
</template>

<script lang="ts">
import { RobotPart } from '@/models/RobotPart';
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { Robot } from '../models/Robot';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';
import ActionTypes from '../store/action-types';
import Namespace from '../store/namespace';

export default defineComponent({
  name: 'RobotBuilder',
  components: { PartSelector, CollapsibleSection },
  created() {
    this.getParts();
  },
  data() {
    return {
      cart: Array<Robot>(),
      selectedRobot: {
        head: {} as RobotPart,
        leftArm: {} as RobotPart,
        torso: {} as RobotPart,
        rightArm: {} as RobotPart,
        base: {} as RobotPart,
      } as Robot,
    };
  },
  methods: {
    ...mapActions(Namespace.ROBOTS, {
      getParts: ActionTypes.GET_PARTS,
      addRobotToCart: ActionTypes.ADD_ROBOT_TO_CART,
    }),
    addToCart(): void {
      this.addRobotToCart({
        ...this.selectedRobot,
        cost: this.robotCost,
      } as Robot).then(() => this.$router.push('/cart'));
    },
    getPreviousIndex(index: number, length: number): number {
      const newIndex = index - 1;
      return newIndex < 0 ? length - 1 : newIndex;
    },
    getNextIndex(index: number, length: number): number {
      const newIndex = index + 1;
      return newIndex > length - 1 ? 0 : newIndex;
    },
  },
  computed: {
    ...mapState(Namespace.ROBOTS, [
      'heads',
      'arms',
      'torsos',
      'bases',
    ]),
    saleBorderClass(): string {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
    robotCost(): number {
      if (!this.selectedRobot) { return 0; }
      return this.selectedRobot.head.cost
      + this.selectedRobot.leftArm.cost
      + this.selectedRobot.rightArm.cost
      + this.selectedRobot.torso.cost
      + this.selectedRobot.base.cost;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scss scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.part img {
  width:165px;
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  width:210px;
  padding:3px;
  font-size:16px;
}
.sale-border {
  border: 3px solid red;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
