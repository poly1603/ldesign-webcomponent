# Divider 分割线

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示

### 基础用法

默认为水平分割线。

<div class="demo-container">
  <p>段落一</p>
  <ldesign-divider></ldesign-divider>
  <p>段落二</p>
  <ldesign-divider></ldesign-divider>
  <p>段落三</p>
</div>

```html
<p>段落一</p>
<ldesign-divider></ldesign-divider>
<p>段落二</p>
```

### 带文字的分割线

分割线中带有文字。

<div class="demo-container">
  <p>内容上方</p>
  <ldesign-divider>分割线文字</ldesign-divider>
  <p>内容下方</p>
</div>

```html
<ldesign-divider>分割线文字</ldesign-divider>
```

### 文字位置

使用 `orientation` 指定分割线文字的位置。

<div class="demo-container">
  <ldesign-divider orientation="left">左侧文字</ldesign-divider>
  <ldesign-divider orientation="center">中间文字</ldesign-divider>
  <ldesign-divider orientation="right">右侧文字</ldesign-divider>
</div>

```html
<ldesign-divider orientation="left">左侧文字</ldesign-divider>
<ldesign-divider orientation="center">中间文字</ldesign-divider>
<ldesign-divider orientation="right">右侧文字</ldesign-divider>
```

### 垂直分割线

使用 `direction="vertical"` 设置为行内的垂直分割线。

<div class="demo-container">
  <span>文本</span>
  <ldesign-divider direction="vertical"></ldesign-divider>
  <a href="#">链接</a>
  <ldesign-divider direction="vertical"></ldesign-divider>
  <a href="#">链接</a>
</div>

```html
<span>文本</span>
<ldesign-divider direction="vertical"></ldesign-divider>
<a href="#">链接</a>
```

### 虚线

添加 `dashed` 属性使用虚线。

<div class="demo-container">
  <ldesign-divider dashed></ldesign-divider>
  <ldesign-divider dashed>虚线分割</ldesign-divider>
</div>

```html
<ldesign-divider dashed></ldesign-divider>
<ldesign-divider dashed>虚线分割</ldesign-divider>
```

## 框架集成

### Vue 3

```vue
<template>
  <div>
    <p>段落一</p>
    <ldesign-divider>分割线</ldesign-divider>
    <p>段落二</p>
  </div>
</template>
```

### React

```tsx
function App() {
  return (
    <div>
      <p>段落一</p>
      <ldesign-divider>分割线</ldesign-divider>
      <p>段落二</p>
    </div>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `direction` | 分割线方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `orientation` | 文字位置 | `'left' \| 'center' \| 'right'` | `'center'` |
| `dashed` | 是否虚线 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 分割线文字内容 |

## 相关组件

- [Space 间距](./space.md)
