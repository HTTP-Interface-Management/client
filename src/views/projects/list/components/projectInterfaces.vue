<template>
  <a-collapse>
    <a-collapse-item
      v-for="i in 5"
      :header="`接口集${i}`"
      class="interface-collection"
      :key="i"
    >
      <div
        v-for="j in i"
        class="interface-item"
        :key="j"
      >
        <div class="item-left">
          <div class="interface-icon">
            <icon-link/>
          </div>
          <div class="interface-text">
            <div class="interface-title">这是接口名称</div>
            <div class="interface-link">/api/testApi/helloWorld</div>
          </div>
        </div>
        <a-button-group>
          <a-button type="outline">
            <template #icon>
              <icon-eye/>
            </template>
            查看
          </a-button>
          <a-button type="primary">删除</a-button>
        </a-button-group>
      </div>
      <template #extra>
        <a-button-group>
          <a-button @click.stop="">
            <template #icon>
              <icon-plus/>
            </template>
          </a-button>
          <a-button @click.stop="">
            <template #icon>
              <icon-delete/>
            </template>
          </a-button>
        </a-button-group>
      </template>
    </a-collapse-item>
  </a-collapse>
</template>

<script setup lang="ts">
  import { IconPlus, IconDelete, IconLink, IconEye} from "@arco-design/web-vue/es/icon";
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
