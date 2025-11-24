# Tabs 标签页

选项卡切换组件。

## 何时使用

- 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

## 代码演示

### 基础用法

默认选中第一项。

<div class="demo-container">
  <ldesign-tabs>
    <ldesign-tab-pane tab="Tab 1" key="1">
      <p>内容 1</p>
    </ldesign-tab-pane>
    <ldesign-tab-pane tab="Tab 2" key="2">
      <p>内容 2</p>
    </ldesign-tab-pane>
    <ldesign-tab-pane tab="Tab 3" key="3">
      <p>内容 3</p>
    </ldesign-tab-pane>
  </ldesign-tabs>
</div>

```html
<ldesign-tabs>
  <ldesign-tab-pane tab="Tab 1" key="1">
    内容 1
  </ldesign-tab-pane>
  <ldesign-tab-pane tab="Tab 2" key="2">
    内容 2
  </ldesign-tab-pane>
</ldesign-tabs>

<script>
  const tabs = document.querySelector('ldesign-tabs');
  tabs.addEventListener('ldesignChange', (e) => {
    console.log('当前标签:', e.detail);
  });
</script>
```

### 禁用状态

禁用某一项。

<div class="demo-container">
  <ldesign-tabs>
    <ldesign-tab-pane tab="Tab 1" key="1">
      <p>内容 1</p>
    </ldesign-tab-pane>
    <ldesign-tab-pane tab="Tab 2 (禁用)" key="2" disabled>
      <p>内容 2</p>
    </ldesign-tab-pane>
    <ldesign-tab-pane tab="Tab 3" key="3">
      <p>内容 3</p>
    </ldesign-tab-pane>
  </ldesign-tabs>
</div>

```html
<ldesign-tab-pane tab="禁用" disabled>
  内容
</ldesign-tab-pane>
```

### 带图标

带图标的标签。

<div class="demo-container">
  <ldesign-tabs>
    <ldesign-tab-pane tab="用户" key="1" icon="user">
      <p>用户内容</p>
    </ldesign-tab-pane>
    <ldesign-tab-pane tab="设置" key="2" icon="settings">
      <p>设置内容</p>
    </ldesign-tab-pane>
  </ldesign-tabs>
</div>

```html
<ldesign-tab-pane tab="用户" icon="user">
  内容
</ldesign-tab-pane>
```

### 卡片式标签

卡片式的页签，提供可关闭的样式。

<div class="demo-container">
  <ldesign-tabs type="card">
    <ldesign-tab-pane tab="Tab 1" key="1">
      <p>内容 1</p>
    </ldesign-tab-pane>
    <ldesign-tab-pane tab="Tab 2" key="2">
      <p>内容 2</p>
    </ldesign-tab-pane>
  </ldesign-tabs>
</div>

```html
<ldesign-tabs type="card">
  ...
</ldesign-tabs>
```

### 位置

标签页可以位于上下左右四个方向。

<div class="demo-container">
  <ldesign-tabs tab-position="top">
    <ldesign-tab-pane tab="Top 1" key="1">内容 1</ldesign-tab-pane>
    <ldesign-tab-pane tab="Top 2" key="2">内容 2</ldesign-tab-pane>
  </ldesign-tabs>
</div>

```html
<ldesign-tabs tab-position="top">...</ldesign-tabs>
<ldesign-tabs tab-position="right">...</ldesign-tabs>
<ldesign-tabs tab-position="bottom">...</ldesign-tabs>
<ldesign-tabs tab-position="left">...</ldesign-tabs>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const activeKey = ref('1');

const handleChange = (e) => {
  activeKey.value = e.detail;
};
</script>

<template>
  <ldesign-tabs 
    :active-key="activeKey"
    @ldesignChange="handleChange"
  >
    <ldesign-tab-pane tab="Tab 1" key="1">
      内容 1
    </ldesign-tab-pane>
    <ldesign-tab-pane tab="Tab 2" key="2">
      内容 2
    </ldesign-tab-pane>
  </ldesign-tabs>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [activeKey, setActiveKey] = useState('1');
  
  return (
    <ldesign-tabs 
      active-key={activeKey}
      onLdesignChange={(e) => setActiveKey(e.detail)}
    >
      <ldesign-tab-pane tab="Tab 1" key="1">
        内容 1
      </ldesign-tab-pane>
      <ldesign-tab-pane tab="Tab 2" key="2">
        内容 2
      </ldesign-tab-pane>
    </ldesign-tabs>
  );
}
```

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `active-key` | 当前激活 tab 的 key | `string` | - |
| `default-active-key` | 默认激活 tab 的 key | `string` | - |
| `type` | 标签页类型 | `'line' \| 'card'` | `'line'` |
| `tab-position` | 标签位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| `size` | 标签大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |

### Tabs Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 切换标签时触发 | `(event: CustomEvent<string>) => void` |

### TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `tab` | 标签标题 | `string` | - |
| `key` | 标签唯一标识 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `icon` | 标签图标 | `string` | - |
| `closable` | 是否可关闭 | `boolean` | `false` |

## 相关组件

- [Collapse 折叠面板](./collapse.md)
