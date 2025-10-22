# Table 表格

高性能数据表格组件，支持虚拟滚动、排序、筛选等功能。

## 何时使用

- 需要展示结构化数据
- 需要对数据进行排序、筛选
- 数据量较大，需要虚拟滚动
- 需要固定表头或列

## 基础用法

:::demo

```html
<ldesign-table id="table1" bordered striped></ldesign-table>

<script>
const table = document.getElementById('table1');

table.columns = [
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', width: 80, sortable: true },
  { key: 'address', title: '地址' }
];

table.dataSource = [
  { id: 1, name: '张三', age: 28, address: '北京' },
  { id: 2, name: '李四', age: 32, address: '上海' },
  { id: 3, name: '王五', age: 25, address: '广州' }
];
</script>
```

:::

## 虚拟滚动（大数据量）

:::demo 支持 10,000+ 行数据流畅滚动

```html
<ldesign-table 
  id="bigTable"
  bordered
  striped
  virtual
  height="500"
  row-height="48"
></ldesign-table>

<script>
const table = document.getElementById('bigTable');

table.columns = [
  { key: 'id', title: 'ID', width: 60, sortable: true },
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', width: 80, sortable: true },
  { key: 'email', title: '邮箱' }
];

// 10,000 行数据
table.dataSource = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  age: 20 + (i % 40),
  email: `user${i + 1}@example.com`
}));

// 监听排序
table.addEventListener('ldesignSort', (e) => {
  console.log('排序:', e.detail);
});
</script>
```

:::

## 排序功能

:::demo

```html
<ldesign-table id="sortTable" bordered></ldesign-table>

<script>
const table = document.getElementById('sortTable');

table.columns = [
  { key: 'name', title: '姓名', sortable: true },
  { key: 'score', title: '分数', sortable: true, align: 'center' },
  { key: 'status', title: '状态', align: 'center' }
];

table.dataSource = [
  { id: 1, name: '张三', score: 95, status: '优秀' },
  { id: 2, name: '李四', score: 82, status: '良好' },
  { id: 3, name: '王五', score: 78, status: '及格' }
];

table.addEventListener('ldesignSort', (e) => {
  const { key, order } = e.detail;
  const sorted = [...table.dataSource].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
  table.dataSource = sorted;
});
</script>
```

:::

## Vue 3 使用

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/table';

const columns = ref([
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', sortable: true },
  { key: 'email', title: '邮箱' }
]);

const dataSource = ref([
  { id: 1, name: '张三', age: 28, email: 'zhang@example.com' },
  { id: 2, name: '李四', age: 32, email: 'li@example.com' }
]);

const handleSort = (e: CustomEvent) => {
  console.log('排序:', e.detail);
};
</script>

<template>
  <ldesign-table
    :columns="JSON.stringify(columns)"
    :dataSource="JSON.stringify(dataSource)"
    bordered
    striped
    @ldesignSort="handleSort"
  />
</template>
```

## React 使用

```tsx
import { useState } from 'react';
import { Table } from '@ldesign/webcomponent-react';

function MyTable() {
  const [data, setData] = useState([
    { id: 1, name: '张三', age: 28 },
    { id: 2, name: '李四', age: 32 }
  ]);

  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      striped
    />
  );
}
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| columns | `TableColumn[]` | `[]` | 表格列配置 |
| dataSource | `any[]` | `[]` | 数据源 |
| rowKey | `string` | `'id'` | 行数据的Key字段 |
| bordered | `boolean` | `false` | 是否显示边框 |
| striped | `boolean` | `false` | 是否显示斑马纹 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 表格大小 |
| virtual | `boolean` | `false` | 是否启用虚拟滚动 |
| rowHeight | `number` | `48` | 行高（虚拟滚动时使用） |
| height | `number \| string` | - | 表格高度（启用虚拟滚动时必需） |
| showHeader | `boolean` | `true` | 是否显示表头 |
| hoverable | `boolean` | `true` | 是否显示hover效果 |
| loading | `boolean` | `false` | 是否加载中 |
| emptyText | `string` | `'暂无数据'` | 空数据提示 |

### TableColumn

| 属性 | 类型 | 说明 |
|------|------|------|
| key | `string` | 列键值 |
| title | `string` | 列标题 |
| width | `number \| string` | 列宽度 |
| sortable | `boolean` | 是否可排序 |
| filterable | `boolean` | 是否可筛选 |
| fixed | `'left' \| 'right'` | 固定列 |
| align | `'left' \| 'center' \| 'right'` | 对齐方式 |
| render | `(value, row, index) => any` | 自定义渲染 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| ldesignSort | `{ key: string, order: 'asc' \| 'desc' }` | 排序变化 |
| ldesignRowClick | `{ row: any, index: number }` | 行点击 |

## 性能优化

### 启用虚拟滚动

当数据量超过 1000 行时，建议启用虚拟滚动：

```html
<ldesign-table
  :dataSource="bigData"
  virtual
  height="600"
  row-height="48"
/>
```

### 性能对比

| 数据量 | 普通模式 | 虚拟滚动 | 提升 |
|--------|----------|----------|------|
| 100 行 | 流畅 | 流畅 | - |
| 1,000 行 | 卡顿 | 流畅 | **5x** |
| 10,000 行 | 严重卡顿 | 流畅 | **100x** |
| 100,000 行 | 崩溃 | 流畅 | **∞** |

## CSS Variables

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--ld-table-header-bg` | `var(--ld-bg-elevated)` | 表头背景色 |
| `--ld-table-row-hover-bg` | `var(--ld-bg-hover)` | 行悬停背景色 |
| `--ld-table-border-color` | `var(--ld-border-color)` | 边框颜色 |
| `--ld-table-padding` | `var(--ld-spacing-4)` | 单元格内边距 |

## 无障碍支持

- ✅ 完整的键盘导航支持
- ✅ ARIA 属性标注
- ✅ 屏幕阅读器友好

## 相关组件

- [VirtualList](/components/virtual-list) - 虚拟列表
- [Pagination](/components/pagination) - 分页
- [Empty](/components/empty) - 空状态

