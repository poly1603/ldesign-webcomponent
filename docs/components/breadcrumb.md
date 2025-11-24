# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时。
- 当需要告知用户『你在哪里』时。
- 当需要向上导航的功能时。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-breadcrumb>
    <ldesign-breadcrumb-item>首页</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item>应用列表</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item>某应用</ldesign-breadcrumb-item>
  </ldesign-breadcrumb>
</div>

```html
<ldesign-breadcrumb>
  <ldesign-breadcrumb-item>首页</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item>应用列表</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item>某应用</ldesign-breadcrumb-item>
</ldesign-breadcrumb>
```

### 带链接

面包屑支持超链接。

<div class="demo-container">
  <ldesign-breadcrumb>
    <ldesign-breadcrumb-item href="/">首页</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item href="/apps">应用列表</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item>某应用</ldesign-breadcrumb-item>
  </ldesign-breadcrumb>
</div>

```html
<ldesign-breadcrumb>
  <ldesign-breadcrumb-item href="/">首页</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item href="/apps">应用列表</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item>某应用</ldesign-breadcrumb-item>
</ldesign-breadcrumb>
```

### 带图标

图标放在文字前面。

<div class="demo-container">
  <ldesign-breadcrumb>
    <ldesign-breadcrumb-item href="/" icon="home">首页</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item icon="folder">应用列表</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item icon="file">某应用</ldesign-breadcrumb-item>
  </ldesign-breadcrumb>
</div>

```html
<ldesign-breadcrumb>
  <ldesign-breadcrumb-item icon="home">首页</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item icon="folder">应用列表</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item icon="file">某应用</ldesign-breadcrumb-item>
</ldesign-breadcrumb>
```

### 分隔符

使用 `separator` 属性自定义分隔符。

<div class="demo-container">
  <ldesign-breadcrumb separator=">">
    <ldesign-breadcrumb-item>首页</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item>应用列表</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item>某应用</ldesign-breadcrumb-item>
  </ldesign-breadcrumb>
  
  <ldesign-breadcrumb separator="→">
    <ldesign-breadcrumb-item>首页</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item>应用列表</ldesign-breadcrumb-item>
    <ldesign-breadcrumb-item>某应用</ldesign-breadcrumb-item>
  </ldesign-breadcrumb>
</div>

```html
<ldesign-breadcrumb separator=">">
  <ldesign-breadcrumb-item>首页</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item>应用列表</ldesign-breadcrumb-item>
</ldesign-breadcrumb>
```

## 框架集成

### Vue 3

```vue
<script setup>
const routes = [
  { path: '/', label: '首页', icon: 'home' },
  { path: '/apps', label: '应用列表', icon: 'folder' },
  { label: '某应用', icon: 'file' }
];
</script>

<template>
  <ldesign-breadcrumb>
    <ldesign-breadcrumb-item
      v-for="(route, index) in routes"
      :key="index"
      :href="route.path"
      :icon="route.icon"
    >
      {{ route.label }}
    </ldesign-breadcrumb-item>
  </ldesign-breadcrumb>
</template>
```

### React

```tsx
function App() {
  const routes = [
    { path: '/', label: '首页', icon: 'home' },
    { path: '/apps', label: '应用列表', icon: 'folder' },
    { label: '某应用', icon: 'file' }
  ];
  
  return (
    <ldesign-breadcrumb>
      {routes.map((route, index) => (
        <ldesign-breadcrumb-item
          key={index}
          href={route.path}
          icon={route.icon}
        >
          {route.label}
        </ldesign-breadcrumb-item>
      ))}
    </ldesign-breadcrumb>
  );
}
```

## API

### Breadcrumb Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `separator` | 分隔符 | `string` | `'/'` |

### BreadcrumbItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `href` | 链接地址 | `string` | - |
| `icon` | 图标名称 | `string` | - |

### BreadcrumbItem Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 面包屑文本内容 |

## 相关组件

- [PageHeader 页头](./page-header.md)
