# Cascader 级联选择

级联选择框。

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## 代码演示

### 基础用法

级联选择框的基本使用。

<div class="demo-container">
  <ldesign-cascader id="basic-cascader" placeholder="请选择"></ldesign-cascader>
</div>


```html
<ldesign-cascader id="cascader"></ldesign-cascader>

<script>
  const cascader = document.getElementById('cascader');
  cascader.options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        { value: 'hangzhou', label: '杭州' },
        { value: 'ningbo', label: '宁波' }
      ]
    }
  ];
  
  cascader.addEventListener('ldesignChange', (e) => {
    console.log('选中:', e.detail);
  });
</script>
```

### 禁用选项

通过在数据源中设置 `disabled` 字段来声明该选项是禁用的。

```html
<script>
  cascader.options = [
    {
      value: 'zhejiang',
      label: '浙江',
      disabled: true,
      children: [...]
    }
  ];
</script>
```

### 可搜索

可以通过搜索快速查找选项。

<div class="demo-container">
  <ldesign-cascader id="search-cascader" filterable placeholder="可搜索"></ldesign-cascader>
</div>


```html
<ldesign-cascader filterable></ldesign-cascader>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref([]);

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州' },
      { value: 'ningbo', label: '宁波' }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' }
    ]
  }
];

const handleChange = (val) => {
  console.log('选中:', val);
};
</script>

<template>
  <ldesign-cascader
    v-model="value"
    :options="options"
    @ldesignChange="handleChange"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState([]);
  
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        { value: 'hangzhou', label: '杭州' },
        { value: 'ningbo', label: '宁波' }
      ]
    }
  ];
  
  const handleChange = (e) => {
    setValue(e.detail);
    console.log('选中:', e.detail);
  };
  
  return (
    <ldesign-cascader
      value={value}
      options={JSON.stringify(options)}
      onLdesignChange={handleChange}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 选中项的值 | `any[]` | `[]` |
| `options` | 可选项数据源 | `CascaderOption[]` | `[]` |
| `placeholder` | 输入框占位文本 | `string` | `'请选择'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否支持清空选项 | `boolean` | `false` |
| `filterable` | 是否可搜索 | `boolean` | `false` |
| `separator` | 选项分隔符 | `string` | `' / '` |

### CascaderOption

```typescript
interface CascaderOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 选中值改变时触发 | `(event: CustomEvent<any[]>) => void` |

## 相关组件

- [Select 选择器](./select.md)
- [TreeSelect 树选择](./tree-select.md)

<script>
if (typeof window !== 'undefined') {
  const initCascader = () => {
    // 基础用法
    const basicCascader = document.getElementById('basic-cascader');
    if (basicCascader) {
      basicCascader.options = [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州' },
            { value: 'ningbo', label: '宁波' }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            { value: 'nanjing', label: '南京' },
            { value: 'suzhou', label: '苏州' }
          ]
        }
      ];
    }
    
    // 可搜索
    const searchCascader = document.getElementById('search-cascader');
    if (searchCascader) {
      searchCascader.options = [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州' },
            { value: 'ningbo', label: '宁波' }
          ]
        }
      ];
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCascader);
  } else {
    initCascader();
  }
}
</script>
