# 按需导入

按需导入可以显著减少包体积，提升应用性能。LDesign WebComponent v2.0 提供完整的 Tree-shaking 支持。

## 📦 包体积对比

| 导入方式 | 体积（minified） | 体积（gzip） |
|----------|------------------|--------------|
| 全量导入 | 380KB | 95KB |
| 仅 Button | 8KB | 2.5KB |
| Button + Input | 15KB | 4.2KB |
| Button + Input + Table | 35KB | 10KB |
| 10个常用组件 | 120KB | 32KB |

**结论**: 按需导入可减少 **95%** 包体积！

## 🚀 使用方法

### 原生 HTML/JavaScript

#### 方式1：ESM 导入（推荐）

```html
<script type="module">
  // 只导入需要的组件
  import '@ldesign/webcomponent/button';
  import '@ldesign/webcomponent/input';
  import '@ldesign/webcomponent/table';
</script>

<ldesign-button type="primary">Click me</ldesign-button>
<ldesign-input placeholder="Enter text"></ldesign-input>
```

#### 方式2：动态导入

```javascript
// 路由懒加载场景
async function loadTablePage() {
  await import('@ldesign/webcomponent/table');
  await import('@ldesign/webcomponent/pagination');
  
  // 渲染页面
  renderTablePage();
}
```

### Vue 3

#### 方式1：使用 Vue 集成包（推荐）

```bash
npm install @ldesign/webcomponent-vue
```

```vue
<script setup lang="ts">
// 使用按需导入函数
import { 
  defineButton, 
  defineInput, 
  defineTable 
} from '@ldesign/webcomponent-vue';

// 只导入需要的组件
defineButton();
defineInput();
defineTable();

const handleClick = () => {
  console.log('clicked');
};
</script>

<template>
  <div>
    <ldesign-button type="primary" @ldesignClick="handleClick">
      Click me
    </ldesign-button>
    
    <ldesign-input placeholder="Enter text" />
    
    <ldesign-table 
      :columns="columns" 
      :dataSource="data"
      virtual
      height="500"
    />
  </div>
</template>
```

#### 方式2：直接使用 Web Components

```vue
<script setup lang="ts">
// 直接导入组件
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/table';
</script>

<template>
  <ldesign-button type="primary">Click me</ldesign-button>
</template>
```

**注意**: 需要在 `main.ts` 中配置：

```typescript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 配置 Vue 识别自定义元素
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ldesign-');
};

app.mount('#app');
```

#### 方式3：使用 Vite 插件

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

### React

#### 方式1：使用 React 集成包（推荐）

```bash
npm install @ldesign/webcomponent-react
```

```tsx
// 只导入需要的组件
import { Button, Input, Table } from '@ldesign/webcomponent-react';

function App() {
  return (
    <div>
      <Button type="primary">Click me</Button>
      <Input placeholder="Enter text" />
      <Table 
        columns={columns} 
        dataSource={data}
        virtual
        height={500}
      />
    </div>
  );
}
```

#### 方式2：直接使用 Web Components

```tsx
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';

// TypeScript 类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ldesign-button': any;
      'ldesign-input': any;
    }
  }
}

function App() {
  return (
    <div>
      <ldesign-button type="primary">Click me</ldesign-button>
      <ldesign-input placeholder="Enter text" />
    </div>
  );
}
```

## 📋 完整导入列表

### 所有可按需导入的组件（86个）

```javascript
// 基础组件
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/icon';

// 表单组件
import '@ldesign/webcomponent/form';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/input-number';
import '@ldesign/webcomponent/checkbox';
import '@ldesign/webcomponent/checkbox-group';
import '@ldesign/webcomponent/radio';
import '@ldesign/webcomponent/radio-group';
import '@ldesign/webcomponent/switch';
import '@ldesign/webcomponent/select';
import '@ldesign/webcomponent/date-picker';
import '@ldesign/webcomponent/time-picker';
import '@ldesign/webcomponent/calendar';
import '@ldesign/webcomponent/upload';
import '@ldesign/webcomponent/rate';
import '@ldesign/webcomponent/slider';
import '@ldesign/webcomponent/color-picker';

// 数据展示（v2.0 新增标注 ⭐）
import '@ldesign/webcomponent/virtual-list'; // ⭐
import '@ldesign/webcomponent/table'; // ⭐
import '@ldesign/webcomponent/empty'; // ⭐
import '@ldesign/webcomponent/timeline'; // ⭐
import '@ldesign/webcomponent/steps'; // ⭐
import '@ldesign/webcomponent/descriptions'; // ⭐
import '@ldesign/webcomponent/statistic'; // ⭐
import '@ldesign/webcomponent/result'; // ⭐
import '@ldesign/webcomponent/tree';
import '@ldesign/webcomponent/pagination';
import '@ldesign/webcomponent/avatar';
import '@ldesign/webcomponent/tag';
import '@ldesign/webcomponent/progress';

// 反馈组件
import '@ldesign/webcomponent/skeleton'; // ⭐
import '@ldesign/webcomponent/spin'; // ⭐
import '@ldesign/webcomponent/alert';
import '@ldesign/webcomponent/message';
import '@ldesign/webcomponent/notification';
import '@ldesign/webcomponent/modal';
import '@ldesign/webcomponent/drawer';
import '@ldesign/webcomponent/loading';

// 导航组件
import '@ldesign/webcomponent/breadcrumb'; // ⭐
import '@ldesign/webcomponent/anchor'; // ⭐
import '@ldesign/webcomponent/menu';
import '@ldesign/webcomponent/dropdown';
import '@ldesign/webcomponent/tabs';

// 布局组件
import '@ldesign/webcomponent/layout'; // ⭐
import '@ldesign/webcomponent/card'; // ⭐
import '@ldesign/webcomponent/divider'; // ⭐
import '@ldesign/webcomponent/grid';
import '@ldesign/webcomponent/space';
import '@ldesign/webcomponent/split';

// 其他组件
import '@ldesign/webcomponent/watermark'; // ⭐
import '@ldesign/webcomponent/tour'; // ⭐
import '@ldesign/webcomponent/tooltip';
import '@ldesign/webcomponent/affix';
import '@ldesign/webcomponent/backtop';

// 工具导出
import { 
  VirtualScroll, 
  ObjectPool,
  debounce,
  throttle 
} from '@ldesign/webcomponent/utils';
```

## 🎯 最佳实践

### 1. 路由级别按需导入

```typescript
// router/index.ts
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue'),
    // 在路由级别导入组件
    beforeEnter: async () => {
      await import('@ldesign/webcomponent/card');
      await import('@ldesign/webcomponent/statistic');
    }
  },
  {
    path: '/table',
    component: () => import('./views/Table.vue'),
    beforeEnter: async () => {
      await import('@ldesign/webcomponent/table');
      await import('@ldesign/webcomponent/pagination');
    }
  }
];
```

### 2. 公共组件提前导入

```typescript
// main.ts
import { createApp } from 'vue';

// 全局常用组件
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/message';

// 其他组件按需导入
import App from './App.vue';

createApp(App).mount('#app');
```

### 3. 使用代码分割

```javascript
// 动态导入
async function showUploadModal() {
  // 只在需要时加载
  await import('@ldesign/webcomponent/modal');
  await import('@ldesign/webcomponent/upload');
  
  // 显示弹窗
  showModal();
}
```

## 🔍 Webpack 配置

如果使用 Webpack，确保正确配置：

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    sideEffects: true, // 启用 sideEffects 优化
    usedExports: true, // 启用 Tree-shaking
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};
```

## ⚡ Vite 配置

Vite 默认支持 Tree-shaking，无需额外配置：

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Vite 自动处理 Tree-shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    }
  }
});
```

## 📊 体积分析

### 使用 webpack-bundle-analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```

### 使用 rollup-plugin-visualizer

```bash
npm install --save-dev rollup-plugin-visualizer
```

```javascript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ]
});
```

## 💡 性能优化建议

### 1. 只导入需要的组件

```javascript
// ❌ 不推荐：全量导入 380KB
import '@ldesign/webcomponent';

// ✅ 推荐：按需导入 8-35KB
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
```

### 2. 使用虚拟滚动组件

```javascript
// ❌ 不推荐：普通列表渲染大量数据会卡顿
<div *ngFor="let item of 10000items">{{ item }}</div>

// ✅ 推荐：虚拟列表流畅60fps
import '@ldesign/webcomponent/virtual-list';
<ldesign-virtual-list :items="10000items" />
```

### 3. 懒加载非首屏组件

```javascript
// 首屏组件
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';

// 非首屏组件（路由切换时导入）
router.beforeEach(async (to) => {
  if (to.path === '/upload') {
    await import('@ldesign/webcomponent/upload');
    await import('@ldesign/webcomponent/modal');
  }
});
```

## 🎯 推荐组合

### 基础表单页面（15KB）

```javascript
import '@ldesign/webcomponent/form';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/checkbox';
```

### 数据表格页面（35KB）

```javascript
import '@ldesign/webcomponent/table';
import '@ldesign/webcomponent/pagination';
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
```

### 数据看板页面（45KB）

```javascript
import '@ldesign/webcomponent/card';
import '@ldesign/webcomponent/statistic';
import '@ldesign/webcomponent/progress';
import '@ldesign/webcomponent/timeline';
```

### 文件上传页面（40KB)

```javascript
import '@ldesign/webcomponent/upload';
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/progress';
import '@ldesign/webcomponent/message';
```

## 📝 注意事项

### 1. 依赖组件自动导入

某些组件会自动导入其依赖的子组件：

```javascript
// 导入 Table 会自动导入 Icon（用于排序图标）
import '@ldesign/webcomponent/table';

// 导入 Form 会自动导入 FormItem
import '@ldesign/webcomponent/form';
```

### 2. 样式自动包含

每个组件的样式已经内置，无需单独导入 CSS 文件。

### 3. 类型定义自动可用

```typescript
// 类型定义会自动可用
import '@ldesign/webcomponent/button';
import type { ButtonProps } from '@ldesign/webcomponent';
```

## 🔗 相关链接

- [Vue 3 集成指南](/guide/integration-vue)
- [React 集成指南](/guide/integration-react)
- [性能优化指南](/guide/performance)

