<template>
  <div class="check">
    <div class="interfacedata">
      <div class="items">
        <h3>接口功能描述</h3>
        <span>获取二级分类</span>
      </div>
      <div class="items">
        <h3>接口地址（URL）</h3>
        <span>http://testtapi.xuexiluxian.cn/api/course/category/getSecondCategorys</span>
      </div>
      <div class="items">
        <h3>支持格式</h3>
        <span>JSON</span>
      </div>
      <div class="items">
        <h3>HTTP请求方式</h3>
        <span>GET</span>
      </div>

      <div class="items">
        <h3>请求参数</h3>
        <a-radio-group
          type="button"
        >
          <a-radio value="request-headers">Request Headers</a-radio>
          <a-radio value="request-query">Requuest Query</a-radio>
          <a-radio value="request-body">Request Body</a-radio>
        </a-radio-group>     
        <a-table :columns="columns" :data="request" />
      </div>

      <div class="items">
        <h3>返回数据</h3>
        <a-radio-group type="button">
          <a-radio value="request-headers">Request Headers</a-radio>
          <a-radio value="request-body">Request Body</a-radio>
          <a-radio value="example">example</a-radio>
        </a-radio-group>
        <a-table :columns="columns" :data="response" />
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive,ref } from 'vue';

  const columns = [
      {
        title: '参数',
        dataIndex: 'param',
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
        title: '默认参数',
        dataIndex: 'defaultparams',
      },
      {
        title: '说明',
        dataIndex: 'illustrate',
      },
    ];
    
    const request = reactive([{
      key:'1',
      param:'',
      types:'string',
      required:'false',
      defaultparams:'',  
      illustrate:'',
      label:''
    }]);
    const response = reactive([{
      key:'1',
      param:'',
      types:'string',
      required:'false',
      defaultparams:'',  
      illustrate:''
    }]);
</script>

<style scoped lang="less">
.interfacedata{
  margin: 0 100px;
}
.items{
  width: 800px;
  margin: 0 auto;
}
</style>

