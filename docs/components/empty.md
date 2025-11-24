# Empty 空状态

空状态时的占位提示。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 代码演示

### 基础用法

简单的空状态展示。

<div class="demo-container">
  <ldesign-empty></ldesign-empty>
</div>

```html
<ldesign-empty></ldesign-empty>
```

### 自定义描述

自定义描述内容。

<div class="demo-container">
  <ldesign-empty description="暂无数据"></ldesign-empty>
</div>

```html
<ldesign-empty description="暂无数据"></ldesign-empty>
```

### 自定义图片

自定义图片链接。

<div class="demo-container">
  <ldesign-empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    description="自定义图片">
  </ldesign-empty>
</div>

```html
<ldesign-empty
  image="custom-empty.svg"
  description="自定义图片">
</ldesign-empty>
```

### 自定义操作

添加自定义操作按钮。

<div class="demo-container">
  <ldesign-empty description="暂无数据">
    <ldesign-button type="primary">立即创建</ldesign-button>
  </ldesign-empty>
</div>

```html
<ldesign-empty description="暂无数据">
  <ldesign-button type="primary">立即创建</ldesign-button>
</ldesign-empty>
```

### 无描述

无描述展示。

<div class="demo-container">
  <ldesign-empty description=""></ldesign-empty>
</div>

```html
<ldesign-empty description=""></ldesign-empty>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const dataList = ref([]);

const createData = () => {
  dataList.value = [1, 2, 3];
};
</script>

<template>
  <div v-if="dataList.length === 0">
    <ldesign-empty description="暂无数据">
      <ldesign-button type="primary" @ldesignClick="createData">
        立即创建
      </ldesign-button>
    </ldesign-empty>
  </div>
  
  <div v-else>
    <!-- 数据列表 -->
  </div>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [dataList, setDataList] = useState([]);
  
  const createData = () => {
    setDataList([1, 2, 3]);
  };
  
  if (dataList.length === 0) {
    return (
      <ldesign-empty description="暂无数据">
        <ldesign-button type="primary" onLdesignClick={createData}>
          立即创建
        </ldesign-button>
      </ldesign-empty>
    );
  }
  
  return <div>{/* 数据列表 */}</div>;
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `description` | 描述文字 | `string` | `'暂无数据'` |
| `image` | 图片地址 | `string` | - |
| `image-style` | 图片样式 | `string` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义操作区域 |
| `description` | 自定义描述内容 |
| `image` | 自定义图片 |

## 相关组件

- [Result 结果](./result.md)
- [Skeleton 骨架屏](./skeleton.md)
