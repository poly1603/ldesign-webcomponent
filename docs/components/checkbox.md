# Checkbox 多选框

在一组可选项中进行多项选择。

## 何时使用

- 在一组可选项中进行多项选择时。
- 单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。

## 代码演示

### 基础用法

简单的 checkbox。

<div class="demo-container">
  <ldesign-checkbox>Checkbox</ldesign-checkbox>
</div>

```html
<ldesign-checkbox>Checkbox</ldesign-checkbox>

<script>
  const checkbox = document.querySelector('ldesign-checkbox');
  checkbox.addEventListener('ldesignChange', (e) => {
    console.log('checked:', e.detail);
  });
</script>
```

### 禁用状态

checkbox 不可用。

<div class="demo-container">
  <ldesign-checkbox disabled>禁用</ldesign-checkbox>
  <ldesign-checkbox checked disabled>禁用且选中</ldesign-checkbox>
</div>

```html
<ldesign-checkbox disabled>禁用</ldesign-checkbox>
<ldesign-checkbox checked disabled>禁用且选中</ldesign-checkbox>
```

### 半选状态

indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。

<div class="demo-container">
  <ldesign-checkbox indeterminate>半选状态</ldesign-checkbox>
</div>

```html
<ldesign-checkbox indeterminate>半选状态</ldesign-checkbox>
```

### 多选框组

适用于多个勾选框绑定到同一个数组的情形，通过是否勾选来表示这一组选项中选中的项。

<div class="demo-container">
  <ldesign-checkbox-group id="checkbox-group">
    <ldesign-checkbox value="1">选项1</ldesign-checkbox>
    <ldesign-checkbox value="2">选项2</ldesign-checkbox>
    <ldesign-checkbox value="3">选项3</ldesign-checkbox>
  </ldesign-checkbox-group>
</div>

```html
<ldesign-checkbox-group id="group">
  <ldesign-checkbox value="1">选项1</ldesign-checkbox>
  <ldesign-checkbox value="2">选项2</ldesign-checkbox>
  <ldesign-checkbox value="3">选项3</ldesign-checkbox>
</ldesign-checkbox-group>

<script>
  const group = document.getElementById('group');
  group.addEventListener('ldesignChange', (e) => {
    console.log('选中值:', e.detail); // ['1', '2']
  });
</script>
```

### 按钮样式

按钮样式的多选组合。

<div class="demo-container">
  <ldesign-checkbox variant="button">Button 1</ldesign-checkbox>
  <ldesign-checkbox variant="button">Button 2</ldesign-checkbox>
  <ldesign-checkbox variant="button">Button 3</ldesign-checkbox>
</div>

```html
<ldesign-checkbox variant="button">Button</ldesign-checkbox>
```

### 不同尺寸

提供三种尺寸。

<div class="demo-container">
  <ldesign-checkbox size="small">Small</ldesign-checkbox>
  <ldesign-checkbox size="medium">Medium</ldesign-checkbox>
  <ldesign-checkbox size="large">Large</ldesign-checkbox>
</div>

```html
<ldesign-checkbox size="small">Small</ldesign-checkbox>
<ldesign-checkbox size="medium">Medium</ldesign-checkbox>
<ldesign-checkbox size="large">Large</ldesign-checkbox>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const checked = ref(false);
const checkList = ref(['1']);

const handleChange = (e) => {
  console.log('checked:', e.detail);
};
</script>

<template>
  <ldesign-checkbox 
    :checked="checked"
    @ldesignChange="handleChange"
  >
    单个复选框
  </ldesign-checkbox>
  
  <ldesign-checkbox-group :value="checkList">
    <ldesign-checkbox value="1">选项1</ldesign-checkbox>
    <ldesign-checkbox value="2">选项2</ldesign-checkbox>
    <ldesign-checkbox value="3">选项3</ldesign-checkbox>
  </ldesign-checkbox-group>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);
  const [checkList, setCheckList] = useState(['1']);
  
  return (
    <>
      <ldesign-checkbox
        checked={checked}
        onLdesignChange={(e) => setChecked(e.detail)}
      >
        单个复选框
      </ldesign-checkbox>
      
      <ldesign-checkbox-group
        value={checkList}
        onLdesignChange={(e) => setCheckList(e.detail)}
      >
        <ldesign-checkbox value="1">选项1</ldesign-checkbox>
        <ldesign-checkbox value="2">选项2</ldesign-checkbox>
      </ldesign-checkbox-group>
    </>
  );
}
```

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `checked` | 是否选中 | `boolean` | `false` |
| `value` | 选中状态的值 | `string \| number` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `indeterminate` | 半选状态 | `boolean` | `false` |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `variant` | 外观变体 | `'default' \| 'outline' \| 'filled' \| 'button'` | `'default'` |
| `shape` | 形状 | `'square' \| 'round'` | `'square'` |
| `label-placement` | 标签位置 | `'left' \| 'right'` | `'right'` |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 状态改变时触发 | `(event: CustomEvent<boolean>) => void` |

### CheckboxGroup Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 选中项的值 | `string[] \| number[]` | `[]` |
| `disabled` | 是否禁用 | `boolean` | `false` |

### CheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 选中值改变时触发 | `(event: CustomEvent<(string \| number)[]>) => void` |

## 相关组件

- [Radio 单选框](./radio.md)
- [Switch 开关](./switch.md)
- [Form 表单](./form.md)
