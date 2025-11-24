# DatePicker 日期选择器

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 代码演示

### 基础用法

最简单的用法，在浮层中可以选择日期。

<div class="demo-container">
  <ldesign-date-picker placeholder="选择日期"></ldesign-date-picker>
</div>

```html
<ldesign-date-picker placeholder="选择日期"></ldesign-date-picker>

<script>
  const datePicker = document.querySelector('ldesign-date-picker');
  datePicker.addEventListener('ldesignChange', (e) => {
    console.log('选中日期:', e.detail);
  });
</script>
```

### 日期范围

通过设置 `type` 为 `daterange` 可以选择日期范围。

<div class="demo-container">
  <ldesign-date-picker type="daterange" placeholder="选择日期范围"></ldesign-date-picker>
</div>

```html
<ldesign-date-picker 
  type="daterange"
  placeholder="选择日期范围">
</ldesign-date-picker>
```

### 日期时间选择

增加选择时间功能。

<div class="demo-container">
  <ldesign-date-picker show-time placeholder="选择日期时间"></ldesign-date-picker>
</div>

```html
<ldesign-date-picker show-time></ldesign-date-picker>
```

### 禁用日期

可以使用 `disabled-date` 禁用某些日期。

```html
<ldesign-date-picker id="date-picker"></ldesign-date-picker>

<script>
  const datePicker = document.getElementById('date-picker');
  datePicker.disabledDate = (date) => {
    // 禁用今天之前的日期
    return date < new Date();
  };
</script>
```

### 不同尺寸

三种大小的输入框。

<div class="demo-container">
  <ldesign-date-picker size="small"></ldesign-date-picker>
  <ldesign-date-picker size="medium"></ldesign-date-picker>
  <ldesign-date-picker size="large"></ldesign-date-picker>
</div>

```html
<ldesign-date-picker size="small"></ldesign-date-picker>
<ldesign-date-picker size="medium"></ldesign-date-picker>
<ldesign-date-picker size="large"></ldesign-date-picker>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const date = ref(new Date());

const handleChange = (value) => {
  date.value = value;
  console.log('选中:', value);
};
</script>

<template>
  <ldesign-date-picker
    v-model="date"
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [date, setDate] = useState(new Date());
  
  const handleChange = (e) => {
    setDate(e.detail);
    console.log('选中:', e.detail);
  };
  
  return (
    <ldesign-date-picker
      value={date}
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 日期 | `Date \| string` | - |
| `type` | 选择器类型 | `'date' \| 'daterange' \| 'datetime' \| 'datetimerange'` | `'date'` |
| `placeholder` | 占位内容 | `string` | `'请选择日期'` |
| `format` | 展示的日期格式 | `string` | `'YYYY-MM-DD'` |
| `show-time` | 增加时间选择功能 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否显示清除按钮 | `boolean` | `true` |
| `size` | 输入框大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 日期变化时触发 | `(event: CustomEvent<Date>) => void` |
| `ldesignOpenChange` | 弹出/关闭日历面板时触发 | `(event: CustomEvent<boolean>) => void` |

## 相关组件

- [TimePicker 时间选择器](./time-picker.md)
- [Calendar 日历](./calendar.md)
