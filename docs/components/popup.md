# Popup 弹出层

弹出层容器，用于展示弹窗、信息提示等内容。

## 何时使用

当需要在当前页面展示浮层内容时使用。是 Tooltip、Popover、Dropdown 等组件的基础组件。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-popup>
    <ldesign-button slot="trigger">点击显示</ldesign-button>
    <div>这是弹出层内容</div>
  </ldesign-popup>
</div>

```html
<ldesign-popup>
  <ldesign-button slot="trigger">点击显示</ldesign-button>
  <div>弹出层内容</div>
</ldesign-popup>
```

### 不同位置

支持 12 个方向。

<div class="demo-container" style="display: flex; gap: 8px; flex-wrap: wrap;">
  <ldesign-popup placement="top">
    <ldesign-button slot="trigger" size="small">Top</ldesign-button>
    <div>Top 内容</div>
  </ldesign-popup>
  
  <ldesign-popup placement="bottom">
    <ldesign-button slot="trigger" size="small">Bottom</ldesign-button>
    <div>Bottom 内容</div>
  </ldesign-popup>
  
  <ldesign-popup placement="left">
    <ldesign-button slot="trigger" size="small">Left</ldesign-button>
    <div>Left 内容</div>
  </ldesign-popup>
  
  <ldesign-popup placement="right">
    <ldesign-button slot="trigger" size="small">Right</ldesign-button>
    <div>Right 内容</div>
  </ldesign-popup>
</div>

```html
<ldesign-popup placement="top">...</ldesign-popup>
<ldesign-popup placement="bottom">...</ldesign-popup>
<ldesign-popup placement="left">...</ldesign-popup>
<ldesign-popup placement="right">...</ldesign-popup>
```

### 触发方式

通过 `trigger` 属性设置触发方式。

<div class="demo-container">
  <ldesign-popup trigger="click">
    <ldesign-button slot="trigger">Click</ldesign-button>
    <div>点击触发</div>
  </ldesign-popup>
  
  <ldesign-popup trigger="hover">
    <ldesign-button slot="trigger">Hover</ldesign-button>
    <div>悬停触发</div>
  </ldesign-popup>
</div>

```html
<ldesign-popup trigger="click">...</ldesign-popup>
<ldesign-popup trigger="hover">...</ldesign-popup>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const visible = ref(false);

const handleVisibleChange = (value) => {
  visible.value = value;
  console.log('可见性:', value);
};
</script>

<template>
  <ldesign-popup
    :visible="visible"
    @ldesignVisibleChange="handleVisibleChange"
  >
    <ldesign-button slot="trigger">触发</ldesign-button>
    <div>内容</div>
  </ldesign-popup>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);
  
  const handleVisibleChange = (e) => {
    setVisible(e.detail);
    console.log('可见性:', e.detail);
  };
  
  return (
    <ldesign-popup
      visible={visible}
      onLdesignVisibleChange={handleVisibleChange}
    >
      <ldesign-button slot="trigger">触发</ldesign-button>
      <div>内容</div>
    </ldesign-popup>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `visible` | 是否显示 | `boolean` | `false` |
| `placement` | 弹出位置 | `Placement` | `'bottom'` |
| `trigger` | 触发方式 | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `arrow` | 是否显示箭头 | `boolean` | `true` |
| `offset` | 弹出层偏移量 | `number` | `8` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignVisibleChange` | 显示/隐藏时触发 | `(event: CustomEvent<boolean>) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `trigger` | 触发元素 |
| `default` | 弹出层内容 |

## 相关组件

- [Tooltip 文字提示](./tooltip.md)
- [Popover 气泡卡片](./popover.md)
- [Dropdown 下拉菜单](./dropdown.md)
