<template>
  <div class="home-container">
    <el-row class="row-bg" :gutter="20">
      <el-col class="mycol" :xs="24" :sm="12" :lg="8">
        <el-card class="box-card" style="height: 100%">
          <!-- <el-image
            class="wechat"
            :src="weLogo"
            :preview-src-list="[weLogo]"
            style="max-width: 200px"
            :data-resid="Date.now()"
          /> -->
          <div class="personal" style="height: 100%">
            <div>
              <el-avatar :size="50" :src="AvatarLogo" />
            </div>
            <div class="name"></div>
            <div class="description"></div>
            <div class="list">
              <div>MaLab</div>
              <div>一个可以为我们的生活和学习提供便利的工具箱</div>
            </div>

            <el-divider></el-divider>
            <div style="margin-bottom: 15px"><h5>需要翻墙的网站：Z-library、chatPDF</h5></div>
          </div>
        </el-card>
      </el-col>
      <el-col class="mycol" :xs="24" :sm="12" :lg="16">
        <el-row class="custom" :gutter="10">
          <el-col :xs="24" :sm="24" :lg="24">
            <el-card style="margin-bottom: 10px">
              <div class="grid-content">
                <div class="left"
                  ><el-icon style="font-size: 24px; color: white"><user /></el-icon
                ></div>
                <div class="right">
                  <div class="h2" style="color: #2d8cf0"
                    ><count-to
                      :start-val="0"
                      :end-val="pv"
                      :duration="1000"
                      :autoplay="true"
                    ></count-to
                  ></div>
                  <div>用户访问量 </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :lg="8">
            <el-card style="margin-bottom: 10px">
              <div class="grid-content">
                <div class="left" style="background: #64d572"
                  ><el-icon style="font-size: 24px; color: white"><user /></el-icon
                ></div>
                <div class="right">
                  <div class="h2" style="color: #64d572"
                    ><count-to
                      :start-val="0"
                      :end-val="9599"
                      :duration="2000"
                      :autoplay="true"
                    ></count-to
                  ></div>
                  <div>系统消息 </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-card style="margin-bottom: 10px">
              <div class="grid-content">
                <div class="left" style="background: #f25e43"
                  ><el-icon style="font-size: 24px; color: white"><user /></el-icon
                ></div>
                <div class="right">
                  <div class="h2" style="color: #f25e43"
                    ><count-to
                      :start-val="0"
                      :end-val="595453"
                      :duration="2000"
                      :autoplay="true"
                    ></count-to
                  ></div>
                  <div>数量 </div>
                </div>
              </div>
            </el-card>
          </el-col> -->
        </el-row>
        <el-card class="box-card" style="height: 100%">
          <template #header>
            <div class="card-header">
              <span>用户活跃量</span>
            </div>
          </template>
          <div>
            <bar-charts height="800px" width="100%" id="bar1"></bar-charts>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
  import { User } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import AvatarLogo from '@/assets/image/avatar.png'
  import weLogo from '@/assets/image/we.png'
  import CountTo from '@/components/CountTo/index.vue'
  import BarCharts from '@/views/echarts/simple/components/scatter.vue'
  import { useUserStore } from '@/store/modules/user'
  import useStore from 'element-plus/es/components/table/src/store'
  const userStore = useUserStore()
  const pv = userStore.getPV()
  console.log(pv)
  const goTo = (url) => {
    window.open(url, '_blank')
  }
</script>

<style scoped lang="scss">
  @import './index';
</style>
