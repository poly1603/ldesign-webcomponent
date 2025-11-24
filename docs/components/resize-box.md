# ResizeBox 伸缩框

伸缩框组件。

## 何时使用

伸缩框组件可以让用户拖拽来调整元素的尺寸。

## 代码演示

### 基础用法

基础的伸缩框。

<div class="demo-container">
  <ldesign-resize-box style="width: 400px; height: 200px;">
    <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
      拖动边框调整大小
    </div>
  </ldesign-resize-box>
</div>

```html
<ldesign-resize-box>
  <div>可调整大小的内容</div>
</ldesign-resize-box>
```

### 限制尺寸

设置最小和最大尺寸。

<div class="demo-container">
  <ldesign-resize-box 
    min-width="200" 
    max-width="600"
    min-height="100"
    max-height="400"
    style="width: 300px; height: 200px;">
    <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
      限制尺寸范围
    </div>
  </ldesign-resize-box>
</div>

```html
<ldesign-resize-box 
  min-width="200"
  max-width="600"
  min-height="100"
  max-height="400">
  <div>内容</div>
</ldesign-resize-box>
```

### 指定方向

指定可调整的方向。

<div class="demo-container">
  <ldesign-resize-box directions="right,bottom" style="width: 300px; height: 200px;">
    <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
      只能调整右侧和底部
    </div>
  </ldesign-resize-box>
</div>

```html
<ldesign-resize-box directions="right,bottom">
  <div>内容</div>
</ldesign-resize-box>
```

## 框架集成

### Vue 3

```vue
<script setup>
const handleResize = (size) => {
  console.log('尺寸改变:', size);
};
</script>

<template>
  <ldesign-resize-box
    :min-width="200"
    :max-width="800"
    @ldesignResize="handleResize"
  >
    <div>内容</div>
  </ldesign-resize-box>
</template>
```

### React

```tsx
function App() {
  const handleResize = (e) => {
    console.log('尺寸改变:', e.detail);
  };
  
  return (
    <ldesign-resize-box
      min-width={200}
      max-width={800}
      onLdesignResize={handleResize}
    >
      <div>内容</div>
    </ldesign-resize-box>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `width` | 宽度 | `number \| string` | - |
| `height` | 高度 | `number \| string` | - |
| `min-width` | 最小宽度 | `number` | `0` |
| `max-width` | 最大宽度 | `number` | `Infinity` |
| `min-height` | 最小高度 | `number` | `0` |
| `max-height` | 最大高度 | `number` | `Infinity` |
| `directions` | 可调整的方向 | `string` | `'top,right,bottom,left'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignResize` | 尺寸改变时触发 | `(event: CustomEvent<{width: number, height: number}>) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 内容 |

## 相关组件

- [Split 分割面板](./split.md)
- [Modal 对话框](./modal.md)
