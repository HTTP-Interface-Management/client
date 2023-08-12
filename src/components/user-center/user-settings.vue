<template>
  <div class="user-settings">
    <a-form layout="vertical">
      <a-form-item label="手机号">
        <a-input>
          <template #prepend>
            +86
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input/>
      </a-form-item>
      <a-form-item label="地区">
        <a-cascader :options="options" placeholder="请选择地区" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" long class="save-btn">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'chaoyang',
          label: 'ChaoYang',
          children: [
            {
              value: 'datunli',
              label: 'Datunli',
            },
          ],
        },
        {
          value: 'haidian',
          label: 'Haidian',
        },
        {
          value: 'dongcheng',
          label: 'Dongcheng',
        },
        {
          value: 'xicheng',
          label: 'Xicheng',
          children: [
            {
              value: 'jinrongjie',
              label: 'Jinrongjie',
            },
            {
              value: 'tianqiao',
              label: 'Tianqiao',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'huangpu',
          label: 'Huangpu',
        },
      ],
    },
  ];
</script>

<style scoped lang="less">
  .user-settings{
    width: 100%;
    padding: 0 16px;
  }

  .save-btn{
    margin: 16px 0;
  }

</style>
