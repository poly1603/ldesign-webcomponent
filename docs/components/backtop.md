# Backtop 回到顶部

返回页面顶部的操作按钮。

## 何时使用

- 当页面内容区域比较长时。
- 当用户需要频繁返回顶部查看相关内容时。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container" style="height: 300px; overflow: auto; position: relative;">
  <div style="height: 1000px; padding: 20px;">
    <p>向下滚动查看返回顶部按钮</p>
    <p>内容区域...</p>
  </div>
  <ldesign-backtop target=".demo-container"></ldesign-backtop>
</div>

```html
<div class="scroll-container" style="height: 600px; overflow: auto;">
  <div style="height: 2000px;">
    内容区域...
  </div>
  <ldesign-backtop></ldesign-backtop>
</div>
```

### 自定义样式

自定义返回顶部按钮的样式。

<div class="demo-container" style="height: 300px; overflow: auto; position: relative;">
  <div style="height: 1000px; padding: 20px;">
    <p>向下滚动查看自定义样式的按钮</p>
  </div>
  <ldesign-backtop target=".demo-container">
    <div style="height: 40px; width: 40px; background: #1890ff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
      UP
    </div>
  </ldesign-backtop>
</div>

```html
<ldesign-backtop>
  <div class="custom-backtop">
    自定义内容
  </div>
</ldesign-backtop>
```

### 设置可见高度

滚动高度达到此参数值才出现。

<div class="demo-container">
  <ldesign-backtop visibility-height="300"></ldesign-backtop>
</div>

```html
<ldesign-backtop visibility-height="300"></ldesign-backtop>
```

## 框架集成

### Vue 3

```vue
<script setup>
const handleClick = () => {
  console.log('回到顶部');
};
</script>

<template>
  <ldesign-backtop @ldesignClick="handleClick" />
</template>
```

### React

```tsx
function App() {
  const handleClick = () => {
    console.log('回到顶部');
  };
  
  return (
    <ldesign-backtop onLdesignClick={handleClick} />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `visibility-height` | 滚动高度达到此参数值才出现 | `number` | `400` |
| `right` | 控制其距离右侧的距离 | `number` | `40` |
| `bottom` | 控制其距离底部的距离 | `number` | `40` |
| `target` | 触发滚动的对象 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignClick` | 点击按钮时触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义内容 |

## 相关组件

- [Affix 固钉](./affix.md)
