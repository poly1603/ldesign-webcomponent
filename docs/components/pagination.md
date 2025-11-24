# Pagination 分页

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时。
- 可切换页码浏览数据。

## 代码演示

### 基础用法

基础分页。

<div class="demo-container">
  <ldesign-pagination total="50"></ldesign-pagination>
</div>

```html
<ldesign-pagination total="50"></ldesign-pagination>

<script>
  const pagination = document.querySelector('ldesign-pagination');
  pagination.addEventListener('ldesignChange', (e) => {
    console.log('当前页:', e.detail.current);
    console.log('每页条数:', e.detail.pageSize);
  });
</script>
```

### 更多分页

更多分页。

<div class="demo-container">
  <ldesign-pagination total="500"></ldesign-pagination>
</div>

```html
<ldesign-pagination total="500"></ldesign-pagination>
```

### 改变每页显示条目数

改变每页显示条目数。

<div class="demo-container">
  <ldesign-pagination 
    total="500" 
    show-size-changer
    page-size-options="[10, 20, 50, 100]">
  </ldesign-pagination>
</div>

```html
<ldesign-pagination 
  total="500"
  show-size-changer
  page-size-options="[10, 20, 50, 100]">
</ldesign-pagination>
```

### 快速跳转

快速跳转到某一页。

<div class="demo-container">
  <ldesign-pagination 
    total="500" 
    show-quick-jumper>
  </ldesign-pagination>
</div>

```html
<ldesign-pagination show-quick-jumper></ldesign-pagination>
```

### 简洁模式

简单的翻页。

<div class="demo-container">
  <ldesign-pagination 
    total="50" 
    simple>
  </ldesign-pagination>
</div>

```html
<ldesign-pagination simple></ldesign-pagination>
```

### 迷你尺寸

迷你尺寸分页。

<div class="demo-container">
  <ldesign-pagination 
    total="50" 
    size="small">
  </ldesign-pagination>
</div>

```html
<ldesign-pagination size="small"></ldesign-pagination>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(10);
const total = ref(500);

const handleChange = (e) => {
  current.value = e.detail.current;
  pageSize.value = e.detail.pageSize;
  
  // 加载数据
  loadData(current.value, pageSize.value);
};

const loadData = (page, size) => {
  console.log(`加载第 ${page} 页，每页 ${size} 条`);
};
</script>

<template>
  <ldesign-pagination
    :current="current"
    :page-size="pageSize"
    :total="total"
    show-size-changer
    show-quick-jumper
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 500;
  
  const handleChange = (e) => {
    setCurrent(e.detail.current);
    setPageSize(e.detail.pageSize);
    
    // 加载数据
    loadData(e.detail.current, e.detail.pageSize);
  };
  
  const loadData = (page, size) => {
    console.log(`加载第 ${page} 页，每页 ${size} 条`);
  };
  
  return (
    <ldesign-pagination
      current={current}
      page-size={pageSize}
      total={total}
      show-size-changer
      show-quick-jumper
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `current` | 当前页数 | `number` | `1` |
| `page-size` | 每页条数 | `number` | `10` |
| `total` | 数据总数 | `number` | `0` |
| `show-size-changer` | 是否显示每页条数选择器 | `boolean` | `false` |
| `page-size-options` | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| `show-quick-jumper` | 是否显示快速跳转 | `boolean` | `false` |
| `simple` | 简洁模式 | `boolean` | `false` |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `disabled` | 禁用分页 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 页码或每页条数改变时触发 | `(event: CustomEvent<{ current: number, pageSize: number }>) => void` |

## 相关组件

- [Table 表格](./table.md)
