# Countdown 倒计时

展示倒计时数值。

## 何时使用

- 当需要展示倒计时数值时。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-countdown id="basic-countdown" value="2024-12-31 23:59:59"></ldesign-countdown>
</div>

```html
<ldesign-countdown value="2024-12-31 23:59:59"></ldesign-countdown>
```

### 毫秒级渲染

通过 `format` 属性设置时间格式。

<div class="demo-container">
  <ldesign-countdown value="2024-12-31 23:59:59" format="HH:mm:ss:SSS"></ldesign-countdown>
</div>

```html
<ldesign-countdown 
  value="2024-12-31 23:59:59"
  format="HH:mm:ss:SSS">
</ldesign-countdown>
```

### 自定义格式

通过 `format` 属性自定义时间格式。

<div class="demo-container">
  <ldesign-countdown value="2024-12-31 23:59:59" format="D 天 H 时 m 分 s 秒"></ldesign-countdown>
</div>

```html
<ldesign-countdown 
  format="D 天 H 时 m 分 s 秒">
</ldesign-countdown>
```

### 倒计时完成回调

倒计时完成时触发事件。

```html
<ldesign-countdown id="countdown" value="2024-01-01 00:00:00"></ldesign-countdown>

<script>
  const countdown = document.getElementById('countdown');
  countdown.addEventListener('ldesignFinish', () => {
    console.log('倒计时结束！');
  });
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const deadline = ref(Date.now() + 1000 * 60 * 60 * 24 * 2);

const onFinish = () => {
  console.log('倒计时结束！');
};
</script>

<template>
  <ldesign-countdown
    :value="deadline"
    format="D 天 H 时 m 分 s 秒"
    @ldesignFinish="onFinish"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [deadline] = useState(Date.now() + 1000 * 60 * 60 * 24 * 2);
  
  const onFinish = () => {
    console.log('倒计时结束！');
  };
  
  return (
    <ldesign-countdown
      value={deadline}
      format="D 天 H 时 m 分 s 秒"
      onLdesignFinish={onFinish}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 倒计时目标时间 | `string \| number` | - |
| `format` | 格式化倒计时展示 | `string` | `'HH:mm:ss'` |
| `prefix` | 设置数值的前缀 | `string` | - |
| `suffix` | 设置数值的后缀 | `string` | - |
| `title` | 倒计时标题 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignFinish` | 倒计时完成时触发 | `() => void` |

## 相关组件

- [Statistic 统计数值](./statistic.md)
