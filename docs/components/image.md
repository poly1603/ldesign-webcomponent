# Image 图片

可预览的图片。

## 何时使用

- 需要展示图片时使用。
- 加载大图时显示 loading 或加载失败时容错处理。

## 代码演示

### 基础用法

单击图片可以放大预览。

<div class="demo-container">
  <ldesign-image
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
    width="200"
  ></ldesign-image>
</div>

```html
<ldesign-image
  src="image.jpg"
  width="200"
></ldesign-image>
```

### 占位内容

自定义占位内容。

<div class="demo-container">
  <ldesign-image
    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"
    width="200"
    lazy
  ></ldesign-image>
</div>

```html
<ldesign-image
  src="image.jpg"
  lazy
></ldesign-image>
```

### 加载失败

加载失败时显示替代内容。

<div class="demo-container">
  <ldesign-image
    src="invalid-url.jpg"
    width="200"
    fallback="https://via.placeholder.com/200?text=Load+Failed"
  ></ldesign-image>
</div>

```html
<ldesign-image
  src="invalid.jpg"
  fallback="fallback.jpg"
></ldesign-image>
```

### 不同填充模式

通过 `fit` 属性设置图片填充模式。

<div class="demo-container">
  <ldesign-image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" width="200" height="150" fit="fill"></ldesign-image>
  <ldesign-image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" width="200" height="150" fit="contain"></ldesign-image>
  <ldesign-image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" width="200" height="150" fit="cover"></ldesign-image>
</div>

```html
<ldesign-image fit="fill"></ldesign-image>
<ldesign-image fit="contain"></ldesign-image>
<ldesign-image fit="cover"></ldesign-image>
```

### 图片预览

支持大图预览。

<div class="demo-container">
  <ldesign-image
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
    width="200"
    preview
  ></ldesign-image>
</div>

```html
<ldesign-image
  src="image.jpg"
  preview
></ldesign-image>
```

## 框架集成

### Vue 3

```vue
<script setup>
const handleLoad = () => {
  console.log('图片加载完成');
};

const handleError = () => {
  console.error('图片加载失败');
};
</script>

<template>
  <ldesign-image
    src="image.jpg"
    width="200"
    preview
    @ldesignLoad="handleLoad"
    @ldesignError="handleError"
  />
</template>
```

### React

```tsx
function App() {
  const handleLoad = () => {
    console.log('图片加载完成');
  };
  
  const handleError = () => {
    console.error('图片加载失败');
  };
  
  return (
    <ldesign-image
      src="image.jpg"
      width={200}
      preview
      onLdesignLoad={handleLoad}
      onLdesignError={handleError}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `src` | 图片地址 | `string` | - |
| `alt` | 图片描述 | `string` | - |
| `width` | 图片宽度 | `string \| number` | - |
| `height` | 图片高度 | `string \| number` | - |
| `fit` | 图片填充模式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
| `preview` | 是否开启预览 | `boolean` | `false` |
| `lazy` | 是否懒加载 | `boolean` | `false` |
| `fallback` | 加载失败的占位图 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignLoad` | 图片加载成功时触发 | `() => void` |
| `ldesignError` | 图片加载失败时触发 | `() => void` |
| `ldesignPreview` | 点击预览时触发 | `() => void` |

## 相关组件

- [Avatar 头像](./avatar.md)
- [Upload 上传](./upload.md)
