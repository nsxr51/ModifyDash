<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <grid-layout :layout.sync="layout"
               :col-num="12"
               :is-draggable="false"
               :is-resizable="false"
               :vertical-compact="true"
               :use-css-transforms="true"
               :margin="[0,0]"
               :responsive="true"
  >
    <grid-item v-for="item in layout"
               :static="item.static"
               :x="item.x"
               :y="item.y"
               :w="item.w"
               :h="item.h"
               :i="item.i"
    >
      {{ item.name }}
      <chart :id="item.i" />
    </grid-item>
  </grid-layout>
</template>

  <script>
  import VueGridLayout from 'vue-grid-layout'
  export default {
    name: 'Analasys',
    components: {
      Chart: () => import('../component/Chart'),
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
    },
    data () {
      return {
        layout: [{ x: 0, y: 0, w: 12, h: 4, i: '0', static: false, name: 'test' },
                 { x: 0, y: 0, w: 12, h: 4, i: '1', static: false, name: 'test' }],
      }
    },
  }
</script>
<style scoped>
.vue-grid-layout {
}
.vue-grid-item:not(.vue-grid-placeholder) {
    border: 1px solid black;
}
.vue-grid-item .resizing {
    opacity: 0.9;
}
.vue-grid-item .static {
    background: #cce;
}
.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}
.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}
.vue-grid-item .minMax {
    font-size: 12px;
}
.vue-grid-item .add {
    cursor: pointer;
}
.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
