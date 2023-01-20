<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/valid-v-bind -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="3">
        <v-select v-model="selectedBox"
                  :items="boxes"
                  label="שם גלאי"
                  outlined
                  v-on:change="changeBox"
        />
      </v-col>
    </v-row>
    <grid-layout :layout.sync="layout"
                 :col-num="12"
                 :is-draggable="draggable"
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
        <lane-component :zone="item.name" :data="item.data" />
      </grid-item>
      <grid-item
        :static="false"
        :x="8"
        :y="0"
        :w="4"
        :h="6"
        :i="7"
      >
        <img class="img" :src="'/junction.jpeg'">
      </grid-item>
    </grid-layout>
  </v-container>
</template>

<script>
  import { dataService } from '../../services/data.service'
  import VueGridLayout from 'vue-grid-layout'
  import LaneComponent from './component/LaneComponent.vue'
  export default {
    name: 'Dashboard',
    components: {
      LaneComponent,
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
    },
    data () {
      return {
        selectedBox: null,
        layout: [],
        boxes: [],
        draggable: true,
        resizable: true,
        index: 0,
        tabs: 0,
      }
    },
    created () {
      dataService.getPoints().then(data => {
        this.boxes = data
        this.selectedBox = this.boxes[0]
        dataService.getBoxData(this.selectedBox).then(data => {
          for (const [index, [key, value]] of Object.entries(Object.entries(data.Result))) {
            this.layout.push({ x: 0, y: parseInt(index), w: 8, h: 1, i: `${index}`, static: false, name: key, data: value })
          }
        })
      })
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      itemTitle (item) {
        let result = item.i
        if (item.static) {
          result += ' - Static'
        }
        return result
      },
      changeBox (a) {
        this.layout = []
        dataService.getBoxData(this.selectedBox).then(data => {
          for (const [index, [key, value]] of Object.entries(Object.entries(data.Result))) {
            this.layout.push({ x: 0, y: parseInt(index), w: 8, h: 1, i: `${index}`, static: false, name: key, data: value })
          }
        })
      },
    },
  }
</script>
<style scoped>
.img{
  width:100%;
  height:100%;
}
.vue-grid-layout {
    background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
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
