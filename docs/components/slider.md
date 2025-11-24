# Slider 滑动输入条

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## 代码演示

### 基础用法

基本滑动条。

<div class="demo-container">
  <ldesign-slider></ldesign-slider>
</div>

```html
<ldesign-slider></ldesign-slider>

<script>
  const slider = document.querySelector('ldesign-slider');
  slider.addEventListener('ldesignChange', (e) => {
    console.log('值:', e.detail);
  });
</script>
```

### 带输入框

和数字输入框组件保持同步。

<div class="demo-container">
  <ldesign-slider show-input></ldesign-slider>
</div>

```html
<ldesign-slider show-input></ldesign-slider>
```

### 离散值

可以设置step属性来设置步长。

<div class="demo-container">
  <ldesign-slider step="10"></ldesign-slider>
  <ldesign-slider step="20" show-stops></ldesign-slider>
</div>

```html
<ldesign-slider step="10"></ldesign-slider>
<ldesign-slider step="20" show-stops></ldesign-slider>
```

### 带标记

使用marks属性标注分段式滑块。

<div class="demo-container">
  <ldesign-slider id="marks-slider"></ldesign-slider>
</div>


```html
<ldesign-slider id="slider"></ldesign-slider>

<script>
  const slider = document.getElementById('slider');
  slider.marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: '100°C'
  };
</script>
```

### 范围选择

支持选择范围。

<div class="demo-container">
  <ldesign-slider range></ldesign-slider>
</div>

```html
<ldesign-slider range></ldesign-slider>
```

### 垂直方向

垂直方向的 Slider。

<div class="demo-container" style="height: 300px;">
  <ldesign-slider vertical></ldesign-slider>
</div>

```html
<ldesign-slider vertical></ldesign-slider>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref(30);

const handleChange = (e) => {
  value.value = e.detail;
  console.log('当前值:', value.value);
};
</script>

<template>
  <ldesign-slider
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
  const [value, setValue] = useState(30);
  
  const handleChange = (e) => {
    setValue(e.detail);
    console.log('当前值:', e.detail);
  };
  
  return (
    <ldesign-slider
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
| `value` | 当前值 | `number \| number[]` | `0` |
| `default-value` | 默认值 | `number \| number[]` | `0` |
| `min` | 最小值 | `number` | `0` |
| `max` | 最大值 | `number` | `100` |
| `step` | 步长 | `number` | `1` |
| `range` | 是否为范围选择 | `boolean` | `false` |
| `vertical` | 是否竖向模式 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `show-input` | 是否显示输入框 | `boolean` | `false` |
| `show-stops` | 是否显示间断点 | `boolean` | `false` |
| `show-tooltip` | 是否显示 tooltip | `boolean` | `true` |
| `marks` | 刻度标记 | `Record<number, string>` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 值改变时触发 | `(event: CustomEvent<number \| number[]>) => void` |
| `ldesignInput` | 拖动时触发 | `(event: CustomEvent<number \| number[]>) => void` |

## 相关组件

- [InputNumber 数字输入框](./input-number.md)
- [Rate 评分](./rate.md)

<script>
if (typeof window !== 'undefined') {
  const initSlider = () => {
    // 带标记
    const marksSlider = document.getElementById('marks-slider');
    if (marksSlider) {
      marksSlider.marks = {
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: '100°C'
      };
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
}
</script>
