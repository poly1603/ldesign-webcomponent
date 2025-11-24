# Menu 导航菜单

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

## 代码演示

### 基础用法

水平的顶部导航菜单。

<div class="demo-container">
  <ldesign-menu mode="horizontal">
    <ldesign-menu-item key="mail" icon="mail">导航一</ldesign-menu-item>
    <ldesign-menu-item key="app" icon="inbox">导航二</ldesign-menu-item>
    <ldesign-menu-item key="setting" icon="settings">导航三</ldesign-menu-item>
  </ldesign-menu>
</div>

```html
<ldesign-menu mode="horizontal">
  <ldesign-menu-item key="1">菜单项1</ldesign-menu-item>
  <ldesign-menu-item key="2">菜单项2</ldesign-menu-item>
  <ldesign-menu-item key="3">菜单项3</ldesign-menu-item>
</ldesign-menu>
```

### 垂直菜单

垂直菜单，子菜单内嵌在菜单区域。

<div class="demo-container">
  <ldesign-menu mode="vertical" style="width: 256px;">
    <ldesign-sub-menu key="sub1" title="导航一" icon="mail">
      <ldesign-menu-item key="1">选项1</ldesign-menu-item>
      <ldesign-menu-item key="2">选项2</ldesign-menu-item>
    </ldesign-sub-menu>
    <ldesign-sub-menu key="sub2" title="导航二" icon="inbox">
      <ldesign-menu-item key="3">选项3</ldesign-menu-item>
      <ldesign-menu-item key="4">选项4</ldesign-menu-item>
    </ldesign-sub-menu>
  </ldesign-menu>
</div>

```html
<ldesign-menu mode="vertical">
  <ldesign-sub-menu title="子菜单">
    <ldesign-menu-item>选项1</ldesign-menu-item>
    <ldesign-menu-item>选项2</ldesign-menu-item>
  </ldesign-sub-menu>
</ldesign-menu>
```

### 内嵌菜单

垂直菜单，子菜单内嵌在菜单区域。

```html
<ldesign-menu mode="inline" style="width: 256px;">
  <ldesign-sub-menu title="导航一">
    <ldesign-menu-item>选项1</ldesign-menu-item>
    <ldesign-menu-item>选项2</ldesign-menu-item>
  </ldesign-sub-menu>
</ldesign-menu>
```

### 收起内嵌菜单

内嵌菜单可以被收起/展开。

```html
<ldesign-menu mode="inline" collapsed style="width: 256px;">
  <ldesign-menu-item icon="home">首页</ldesign-menu-item>
  <ldesign-menu-item icon="user">用户</ldesign-menu-item>
</ldesign-menu>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);

const handleSelect = (e) => {
  console.log('选中:', e.detail);
};
</script>

<template>
  <ldesign-menu
    mode="inline"
    :selected-keys="selectedKeys"
    :open-keys="openKeys"
    @ldesignSelect="handleSelect"
  >
    <ldesign-sub-menu key="sub1" title="导航一">
      <ldesign-menu-item key="1">选项1</ldesign-menu-item>
      <ldesign-menu-item key="2">选项2</ldesign-menu-item>
    </ldesign-sub-menu>
  </ldesign-menu>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  
  const handleSelect = (e) => {
    setSelectedKeys([e.detail.key]);
    console.log('选中:', e.detail);
  };
  
  return (
    <ldesign-menu
      mode="inline"
      selected-keys={selectedKeys}
      onLdesignSelect={handleSelect}
    >
      <ldesign-sub-menu key="sub1" title="导航一">
        <ldesign-menu-item key="1">选项1</ldesign-menu-item>
        <ldesign-menu-item key="2">选项2</ldesign-menu-item>
      </ldesign-sub-menu>
    </ldesign-menu>
  );
}
```

## API

### Menu Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `mode` | 菜单类型 | `'horizontal' \| 'vertical' \| 'inline'` | `'vertical'` |
| `selected-keys` | 当前选中的菜单项 key 数组 | `string[]` | `[]` |
| `open-keys` | 当前展开的 SubMenu 菜单项 key 数组 | `string[]` | `[]` |
| `collapsed` | 是否收起（inline 模式） | `boolean` | `false` |

### Menu Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignSelect` | 被选中时调用 | `(event: CustomEvent) => void` |
| `ldesignOpenChange` | SubMenu 展开/关闭时调用 | `(event: CustomEvent<string[]>) => void` |

### MenuItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `key` | 唯一标志 | `string` | - |
| `icon` | 菜单图标 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |

### SubMenu Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `key` | 唯一标志 | `string` | - |
| `title` | 子菜单标题 | `string` | - |
| `icon` | 菜单图标 | `string` | - |

## 相关组件

- [Dropdown 下拉菜单](./dropdown.md)
- [Breadcrumb 面包屑](./breadcrumb.md)
