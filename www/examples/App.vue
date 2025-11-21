<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineButton, defineTable, defineCard, defineForm } from '@ldesign/webcomponent-vue';

// 按需导入组件
defineButton();
defineTable();
defineCard();
defineForm();

// 表格数据
const columns = ref([
  { key: 'id', title: 'ID', width: 60, sortable: true },
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', width: 80, sortable: true },
  { key: 'email', title: '邮箱' }
]);

const dataSource = ref<any[]>([]);

// 表单数据
const formData = ref({
  username: '',
  email: '',
  password: ''
});

// 生成大量测试数据
onMounted(() => {
  dataSource.value = Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `用户 ${i + 1}`,
    age: 20 + (i % 40),
    email: `user${i + 1}@example.com`
  }));
});

const handleSort = (e: CustomEvent) => {
  const { key, order } = e.detail;
  console.log('排序:', key, order);
};

const handleSubmit = async (e: CustomEvent) => {
  console.log('表单提交:', e.detail);
  alert('提交成功！');
};

const handleButtonClick = () => {
  alert('按钮被点击！');
};
</script>

<template>
  <div class="app">
    <h1>LDesign WebComponent - Vue 3 示例</h1>

    <!-- 按钮示例 -->
    <ldesign-card title="按钮示例">
      <div class="button-group">
        <ldesign-button type="primary" @ldesignClick="handleButtonClick">
          Primary
        </ldesign-button>
        <ldesign-button type="success">Success</ldesign-button>
        <ldesign-button type="warning">Warning</ldesign-button>
        <ldesign-button type="danger">Danger</ldesign-button>
      </div>
    </ldesign-card>

    <!-- 表格示例 -->
    <ldesign-card title="数据表格（虚拟滚动 5000 行）" style="margin-top: 24px;">
      <ldesign-table
        :columns="JSON.stringify(columns)"
        :dataSource="JSON.stringify(dataSource)"
        bordered
        striped
        virtual
        height="400"
        row-height="48"
        @ldesignSort="handleSort"
      />
    </ldesign-card>

    <!-- 表单示例 -->
    <ldesign-card title="表单示例" style="margin-top: 24px;">
      <ldesign-form 
        layout="horizontal"
        label-width="100"
        @ldesignSubmit="handleSubmit"
      >
        <ldesign-form-item label="用户名" name="username" required>
          <ldesign-input 
            v-model="formData.username"
            placeholder="请输入用户名"
          />
        </ldesign-form-item>

        <ldesign-form-item label="邮箱" name="email" required>
          <ldesign-input 
            v-model="formData.email"
            type="email"
            placeholder="请输入邮箱"
          />
        </ldesign-form-item>

        <ldesign-form-item>
          <ldesign-button type="primary" html-type="submit">
            提交
          </ldesign-button>
        </ldesign-form-item>
      </ldesign-form>
    </ldesign-card>
  </div>
</template>

<style scoped>
.app {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

h1 {
  color: var(--ld-color-primary);
  margin-bottom: 24px;
}
</style>




