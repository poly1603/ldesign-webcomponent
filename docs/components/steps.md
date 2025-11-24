# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## 代码演示

### 基础用法

简单的步骤条。

<div class="demo-container">
  <ldesign-steps current="1">
    <ldesign-step title="已完成" description="这是描述"></ldesign-step>
    <ldesign-step title="进行中" description="这是描述"></ldesign-step>
    <ldesign-step title="待处理" description="这是描述"></ldesign-step>
  </ldesign-steps>
</div>

```html
<ldesign-steps current="1">
  <ldesign-step title="已完成" description="描述"></ldesign-step>
  <ldesign-step title="进行中" description="描述"></ldesign-step>
  <ldesign-step title="待处理" description="描述"></ldesign-step>
</ldesign-steps>
```

### 带图标的步骤条

通过设置 `icon` 属性使用自定义图标。

<div class="demo-container">
  <ldesign-steps current="1">
    <ldesign-step title="登录" icon="user"></ldesign-step>
    <ldesign-step title="验证" icon="shield"></ldesign-step>
    <ldesign-step title="完成" icon="check"></ldesign-step>
  </ldesign-steps>
</div>

```html
<ldesign-steps current="1">
  <ldesign-step title="登录" icon="user"></ldesign-step>
  <ldesign-step title="验证" icon="shield"></ldesign-step>
  <ldesign-step title="完成" icon="check"></ldesign-step>
</ldesign-steps>
```

### 迷你版

迷你版的步骤条。

<div class="demo-container">
  <ldesign-steps current="1" size="small">
    <ldesign-step title="已完成"></ldesign-step>
    <ldesign-step title="进行中"></ldesign-step>
    <ldesign-step title="待处理"></ldesign-step>
  </ldesign-steps>
</div>

```html
<ldesign-steps size="small">
  <ldesign-step title="步骤1"></ldesign-step>
  <ldesign-step title="步骤2"></ldesign-step>
</ldesign-steps>
```

### 带状态的步骤条

使用 `status` 属性来指定当前步骤的状态。

<div class="demo-container">
  <ldesign-steps current="1" status="error">
    <ldesign-step title="已完成"></ldesign-step>
    <ldesign-step title="错误" description="出现错误"></ldesign-step>
    <ldesign-step title="待处理"></ldesign-step>
  </ldesign-steps>
</div>

```html
<ldesign-steps current="1" status="error">
  <ldesign-step title="已完成"></ldesign-step>
  <ldesign-step title="错误"></ldesign-step>
  <ldesign-step title="待处理"></ldesign-step>
</ldesign-steps>
```

### 垂直方向的步骤条

垂直方向的步骤条。

<div class="demo-container">
  <ldesign-steps current="1" direction="vertical">
    <ldesign-step title="已完成" description="这里是描述"></ldesign-step>
    <ldesign-step title="进行中" description="这里是描述"></ldesign-step>
    <ldesign-step title="待处理" description="这里是描述"></ldesign-step>
  </ldesign-steps>
</div>

```html
<ldesign-steps direction="vertical">
  <ldesign-step title="步骤1" description="描述"></ldesign-step>
  <ldesign-step title="步骤2" description="描述"></ldesign-step>
</ldesign-steps>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const current = ref(0);

const next = () => {
  if (current.value < 2) {
    current.value++;
  }
};

const prev = () => {
  if (current.value > 0) {
    current.value--;
  }
};
</script>

<template>
  <ldesign-steps :current="current">
    <ldesign-step title="步骤 1" description="描述 1" />
    <ldesign-step title="步骤 2" description="描述 2" />
    <ldesign-step title="步骤 3" description="描述 3" />
  </ldesign-steps>
  
  <div style="margin-top: 20px;">
    <ldesign-button @ldesignClick="prev">上一步</ldesign-button>
    <ldesign-button type="primary" @ldesignClick="next">
      下一步
    </ldesign-button>
  </div>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [current, setCurrent] = useState(0);
  
  const next = () => {
    if (current < 2) {
      setCurrent(current + 1);
    }
  };
  
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  
  return (
    <>
      <ldesign-steps current={current}>
        <ldesign-step title="步骤 1" description="描述 1" />
        <ldesign-step title="步骤 2" description="描述 2" />
        <ldesign-step title="步骤 3" description="描述 3" />
      </ldesign-steps>
      
      <div style={{ marginTop: 20 }}>
        <ldesign-button onLdesignClick={prev}>上一步</ldesign-button>
        <ldesign-button type="primary" onLdesignClick={next}>
          下一步
        </ldesign-button>
      </div>
    </>
  );
}
```

## API

### Steps Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `current` | 当前步骤 | `number` | `0` |
| `status` | 当前步骤的状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'` |
| `direction` | 显示方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `size` | 尺寸 | `'default' \| 'small'` | `'default'` |

### Step Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `title` | 标题 | `string` | - |
| `description` | 描述 | `string` | - |
| `icon` | 图标 | `string` | - |
| `status` | 步骤的状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | `'wait'` |

## 相关组件

- [Progress 进度条](./progress.md)
