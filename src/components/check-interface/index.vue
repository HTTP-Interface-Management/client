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
          disabled
          v-model="interfaceData.project_id"
        >
          <a-option
            v-for="i in myProjectList"
            :value="i.project_id"
          >
            {{ currentProjectName }}
          </a-option>
        </a-select>
        / <a-select
        :style="{width:'320px'}"
        placeholder="选择所属接口集"
        allow-create
        v-model="interfaceData.catalog_name"
      />
      </div>
      <div class="items">
        <h3>版本号</h3>
        <div>{{interfaceData.version_id}}</div>
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
        <h3>接口更新历史</h3>
        <a-list>
          <a-list-item v-for="i in interfaceHistoryList">
            <a-list-item-meta
              :title="`修改描述：${i.change_info ? i.change_info : '暂无'}`"
              :description="`修改者ID：${18}`"
            >
              <template #avatar>
                <a-avatar :size="8" style="background: rgb(var(--success-6))">
                </a-avatar>
              </template>
            </a-list-item-meta>
            <template #actions>
              <a-button
                @click="onShowInterfaceHistoryModal(i.interface_id, i.version_id)"
                :disabled="i===1"
              >
                查看
                <template #icon>
                  <icon-eye />
                </template>
              </a-button>
            </template>
          </a-list-item>
        </a-list>
      </div>
      <div class="items">
        <div class="bottom-btn">
          <a-button
            size="large"
            type="primary"
            status="success"
            long
            @click="onShowMockModal"
          >
            接口Mock
          </a-button>
          <a-button
            type="primary"
            size="large"
            long
            @click="onShowUpdateInterfaceModal"
          >
            保存修改
          </a-button>
          <a-button
            type="primary"
            size="large"
            status="danger"
            long
            @click="onDeleteInterface"
          >
            删除接口
          </a-button>
        </div>
      </div>
    </div>
  </div>
  <a-modal
    :visible="isMockModalShow"
    @cancel="onCancelMockModal"
    :modal-style="{
    height: '80%',
    width: '80%',
    maxWidth: '800px'
  }"
    :body-style="{
    height: 'calc(100% - 48px)',
    overflowY: 'auto',
  }"
    title="接口Mock"
    :footer="false"
    hide-cancel
    draggable
    unmount-on-close
    :mask-closable="false"
  >
    <mock-space :interface-data="interfaceData"/>
  </a-modal>
  <a-modal
    :visible="isInterfaceHistoryModalShow"
    @cancel="onCancelInterfaceHistoryModal"
    unmount-on-close
    width="auto"
    :modal-style="{
    height: '80%',
  }"
    :body-style="{
    height: 'calc(100% - 48px)',
    overflowY: 'auto',
  }"
    title="接口历史"
    :footer="false"
    hide-cancel
    draggable
  >
    <interface-history :versionHistoryData="currentVersionData"/>
  </a-modal>
  <a-modal
    title="接口修改说明"
    :visible="isUpdateInterfaceModalShow"
    @cancel="onCancelUpdateInterfaceModal"
    unmount-on-close
    class="commit-update-text"
    @ok="updateInterface"
  >
    <a-textarea
      placeholder="请输入接口更新说明"
      v-model="changeInfo"
    />
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { getProjectList } from "@/api/user";
import { useUserStore } from "@/store";
import { Message, Modal } from "@arco-design/web-vue";
import { IconEye } from "@arco-design/web-vue/es/icon";
import MockSpace from "@/components/check-interface/mock-space.vue";
import InterfaceHistory from "@/components/check-interface/interface-history.vue";
import { addInterface, deleteInterface, queryAllVersions } from "@/api/interface";
import { updateInterfaces } from "@/api/interface";
import axios from "axios";
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

const props = defineProps(['interfaceData']);

const currentProjectName = ref();

const emiter = defineEmits([
  'onCheckProjectAuthFailed',
  'onFreshData',
  'onCloseCheckInterfaceModal'
]);

// 载入已有的项目列表(若该接口在自己的项目中不存在则关闭窗口)
let myProjectList = ref();
onMounted(async () => {
  myProjectList.value = (await getProjectList(useUserStore().user_info.user_id as any)).data;
  interfaceHistoryList.value = ((await queryAllVersions(props.interfaceData.interface_id)).data).reverse();
  for (let i of myProjectList.value){
    if (i.project_id === props.interfaceData.project_id){
      currentProjectName.value = i.name;
    }
  }

  if (!currentProjectName.value){
    emiter('onCheckProjectAuthFailed', false);
  }

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
  } else if (type === 'path'){
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

const isUpdateInterfaceModalShow = ref(false);
const onShowUpdateInterfaceModal = () => {
  isUpdateInterfaceModalShow.value = true
}
const onCancelUpdateInterfaceModal = () => {
  isUpdateInterfaceModalShow.value = false
}

const onDeleteInterface = () => {
  Modal.error({
    title: '警告',
    content: '确定要删除该接口吗？',
    cancelText: '取消',
    hideCancel: false,
    onOk: () => {
      deleteInterface(props.interfaceData.interface_id).then((res) => {
        if (res.code === 200) {
          Message.success({
            content: '删除成功',
            duration: 5 * 1000
          });
          emiter('onCloseCheckInterfaceModal', true);
          emiter('onFreshData', true);
        }
      })
    }
  })
}

const isMockModalShow = ref(false);
const onShowMockModal = () => {
  isMockModalShow.value = true
}
const onCancelMockModal = () => {
  isMockModalShow.value = false
}

// 更新接口
const changeInfo = ref('');

const updateInterface = () => {
  for (let i in requestBody){
    if (i !== currentSelectFormat.value){
      if(i !== 'form-data')
        requestBody[i] = '';
      else
        requestBody[i] = [];
    }
  }

  // 加入修改接口描述
  props.interfaceData.change_info = changeInfo.value;

  updateInterfaces(props.interfaceData).then((res) => {
    if (res.code === 200){
      Message.success({
        content: '接口修改成功',
        duration: 5 * 1000
      });
      onCancelUpdateInterfaceModal();
      emiter('onFreshData', true);
      emiter('onCloseCheckInterfaceModal', true);
    }
  });
}

  // 接口历史记录
  const interfaceHistoryList = ref([]);
  const currentVersionData = ref({});

  const isInterfaceHistoryModalShow = ref(false);
  const onShowInterfaceHistoryModal = (interface_id: number, current_id: number) => {
    isInterfaceHistoryModalShow.value = true
    setModalHistoryVersionData(interface_id, current_id)
  }
  const onCancelInterfaceHistoryModal = () => {
    isInterfaceHistoryModalShow.value = false
  }

  const setModalHistoryVersionData = (interface_id: number, version_id: number) => {
    currentVersionData.value = {
      interface_id,
      version_id
    }
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
      background: rgb(var(--primary-6));
      position: absolute;
    }
  }
  .bottom-btn{
    margin-top: 16px;
    button{
      margin-top: 16px;
    }
  }
  .params-title{
    padding-bottom: 16px;
    font-weight: 600;
  }
  /deep/.arco-tabs-content{
    padding: 16px;
  }
  .create-btn{
    margin-bottom: 16px;
  }
}
</style>

