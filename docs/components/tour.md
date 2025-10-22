# Tour 漫游式引导

用于分步引导用户了解产品功能的气泡组件。

## 何时使用

- 新用户引导
- 新功能介绍
- 操作说明

## 基础用法

:::demo

```html
<div id="tourDemo">
  <ldesign-button id="startTour" type="primary">开始引导</ldesign-button>
  
  <div style="margin-top: 24px; display: flex; gap: 16px;">
    <ldesign-button id="step1">第一步</ldesign-button>
    <ldesign-button id="step2">第二步</ldesign-button>
    <ldesign-button id="step3">第三步</ldesign-button>
  </div>
  
  <ldesign-tour id="myTour"></ldesign-tour>
</div>

<script>
const tour = document.getElementById('myTour');
const startBtn = document.getElementById('startTour');

// 配置步骤
tour.steps = [
  {
    target: '#step1',
    title: '第一步',
    description: '这是第一个功能按钮',
    placement: 'bottom'
  },
  {
    target: '#step2',
    title: '第二步',
    description: '这是第二个功能按钮',
    placement: 'bottom'
  },
  {
    target: '#step3',
    title: '第三步',
    description: '这是最后一个按钮',
    placement: 'bottom'
  }
];

// 开始引导
startBtn.addEventListener('ldesignClick', () => {
  tour.open = true;
});

// 监听完成
tour.addEventListener('ldesignFinish', () => {
  alert('引导完成！');
});
</script>
```

:::

## Vue 3 使用

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/tour';

const tourOpen = ref(false);

const steps = [
  {
    target: '#feature1',
    title: '功能介绍',
    description: '这是一个很棒的功能',
    placement: 'bottom'
  },
  {
    target: '#feature2',
    title: '如何使用',
    description: '点击这里开始使用',
    placement: 'right'
  }
];

const handleFinish = () => {
  console.log('引导完成');
  tourOpen.value = false;
};
</script>

<template>
  <div>
    <ldesign-button @ldesignClick="tourOpen = true">
      开始引导
    </ldesign-button>
    
    <div id="feature1">功能1</div>
    <div id="feature2">功能2</div>
    
    <ldesign-tour
      :open="tourOpen"
      :steps="JSON.stringify(steps)"
      @ldesignFinish="handleFinish"
      @ldesignClose="tourOpen = false"
    />
  </div>
</template>
```

## React 使用

```tsx
import { useState } from 'react';

function TourExample() {
  const [open, setOpen] = useState(false);

  const steps = [
    {
      target: '#feature1',
      title: '功能介绍',
      description: '这是一个很棒的功能'
    }
  ];

  return (
    <div>
      <button onClick={() => setOpen(true)}>开始引导</button>
      
      <div id="feature1">功能1</div>
      
      <ldesign-tour
        open={open}
        steps={JSON.stringify(steps)}
        onLdesignFinish={() => setOpen(false)}
        onLdesignClose={() => setOpen(false)}
      />
    </div>
  );
}
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | `boolean` | `false` | 是否打开 |
| steps | `TourStep[]` | `[]` | 步骤配置 |

### TourStep

| 属性 | 类型 | 说明 |
|------|------|------|
| target | `string \| HTMLElement` | 目标元素 |
| title | `string` | 标题 |
| description | `string` | 描述 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | 位置 |
| mask | `boolean` | 是否显示遮罩 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| ldesignClose | - | 关闭引导 |
| ldesignStepChange | `number` | 步骤变化 |
| ldesignFinish | - | 完成引导 |

### Methods

| 方法 | 参数 | 说明 |
|------|------|------|
| next() | - | 下一步 |
| prev() | - | 上一步 |
| goTo(index) | `number` | 跳到指定步骤 |
| close() | - | 关闭引导 |

