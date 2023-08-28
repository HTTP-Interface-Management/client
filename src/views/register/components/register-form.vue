<template>
  <div class="register-form-wrapper">
    <div class="register-form-title">{{ $t('register.form.title') }}</div>
    <div class="register-form-sub-title">{{ $t('register.form.title') }}</div>
    <div class="register-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="registerForm"
      :model="userInfo"
      class="register-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('register.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('register.form.userName.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('register.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('register.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('register.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.confirmPassword"
          :placeholder="$t('register.form.confirmPassword.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="register-form-agreement-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="registerConfig.acceptAgreement"
            @change="setAcceptAgreement as any"
          >
            {{ $t('register.form.readAgreement') }}
          </a-checkbox>
          <a-link>{{ $t('register.form.agreement') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('register.form.register') }}
        </a-button>
        <a-button type="text" long class="register-form-register-btn" @click="handleToLogin">
          {{ $t('register.form.login') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { RegisterData } from '@/api/user';
  import { LoginData } from "@/api/user";

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const registerConfig = useStorage('login-config', {
    acceptAgreement: true,
    username: '',
    password: '',
    confirmPassword: ''
  });
  const userInfo = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    acceptAgreement: registerConfig.value.confirmPassword
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (userInfo.password !== userInfo.confirmPassword){
      Message.warning({
        content: '两次密码输入不一致',
        duration: 5 * 1000
      });
      return;
    }
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        const res = await userStore.register({
          username: userInfo.username,
          password: userInfo.password
        });
        if (res.code === 200 ) {
          userInfo.username = '';
          userInfo.password = '';
          userInfo.confirmPassword = '';
        }
        // Message.success(t('login.form.login.success'));
      } catch (err) {
        errorMessage.value = (err as Error).message;
        userInfo.username = '';
        userInfo.password = '';
      } finally {
        setLoading(false);
      }
    }
  };
  const setAcceptAgreement = (value: boolean) => {
    registerConfig.value.acceptAgreement = value;
  };
  const handleToLogin = () => {
    router.push('/login')
  }
</script>

<style lang="less" scoped>
  .register-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-agreement-actions {
      display: flex;
      align-items: center;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
