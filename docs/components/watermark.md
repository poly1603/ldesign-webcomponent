# Watermark 水印

给页面的某个区域加上水印。

## 何时使用

- 页面需要添加水印标识版权时使用。
- 适用于防止信息盗用。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container" style="height: 300px; position: relative;">
  <ldesign-watermark content="Ldesign Watermark">
    <div style="height: 100%; padding: 20px;">
      <p>这是一段内容</p>
      <p>水印在背景层</p>
    </div>
  </ldesign-watermark>
</div>

```html
<ldesign-watermark content="Ldesign">
  <div class="content">
    内容区域
  </div>
</ldesign-watermark>
```

### 多行水印

通过设置 `content` 为数组可以实现多行水印。

<div class="demo-container" style="height: 300px; position: relative;">
  <ldesign-watermark id="multi-line-watermark">
    <div style="height: 100%; padding: 20px;">
      <p>多行水印内容</p>
    </div>
  </ldesign-watermark>
</div>

<script>
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
  const watermark = document.getElementById('multi-line-watermark')
  if (watermark) {
    watermark.content = ['第一行', '第二行']
  }
  })
}
</script>

```html
<ldesign-watermark id="watermark">
  <div>内容</div>
</ldesign-watermark>

<script>
  const watermark = document.getElementById('watermark');
  watermark.content = ['第一行', '第二行'];
</script>
```

### 图片水印

通过 `image` 属性设置图片水印。

<div class="demo-container" style="height: 300px; position: relative;">
  <ldesign-watermark image="https://via.placeholder.com/120x30?text=Logo">
    <div style="height: 100%; padding: 20px;">
      <p>图片水印</p>
    </div>
  </ldesign-watermark>
</div>

```html
<ldesign-watermark image="logo.png">
  <div>内容</div>
</ldesign-watermark>
```

## 框架集成

### Vue 3

```vue
<script setup>
const watermarkConfig = {
  content: 'Ldesign',
  rotate: -22,
  fontSize: 16,
  fontColor: 'rgba(0, 0, 0, 0.15)'
};
</script>

<template>
  <ldesign-watermark
    :content="watermarkConfig.content"
    :rotate="watermarkConfig.rotate"
    :font-size="watermarkConfig.fontSize"
    :font-color="watermarkConfig.fontColor"
  >
    <div class="content">
      内容区域
    </div>
  </ldesign-watermark>
</template>
```

### React

```tsx
function App() {
  return (
    <ldesign-watermark
      content="Ldesign"
      rotate={-22}
      font-size={16}
      font-color="rgba(0, 0, 0, 0.15)"
    >
      <div className="content">
        内容区域
      </div>
    </ldesign-watermark>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `content` | 水印文字内容 | `string \| string[]` | - |
| `image` | 图片源，优先级高于文字 | `string` | - |
| `width` | 水印的宽度 | `number` | `120` |
| `height` | 水印的高度 | `number` | `64` |
| `rotate` | 水印绘制时旋转的角度 | `number` | `-22` |
| `z-index` | 水印的 z-index | `number` | `9` |
| `font-size` | 字体大小 | `number` | `16` |
| `font-color` | 字体颜色 | `string` | `'rgba(0,0,0,.15)'` |
| `gap-x` | 水印之间的水平间距 | `number` | `100` |
| `gap-y` | 水印之间的垂直间距 | `number` | `100` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 添加水印的内容 |

## 相关组件

- [Image 图片](./image.md)
