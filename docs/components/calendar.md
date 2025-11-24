# Calendar 日历

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-calendar></ldesign-calendar>
</div>

```html
<ldesign-calendar></ldesign-calendar>

<script>
  const calendar = document.querySelector('ldesign-calendar');
  calendar.addEventListener('ldesignSelect', (e) => {
    console.log('选中日期:', e.detail);
  });
</script>
```

### 卡片模式

用于嵌套在空间有限的容器中。

<div class="demo-container">
  <ldesign-calendar fullscreen="false"></ldesign-calendar>
</div>

```html
<ldesign-calendar fullscreen="false"></ldesign-calendar>
```

### 自定义日期单元格

使用 `dateCell` 可以自定义日期单元格的内容。

```html
<ldesign-calendar id="calendar"></ldesign-calendar>

<script>
  const calendar = document.getElementById('calendar');
  calendar.dateCell = (date) => {
    // 返回自定义内容
    return `<div>${date.getDate()}</div>`;
  };
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const selectedDate = ref(new Date());

const onSelect = (date) => {
  selectedDate.value = date;
  console.log('选中:', date);
};
</script>

<template>
  <ldesign-calendar
    :value="selectedDate"
    @ldesignSelect="onSelect"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const onSelect = (e) => {
    setSelectedDate(e.detail);
    console.log('选中:', e.detail);
  };
  
  return (
    <ldesign-calendar
      value={selectedDate}
      onLdesignSelect={onSelect}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 当前选中的日期 | `Date \| string` | 当前日期 |
| `fullscreen` | 是否全屏显示 | `boolean` | `true` |
| `mode` | 显示模式 | `'month' \| 'year'` | `'month'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignSelect` | 点击选择日期时触发 | `(event: CustomEvent<Date>) => void` |
| `ldesignPanelChange` | 日期面板变化时触发 | `(event: CustomEvent) => void` |

## 相关组件

- [DatePicker 日期选择器](./date-picker.md)
