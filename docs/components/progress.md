# Progress 进度条

展示操作的当前进度。

## 何时使用

- 在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。
- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时。
- 当需要显示一个操作完成的百分比时。

## 代码演示

### 基础用法

标准的进度条。

<div class="demo-container">
  <ldesign-progress percent="30"></ldesign-progress>
  <ldesign-progress percent="50"></ldesign-progress>
  <ldesign-progress percent="70"></ldesign-progress>
  <ldesign-progress percent="100"></ldesign-progress>
</div>

```html
<ldesign-progress percent="30"></ldesign-progress>
<ldesign-progress percent="50"></ldesign-progress>
<ldesign-progress percent="100"></ldesign-progress>
```

### 进度条状态

通过 `status` 属性设置进度条状态。

<div class="demo-container">
  <ldesign-progress percent="30" status="active"></ldesign-progress>
  <ldesign-progress percent="50" status="normal"></ldesign-progress>
  <ldesign-progress percent="70" status="exception"></ldesign-progress>
  <ldesign-progress percent="100" status="success"></ldesign-progress>
</div>

```html
<ldesign-progress percent="30" status="active"></ldesign-progress>
<ldesign-progress percent="70" status="exception"></ldesign-progress>
<ldesign-progress percent="100" status="success"></ldesign-progress>
```

### 圆形进度条

圆形的进度。

<div class="demo-container">
  <ldesign-progress type="circle" percent="25"></ldesign-progress>
  <ldesign-progress type="circle" percent="50"></ldesign-progress>
  <ldesign-progress type="circle" percent="75"></ldesign-progress>
  <ldesign-progress type="circle" percent="100" status="success"></ldesign-progress>
</div>

```html
<ldesign-progress type="circle" percent="75"></ldesign-progress>
<ldesign-progress type="circle" percent="100" status="success"></ldesign-progress>
```

### 仪表盘

仪表盘样式的进度条。

<div class="demo-container">
  <ldesign-progress type="dashboard" percent="75"></ldesign-progress>
</div>

```html
<ldesign-progress type="dashboard" percent="75"></ldesign-progress>
```

### 动态展示

动态增加或减少进度。

<div class="demo-container">
  <ldesign-progress id="dynamic-progress" percent="0"></ldesign-progress>
  <div style="margin-top: 16px;">
    <ldesign-button id="minus-btn" size="small">-</ldesign-button>
    <ldesign-button id="plus-btn" size="small">+</ldesign-button>
  </div>
</div>


```html
<ldesign-progress id="progress" percent="0"></ldesign-progress>

<script>
  let percent = 0;
  const progress = document.getElementById('progress');
  
  function increase() {
    percent = Math.min(100, percent + 10);
    progress.percent = percent;
  }
  
  function decrease() {
    percent = Math.max(0, percent - 10);
    progress.percent = percent;
  }
</script>
```

### 不同尺寸

提供三种尺寸。

<div class="demo-container">
  <ldesign-progress size="small" percent="30"></ldesign-progress>
  <ldesign-progress size="default" percent="50"></ldesign-progress>
  <ldesign-progress size="large" percent="70"></ldesign-progress>
</div>

```html
<ldesign-progress size="small" percent="30"></ldesign-progress>
<ldesign-progress size="default" percent="50"></ldesign-progress>
<ldesign-progress size="large" percent="70"></ldesign-progress>
```

### 自定义文字格式

通过 `format` 属性自定义文字内容。

<div class="demo-container">
  <ldesign-progress id="custom-format" percent="75"></ldesign-progress>
</div>


```html
<ldesign-progress id="progress" percent="75"></ldesign-progress>

<script>
  const progress = document.getElementById('progress');
  progress.format = (percent) => `${percent}%`;
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const percent = ref(0);

const increase = () => {
  percent.value = Math.min(100, percent.value + 10);
};

const decrease = () => {
  percent.value = Math.max(0, percent.value - 10);
};
</script>

<template>
  <ldesign-progress :percent="percent" />
  
  <ldesign-button @ldesignClick="decrease">-</ldesign-button>
  <ldesign-button @ldesignClick="increase">+</ldesign-button>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [percent, setPercent] = useState(0);
  
  const increase = () => {
    setPercent(Math.min(100, percent + 10));
  };
  
  const decrease = () => {
    setPercent(Math.max(0, percent - 10));
  };
  
  return (
    <>
      <ldesign-progress percent={percent} />
      
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
| `percent` | 百分比 | `number` | `0` |
| `type` | 类型 | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| `status` | 状态 | `'normal' \| 'active' \| 'success' \| 'exception'` | `'normal'` |
| `size` | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| `stroke-width` | 进度条线的宽度 | `number` | `8` |
| `show-info` | 是否显示进度数值或状态图标 | `boolean` | `true` |
| `format` | 内容的模板函数 | `(percent: number) => string` | - |

## 相关组件

- [Spin 加载中](./spin.md)
- [Skeleton 骨架屏](./skeleton.md)

<script>
if (typeof window !== 'undefined') {
  const initProgress = () => {
    // 动态展示
    let percent = 0;
    const progress = document.getElementById('dynamic-progress');
    const minusBtn = document.getElementById('minus-btn');
    const plusBtn = document.getElementById('plus-btn');
    
    if (minusBtn && plusBtn && progress) {
      minusBtn.addEventListener('ldesignClick', () => {
        percent = Math.max(0, percent - 10);
        progress.percent = percent;
      });
      
      plusBtn.addEventListener('ldesignClick', () => {
        percent = Math.min(100, percent + 10);
        progress.percent = percent;
      });
    }
    
    // 自定义文字格式
    const customProgress = document.getElementById('custom-format');
    if (customProgress) {
      customProgress.format = (percent) => `${percent} Days`;
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgress);
  } else {
    initProgress();
  }
}
</script>
