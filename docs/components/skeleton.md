# Skeleton 骨架屏

在需要等待加载内容的位置提供一个占位图形组合。

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。

## 代码演示

### 基础用法

最简单的占位效果。

<div class="demo-container">
  <ldesign-skeleton></ldesign-skeleton>
</div>

```html
<ldesign-skeleton></ldesign-skeleton>
```

### 复杂组合

更复杂的组合。

<div class="demo-container">
  <ldesign-skeleton avatar rows="4"></ldesign-skeleton>
</div>

```html
<ldesign-skeleton avatar rows="4"></ldesign-skeleton>
```

### 动画效果

显示动画效果。

<div class="demo-container">
  <ldesign-skeleton animated></ldesign-skeleton>
  <ldesign-skeleton avatar rows="3" animated></ldesign-skeleton>
</div>

```html
<ldesign-skeleton animated></ldesign-skeleton>
<ldesign-skeleton avatar rows="3" animated></ldesign-skeleton>
```

### 包含子组件

加载完成后，显示子组件。

<div class="demo-container">
  <ldesign-skeleton id="skeleton-demo" loading rows="3">
    <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
      <h3>真实内容标题</h3>
      <p>这是加载完成后显示的真实内容。</p>
      <p>骨架屏已隐藏。</p>
    </div>
  </ldesign-skeleton>
  
  <ldesign-button id="toggle-btn" style="margin-top: 16px;">切换加载状态</ldesign-button>
</div>

<script>
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
  const skeleton = document.getElementById('skeleton-demo')
  const btn = document.getElementById('toggle-btn')
  
  if (skeleton && btn) {
    btn.addEventListener('ldesignClick', () => {
      skeleton.loading = !skeleton.loading
    })
  }
  })
}
</script>

```html
<ldesign-skeleton loading>
  <div class="content">
    真实内容
  </div>
</ldesign-skeleton>

<script>
  const skeleton = document.querySelector('ldesign-skeleton');
  
  // 数据加载完成后
  setTimeout(() => {
    skeleton.loading = false;
  }, 3000);
</script>
```

### 自定义行数

可以自定义骨架屏的行数。

<div class="demo-container">
  <ldesign-skeleton rows="2"></ldesign-skeleton>
  <ldesign-skeleton rows="5"></ldesign-skeleton>
</div>

```html
<ldesign-skeleton rows="2"></ldesign-skeleton>
<ldesign-skeleton rows="5"></ldesign-skeleton>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const data = ref(null);

onMounted(() => {
  // 模拟数据加载
  setTimeout(() => {
    data.value = { title: '标题', content: '内容' };
    loading.value = false;
  }, 3000);
});
</script>

<template>
  <ldesign-skeleton :loading="loading" avatar rows="4">
    <div v-if="data" class="content">
      <h3>{{ data.title }}</h3>
      <p>{{ data.content }}</p>
    </div>
  </ldesign-skeleton>
</template>
```

### React

```tsx
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setData({ title: '标题', content: '内容' });
      setLoading(false);
    }, 3000);
  }, []);
  
  return (
    <ldesign-skeleton loading={loading} avatar rows={4}>
      {data && (
        <div className="content">
          <h3>{data.title}</h3>
          <p>{data.content}</p>
        </div>
      )}
    </ldesign-skeleton>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `loading` | 是否显示骨架屏 | `boolean` | `true` |
| `animated` | 是否展示动画效果 | `boolean` | `false` |
| `avatar` | 是否显示头像占位 | `boolean` | `false` |
| `rows` | 段落占位行数 | `number` | `3` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 真实内容 |

## 相关组件

- [Spin 加载中](./spin.md)
- [Progress 进度条](./progress.md)
