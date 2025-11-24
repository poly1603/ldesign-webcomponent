# Spin 加载中

用于页面和区块的加载中状态。

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 代码演示

### 基础用法

一个简单的 loading 状态。

<div class="demo-container">
  <ldesign-spin></ldesign-spin>
</div>

```html
<ldesign-spin></ldesign-spin>
```

### 不同尺寸

小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。

<div class="demo-container">
  <ldesign-spin size="small"></ldesign-spin>
  <ldesign-spin size="medium"></ldesign-spin>
  <ldesign-spin size="large"></ldesign-spin>
</div>

```html
<ldesign-spin size="small"></ldesign-spin>
<ldesign-spin size="medium"></ldesign-spin>
<ldesign-spin size="large"></ldesign-spin>
```

### 自定义描述文案

自定义描述文案。

<div class="demo-container">
  <ldesign-spin tip="加载中..."></ldesign-spin>
</div>

```html
<ldesign-spin tip="加载中..."></ldesign-spin>
```

### 容器

放入一个容器中。

<div class="demo-container">
  <ldesign-spin spinning>
    <div style="padding: 50px; background: rgba(0,0,0,0.05); border-radius: 4px;">
      <p>这里是内容区域</p>
      <p>数据加载中...</p>
    </div>
  </ldesign-spin>
</div>

```html
<ldesign-spin spinning>
  <div class="content">
    内容区域
  </div>
</ldesign-spin>
```

### 延迟显示

延迟显示 loading 效果。当 spinning 状态在 delay 时间内结束，则不显示 loading 状态。

<div class="demo-container">
  <ldesign-spin spinning delay="500">
    <div style="padding: 50px; background: rgba(0,0,0,0.05); border-radius: 4px;">
      <p>延迟500ms显示</p>
    </div>
  </ldesign-spin>
</div>

```html
<ldesign-spin spinning delay="500">
  <div>内容</div>
</ldesign-spin>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const spinning = ref(false);

const load = () => {
  spinning.value = true;
  
  setTimeout(() => {
    spinning.value = false;
  }, 3000);
};
</script>

<template>
  <ldesign-button @ldesignClick="load">
    加载数据
  </ldesign-button>
  
  <ldesign-spin :spinning="spinning" tip="加载中...">
    <div class="content">
      数据内容
    </div>
  </ldesign-spin>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [spinning, setSpinning] = useState(false);
  
  const load = () => {
    setSpinning(true);
    
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };
  
  return (
    <>
      <ldesign-button onLdesignClick={load}>
        加载数据
      </ldesign-button>
      
      <ldesign-spin spinning={spinning} tip="加载中...">
        <div className="content">
          数据内容
        </div>
      </ldesign-spin>
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `spinning` | 是否为加载中状态 | `boolean` | `true` |
| `size` | 组件大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `tip` | 自定义描述文案 | `string` | - |
| `delay` | 延迟显示加载效果的时间（ms） | `number` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 包裹的内容 |

## 相关组件

- [Progress 进度条](./progress.md)
- [Skeleton 骨架屏](./skeleton.md)
