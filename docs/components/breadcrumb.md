# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 需要告知用户当前位置
- 需要快速返回上级页面

## 基础用法

:::demo

```html
<ldesign-breadcrumb>
  <ldesign-breadcrumb-item href="/">首页</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item href="/components">组件</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item>Breadcrumb</ldesign-breadcrumb-item>
</ldesign-breadcrumb>
```

:::

## 带图标

:::demo

```html
<ldesign-breadcrumb>
  <ldesign-breadcrumb-item href="/" icon="home">首页</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item href="/components" icon="layers">组件</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item icon="file-text">当前页</ldesign-breadcrumb-item>
</ldesign-breadcrumb>
```

:::

## 自定义分隔符

:::demo

```html
<ldesign-breadcrumb separator=">">
  <ldesign-breadcrumb-item href="/">首页</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item href="/list">列表</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item>详情</ldesign-breadcrumb-item>
</ldesign-breadcrumb>

<br>

<ldesign-breadcrumb separator-icon="chevron-right">
  <ldesign-breadcrumb-item href="/">首页</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item href="/list">列表</ldesign-breadcrumb-item>
  <ldesign-breadcrumb-item>详情</ldesign-breadcrumb-item>
</ldesign-breadcrumb>
```

:::

## API

### Breadcrumb Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| separator | `string` | `'/'` | 分隔符 |
| separatorIcon | `string` | - | 分隔符图标 |

### BreadcrumbItem Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| href | `string` | - | 链接地址 |
| disabled | `boolean` | `false` | 是否禁用 |
| icon | `string` | - | 图标 |

