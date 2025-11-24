# Icon 图标

语义化的矢量图形。

## 何时使用

- 提供一套常用的图标集合。
- 基于 Lucide Icons，提供清晰美观的图标。

## 代码演示

### 基础用法

使用 `name` 属性指定图标。

<div class="demo-container">
  <ldesign-icon name="home"></ldesign-icon>
  <ldesign-icon name="user"></ldesign-icon>
  <ldesign-icon name="settings"></ldesign-icon>
  <ldesign-icon name="search"></ldesign-icon>
  <ldesign-icon name="heart"></ldesign-icon>
</div>

```html
<ldesign-icon name="home"></ldesign-icon>
<ldesign-icon name="user"></ldesign-icon>
<ldesign-icon name="settings"></ldesign-icon>
```

### 图标大小

通过 `size` 属性设置图标大小。

<div class="demo-container" style="align-items: center;">
  <ldesign-icon name="heart" size="16"></ldesign-icon>
  <ldesign-icon name="heart" size="24"></ldesign-icon>
  <ldesign-icon name="heart" size="32"></ldesign-icon>
  <ldesign-icon name="heart" size="48"></ldesign-icon>
</div>

```html
<ldesign-icon name="heart" size="16"></ldesign-icon>
<ldesign-icon name="heart" size="24"></ldesign-icon>
<ldesign-icon name="heart" size="32"></ldesign-icon>
```

### 图标颜色

通过 `color` 属性或 CSS 设置图标颜色。

<div class="demo-container">
  <ldesign-icon name="heart" color="#1890ff"></ldesign-icon>
  <ldesign-icon name="heart" color="#52c41a"></ldesign-icon>
  <ldesign-icon name="heart" color="#faad14"></ldesign-icon>
  <ldesign-icon name="heart" color="#f5222d"></ldesign-icon>
</div>

```html
<ldesign-icon name="heart" color="#1890ff"></ldesign-icon>
<ldesign-icon name="heart" color="#52c41a"></ldesign-icon>

<!-- 或使用 CSS -->
<style>
  .custom-icon {
    color: #1890ff;
  }
</style>
<ldesign-icon name="heart" class="custom-icon"></ldesign-icon>
```

### 常用图标示例

<div class="demo-container" style="flex-wrap: wrap;">
  <ldesign-icon name="home"></ldesign-icon>
  <ldesign-icon name="user"></ldesign-icon>
  <ldesign-icon name="settings"></ldesign-icon>
  <ldesign-icon name="search"></ldesign-icon>
  <ldesign-icon name="heart"></ldesign-icon>
  <ldesign-icon name="star"></ldesign-icon>
  <ldesign-icon name="check"></ldesign-icon>
  <ldesign-icon name="x"></ldesign-icon>
  <ldesign-icon name="plus"></ldesign-icon>
  <ldesign-icon name="minus"></ldesign-icon>
  <ldesign-icon name="edit"></ldesign-icon>
  <ldesign-icon name="trash"></ldesign-icon>
  <ldesign-icon name="download"></ldesign-icon>
  <ldesign-icon name="upload"></ldesign-icon>
  <ldesign-icon name="mail"></ldesign-icon>
  <ldesign-icon name="phone"></ldesign-icon>
</div>

```html
<ldesign-icon name="home"></ldesign-icon>
<ldesign-icon name="user"></ldesign-icon>
<ldesign-icon name="settings"></ldesign-icon>
<ldesign-icon name="search"></ldesign-icon>
<ldesign-icon name="heart"></ldesign-icon>
<ldesign-icon name="star"></ldesign-icon>
<ldesign-icon name="check"></ldesign-icon>
<ldesign-icon name="x"></ldesign-icon>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const iconName = ref('heart');
const iconSize = ref(24);
const iconColor = ref('#1890ff');
</script>

<template>
  <ldesign-icon 
    :name="iconName"
    :size="iconSize"
    :color="iconColor"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [iconName, setIconName] = useState('heart');
  const [iconSize, setIconSize] = useState(24);
  const [iconColor, setIconColor] = useState('#1890ff');
  
  return (
    <ldesign-icon 
      name={iconName}
      size={iconSize}
      color={iconColor}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `name` | 图标名称 | `string` | - |
| `size` | 图标大小 | `number \| string` | `24` |
| `color` | 图标颜色 | `string` | - |
| `stroke-width` | 线条宽度 | `number` | `2` |

### 图标列表

基于 Lucide Icons，支持所有 Lucide 图标名称。常用图标包括：

- **通用**：home, user, settings, search, menu, x, check, plus, minus
- **文件**：file, folder, download, upload, save, trash
- **媒体**：image, video, music, play, pause, stop
- **通信**：mail, phone, message, send
- **编辑**：edit, copy, cut, paste, delete
- **箭头**：arrow-up, arrow-down, arrow-left, arrow-right, chevron-up, chevron-down
- **状态**：check-circle, x-circle, alert-circle, info, help-circle
- **社交**：heart, star, thumbs-up, share, bookmark

完整图标列表请访问：[Lucide Icons](https://lucide.dev/icons/)

## 相关组件

- [Button 按钮](./button.md)
