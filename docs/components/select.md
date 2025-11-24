# Select 选择器

下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## 代码演示

### 基础用法

基本使用。

<div class="demo-container">
  <ldesign-select id="basic-select" placeholder="请选择"></ldesign-select>
</div>


```html
<ldesign-select id="my-select"></ldesign-select>

<script>
  const select = document.getElementById('my-select');
  select.options = [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' },
    { value: '3', label: '选项3' }
  ];
  
  select.addEventListener('ldesignChange', (e) => {
    console.log('选中:', e.detail.value);
  });
</script>
```

### 禁用状态

禁用整个选择器或禁用某个选项。

<div class="demo-container">
  <ldesign-select id="disabled-select" disabled placeholder="禁用状态"></ldesign-select>
  <ldesign-select id="disabled-option-select" placeholder="部分选项禁用"></ldesign-select>
</div>


```html
<!-- 禁用整个选择器 -->
<ldesign-select disabled></ldesign-select>

<!-- 禁用某个选项 -->
<script>
  select.options = [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2', disabled: true }
  ];
</script>
```

### 可清空

设置 `clearable` 属性显示清空按钮。

<div class="demo-container">
  <ldesign-select id="clearable-select" clearable placeholder="可清空"></ldesign-select>
</div>


```html
<ldesign-select clearable></ldesign-select>
```

### 多选模式

设置 `multiple` 属性启用多选。

<div class="demo-container">
  <ldesign-select id="multiple-select" multiple placeholder="多选模式"></ldesign-select>
</div>


```html
<ldesign-select multiple></ldesign-select>

<script>
  select.addEventListener('ldesignChange', (e) => {
    console.log('选中多个:', e.detail.value); // ['1', '2']
  });
</script>
```

### 带图标的选项

选项可以包含图标。

<div class="demo-container">
  <ldesign-select id="icon-select" placeholder="选择图标"></ldesign-select>
</div>


```html
<script>
  select.options = [
    { value: 'home', label: '首页', icon: 'home' },
    { value: 'user', label: '用户', icon: 'user' }
  ];
</script>
```

### 限制标签数量

多选时可以限制显示的标签数量。

<div class="demo-container">
  <ldesign-select id="max-tag-select" multiple max-tag-count="2" placeholder="最多显示2个标签"></ldesign-select>
</div>


```html
<ldesign-select multiple max-tag-count="2"></ldesign-select>
```

### 自定义宽度

可以自定义下拉列表的宽度。

<div class="demo-container">
  <ldesign-select id="width-select" width="300" placeholder="自定义宽度"></ldesign-select>
</div>


```html
<ldesign-select width="300"></ldesign-select>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref([
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' }
]);

const handleChange = (e) => {
  value.value = e.detail.value;
  console.log('选中:', value.value);
};
</script>

<template>
  <ldesign-select
    :value="value"
    :options="options"
    clearable
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  const options = [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' },
    { value: '3', label: '选项3' }
  ];
  
  const handleChange = (e) => {
    setValue(e.detail.value);
  };
  
  return (
    <ldesign-select
      value={value}
      options={JSON.stringify(options)}
      clearable
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `options` | 选项数据 | `SelectOption[] \| string` | `[]` |
| `value` | 选中的值 | `string \| string[]` | - |
| `default-value` | 默认值 | `string \| string[]` | - |
| `multiple` | 是否多选 | `boolean` | `false` |
| `placeholder` | 占位文字 | `string` | `'请选择'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否可清空 | `boolean` | `false` |
| `max-tag-count` | 多选时最多显示标签数 | `number` | - |
| `max-height` | 下拉列表最大高度(px) | `number` | `240` |
| `width` | 下拉列表宽度 | `number \| string` | - |
| `placement` | 弹出位置 | `Placement` | `'bottom-start'` |
| `trigger` | 触发方式 | `'click' \| 'focus' \| 'manual'` | `'click'` |
| `theme` | 主题 | `'light' \| 'dark'` | `'light'` |
| `close-on-select` | 选中后是否关闭 | `boolean` | 单选true，多选false |

### SelectOption

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string;
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 选中值改变时触发 | `(event: CustomEvent<{ value, options }>) => void` |
| `ldesignVisibleChange` | 下拉框显示/隐藏时触发 | `(event: CustomEvent<boolean>) => void` |

## 相关组件

- [Input 输入框](./input.md)
- [Checkbox 多选框](./checkbox.md)
- [Radio 单选框](./radio.md)

<script>
if (typeof window !== 'undefined') {
  const initSelects = () => {
    // 基础用法
    const basicSelect = document.getElementById('basic-select');
    if (basicSelect) {
      basicSelect.options = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' }
      ];
    }
    
    // 禁用状态
    const disabledSelect = document.getElementById('disabled-select');
    if (disabledSelect) {
      disabledSelect.options = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ];
    }
    
    const disabledOptionSelect = document.getElementById('disabled-option-select');
    if (disabledOptionSelect) {
      disabledOptionSelect.options = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2（禁用）', disabled: true },
        { value: '3', label: '选项3' }
      ];
    }
    
    // 可清空
    const clearableSelect = document.getElementById('clearable-select');
    if (clearableSelect) {
      clearableSelect.options = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' }
      ];
      clearableSelect.value = '1';
    }
    
    // 多选模式
    const multipleSelect = document.getElementById('multiple-select');
    if (multipleSelect) {
      multipleSelect.options = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' },
        { value: '4', label: '选项4' },
        { value: '5', label: '选项5' }
      ];
    }
    
    // 带图标的选项
    const iconSelect = document.getElementById('icon-select');
    if (iconSelect) {
      iconSelect.options = [
        { value: 'home', label: '首页', icon: 'home' },
        { value: 'user', label: '用户', icon: 'user' },
        { value: 'setting', label: '设置', icon: 'settings' }
      ];
    }
    
    // 限制标签数量
    const maxTagSelect = document.getElementById('max-tag-select');
    if (maxTagSelect) {
      maxTagSelect.options = [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' },
        { value: '4', label: '选项4' },
        { value: '5', label: '选项5' }
      ];
      maxTagSelect.value = ['1', '2', '3'];
    }
    
    // 自定义宽度
    const widthSelect = document.getElementById('width-select');
    if (widthSelect) {
      widthSelect.options = [
        { value: '1', label: '这是一个很长很长的选项文字' },
        { value: '2', label: '选项2' }
      ];
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSelects);
  } else {
    initSelects();
  }
}
</script>
