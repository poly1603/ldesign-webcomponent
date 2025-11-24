# InputNumber 数字输入框

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## 代码演示

### 基础用法

数字输入框。

<div class="demo-container">
  <ldesign-input-number></ldesign-input-number>
</div>

```html
<ldesign-input-number></ldesign-input-number>

<script>
  const inputNumber = document.querySelector('ldesign-input-number');
  inputNumber.addEventListener('ldesignChange', (e) => {
    console.log('值:', e.detail);
  });
</script>
```

### 禁用状态

点击按钮切换可用状态。

<div class="demo-container">
  <ldesign-input-number disabled></ldesign-input-number>
</div>

```html
<ldesign-input-number disabled></ldesign-input-number>
```

### 步数

改变步数。

<div class="demo-container">
  <ldesign-input-number step="0.1"></ldesign-input-number>
  <ldesign-input-number step="5"></ldesign-input-number>
  <ldesign-input-number step="10"></ldesign-input-number>
</div>

```html
<ldesign-input-number step="0.1"></ldesign-input-number>
<ldesign-input-number step="5"></ldesign-input-number>
<ldesign-input-number step="10"></ldesign-input-number>
```

### 设置最大最小值

设置最大值和最小值。

<div class="demo-container">
  <ldesign-input-number min="0" max="10"></ldesign-input-number>
</div>

```html
<ldesign-input-number min="0" max="10"></ldesign-input-number>
```

### 不同尺寸

三种大小的数字输入框。

<div class="demo-container">
  <ldesign-input-number size="small"></ldesign-input-number>
  <ldesign-input-number size="medium"></ldesign-input-number>
  <ldesign-input-number size="large"></ldesign-input-number>
</div>

```html
<ldesign-input-number size="small"></ldesign-input-number>
<ldesign-input-number size="medium"></ldesign-input-number>
<ldesign-input-number size="large"></ldesign-input-number>
```

### 小数精度

设置小数精度。

<div class="demo-container">
  <ldesign-input-number precision="2" step="0.1"></ldesign-input-number>
</div>

```html
<ldesign-input-number precision="2" step="0.1"></ldesign-input-number>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref(1);

const handleChange = (e) => {
  value.value = e.detail;
  console.log('当前值:', value.value);
};
</script>

<template>
  <ldesign-input-number
    :value="value"
    :min="0"
    :max="100"
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState(1);
  
  const handleChange = (e) => {
    setValue(e.detail);
    console.log('当前值:', e.detail);
  };
  
  return (
    <ldesign-input-number
      value={value}
      min={0}
      max={100}
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 当前值 | `number` | - |
| `default-value` | 默认值 | `number` | - |
| `min` | 最小值 | `number` | `-Infinity` |
| `max` | 最大值 | `number` | `Infinity` |
| `step` | 每次改变步数 | `number` | `1` |
| `precision` | 数值精度 | `number` | - |
| `size` | 输入框大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `placeholder` | 占位文本 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 值改变时触发 | `(event: CustomEvent<number>) => void` |
| `ldesignBlur` | 失去焦点时触发 | `() => void` |
| `ldesignFocus` | 获得焦点时触发 | `() => void` |

## 相关组件

- [Input 输入框](./input.md)
- [Slider 滑动输入条](./slider.md)
