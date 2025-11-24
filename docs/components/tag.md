# Tag 标签

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## 代码演示

### 基础用法

基本标签的用法。

<div class="demo-container">
  <ldesign-tag>Tag 1</ldesign-tag>
  <ldesign-tag>Tag 2</ldesign-tag>
  <ldesign-tag>Tag 3</ldesign-tag>
</div>

```html
<ldesign-tag>Tag</ldesign-tag>
```

### 不同颜色

多种预设颜色。

<div class="demo-container">
  <ldesign-tag color="default">Default</ldesign-tag>
  <ldesign-tag color="primary">Primary</ldesign-tag>
  <ldesign-tag color="success">Success</ldesign-tag>
  <ldesign-tag color="warning">Warning</ldesign-tag>
  <ldesign-tag color="danger">Danger</ldesign-tag>
  <ldesign-tag color="info">Info</ldesign-tag>
</div>

```html
<ldesign-tag color="primary">Primary</ldesign-tag>
<ldesign-tag color="success">Success</ldesign-tag>
<ldesign-tag color="danger">Danger</ldesign-tag>
```

### 可关闭

设置 `closable` 属性使标签可关闭。

<div class="demo-container">
  <ldesign-tag closable>可关闭标签</ldesign-tag>
</div>

```html
<ldesign-tag closable>可关闭</ldesign-tag>

<script>
  const tag = document.querySelector('ldesign-tag');
  tag.addEventListener('ldesignClose', () => {
    console.log('标签已关闭');
  });
</script>
```

### 不同尺寸

提供三种尺寸。

<div class="demo-container">
  <ldesign-tag size="small">Small</ldesign-tag>
  <ldesign-tag size="medium">Medium</ldesign-tag>
  <ldesign-tag size="large">Large</ldesign-tag>
</div>

```html
<ldesign-tag size="small">Small</ldesign-tag>
<ldesign-tag size="medium">Medium</ldesign-tag>
<ldesign-tag size="large">Large</ldesign-tag>
```

### 圆角

设置 `round` 属性使标签圆角。

<div class="demo-container">
  <ldesign-tag round>圆角标签</ldesign-tag>
  <ldesign-tag round color="primary">圆角标签</ldesign-tag>
</div>

```html
<ldesign-tag round>圆角标签</ldesign-tag>
```

### 带图标

标签可以带图标。

<div class="demo-container">
  <ldesign-tag icon="check" color="success">成功</ldesign-tag>
  <ldesign-tag icon="x" color="danger">错误</ldesign-tag>
  <ldesign-tag icon="info" color="info">信息</ldesign-tag>
</div>

```html
<ldesign-tag icon="check" color="success">成功</ldesign-tag>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const tags = ref(['标签1', '标签2', '标签3']);

const handleClose = (index) => {
  tags.value.splice(index, 1);
};
</script>

<template>
  <ldesign-tag
    v-for="(tag, index) in tags"
    :key="index"
    closable
    @ldesignClose="() => handleClose(index)"
  >
    {{ tag }}
  </ldesign-tag>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [tags, setTags] = useState(['标签1', '标签2', '标签3']);
  
  const handleClose = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  
  return (
    <>
      {tags.map((tag, index) => (
        <ldesign-tag
          key={index}
          closable
          onLdesignClose={() => handleClose(index)}
        >
          {tag}
        </ldesign-tag>
      ))}
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `color` | 标签颜色 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| `size` | 标签尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `closable` | 是否可关闭 | `boolean` | `false` |
| `round` | 是否圆角 | `boolean` | `false` |
| `icon` | 图标名称 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignClose` | 关闭时触发 | `() => void` |
| `ldesignClick` | 点击时触发 | `(event: CustomEvent<MouseEvent>) => void` |

## 相关组件

- [Badge 徽标](./badge.md)
