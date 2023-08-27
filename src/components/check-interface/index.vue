<template>
  <div class="check">
    <div class="interface-data">
      <div class="items">
        <h3>接口名称</h3>
        <a-input v-model="interfaceInfo.name"></a-input>
      </div>
      <div class="items">
        <h3>所属项目集</h3>
        <span class="interface-directory">
          项目1 /
          <a-input v-model="interfaceInfo.catalogName"/>
        </span>
      </div>
      <div class="items">
        <h3>版本号</h3>
        <span>1</span>
      </div>
      <div class="items">
        <h3>接口功能描述</h3>
        <a-input v-model="interfaceInfo.description"></a-input>
      </div>
      <div class="items">
        <h3>接口地址（URL）</h3>
        <a-input v-model="interfaceInfo.url"></a-input>
      </div>

      <div class="items">
        <h3>HTTP请求方式</h3>
        <a-select :defaultValue="interfaceInfo.method" placeholder="选择请求方法" v-model="interfaceInfo.method">
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
          <a-tab-pane title="Request Headers" key="1">
            <a-table
              :columns="requestTableColumns"
              :data="interfaceInfo.request_params.header"
              :pagination="false"
            >
              <template #name="{ rowIndex }">
                <a-input v-model="interfaceInfo.request_params.header[rowIndex].name" />
              </template>
              <template #type="{ rowIndex }">
                <a-input v-model="interfaceInfo.request_params.header[rowIndex].type" />
              </template>
              <template #require="{ rowIndex }">
                <a-select v-model="interfaceInfo.request_params.header[rowIndex].require" @change="">
                  <a-option v-for="value of [true,false]">{{value}}</a-option>
                </a-select>
              </template>
              <template #defaultparam="{ rowIndex }">
                <a-input v-model="interfaceInfo.request_params.header[rowIndex].defaultparam" />
              </template>
              <template #description="{ rowIndex }">
                <a-input v-model="interfaceInfo.request_params.header[rowIndex].description" />
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane title="Request Body" key="2">
            <a-tabs default-active-key="2">
              <a-tab-pane key="1" title="none">
                <a-empty description="暂未设置Body"/>
              </a-tab-pane>
              <a-tab-pane key="2" title="form-data">
                <a-table
                  :columns="requestTableColumns"
                  :data="interfaceInfo.request_params.body['form-data']"
                >
                  <template #name="{ rowIndex }">
                    <a-input v-model="interfaceInfo.request_params.body['form-data'][rowIndex].name" />
                  </template>
                  <template #type="{ rowIndex }">
                    <a-input v-model="interfaceInfo.request_params.body['form-data'][rowIndex].type" />
                  </template>
                  <template #require="{ rowIndex }">
                    <a-input v-model="interfaceInfo.request_params.body['form-data'][rowIndex].require" />
                  </template>
                  <template #description="{ rowIndex }">
                    <a-input v-model="interfaceInfo.request_params.body['form-data'][rowIndex].description" />
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="3" title="json">
                <codemirror :style="{ height: '200px'}"/>
              </a-tab-pane>
              <a-tab-pane key="4" title="xml">
                <codemirror :style="{ height: '200px'}"/>
              </a-tab-pane>
              <a-tab-pane key="5" title="yaml">
                <codemirror :style="{ height: '200px'}"/>
              </a-tab-pane>
            </a-tabs>
          </a-tab-pane>
          <a-tab-pane title="Cookies" key="3">

            <a-table
              :columns="requestTableColumns"
              :data="cookies"
              :pagination="false"
            >
              <template #param="{ rowIndex }">
                <a-input v-model="interfaceInfo.request_params.cookies[rowIndex].param" />
              </template>
              <template #type="{ rowIndex }">
                <a-select v-model="interfaceInfo.request_params.cookies[rowIndex].type">
                  <a-option v-for="type of cookiesAndHeaderType" :value="type">{{type}}</a-option>
                </a-select>
              </template>
              <template #required="{ rowIndex }">
                <a-select v-model="interfaceInfo.request_params.cookies[rowIndex].required" @change="">
                  <a-option v-for="value of [true,false]">{{value}}</a-option>
                </a-select>
              </template>
              <template #description="{ rowIndex }">
                <a-input v-model="interfaceInfo.request_params.cookies[rowIndex].description" />
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </div>

      <div class="items">
        <h3>返回数据</h3>
        <a-tabs default-active-key="1" type="card">
          <a-tab-pane title="Response Headers" key="1">
            <a-table
              :columns="requestTableColumns"
              :data="response"
            >
              <template #param="{ rowIndex }">
                <a-input v-model="headers[rowIndex].param" />
              </template>
              <template #type="{ rowIndex }">
                <a-select v-model="headers[rowIndex].type">
                  <a-option v-for="type of cookiesAndHeaderType" :value="type">{{type}}</a-option>
                </a-select>
              </template>
              <template #required="{ rowIndex }">
                <a-select v-model="headers[rowIndex].required" @change="">
                  <a-option v-for="value of [true,false]">{{value}}</a-option>
                </a-select>
              </template>
              <template #defaultparam="{ rowIndex }">
                <a-input v-model="headers[rowIndex].defaultparam" />
              </template>
              <template #description="{ rowIndex }">
                <a-input v-model="headers[rowIndex].description" />
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane title="Response Body" key="2">
            <codemirror :style="{ height: '200px'}" />
          </a-tab-pane>
          <a-tab-pane title="Cookies" key="3">
            <a-table
              :columns="responseTableColumns"
              :data="response"
              :pagination="false"
            />
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="items">
        <h3>接口更新历史</h3>
        <a-list>
          <a-list-item v-for="i in 4" :key="i">
            <a-list-item-meta
              title="修复了一些BUG"
              description="用户名"
            >
              <template #avatar>
                <a-avatar :size="8" style="background: rgb(var(--success-6))">
                </a-avatar>
              </template>
            </a-list-item-meta>
            <template #actions>
              <a-button
                @click="onShowInterfaceHistoryModal"
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
    </div>
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
      <mock-space :interface-data="interfaceInfo"/>
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
      <interface-history/>
    </a-modal>
    <a-modal
      title="接口修改说明"
      :visible="isUpdateInterfaceModalShow"
      @cancel="onCancelUpdateInterfaceModal"
      unmount-on-close
      class="commit-update-text"
    >
      <a-textarea
        placeholder="请输入接口更新说明"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from "vue";
  import MockSpace from "@/components/check-interface/mock-space.vue";
  import { IconEye, IconPlus } from "@arco-design/web-vue/es/icon";
  import InterfaceHistory from "@/components/check-interface/interface-history.vue";
  import { Modal } from "@arco-design/web-vue";
  import { Codemirror } from "vue-codemirror";

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
      hideCancel: false
    })
  }

  const interfaceInfo = reactive({
    name: '接口名称',
    description: '获取二级分类',
    url: 'http://testtapi.xuexiluxian.cn/api/course/category/getSecondCategorys',
    method: 'GET',
    interfaceId: '123',
    projectId: '456',
    versionId: '1',
    catalogName: '集合1',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    request_params: {
      params: {
        path: [],
        query: ''
      },
      cookies: null,
      body: {
        'form-data': [
          {
            name: 'name',
            type: 'string',
            require: false,
            description: 'The name of the item',
          },
          {
            name: 'sex',
            type: 'string',
            require: false,
            description: 'The name of the item',
          },
          {
            name: 'age',
            type: 'string',
            require: false,
            description: 'The name of the item',
          },
        ],
      },
      header: null
    },
    response_data: {

    },
  });

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

  const formatsList = [
    {name: 'None', value: 'None'},
    {name: 'FormData', value: 'FormData'},
    {name: 'JSON', value: 'JSON'},
    {name: 'XML', value: 'XML'},
    {name: 'YAML', value: 'YAML'},
    {name: 'RAW', value: 'RAW'},
    {name: 'BINARY', value: 'BINARY'},
  ];

  const bodyFormDataType = [
    'string',
    'integer',
    'number',
    'file',
    'array',
  ];

  const cookiesAndHeaderType = [
    'string',
    'integer',
    'number',
    'array',
  ];

  const requestTableColumns = [
      {
        title: '参数',
        dataIndex: 'name',
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
        dataIndex: 'description',
      },
    ];
  const responseTableColumns = [
    {
      title: '参数',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'types',
    },
    {
      title: '说明',
      dataIndex: 'description',
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

  const headers = reactive([{
    key:'1',
    param:'',
    type:'string',
    required:'true',
    defaultparam:'',
    description:''
  }
  ]);

  const isInterfaceHistoryModalShow = ref(false);
  const onShowInterfaceHistoryModal = () => {
    isInterfaceHistoryModalShow.value = true
  }
  const onCancelInterfaceHistoryModal = () => {
    isInterfaceHistoryModalShow.value = false
  }

  const isMockModalShow = ref(false);
  const onShowMockModal = () => {
    isMockModalShow.value = true
  }
  const onCancelMockModal = () => {
    isMockModalShow.value = false
  }
</script>

<style scoped lang="less">
  /deep/.arco-textarea{
    height: 200px !important;
    resize: none;
  }
  .check{
    .interface-data{
      margin: 0 100px;
    }
    .items{
      width: 800px;
      margin: 0 auto;
      padding-bottom: 16px;
      /deep/.arco-tabs-content{
        padding: 16px;
      }
      .interface-directory{
        display: flex;
        align-items: center;
        /deep/.arco-input-wrapper{
          margin-left: 16px;
          width: 200px;
        }
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
          background: rgb(var(--primary-6));
          position: absolute;
        }
      }
    }

    .bottom-btn{
      width: 800px;
      margin: 32px auto;
      button{
        margin-top: 16px;
      }
    }
  }

</style>

