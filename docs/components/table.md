# Table 表格

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时。
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 代码演示

### 基础用法

简单的表格，最后一列是各种操作。

<div class="demo-container">
  <ldesign-table id="basic-table"></ldesign-table>
</div>


```html
<ldesign-table id="table"></ldesign-table>

<script>
  const table = document.getElementById('table');
  
  table.columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' }
  ];
  
  table.dataSource = [
    { key: '1', name: '张三', age: 32, address: '北京' },
    { key: '2', name: '李四', age: 42, address: '上海' }
  ];
</script>
```

### 带边框

添加表格边框线，页头和页脚。

<div class="demo-container">
  <ldesign-table id="bordered-table" bordered></ldesign-table>
</div>


```html
<ldesign-table bordered></ldesign-table>
```

### 可选择

第一列是联动的选择框。

```html
<ldesign-table id="table" row-selection></ldesign-table>

<script>
  const table = document.getElementById('table');
  table.addEventListener('ldesignSelectionChange', (e) => {
    console.log('选中的行:', e.detail);
  });
</script>
```

### 分页

支持分页的表格。

```html
<ldesign-table 
  pagination
  :page-size="10"
  :total="100">
</ldesign-table>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' }
];

const dataSource = ref([
  { key: '1', name: '张三', age: 32, address: '北京' },
  { key: '2', name: '李四', age: 42, address: '上海' }
]);

const handleSelectionChange = (selectedRows) => {
  console.log('选中:', selectedRows);
};
</script>

<template>
  <ldesign-table
    :columns="columns"
    :data-source="dataSource"
    row-selection
    @ldesignSelectionChange="handleSelectionChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' }
  ];
  
  const [dataSource] = useState([
    { key: '1', name: '张三', age: 32, address: '北京' },
    { key: '2', name: '李四', age: 42, address: '上海' }
  ]);
  
  const handleSelectionChange = (e) => {
    console.log('选中:', e.detail);
  };
  
  return (
    <ldesign-table
      columns={JSON.stringify(columns)}
      data-source={JSON.stringify(dataSource)}
      row-selection
      onLdesignSelectionChange={handleSelectionChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `columns` | 表格列的配置 | `ColumnType[]` | `[]` |
| `data-source` | 数据数组 | `any[]` | `[]` |
| `bordered` | 是否展示外边框和列边框 | `boolean` | `false` |
| `loading` | 页面是否加载中 | `boolean` | `false` |
| `row-selection` | 表格行是否可选择 | `boolean` | `false` |
| `pagination` | 是否显示分页 | `boolean` | `false` |
| `page-size` | 每页条数 | `number` | `10` |
| `total` | 数据总数 | `number` | `0` |
| `stripe` | 是否为斑马纹 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignSelectionChange` | 选中项发生变化时触发 | `(event: CustomEvent<any[]>) => void` |
| `ldesignPageChange` | 页码改变时触发 | `(event: CustomEvent<number>) => void` |

## 相关组件

- [Pagination 分页](./pagination.md)
- [VirtualList 虚拟列表](./virtual-list.md)

<script>
if (typeof window !== 'undefined') {
  const initTables = () => {
    // 基础用法
    const basicTable = document.getElementById('basic-table');
    if (basicTable) {
      basicTable.columns = [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '年龄', dataIndex: 'age', key: 'age' },
        { title: '地址', dataIndex: 'address', key: 'address' }
      ];
      
      basicTable.dataSource = [
        { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
        { key: '2', name: '李四', age: 42, address: '上海市浦东新区' },
        { key: '3', name: '王五', age: 28, address: '深圳市南山区' }
      ];
    }
    
    // 带边框
    const borderedTable = document.getElementById('bordered-table');
    if (borderedTable) {
      borderedTable.columns = [
        { title: '姓名', dataIndex: 'name' },
        { title: '年龄', dataIndex: 'age' },
        { title: '地址', dataIndex: 'address' }
      ];
      borderedTable.dataSource = [
        { key: '1', name: '张三', age: 32, address: '北京' }
      ];
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTables);
  } else {
    initTables();
  }
}
</script>
