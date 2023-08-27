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
          <div class="title">测试接口</div>
        </div>
        <div class="card-bottom">
          <a-tooltip
            class="interface-address"
            content="https://123.456.789.100:8080/api/helloWorld"
            position="bottom"
          >
            <div class="address-cover">
              <b>接口地址：</b>/api/helloWorld
            </div>
          </a-tooltip>
          <div class="creator">
            <b>创建人：</b>用户名
          </div>
          <div class="created-time">
            <b>创建时间：</b>2023年8月8日
          </div>
          <div class="belong-project">
            <b>所属项目：</b><a-link @click.stop="onHandleCheckProject">测试项目</a-link>
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
        .address-cover{
        }
      }
      .creator{
        padding-top: 8px;
      }
      .created-time{
        padding-top: 8px;
      }
      .belong-project{
        padding-top: 8px;
      }
    }
  }
}

.item-card:active{
  transform: scale(98%, 98%);
}
</style>
