<template>
  <div class="mock-space">
    <div class="top">
      <a-input disabled :placeholder="mockData.url">
        <template #prepend>
          {{ mockData.method }}
        </template>
        <template #append>
          <a-button type="primary">
            <template #icon>
              <icon-send/>
            </template>
            发送
          </a-button>
        </template>
      </a-input>
    </div>
    <div class="bottom">
      <a-tabs default-active-key="Params" type="card">
        <template #extra>
          <a-link
            :loading="isMockRefreshing"
            @click="onHandleFreshMock"
          >
            点我Mock数据
          </a-link>
        </template>
        <a-tab-pane
          title="Params"
          key="Params"
        >
          <div class="mock-params">
            <div class="params-title">Query参数</div>
            <a-table
              :columns="bodyFormDataColumns"
              :data="mockData.request_params.query"
            />
            <div class="params-title">动态参数</div>
            <a-table
              :columns="bodyFormDataColumns"
              :data="mockData.request_params.query"
            />
          </div>
        </a-tab-pane>
        <a-tab-pane
          title="Body"
          key="Body"
        >
          <div class="mock-body">
            <a-tabs
              :default-active-key="bodySupportFormat"
            >
              <a-tab-pane
                title="none"
                key="none"
                :disabled="mockData.request_params.body !== null"
              >
                <a-empty description="未设置Body"/>
              </a-tab-pane>
              <a-tab-pane
                title="form-data"
                key="form-data"
                :disabled="!mockData.request_params.body['form-data']"
              >
                <div class="body-form-data">
                  <a-table
                    :columns="bodyFormDataColumns"
                    :data="mockData.request_params.body['form-data']"
                    row-key=""
                  >
                    <template #columns>
                      <a-table-column
                        title="名称"
                        data-index="name"
                      />
                      <a-table-column
                        title="值"
                        data-index="value"
                        allow-clear
                      >
                        <template #cell="{ record }">
                          <a-input
                            v-model="record.value"
                            :style="{width: '100px'}"
                            @input="onRecordValueChange"
                          />
                        </template>
                      </a-table-column>
                      <a-table-column
                        title="类型"
                        data-index="type"
                      />
                      <a-table-column
                        title="是否必填"
                        data-index="require"
                      />
                      <a-table-column
                        title="说明"
                        data-index="description"
                      />
                    </template>
                  </a-table>
                </div>
              </a-tab-pane>
              <a-tab-pane
                title="json"
                key="json"
                :disabled="!mockData.request_params.body['json']"
              >
                <div class="body-json">
                  <codemirror :style="{ height: '200px'}"/>
                </div>
              </a-tab-pane>
              <a-tab-pane
                title="xml"
                key="xml"
                :disabled="!mockData.request_params.body['xml']"
              >
                <div class="body-xml">
                  <a-textarea/>
                </div>
              </a-tab-pane>
              <a-tab-pane
                title="yaml"
                key="yaml"
                :disabled="!mockData.request_params.body['yaml']"
              >
                <div class="body-yaml">
                  <a-textarea/>
                </div>
              </a-tab-pane>
              <a-tab-pane
                title="binary"
                key="binary"
                :disabled="!mockData.request_params.body['binary']"
              >
                <div class="body-binary">
                  <a-upload
                    action="/"
                    :limit="1"
                  />
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-tab-pane>
        <a-tab-pane title="Headers" key="Headers">
          <div class="mock-header">

            <a-table
              :data="mockData.request_params.body['form-data']"
              row-key=""
            >
              <template #columns>
                <a-table-column
                  title="名称"
                  data-index="name"
                />
                <a-table-column
                  title="值"
                  data-index="value"
                  allow-clear
                >
                  <template #cell="{ record }">
                    <a-input
                      v-model="record.value"
                      :style="{width: '100px'}"
                      @input="onRecordValueChange"
                    />
                  </template>
                </a-table-column>
                <a-table-column
                  title="类型"
                  data-index="type"
                />
                <a-table-column
                  title="是否必填"
                  data-index="require"
                />
                <a-table-column
                  title="说明"
                  data-index="description"
                />
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>


      <a-card title="响应" class="response-card">
        <template #extra>
          <a-button>
            <template #icon>
              <a-avatar
                :size="8"
                :style="{ background: 'rgb(var(--success-6))' }"
                v-if="responseData"
              />
              <a-avatar
                :size="8"
                :style="{ background: 'rgb(var(--danger-6))' }"
                v-else-if="errorData"
              />
              <a-avatar
                :size="8"
                :style="{ background: 'var(--color-text-3)' }"
                v-else
              />
            </template>
            <b :style="{ marginRight: '4px' }">
              {{ responseData || errorData ? '405' : ''}}
            </b>
            {{ responseData || errorData ? 'Method Not Allow' : '暂无请求'}}
          </a-button>
        </template>

        <a-tabs
          default-active-key="1"
          type="card"
        >
          <template #extra>
            <a-link type="primary">Add</a-link>
          </template>
          <a-tab-pane key="1" title="Response Headers">
            <a-table
              :columns="cookiesAndHeaderColumns"
              :data="mockData.request_params.header"
            >
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" title="Response Body">
            <codemirror :style="{ height: '200px'}"/>
          </a-tab-pane>
        </a-tabs>
        <a-empty
          :description="`请求发送失败，错误码${500}`"
        >
          <template #image>
            <icon-exclamation-circle style="color: rgb(var(--danger-6))"/>
          </template>
        </a-empty>
        <a-empty
          description="暂未发送请求"
        />
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IconSend, IconExclamationCircle } from "@arco-design/web-vue/es/icon";
  import { onMounted, reactive, ref } from "vue";
  import Mock from "mockjs";
  import { Codemirror } from "vue-codemirror";
  import axios from "axios";

  const props = defineProps(['interfaceData']);
  const interfaceData = props.interfaceData;

  const bodyFormDataColumns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '必选',
      dataIndex: 'require',
    },
    {
      title: '说明',
      dataIndex: 'description',
    },
  ];

  const cookiesAndHeaderColumns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '必选',
      dataIndex: 'require',
    },
    {
      title: '说明',
      dataIndex: 'description',
    },
  ];

  // 记录当前接口requestBody支持的格式
  const bodySupportFormat = Object.keys(interfaceData.request_params.body)[0];

  //装载模拟发送的数据、响应数据和错误信息
  const mockData = interfaceData;
  let responseData = reactive({
    header: {},
    body: {},
    cookies: {},
  });
  const errorData = ref();

  let isMockRefreshing = ref(false);
  // mock刷新整个请求的数据
  const onHandleFreshMock = () => {
    isMockRefreshing.value = true;
    let bodyParams = mockData.request_params.body;
    if (bodyParams['form-data']){
      for(let item of bodyParams['form-data']){
        item.value = mockKeyword(item.name, item.type);
      }
    }

    isMockRefreshing.value = false;
  }

  //给mockData加入value属性以便mock赋值
  const appendRequestParamsValueProperty = () => {
    let params = mockData.params;
    let headerParams = mockData.request_params.header;
    let bodyParams = mockData.request_params.body;
    let cookiesParams = mockData.request_params.cookies;
    if (bodyParams['form-data']){
      for(let item of bodyParams["form-data"]){
        item.value = null;
      }
    }
  }
  appendRequestParamsValueProperty();

  const onRecordValueChange = () => {
  }

  // mockJS识别关键字并生成符合该类型的字符串
  const mockKeyword = (name: string, type: string):any => {
    const Random = Mock.Random;
    if (type === 'number') {
      return Random.natural(1, 100000);
    } else if (type === 'string') {
      if (name.toLowerCase().includes('name'))
        return Random.name();
      else if (name.toLowerCase().includes('date'))
        return Random.date();
      else if (name.toLowerCase().includes('url'))
        return Random.url();
      else if (name.toLowerCase().includes('image') || name.toLowerCase().includes('img'))
        return Random.image();
      else if (name.toLowerCase().includes('color'))
        return Random.color();
      else
        return Random.string('lower', 10, 20);
    } else if (type === 'boolean') {
      return Random.boolean();
    }
  }


  const startMock = () => {
    axios({
      method: mockData.method,
      url:''
    })
  }
</script>

<style scoped lang="less">
  /deep/.arco-input-append{
    padding: 0 !important;
  }

  .mock-space{
    padding-bottom: 16px;
    .top{
    }
    .bottom{
      margin-top: 16px;
      .mock-params{
        padding: 0 16px 16px;
        .params-title{
          padding-bottom: 16px;
          font-weight: 600;
        }
      }
      .mock-body{
        padding: 0 16px 16px;
        /deep/.arco-textarea{
          height: 200px !important;
          resize: none;
        }
        .body-binary{
          padding: 32px;
          /deep/.arco-upload-wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      }
      .mock-header{
        padding: 0 16px 16px;
      }
      .mock-cookies{
        padding: 0 16px 16px;
      }
      .response-card{
        margin-top: 16px;
        /deep/.arco-textarea{
          height: 200px !important;
          resize: none;
        }
      }

      .bottom-btn{
        padding: 0 16px;
        margin-top: 32px;
        button{
          margin-top: 16px;
        }
      }
    }
    .commit-update-text{
    }
  }
</style>
