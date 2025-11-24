# Switch 开关

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时。
- 和 `checkbox` 的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-switch></ldesign-switch>
</div>

```html
<ldesign-switch></ldesign-switch>

<script>
  const switchEl = document.querySelector('ldesign-switch');
  switchEl.addEventListener('ldesignChange', (e) => {
    console.log('checked:', e.detail);
  });
</script>
```

### 禁用状态

开关不可用。

<div class="demo-container">
  <ldesign-switch disabled></ldesign-switch>
  <ldesign-switch checked disabled></ldesign-switch>
</div>

```html
<ldesign-switch disabled></ldesign-switch>
<ldesign-switch checked disabled></ldesign-switch>
```

### 文字和图标

带有文字和图标。

<div class="demo-container">
  <ldesign-switch checked-text="开" unchecked-text="关"></ldesign-switch>
</div>

```html
<ldesign-switch 
  checked-text="开" 
  unchecked-text="关">
</ldesign-switch>

<ldesign-switch 
  checked-icon="check" 
  unchecked-icon="x">
</ldesign-switch>
```

### 不同尺寸

提供三种尺寸。

<div class="demo-container">
  <ldesign-switch size="small"></ldesign-switch>
  <ldesign-switch size="medium"></ldesign-switch>
  <ldesign-switch size="large"></ldesign-switch>
</div>

```html
<ldesign-switch size="small"></ldesign-switch>
<ldesign-switch size="medium"></ldesign-switch>
<ldesign-switch size="large"></ldesign-switch>
```

### 加载中

标识开关操作仍在执行中。

<div class="demo-container">
  <ldesign-switch loading></ldesign-switch>
  <ldesign-switch checked loading></ldesign-switch>
</div>

```html
<ldesign-switch loading></ldesign-switch>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const checked = ref(false);

const handleChange = (e) => {
  console.log('checked:', e.detail);
};
</script>

<template>
  <ldesign-switch 
    :checked="checked"
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);
  
  return (
    <ldesign-switch
      checked={checked}
      onLdesignChange={(e) => setChecked(e.detail)}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `checked` | 是否选中 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 加载中状态 | `boolean` | `false` |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `checked-text` | 选中时的文字 | `string` | - |
| `unchecked-text` | 未选中时的文字 | `string` | - |
| `checked-icon` | 选中时的图标 | `string` | - |
| `unchecked-icon` | 未选中时的图标 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 状态改变时触发 | `(event: CustomEvent<boolean>) => void` |

## 相关组件

- [Checkbox 多选框](./checkbox.md)
- [Radio 单选框](./radio.md)
- [Form 表单](./form.md)
