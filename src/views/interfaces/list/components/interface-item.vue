<template>
  <a-grid-item>
    <a-card
      hoverable
      class="item-card"
      @click="onHandleCheckInterface"
    >
      <div class="card-main">
        <div class="card-top">
          <div class="theme">
            <a-avatar :size="16" :style="{background: 'green'}"/>
          </div>
          <div class="title">{{interfaceData.name}}</div>
        </div>
        <div class="card-bottom">
          <a-tooltip
            class="interface-address"
            :content="interfaceData.url"
            position="bottom"
          >
            <div class="address-cover">
              <b>接口地址：</b>{{interfaceData.url}}
            </div>
          </a-tooltip>
          <div class="created-time">
            <b>创建时间：</b>{{interfaceData.created_at.substring(0, 11)}}
          </div>
          <div class="belong-project">
            <a-button
              long
              type="text"
              @click.stop="onHandleCheckProject"
            >
              查看项目
            </a-button>
          </div>
        </div>
      </div>
    </a-card>
  </a-grid-item>
</template>

<script setup lang="ts">

const emitter = defineEmits(['onHandleCheckInterface', 'onHandleCheckProject']);

const onHandleCheckInterface = () => {
  emitter('onHandleCheckInterface', 666)
}

const onHandleCheckProject = () => {
  emitter('onHandleCheckProject', 666)
}

const props = defineProps(['interfaceData']);


</script>

<style scoped lang="less">
.item-card{
  cursor: pointer;
  transition: all ease-out 0.125s;
  .card-main{
    height: 160px;
    display: flex;
    flex-direction: column;
    .card-top{
      display: flex;
      align-items: center;
      .theme{
      }
      .title{
        font-size: 20px;
        color: var(--color-text-1);
        font-weight: 600;
        margin-left: 16px;
      }
    }
    .card-bottom{
      margin-top: 32px;
      .interface-address{
        width: 100%;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .address-cover{
          width: 100%;
          display: flex;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .creator{
        padding-top: 8px;
      }
      .created-time{
        padding-top: 8px;
      }
      .belong-project{
        padding-top: 16px;
      }
    }
  }
}

.item-card:active{
  transform: scale(98%, 98%);
}
</style>
