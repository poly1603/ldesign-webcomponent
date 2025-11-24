# Loading 加载

加载数据时显示动效。

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-loading></ldesign-loading>
</div>

```html
<ldesign-loading></ldesign-loading>
```

### 不同尺寸

提供三种尺寸。

<div class="demo-container">
  <ldesign-loading size="small"></ldesign-loading>
  <ldesign-loading size="medium"></ldesign-loading>
  <ldesign-loading size="large"></ldesign-loading>
</div>

```html
<ldesign-loading size="small"></ldesign-loading>
<ldesign-loading size="medium"></ldesign-loading>
<ldesign-loading size="large"></ldesign-loading>
```

### 自定义文案

可以自定义文案。

<div class="demo-container">
  <ldesign-loading text="加载中..."></ldesign-loading>
</div>

```html
<ldesign-loading text="加载中..."></ldesign-loading>
```

### 整页加载

页面级的加载效果。

```html
<ldesign-loading fullscreen></ldesign-loading>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const loading = ref(false);

const load = () => {
  loading.value = true;
  
  setTimeout(() => {
    loading.value = false;
  }, 3000);
};
</script>

<template>
  <ldesign-button @ldesignClick="load">加载数据</ldesign-button>
  
  <ldesign-loading v-if="loading" fullscreen />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  
  const load = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  
  return (
    <>
      <ldesign-button onLdesignClick={load}>加载数据</ldesign-button>
      
      {loading && <ldesign-loading fullscreen />}
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `text` | 显示在加载图标下方的加载文案 | `string` | - |
| `fullscreen` | 是否全屏显示 | `boolean` | `false` |
| `background` | 遮罩背景色 | `string` | `'rgba(0, 0, 0, 0.7)'` |

## 相关组件

- [Spin 加载中](./spin.md)
- [Skeleton 骨架屏](./skeleton.md)
