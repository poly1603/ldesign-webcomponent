# Mention 提及

提及组件。

## 何时使用

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-mention id="basic-mention" placeholder="输入 @ 提及他人"></ldesign-mention>
</div>


```html
<ldesign-mention id="mention" placeholder="输入 @ 提及他人"></ldesign-mention>

<script>
  const mention = document.getElementById('mention');
  mention.options = [
    { value: 'user1', label: '用户1' },
    { value: 'user2', label: '用户2' }
  ];
  
  mention.addEventListener('ldesignSelect', (e) => {
    console.log('选中:', e.detail);
  });
</script>
```

### 自定义触发字符

自定义触发字符。

<div class="demo-container">
  <ldesign-mention id="custom-mention" prefix="#" placeholder="输入 # 提及话题"></ldesign-mention>
</div>


```html
<ldesign-mention prefix="#" placeholder="输入 # 提及话题"></ldesign-mention>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref('');

const options = [
  { value: 'afc163', label: '阿福' },
  { value: 'zombiej', label: '张三' },
  { value: 'yesmeck', label: '李四' }
];

const handleSelect = (item) => {
  console.log('选中:', item);
};
</script>

<template>
  <ldesign-mention
    v-model="value"
    :options="options"
    @ldesignSelect="handleSelect"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'afc163', label: '阿福' },
    { value: 'zombiej', label: '张三' }
  ];
  
  const handleSelect = (e) => {
    console.log('选中:', e.detail);
  };
  
  return (
    <ldesign-mention
      value={value}
      options={JSON.stringify(options)}
      onLdesignSelect={handleSelect}
      onLdesignInput={(e) => setValue(e.detail)}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 输入框内容 | `string` | - |
| `options` | 建议选项 | `MentionOption[]` | `[]` |
| `prefix` | 触发弹出的字符 | `string` | `'@'` |
| `placeholder` | 占位文本 | `string` | - |

### MentionOption

```typescript
interface MentionOption {
  value: string;
  label: string;
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignSelect` | 选中选项时触发 | `(event: CustomEvent) => void` |
| `ldesignInput` | 输入时触发 | `(event: CustomEvent<string>) => void` |

## 相关组件

- [Input 输入框](./input.md)
- [Select 选择器](./select.md)

<script>
if (typeof window !== 'undefined') {
  const initMention = () => {
    // 基础用法
    const basicMention = document.getElementById('basic-mention');
    if (basicMention) {
      basicMention.options = [
        { value: 'afc163', label: '阿福' },
        { value: 'zombiej', label: '张三' },
        { value: 'yesmeck', label: '李四' }
      ];
    }
    
    // 自定义触发字符
    const customMention = document.getElementById('custom-mention');
    if (customMention) {
      customMention.options = [
        { value: 'topic1', label: '话题1' },
        { value: 'topic2', label: '话题2' }
      ];
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMention);
  } else {
    initMention();
  }
}
</script>
