# Radio 单选框

在一组备选项中进行单选。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-radio-group id="basic-radio">
    <ldesign-radio value="1">选项1</ldesign-radio>
    <ldesign-radio value="2">选项2</ldesign-radio>
    <ldesign-radio value="3">选项3</ldesign-radio>
  </ldesign-radio-group>
</div>

```html
<ldesign-radio-group id="radio-group">
  <ldesign-radio value="1">选项1</ldesign-radio>
  <ldesign-radio value="2">选项2</ldesign-radio>
</ldesign-radio-group>

<script>
  const group = document.getElementById('radio-group');
  group.addEventListener('ldesignChange', (e) => {
    console.log('选中:', e.detail);
  });
</script>
```

### 禁用状态

单选框不可用。

<div class="demo-container">
  <ldesign-radio disabled>禁用</ldesign-radio>
  <ldesign-radio checked disabled>禁用且选中</ldesign-radio>
</div>

```html
<ldesign-radio disabled>禁用</ldesign-radio>
<ldesign-radio checked disabled>禁用且选中</ldesign-radio>
```

### 按钮样式

按钮样式的单选组合。

<div class="demo-container">
  <ldesign-radio-group id="button-radio">
    <ldesign-radio value="1" variant="button">Button 1</ldesign-radio>
    <ldesign-radio value="2" variant="button">Button 2</ldesign-radio>
    <ldesign-radio value="3" variant="button">Button 3</ldesign-radio>
  </ldesign-radio-group>
</div>

```html
<ldesign-radio-group>
  <ldesign-radio variant="button">Button 1</ldesign-radio>
  <ldesign-radio variant="button">Button 2</ldesign-radio>
</ldesign-radio-group>
```

### 不同尺寸

提供三种尺寸。

<div class="demo-container">
  <ldesign-radio size="small">Small</ldesign-radio>
  <ldesign-radio size="medium">Medium</ldesign-radio>
  <ldesign-radio size="large">Large</ldesign-radio>
</div>

```html
<ldesign-radio size="small">Small</ldesign-radio>
<ldesign-radio size="medium">Medium</ldesign-radio>
<ldesign-radio size="large">Large</ldesign-radio>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref('1');

const handleChange = (e) => {
  console.log('选中:', e.detail);
};
</script>

<template>
  <ldesign-radio-group 
    :value="value"
    @ldesignChange="handleChange"
  >
    <ldesign-radio value="1">选项1</ldesign-radio>
    <ldesign-radio value="2">选项2</ldesign-radio>
    <ldesign-radio value="3">选项3</ldesign-radio>
  </ldesign-radio-group>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('1');
  
  return (
    <ldesign-radio-group
      value={value}
      onLdesignChange={(e) => setValue(e.detail)}
    >
      <ldesign-radio value="1">选项1</ldesign-radio>
      <ldesign-radio value="2">选项2</ldesign-radio>
      <ldesign-radio value="3">选项3</ldesign-radio>
    </ldesign-radio-group>
  );
}
```

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `checked` | 是否选中 | `boolean` | `false` |
| `value` | 选中状态的值 | `string \| number` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `variant` | 外观变体 | `'default' \| 'button'` | `'default'` |

### Radio Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 状态改变时触发 | `(event: CustomEvent<boolean>) => void` |

### RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 选中项的值 | `string \| number` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |

### RadioGroup Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 选中值改变时触发 | `(event: CustomEvent<string \| number>) => void` |

## 相关组件

- [Checkbox 多选框](./checkbox.md)
- [Select 选择器](./select.md)
- [Form 表单](./form.md)
