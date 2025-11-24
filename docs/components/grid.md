# Grid 栅格

24 栅格系统。

## 设计理念

在多数业务情况下，我们需要基于 24 栅格来划分设计区域，通过栅格的数值来控制布局的比例。

## 代码演示

### 基础用法

使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统。

<div class="demo-container">
  <ldesign-row>
    <ldesign-col span="24"><div style="background: #0092ff; padding: 16px; color: white;">col-24</div></ldesign-col>
  </ldesign-row>
  <ldesign-row>
    <ldesign-col span="12"><div style="background: #0092ff; padding: 16px; color: white;">col-12</div></ldesign-col>
    <ldesign-col span="12"><div style="background: #3db0ff; padding: 16px; color: white;">col-12</div></ldesign-col>
  </ldesign-row>
  <ldesign-row>
    <ldesign-col span="8"><div style="background: #0092ff; padding: 16px; color: white;">col-8</div></ldesign-col>
    <ldesign-col span="8"><div style="background: #3db0ff; padding: 16px; color: white;">col-8</div></ldesign-col>
    <ldesign-col span="8"><div style="background: #0092ff; padding: 16px; color: white;">col-8</div></ldesign-col>
  </ldesign-row>
</div>

```html
<ldesign-row>
  <ldesign-col span="12">col-12</ldesign-col>
  <ldesign-col span="12">col-12</ldesign-col>
</ldesign-row>
```

### 区块间隔

栅格常常需要和间隔进行配合，通过 `gutter` 属性设置间隔。

<div class="demo-container">
  <ldesign-row gutter="16">
    <ldesign-col span="6"><div style="background: #0092ff; padding: 16px; color: white;">col-6</div></ldesign-col>
    <ldesign-col span="6"><div style="background: #0092ff; padding: 16px; color: white;">col-6</div></ldesign-col>
    <ldesign-col span="6"><div style="background: #0092ff; padding: 16px; color: white;">col-6</div></ldesign-col>
    <ldesign-col span="6"><div style="background: #0092ff; padding: 16px; color: white;">col-6</div></ldesign-col>
  </ldesign-row>
</div>

```html
<ldesign-row gutter="16">
  <ldesign-col span="6">col-6</ldesign-col>
  <ldesign-col span="6">col-6</ldesign-col>
</ldesign-row>
```

### 左右偏移

列偏移，通过 `offset` 设置偏移的格数。

<div class="demo-container">
  <ldesign-row>
    <ldesign-col span="8"><div style="background: #0092ff; padding: 16px; color: white;">col-8</div></ldesign-col>
    <ldesign-col span="8" offset="8"><div style="background: #0092ff; padding: 16px; color: white;">col-8 offset-8</div></ldesign-col>
  </ldesign-row>
</div>

```html
<ldesign-row>
  <ldesign-col span="8">col-8</ldesign-col>
  <ldesign-col span="8" offset="8">col-8 offset-8</ldesign-col>
</ldesign-row>
```

### 对齐方式

布局基础，子元素根据不同的值 `start`、`center`、`end`、`space-around`、`space-between` 来定义其在父节点里面的排版方式。

<div class="demo-container">
  <ldesign-row justify="start">
    <ldesign-col span="4"><div style="background: #0092ff; padding: 16px; color: white;">col-4</div></ldesign-col>
    <ldesign-col span="4"><div style="background: #0092ff; padding: 16px; color: white;">col-4</div></ldesign-col>
  </ldesign-row>
  
  <ldesign-row justify="center">
    <ldesign-col span="4"><div style="background: #0092ff; padding: 16px; color: white;">col-4</div></ldesign-col>
    <ldesign-col span="4"><div style="background: #0092ff; padding: 16px; color: white;">col-4</div></ldesign-col>
  </ldesign-row>
  
  <ldesign-row justify="end">
    <ldesign-col span="4"><div style="background: #0092ff; padding: 16px; color: white;">col-4</div></ldesign-col>
    <ldesign-col span="4"><div style="background: #0092ff; padding: 16px; color: white;">col-4</div></ldesign-col>
  </ldesign-row>
</div>

```html
<ldesign-row justify="start">...</ldesign-row>
<ldesign-row justify="center">...</ldesign-row>
<ldesign-row justify="end">...</ldesign-row>
<ldesign-row justify="space-between">...</ldesign-row>
<ldesign-row justify="space-around">...</ldesign-row>
```

## 框架集成

### Vue 3

```vue
<template>
  <ldesign-row :gutter="16">
    <ldesign-col :span="6">
      <div class="grid-content">col-6</div>
    </ldesign-col>
    <ldesign-col :span="6">
      <div class="grid-content">col-6</div>
    </ldesign-col>
  </ldesign-row>
</template>
```

### React

```tsx
function App() {
  return (
    <ldesign-row gutter={16}>
      <ldesign-col span={6}>
        <div className="grid-content">col-6</div>
      </ldesign-col>
      <ldesign-col span={6}>
        <div className="grid-content">col-6</div>
      </ldesign-col>
    </ldesign-row>
  );
}
```

## API

### Row Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `gutter` | 栅格间隔 | `number \| [number, number]` | `0` |
| `justify` | 水平排列方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between'` | `'start'` |
| `align` | 垂直对齐方式 | `'top' \| 'middle' \| 'bottom'` | `'top'` |

### Col Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `span` | 栅格占位格数 | `number` | - |
| `offset` | 栅格左侧的间隔格数 | `number` | `0` |
| `push` | 栅格向右移动格数 | `number` | `0` |
| `pull` | 栅格向左移动格数 | `number` | `0` |

## 相关组件

- [Layout 布局](./layout.md)
- [Space 间距](./space.md)
