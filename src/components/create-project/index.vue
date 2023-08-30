<template>
  <div class="create-project">
    <a-form
      class="create-project-form"
      layout="vertical"
      :model="newProjectForm"
    >
      <a-form-item label="项目名">
        <a-input v-model="newProjectForm.Name"/>
      </a-form-item>
      <a-form-item label="项目简介">
        <a-textarea
          :draggable="false"
          class="description-textarea"
          v-model="newProjectForm.description"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          long
          type="primary"
          @click="createNewProject"
        >
          创建
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  import { createProject } from "@/api/project";
  import { useUserStore } from "@/store";
  import { Message } from "@arco-design/web-vue";

  const newProjectForm = reactive({
    Name: '',
    description: '',
  });

  const createNewProject = () => {
    createProject(newProjectForm.Name, newProjectForm.description, useUserStore().user_info.user_id).then((res) => {
      if (res.code === 200) {
        Message.success({
          content: '创建成功',
          duration: 5 * 1000,
        });

      }
    })
  }

</script>

<style scoped lang="less">
.create-project {
  .create-project-form {
    width: 50%;
    margin: 0 auto;
    .description-textarea {
      height: 200px;
    }
  }
}

</style>
