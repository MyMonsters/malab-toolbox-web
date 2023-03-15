<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts" setup>
  import worldJSON from '@/assets/world/world.json'
  import axios from 'axios'
  import * as echarts from 'echarts'
  import { EChartsType } from 'echarts/core'
  import { onMounted, reactive, ref } from 'vue'
  import { MapChart } from 'echarts/charts'
  import { useUserStore } from '@/store/modules/user'

  echarts.use([MapChart])
  // 必须在使用 use 方法注册了 MapChart 后才能使用 registerMap 注册地图
  echarts.registerMap('world', worldJSON)
  const userStore = useUserStore()
  let props = defineProps({
    className: {
      type: String,
      default: 'chart',
    },
    config: {
      type: Object,
      default: () => {},
    },
    id: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '200px',
    },
  })
  let point = reactive({ list: [] })
  let pv = ref(null)
  let chart: EChartsType
  const initChart = () => {
    console.log(point.list, pv)
    let chart = echarts.init(document.getElementById(props.id))
    const series = point.list.map((item) => {
      console.log(item)
      return {
        type: 'scatter',
        coordinateSystem: 'geo',
        // blendMode: 'difference',
        symbolSize: 7, // 点位大小
        itemStyle: {
          // color: '#ce6a73', // 各个点位的颜色设置
          // color: '#9a5562',
          color: '#1f77b6',
          opacity: 1, // 透明度
          borderWidth: 1, // 边框宽度
          borderColor: 'rgba(255,255,255,0)', //rgba(180, 31, 107, 0.8)
          borderJoin: 'round',

          shadowBlur: 10,
          // shadowColor: 'rgba(120, 36, 50, 0.5)',
          shadowOffsetY: 5,
        },
        tooltip: {
          backgroundColor: 'rgba(255,255,255, 1)',
          // position: [],
          textStyle: {
            fontSize: 10,
            color: '#000',
          },
          formatter: () => {
            return item.pageview + 'visitors from ' + item.country
          },
        },

        data: [[item.longitude, item.latitude]],
      }
    })

    chart.setOption({
      // backgroundColor: 'black',
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'item',
      },
      geo: {
        map: 'world',

        // roam: true,
        // roam: true,
        zoom: 1.1,
        label: {
          emphasis: {
            show: false,
          },
        },
        // silent: true,
        itemStyle: {
          normal: {
            // areaColor: '#004981', //地图颜色
            areaColor: '#fff',
            // areaColor: "black",
            borderColor: 'black',
          },
          emphasis: {
            areaColor: '#0b1c2d',
          },
        },
      },
      series: series,
    })
    return chart
  }
  onMounted(() => {
    axios.get('https://www.machao.group/deeptime/getPoint').then((res) => {
      // sessionStorage.setItem('point', JSON.stringify(res.data.data));
      point.list = res.data.data
      initChart()
      // return Promise.resolve(res.data.data)
    })
    axios.get('https://www.machao.group/deeptime/getUserIP').then((res) => {
      console.log(res)
      pv.value = res.data.pv
      userStore.setPV(res.data.pv)
    })
    // chart = initChart()
    window.addEventListener('resize', function () {
      chart && chart.resize()
    })
  })
</script>
