# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 代码演示

### 按钮类型

按钮有五种类型：主要按钮、默认按钮、虚线按钮、文本按钮和链接按钮。

<div class="demo-container">
  <ldesign-button type="primary">Primary</ldesign-button>
  <ldesign-button>Default</ldesign-button>
  <ldesign-button type="dashed">Dashed</ldesign-button>
  <ldesign-button type="text">Text</ldesign-button>
  <ldesign-button type="link">Link</ldesign-button>
</div>

```html
<ldesign-button type="primary">Primary</ldesign-button>
<ldesign-button>Default</ldesign-button>
<ldesign-button type="dashed">Dashed</ldesign-button>
<ldesign-button type="text">Text</ldesign-button>
<ldesign-button type="link">Link</ldesign-button>
```

### 图标按钮

带图标的按钮可以增强辨识度或节省空间。

<div class="demo-container">
  <ldesign-button type="primary" icon="search">Search</ldesign-button>
  <ldesign-button type="primary" icon="download">Download</ldesign-button>
  <ldesign-button icon="search"></ldesign-button>
  <ldesign-button shape="circle" icon="search"></ldesign-button>
  <ldesign-button shape="round" icon="search">Search</ldesign-button>
</div>

```html
<ldesign-button icon="search">Search</ldesign-button>
<ldesign-button icon="search"></ldesign-button>
<ldesign-button shape="circle" icon="search"></ldesign-button>
<ldesign-button shape="round" icon="search">Search</ldesign-button>
```

### 按钮尺寸

按钮有大、中、小三种尺寸。

<div class="demo-container">
  <ldesign-button type="primary" size="large">Large</ldesign-button>
  <ldesign-button type="primary">Middle</ldesign-button>
  <ldesign-button type="primary" size="small">Small</ldesign-button>
</div>

```html
<ldesign-button size="large">Large</ldesign-button>
<ldesign-button>Middle</ldesign-button>
<ldesign-button size="small">Small</ldesign-button>
```

### 禁用状态

<div class="demo-container">
  <ldesign-button type="primary" disabled>Primary</ldesign-button>
  <ldesign-button disabled>Default</ldesign-button>
  <ldesign-button type="dashed" disabled>Dashed</ldesign-button>
  <ldesign-button type="text" disabled>Text</ldesign-button>
  <ldesign-button type="link" disabled>Link</ldesign-button>
</div>

```html
<ldesign-button disabled>Disabled</ldesign-button>
```

### 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

<div class="demo-container">
  <ldesign-button type="primary" loading>Loading</ldesign-button>
  <ldesign-button type="primary" loading icon="poweroff">Loading</ldesign-button>
  <ldesign-button loading></ldesign-button>
</div>

```html
<ldesign-button loading>Loading</ldesign-button>
```

### 危险按钮

删除/移动/修改权限等危险操作，一般需要二次确认。

<div class="demo-container">
  <ldesign-button type="primary" danger>Primary</ldesign-button>
  <ldesign-button danger>Default</ldesign-button>
  <ldesign-button type="dashed" danger>Dashed</ldesign-button>
  <ldesign-button type="text" danger>Text</ldesign-button>
  <ldesign-button type="link" danger>Link</ldesign-button>
</div>

```html
<ldesign-button danger>Danger</ldesign-button>
<ldesign-button type="primary" danger>Danger Primary</ldesign-button>
```

### 幽灵按钮

幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。

<div class="demo-container" style="padding: 26px 16px; background: rgb(190, 200, 200);">
  <ldesign-button type="primary" ghost>Primary</ldesign-button>
  <ldesign-button ghost>Default</ldesign-button>
  <ldesign-button type="dashed" ghost>Dashed</ldesign-button>
  <ldesign-button type="primary" danger ghost>Danger</ldesign-button>
</div>

```html
<ldesign-button ghost>Ghost</ldesign-button>
<ldesign-button type="primary" ghost>Ghost Primary</ldesign-button>
```

### 块级按钮

`block` 属性将使按钮适合其父宽度。

<div class="demo-container">
  <ldesign-button type="primary" block>Primary</ldesign-button>
  <ldesign-button block>Default</ldesign-button>
  <ldesign-button type="dashed" block>Dashed</ldesign-button>
</div>

```html
<ldesign-button block>Block Button</ldesign-button>
```

### 按钮形状

按钮有多种形状：default、circle、round。

<div class="demo-container">
  <ldesign-button type="primary">Default</ldesign-button>
  <ldesign-button type="primary" shape="circle" icon="search"></ldesign-button>
  <ldesign-button type="primary" shape="round">Round</ldesign-button>
  <ldesign-button type="primary" shape="round" icon="download">Download</ldesign-button>
</div>

```html
<ldesign-button shape="circle" icon="search"></ldesign-button>
<ldesign-button shape="round">Round</ldesign-button>
```

### 按钮组合

可以将多个 `ldesign-button` 放入 `ldesign-button-group` 的容器中。

<div class="demo-container">
  <ldesign-button-group>
    <ldesign-button type="primary">Button 1</ldesign-button>
    <ldesign-button type="primary">Button 2</ldesign-button>
    <ldesign-button type="primary">Button 3</ldesign-button>
  </ldesign-button-group>
</div>

```html
<ldesign-button-group>
  <ldesign-button>Button 1</ldesign-button>
  <ldesign-button>Button 2</ldesign-button>
  <ldesign-button>Button 3</ldesign-button>
</ldesign-button-group>
```

### 多个按钮组合

按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到 Dropdown.Button 中组合使用。

<div class="demo-container">
  <ldesign-button type="primary">Primary</ldesign-button>
  <ldesign-button>Default</ldesign-button>
  <ldesign-button type="dashed">Dashed</ldesign-button>
  <ldesign-button type="link">Link</ldesign-button>
</div>

```html
<ldesign-button type="primary">Primary</ldesign-button>
<ldesign-button>Default</ldesign-button>
```

### 新颜色系统

使用 `variant` 和 `color` 属性可以更灵活地定制按钮样式。

<div class="demo-container">
  <ldesign-button variant="solid" color="primary">Solid</ldesign-button>
  <ldesign-button variant="outlined" color="primary">Outlined</ldesign-button>
  <ldesign-button variant="dashed" color="primary">Dashed</ldesign-button>
  <ldesign-button variant="filled" color="primary">Filled</ldesign-button>
  <ldesign-button variant="text" color="primary">Text</ldesign-button>
</div>

```html
<ldesign-button variant="solid" color="primary">Solid</ldesign-button>
<ldesign-button variant="outlined" color="primary">Outlined</ldesign-button>
<ldesign-button variant="filled" color="primary">Filled</ldesign-button>
```

### 颜色变体

<div class="demo-container">
  <ldesign-button variant="solid" color="default">Default</ldesign-button>
  <ldesign-button variant="solid" color="primary">Primary</ldesign-button>
  <ldesign-button variant="solid" color="danger">Danger</ldesign-button>
</div>

```html
<ldesign-button color="default">Default</ldesign-button>
<ldesign-button color="primary">Primary</ldesign-button>
<ldesign-button color="danger">Danger</ldesign-button>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const loading = ref(false);

const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <ldesign-button 
    type="primary"
    :loading="loading"
    @ldesignClick="handleClick"
  >
    Click me
  </ldesign-button>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  return (
    <ldesign-button 
      type="primary"
      loading={loading}
      onLdesignClick={handleClick}
    >
      Click me
    </ldesign-button>
  );
}
```

## API

### Button Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 按钮类型 | `'default' \| 'primary' \| 'dashed' \| 'text' \| 'link'` | `'default'` |
| `variant` | 按钮变体 | `'solid' \| 'outlined' \| 'dashed' \| 'filled' \| 'text' \| 'link'` | - |
| `color` | 按钮颜色 | `'default' \| 'primary' \| 'danger'` | - |
| `size` | 按钮尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| `shape` | 按钮形状 | `'default' \| 'circle' \| 'round'` | `'default'` |
| `icon` | 图标名称 | `string` | - |
| `icon-position` | 图标位置 | `'start' \| 'end'` | `'start'` |
| `loading` | 加载状态 | `boolean` | `false` |
| `loading-delay` | 加载延迟(ms) | `number` | - |
| `loading-icon` | 自定义加载图标 | `string` | - |
| `disabled` | 禁用状态 | `boolean` | `false` |
| `danger` | 危险按钮 | `boolean` | `false` |
| `ghost` | 幽灵按钮 | `boolean` | `false` |
| `block` | 块级按钮 | `boolean` | `false` |
| `html-type` | 原生type属性 | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `href` | 跳转链接 | `string` | - |
| `target` | 链接target | `string` | - |
| `ripple` | 水波纹效果 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignClick` | 点击按钮时触发 | `(event: CustomEvent<MouseEvent>) => void` |

## 相关组件

- [Button Group 按钮组](./button-group.md)
- [Icon 图标](./icon.md)
