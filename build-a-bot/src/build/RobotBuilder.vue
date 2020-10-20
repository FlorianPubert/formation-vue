<template>
  <div class="content">
    <button @click=addToCart class="add-to-cart">Add to Cart</button>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']">
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale !</span>
        </div>
        <img :src="selectedRobot.head.src" title="head"/>
        <button @click="selectPreviousHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" title="left arm"/>
        <button @click="selectPreviousLeftArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="left arm"/>
        <button @click="selectPreviousTorso()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" title="left arm"/>
        <button @click="selectPreviousRightArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" title="left arm"/>
        <button @click="selectPreviousBase()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{robot.head.title}}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import availableParts from '../data/parts';
import { Robot } from '../models/Robot';

export default defineComponent({
  name: 'RobotBuilder',
  data() {
    return {
      cart: new Array<Robot>(),
      availableParts,
      selectedHeadIndex: 0,
      selectedLeftArmIndex: 0,
      selectedRightArmIndex: 0,
      selectedTorsoIndex: 0,
      selectedBaseIndex: 0,
    };
  },
  methods: {
    robotCost(): number {
      return this.selectedRobot.head.cost
      + this.selectedRobot.leftArm.cost
      + this.selectedRobot.rightArm.cost
      + this.selectedRobot.torso.cost
      + this.selectedRobot.base.cost;
    },
    addToCart(): void {
      const robotToAdd = {
        ...this.selectedRobot,
        cost: this.robotCost(),
      } as Robot;
      this.cart.push(robotToAdd);
    },
    selectNextHead(): void {
      this.selectedHeadIndex = this.getNextIndex(this.selectedHeadIndex, this.availableParts.heads.length);
    },
    selectPreviousHead(): void {
      this.selectedHeadIndex = this.getPreviousIndex(this.selectedHeadIndex, this.availableParts.heads.length);
    },
    selectNextLeftArm(): void {
      this.selectedLeftArmIndex = this.getNextIndex(this.selectedLeftArmIndex, this.availableParts.arms.length);
    },
    selectPreviousLeftArm(): void {
      this.selectedLeftArmIndex = this.getPreviousIndex(this.selectedLeftArmIndex, this.availableParts.arms.length);
    },
    selectNextTorso(): void {
      this.selectedTorsoIndex = this.getNextIndex(this.selectedTorsoIndex, this.availableParts.torsos.length);
    },
    selectPreviousTorso(): void {
      this.selectedTorsoIndex = this.getPreviousIndex(this.selectedTorsoIndex, this.availableParts.torsos.length);
    },
    selectNextRightArm(): void {
      this.selectedRightArmIndex = this.getNextIndex(this.selectedRightArmIndex, this.availableParts.arms.length);
    },
    selectPreviousRightArm(): void {
      this.selectedRightArmIndex = this.getPreviousIndex(this.selectedRightArmIndex, this.availableParts.arms.length);
    },
    selectNextBase(): void {
      this.selectedBaseIndex = this.getNextIndex(this.selectedBaseIndex, this.availableParts.bases.length);
    },
    selectPreviousBase(): void {
      this.selectedBaseIndex = this.getPreviousIndex(this.selectedBaseIndex, this.availableParts.bases.length);
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
    selectedRobot(): Robot {
      return {
        head: this.availableParts.heads[this.selectedHeadIndex],
        leftArm: this.availableParts.arms[this.selectedLeftArmIndex],
        rightArm: this.availableParts.arms[this.selectedRightArmIndex],
        torso: this.availableParts.torsos[this.selectedTorsoIndex],
        base: this.availableParts.bases[this.selectedBaseIndex],
      } as Robot;
    },
    saleBorderClass(): string {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  right: 30px;
  width: 220px;
  padding: 3px;
  font-size: 16px;
}
td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.sale-border {
  border: 3px solid red;
}
</style>
