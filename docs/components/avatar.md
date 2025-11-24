# Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。

## 何时使用

需要展示用户头像、事物图标等场景。

## 代码演示

### 基础用法

头像有三种尺寸，两种形状可选。

<div class="demo-container">
  <ldesign-avatar size="small" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"></ldesign-avatar>
  <ldesign-avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2"></ldesign-avatar>
  <ldesign-avatar size="large" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3"></ldesign-avatar>
</div>

```html
<ldesign-avatar size="small" src="avatar.jpg"></ldesign-avatar>
<ldesign-avatar src="avatar.jpg"></ldesign-avatar>
<ldesign-avatar size="large" src="avatar.jpg"></ldesign-avatar>
```

### 形状

支持圆形和方形。

<div class="demo-container">
  <ldesign-avatar shape="circle" src="https://api.dicebear.com/7.x/avataaars/svg?seed=4"></ldesign-avatar>
  <ldesign-avatar shape="square" src="https://api.dicebear.com/7.x/avataaars/svg?seed=5"></ldesign-avatar>
</div>

```html
<ldesign-avatar shape="circle" src="avatar.jpg"></ldesign-avatar>
<ldesign-avatar shape="square" src="avatar.jpg"></ldesign-avatar>
```

### 类型

支持三种类型：图片、Icon 以及字符。

<div class="demo-container">
  <ldesign-avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=6"></ldesign-avatar>
  <ldesign-avatar icon="user"></ldesign-avatar>
  <ldesign-avatar>U</ldesign-avatar>
  <ldesign-avatar>USER</ldesign-avatar>
</div>

```html
<!-- 图片 -->
<ldesign-avatar src="avatar.jpg"></ldesign-avatar>

<!-- 图标 -->
<ldesign-avatar icon="user"></ldesign-avatar>

<!-- 字符 -->
<ldesign-avatar>U</ldesign-avatar>
<ldesign-avatar>USER</ldesign-avatar>
```

### 带徽标

通常用于消息提示。

<div class="demo-container">
  <ldesign-badge count="1">
    <ldesign-avatar shape="square" icon="user"></ldesign-avatar>
  </ldesign-badge>
  
  <ldesign-badge dot>
    <ldesign-avatar shape="square" icon="user"></ldesign-avatar>
  </ldesign-badge>
</div>

```html
<ldesign-badge count="1">
  <ldesign-avatar icon="user"></ldesign-avatar>
</ldesign-badge>
```

### 自定义尺寸

对于头像，如果是字符型，可以自动调整字符大小。如果是图片，可设置 fit 属性。

<div class="demo-container">
  <ldesign-avatar size="64">U</ldesign-avatar>
  <ldesign-avatar size="64" src="https://api.dicebear.com/7.x/avataaars/svg?seed=7"></ldesign-avatar>
</div>

```html
<ldesign-avatar size="64">U</ldesign-avatar>
<ldesign-avatar size="64" src="avatar.jpg"></ldesign-avatar>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const userInfo = ref({
  name: 'User',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
});
</script>

<template>
  <ldesign-avatar :src="userInfo.avatar">
    {{ userInfo.name }}
  </ldesign-avatar>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [userInfo] = useState({
    name: 'User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
  });
  
  return (
    <ldesign-avatar src={userInfo.avatar}>
      {userInfo.name}
    </ldesign-avatar>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `size` | 设置头像的大小 | `'small' \| 'medium' \| 'large' \| number` | `'medium'` |
| `shape` | 指定头像的形状 | `'circle' \| 'square'` | `'circle'` |
| `src` | 图片地址 | `string` | - |
| `icon` | 图标名称 | `string` | - |
| `alt` | 图片无法显示时的替代文本 | `string` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义头像展示内容（文字或图标） |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignError` | 图片加载失败时触发 | `(event: CustomEvent) => void` |

## 相关组件

- [Badge 徽标](./badge.md)
