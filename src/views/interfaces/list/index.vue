<template>
  <div class="container">
    <a-page-header
      :show-back="false"
      title="接口列表"
      class="header"
    >
    </a-page-header>
    <div class="main">
      <div class="tool-tab">
        <div class="tab-left">
          <a-input-search placeholder="搜索接口"/>
          <a-button
            class="create-btn"
            type="primary"
            @click="onHandleCreateInterface"
          >
            <template #icon>
              <icon-plus/>
            </template> 新建
          </a-button>
        </div>
        <div class="tab-right">
          <a-dropdown>
            <a-button>全部<icon-down style="margin-left: 8px"/></a-button>
            <template #content>
              <a-doption>全部</a-doption>
              <a-doption>我创建的</a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>
      <a-grid
        class="interfaces-list"
        :cols="{ xs: 2, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4 }"
        :col-gap="16"
        :row-gap="16"
      >
        <interface-item
          v-for="i in interfaceList"
          @onHandleCheckInterface="onHandleCheckInterface(i)"
          :interface-data="i"
        />
      </a-grid>
      <div class="footer">
        <a-pagination
          :total="100"
          :page-size="20"
        />
      </div>
    </div>
    <a-modal
      class="check-interface-modal"
      title="查看接口"
      :visible="checkInterfaceModalVisible"
      @cancel="onHandleCancelCheckInterface"
      :mask-closable="false"
      fullscreen
      :modal-style="customModalStyle.modalStyle"
      :body-style="customModalStyle.bodyStyle"
      :mask-style="customModalStyle.maskStyle"
      :esc-to-close="false"
      :footer="false"
      :unmount-on-close="true"
    >
      <check-interface
        :interfaceData="currentCheckInterfaceData"
        @onCheckProjectAuthFailed="onCheckProjectAuthFailed"
        @onCloseCheckInterfaceModal="onCloseCheckInterfaceModal"
      />
    </a-modal>
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
      <create-interface @onFreshData="onFreshData"/>
    </a-modal>
    <a-modal
      :visible="checkProjectModalVisible"
      fullscreen
      :closable="false"
      :footer="false"
      :modal-style="customModalStyle.modalStyle"
      :body-style="customModalStyle.bodyStyle"
      :mask-style="customModalStyle.maskStyle"
      unmount-on-close
      :unmount-on-close="true"
    >
<!--      <ProjectInfo-->
<!--        @onHandleCloseModal="onHandleCancelCheckProject"-->
<!--        @onFreshData="onFreshData"-->
<!--      />-->
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { IconPlus, IconDown } from "@arco-design/web-vue/es/icon";
  import InterfaceItem from "@/views/interfaces/list/components/interface-item.vue";
  import ProjectInfo from "@/views/projects/list/components/projectInfo.vue";
  import { onMounted, reactive, ref } from "vue";
  import createInterface from '@/components/create-interface/index.vue';
  import checkInterface from '@/components/check-interface/index.vue';
  import { queryAllInterfaces } from "@/api/interface";
  import { Message, Modal } from "@arco-design/web-vue";


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

  let interfaceList = ref([]);

  onMounted(async () => {
    interfaceList.value = (await queryAllInterfaces({})).data;
    console.log(interfaceList.value);
  });

  //当前查看的接口数据
  const currentCheckInterfaceData = ref();

  let createInterfaceModalVisible = ref(false);
  let checkInterfaceModalVisible = ref(false);
  let checkProjectModalVisible = ref(false);
  const onHandleCheckProject = () => {
    checkProjectModalVisible.value = true;
  }
  const onHandleCheckInterface = (interfaceData: any) => {
    currentCheckInterfaceData.value = interfaceData;
    checkInterfaceModalVisible.value = true;
  }
  const onHandleCreateInterface = () => {
    createInterfaceModalVisible.value = true;
  }
  const onHandleCancelCheckProject = (data: any) => {
    checkProjectModalVisible.value = false;
  }
  const onHandleCancelCreateInterface = () => {
    createInterfaceModalVisible.value = false;
  }
  const onHandleCancelCheckInterface = () => {
    checkInterfaceModalVisible.value = false;
  }

  const onCheckProjectAuthFailed = () => {
    checkInterfaceModalVisible.value = false;
    Modal.error({
      content: '暂无权限访问此项目',
    })
  }

  const onFreshData = async () => {
    interfaceList.value = (await queryAllInterfaces({})).data;
    onHandleCancelCreateInterface();
  }

  const onCloseCheckInterfaceModal = async () => {
    interfaceList.value = (await queryAllInterfaces({})).data;
    onHandleCancelCheckInterface();
  }

</script>

<style scoped lang="less">
  .container{
    background: var(--color-bg-1);
    margin: 16px 16px 0 16px;
    border-radius: 4px;
    overflow: hidden;
    .header{
      border-bottom: 1px var(--color-text-4) solid;
    }
    .main{
      background: var(--color-bg-1);
      .tool-tab{
        display: flex;
        justify-content: space-between;
        padding: 16px 24px;
        .tab-left{
          display: flex;
          .create-btn{
            margin-left: 16px;
          }
        }
        .tab-right{
        }
      }
      .interfaces-list{
        padding: 16px 24px;
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
  }
</style>
