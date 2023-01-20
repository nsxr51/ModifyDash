<template>
  <v-container
    fluid
  >
    <v-container fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="2">
          <v-select v-model="selectedBox"
                    :items="boxes"
                    label="שם גלאי"
                    outlined
                    @change="changeBox"
          />
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            v-model="selectedZone"
            :items="zones"
            label="נתיב"
            outlined
          />
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            v-model="selectedCarTypes"
            :items="carTypes"
            label="type"
            outlined
          />
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            v-model="selectedAtributes"
            :items="atributes"
            label="שם גלאי"
            outlined
          />
        </v-col>
        <v-col
          cols="12"
          sm="2"
          md="2"
        >
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="תאריכים"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="dates"
              no-title
              scrollable
              range
            >
              <v-spacer />
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="2"
        >
          <v-btn
            class="ma-1"
            color="primary"
            @click="submit"
          >
            החל
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="top-row">
        <v-col cols="12" sm="12">
          <div :id="`chartdiv${id}`" class="hello" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

    <script>
  import * as am5 from '@amcharts/amcharts5'
  import * as am5xy from '@amcharts/amcharts5/xy'
  // eslint-disable-next-line camelcase
  import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
  import moment from 'moment'
  import { dataService } from '../../../services/data.service'
  export default {
    name: 'Chart',
    props: ['id'],
    data () {
      return {
        series: null,
        date: [],
        dates: [],
        carTypes: [],
        atributes: ['volume', 'speed', 'occupancy'],
        boxes: [],
        zones: [],
        selectedBox: null,
        selectedZone: null,
        selectedAtributes: 'volume',
        selectedCarTypes: '',
        chartData: {
          series: [
            {
              name: 'series-1',
            },
          ],
        },
        chartOptions: {
          lineSmooth: false,
          height: '200px',
          fullWidth: true,
          axisX: {
            type: this.$chartist.FixedScaleAxis,
            divisor: 5,
            labelInterpolationFnc (value) {
              return moment(value).format('MMM D')
            },
          },
        },
        respOptions: [
          ['screen and (min-width: 641px) and (max-width: 1024px)', {
            showPoint: false,
            axisX: {
              labelInterpolationFnc: function (value) {
                return 'Week ' + value
              },
            },
          }],
          ['screen and (max-width: 640px)', {
            showLine: false,
            axisX: {
              labelInterpolationFnc: function (value) {
                return 'W' + value
              },
            },
          }],
        ],
      }
    },
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    created () {
      var d = new Date()
      d.setDate(d.getDate() - 5)
      var datestringfrom = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2)
      this.dates = [datestringfrom, datestringfrom]
      dataService.getPoints().then(data => {
        this.boxes = data
        this.selectedBox = this.boxes[0]
        dataService.getZpnesByPoint(this.selectedBox).then(data => {
          this.zones = data
          this.selectedZone = this.zones[0]
        })
        dataService.getTypesByPoint(this.selectedBox).then(data => {
          this.carTypes = data
          this.selectedCarTypes = this.carTypes[0]
        })
      })
    },
    async mounted () {
      var root = am5.Root.new(`chartdiv${this.id}`)
      root.setThemes([
        am5themes_Animated.new(root),
      ])

      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          wheelY: 'zoomX',
          layout: root.verticalLayout,
          maxTooltipDistance: 0,
        }),
      )

      // Define data
      // Create Y-axis
      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          extraTooltipPrecision: 1,
          renderer: am5xy.AxisRendererY.new(root, {}),
        }),
      )

      // Create X-Axis
      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: 'hour', count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {}),
        }),
      )

      xAxis.get('dateFormats').day = 'MM/dd'
      xAxis.get('periodChangeDateFormats').day = 'MMM'

      // Create series
      function createSeries (name, field) {
        var series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: field,
            valueXField: 'timestamp',
            tooltip: am5.Tooltip.new(root, {}),
            connect: false,
          }),
        )

        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
              radius: 5,
              fill: series.get('fill'),
            }),
          })
        })

        series.strokes.template.set('strokeWidth', 2)

        series.get('tooltip').label.set('text', '[bold]{name}[/]\n{valueX.formatDate()}: {valueY}')

        return series
      }

      this.series = createSeries('Series', 'value')

      // Add cursor
      chart.set('cursor', am5xy.XYCursor.new(root, {
        behavior: 'zoomXY',
        xAxis: xAxis,
      }))

      xAxis.set('tooltip', am5.Tooltip.new(root, {
        themeTags: ['axis'],
      }))

      yAxis.set('tooltip', am5.Tooltip.new(root, {
        themeTags: ['axis'],
      }))
    },
    methods: {
      async submit () {
        this.chartData.series[0].data = []
        const bodyparms = {
          boxName: this.selectedBox,
          zone: this.selectedZone,
          attribute: this.selectedAtributes,
          carType: this.selectedCarTypes,
          dateFrom: this.dates[0],
          dateTo: this.dates[1],
        }
        var data = await dataService.GetDataPointChart(bodyparms)
        this.drawChart(data)
      },
      async changeBox () {
        var zones = await dataService.getZpnesByPoint(this.selectedBox)
        this.zones = zones
        this.selectedZone = this.zones[0]
      },
      drawChart (data) {
        data = data.filter(function (item) {
          return item.timestamp !== null
        })
        this.series.data.setAll(data)
      },
    },
  }
  </script>
<style scoped>
.grid-item-chart {
  height: 25%;
}
.hello {
  width: 100%;
  height: 500px;
}
</style>
