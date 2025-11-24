# Card 卡片

通用卡片容器。

## 何时使用

- 最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## 代码演示

### 基础用法

包含标题和内容。

<div class="demo-container">
  <ldesign-card title="卡片标题">
    <p>卡片内容</p>
    <p>卡片内容</p>
    <p>卡片内容</p>
  </ldesign-card>
</div>

```html
<ldesign-card title="卡片标题">
  <p>卡片内容</p>
</ldesign-card>
```

### 无边框

去掉边框。

<div class="demo-container" style="background: #f5f5f5; padding: 20px;">
  <ldesign-card title="无边框" bordered="false">
    <p>卡片内容</p>
  </ldesign-card>
</div>

```html
<ldesign-card title="无边框" bordered="false">
  <p>卡片内容</p>
</ldesign-card>
```

### 阴影效果

配置不同的阴影显示时机。

<div class="demo-container">
  <ldesign-card title="总是显示" shadow="always">
    <p>shadow="always"</p>
  </ldesign-card>
  
  <ldesign-card title="悬浮时显示" shadow="hover">
    <p>shadow="hover"</p>
  </ldesign-card>
  
  <ldesign-card title="从不显示" shadow="never">
    <p>shadow="never"</p>
  </ldesign-card>
</div>

```html
<ldesign-card shadow="always">总是显示</ldesign-card>
<ldesign-card shadow="hover">悬浮时显示</ldesign-card>
<ldesign-card shadow="never">从不显示</ldesign-card>
```

### 可悬浮

鼠标悬浮时卡片可浮起。

<div class="demo-container">
  <ldesign-card title="可悬浮卡片" hoverable>
    <p>鼠标悬浮试试</p>
  </ldesign-card>
</div>

```html
<ldesign-card hoverable>
  可悬浮卡片
</ldesign-card>
```

### 不同尺寸

提供三种尺寸。

<div class="demo-container">
  <ldesign-card title="小卡片" size="small">
    <p>Small</p>
  </ldesign-card>
  
  <ldesign-card title="中卡片" size="medium">
    <p>Medium</p>
  </ldesign-card>
  
  <ldesign-card title="大卡片" size="large">
    <p>Large</p>
  </ldesign-card>
</div>

```html
<ldesign-card size="small">Small</ldesign-card>
<ldesign-card size="medium">Medium</ldesign-card>
<ldesign-card size="large">Large</ldesign-card>
```

### 加载中

数据读入前会显示骨架屏占位。

<div class="demo-container">
  <ldesign-card title="加载中" loading>
    <p>这段内容不会显示</p>
  </ldesign-card>
</div>

```html
<ldesign-card loading>
  <p>加载中...</p>
</ldesign-card>
```

### 自定义头部

可以自定义卡片头部的额外操作区域。

<div class="demo-container">
  <ldesign-card title="卡片标题">
    <div slot="extra">
      <ldesign-button type="text" size="small">更多</ldesign-button>
    </div>
    <p>卡片内容</p>
  </ldesign-card>
</div>

```html
<ldesign-card title="卡片标题">
  <div slot="extra">
    <ldesign-button type="text">更多</ldesign-button>
  </div>
  <p>卡片内容</p>
</ldesign-card>
```

### 完全自定义标题

使用 title 插槽完全自定义标题区域。

<div class="demo-container">
  <ldesign-card>
    <div slot="title" style="display: flex; align-items: center; gap: 8px;">
      <ldesign-icon name="star"></ldesign-icon>
      <strong>自定义标题</strong>
    </div>
    <p>卡片内容</p>
  </ldesign-card>
</div>

```html
<ldesign-card>
  <div slot="title">
    <ldesign-icon name="star"></ldesign-icon>
    自定义标题
  </div>
  <p>卡片内容</p>
</ldesign-card>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const loading = ref(false);

const loadData = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <ldesign-card 
    title="数据卡片"
    :loading="loading"
    hoverable
  >
    <div slot="extra">
      <ldesign-button 
        size="small" 
        @ldesignClick="loadData"
      >
        刷新
      </ldesign-button>
    </div>
    
    <p>卡片内容</p>
  </ldesign-card>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  
  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  
  return (
    <ldesign-card 
      title="数据卡片"
      loading={loading}
      hoverable
    >
      <div slot="extra">
        <ldesign-button 
          size="small"
          onLdesignClick={loadData}
        >
          刷新
        </ldesign-button>
      </div>
      
      <p>卡片内容</p>
    </ldesign-card>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `title` | 卡片标题 | `string` | - |
| `size` | 卡片尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `bordered` | 是否显示边框 | `boolean` | `true` |
| `hoverable` | 是否可悬浮 | `boolean` | `false` |
| `loading` | 是否加载中 | `boolean` | `false` |
| `shadow` | 阴影显示时机 | `'never' \| 'hover' \| 'always'` | `'hover'` |
| `header-style` | 头部样式 | `string` | - |
| `body-style` | 内容样式 | `string` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 卡片内容 |
| `title` | 自定义标题 |
| `extra` | 卡片右上角的操作区域 |

## 相关组件

- [Skeleton 骨架屏](./skeleton.md)
