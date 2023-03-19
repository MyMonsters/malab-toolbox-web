<template>
  <div style="width: 100%; height: 100%">
    <el-button class="btn" text @click="dialogVisible = true" size="large"> 编辑point </el-button>

    <el-dialog v-model="dialogVisible" title="Point" width="30%">
      <el-alert title="point数据中的color优先" type="success" />
      <div>Point数据：<el-input autosize v-model="point" type="textarea" /></div>
      <div>点的颜色：<el-color-picker v-model="ScatterColor" show-alpha /></div>
      <div>地图背景：<el-color-picker v-model="AreaColor" show-alpha /></div>
      <div>背景：<el-color-picker v-model="bgColor" show-alpha /></div>
      <div>点的大小：<el-input v-model="symbolSize" /></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="changePoint"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <div :id="id" :style="{ height: height, width: width }"> </div>
  </div>
</template>
<script lang="ts" setup>
  import worldJSON from '@/assets/world/world.json'
  import axios from 'axios'
  import * as echarts from 'echarts'
  import { EChartsType } from 'echarts/core'
  import { onMounted, reactive, ref, computed } from 'vue'
  import { MapChart } from 'echarts/charts'
  import { ElColorPicker, ElNotification } from 'element-plus'
  import { useUserStore } from '@/store/modules/user'
  import { usePointStore } from '@/store/modules/point'
  import config from './config'

  echarts.use([MapChart])
  // 必须在使用 use 方法注册了 MapChart 后才能使用 registerMap 注册地图
  echarts.registerMap('world', worldJSON)
  const { point, ScatterColor, bgColor, AreaColor, symbolSize } = config
  let props = defineProps({
    config: {
      type: Object,
      default: () => {},
    },
    id: {
      type: String,
      default: 'point',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
  })
  const dialogVisible = ref(false)
  // let point = ref(pointStore.getPoint())
  let chart: EChartsType
  const changePoint = () => {
    initChart()
    dialogVisible.value = false
  }

  const initChart = () => {
    let chart = echarts.init(document.getElementById(props.id))
    const pointArr = point.value.length === 0 ? [] : JSON.parse(point.value)
    console.log('arr', pointArr)
    const series = pointArr.map((item) => {
      return {
        type: 'scatter',
        coordinateSystem: 'geo',
        // blendMode: 'difference',

        symbolSize: symbolSize.value, // 点位大小
        itemStyle: {
          // color: '#ce6a73', // 各个点位的颜色设置
          // color: '#9a5562',
          // color: '#1f77b6',
          color: item.color ? item.color : ScatterColor.value,
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
            return item.info
          },
        },

        data: [[item.longitude, item.latitude]],
      }
    })

    chart.setOption({
      // backgroundColor: 'black',
      backgroundColor: bgColor.value,
      legend: {
        show: true,
      },
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
            // areaColor: '#fff',
            areaColor: AreaColor.value,
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
    chart = initChart()
    window.addEventListener('resize', function () {
      chart && chart.resize()
    })
  })
</script>
