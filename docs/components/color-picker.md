# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 何时使用

当用户需要自定义颜色选择时。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-color-picker value="#1890ff"></ldesign-color-picker>
</div>

```html
<ldesign-color-picker value="#1890ff"></ldesign-color-picker>

<script>
  const colorPicker = document.querySelector('ldesign-color-picker');
  colorPicker.addEventListener('ldesignChange', (e) => {
    console.log('颜色:', e.detail);
  });
</script>
```

### 不同尺寸

提供三种尺寸。

<div class="demo-container">
  <ldesign-color-picker size="small" value="#1890ff"></ldesign-color-picker>
  <ldesign-color-picker size="medium" value="#52c41a"></ldesign-color-picker>
  <ldesign-color-picker size="large" value="#faad14"></ldesign-color-picker>
</div>

```html
<ldesign-color-picker size="small"></ldesign-color-picker>
<ldesign-color-picker size="medium"></ldesign-color-picker>
<ldesign-color-picker size="large"></ldesign-color-picker>
```

### 预设颜色

推荐的颜色预设。

<div class="demo-container">
  <ldesign-color-picker id="preset-color-picker" value="#1890ff"></ldesign-color-picker>
</div>


```html
<ldesign-color-picker id="picker"></ldesign-color-picker>

<script>
  const picker = document.getElementById('picker');
  picker.presets = ['#1890ff', '#52c41a', '#faad14', '#f5222d'];
</script>
```

### 透明度

支持选择带透明度的颜色。

<div class="demo-container">
  <ldesign-color-picker show-alpha value="rgba(24, 144, 255, 0.5)"></ldesign-color-picker>
</div>

```html
<ldesign-color-picker show-alpha></ldesign-color-picker>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const color = ref('#1890ff');

const handleChange = (value) => {
  color.value = value;
  console.log('选中颜色:', value);
};
</script>

<template>
  <ldesign-color-picker
    v-model="color"
    show-alpha
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [color, setColor] = useState('#1890ff');
  
  const handleChange = (e) => {
    setColor(e.detail);
    console.log('选中颜色:', e.detail);
  };
  
  return (
    <ldesign-color-picker
      value={color}
      show-alpha
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 绑定值 | `string` | - |
| `show-alpha` | 是否支持透明度选择 | `boolean` | `false` |
| `presets` | 预定义颜色 | `string[]` | - |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `disabled` | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 颜色值改变时触发 | `(event: CustomEvent<string>) => void` |

## 相关组件

- [Input 输入框](./input.md)

<script>
if (typeof window !== 'undefined') {
  const initColorPicker = () => {
    // 预设颜色
    const presetPicker = document.getElementById('preset-color-picker');
    if (presetPicker) {
      presetPicker.presets = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColorPicker);
  } else {
    initColorPicker();
  }
}
</script>
