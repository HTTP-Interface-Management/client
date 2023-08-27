<template>
  <div class="interface-history">
    <div class="interface-history-data">
      <div class="items">
        <h3>接口名称</h3>
        <span>测试接口</span>
      </div>
      <div class="items">
        <h3>接口功能描述</h3>
        <span>获取二级分类</span>
      </div>
      <div class="items">
        <h3>接口地址（URL）</h3>
        <span>http://testtapi.xuexiluxian.cn/api/course/category/getSecondCategorys</span>
      </div>
      <div class="items">
        <h3>HTTP请求方式</h3>
        <span>GET</span>
      </div>

      <div class="items">
        <h3>请求参数</h3>
        <a-tabs default-active-key="1" type="card">
          <a-tab-pane title="Request Headers" key="1">
            <a-table :columns="columns" :data="response" />
          </a-tab-pane>
          <a-tab-pane title="Request Body" key="2">
            <a-tabs>
              <a-tab-pane title="none" key="none">
                <a-empty description="未设置Body"/>
              </a-tab-pane>
              <a-tab-pane title="form-data" key="form-data">
                <div class="body-form-data">
                  <a-table :columns="columns"/>
                </div>
              </a-tab-pane>
              <a-tab-pane title="json" key="json">
                <div class="body-json">
                  <codemirror :style="{ height: '200px'}" />
                </div>
              </a-tab-pane>
              <a-tab-pane title="xml" key="xml">
                <div class="body-xml">
                  <codemirror :style="{ height: '200px'}" />
                </div>
              </a-tab-pane>
              <a-tab-pane title="yaml" key="yaml">
                <div class="body-yaml">
                  <codemirror :style="{ height: '200px'}" />
                </div>
              </a-tab-pane>
              <a-tab-pane title="binary" key="binary">
                <div class="body-binary">
                  <a-upload action="/" :limit="1"/>
                </div>
              </a-tab-pane>
            </a-tabs>
          </a-tab-pane>
          <a-tab-pane title="Example" key="3">
            <a-table :columns="columns" :data="response" />
          </a-tab-pane>
        </a-tabs>
      </div>

      <div class="items">
        <h3>返回数据</h3>
        <a-tabs default-active-key="1" type="card">
          <a-tab-pane title="Request Headers" key="1">
            <a-table :columns="columns" :data="response" />
          </a-tab-pane>
          <a-tab-pane title="Request Body" key="2">
            <codemirror :style="{ height: '200px'}" />
          </a-tab-pane>
          <a-tab-pane title="Cookies" key="3">
            <a-table :columns="columns" :data="response" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  import { Codemirror } from "vue-codemirror";

  const columns = [
    {
      title: '参数',
      dataIndex: 'param',
    },
    {
      title: '值',
      dataIndex: 'inputValue',
    },
    {
      title: '类型',
      dataIndex: 'types',
    },
    {
      title: '必选',
      dataIndex: 'required',
    },
    {
      title: '说明',
      dataIndex: 'illustrate',
    },
  ];
  const response = reactive([{
    key:'1',
    param:'',
    types:'string',
    required:'false',
    illustrate:''
  }]);

</script>

<style scoped lang="less">
.interface-history-data{
  margin: 0 100px;
}
.items{
  width: 800px;
  margin: 0 auto;
  /deep/.arco-tabs-content{
    padding: 16px;
  }
  h3{
    font-weight: 600;
    position: relative;
    padding-left: 24px;
    &::before{
      content: "";
      width: 12px;
      border-radius: 2px;
      height: 1em;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      background: rgb(var(--warning-3));
      position: absolute;
    }
  }
}
</style>
