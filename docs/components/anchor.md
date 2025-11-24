# Anchor 锚点

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-anchor>
    <ldesign-anchor-link href="#basic" title="基础用法"></ldesign-anchor-link>
    <ldesign-anchor-link href="#api" title="API"></ldesign-anchor-link>
  </ldesign-anchor>
</div>

```html
<ldesign-anchor>
  <ldesign-anchor-link href="#section1" title="Section 1" />
  <ldesign-anchor-link href="#section2" title="Section 2" />
  <ldesign-anchor-link href="#section3" title="Section 3" />
</ldesign-anchor>
```

## 框架集成

### Vue 3

```vue
<template>
  <ldesign-anchor>
    <ldesign-anchor-link href="#section1" title="Section 1" />
    <ldesign-anchor-link href="#section2" title="Section 2" />
  </ldesign-anchor>
</template>
```

### React

```tsx
function App() {
  return (
    <ldesign-anchor>
      <ldesign-anchor-link href="#section1" title="Section 1" />
      <ldesign-anchor-link href="#section2" title="Section 2" />
    </ldesign-anchor>
  );
}
```

## API

### Anchor Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `offset-top` | 距离窗口顶部达到指定偏移量后触发 | `number` | `0` |
| `bounds` | 锚点区域边界 | `number` | `5` |

### AnchorLink Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `href` | 锚点链接 | `string` | - |
| `title` | 文字内容 | `string` | - |

## 相关组件

- [Affix 固钉](./affix.md)
- [Breadcrumb 面包屑](./breadcrumb.md)
