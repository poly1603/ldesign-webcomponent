# @ldesign/webcomponent-vue

Vue 3 集成包，为 @ldesign/webcomponent 提供更好的 Vue 开发体验。

## 安装

```bash
npm install @ldesign/webcomponent @ldesign/webcomponent-vue
```

## 使用

### 全局注册

```typescript
// main.ts
import { createApp } from 'vue';
import LDesignVue from '@ldesign/webcomponent-vue';
import '@ldesign/webcomponent'; // 全量导入

import App from './App.vue';

const app = createApp(App);
app.use(LDesignVue); // 配置自定义元素识别
app.mount('#app');
```

### 按需导入（推荐）

```vue
<script setup lang="ts">
import { LDesignVue, defineButton, defineInput } from '@ldesign/webcomponent-vue';
import { getCurrentInstance } from 'vue';

// 配置当前实例
const instance = getCurrentInstance();
if (instance) {
  LDesignVue.install(instance.appContext.app);
}

// 按需导入组件
defineButton();
defineInput();

const handleClick = () => {
  console.log('Button clicked');
};
</script>

<template>
  <div>
    <ldesign-button type="primary" @ldesignClick="handleClick">
      Click me
    </ldesign-button>
    
    <ldesign-input placeholder="Enter text" />
  </div>
</template>
```

### 使用示例

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { defineTable, defineCard } from '@ldesign/webcomponent-vue';

defineTable();
defineCard();

const columns = ref([
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', sortable: true },
  { key: 'address', title: '地址' }
]);

const data = ref([
  { id: 1, name: '张三', age: 28, address: '北京' },
  { id: 2, name: '李四', age: 32, address: '上海' }
]);

const handleSort = (e: CustomEvent) => {
  console.log('Sort:', e.detail);
};
</script>

<template>
  <ldesign-card title="用户列表">
    <ldesign-table
      :columns="JSON.stringify(columns)"
      :dataSource="JSON.stringify(data)"
      bordered
      striped
      @ldesignSort="handleSort"
    />
  </ldesign-card>
</template>
```

## API

### LDesignVue Plugin

全局插件，配置 Vue 识别 LDesign Web Components。

```typescript
import LDesignVue from '@ldesign/webcomponent-vue';

app.use(LDesignVue);
```

### 按需导入函数

- `defineButton()` - 导入 Button 组件
- `defineInput()` - 导入 Input 组件
- `defineTable()` - 导入 Table 组件
- `defineCard()` - 导入 Card 组件
- `defineForm()` - 导入 Form 组件
- `defineAllComponents()` - 导入所有组件

## 注意事项

### 1. v-model 支持

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

### 2. 事件名称

所有事件都以 `ldesign` 开头：
- `@ldesignClick` - 点击事件
- `@ldesignChange` - 变化事件
- `@ldesignSort` - 排序事件
- 等等...

### 3. 复杂属性

对于对象/数组类型的属性，需要使用 JSON 字符串或 `:prop.prop` 语法：

```vue
<!-- 方式1：JSON 字符串 -->
<ldesign-table :columns="JSON.stringify(columns)" />

<!-- 方式2：使用 .prop 修饰符（仅限简单场景） -->
<ldesign-table :columns.prop="columns" />
```

## 许可证

MIT License




