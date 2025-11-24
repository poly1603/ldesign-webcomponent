# Scrollbar 滚动条

自定义滚动条组件。

## 何时使用

用于替换浏览器原生滚动条，提供更美观的滚动体验。

## 代码演示

### 基础用法

基本的滚动条。

<div class="demo-container">
  <ldesign-scrollbar style="height: 300px;">
    <div style="padding: 20px;">
      <p>内容区域 1</p>
      <p>内容区域 2</p>
      <p>内容区域 3</p>
      <p>内容区域 4</p>
      <p>内容区域 5</p>
      <p>内容区域 6</p>
      <p>内容区域 7</p>
      <p>内容区域 8</p>
      <p>内容区域 9</p>
      <p>内容区域 10</p>
      <p>内容区域 11</p>
      <p>内容区域 12</p>
    </div>
  </ldesign-scrollbar>
</div>

```html
<ldesign-scrollbar style="height: 400px;">
  <div>
    <!-- 很长的内容 -->
  </div>
</ldesign-scrollbar>
```

### 横向滚动

设置横向滚动。

<div class="demo-container">
  <ldesign-scrollbar style="height: 100px;">
    <div style="display: flex; gap: 20px; padding: 20px;">
      <div style="min-width: 200px; height: 50px; background: #f0f0f0;">Item 1</div>
      <div style="min-width: 200px; height: 50px; background: #f0f0f0;">Item 2</div>
      <div style="min-width: 200px; height: 50px; background: #f0f0f0;">Item 3</div>
      <div style="min-width: 200px; height: 50px; background: #f0f0f0;">Item 4</div>
    </div>
  </ldesign-scrollbar>
</div>

```html
<ldesign-scrollbar>
  <div style="display: flex; width: 1000px;">
    <!-- 横向内容 -->
  </div>
</ldesign-scrollbar>
```

## 框架集成

### Vue 3

```vue
<template>
  <ldesign-scrollbar style="height: 400px;">
    <div class="content">
      <!-- 内容 -->
    </div>
  </ldesign-scrollbar>
</template>
```

### React

```tsx
function App() {
  return (
    <ldesign-scrollbar style={{ height: '400px' }}>
      <div className="content">
        {/* 内容 */}
      </div>
    </ldesign-scrollbar>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `height` | 滚动条高度 | `string \| number` | - |
| `max-height` | 滚动条最大高度 | `string \| number` | - |
| `always` | 滚动条总是显示 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignScroll` | 滚动时触发 | `(event: CustomEvent) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 滚动内容 |

## 相关组件

- [VirtualList 虚拟列表](./virtual-list.md)
