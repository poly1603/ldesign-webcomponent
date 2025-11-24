# Rate 评分

评分组件。

## 何时使用

- 对评价进行展示。
- 对事物进行快速的评级操作。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-rate></ldesign-rate>
</div>

```html
<ldesign-rate></ldesign-rate>

<script>
  const rate = document.querySelector('ldesign-rate');
  rate.addEventListener('ldesignChange', (e) => {
    console.log('评分:', e.detail);
  });
</script>
```

### 半星

支持选择半星。

<div class="demo-container">
  <ldesign-rate allow-half></ldesign-rate>
</div>

```html
<ldesign-rate allow-half></ldesign-rate>
```

### 只读

只读，无法进行鼠标交互。

<div class="demo-container">
  <ldesign-rate value="3.5" disabled></ldesign-rate>
</div>

```html
<ldesign-rate value="3.5" disabled></ldesign-rate>
```

### 清除

支持允许或不允许清除。

<div class="demo-container">
  <ldesign-rate allow-clear></ldesign-rate>
  <ldesign-rate allow-clear="false"></ldesign-rate>
</div>

```html
<ldesign-rate allow-clear></ldesign-rate>
<ldesign-rate allow-clear="false"></ldesign-rate>
```

### 其他字符

可以将星星替换为其他字符，比如字母、数字、emoji 等。

<div class="demo-container">
  <ldesign-rate character="A"></ldesign-rate>
  <ldesign-rate character="好"></ldesign-rate>
  <ldesign-rate character="♥"></ldesign-rate>
</div>

```html
<ldesign-rate character="A"></ldesign-rate>
<ldesign-rate character="好"></ldesign-rate>
<ldesign-rate character="♥"></ldesign-rate>
```

### 显示文字

给评分添加文字提示。

<div class="demo-container">
  <ldesign-rate id="rate-with-text" show-text></ldesign-rate>
</div>


```html
<ldesign-rate id="rate" show-text></ldesign-rate>

<script>
  const rate = document.getElementById('rate');
  rate.texts = ['极差', '失望', '一般', '满意', '惊喜'];
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref(3.5);

const handleChange = (e) => {
  value.value = e.detail;
  console.log('评分:', value.value);
};
</script>

<template>
  <ldesign-rate
    :value="value"
    allow-half
    @ldesignChange="handleChange"
  />
  <p>当前评分: {{ value }}</p>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState(3.5);
  
  const handleChange = (e) => {
    setValue(e.detail);
    console.log('评分:', e.detail);
  };
  
  return (
    <>
      <ldesign-rate
        value={value}
        allow-half
        onLdesignChange={handleChange}
      />
      <p>当前评分: {value}</p>
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 当前值 | `number` | `0` |
| `count` | star 总数 | `number` | `5` |
| `allow-half` | 是否允许半选 | `boolean` | `false` |
| `allow-clear` | 是否允许再次点击后清除 | `boolean` | `true` |
| `disabled` | 是否只读 | `boolean` | `false` |
| `character` | 自定义字符 | `string` | `'★'` |
| `show-text` | 是否显示辅助文字 | `boolean` | `false` |
| `texts` | 自定义文字数组 | `string[]` | `['极差', '失望', '一般', '满意', '惊喜']` |
| `color` | 自定义颜色 | `string` | `'#fadb14'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 选择时的回调 | `(event: CustomEvent<number>) => void` |
| `ldesignHoverChange` | 鼠标经过时的回调 | `(event: CustomEvent<number>) => void` |

## 相关组件

- [Slider 滑动输入条](./slider.md)

<script>
if (typeof window !== 'undefined') {
  const initRate = () => {
    // 显示文字
    const rateWithText = document.getElementById('rate-with-text');
    if (rateWithText) {
      rateWithText.texts = ['极差', '失望', '一般', '满意', '惊喜'];
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRate);
  } else {
    initRate();
  }
}
</script>
