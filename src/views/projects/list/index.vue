<template>
  <div class="container">
    <div class="header">
      <a-page-header title="项目列表" :show-back="false">
        <template #extra>
          <a-dropdown>
            <a-button>全部<icon-down style="margin-left: 8px"/></a-button>
            <template #content>
              <a-doption>全部</a-doption>
              <a-doption>我创建的</a-doption>
            </template>
          </a-dropdown>
          <a-button
            type="primary"
            class="add-btn"
            @click="onHandleCreateProject"
          >
            <template #icon>
              <icon-plus/>
            </template>
            新建项目
          </a-button >
        </template>
      </a-page-header>
    </div>
    <a-grid class="main" :cols="{ xs: 1, sm: 1, md: 2 ,lg: 2, xxl: 3}" :col-gap="32" :row-gap="32">
      <projectItem
        v-for="i in projectList"
        :projectData="i"
        @click="onHandelModalVisible(i)"
      />
    </a-grid>
    <div class="footer">
      <a-pagination
        :total="100"
        :page-size="20"
      />
    </div>
    <a-modal
      :visible="modalVisible"
      fullscreen
      :closable="false"
      :footer="false"
      :modal-style="customModalStyle.modalStyle"
      :body-style="customModalStyle.bodyStyle"
      :mask-style="customModalStyle.maskStyle"
      unmount-on-close
    >
      <ProjectInfo
        @onHandleCloseModal="onCancelProjectModal"
        :projectInfo="selectedProjectInfo"
        @onCancel="onCancelProjectModal"
      />
    </a-modal>

    <a-modal
      title="创建项目"
      fullscreen
      :esc-to-close="false"
      :mask-closable="false"
      :visible="createProjectModalVisible"
      @cancel="onCancelCreateProjectModal"
      :modal-style="customModalStyle.modalStyle"
      :body-style="customModalStyle.maskStyle"
      :mask-style="customModalStyle.bodyStyle"
      :footer="false"
    >
      <create-project/>
    </a-modal>

  </div>
</template>

<script setup lang="ts">
  import { IconPlus, IconDown } from '@arco-design/web-vue/es/icon';
  import { onMounted, ref } from "vue";
  import ProjectInfo from '@/views/projects/list/components/projectInfo.vue';
  import ProjectItem from '@/views/projects/list/components/projectItem.vue';
  import createProject from '@/components/create-project/index.vue'
  import { getAllProjectList } from "@/api/project";

  const projectList = ref([]);
  const selectedProjectInfo = ref();

  onMounted(async () => {
    projectList.value = (await getAllProjectList({page: 1, keyword: ''})).data;
  })

  const customModalStyle = {
    modalStyle: {
      borderRadius: '0',
      maxWidth: '1200px'
    },
    bodyStyle: {
      flexGrow: '1' ,
      padding: '0'
    },
    maskStyle: {
    }
  }
  const modalVisible = ref(false)
  const onHandelModalVisible = (projectInfo: any) => {
    selectedProjectInfo.value = projectInfo
    modalVisible.value = true;
  }
  const onCancelProjectModal = async () => {
    modalVisible.value = false;
    projectList.value = (await getAllProjectList({page: 1, keyword: ''})).data;
  }

  let createProjectModalVisible = ref(false)
  const onHandleCreateProject = () => {
    createProjectModalVisible.value = true;
  }
  const onCancelCreateProjectModal = () => {
    createProjectModalVisible.value = false;
  }
</script>

<style scoped lang="less">
  .container{
    padding: 16px 20px;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    .header{
      padding: 0 8px;
      width: 100%;
      background: var(--color-bg-1);
      border-bottom: 1px solid rgba(0,0,0, .1);
      border-radius: 4px 4px 0 0;
      .add-btn{
        margin-left: 8px;
      }
    }
    .main{
      background: var(--color-bg-1);
      padding: 16px 32px;
    }

    .footer{
      background: var(--color-bg-1);
      padding: 16px 32px 32px 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 0 4px 4px;
    }
  }
</style>
