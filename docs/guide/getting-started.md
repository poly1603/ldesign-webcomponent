# 快速开始

本指南将帮助您在 5 分钟内开始使用 LDesign WebComponent。

## 安装

:::code-group

```bash [npm]
npm install @ldesign/webcomponent
```

```bash [yarn]
yarn add @ldesign/webcomponent
```

```bash [pnpm]
pnpm add @ldesign/webcomponent
```

:::

## Hello World

### 原生 HTML

创建 `index.html`:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Hello LDesign</title>
  
  <!-- 按需导入组件 -->
  <script type="module">
    import '@ldesign/webcomponent/button';
    import '@ldesign/webcomponent/input';
  </script>
</head>
<body>
  <h1>Hello LDesign!</h1>
  
  <ldesign-button type="primary">Click me</ldesign-button>
  <ldesign-input placeholder="Enter text"></ldesign-input>
  
  <script>
    const btn = document.querySelector('ldesign-button');
    btn.addEventListener('ldesignClick', () => {
      alert('Hello LDesign!');
    });
  </script>
</body>
</html>
```

### Vue 3

1. **安装依赖**

```bash
npm install @ldesign/webcomponent @ldesign/webcomponent-vue
```

2. **配置插件** (`main.ts`)

```typescript
import { createApp } from 'vue';
import LDesignVue from '@ldesign/webcomponent-vue';
import App from './App.vue';

const app = createApp(App);
app.use(LDesignVue);
app.mount('#app');
```

3. **使用组件** (`App.vue`)

```vue
<script setup lang="ts">
import { defineButton, defineInput } from '@ldesign/webcomponent-vue';

defineButton();
defineInput();

const handleClick = () => {
  alert('Hello LDesign!');
};
</script>

<template>
  <h1>Hello LDesign!</h1>
  <ldesign-button type="primary" @ldesignClick="handleClick">
    Click me
  </ldesign-button>
  <ldesign-input placeholder="Enter text" />
</template>
```

### React

1. **安装依赖**

```bash
npm install @ldesign/webcomponent @ldesign/webcomponent-react
```

2. **使用组件** (`App.tsx`)

```tsx
import { Button, Input } from '@ldesign/webcomponent-react';

function App() {
  const handleClick = () => {
    alert('Hello LDesign!');
  };

  return (
    <div>
      <h1>Hello LDesign!</h1>
      <Button type="primary" onClick={handleClick}>
        Click me
      </Button>
      <Input placeholder="Enter text" />
    </div>
  );
}

export default App;
```

## 🎨 主题定制

### 切换主题

```javascript
// 切换到暗色主题
document.documentElement.setAttribute('data-theme', 'dark');

// 切换到亮色主题
document.documentElement.setAttribute('data-theme', 'light');
```

### 自定义主题变量

```css
:root {
  /* 主色调 */
  --ld-color-primary: #7334cb;
  --ld-color-primary-hover: #8c5ad3;
  
  /* 成功色 */
  --ld-color-success: #42bd42;
  
  /* 间距 */
  --ld-spacing-4: 16px;
  --ld-spacing-6: 24px;
  
  /* 圆角 */
  --ld-radius-base: 4px;
  --ld-radius-lg: 8px;
}
```

## 📦 按需导入（推荐）

### 为什么要按需导入？

- ✅ 包体积减少 **95%**（380KB → 8-35KB）
- ✅ 加载速度提升 **10倍**
- ✅ 页面性能更好

### 如何按需导入？

```javascript
// ❌ 不推荐：全量导入
import '@ldesign/webcomponent';

// ✅ 推荐：按需导入
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/table';
```

详见 [按需导入指南](/guide/on-demand)

## 🚀 高性能特性

### 虚拟滚动

渲染 100,000+ 项列表而不卡顿：

```html
<ldesign-virtual-list
  :items="bigData"
  item-height="60"
  height="500"
/>
```

### 虚拟表格

```html
<ldesign-table
  :dataSource="bigData"
  virtual
  height="600"
  row-height="48"
/>
```

## 📖 下一步

### 基础

- [安装说明](/guide/installation) - 详细安装说明
- [按需导入](/guide/on-demand) - 优化包体积
- [组件概览](/components/overview) - 查看所有组件

### 框架集成

- [Vue 3 集成](/guide/integration-vue) - Vue 详细指南
- [React 集成](/guide/integration-react) - React 详细指南
- [HTML 使用](/guide/integration-html) - 原生使用

### 进阶

- [主题定制](/guide/theming) - 自定义主题
- [性能优化](/guide/performance) - 性能优化技巧
- [最佳实践](/guide/best-practices) - 开发建议

## 🆘 遇到问题？

- 📖 查看 [FAQ](/guide/faq)
- 🐛 [报告问题](https://github.com/ldesign/webcomponent/issues)
- 💬 [讨论交流](https://github.com/ldesign/webcomponent/discussions)
