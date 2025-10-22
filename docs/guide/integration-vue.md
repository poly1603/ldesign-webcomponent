# 在 Vue 3 中使用

本指南介绍如何在 Vue 3 项目中使用 LDesign WebComponent。

## 安装

```bash
# 核心包
npm install @ldesign/webcomponent

# Vue 集成包（推荐）
npm install @ldesign/webcomponent-vue
```

## 配置

### 方式1：使用 Vue 集成插件（最简单）

```typescript
// main.ts
import { createApp } from 'vue';
import LDesignVue from '@ldesign/webcomponent-vue';
import App from './App.vue';

const app = createApp(App);

// 使用插件（自动配置）
app.use(LDesignVue);

app.mount('#app');
```

### 方式2：手动配置

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 配置 Vue 识别自定义元素
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ldesign-');
};

app.mount('#app');
```

### 方式3：Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('ldesign-')
        }
      }
    })
  ]
});
```

## 使用组件

### 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
// 按需导入组件
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';

const inputValue = ref('');

const handleClick = () => {
  alert('Button clicked!');
};

const handleChange = (e: CustomEvent) => {
  inputValue.value = e.detail;
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
    
    <p>输入值: {{ inputValue }}</p>
  </div>
</template>
```

### 使用 Vue 集成包（推荐）

```vue
<script setup lang="ts">
import { 
  defineButton, 
  defineInput, 
  defineTable,
  defineCard 
} from '@ldesign/webcomponent-vue';

// 按需导入组件
defineButton();
defineInput();
defineTable();
defineCard();
</script>

<template>
  <ldesign-card title="示例">
    <ldesign-button type="primary">Click</ldesign-button>
    <ldesign-input placeholder="Enter text" />
  </ldesign-card>
</template>
```

## 数据绑定

### 简单属性

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/button';

const isLoading = ref(false);
const isDisabled = ref(false);

const handleClick = async () => {
  isLoading.value = true;
  await fetchData();
  isLoading.value = false;
};
</script>

<template>
  <ldesign-button 
    type="primary"
    :loading="isLoading"
    :disabled="isDisabled"
    @ldesignClick="handleClick"
  >
    提交
  </ldesign-button>
</template>
```

### 复杂属性（对象/数组）

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/table';

const columns = ref([
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', sortable: true },
  { key: 'email', title: '邮箱' }
]);

const dataSource = ref([
  { id: 1, name: '张三', age: 28, email: 'zhang@example.com' },
  { id: 2, name: '李四', age: 32, email: 'li@example.com' }
]);

const handleSort = (e: CustomEvent) => {
  const { key, order } = e.detail;
  console.log('排序:', key, order);
};
</script>

<template>
  <!-- 方式1：使用 JSON.stringify -->
  <ldesign-table
    :columns="JSON.stringify(columns)"
    :dataSource="JSON.stringify(dataSource)"
    bordered
    striped
    @ldesignSort="handleSort"
  />
  
  <!-- 方式2：使用 ref 直接设置（推荐） -->
  <ldesign-table
    ref="tableRef"
    bordered
    striped
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const tableRef = ref<any>(null);

onMounted(() => {
  if (tableRef.value) {
    tableRef.value.columns = columns.value;
    tableRef.value.dataSource = dataSource.value;
  }
});
</script>
```

## 虚拟列表示例

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@ldesign/webcomponent/virtual-list';
import '@ldesign/webcomponent/card';

const listRef = ref<any>(null);
const items = ref<any[]>([]);

onMounted(() => {
  // 生成大量数据
  items.value = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `项目 ${i + 1}`,
    description: `描述 ${i + 1}`
  }));
  
  // 设置渲染函数
  if (listRef.value) {
    listRef.value.items = items.value;
    listRef.value.renderItem = (item: any, index: number) => {
      const div = document.createElement('div');
      div.style.cssText = 'padding: 16px; border-bottom: 1px solid #eee;';
      div.innerHTML = `
        <strong>${item.name}</strong>
        <p style="margin: 4px 0 0; color: #666;">${item.description}</p>
      `;
      return div;
    };
  }
});
</script>

<template>
  <ldesign-card title="虚拟列表（10,000 项）">
    <ldesign-virtual-list
      ref="listRef"
      item-height="60"
      height="500"
    />
  </ldesign-card>
</template>
```

## 表单处理

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/form';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/card';

const formRef = ref<any>(null);

const handleSubmit = async (e: CustomEvent) => {
  const values = e.detail;
  console.log('表单提交:', values);
  
  // 提交到后端
  try {
    await submitToServer(values);
    alert('提交成功！');
  } catch (error) {
    alert('提交失败');
  }
};

const validateForm = async () => {
  if (formRef.value) {
    const { valid, errors } = await formRef.value.validate();
    if (!valid) {
      console.error('验证失败:', errors);
    }
  }
};
</script>

<template>
  <ldesign-card title="用户注册">
    <ldesign-form 
      ref="formRef"
      layout="vertical"
      @ldesignSubmit="handleSubmit"
    >
      <ldesign-form-item label="用户名" name="username" required>
        <ldesign-input placeholder="请输入用户名" />
      </ldesign-form-item>
      
      <ldesign-form-item label="邮箱" name="email" required>
        <ldesign-input type="email" placeholder="请输入邮箱" />
      </ldesign-form-item>
      
      <ldesign-form-item label="密码" name="password" required>
        <ldesign-input type="password" placeholder="请输入密码" />
      </ldesign-form-item>
      
      <ldesign-form-item>
        <ldesign-button type="primary" html-type="submit">
          提交
        </ldesign-button>
        <ldesign-button @ldesignClick="validateForm">
          手动验证
        </ldesign-button>
      </ldesign-form-item>
    </ldesign-form>
  </ldesign-card>
</template>
```

## 主题切换

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@ldesign/webcomponent/button';

const theme = ref<'light' | 'dark'>('light');

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme.value);
};

onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  theme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
});

// 监听主题变化，保存到本地
watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme);
});
</script>

<template>
  <ldesign-button @ldesignClick="toggleTheme">
    {{ theme === 'light' ? '🌙 暗色' : '🌞 亮色' }}
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

// 使用 any 或创建自定义接口
const formRef = ref<any>(null);
const tableRef = ref<any>(null);

const submitForm = async () => {
  if (formRef.value) {
    const result = await formRef.value.validate();
    console.log(result);
  }
};
</script>
```

## Composition API 示例

```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import '@ldesign/webcomponent/table';
import '@ldesign/webcomponent/input';

// 响应式数据
const searchText = ref('');
const allData = ref([...]);

// 计算属性
const filteredData = computed(() => {
  if (!searchText.value) return allData.value;
  return allData.value.filter(item => 
    item.name.includes(searchText.value)
  );
});

// 监听变化
watch(searchText, (newValue) => {
  console.log('搜索:', newValue);
});
</script>

<template>
  <div>
    <ldesign-input 
      :value="searchText"
      @ldesignChange="(e) => searchText = e.detail"
      placeholder="搜索..."
    />
    
    <ldesign-table
      :dataSource="JSON.stringify(filteredData)"
      :columns="JSON.stringify(columns)"
    />
  </div>
</template>
```

## 常见问题

### Q1: 为什么不支持 v-model？

Web Components 不原生支持 `v-model`。需要手动绑定：

```vue
<!-- ❌ 不支持 -->
<ldesign-input v-model="value" />

<!-- ✅ 手动绑定 -->
<ldesign-input 
  :value="value"
  @ldesignChange="(e) => value = e.detail"
/>
```

### Q2: 如何传递插槽内容？

直接使用即可：

```vue
<template>
  <ldesign-card>
    <template #title>
      <span>自定义标题</span>
    </template>
    
    <template #extra>
      <ldesign-button size="small">更多</ldesign-button>
    </template>
    
    <!-- 默认插槽 -->
    <p>卡片内容</p>
    
    <template #footer>
      底部内容
    </template>
  </ldesign-card>
</template>
```

### Q3: 如何处理表单验证？

```vue
<script setup lang="ts">
const formRef = ref<any>(null);

const handleSubmit = async () => {
  const { valid, errors } = await formRef.value.validate();
  
  if (valid) {
    const values = await formRef.value.getFieldsValue();
    // 提交表单
  } else {
    // 显示错误
    console.error(errors);
  }
};
</script>
```

## 完整示例

查看 [Vue 3 示例项目](../../examples/vue3-example/)

## 下一步

- [React 集成](/guide/integration-react)
- [按需导入](/guide/on-demand)
- [主题定制](/guide/theming)

