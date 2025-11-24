# AutoComplete 自动完成

输入框自动完成功能，提供输入建议。

## 何时使用

- 需要根据输入内容提供建议时
- 搜索框场景
- 邮箱、地址等自动填充场景
- 标签输入场景

## 代码演示

### 基础用法

基本的自动完成功能，本地过滤选项。

<div class="demo-container">
  <ldesign-auto-complete id="basic-auto-complete" placeholder="请输入"></ldesign-auto-complete>
</div>

```html
<ldesign-auto-complete 
  id="basic-auto-complete"
  placeholder="请输入"
></ldesign-auto-complete>

<script>
  const autoComplete = document.getElementById('basic-auto-complete');
  
  // 设置选项数据
  autoComplete.options = [
    { label: 'React', value: 1 },
    { label: 'Vue', value: 2 },
    { label: 'Angular', value: 3 },
    { label: 'Svelte', value: 4 },
    { label: 'Next.js', value: 5 },
    { label: 'Nuxt.js', value: 6 },
  ];
  
  // 监听选择事件
  autoComplete.addEventListener('ldesignSelect', (e) => {
    console.log('选中:', e.detail);
  });
</script>
```

### 远程搜索

通过 `ldesignSearch` 事件实现远程搜索。

<div class="demo-container">
  <ldesign-auto-complete 
    id="remote-auto-complete" 
    placeholder="搜索用户"
    :filter-option="false"
  ></ldesign-auto-complete>
</div>

```html
<ldesign-auto-complete 
  id="remote-auto-complete"
  placeholder="搜索用户"
  filter-option="false"
></ldesign-auto-complete>

<script>
  const autoComplete = document.getElementById('remote-auto-complete');
  
  // 远程搜索
  autoComplete.addEventListener('ldesignSearch', async (e) => {
    const query = e.detail;
    
    try {
      // 模拟 API 请求
      const response = await fetch(`/api/users?q=${query}`);
      const data = await response.json();
      
      autoComplete.options = data.map(user => ({
        label: user.name,
        value: user.id,
        email: user.email
      }));
    } catch (error) {
      console.error('搜索失败:', error);
    }
  });
</script>
```

### 自定义选项渲染

使用插槽自定义选项内容。

<div class="demo-container">
  <ldesign-auto-complete 
    id="custom-auto-complete"
    placeholder="搜索邮箱"
  ></ldesign-auto-complete>
</div>

```html
<ldesign-auto-complete 
  id="custom-auto-complete"
  placeholder="搜索邮箱"
></ldesign-auto-complete>

<script>
  const autoComplete = document.getElementById('custom-auto-complete');
  
  autoComplete.options = [
    { label: 'john@gmail.com', value: 1, domain: 'Gmail' },
    { label: 'jane@outlook.com', value: 2, domain: 'Outlook' },
    { label: 'mike@yahoo.com', value: 3, domain: 'Yahoo' },
  ];
</script>
```

### 禁用选项

某些选项可以设置为禁用状态。

<div class="demo-container">
  <ldesign-auto-complete 
    id="disabled-option-auto-complete"
    placeholder="选择框架"
  ></ldesign-auto-complete>
</div>

```html
<ldesign-auto-complete></ldesign-auto-complete>

<script>
  autoComplete.options = [
    { label: 'React', value: 1 },
    { label: 'Vue', value: 2, disabled: true },
    { label: 'Angular', value: 3 },
  ];
</script>
```

### 不同尺寸

提供三种尺寸选择。

<div class="demo-container">
  <ldesign-auto-complete size="small" placeholder="Small"></ldesign-auto-complete>
  <ldesign-auto-complete size="medium" placeholder="Medium"></ldesign-auto-complete>
  <ldesign-auto-complete size="large" placeholder="Large"></ldesign-auto-complete>
</div>

```html
<ldesign-auto-complete size="small"></ldesign-auto-complete>
<ldesign-auto-complete size="medium"></ldesign-auto-complete>
<ldesign-auto-complete size="large"></ldesign-auto-complete>
```

### 高亮匹配

自动高亮输入文本匹配的部分。

<div class="demo-container">
  <ldesign-auto-complete 
    id="highlight-auto-complete"
    placeholder="输入关键词"
    highlight-match
  ></ldesign-auto-complete>
</div>

```html
<ldesign-auto-complete highlight-match></ldesign-auto-complete>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref([
  { label: 'React', value: 1 },
  { label: 'Vue', value: 2 },
  { label: 'Angular', value: 3 },
]);

const handleSearch = (query) => {
  // 远程搜索逻辑
  console.log('搜索:', query);
};

const handleSelect = (option) => {
  console.log('选中:', option);
};
</script>

<template>
  <ldesign-auto-complete
    v-model="value"
    :options="options"
    placeholder="请输入"
    @ldesignSearch="handleSearch"
    @ldesignSelect="handleSelect"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([
    { label: 'React', value: 1 },
    { label: 'Vue', value: 2 },
    { label: 'Angular', value: 3 },
  ]);

  const handleSearch = (e) => {
    const query = e.detail;
    // 远程搜索逻辑
    console.log('搜索:', query);
  };

  const handleSelect = (e) => {
    const option = e.detail;
    setValue(option.label);
    console.log('选中:', option);
  };

  return (
    <ldesign-auto-complete
      value={value}
      options={options}
      placeholder="请输入"
      onLdesignSearch={handleSearch}
      onLdesignSelect={handleSelect}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 输入值 | `string` | `''` |
| `placeholder` | 占位符 | `string` | `'请输入'` |
| `options` | 选项数据 | `AutoCompleteOption[]` | `[]` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否可清空 | `boolean` | `true` |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `filter-option` | 是否开启本地过滤 | `boolean` | `true` |
| `debounce-time` | 防抖延迟（毫秒） | `number` | `300` |
| `max-options` | 最大显示选项数 | `number` | `50` |
| `highlight-match` | 是否高亮匹配文本 | `boolean` | `true` |

### AutoCompleteOption

```typescript
interface AutoCompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any;
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignInput` | 输入值变化时触发 | `(event: CustomEvent<string>) => void` |
| `ldesignSearch` | 搜索时触发（用于远程搜索） | `(event: CustomEvent<string>) => void` |
| `ldesignSelect` | 选择选项时触发 | `(event: CustomEvent<AutoCompleteOption>) => void` |
| `ldesignClear` | 清空时触发 | `() => void` |
| `ldesignFocus` | 获得焦点时触发 | `() => void` |
| `ldesignBlur` | 失去焦点时触发 | `() => void` |

## 使用场景

### 搜索框

适合需要输入建议的搜索场景。

```html
<ldesign-auto-complete 
  placeholder="搜索文档"
  :filter-option="false"
></ldesign-auto-complete>
```

### 邮箱输入

常用邮箱域名自动补全。

```javascript
const emailDomains = ['@gmail.com', '@outlook.com', '@qq.com', '@163.com'];

autoComplete.addEventListener('ldesignInput', (e) => {
  const value = e.detail;
  const atIndex = value.indexOf('@');
  
  if (atIndex === -1) {
    // 还没输入 @，提供常用域名
    autoComplete.options = emailDomains.map(domain => ({
      label: value + domain,
      value: value + domain
    }));
  }
});
```

### 地址输入

地址自动补全。

```javascript
autoComplete.addEventListener('ldesignSearch', async (e) => {
  const query = e.detail;
  
  // 调用地图 API 获取地址建议
  const suggestions = await fetchAddressSuggestions(query);
  
  autoComplete.options = suggestions.map(addr => ({
    label: addr.fullAddress,
    value: addr.id,
    coordinates: addr.coordinates
  }));
});
```

## 最佳实践

### 防抖优化

远程搜索时使用防抖减少请求次数。

```javascript
// 组件已内置防抖，默认 300ms
// 可通过 debounce-time 属性调整
autoComplete.debounceTime = 500;
```

### 限制选项数量

避免渲染过多选项影响性能。

```javascript
// 限制最多显示 20 个选项
autoComplete.maxOptions = 20;
```

### 加载状态

远程搜索时显示加载状态。

```javascript
let loading = false;

autoComplete.addEventListener('ldesignSearch', async (e) => {
  loading = true;
  autoComplete.loading = true;
  
  try {
    const results = await searchAPI(e.detail);
    autoComplete.options = results;
  } finally {
    loading = false;
    autoComplete.loading = false;
  }
});
```

## 相关组件

- [Input 输入框](./input.md)
- [Select 选择器](./select.md)
- [Cascader 级联选择](./cascader.md)

<script>
if (typeof window !== 'undefined') {
  const initAutoComplete = () => {
    // 基础用法
    const basicAC = document.getElementById('basic-auto-complete');
    if (basicAC) {
      basicAC.options = [
        { label: 'React', value: 1 },
        { label: 'Vue', value: 2 },
        { label: 'Angular', value: 3 },
        { label: 'Svelte', value: 4 },
        { label: 'Next.js', value: 5 },
        { label: 'Nuxt.js', value: 6 },
        { label: 'Gatsby', value: 7 },
        { label: 'Remix', value: 8 },
      ];
      
      basicAC.addEventListener('ldesignSelect', (e) => {
        console.log('选中:', e.detail);
      });
    }

    // 远程搜索示例
    const remoteAC = document.getElementById('remote-auto-complete');
    if (remoteAC) {
      remoteAC.addEventListener('ldesignSearch', async (e) => {
        const query = e.detail;
        // 模拟 API 请求
        setTimeout(() => {
          remoteAC.options = [
            { label: `${query} - 用户1`, value: 1 },
            { label: `${query} - 用户2`, value: 2 },
            { label: `${query} - 用户3`, value: 3 },
          ];
        }, 500);
      });
    }

    // 自定义选项
    const customAC = document.getElementById('custom-auto-complete');
    if (customAC) {
      customAC.options = [
        { label: 'john@gmail.com', value: 1, domain: 'Gmail' },
        { label: 'jane@outlook.com', value: 2, domain: 'Outlook' },
        { label: 'mike@yahoo.com', value: 3, domain: 'Yahoo' },
        { label: 'sarah@qq.com', value: 4, domain: 'QQ' },
      ];
    }

    // 禁用选项
    const disabledAC = document.getElementById('disabled-option-auto-complete');
    if (disabledAC) {
      disabledAC.options = [
        { label: 'React', value: 1 },
        { label: 'Vue', value: 2, disabled: true },
        { label: 'Angular', value: 3 },
        { label: 'Svelte', value: 4, disabled: true },
      ];
    }

    // 高亮匹配
    const highlightAC = document.getElementById('highlight-auto-complete');
    if (highlightAC) {
      highlightAC.options = [
        { label: 'JavaScript', value: 1 },
        { label: 'TypeScript', value: 2 },
        { label: 'CoffeeScript', value: 3 },
        { label: 'Java', value: 4 },
        { label: 'Python', value: 5 },
      ];
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoComplete);
  } else {
    initAutoComplete();
  }
}
</script>
