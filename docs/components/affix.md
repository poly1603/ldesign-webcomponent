# Affix 固钉

将页面元素钉在可视范围。

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-affix>
    <ldesign-button type="primary">固定在顶部</ldesign-button>
  </ldesign-affix>
</div>

```html
<ldesign-affix>
  <ldesign-button>固定按钮</ldesign-button>
</ldesign-affix>
```

### 固定在底部

固定在视窗底部。

<div class="demo-container">
  <ldesign-affix position="bottom" offset-bottom="20">
    <ldesign-button type="primary">固定在底部</ldesign-button>
  </ldesign-affix>
</div>

```html
<ldesign-affix position="bottom" offset-bottom="20">
  <ldesign-button>固定在底部</ldesign-button>
</ldesign-affix>
```

### 固定状态改变的回调

可以获得是否固定的状态。

```html
<ldesign-affix id="affix">
  <ldesign-button>固定按钮</ldesign-button>
</ldesign-affix>

<script>
  const affix = document.getElementById('affix');
  affix.addEventListener('ldesignChange', (e) => {
    console.log('固定状态:', e.detail);
  });
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
const handleChange = (affixed) => {
  console.log('固定状态:', affixed);
};
</script>

<template>
  <ldesign-affix @ldesignChange="handleChange">
    <ldesign-button type="primary">固定按钮</ldesign-button>
  </ldesign-affix>
</template>
```

### React

```tsx
function App() {
  const handleChange = (e) => {
    console.log('固定状态:', e.detail);
  };
  
  return (
    <ldesign-affix onLdesignChange={handleChange}>
      <ldesign-button type="primary">固定按钮</ldesign-button>
    </ldesign-affix>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `offset-top` | 距离窗口顶部达到指定偏移量后触发 | `number` | `0` |
| `offset-bottom` | 距离窗口底部达到指定偏移量后触发 | `number` | - |
| `target` | 设置需要监听其滚动事件的元素 | `string` | `window` |
| `position` | 固定位置 | `'top' \| 'bottom'` | `'top'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 固定状态改变时触发 | `(event: CustomEvent<boolean>) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 固定的内容 |

## 相关组件

- [Backtop 回到顶部](./backtop.md)
