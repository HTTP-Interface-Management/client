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
          v-for="i in 20"
          :key="i"
          @onHandleCheckInterface="onHandleCheckInterface"
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
      fullscreen
      :modal-style="customModalStyle.modalStyle"
      :body-style="customModalStyle.bodyStyle"
      :mask-style="customModalStyle.maskStyle"
    >
      <check-interface/>
    </a-modal>
    <a-modal
      class="create-interface-modal"
      title="新建接口"
      :visible="createInterfaceModalVisible"
      @cancel="onHandleCancelCreateInterface"
      fullscreen
      :modal-style="customModalStyle.modalStyle"
      :body-style="customModalStyle.bodyStyle"
      :mask-style="customModalStyle.maskStyle"
    >
      <create-interface/>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { IconPlus, IconDown } from "@arco-design/web-vue/es/icon";
  import InterfaceItem from "@/views/interfaces/list/components/interface-item.vue";
  import { ref } from "vue";
  import createInterface from '@/components/create-interface/index.vue';
  import checkInterface from '@/components/check-interface/index.vue';


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

  let createInterfaceModalVisible = ref(false);
  let checkInterfaceModalVisible = ref(false);
  const onHandleCreateInterface = () => {
    createInterfaceModalVisible.value = true;
  }
  const onHandleCheckInterface = (data: any) => {
    console.log(data);
    checkInterfaceModalVisible.value = true;
  }
  const onHandleCancelCreateInterface = () => {
    createInterfaceModalVisible.value = false;
  }
  const onHandleCancelCheckInterface = () => {
    checkInterfaceModalVisible.value = false;
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
