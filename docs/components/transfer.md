# Transfer 穿梭框

双栏穿梭选择框。

## 何时使用

用直观的方式在两栏中移动元素，完成选择行为。

选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。

## 代码演示

### 基础用法

最基本的用法，展示了数据源、目标框及其他操作。

<div class="demo-container">
  <ldesign-transfer id="basic-transfer"></ldesign-transfer>
</div>


```html
<ldesign-transfer id="transfer"></ldesign-transfer>

<script>
  const transfer = document.getElementById('transfer');
  
  transfer.dataSource = [
    { key: '1', title: '选项1', description: '描述1' },
    { key: '2', title: '选项2', description: '描述2' }
  ];
  
  transfer.addEventListener('ldesignChange', (e) => {
    console.log('目标框数据:', e.detail);
  });
</script>
```

### 带搜索框

带搜索框的穿梭框，可以快速查找选项。

<div class="demo-container">
  <ldesign-transfer id="search-transfer" show-search></ldesign-transfer>
</div>


```html
<ldesign-transfer show-search></ldesign-transfer>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const dataSource = ref([
  { key: '1', title: '选项1' },
  { key: '2', title: '选项2' },
  { key: '3', title: '选项3' }
]);

const targetKeys = ref(['1']);

const handleChange = (keys) => {
  targetKeys.value = keys;
  console.log('目标框:', keys);
};
</script>

<template>
  <ldesign-transfer
    :data-source="dataSource"
    :target-keys="targetKeys"
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [targetKeys, setTargetKeys] = useState(['1']);
  
  const dataSource = [
    { key: '1', title: '选项1' },
    { key: '2', title: '选项2' },
    { key: '3', title: '选项3' }
  ];
  
  const handleChange = (e) => {
    setTargetKeys(e.detail);
    console.log('目标框:', e.detail);
  };
  
  return (
    <ldesign-transfer
      data-source={JSON.stringify(dataSource)}
      target-keys={targetKeys}
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `data-source` | 数据源 | `TransferItem[]` | `[]` |
| `target-keys` | 显示在右侧框的数据的 key 集合 | `string[]` | `[]` |
| `titles` | 标题集合 | `string[]` | `['源列表', '目标列表']` |
| `show-search` | 是否显示搜索框 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |

### TransferItem

```typescript
interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 选项在两栏之间转移时触发 | `(event: CustomEvent<string[]>) => void` |
| `ldesignSearch` | 搜索时触发 | `(event: CustomEvent<string>) => void` |

## 相关组件

- [Select 选择器](./select.md)
- [Table 表格](./table.md)

<script>
if (typeof window !== 'undefined') {
  const initTransfer = () => {
    // 基础用法
    const basicTransfer = document.getElementById('basic-transfer');
    if (basicTransfer) {
      basicTransfer.dataSource = Array.from({ length: 20 }).map((_, i) => ({
        key: `${i}`,
        title: `选项 ${i + 1}`,
        description: `描述 ${i + 1}`
      }));
    }
    
    // 带搜索框
    const searchTransfer = document.getElementById('search-transfer');
    if (searchTransfer) {
      searchTransfer.dataSource = Array.from({ length: 20 }).map((_, i) => ({
        key: `${i}`,
        title: `选项 ${i + 1}`
      }));
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTransfer);
  } else {
    initTransfer();
  }
}
</script>
