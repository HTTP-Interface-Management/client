<template>
  <div class="check">
    <div class="interfacedata">
      <div class="items">
        <h3>接口功能描述</h3>
        <a-input />
      </div>
      <div class="items">
        <h3>接口地址（URL）</h3>
        <a-input />
      </div>
      <div class="items">
        <h3>支持格式</h3>
        <a-input />
      </div>
      <div class="items">
        <h3>HTTP请求方式</h3>
        <a-select :style="{width:'320px'}" placeholder="Select A Request method" allow-create>
          <a-option >GET</a-option>
          <a-option>POST</a-option>
          <a-option>PUT</a-option>
          <a-option>DELETE</a-option>
          <a-option>HEAD</a-option>
          <a-option>CONNECT</a-option>
          <a-option>OPTIONS</a-option>
          <a-option>TRACE</a-option>
          <a-option>PATCH</a-option>
        </a-select>
      </div>
      <div class="items">
        <h3>请求参数</h3>
        <a-radio-group 
          type="button" 
          @change="">
          <a-radio value="request-headers">Request Headers</a-radio>
          <a-radio value="request-query">Requuest Query</a-radio>
          <a-radio value="request-body">Request Body</a-radio>
        </a-radio-group>  

        <a-button 
          type="primary"
          shape="round"
          style="margin-left: 340px" 
          @click=""> Add
        </a-button>  

        <a-table 
          :data="requestdata" 
        >     
          <template #columns>
            <a-table-column title="参数" data-index="param" slotName="param">
              <template #param="{ rowIndex }">
                <a-input v-model="requestdata[rowIndex].param" />
              </template>
            </a-table-column>
            <a-table-column title="类型" data-index="types" slotName="types">
              <template #types="{ rowIndex }">
                <a-input v-model="requestdata[rowIndex].types" />
              </template>
            </a-table-column>
            <a-table-column title="必选" data-index="required" slotName="required">
              <template #province="{ rowIndex }">
                <a-select v-model="requestdata[rowIndex].required" >
                  <a-option v-for="value of Object.keys(options)">{{value}}</a-option>
                </a-select>
              </template>
            </a-table-column>
            <a-table-column title="默认参数" data-index="defaultparam" slotName="defaultparam">
              <template #defaultparam="{ rowIndex }">
                <a-input v-model="requestdata[rowIndex].defaultparam" />
              </template>
            </a-table-column>
            <a-table-column title="说明" data-index="illustrate" slotName="illustrate">
              <template #illustrate="{ rowIndex }">
                <a-input v-model="requestdata[rowIndex].illustrate" />
              </template>
            </a-table-column>
              <a-table-column title="操作" data-index="operate" slotName="operate">
                <template>

                </template>
              </a-table-column>
          </template> 
        </a-table>      
      </div>
      
      <div class="items">
        <h3>返回数据</h3>

        <a-radio-group type="button">
          <a-radio value="request-headers">Request Headers</a-radio>
          <a-radio value="request-body">Request Body</a-radio>
          <a-radio value="example">example</a-radio>
        </a-radio-group> 

        <a-button 
          type="primary"
          shape="round"
          style="margin-left: 390px" 
          @click=""> Add
        </a-button>  

        <a-table 
          :data="responsedata" 
        >
          <template #columns>
            <a-table-column title="参数" data-index="param"></a-table-column>
            <a-table-column title="类型" data-index="types"></a-table-column>
            <a-table-column title="必选" data-index="required"></a-table-column>
            <a-table-column title="默认参数" data-index="defaultparam"></a-table-column>
            <a-table-column title="说明" data-index="illustrate"></a-table-column>
            <a-table-column title="操作" data-index="operate">
              <template>
                
              </template>
            </a-table-column>
          </template>
        </a-table>   
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive,ref} from 'vue';

  const requestdata = reactive([{
      key:'1',
      param:'',
      types:'string',
      required:'true',
      defaultparam:'',  
      illustrate:''
    }
  ]);
    const responsedata = reactive([{
      key:'1',
      param:'',
      types:'string',
      required:'false',
      defaultparam:'',  
      illustrate:''
    }]);

    const options = [true, false];

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

