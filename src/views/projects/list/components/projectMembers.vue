<template>
  <a-grid
    :row-gap="16"
    :col-gap="16"
    :cols="{ sm: 2, xs: 2, md: 3, xl: 3 }"
  >
    <a-grid-item>
      <a-card
        class="add-member-card"
        hoverable
      >
        <div class="add-card-main">
          <a-button
            shape="round"
            size="large"
            class="add-btn"
            @click="handleAddMemberModalVisible"
          >
            <template #icon>
              <icon-plus/>
            </template>
          </a-button>
          <div class="add-text">添加成员</div>
        </div>
      </a-card>
    </a-grid-item>
    <a-grid-item v-for="i in 10" :key="i">
      <a-card
        hoverable
        class="member-card"
      >
        <div class="main">
          <span
            class="member-info"
          >
            <a-avatar :size="40"></a-avatar>
            <a-typography-text class="member-username">用户名</a-typography-text>
            <a-typography-text class="member-identify">身份</a-typography-text>
          </span>
          <a-dropdown position="bl">
            <a-button
              class="more"
              type="outline"
              shape="round"
              status="success"
            >
              <template #icon>
                <icon-more />
              </template>
            </a-button>
            <template #content>
              <a-doption>设为{{i % 2 === 0 ? '管理员' : '普通成员'}}</a-doption>
              <a-doption>查看信息</a-doption>
              <a-doption disabled>移除该成员</a-doption>
            </template>
          </a-dropdown>
        </div>
      </a-card>
    </a-grid-item>
    <a-modal
      :visible="addMemberModalVisible"
      title="添加成员"
      @cancel="closeAddMemberModal"
      ok-text="确认添加"
      :mask-closable="false"
    >
      <a-input placeholder="请输入用户名"/>
    </a-modal>
  </a-grid>
</template>

<script setup lang="ts">
  import { IconMore, IconPlus } from "@arco-design/web-vue/es/icon";
  import { ref } from "vue";

  const addMemberModalVisible = ref(false);
  const handleAddMemberModalVisible = () => {
    addMemberModalVisible.value = true
  }
  const closeAddMemberModal = () => {
    addMemberModalVisible.value = false
  }
</script>

<style scoped lang="less">

  .add-member-card{
    height: 100%;
    display: flex;
    flex-direction: column;
    /deep/.arco-card-body{
      flex-grow: 1;
    }
    .add-card-main{
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .add-text{
        padding-top: 20px;
        font-size: 16px;
      }
      .add-btn{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }

  .member-card{
    .main{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      .member-info{
        display: flex;
        flex-direction: column;
        align-items: center;
        .member-username{
          padding: 16px 0 0;
          font-size: 16px;
        }
        .member-identify{
          padding: 0 0 8px 0;
          font-size: 12px;
          color: var(--color-text-2);
        }
      }
      .more{
        align-self: end;
      }
    }
  }
</style>
