# Tour 漫游式引导

用于分步引导用户了解产品功能的气泡组件。

## 何时使用

常用于引导用户了解产品功能。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-button id="tour-start-btn">开始引导</ldesign-button>
  
  <ldesign-tour id="basic-tour"></ldesign-tour>
</div>

<script>
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
  const tour = document.getElementById('basic-tour')
  const btn = document.getElementById('tour-start-btn')
  
  if (tour && btn) {
    tour.steps = [
      {
        target: '#tour-start-btn',
        title: '第一步',
        description: '这是引导的第一步'
      }
    ]
    
    btn.addEventListener('ldesignClick', () => {
      tour.open = true
    })
  }
  })
}
</script>

```html
<ldesign-button id="start-btn">开始引导</ldesign-button>

<ldesign-tour id="tour"></ldesign-tour>

<script>
  const tour = document.getElementById('tour');
  const btn = document.getElementById('start-btn');
  
  tour.steps = [
    {
      target: '#element1',
      title: '标题1',
      description: '这是第一步'
    },
    {
      target: '#element2',
      title: '标题2',
      description: '这是第二步'
    }
  ];
  
  btn.addEventListener('click', () => {
    tour.open = true;
  });
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const open = ref(false);

const steps = [
  {
    target: '#element1',
    title: '功能一',
    description: '这是功能一的介绍'
  },
  {
    target: '#element2',
    title: '功能二',
    description: '这是功能二的介绍'
  }
];

const startTour = () => {
  open.value = true;
};
</script>

<template>
  <ldesign-button @ldesignClick="startTour">
    开始引导
  </ldesign-button>
  
  <ldesign-tour
    :open="open"
    :steps="steps"
    @ldesignClose="open = false"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);
  
  const steps = [
    {
      target: '#element1',
      title: '功能一',
      description: '这是功能一的介绍'
    },
    {
      target: '#element2',
      title: '功能二',
      description: '这是功能二的介绍'
    }
  ];
  
  return (
    <>
      <ldesign-button onLdesignClick={() => setOpen(true)}>
        开始引导
      </ldesign-button>
      
      <ldesign-tour
        open={open}
        steps={JSON.stringify(steps)}
        onLdesignClose={() => setOpen(false)}
      />
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `open` | 是否打开引导 | `boolean` | `false` |
| `steps` | 引导步骤 | `TourStep[]` | `[]` |
| `current` | 当前步骤 | `number` | `0` |

### TourStep

```typescript
interface TourStep {
  target: string;
  title: string;
  description: string;
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignClose` | 关闭引导时触发 | `() => void` |
| `ldesignChange` | 步骤改变时触发 | `(event: CustomEvent<number>) => void` |

## 相关组件

- [Popover 气泡卡片](./popover.md)
