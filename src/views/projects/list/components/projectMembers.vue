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
    <a-grid-item v-for="i in memberList" :key="i.user_id">
      <a-card
        hoverable
        class="member-card"
      >
        <div class="main">
          <span
            class="member-info"
          >
            <a-avatar :size="40"></a-avatar>
            <a-typography-text class="member-username">{{ i.user_name }}</a-typography-text>
            <a-typography-text class="member-identify">{{ translateRoleId(i.role_id) }}</a-typography-text>
          </span>
          <a-dropdown position="bl" disabled>
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
      @ok="addMember"
    >
      <a-input placeholder="请输入用户ID" v-model="toAddUserId"/>
      <a-select
        :style="{ marginTop: '16px'}"
        v-model="toAdduserRole"
        placeholder="请设置用户权限"
      >
        <a-option
          v-for="i in roles"
          :value="i.role_id"
        >
          {{i.title}}
        </a-option>
      </a-select>
    </a-modal>
  </a-grid>
</template>

<script setup lang="ts">
  import { IconMore, IconPlus } from "@arco-design/web-vue/es/icon";
  import { onMounted, ref } from "vue";
  import { getProjectMember, addProjectMemeber } from "@/api/project";
  import { Message } from "@arco-design/web-vue";

  const props = defineProps(['projectInfo']);

  const memberList = ref([]);

  onMounted(async () => {
    memberList.value = (await getProjectMember(props.projectInfo.project_id)).data;
    console.log(memberList.value);
  });

  const toAddUserId = ref();
  const toAdduserRole = ref();
  const addMemberModalVisible = ref(false);
  const handleAddMemberModalVisible = () => {
    addMemberModalVisible.value = true
  }
  const closeAddMemberModal = () => {
    addMemberModalVisible.value = false
  }

  const roles = [
    { role_id: 2, title: '管理员' },
    { role_id: 3, title: '普通成员' },
  ]

  const translateRoleId = (role_id: number) : string => {
    switch (role_id) {
      case 1: return '创建者';
      case 2: return '管理员';
      default: return '普通成员';
    }
  }

  const addMember = () => {
    addProjectMemeber(props.projectInfo.project_id, parseInt(toAddUserId.value), toAdduserRole.value).then(async (res) => {
      console.log(res);
      if (res.code === 200) {
        Message.success({
          content: '添加成功',
          duration: 5 * 1000,
        });
        memberList.value = (await getProjectMember(props.projectInfo.project_id)).data;
        closeAddMemberModal();
      }
    })
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
