# Split 分割面板

可拖拽调整子元素尺寸的分割面板。

## 何时使用

需要动态调整两个或多个区域尺寸时使用。

## 代码演示

### 基础用法

水平分割面板。

<div class="demo-container">
  <ldesign-split style="height: 300px;">
    <div slot="left" style="padding: 20px; background: #f0f0f0;">
      左侧面板
    </div>
    <div slot="right" style="padding: 20px; background: #fafafa;">
      右侧面板
    </div>
  </ldesign-split>
</div>

```html
<ldesign-split style="height: 400px;">
  <div slot="left">左侧内容</div>
  <div slot="right">右侧内容</div>
</ldesign-split>
```

### 垂直分割

垂直方向的分割面板。

<div class="demo-container">
  <ldesign-split direction="vertical" style="height: 300px;">
    <div slot="top" style="padding: 20px; background: #f0f0f0;">
      顶部面板
    </div>
    <div slot="bottom" style="padding: 20px; background: #fafafa;">
      底部面板
    </div>
  </ldesign-split>
</div>

```html
<ldesign-split direction="vertical" style="height: 400px;">
  <div slot="top">顶部内容</div>
  <div slot="bottom">底部内容</div>
</ldesign-split>
```

### 默认尺寸

设置默认分割比例。

<div class="demo-container">
  <ldesign-split default-size="30%" style="height: 300px;">
    <div slot="left" style="padding: 20px; background: #f0f0f0;">
      左侧 30%
    </div>
    <div slot="right" style="padding: 20px; background: #fafafa;">
      右侧 70%
    </div>
  </ldesign-split>
</div>

```html
<ldesign-split default-size="30%">
  ...
</ldesign-split>
```

## 框架集成

### Vue 3

```vue
<script setup>
const handleResize = (size) => {
  console.log('当前尺寸:', size);
};
</script>

<template>
  <ldesign-split
    style="height: 500px;"
    @ldesignResize="handleResize"
  >
    <div slot="left">左侧内容</div>
    <div slot="right">右侧内容</div>
  </ldesign-split>
</template>
```

### React

```tsx
function App() {
  const handleResize = (e) => {
    console.log('当前尺寸:', e.detail);
  };
  
  return (
    <ldesign-split
      style={{ height: '500px' }}
      onLdesignResize={handleResize}
    >
      <div slot="left">左侧内容</div>
      <div slot="right">右侧内容</div>
    </ldesign-split>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `direction` | 分割方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `default-size` | 默认面板大小 | `string \| number` | `'50%'` |
| `min` | 最小阈值 | `string \| number` | `'0px'` |
| `max` | 最大阈值 | `string \| number` | `'100%'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignResize` | 拖拽时触发 | `(event: CustomEvent<number>) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `left` / `top` | 左侧/顶部内容 |
| `right` / `bottom` | 右侧/底部内容 |

## 相关组件

- [Layout 布局](./layout.md)
