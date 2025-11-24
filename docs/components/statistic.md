# Statistic 统计数值

展示统计数值。

## 何时使用

- 当需要突出某个或某组数字时。
- 当需要展示带描述的统计类数据时使用。

## 代码演示

### 基础用法

简单的展示。

<div class="demo-container">
  <ldesign-statistic title="活跃用户" value="112893"></ldesign-statistic>
</div>

```html
<ldesign-statistic 
  title="活跃用户" 
  value="112893">
</ldesign-statistic>
```

### 带前缀和后缀

在数字前后添加前缀和后缀。

<div class="demo-container">
  <ldesign-statistic 
    title="账户余额" 
    value="112893"
    prefix="¥">
  </ldesign-statistic>
  
  <ldesign-statistic 
    title="增长率" 
    value="93"
    suffix="%">
  </ldesign-statistic>
</div>

```html
<ldesign-statistic 
  title="账户余额" 
  value="112893"
  prefix="¥">
</ldesign-statistic>

<ldesign-statistic 
  title="增长率" 
  value="93"
  suffix="%">
</ldesign-statistic>
```

### 设置数值精度

通过 `precision` 设置数值精度。

<div class="demo-container">
  <ldesign-statistic 
    title="准确率" 
    value="98.765"
    precision="2"
    suffix="%">
  </ldesign-statistic>
</div>

```html
<ldesign-statistic 
  value="98.765"
  precision="2"
  suffix="%">
</ldesign-statistic>
```

### 不同颜色

设置数值的颜色。

<div class="demo-container">
  <ldesign-statistic 
    title="增长" 
    value="11.28"
    value-style="color: #52c41a;"
    suffix="%">
  </ldesign-statistic>
  
  <ldesign-statistic 
    title="下降" 
    value="9.3"
    value-style="color: #cf1322;"
    suffix="%">
  </ldesign-statistic>
</div>

```html
<ldesign-statistic 
  value="11.28"
  value-style="color: #52c41a;"
  suffix="%">
</ldesign-statistic>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref(112893);
</script>

<template>
  <ldesign-statistic
    title="活跃用户"
    :value="value"
    prefix="👤"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value] = useState(112893);
  
  return (
    <ldesign-statistic
      title="活跃用户"
      value={value}
      prefix="👤"
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `title` | 数值的标题 | `string` | - |
| `value` | 数值内容 | `string \| number` | - |
| `precision` | 数值精度 | `number` | - |
| `prefix` | 设置数值的前缀 | `string` | - |
| `suffix` | 设置数值的后缀 | `string` | - |
| `value-style` | 设置数值的样式 | `string` | - |

## 相关组件

- [Progress 进度条](./progress.md)
- [Countdown 倒计时](./countdown.md)
