<template>
  <div class="container">
    <div class="top">
      <a-avatar
        @click="handleUploadImage"
        :trigger-icon-style="{ color: 'var(--color-primary-light-1)', background: 'rgb(var(--primary-6))'}"
        :size="64"
      >
        <img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp" />
        <template #trigger-icon>
          <icon-edit/>
        </template>
        <myUpload
          field="img"
          v-model="uploadWindowVisible"
          :width="300"
          :height="300"
          img-format="png"
        />
      </a-avatar>
      <div class="user-info">
        <div class="user-name">用户名</div>
      </div>
      <div class="my-items">
        <div class="my-item">
          <div class="counts">99</div>
          <div class="counts-title">我的项目</div>
        </div>
        <div class="my-item">
          <div class="counts">99</div>
          <div class="counts-title">我的接口</div>
        </div>
        <div class="my-item">
          <div class="counts">开发者</div>
          <div class="counts-title">我的身份</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <a-tabs
        default-active-key="1"
        type="rounded"
        class="my-tabs"
      >
        <a-tab-pane key="1" title="Tab 1">
          <template #title>
            <icon-subscribed/> 我的项目
          </template>
          <a-grid
            :cols="{xs: 1, sm: 2}"
            :row-gap="16"
            :col-gap="16"
            class="my-project-cards"
          >
            <project-card v-for="i in 4" :key="i"/>
            <a-grid-item
              :span="2"
              class="show-all-projects-btn"
            >
              <a-button>查看全部</a-button>
            </a-grid-item>
          </a-grid>
        </a-tab-pane>
        <a-tab-pane key="2" title="Tab 2">
          <template #title>
            <icon-user/> 用户设置
          </template>
          <user-settings/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
  import myUpload from 'vue-image-crop-upload';
  import { ref } from "vue";
  import {IconEdit, IconSubscribed, IconUser} from "@arco-design/web-vue/es/icon";
  import ProjectCard from '@/components/user-center/project-card.vue';
  import UserSettings from "@/components/user-center/user-settings.vue";

  const uploadWindowVisible = ref(false);
  const handleUploadImage = () => {
    uploadWindowVisible.value = true;
  }
</script>

<style scoped lang="less">
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow-y: hidden;
    .top{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .user-info{
        text-align: center;
        padding: 8px;
        font-size: 24px;
        color: var(--color-light-1);
      }
      .my-items{
        display: flex;
        padding: 16px;
        .my-item{
          margin: 0 16px 16px 16px ;
          display: flex;
          flex-direction: column;
          align-items: center;
          .counts{
            font-weight: bolder;
            font-size: 20px;
            color: var(--color-warning-light-4);
          }
          .counts-title{
            font-size: 4px;
            color: var(--color-text-4);
          }
        }
      }
    }
    .bottom{
      flex-shrink: 1;
      overflow-y: auto;
      padding: 0 16px;
    }
  }

  .show-all-projects-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 16px;
  }
</style>
