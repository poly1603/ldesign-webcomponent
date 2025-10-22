# 在 Vue 3 中使用

@ldesign/webcomponent 完美支持 Vue 3，提供两种使用方式。

## 安装

```bash
# 核心包
npm install @ldesign/webcomponent

# Vue 集成包（可选，提供更好的开发体验）
npm install @ldesign/webcomponent-vue
```

## 配置

### 方式1：配置 Vue 识别自定义元素

在 `main.ts` 中配置：

```typescript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 告诉 Vue 将 ldesign- 开头的标签视为自定义元素
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ldesign-');
};

app.mount('#app');
```

### 方式2：使用 Vue 集成插件（推荐）

```typescript
import { createApp } from 'vue';
import LDesignVue from '@ldesign/webcomponent-vue';
import App from './App.vue';

const app = createApp(App);
app.use(LDesignVue); // 自动配置
app.mount('#app');
```

## 使用方式

### 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
// 按需导入组件
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';

const inputValue = ref('');

const handleClick = () => {
  console.log('按钮被点击');
};

const handleChange = (e: CustomEvent) => {
  inputValue.value = e.detail;
  console.log('输入值:', e.detail);
};
</script>

<template>
  <div>
    <ldesign-button type="primary" @ldesignClick="handleClick">
      点击我
    </ldesign-button>
    
    <ldesign-input 
      :value="inputValue"
      placeholder="请输入内容"
      @ldesignChange="handleChange"
    />
  </div>
</template>
```

### 使用 Vue 集成包（推荐）

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { defineButton, defineInput, defineTable } from '@ldesign/webcomponent-vue';

// 按需导入组件
defineButton();
defineInput();
defineTable();

const inputValue = ref('');
const tableData = ref([
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32 }
]);

const columns = ref([
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', sortable: true }
]);
</script>

<template>
  <div>
    <!-- 事件名称自动处理 -->
    <ldesign-button type="primary" @ldesignClick="handleClick">
      点击我
    </ldesign-button>
    
    <!-- 复杂属性传递 -->
    <ldesign-table
      :columns="JSON.stringify(columns)"
      :dataSource="JSON.stringify(tableData)"
      bordered
      striped
    />
  </div>
</template>
```

## 高级用法

### 1. 表单双向绑定

Web Components 不原生支持 `v-model`，需要手动处理：

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/input';

const formData = ref({
  username: '',
  email: '',
  password: ''
});

const handleUsernameChange = (e: CustomEvent) => {
  formData.value.username = e.detail;
};
</script>

<template>
  <ldesign-form layout="vertical">
    <ldesign-form-item label="用户名" required>
      <ldesign-input
        :value="formData.username"
        @ldesignChange="handleUsernameChange"
        placeholder="请输入用户名"
      />
    </ldesign-form-item>
    
    <!-- 或使用辅助函数 -->
    <ldesign-form-item label="邮箱" required>
      <ldesign-input
        :value="formData.email"
        @ldesignChange="(e) => formData.email = e.detail"
        placeholder="请输入邮箱"
      />
    </ldesign-form-item>
  </ldesign-form>
</template>
```

### 2. 虚拟列表

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@ldesign/webcomponent/virtual-list';

const virtualListRef = ref<any>(null);
const items = ref<any[]>([]);

onMounted(() => {
  // 生成大量数据
  items.value = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `项目 ${i + 1}`,
    description: `描述 ${i + 1}`
  }));
  
  // 设置渲染函数
  if (virtualListRef.value) {
    virtualListRef.value.items = items.value;
    virtualListRef.value.renderItem = (item: any, index: number) => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${item.name}</strong>: ${item.description}`;
      return div;
    };
  }
});
</script>

<template>
  <ldesign-virtual-list
    ref="virtualListRef"
    item-height="60"
    height="500"
  />
</template>
```

### 3. 数据表格

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/table';

const columns = ref([
  { key: 'id', title: 'ID', width: 60, sortable: true },
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', sortable: true },
  { key: 'email', title: '邮箱' }
]);

const dataSource = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `用户 ${i + 1}`,
    age: 20 + (i % 40),
    email: `user${i + 1}@example.com`
  }))
);

const handleSort = (e: CustomEvent) => {
  const { key, order } = e.detail;
  console.log('排序:', key, order);
  // 在这里处理排序逻辑
};
</script>

<template>
  <ldesign-table
    :columns="JSON.stringify(columns)"
    :dataSource="JSON.stringify(dataSource)"
    bordered
    striped
    virtual
    height="500"
    row-height="48"
    @ldesignSort="handleSort"
  />
</template>
```

### 4. 主题切换

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/button';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute(
    'data-theme', 
    isDark.value ? 'dark' : 'light'
  );
};
</script>

<template>
  <ldesign-button @ldesignClick="toggleTheme">
    {{ isDark ? '🌞 亮色' : '🌙 暗色' }}
  </ldesign-button>
</template>
```

## TypeScript 支持

### 类型导入

```typescript
import type { 
  ButtonType, 
  TableColumn,
  FormRule 
} from '@ldesign/webcomponent';

const columns: TableColumn[] = [
  { key: 'name', title: '姓名', sortable: true }
];
```

### 组件 Ref 类型

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/form';

const formRef = ref<any>(null);

const handleSubmit = async () => {
  if (formRef.value) {
    const { valid, errors } = await formRef.value.validate();
    if (valid) {
      const values = await formRef.value.getFieldsValue();
      console.log('表单值:', values);
    }
  }
};
</script>

<template>
  <ldesign-form ref="formRef">
    <!-- 表单内容 -->
  </ldesign-form>
</template>
```

## Vite 配置

如果使用 Vite，无需额外配置，Vite 自动支持 Web Components。

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // Web Components 开箱即用
});
```

## 常见问题

### Q1: 如何实现 v-model？

Web Components 不原生支持 `v-model`，需要手动绑定：

```vue
<template>
  <!-- ❌ 不支持 -->
  <ldesign-input v-model="value" />
  
  <!-- ✅ 手动绑定 -->
  <ldesign-input 
    :value="value"
    @ldesignChange="(e) => value = e.detail"
  />
</template>
```

### Q2: 事件名称是什么？

所有事件都以 `ldesign` 开头：
- `@ldesignClick` - 点击
- `@ldesignChange` - 变化
- `@ldesignInput` - 输入
- `@ldesignFocus` - 获得焦点
- `@ldesignBlur` - 失去焦点

### Q3: 如何传递复杂属性（对象/数组）？

使用 JSON 字符串或 `.prop` 修饰符：

```vue
<template>
  <!-- 方式1：JSON 字符串 -->
  <ldesign-table :columns="JSON.stringify(columns)" />
  
  <!-- 方式2：使用 .prop 修饰符 -->
  <ldesign-table :columns.prop="columns" />
</template>
```

## 完整示例

查看 [examples/vue3-example/](../../examples/vue3-example/) 获取完整的示例项目。

## 下一步

- [React 集成指南](./react.md)
- [组件 API 文档](../components/)
- [主题定制](../guide/theming.md)



