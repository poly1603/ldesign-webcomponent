# Space 间距

设置组件之间的间距。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。

## 代码演示

### 基础用法

相邻组件水平间距。

<div class="demo-container">
  <ldesign-space>
    <ldesign-button>Button 1</ldesign-button>
    <ldesign-button>Button 2</ldesign-button>
    <ldesign-button>Button 3</ldesign-button>
  </ldesign-space>
</div>

```html
<ldesign-space>
  <ldesign-button>Button 1</ldesign-button>
  <ldesign-button>Button 2</ldesign-button>
  <ldesign-button>Button 3</ldesign-button>
</ldesign-space>
```

### 垂直间距

相邻组件垂直间距。

<div class="demo-container">
  <ldesign-space direction="vertical">
    <ldesign-card title="卡片1">内容1</ldesign-card>
    <ldesign-card title="卡片2">内容2</ldesign-card>
    <ldesign-card title="卡片3">内容3</ldesign-card>
  </ldesign-space>
</div>

```html
<ldesign-space direction="vertical">
  <ldesign-card>卡片1</ldesign-card>
  <ldesign-card>卡片2</ldesign-card>
</ldesign-space>
```

### 间距大小

间距预设 `small`、`medium`、`large` 三种大小，也可以自定义。

<div class="demo-container">
  <ldesign-space size="small">
    <ldesign-button>Small</ldesign-button>
    <ldesign-button>Small</ldesign-button>
  </ldesign-space>
  
  <ldesign-space size="medium">
    <ldesign-button>Medium</ldesign-button>
    <ldesign-button>Medium</ldesign-button>
  </ldesign-space>
  
  <ldesign-space size="large">
    <ldesign-button>Large</ldesign-button>
    <ldesign-button>Large</ldesign-button>
  </ldesign-space>
  
  <ldesign-space size="32">
    <ldesign-button>Custom</ldesign-button>
    <ldesign-button>32px</ldesign-button>
  </ldesign-space>
</div>

```html
<ldesign-space size="small">...</ldesign-space>
<ldesign-space size="medium">...</ldesign-space>
<ldesign-space size="large">...</ldesign-space>
<ldesign-space size="32">...</ldesign-space>
```

### 对齐方式

设置对齐模式。

<div class="demo-container">
  <ldesign-space align="start">
    <span>start</span>
    <ldesign-button>Button</ldesign-button>
    <ldesign-card>Card</ldesign-card>
  </ldesign-space>
  
  <ldesign-space align="center">
    <span>center</span>
    <ldesign-button>Button</ldesign-button>
    <ldesign-card>Card</ldesign-card>
  </ldesign-space>
  
  <ldesign-space align="end">
    <span>end</span>
    <ldesign-button>Button</ldesign-button>
    <ldesign-card>Card</ldesign-card>
  </ldesign-space>
</div>

```html
<ldesign-space align="start">...</ldesign-space>
<ldesign-space align="center">...</ldesign-space>
<ldesign-space align="end">...</ldesign-space>
```

### 自动换行

自动换行。

<div class="demo-container">
  <ldesign-space wrap>
    <ldesign-button>Button 1</ldesign-button>
    <ldesign-button>Button 2</ldesign-button>
    <ldesign-button>Button 3</ldesign-button>
    <ldesign-button>Button 4</ldesign-button>
    <ldesign-button>Button 5</ldesign-button>
    <ldesign-button>Button 6</ldesign-button>
  </ldesign-space>
</div>

```html
<ldesign-space wrap>
  <ldesign-button>Button 1</ldesign-button>
  <ldesign-button>Button 2</ldesign-button>
  <!-- 更多按钮 -->
</ldesign-space>
```

## 框架集成

### Vue 3

```vue
<template>
  <ldesign-space>
    <ldesign-button>按钮1</ldesign-button>
    <ldesign-button>按钮2</ldesign-button>
    <ldesign-button>按钮3</ldesign-button>
  </ldesign-space>
</template>
```

### React

```tsx
function App() {
  return (
    <ldesign-space>
      <ldesign-button>按钮1</ldesign-button>
      <ldesign-button>按钮2</ldesign-button>
      <ldesign-button>按钮3</ldesign-button>
    </ldesign-space>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `direction` | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `size` | 间距大小 | `'small' \| 'medium' \| 'large' \| number` | `'medium'` |
| `align` | 对齐方式 | `'start' \| 'center' \| 'end' \| 'baseline'` | `'center'` |
| `wrap` | 是否自动换行 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 需要添加间距的元素 |

## 相关组件

- [Divider 分割线](./divider.md)
