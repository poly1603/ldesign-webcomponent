# Badge 徽标数

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 代码演示

### 基础用法

简单的徽章展示。

<div class="demo-container">
  <ldesign-badge count="5">
    <ldesign-avatar shape="square" icon="mail"></ldesign-avatar>
  </ldesign-badge>
  
  <ldesign-badge count="0" show-zero>
    <ldesign-avatar shape="square" icon="mail"></ldesign-avatar>
  </ldesign-badge>
</div>

```html
<ldesign-badge count="5">
  <ldesign-avatar icon="mail"></ldesign-avatar>
</ldesign-badge>

<ldesign-badge count="0" show-zero>
  <ldesign-avatar icon="mail"></ldesign-avatar>
</ldesign-badge>
```

### 最大值

超过 `max` 的数值会显示为 `${max}+`。

<div class="demo-container">
  <ldesign-badge count="99">
    <ldesign-avatar shape="square" icon="mail"></ldesign-avatar>
  </ldesign-badge>
  
  <ldesign-badge count="100">
    <ldesign-avatar shape="square" icon="mail"></ldesign-avatar>
  </ldesign-badge>
  
  <ldesign-badge count="99" max="10">
    <ldesign-avatar shape="square" icon="mail"></ldesign-avatar>
  </ldesign-badge>
</div>

```html
<ldesign-badge count="99">
  <ldesign-avatar icon="mail"></ldesign-avatar>
</ldesign-badge>

<ldesign-badge count="100">
  <ldesign-avatar icon="mail"></ldesign-avatar>
</ldesign-badge>

<ldesign-badge count="99" max="10">
  <ldesign-avatar icon="mail"></ldesign-avatar>
</ldesign-badge>
```

### 独立使用

不包裹任何元素即是独立使用，可自定样式展现。

<div class="demo-container">
  <ldesign-badge count="25"></ldesign-badge>
  <ldesign-badge count="4" color="success"></ldesign-badge>
  <ldesign-badge count="109" color="primary"></ldesign-badge>
</div>

```html
<ldesign-badge count="25"></ldesign-badge>
<ldesign-badge count="4" color="success"></ldesign-badge>
<ldesign-badge count="109" color="primary"></ldesign-badge>
```

### 小红点

以红点的形式标注需要关注的内容。

<div class="demo-container">
  <ldesign-badge dot>
    <ldesign-avatar shape="square" icon="mail"></ldesign-avatar>
  </ldesign-badge>
  
  <ldesign-badge dot>
    <ldesign-icon name="bell" size="20"></ldesign-icon>
  </ldesign-badge>
  
  <ldesign-badge dot>
    <a href="#">链接</a>
  </ldesign-badge>
</div>

```html
<ldesign-badge dot>
  <ldesign-avatar icon="mail"></ldesign-avatar>
</ldesign-badge>

<ldesign-badge dot>
  <ldesign-icon name="bell"></ldesign-icon>
</ldesign-badge>
```

### 状态点

用于表示状态的小圆点。

<div class="demo-container">
  <ldesign-badge status="success" text="成功"></ldesign-badge>
  <ldesign-badge status="error" text="错误"></ldesign-badge>
  <ldesign-badge status="warning" text="警告"></ldesign-badge>
  <ldesign-badge status="processing" text="进行中"></ldesign-badge>
  <ldesign-badge status="default" text="默认"></ldesign-badge>
</div>

```html
<ldesign-badge status="success" text="成功"></ldesign-badge>
<ldesign-badge status="error" text="错误"></ldesign-badge>
<ldesign-badge status="processing" text="进行中"></ldesign-badge>
```

### 动态

展示动态变化的效果。

<div class="demo-container">
  <ldesign-badge id="dynamic-badge" count="5">
    <ldesign-avatar shape="square" icon="mail"></ldesign-avatar>
  </ldesign-badge>
  
  <ldesign-button-group style="margin-left: 20px;">
    <ldesign-button id="decrease-btn" size="small">-</ldesign-button>
    <ldesign-button id="increase-btn" size="small">+</ldesign-button>
  </ldesign-button-group>
</div>

<script>
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
  let count = 5
  const badge = document.getElementById('dynamic-badge')
  const decreaseBtn = document.getElementById('decrease-btn')
  const increaseBtn = document.getElementById('increase-btn')
  
  if (badge && decreaseBtn && increaseBtn) {
    decreaseBtn.addEventListener('ldesignClick', () => {
      count = Math.max(0, count - 1)
      badge.count = count
    })
    
    increaseBtn.addEventListener('ldesignClick', () => {
      count = count + 1
      badge.count = count
    })
  }
  })
}
</script>

```html
<ldesign-badge id="badge" count="5">
  <ldesign-avatar icon="mail"></ldesign-avatar>
</ldesign-badge>

<script>
  const badge = document.getElementById('badge');
  let count = 5;
  
  function increase() {
    count++;
    badge.count = count;
  }
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const count = ref(5);

const increase = () => {
  count.value++;
};

const decrease = () => {
  count.value = Math.max(0, count.value - 1);
};
</script>

<template>
  <ldesign-badge :count="count">
    <ldesign-avatar icon="mail" />
  </ldesign-badge>
  
  <ldesign-button @ldesignClick="decrease">-</ldesign-button>
  <ldesign-button @ldesignClick="increase">+</ldesign-button>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(5);
  
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(Math.max(0, count - 1));
  
  return (
    <>
      <ldesign-badge count={count}>
        <ldesign-avatar icon="mail" />
      </ldesign-badge>
      
      <ldesign-button onLdesignClick={decrease}>-</ldesign-button>
      <ldesign-button onLdesignClick={increase}>+</ldesign-button>
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `count` | 展示的数字 | `number` | - |
| `max` | 最大值，超过最大值会显示 `{max}+` | `number` | `99` |
| `dot` | 不展示数字，只有一个小红点 | `boolean` | `false` |
| `show-zero` | 当数值为 0 时，是否展示 Badge | `boolean` | `false` |
| `color` | 自定义颜色 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'danger'` |
| `status` | 设置Badge为状态点 | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | - |
| `text` | 在设置了 status 的前提下有效，设置状态点的文本 | `string` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义徽标包裹的元素 |

## 相关组件

- [Avatar 头像](./avatar.md)
- [Tag 标签](./tag.md)
