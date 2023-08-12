<template>
  <a-grid-item class="project-card">
    <a-card hoverable :style="{ width: '200px' , margin: '0 auto'}">
      <template #cover>
        <div
          :style="{height: '150px',overflow: 'hidden',}"
        >
          <img
            :style="{ height: '100%'}"
            alt=""
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
          />
        </div>
      </template>
      <a-card-meta
        title="项目名称"
      >
        <template #description>
          创建时间：2023年8月8日 18:56:01
        </template>
      </a-card-meta>
    </a-card>
  </a-grid-item>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
  .project-card{
    width: 100%;
  }
</style>
