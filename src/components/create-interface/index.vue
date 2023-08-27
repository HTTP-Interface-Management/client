<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1" title="手动新建">
      <div class="check">
        <div class="interface-data">
          <div class="items">
            <h3>接口名称</h3>
            <a-input v-model= "interfaceData.name" />
          </div>
          <div class="items">
            <h3>所属项目集</h3>
            <a-select :style="{width:'320px'}" placeholder="选择所属项目"/>
            /<a-select :style="{width:'320px'}" placeholder="选择所属接口集"/>
          </div>
          <!-- <div class="items">
            <h3>版本号</h3>
            <a-input />
          </div> -->
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
            <a-tabs default-active-key="1" type="card">
              <template #extra>
                <a-link type="primary" @click="">Add</a-link>
              </template>
              <a-tab-pane
                key="1"
                title="Request Headers"
              >
                <a-table
                :columns="requestTableColumns"
                :data="headers"
                :pagination="false"
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

              <a-tab-pane
                title="Params"
                key="2"
              >
                <div class="mock-params">
                  <div class="params-title">Query参数</div>
                  <a-table
                  />
                  <div class="params-title">动态参数</div>
                  <a-table
                  />
                </div>
              </a-tab-pane>

              <a-tab-pane key="3" title="Request Body">
                <a-space>
                  <a-tabs default-active-key="2">
                    <a-tab-pane key="1" title="none">
                      <a-empty description="未设置Body"/>
                    </a-tab-pane>
                    <a-tab-pane key="2" title="form-data">
                      <a-table
                      :columns="requestTableColumns"
                      :data="body"
                      :pagination="false"
                      >
                        <template #param="{ rowIndex }">
                          <a-input v-model="body[rowIndex].param" />
                        </template>
                        <template #type="{ rowIndex }">
                          <a-select v-model="body[rowIndex].type">
                            <a-option v-for="type of bodyFormDataType" :value="type">{{type}}</a-option>
                          </a-select>
                        </template>
                        <template #required="{ rowIndex }">
                          <a-select v-model="body[rowIndex].required" @change="">
                            <a-option v-for="value of [true,false]">{{value}}</a-option>
                          </a-select>
                        </template>
                        <template #description="{ rowIndex }">
                          <a-input v-model="body[rowIndex].description" />
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
                      <codemirror :style="{ height: '200px'}" />
                    </a-tab-pane>
                  </a-tabs>
                </a-space>
              </a-tab-pane>
              <a-tab-pane key="4" title="Cookies">
                <a-table
                :columns="requestTableColumns"
                :data="cookies"
                :pagination="false"
                >
                  <template #param="{ rowIndex }">
                    <a-input v-model="cookies[rowIndex].param" />
                  </template>
                  <template #type="{ rowIndex }">
                    <a-select v-model="cookies[rowIndex].type">
                      <a-option v-for="type of cookiesAndHeaderType" :value="type">{{type}}</a-option>
                    </a-select>
                  </template>
                  <template #required="{ rowIndex }">
                    <a-select v-model="cookies[rowIndex].required" @change="">
                      <a-option v-for="value of [true,false]">{{value}}</a-option>
                    </a-select>
                  </template>
                  <template #description="{ rowIndex }">
                    <a-input v-model="cookies[rowIndex].description" />
                  </template>
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </div>

          <div class="items">
            <h3>返回数据</h3>
            <a-tabs default-active-key="1" type="card">
              <template #extra>
                <a-link type="primary">Add</a-link>
              </template>
              <a-tab-pane key="1" title="Response Headers">

                <a-table
                  :columns="requestTableColumns"
                  :data="headers"
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
              <a-tab-pane key="2" title="Response Body">
                <codemirror :style="{ height: '200px'}"/>
              </a-tab-pane>

              <a-tab-pane key="3" title="Cookies">

                <a-table
                  :columns="requestTableColumns"
                  :data="cookies"
                  :pagination="false"
                >
                  <template #param="{ rowIndex }">
                    <a-input v-model="cookies[rowIndex].param" />
                  </template>
                  <template #type="{ rowIndex }">
                    <a-select v-model="cookies[rowIndex].type">
                      <a-option v-for="type of cookiesAndHeaderType" :value="type">{{type}}</a-option>
                    </a-select>
                  </template>
                  <template #required="{ rowIndex }">
                    <a-select v-model="cookies[rowIndex].required" @change="">
                      <a-option v-for="value of [true,false]">{{value}}</a-option>
                    </a-select>
                  </template>
                  <template #description="{ rowIndex }">
                    <a-input v-model="cookies[rowIndex].description" />
                  </template>
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
    </a-tab-pane>

    <a-tab-pane key="2" title="swagger导入">
      <a-space>
        <a-upload
        draggable
        action=""
        />
      </a-space>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { Codemirror } from "vue-codemirror";
  const requestTableColumns = reactive([{
    title: "参数",
    dataIndex: "param",
    slotName:"param",
  },{
    title: "类型",
    dataIndex: "type",
    slotName: "type",
  },{
    title: "必选",
    dataIndex: "required",
    slotName: "required",
  },{
    title: "说明",
    dataIndex: "description",
    slotName: "description",
  },]);

  const responseTableColumns = reactive([{
    title: "参数",
    dataIndex: "param",
    slotName:"param",
  },{
    title: "类型",
    dataIndex: "type",
    slotName: "type",
  },{
    title: "必选",
    dataIndex: "required",
    slotName: "required",
  },{
    title: "默认参数",
    dataIndex: "defaultparam",
    slotName: "defaultparam",
  },{
    title: "说明",
    dataIndex: "description",
    slotName: "description",
  },{
    title: "操作",
    dataIndex: "operate",
    slotName: "operate",
  }]);


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
  ]

  const headers = reactive([{
      key:'1',
      param:'',
      type:'string',
      required:'true',
      defaultparam:'',
      description:''
    }
  ]);

  const cookies = reactive([{
      key:'1',
      param:'',
      type:'string',
      required:'true',
      defaultparam:'',
      description:''
    }
  ]);
  const body = reactive([{
      key:'1',
      param:'',
      type:'string',
      required:'true',
      defaultparam:'',
      description:''
    }
  ]);

  const responseHeaders = reactive([{
      key:'1',
      param:'',
      type:'string',
      required:'true',
      defaultparam:'',
      description:''
    }
  ]);

  const example = reactive([{
    key:'1',
    param:'',
    type:'string',
    required:'false',
    defaultparam:'',
    description:''
  }]);

  const interfaceData = reactive({
    method: "cupidatat voluptate adipisicing culpa elit",
    url: "http://akcshcitf.se/puwwidnto",
    name: "引和世研真",
    catalog_name: "国器每制",
    request_params: {
        params: {},
        body: null,
        Header: null
    },
    description: "们般解又连十专农几地六何报名很此离。头五体根现现及土加路百置干。阶状类车应红际路治不名看能图报老实住。构速各民区记例派温价养转色极干。所具般流始斗知着回按证科织。该查清入就志科样话专精研。王色量质研天管争候清太关术。",
    project_id: 4,
    response_data: {},
    created_by: 1
  });

    const onSuccess = () => {

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
    /deep/.arco-tabs-content{
      padding: 16px;
    }
  }
</style>

