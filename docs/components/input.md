# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域包装。

## 何时使用

- 需要用户输入表单数据时
- 需要收集用户的文本信息时
- 提供组合型输入框，带搜索、前后缀等功能

## 代码演示

### 基础用法

最简单的输入框，支持双向数据绑定。

<div class="demo-container">
  <ldesign-input placeholder="请输入内容"></ldesign-input>
</div>

```html
<ldesign-input placeholder="请输入内容"></ldesign-input>

<script>
  const input = document.querySelector('ldesign-input');
  input.addEventListener('ldesignInput', (e) => {
    console.log('输入值:', e.detail);
  });
</script>
```

### 禁用与只读

<div class="demo-container">
  <ldesign-input value="禁用状态" disabled></ldesign-input>
  <ldesign-input value="只读状态" readonly></ldesign-input>
</div>

```html
<ldesign-input disabled></ldesign-input>
<ldesign-input readonly value="只读内容"></ldesign-input>
```

### 尺寸大小

<div class="demo-container">
  <ldesign-input size="small" placeholder="Small"></ldesign-input>
  <ldesign-input size="medium" placeholder="Medium"></ldesign-input>
  <ldesign-input size="large" placeholder="Large"></ldesign-input>
</div>

```html
<ldesign-input size="small"></ldesign-input>
<ldesign-input size="medium"></ldesign-input>
<ldesign-input size="large"></ldesign-input>
```

### 可清空

<div class="demo-container">
  <ldesign-input clearable placeholder="可清空" value="试试清空"></ldesign-input>
</div>

```html
<ldesign-input clearable></ldesign-input>
```

### 密码框

<div class="demo-container">
  <ldesign-input type="password" placeholder="密码"></ldesign-input>
  <ldesign-input type="password" show-password placeholder="可见密码"></ldesign-input>
</div>

```html
<ldesign-input type="password"></ldesign-input>
<ldesign-input type="password" show-password></ldesign-input>
```

### 带图标

<div class="demo-container">
  <ldesign-input prefix-icon="user" placeholder="用户名"></ldesign-input>
  <ldesign-input suffix-icon="search" placeholder="搜索"></ldesign-input>
</div>

```html
<ldesign-input prefix-icon="user"></ldesign-input>
<ldesign-input suffix-icon="search"></ldesign-input>
```

### 文本域

<div class="demo-container">
  <ldesign-input type="textarea" rows="4" placeholder="多行文本"></ldesign-input>
</div>

```html
<ldesign-input type="textarea" rows="4"></ldesign-input>
```

### 自适应高度

<div class="demo-container">
  <ldesign-input type="textarea" autosize placeholder="自动高度"></ldesign-input>
</div>

```html
<ldesign-input type="textarea" autosize></ldesign-input>
<ldesign-input type="textarea" autosize='{"minRows": 2, "maxRows": 4}'></ldesign-input>
```

### 字数统计

<div class="demo-container">
  <ldesign-input show-count maxlength="20" placeholder="最多20字"></ldesign-input>
  <ldesign-input type="textarea" show-count maxlength="100" rows="4"></ldesign-input>
</div>

```html
<ldesign-input show-count maxlength="20"></ldesign-input>
```

### 状态反馈

<div class="demo-container">
  <ldesign-input status="success" value="验证通过"></ldesign-input>
  <ldesign-input status="warning" value="需要注意"></ldesign-input>
  <ldesign-input status="error" value="验证失败"></ldesign-input>
</div>

```html
<ldesign-input status="success"></ldesign-input>
<ldesign-input status="warning"></ldesign-input>
<ldesign-input status="error"></ldesign-input>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <ldesign-input 
    v-model="value"
    clearable
    @ldesignInput="(e) => console.log(e.detail)"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  return (
    <ldesign-input 
      value={value}
      clearable
      onLdesignInput={(e) => setValue(e.detail)}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 输入框类型 | `'text' \| 'password' \| 'textarea' \| 'number' \| 'email' \| 'url' \| 'tel'` | `'text'` |
| `value` | 输入框的值 | `string` | `''` |
| `placeholder` | 占位文本 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读 | `boolean` | `false` |
| `clearable` | 是否显示清空按钮 | `boolean` | `false` |
| `show-password` | 是否显示密码切换按钮 | `boolean` | `false` |
| `size` | 输入框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `prefix-icon` | 前缀图标 | `string` | - |
| `suffix-icon` | 后缀图标 | `string` | - |
| `maxlength` | 最大输入长度 | `number` | - |
| `minlength` | 最小输入长度 | `number` | - |
| `autosize` | 自适应高度（textarea） | `boolean \| { minRows?: number; maxRows?: number }` | `false` |
| `rows` | 文本域行数 | `number` | `2` |
| `allow-input` | 输入限制 | `RegExp \| ((value: string) => boolean)` | - |
| `show-count` | 是否显示字数统计 | `boolean` | `false` |
| `status` | 验证状态 | `'error' \| 'warning' \| 'success'` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignInput` | 输入时触发 | `(event: CustomEvent<string>) => void` |
| `ldesignChange` | 值改变时触发 | `(event: CustomEvent<string>) => void` |
| `ldesignFocus` | 获得焦点时触发 | `(event: CustomEvent<FocusEvent>) => void` |
| `ldesignBlur` | 失去焦点时触发 | `(event: CustomEvent<FocusEvent>) => void` |
| `ldesignClear` | 点击清空按钮时触发 | `(event: CustomEvent<void>) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `prepend` | 输入框前置内容 |
| `append` | 输入框后置内容 |

## 相关组件

- [Form 表单](./form.md)
- [Select 选择器](./select.md)
- [InputNumber 数字输入框](./input-number.md)
