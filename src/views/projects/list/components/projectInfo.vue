<template>
  <div class="project-info">
    <div class="top-bar">
      <a-button shape="round" @click="onHandleCloseModal">
        <template #icon>
          <icon-close/>
        </template>
      </a-button>
    </div>
    <div class="main">
      <div class="project-card">
        <div class="project-img">
          <a-image
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp"
            height="100%"
          />
        </div>
        <div class="project-text">
          <div class="project-title">项目名称</div>
          <div class="project-description">这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍这是项目介绍。</div>
          <div class="project-creator">创建人：张三</div>
          <div class="project-created-time">2023年8月8日 13:13:13</div>
        </div>
      </div>
      <div class="project-tabs">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1">
            <template #title>
              <icon-apps/> 项目接口
            </template>
            <project-interfaces/>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #title>
              <icon-user-group/> 项目成员
            </template>
            <project-members/>
          </a-tab-pane>
          <a-tab-pane key="3">
            <template #title>
              <icon-settings/> 项目设置
            </template>
            <div class="project-settings">
              <a-form class="form" layout="vertical">
                <a-form-item label="项目图标">
                  <a-upload
                    list-type="picture-card"
                    action="/"
                    image-preview
                  />
                </a-form-item>
                <a-form-item label="项目名">
                  <a-input/>
                </a-form-item>
                <a-form-item label="项目简介">
                  <a-textarea
                    :draggable="false"
                    class="description-textarea"
                  />
                </a-form-item>
                <a-form-item>
                  <a-button long>删除项目</a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IconClose, IconSettings, IconUserGroup, IconApps } from "@arco-design/web-vue/es/icon";
  import ProjectInterfaces from '@/views/projects/list/components/projectInterfaces.vue';
  import ProjectMembers from '@/views/projects/list/components/projectMembers.vue';

  const emits = defineEmits(['onHandleCloseModal'])

  const onHandleCloseModal = () => {
    emits('onHandleCloseModal', true)
  }
</script>

<style scoped lang="less">
  .project-info{
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    .top-bar{
      padding: 16px 32px;
      display: flex;
      flex-direction: row-reverse;
      border-bottom: 1px solid var(--color-text-4);
    }
    .main{
      padding: 16px 32px;
      flex-grow: 1;
      overflow-y: auto;
      overflow-x: hidden;
      .project-card{
        display: flex;
        align-items: center;
        .project-img{
          height: 150px;
          width: 200px;
          overflow: hidden;
          border-radius: 4px;
          flex-shrink: 0;
          img{
          }
        }
        .project-text{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 32px;
          .project-title{
            font-size: 32px;
            font-weight: 400;
          }
          .project-description{
            padding: 8px 0;
            color: var(--color-text-2);
          }
          .project-creator{
            color: var(--color-text-2);
          }
          .project-created-time{
            color: var(--color-text-2);
          }
        }
      }
      .project-tabs{
        margin-top: 32px;
        .project-settings{
          .form{
            padding-top: 16px;
            width: 50%;
            margin: 0 auto;
            .description-textarea{
              height: 160px;
            }
          }
        }
      }
    }
  }
</style>
