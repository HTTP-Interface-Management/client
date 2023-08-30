<template>
  <a-grid-item class="project-item" @click="onHandelModalVisible">
    <div class="left">
      <div class="project-img">
        <img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp" />
      </div>
      <div class="text-content">
        <div class="project-name">{{projectData.name}}</div>
        <div class="created-time">{{projectData.created_at.substring(0, 10)}}</div>
      </div>
    </div>
  </a-grid-item>
</template>

<script setup lang="ts">
  const props = defineProps(['projectData']);
  const emit = defineEmits<{(e: 'onHandelModalVisible', value: boolean): void}>()

  const onHandelModalVisible = () => {
    emit('onHandelModalVisible', true)
  }

</script>

<style scoped lang="less">
  .project-item{
    transition: all ease-out 0.25s;
    display: flex;
    padding: 32px 16px;
    justify-content: space-between;
    align-items: center;
    background: var(--color-bg-4);
    border: 1px solid var(--color-text-4);
    border-radius: 4px;
    .left{
      display: flex;
      .project-img{
        width: 160px;
        height: 120px;
        overflow: hidden;
        border-radius: 4px;
        img{
          height: 100%;
        }
      }
      .text-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8px 0;
        margin-left: 32px;
        .project-name{
          color: var(--color-text-1);
          font-size: 20px;
        }
        .created-time{
          color: var(--color-text-2);
        }
      }
    }
  }

  .project-item:hover{
    cursor: pointer;
    box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.1);
    background: var(--color-secondary);
  }

  .project-item:active{
    transform: scale(98%, 98%);
    cursor: pointer;
    box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.1);
  }
</style>
