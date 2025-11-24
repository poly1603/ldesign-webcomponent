# Tree 树形控件

多层次的结构列表。

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

### 基础用法

最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。

<div class="demo-container">
  <ldesign-tree id="basic-tree"></ldesign-tree>
</div>


```html
<ldesign-tree id="tree"></ldesign-tree>

<script>
  const tree = document.getElementById('tree');
  tree.data = [
    {
      title: '节点1',
      key: '0-0',
      children: [
        { title: '子节点1', key: '0-0-0' },
        { title: '子节点2', key: '0-0-1' }
      ]
    }
  ];
  
  tree.addEventListener('ldesignSelect', (e) => {
    console.log('选中:', e.detail);
  });
</script>
```

### 可勾选

适用于需要选择层级时使用。

<div class="demo-container">
  <ldesign-tree id="checkable-tree" checkable></ldesign-tree>
</div>


```html
<ldesign-tree checkable></ldesign-tree>
```

### 异步加载

点击展开节点，动态加载数据。

```html
<ldesign-tree id="tree"></ldesign-tree>

<script>
  const tree = document.getElementById('tree');
  tree.loadData = (node) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { title: '子节点1', key: `${node.key}-0` },
          { title: '子节点2', key: `${node.key}-1` }
        ]);
      }, 1000);
    });
  };
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const treeData = ref([
  {
    title: '节点1',
    key: '0-0',
    children: [
      { title: '子节点1', key: '0-0-0' },
      { title: '子节点2', key: '0-0-1' }
    ]
  }
]);

const checkedKeys = ref(['0-0-0']);

const onCheck = (keys) => {
  checkedKeys.value = keys;
  console.log('勾选:', keys);
};
</script>

<template>
  <ldesign-tree
    :data="treeData"
    :checked-keys="checkedKeys"
    checkable
    @ldesignCheck="onCheck"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
  
  const treeData = [
    {
      title: '节点1',
      key: '0-0',
      children: [
        { title: '子节点1', key: '0-0-0' },
        { title: '子节点2', key: '0-0-1' }
      ]
    }
  ];
  
  const onCheck = (e) => {
    setCheckedKeys(e.detail);
    console.log('勾选:', e.detail);
  };
  
  return (
    <ldesign-tree
      data={JSON.stringify(treeData)}
      checked-keys={checkedKeys}
      checkable
      onLdesignCheck={onCheck}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `data` | 树形数据 | `TreeNode[]` | `[]` |
| `checkable` | 节点前添加 Checkbox 复选框 | `boolean` | `false` |
| `checked-keys` | 选中复选框的树节点 | `string[]` | `[]` |
| `selected-keys` | 设置选中的树节点 | `string[]` | `[]` |
| `expanded-keys` | 展开指定的树节点 | `string[]` | `[]` |
| `default-expand-all` | 默认展开所有树节点 | `boolean` | `false` |

### TreeNode

```typescript
interface TreeNode {
  title: string;
  key: string;
  disabled?: boolean;
  children?: TreeNode[];
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignSelect` | 点击树节点时触发 | `(event: CustomEvent<string[]>) => void` |
| `ldesignCheck` | 点击复选框时触发 | `(event: CustomEvent<string[]>) => void` |
| `ldesignExpand` | 展开/收起节点时触发 | `(event: CustomEvent<string[]>) => void` |

## 相关组件

- [Select 选择器](./select.md)
- [Cascader 级联选择](./cascader.md)

<script>
if (typeof window !== 'undefined') {
  const initTrees = () => {
    // 基础用法
    const basicTree = document.getElementById('basic-tree');
    if (basicTree) {
      basicTree.data = [
        {
          title: '0-0',
          key: '0-0',
          children: [
            { title: '0-0-0', key: '0-0-0' },
            { title: '0-0-1', key: '0-0-1' }
          ]
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0', key: '0-1-0' },
            { title: '0-1-1', key: '0-1-1' }
          ]
        }
      ];
    }
    
    // 可勾选
    const checkableTree = document.getElementById('checkable-tree');
    if (checkableTree) {
      checkableTree.data = [
        {
          title: '0-0',
          key: '0-0',
          children: [
            { title: '0-0-0', key: '0-0-0' },
            { title: '0-0-1', key: '0-0-1' }
          ]
        }
      ];
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrees);
  } else {
    initTrees();
  }
}
</script>
