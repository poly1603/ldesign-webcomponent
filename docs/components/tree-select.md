# TreeSelect 树选择

树形选择控件，结合了 Tree 和 Select 的功能。

## 何时使用

- 需要从树形数据中选择一个或多个值
- 数据层级较深，需要展示层级关系
- 部门选择、区域选择、分类选择等场景

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-tree-select
    id="tree-select-basic"
    placeholder="请选择"
    style="width: 300px"
  >
  </ldesign-tree-select>
</div>

```html
<ldesign-tree-select placeholder="请选择"></ldesign-tree-select>

<script>
const treeSelect = document.querySelector('ldesign-tree-select');
treeSelect.treeData = [
  {
    value: '1',
    label: '节点1',
    children: [
      { value: '1-1', label: '节点1-1' },
      { value: '1-2', label: '节点1-2' },
    ],
  },
  {
    value: '2',
    label: '节点2',
    children: [
      { value: '2-1', label: '节点2-1' },
      { value: '2-2', label: '节点2-2' },
    ],
  },
];
</script>
```

### 多选模式

支持多选。

<div class="demo-container">
  <ldesign-tree-select
    id="tree-select-multiple"
    placeholder="请选择"
    multiple
    checkable
    style="width: 300px"
  >
  </ldesign-tree-select>
</div>

```html
<ldesign-tree-select
  multiple
  checkable
  placeholder="请选择"
>
</ldesign-tree-select>
```

### 可搜索

支持搜索过滤。

<div class="demo-container">
  <ldesign-tree-select
    id="tree-select-searchable"
    placeholder="请选择"
    searchable
    search-placeholder="搜索节点"
    style="width: 300px"
  >
  </ldesign-tree-select>
</div>

```html
<ldesign-tree-select
  searchable
  search-placeholder="搜索节点"
>
</ldesign-tree-select>
```

### 默认展开全部

默认展开所有节点。

<div class="demo-container">
  <ldesign-tree-select
    id="tree-select-expand-all"
    placeholder="请选择"
    default-expand-all
    style="width: 300px"
  >
  </ldesign-tree-select>
</div>

```html
<ldesign-tree-select
  default-expand-all
  placeholder="请选择"
>
</ldesign-tree-select>
```

### 可清空

带清空按钮。

<div class="demo-container">
  <ldesign-tree-select
    id="tree-select-clearable"
    placeholder="请选择"
    clearable
    style="width: 300px"
  >
  </ldesign-tree-select>
</div>

```html
<ldesign-tree-select clearable placeholder="请选择"></ldesign-tree-select>
```

### 禁用状态

禁用整个选择器。

<div class="demo-container">
  <ldesign-tree-select
    id="tree-select-disabled"
    placeholder="请选择"
    disabled
    style="width: 300px"
  >
  </ldesign-tree-select>
</div>

```html
<ldesign-tree-select disabled></ldesign-tree-select>
```

### 不同尺寸

三种尺寸可选。

<div class="demo-container">
  <ldesign-tree-select
    id="tree-select-small"
    size="small"
    placeholder="Small"
    style="width: 300px; margin-bottom: 16px"
  >
  </ldesign-tree-select>

  <ldesign-tree-select
    id="tree-select-medium"
    size="medium"
    placeholder="Medium"
    style="width: 300px; margin-bottom: 16px"
  >
  </ldesign-tree-select>

  <ldesign-tree-select
    id="tree-select-large"
    size="large"
    placeholder="Large"
    style="width: 300px"
  >
  </ldesign-tree-select>
</div>

```html
<ldesign-tree-select size="small"></ldesign-tree-select>
<ldesign-tree-select size="medium"></ldesign-tree-select>
<ldesign-tree-select size="large"></ldesign-tree-select>
```

### 部门选择

典型的部门选择场景。

<div class="demo-container">
  <ldesign-tree-select
    id="tree-select-department"
    placeholder="请选择部门"
    searchable
    default-expand-all
    style="width: 300px"
  >
  </ldesign-tree-select>
</div>

```html
<ldesign-tree-select
  placeholder="请选择部门"
  searchable
  default-expand-all
>
</ldesign-tree-select>

<script>
treeSelect.treeData = [
  {
    value: 'tech',
    label: '技术部',
    children: [
      { value: 'frontend', label: '前端组' },
      { value: 'backend', label: '后端组' },
      { value: 'mobile', label: '移动端组' },
    ],
  },
  {
    value: 'product',
    label: '产品部',
    children: [
      { value: 'design', label: '设计组' },
      { value: 'pm', label: '产品经理组' },
    ],
  },
];
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref('');
const treeData = ref([
  {
    value: '1',
    label: '节点1',
    children: [
      { value: '1-1', label: '节点1-1' },
      { value: '1-2', label: '节点1-2' },
    ],
  },
  {
    value: '2',
    label: '节点2',
    children: [
      { value: '2-1', label: '节点2-1' },
    ],
  },
]);

const handleChange = (e) => {
  console.log('选中:', e.detail);
};
</script>

<template>
  <ldesign-tree-select
    v-model="value"
    :tree-data="treeData"
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const treeData = [
    {
      value: '1',
      label: '节点1',
      children: [
        { value: '1-1', label: '节点1-1' },
        { value: '1-2', label: '节点1-2' },
      ],
    },
    {
      value: '2',
      label: '节点2',
      children: [
        { value: '2-1', label: '节点2-1' },
      ],
    },
  ];

  const handleChange = (e) => {
    setValue(e.detail);
    console.log('选中:', e.detail);
  };

  return (
    <ldesign-tree-select
      value={value}
      treeData={treeData}
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 选中的值 | `string \| number \| (string \| number)[]` | - |
| `tree-data` | 树形数据 | `TreeSelectNode[]` | `[]` |
| `placeholder` | 占位符 | `string` | `'请选择'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否可清空 | `boolean` | `false` |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `multiple` | 是否支持多选 | `boolean` | `false` |
| `searchable` | 是否可搜索 | `boolean` | `false` |
| `search-placeholder` | 搜索框占位符 | `string` | `'搜索...'` |
| `checkable` | 是否显示复选框 | `boolean` | `false` |
| `expanded-keys` | 展开的节点 | `(string \| number)[]` | `[]` |
| `default-expand-all` | 默认展开所有 | `boolean` | `false` |

### TreeSelectNode

```typescript
interface TreeSelectNode {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: TreeSelectNode[];
  icon?: string;
  [key: string]: any;
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 选中值变化时触发 | `(event: CustomEvent<any>) => void` |
| `ldesignClear` | 清空时触发 | `(event: CustomEvent<void>) => void` |
| `ldesignSearch` | 搜索时触发 | `(event: CustomEvent<string>) => void` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `show` | 显示下拉 | - | `Promise<void>` |
| `hide` | 隐藏下拉 | - | `Promise<void>` |
| `clear` | 清空选择 | - | `Promise<void>` |

## 使用场景

### 部门选择

```javascript
const departmentData = [
  {
    value: 'tech',
    label: '技术部',
    children: [
      { value: 'frontend', label: '前端开发' },
      { value: 'backend', label: '后端开发' },
      { value: 'mobile', label: '移动开发' },
      { value: 'test', label: '测试' },
    ],
  },
  {
    value: 'product',
    label: '产品部',
    children: [
      { value: 'design', label: 'UI设计' },
      { value: 'pm', label: '产品经理' },
    ],
  },
  {
    value: 'market',
    label: '市场部',
    children: [
      { value: 'operation', label: '运营' },
      { value: 'sales', label: '销售' },
    ],
  },
];
```

### 地区选择

```javascript
const regionData = [
  {
    value: 'china',
    label: '中国',
    children: [
      {
        value: 'beijing',
        label: '北京',
        children: [
          { value: 'haidian', label: '海淀区' },
          { value: 'chaoyang', label: '朝阳区' },
        ],
      },
      {
        value: 'shanghai',
        label: '上海',
        children: [
          { value: 'pudong', label: '浦东新区' },
          { value: 'huangpu', label: '黄浦区' },
        ],
      },
    ],
  },
];
```

### 分类选择

```javascript
const categoryData = [
  {
    value: 'electronics',
    label: '电子产品',
    children: [
      {
        value: 'computer',
        label: '电脑',
        children: [
          { value: 'laptop', label: '笔记本' },
          { value: 'desktop', label: '台式机' },
        ],
      },
      {
        value: 'phone',
        label: '手机',
        children: [
          { value: 'iphone', label: 'iPhone' },
          { value: 'android', label: 'Android' },
        ],
      },
    ],
  },
  {
    value: 'clothing',
    label: '服装',
    children: [
      { value: 'mens', label: '男装' },
      { value: 'womens', label: '女装' },
    ],
  },
];
```

## 最佳实践

### 1. 合理的数据层级

建议树形结构不超过 3-4 层，避免层级过深导致选择困难。

```javascript
// ✅ 好：合理的层级
{
  label: '技术部',
  children: [
    { label: '前端组', children: [ ... ] }
  ]
}

// ❌ 不好：层级过深
{
  label: 'A',
  children: [{ 
    label: 'B', 
    children: [{ 
      label: 'C', 
      children: [{ 
        label: 'D', 
        children: [ ... ] 
      }] 
    }] 
  }]
}
```

### 2. 使用搜索功能

数据量较大时，建议开启搜索功能。

```html
<ldesign-tree-select searchable search-placeholder="搜索节点"></ldesign-tree-select>
```

### 3. 合理使用多选

多选时建议开启复选框，视觉反馈更清晰。

```html
<ldesign-tree-select multiple checkable></ldesign-tree-select>
```

### 4. 节点禁用

可以禁用特定节点。

```javascript
const treeData = [
  {
    value: '1',
    label: '节点1',
    disabled: true,  // 禁用此节点
    children: [ ... ]
  }
];
```

## 相关组件

- [Select 选择器](./select.md)
- [Tree 树形控件](./tree.md)
- [Cascader 级联选择](./cascader.md)
