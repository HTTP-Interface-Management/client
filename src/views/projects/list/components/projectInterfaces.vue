<template>
  <a-collapse>
    <a-collapse-item
      v-for="i in catalogList"
      :header="`${i?i : ' '}`"
      class="interface-collection"
      :key="i"
    >
      <div
        v-for="interfaceItem in interfaceList.filter((v)=> {return i===v.catalog_name})"
        class="interface-item"
      >
        <div class="item-left">
          <div class="interface-icon">
            <icon-link/>
          </div>
          <div class="interface-text">
            <div class="interface-title">{{interfaceItem.name}}</div>
            <div class="interface-link">{{interfaceItem.url}}</div>
          </div>
        </div>
        <a-button-group>
          <a-button
            type="outline"
            @click="onHandleCheckInterfaceModalVisible(interfaceItem)"
          >
            <template #icon>
              <icon-eye/>
            </template>
            查看
          </a-button>
          <a-button type="primary" @click="onDeleteInterface(interfaceItem.interface_id)">删除</a-button>
        </a-button-group>
      </div>
    </a-collapse-item>
    <a-modal
      title="查看接口"
      fullscreen
      :esc-to-close="false"
      :mask-closable="false"
      :footer="false"
      :visible="checkInterfaceModalVisible"
      @cancel="onCancelCheckInterfaceModal"
      :modal-style="customModalStyle.modalStyle"
      :body-style="customModalStyle.bodyStyle"
      :mask-style="customModalStyle.maskStyle"
      unmount-on-close
    >
      <check-interface
        :interfaceData="selectedInterfaceData"
        @onFreshData="onFreshData"
      />
    </a-modal>
  </a-collapse>
</template>

<script setup lang="ts">
  import { IconPlus, IconDelete, IconLink, IconEye} from "@arco-design/web-vue/es/icon";
  import checkInterface from '@/components/check-interface/index.vue';
  import createInterface from '@/components/create-interface/index.vue';
  import { ref } from "vue";
  import { Message, Modal } from "@arco-design/web-vue";
  import { deleteInterface } from "@/api/interface";

  const props = defineProps(['catalogList', 'interfaceList']);
  const emit = defineEmits(['onFreshData', 'onClose'])
  const selectedInterfaceData = ref({});

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
  const onCancelCreateInterfaceModal = () => {
    createInterfaceModalVisible.value = false;
  }
  const onHandleCheckInterfaceModalVisible = (interfaceItem: any) => {

    console.log(selectedInterfaceData);
    selectedInterfaceData.value = interfaceItem;
    checkInterfaceModalVisible.value = true;
  }
  const onCancelCheckInterfaceModal = () => {
    checkInterfaceModalVisible.value = false;
  }

  const onFreshData = () => {
    emit('onFreshData', true);
  }

  const onDeleteInterface = (interface_id: number) => {
    Modal.error({
      title: '警告',
      content: '确定要删除该接口吗？',
      cancelText: '取消',
      hideCancel: false,
      onOk: () => {
        deleteInterface(interface_id).then((res) => {
          if (res.code === 200) {
            Message.success({
              content: '删除成功',
              duration: 5 * 1000
            });
            emit('onFreshData', true);
          }
        })
      }
    })
  }
</script>

<style scoped lang="less">
  .interface-collection{
    .interface-item + .interface-item {
      border-top: 1px solid var(--color-text-4);
    }
    .interface-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      .item-left{
        display: flex;
        align-items: center;
        .interface-icon{
          margin-right: 34px;
          font-size: 24px;
          color: var(--color-primary-light-3);
        }
        .interface-text{
          .interface-title{
            font-size: 20px;
          }
          .interface-link{
            font-size: 12px;
            margin: 4px 0;
            color: var(--color-text-2);
          }
        }
      }

    }
  }
</style>
