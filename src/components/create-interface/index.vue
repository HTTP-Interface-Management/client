<template>
  <div class="check">
    <div class="interface-data">
      <div class="items">
        <h3>接口名称</h3>
        <a-input v-model= "interfaceData.name" />
      </div>
      <div class="items">
        <h3>所属项目集</h3>
        <a-select
          :style="{width:'320px'}"
          placeholder="选择所属项目"
          v-model="interfaceData.project_id"
          v-if="!props.projectInfo"
        >
          <a-option
            v-for="i in myProjectList"
            :value="i.project_id"
          >
            {{ i.name }}
          </a-option>
        </a-select>
        <span v-else> {{projectInfo.name}} </span>
        / <a-select
        :style="{width:'320px'}"
        placeholder="选择所属接口集"
        allow-create
        v-model="interfaceData.catalog_name"
      >
        <a-option
          v-for="i in catalogList"
          :value="i"
        >
          {{ i }}
        </a-option>
      </a-select>
      </div>
      <div class="items">
        <h3>接口功能描述</h3>
        <a-input v-model= "interfaceData.description"/>
      </div>
      <div class="items">
        <h3>接口地址（URL）</h3>
        <a-input v-model="interfaceData.url"/>
      </div>
      <div class="items">
        <h3>HTTP请求方式</h3>
        <a-select
          placeholder="选择请求方法"
          v-model="interfaceData.method"
        >
          <a-option
            v-for="i in methodsList"
            :key="i.name"
            :value="i.value"
          >
            {{ i.name }}
          </a-option>
        </a-select>
      </div>
      <div class="items">
        <h3>请求参数</h3>
        <a-tabs default-active-key="1" type="card">
          <a-tab-pane
            key="1"
            title="Request Headers"
          >
            <a-button
              :style="{ marginBottom: '16px' }"
              @click="addRequestHeaderParam"
            >
              添加
            </a-button>
            <a-table
              :data="requestHeader"
              :pagination="false"
            >
              <template #columns>
                <a-table-column title="参数名" data-index="name">
                  <template #cell="{ record }">
                    <a-input v-model="record.name"/>
                  </template>
                </a-table-column>
                <a-table-column title="类型" data-index="type">
                  <template #cell="{ record }">
                    <a-select v-model="record.type">
                      <a-option v-for="type of HeaderAndParamsType" :value="type">{{type}}</a-option>
                    </a-select>
                  </template>
                </a-table-column>
                <a-table-column title="是否必选" data-index="required">
                  <template #cell="{ record }">
                    <a-select v-model="record.required">
                      <a-option v-for="value of [true,false]">{{value}}</a-option>
                    </a-select>
                  </template>
                </a-table-column>
                <a-table-column title="说明" data-index="description">
                  <template #cell="{ record }">
                    <a-input :style="{ width: '200px' }" v-model="record.description"/>
                  </template>
                </a-table-column>
                <a-table-column title="操作">
                  <template #cell="{ record }">
                    <a-button @click="deleteRequestHeaderParam(record)">删除</a-button>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane
            title="Params"
            key="2"
          >
            <div class="mock-params">
              <div class="params-title">Query参数</div>
              <a-button
                :style="{ marginBottom: '16px' }"
                @click="addRequestParam('query')"
              >添加</a-button>
              <a-table
                :data="requestParams.query"
                :pagination="false"
              >
                <template #columns>
                  <a-table-column title="参数名" data-index="name">
                    <template #cell="{ record }">
                      <a-input v-model="record.name"/>
                    </template>
                  </a-table-column>
                  <a-table-column title="类型" data-index="type">
                    <template #cell="{ record }">
                      <a-select v-model="record.type">
                        <a-option v-for="type of HeaderAndParamsType" :value="type">{{type}}</a-option>
                      </a-select>
                    </template>
                  </a-table-column>
                  <a-table-column title="是否必选" data-index="required">
                    <template #cell="{ record }">
                      <a-select v-model="record.required">
                        <a-option v-for="value of [true,false]">{{value}}</a-option>
                      </a-select>
                    </template>
                  </a-table-column>
                  <a-table-column title="说明" data-index="description">
                    <template #cell="{ record }">
                      <a-input :style="{ width: '200px' }" v-model="record.description"/>
                    </template>
                  </a-table-column>
                  <a-table-column title="操作">
                    <template #cell="{ record }">
                      <a-button @click="deleteRequestParam(record, 'query')">删除</a-button>
                    </template>
                  </a-table-column>
                </template>
              </a-table>
              <div class="params-title" :style="{ marginTop: '16px' }">动态参数</div>
              <a-button
                :style="{ marginBottom: '16px' }"
                @click="addRequestParam('path')"
              >
                添加
              </a-button>
              <a-table
                :data="requestParams.path"
                :pagination="false"
              >
                <template #columns>
                  <a-table-column title="参数名" data-index="name">
                    <template #cell="{ record }">
                      <a-input v-model="record.name"/>
                    </template>
                  </a-table-column>
                  <a-table-column title="类型" data-index="type">
                    <template #cell="{ record }">
                      <a-select v-model="record.type">
                        <a-option v-for="type of HeaderAndParamsType" :value="type">{{type}}</a-option>
                      </a-select>
                    </template>
                  </a-table-column>
                  <a-table-column title="是否必选" data-index="required">
                    <template #cell="{ record }">
                      <a-select v-model="record.required">
                        <a-option v-for="value of [true,false]">{{value}}</a-option>
                      </a-select>
                    </template>
                  </a-table-column>
                  <a-table-column title="说明" data-index="description">
                    <template #cell="{ record }">
                      <a-input :style="{ width: '200px' }" v-model="record.description"/>
                    </template>
                  </a-table-column>
                  <a-table-column title="操作">
                    <template #cell="{ record }">
                      <a-button @click="deleteRequestParam(record, 'path')">删除</a-button>
                    </template>
                  </a-table-column>
                </template>
              </a-table>
            </div>
          </a-tab-pane>

          <a-tab-pane key="3" title="Request Body">
            <a-tabs default-active-key="none" @change="onBodyFormatChange">
              <a-tab-pane key="none" title="none">
                <a-empty description="未设置Body"/>
              </a-tab-pane>
              <a-tab-pane key="form-data" title="form-data">
                <a-button
                  :style="{ marginBottom: '16px' }"
                  @click="addRequestBodyFormData"
                >
                  添加
                </a-button>
                <a-table
                  :data="requestBody['form-data']"
                  :pagination="false"
                >
                  <template #columns>
                    <a-table-column title="参数名" data-index="name">
                      <template #cell="{ record }">
                        <a-input v-model="record.name"/>
                      </template>
                    </a-table-column>
                    <a-table-column title="类型" data-index="type">
                      <template #cell="{ record }">
                        <a-select v-model="record.type">
                          <a-option v-for="type of bodyFormDataType" :value="type">{{type}}</a-option>
                        </a-select>
                      </template>
                    </a-table-column>
                    <a-table-column title="是否必选" data-index="required">
                      <template #cell="{ record }">
                        <a-select v-model="record.required">
                          <a-option v-for="value of [true,false]">{{value}}</a-option>
                        </a-select>
                      </template>
                    </a-table-column>
                    <a-table-column title="说明" data-index="description">
                      <template #cell="{ record }">
                        <a-input :style="{ width: '200px' }" v-model="record.description"/>
                      </template>
                    </a-table-column>
                    <a-table-column title="操作">
                      <template #cell="{ record }">
                        <a-button @click="deleteRequestBodyFormData(record)">删除</a-button>
                      </template>
                    </a-table-column>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="json" title="json">
                <codemirror :style="{ height: '200px'}" v-model="requestBody['json']"/>
              </a-tab-pane>
              <a-tab-pane key="xml" title="xml">
                <codemirror :style="{ height: '200px'}" v-model="requestBody['xml']"/>
              </a-tab-pane>
              <a-tab-pane key="yaml" title="yaml" >
                <codemirror :style="{ height: '200px'}" v-model="requestBody['yaml']"/>
              </a-tab-pane>
            </a-tabs>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="items">
        <h3>返回数据</h3>
        <a-tabs default-active-key="1" type="card">
          <a-tab-pane key="1" title="Response Headers">
            <a-button
              :style="{ marginBottom: '16px' }"
              @click="addResponseHeaderData"
            >
              添加
            </a-button>
            <a-table
              :data="responseHeader"
              :pagination="false"
            >
              <template #columns>
                <a-table-column title="参数名" data-index="name">
                  <template #cell="{ record }">
                    <a-input v-model="record.name"/>
                  </template>
                </a-table-column>
                <a-table-column title="类型" data-index="type">
                  <template #cell="{ record }">
                    <a-select v-model="record.type">
                      <a-option v-for="type of HeaderAndParamsType" :value="type">{{type}}</a-option>
                    </a-select>
                  </template>
                </a-table-column>
                <a-table-column title="是否必选" data-index="required">
                  <template #cell="{ record }">
                    <a-select v-model="record.required">
                      <a-option v-for="value of [true,false]">{{value}}</a-option>
                    </a-select>
                  </template>
                </a-table-column>
                <a-table-column title="说明" data-index="description">
                  <template #cell="{ record }">
                    <a-input :style="{ width: '200px' }" v-model="record.description"/>
                  </template>
                </a-table-column>
                <a-table-column title="操作">
                  <template #cell="{ record }">
                    <a-button @click="deleteResponseHeaderData(record)">删除</a-button>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" title="Response Body">
            <codemirror :style="{ height: '200px'}" v-model="responseBody"/>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="items">
        <a-button
          long
          class="create-btn"
          type="primary"
          @click="createInterface"
        >
          创建
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { getProjectList } from "@/api/user";
import { useUserStore } from "@/store";
import {addInterface} from "@/api/interface";
import { Message } from "@arco-design/web-vue";

const props = defineProps(['projectInfo', 'catalogList']);
const emits = defineEmits(['onFreshData', 'onClose']);
console.log(props.catalogList);
const methodsList = [
    {name: 'GET', value: 'GET'},
    {name: 'POST', value: 'POST'},
    {name: 'OPTIONS', value: 'OPTIONS'},
    {name: 'PUT', value: 'PUT'},
    {name: 'DELETE', value: 'DELETE'},
    {name: 'HEAD', value: 'HEAD'},
    {name: 'CONNECT', value: 'CONNECT'},
    {name: 'TRACE', value: 'TRACE'},
    {name: 'PATCH', value: 'PATCH'},
  ];

  const bodyFormDataType = [
    'string',
    'integer',
    'number',
    'file',
    'array',
  ];

  const HeaderAndParamsType = [
    'string',
    'integer',
    'number',
    'array',
  ]

  let requestHeader = reactive([]);

  const requestBody = reactive({
    'form-data': [],
    'json': '',
    'yaml': '',
    'xml': ''
  });

  const requestParams = reactive({
    'query': [],
    'path': []
  })

  // body 格式
  const currentSelectFormat = ref();
  const onBodyFormatChange = (key: string | number) => {
    currentSelectFormat.value = key;
  }

  const responseHeader = reactive([]);

  const responseBody = ref(null);

  const interfaceData = reactive({
    method: "GET",
    url: "",
    name: "",
    catalog_name: "",
    project_id: props?.projectInfo?.project_id ? props?.projectInfo?.project_id : null,
    request_params: {
        params: requestParams,
        body: requestBody,
        Header: requestHeader,
    },
    description: "",
    response_data: {
      response_headers: responseHeader,
      response_body: responseBody,
    },
    created_by: useUserStore().user_info.user_id
  });

  // 载入已有的项目列表
  let myProjectList = ref();
  onMounted(async () => {
    myProjectList.value = (await getProjectList(useUserStore().user_info.user_id as any)).data;
  });


  // 添加Request Header参数
  const addRequestHeaderParam = () => {
    requestHeader.push({
      name:'',
      type:'',
      required:'',
      description:''
    } as never);
  }

  // 删除Request Header参数
  const deleteRequestHeaderParam = (
    currentRecord: { name: string; type: string; required: string; description: string; },
  ) => {
    requestHeader.map((value, index) => {
      if (value.name === currentRecord.name && value.type === currentRecord.type && value.required === currentRecord.required && value.description === currentRecord.description)
        requestHeader.splice(index, 1);
    })
    console.log(requestHeader);
  }

  // 添加Request Param参数
  const addRequestParam = (type: string) => {
      if (type === 'query'){
        requestParams.query.push({
          name:'',
          type:'',
          required:'',
          description:''
        } as never);
      }
      else if (type === 'path'){
        requestParams.path.push({
          name:'',
          type:'',
          required:'',
          description:''
        } as never);
      }
  }

  // 删除Request Param参数
  const deleteRequestParam = (
    currentRecord: { name: string; type: string; required: string; description: string; },
    type: string
  ) => {
      if (type === 'query'){
        requestParams.query.map((value, index) => {
          if (value.name === currentRecord.name && value.type === currentRecord.type && value.required === currentRecord.required && value.description === currentRecord.description)
            requestParams.query.splice(index, 1);
        });
      } else if (type === 'path'){
        requestParams.path.map((value, index) => {
          if (value.name === currentRecord.name && value.type === currentRecord.type && value.required === currentRecord.required && value.description === currentRecord.description)
            requestParams.path.splice(index, 1);
        });
      }
    console.log(requestHeader);
  }

  // 添加Request Body FormData参数
  const addRequestBodyFormData = () => {
    requestBody['form-data'].push({
      name:'',
      type:'',
      required:'',
      description:''
    } as never);
  }

  // 删除Request Body FormData参数
  const deleteRequestBodyFormData = (
    currentRecord: { name: string; type: string; required: string; description: string; },
  ) => {
    requestBody['form-data'].map((value, index) => {
      if (value.name === currentRecord.name && value.type === currentRecord.type && value.required === currentRecord.required && value.description === currentRecord.description)
        requestBody['form-data'].splice(index, 1);
    })
    console.log(requestBody['form-data']);
  }

  // 添加Response Headers参数
  const addResponseHeaderData = () => {
    responseHeader.push({
      name:'',
      type:'',
      required:'',
      description:''
    } as never);
  }

  // 删除Response Headers参数
  const deleteResponseHeaderData = (
    currentRecord: { name: string; type: string; required: string; description: string; },
  ) => {
    responseHeader.map((value, index) => {
      if (value.name === currentRecord.name && value.type === currentRecord.type && value.required === currentRecord.required && value.description === currentRecord.description)
        responseHeader.splice(index, 1);
    })
    console.log(responseHeader);
  }

  const createInterface = () => {
    for (let i in requestBody){
      if (i !== currentSelectFormat.value){
        if(i !== 'form-data')
          requestBody[i] = '';
        else
          requestBody[i] = [];
      }
    }
    addInterface(interfaceData).then((res) => {
      if (res.code === 200){
        Message.success({
          content: '创建接口成功',
          duration: 5 * 1000
        });
        emits('onClose', true);
        emits('onFreshData', true);
        console.log('emitted');
      }
    });
  }
</script>

<style scoped lang="less">
/deep/.arco-textarea{
  height: 200px !important;
  resize: none;
}
  .interface-data{
    margin: 16px 100px;
  }
  .items{
    width: 800px;
    margin: 0 auto;
    .params-title{
      padding-bottom: 16px;
      font-weight: 600;
    }
    /deep/.arco-tabs-content{
      padding: 16px;
    }
    .create-btn{
      margin: 32px 0;
    }
  }
</style>

