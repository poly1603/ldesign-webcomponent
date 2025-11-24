# Ellipsis 文本省略

文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取。

## 何时使用

- 当文本过长时，自动省略溢出部分。
- 支持展开/收起。

## 代码演示

### 基础用法

简单的文本省略。

<div class="demo-container">
  <ldesign-ellipsis content="这是一段很长很长很长很长很长很长很长很长很长很长很长很长的文字内容，需要进行省略处理。"></ldesign-ellipsis>
</div>

```html
<ldesign-ellipsis content="这是一段很长的文字..."></ldesign-ellipsis>
```

### 限制行数

通过 `rows` 属性限制显示行数。

<div class="demo-container">
  <ldesign-ellipsis 
    rows="2"
    content="这是第一行内容。这是第二行内容。这是第三行内容会被省略。这是第四行内容也会被省略。">
  </ldesign-ellipsis>
</div>

```html
<ldesign-ellipsis rows="2" content="很长的多行文本..."></ldesign-ellipsis>
```

### 可展开

添加展开/收起功能。

<div class="demo-container">
  <ldesign-ellipsis 
    expandable
    rows="2"
    content="这是一段很长的文本内容。这是一段很长的文本内容。这是一段很长的文本内容。这是一段很长的文本内容。这是一段很长的文本内容。">
  </ldesign-ellipsis>
</div>

```html
<ldesign-ellipsis 
  expandable
  rows="3"
  content="长文本...">
</ldesign-ellipsis>
```

### 自定义省略文本

自定义省略符号。

<div class="demo-container">
  <ldesign-ellipsis 
    suffix="...更多"
    content="这是一段需要自定义省略文本的长内容。">
  </ldesign-ellipsis>
</div>

```html
<ldesign-ellipsis 
  suffix="...更多"
  content="长文本...">
</ldesign-ellipsis>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const content = ref('这是一段很长的文本内容...');
const expanded = ref(false);
</script>

<template>
  <ldesign-ellipsis
    :content="content"
    :rows="3"
    expandable
    :expanded="expanded"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [content] = useState('这是一段很长的文本内容...');
  const [expanded, setExpanded] = useState(false);
  
  return (
    <ldesign-ellipsis
      content={content}
      rows={3}
      expandable
      expanded={expanded}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `content` | 文本内容 | `string` | - |
| `rows` | 最多显示的行数 | `number` | `1` |
| `expandable` | 是否可展开 | `boolean` | `false` |
| `suffix` | 自定义省略符号 | `string` | `'...'` |
| `expanded` | 是否展开 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignExpand` | 展开/收起时触发 | `(event: CustomEvent<boolean>) => void` |

## 相关组件

- [Typography 排版](./typography.md)
