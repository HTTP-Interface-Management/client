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
          <div class="project-title">{{projectInfo.name}}</div>
          <div class="project-description">项目介绍：{{projectInfo.description}}</div>
          <div class="project-creator">创建人ID：{{projectInfo.creator_id}}</div>
          <div class="project-created-time">创建时间：{{ projectInfo.created_at.substring(0, 10) }}</div>
        </div>
      </div>
      <div class="project-tabs">
        <a-tabs default-active-key="1" type="card">
          <template #extra>
            <a-button type="text" status="normal" @click="onHandleCreateInterface">
              <template #icon>
                <icon-plus/>
              </template>
              新建接口
            </a-button>
          </template>
          <a-tab-pane key="1">
            <template #title>
              <icon-apps/> 项目接口
            </template>
            <project-interfaces
              :catalogList="catalogsArr"
              :interfaceList="interfaceList"
              v-if="interfaceList.length"
              @onFreshData="onFreshData"
            />
            <a-empty v-else description="暂无接口"/>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #title>
              <icon-user-group/> 项目成员
            </template>
            <project-members :projectInfo="projectInfo"/>
          </a-tab-pane>
          <a-tab-pane key="3">
            <template #title>
              <icon-settings/> 项目设置
            </template>
            <div class="project-settings">
              <a-form class="form" layout="vertical" :model="projectSettings">
                <a-form-item label="项目名">
                  <a-input v-model="projectSettings.name" disabled/>
                </a-form-item>
                <a-form-item label="项目简介">
                  <a-textarea
                    :draggable="false"
                    disabled
                    class="description-textarea"
                    v-model="projectSettings.description"
                  />
                </a-form-item>
                <a-form-item>
                  <a-button long status="danger" type="primary" @click="onDeleteProject">删除项目</a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <a-modal
      class="create-interface-modal"
      title="新建接口"
      :visible="createInterfaceModalVisible"
      @cancel="onHandleCancelCreateInterface"
      fullscreen
      :esc-to-close="false"
      :modal-style="customModalStyle.modalStyle"
      :body-style="customModalStyle.bodyStyle"
      :mask-style="customModalStyle.maskStyle"
      :unmount-on-close="true"
      :footer="false"
    >
      <create-interface
        :projectInfo="projectInfo"
        :catalogList="catalogsArr"
        @onFreshData="onFreshData"
        @onClose="onHandleCancelCreateInterface"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { IconClose, IconSettings, IconUserGroup, IconApps, IconPlus } from "@arco-design/web-vue/es/icon";
  import ProjectInterfaces from '@/views/projects/list/components/projectInterfaces.vue';
  import ProjectMembers from '@/views/projects/list/components/projectMembers.vue';
  import createInterface from '@/components/create-interface/index.vue';
  import { onMounted, reactive, ref } from "vue";
  import { deleteProject, getProjectInterface } from "@/api/project";
  import { Message, Modal } from "@arco-design/web-vue";
  import { deleteInterface } from "@/api/interface";

  const emits = defineEmits(['onHandleCloseModal', 'onCancel'])
  const props = defineProps(['projectInfo']);
  const catalogsArr = ref([]);
  const interfaceList = ref([]);
  onMounted(async () => {
    interfaceList.value = (await getProjectInterface(props.projectInfo.project_id)).data.filter((value: any) => {
      return value !== null;
    });
    console.log(interfaceList.value);
    for (let i of interfaceList.value){
      if (!catalogsArr.value.includes(i?.catalog_name))
        catalogsArr.value.push(i?.catalog_name);
    }

    console.log(catalogsArr.value);
  });

  const projectSettings = reactive({
    name: props.projectInfo.name,
    description: props.projectInfo.description
  });

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

  const onHandleCloseModal = () => {
    emits('onHandleCloseModal', true)
  }

  const onFreshData = async () => {
    console.log('freshed!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    interfaceList.value = (await getProjectInterface(props.projectInfo.project_id)).data.filter((value: any) => {
      return value !== null;
    });
    console.log(interfaceList.value);
    for (let i of interfaceList.value){
      if (!catalogsArr.value.includes(i?.catalog_name))
        catalogsArr.value.push(i?.catalog_name);
    }

    console.log(catalogsArr.value);
  }

  let createInterfaceModalVisible = ref(false);
  const onHandleCreateInterface = () => {
    createInterfaceModalVisible.value = true;
  }

  const onHandleCancelCreateInterface = () => {
    createInterfaceModalVisible.value = false;
  }

  const onDeleteProject = () => {
    Modal.error({
      title: '警告',
      content: '确定要删除该项目吗？',
      cancelText: '取消',
      hideCancel: false,
      onOk: () => {
        deleteProject(props.projectInfo.project_id).then((res) => {
          if (res.code === 200) {
            Message.success({
              content: '删除成功',
              duration: 5 * 1000
            });
            emits('onCancel', true);
          }
        })
      }
    })
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
        /deep/.arco-tabs-content{
          padding: 16px;
        }
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
