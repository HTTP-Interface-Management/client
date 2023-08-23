<template>
    <div class="create-project">
        <a-form class="create-project-form" layout="vertical">
            <a-form-item label="项目图标">
                <a-upload
                    list-type="picture-card"
                    action="/"
                    image-preview
                />
            </a-form-item>
            <a-form-item label="项目名">
                <a-input/>
            </a-form-item>
            <a-form-item label="创建人">
                <a-input default-value="张三"/>
            </a-form-item>
            <a-form-item label="创建时间">
                <a-date-picker
                    style="width: 220px; margin: 0 24px 24px 0;"
                    show-time
                    :time-picker-props="{ defaultValue: '09:09:06' }"
                    format="YYYY年MM月DD日 HH:mm:ss"
                />
            </a-form-item>
            <a-form-item label="项目简介">
                <a-textarea
                :draggable="false"
                class="description-textarea"
                />
            </a-form-item>
        </a-form>
    </div>   
</template>

<script setup lang="ts">
    
</script>

<style scoped lang="less">
    .create-project {
        .create-project-form {
            width: 50%;
            margin: 0 auto;
            .description-textarea {
                height: 200px;
            }
        }
    }

</style>