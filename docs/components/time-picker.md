# TimePicker 时间选择器

输入或选择时间的控件。

## 何时使用

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-time-picker placeholder="选择时间"></ldesign-time-picker>
</div>

```html
<ldesign-time-picker placeholder="选择时间"></ldesign-time-picker>

<script>
  const timePicker = document.querySelector('ldesign-time-picker');
  timePicker.addEventListener('ldesignChange', (e) => {
    console.log('选中时间:', e.detail);
  });
</script>
```

### 时间范围

选择时间范围。

<div class="demo-container">
  <ldesign-time-picker type="timerange" placeholder="选择时间范围"></ldesign-time-picker>
</div>

```html
<ldesign-time-picker 
  type="timerange"
  placeholder="选择时间范围">
</ldesign-time-picker>
```

### 不同尺寸

三种大小的输入框。

<div class="demo-container">
  <ldesign-time-picker size="small"></ldesign-time-picker>
  <ldesign-time-picker size="medium"></ldesign-time-picker>
  <ldesign-time-picker size="large"></ldesign-time-picker>
</div>

```html
<ldesign-time-picker size="small"></ldesign-time-picker>
<ldesign-time-picker size="medium"></ldesign-time-picker>
<ldesign-time-picker size="large"></ldesign-time-picker>
```

### 步长

可以使用 `step` 设置步长。

<div class="demo-container">
  <ldesign-time-picker step="00:15:00" placeholder="15分钟步长"></ldesign-time-picker>
</div>

```html
<ldesign-time-picker step="00:15:00"></ldesign-time-picker>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const time = ref('');

const handleChange = (value) => {
  time.value = value;
  console.log('选中时间:', value);
};
</script>

<template>
  <ldesign-time-picker
    v-model="time"
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [time, setTime] = useState('');
  
  const handleChange = (e) => {
    setTime(e.detail);
    console.log('选中时间:', e.detail);
  };
  
  return (
    <ldesign-time-picker
      value={time}
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 时间 | `string` | - |
| `type` | 选择器类型 | `'time' \| 'timerange'` | `'time'` |
| `placeholder` | 占位内容 | `string` | `'请选择时间'` |
| `format` | 展示的时间格式 | `string` | `'HH:mm:ss'` |
| `step` | 时间间隔步长 | `string` | `'00:01:00'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否显示清除按钮 | `boolean` | `true` |
| `size` | 输入框大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 时间变化时触发 | `(event: CustomEvent<string>) => void` |
| `ldesignOpenChange` | 面板打开/关闭时触发 | `(event: CustomEvent<boolean>) => void` |

## 相关组件

- [DatePicker 日期选择器](./date-picker.md)
