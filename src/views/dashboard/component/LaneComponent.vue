<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/require-prop-types -->
<!-- eslint-disable vue/html-quotes -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/valid-v-bind -->
<template>
  <v-row no-gutters class="row">
    <v-col
      cols="12"
      sm="1"
    >
      <v-card
        class="pa-3"
        color="#3f3f3f"
        min-width="100%"
        min-height="100%"
      >
        <v-card-title class="white--text cardtext">
          <br>
        </v-card-title>
        <v-card-text class="white--text cardtext">
          <h1>{{ zone }}</h1>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="2"
    >
      <v-card
        class="pa-3"
        color="#3f3f3f"
        min-width="100%"
        min-height="100%"
      >
        <v-card-title class="white--text cardtext">
          <br>
        </v-card-title>
        <v-card-text class="white--text cardtext">
          <h1>כמות</h1>
          <h1>מהירות</h1>
          <h1>תפוסה</h1>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-for="item in rawdata"
           cols="12"
           sm="1"
    >
      <v-card
        class="pa-3"
        color="#3f3f3f"
        min-width="100%"
        min-height="100%"
      >
        <v-card-title class="white--text cardtext">
          <h1>{{ item.name }}</h1>
        </v-card-title>
        <v-card-text class="white--text">
          <h3>{{ item.volValue }}</h3>
          <h3>{{ item.speedValue }}</h3>
          <h3>{{ item.occValue }}</h3>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="2"
    >
      <v-card
        class="pa-3"
        min-width="100%"
        min-height="100%"
        :style="`background:-webkit-linear-gradient(left, ${color} ,#3f3f3f)`"
      >
        <v-card-text class="white--text">
          <v-card-text>
            <br>
            <h1>--</h1>
            <br>
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="3"
    >
      <v-card
        min-width="100%"
        min-height="100%"
        class="pa-3"
        :color="color"
      >
        <v-card-text class="white--text">
          <v-card-text>
            <br>
            <h1>------------</h1>
            <br>
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    name: 'LaneComponent',
    props: ['zone', 'data'],
    data () {
      return {
        linearcolor: 'linear-gradient(to left, red, blue);',
        rawdata: [],

      }
    },
    computed: {
      color () {
        if (this.rawdata[0].volValue > 100) {
          return '#bc1c23'
        } else if (this.rawdata[0].volValue > 50) {
          return '#9b9822'
        } else {
          return '#3c8944'
        }
      },
    },
    created () {
      for (const [index, [key, value]] of Object.entries(Object.entries(this.data))) {
        this.rawdata.push({ name: key, volValue: value.volValue, speedValue: value.speedValue, occValue: value.occValue, i: index })
      }
      this.rwadata = this.rawdata.sort((a, b) => a.name - b.name)
    },
  }
</script>
<style scoped>
.pa-3{
    /* height: 100px !important; */
    align-content: center;
    border-radius: 0px !important;
    margin-top: 0px !important;
    margin-bottom: 0px !important;
}
.lin{
    background:-webkit-linear-gradient(left,v-bind(color),#3f3f3f)
}
.row{
}
.cardtext{
    font-size: x-small;
    text-align: center;
    font-family: initial;
}
</style>
