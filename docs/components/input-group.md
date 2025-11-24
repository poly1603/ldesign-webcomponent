# InputGroup 输入框组合

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要将多个输入控件组合在一起时
- 搜索框（输入框 + 按钮）
- 带前后缀的输入框
- URL输入（协议选择 + 域名输入）
- 金额输入（货币符号 + 数字输入）

## 代码演示

### 基础用法

最简单的组合，带间隙。

<div class="demo-container">
  <ldesign-input-group>
    <ldesign-input placeholder="请输入" style="width: 200px"></ldesign-input>
    <ldesign-button type="primary">搜索</ldesign-button>
  </ldesign-input-group>
</div>

```html
<ldesign-input-group>
  <ldesign-input placeholder="请输入" style="width: 200px"></ldesign-input>
  <ldesign-button type="primary">搜索</ldesign-button>
</ldesign-input-group>
```

### 紧凑模式

无间隙的紧凑组合。

<div class="demo-container">
  <ldesign-input-group compact>
    <ldesign-input placeholder="请输入" style="width: 200px"></ldesign-input>
    <ldesign-button type="primary">搜索</ldesign-button>
  </ldesign-input-group>
</div>

```html
<ldesign-input-group compact>
  <ldesign-input placeholder="请输入"></ldesign-input>
  <ldesign-button type="primary">搜索</ldesign-button>
</ldesign-input-group>
```

### 前后缀

使用 `ldesign-input-group-addon` 添加前后缀。

<div class="demo-container">
  <ldesign-input-group compact>
    <ldesign-input-group-addon>https://</ldesign-input-group-addon>
    <ldesign-input placeholder="请输入域名"></ldesign-input>
    <ldesign-input-group-addon>.com</ldesign-input-group-addon>
  </ldesign-input-group>
</div>

```html
<ldesign-input-group compact>
  <ldesign-input-group-addon>https://</ldesign-input-group-addon>
  <ldesign-input placeholder="请输入域名"></ldesign-input>
  <ldesign-input-group-addon>.com</ldesign-input-group-addon>
</ldesign-input-group>
```

### 组合 Select

Select 与 Input 的组合。

<div class="demo-container">
  <ldesign-input-group compact>
    <ldesign-select style="width: 90px" value="http://">
      <ldesign-option value="http://">http://</ldesign-option>
      <ldesign-option value="https://">https://</ldesign-option>
    </ldesign-select>
    <ldesign-input placeholder="请输入域名" style="width: 200px"></ldesign-input>
  </ldesign-input-group>
</div>

```html
<ldesign-input-group compact>
  <ldesign-select style="width: 90px">
    <ldesign-option value="http://">http://</ldesign-option>
    <ldesign-option value="https://">https://</ldesign-option>
  </ldesign-select>
  <ldesign-input placeholder="请输入域名"></ldesign-input>
</ldesign-input-group>
```

### 金额输入

货币符号 + 数字输入。

<div class="demo-container">
  <ldesign-input-group compact>
    <ldesign-input-group-addon>¥</ldesign-input-group-addon>
    <ldesign-input-number placeholder="输入金额" style="width: 150px"></ldesign-input-number>
    <ldesign-input-group-addon>.00</ldesign-input-group-addon>
  </ldesign-input-group>
</div>

```html
<ldesign-input-group compact>
  <ldesign-input-group-addon>¥</ldesign-input-group-addon>
  <ldesign-input-number placeholder="输入金额"></ldesign-input-number>
  <ldesign-input-group-addon>.00</ldesign-input-group-addon>
</ldesign-input-group>
```

### 搜索框

多种搜索框组合。

<div class="demo-container">
  <!-- 基础搜索 -->
  <ldesign-input-group compact style="margin-bottom: 16px;">
    <ldesign-input placeholder="搜索内容" style="width: 250px"></ldesign-input>
    <ldesign-button type="primary">
      <ldesign-icon name="search"></ldesign-icon>
      搜索
    </ldesign-button>
  </ldesign-input-group>

  <!-- 带类型选择 -->
  <ldesign-input-group compact>
    <ldesign-select style="width: 110px" value="user">
      <ldesign-option value="user">用户</ldesign-option>
      <ldesign-option value="post">文章</ldesign-option>
      <ldesign-option value="tag">标签</ldesign-option>
    </ldesign-select>
    <ldesign-input placeholder="请输入关键词" style="width: 200px"></ldesign-input>
    <ldesign-button type="primary">搜索</ldesign-button>
  </ldesign-input-group>
</div>

```html
<!-- 基础搜索 -->
<ldesign-input-group compact>
  <ldesign-input placeholder="搜索内容"></ldesign-input>
  <ldesign-button type="primary">
    <ldesign-icon name="search"></ldesign-icon>
    搜索
  </ldesign-button>
</ldesign-input-group>

<!-- 带类型选择 -->
<ldesign-input-group compact>
  <ldesign-select style="width: 110px">
    <ldesign-option value="user">用户</ldesign-option>
    <ldesign-option value="post">文章</ldesign-option>
  </ldesign-select>
  <ldesign-input placeholder="请输入关键词"></ldesign-input>
  <ldesign-button type="primary">搜索</ldesign-button>
</ldesign-input-group>
```

### 不同尺寸

三种尺寸选择。

<div class="demo-container">
  <ldesign-input-group compact size="small" style="margin-bottom: 16px;">
    <ldesign-input placeholder="Small"></ldesign-input>
    <ldesign-button type="primary">搜索</ldesign-button>
  </ldesign-input-group>

  <ldesign-input-group compact size="medium" style="margin-bottom: 16px;">
    <ldesign-input placeholder="Medium"></ldesign-input>
    <ldesign-button type="primary">搜索</ldesign-button>
  </ldesign-input-group>

  <ldesign-input-group compact size="large">
    <ldesign-input placeholder="Large"></ldesign-input>
    <ldesign-button type="primary">搜索</ldesign-button>
  </ldesign-input-group>
</div>

```html
<ldesign-input-group size="small" compact>
  <ldesign-input placeholder="Small"></ldesign-input>
  <ldesign-button type="primary">搜索</ldesign-button>
</ldesign-input-group>
```

### 多个输入框

组合多个输入框。

<div class="demo-container">
  <ldesign-input-group compact>
    <ldesign-input placeholder="姓" style="width: 100px"></ldesign-input>
    <ldesign-input placeholder="名" style="width: 100px"></ldesign-input>
  </ldesign-input-group>
</div>

```html
<ldesign-input-group compact>
  <ldesign-input placeholder="姓"></ldesign-input>
  <ldesign-input placeholder="名"></ldesign-input>
</ldesign-input-group>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const keyword = ref('');
const searchType = ref('user');

const handleSearch = () => {
  console.log('搜索:', searchType.value, keyword.value);
};
</script>

<template>
  <ldesign-input-group compact>
    <ldesign-select v-model="searchType" style="width: 110px">
      <ldesign-option value="user">用户</ldesign-option>
      <ldesign-option value="post">文章</ldesign-option>
    </ldesign-select>
    <ldesign-input 
      v-model="keyword"
      placeholder="请输入关键词"
      style="width: 200px"
    />
    <ldesign-button type="primary" @click="handleSearch">
      搜索
    </ldesign-button>
  </ldesign-input-group>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('user');

  const handleSearch = () => {
    console.log('搜索:', searchType, keyword);
  };

  return (
    <ldesign-input-group compact>
      <ldesign-select 
        value={searchType}
        onLdesignChange={(e) => setSearchType(e.detail)}
        style={{ width: '110px' }}
      >
        <ldesign-option value="user">用户</ldesign-option>
        <ldesign-option value="post">文章</ldesign-option>
      </ldesign-select>
      <ldesign-input
        value={keyword}
        onLdesignInput={(e) => setKeyword(e.detail)}
        placeholder="请输入关键词"
        style={{ width: '200px' }}
      />
      <ldesign-button type="primary" onClick={handleSearch}>
        搜索
      </ldesign-button>
    </ldesign-input-group>
  );
}
```

## API

### InputGroup Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `compact` | 紧凑模式（无间隙） | `boolean` | `false` |
| `custom-class` | 自定义类名 | `string` | - |

### InputGroupAddon

前后缀组件，用于显示输入框的前后缀内容。

```html
<ldesign-input-group compact>
  <ldesign-input-group-addon>前缀</ldesign-input-group-addon>
  <ldesign-input></ldesign-input>
  <ldesign-input-group-addon>后缀</ldesign-input-group-addon>
</ldesign-input-group>
```

## 使用场景

### 搜索功能

```html
<ldesign-input-group compact>
  <ldesign-input placeholder="搜索关键词"></ldesign-input>
  <ldesign-button type="primary">
    <ldesign-icon name="search"></ldesign-icon>
    搜索
  </ldesign-button>
</ldesign-input-group>
```

### URL 输入

```html
<ldesign-input-group compact>
  <ldesign-select style="width: 90px">
    <ldesign-option value="http://">http://</ldesign-option>
    <ldesign-option value="https://">https://</ldesign-option>
  </ldesign-select>
  <ldesign-input placeholder="www.example.com"></ldesign-input>
</ldesign-input-group>
```

### 金额输入

```html
<ldesign-input-group compact>
  <ldesign-input-group-addon>¥</ldesign-input-group-addon>
  <ldesign-input-number placeholder="0.00"></ldesign-input-number>
</ldesign-input-group>
```

### 时间范围

```html
<ldesign-input-group compact>
  <ldesign-date-picker placeholder="开始日期"></ldesign-date-picker>
  <ldesign-input-group-addon>至</ldesign-input-group-addon>
  <ldesign-date-picker placeholder="结束日期"></ldesign-date-picker>
</ldesign-input-group>
```

## 最佳实践

### 1. 合理使用紧凑模式

- **紧凑模式**: 适合关系紧密的控件（如协议+域名）
- **普通模式**: 适合关系相对独立的控件

```html
<!-- ✅ 好：关系紧密，使用紧凑模式 -->
<ldesign-input-group compact>
  <ldesign-input-group-addon>https://</ldesign-input-group-addon>
  <ldesign-input></ldesign-input>
</ldesign-input-group>

<!-- ✅ 好：关系独立，使用普通模式 -->
<ldesign-input-group>
  <ldesign-input></ldesign-input>
  <ldesign-button>提交</ldesign-button>
</ldesign-input-group>
```

### 2. 控制宽度

合理设置各个控件的宽度，避免布局混乱。

```html
<ldesign-input-group compact>
  <ldesign-select style="width: 100px"></ldesign-select>
  <ldesign-input style="width: 200px"></ldesign-input>
  <ldesign-button>搜索</ldesign-button>
</ldesign-input-group>
```

### 3. 统一尺寸

组内的所有控件建议使用统一尺寸。

```html
<!-- ✅ 好：统一使用 medium -->
<ldesign-input-group size="medium" compact>
  <ldesign-input></ldesign-input>
  <ldesign-button>搜索</ldesign-button>
</ldesign-input-group>

<!-- ❌ 不好：尺寸不一致 -->
<ldesign-input-group compact>
  <ldesign-input size="small"></ldesign-input>
  <ldesign-button size="large">搜索</ldesign-button>
</ldesign-input-group>
```

### 4. 避免过度嵌套

不要在 InputGroup 中嵌套另一个 InputGroup。

```html
<!-- ❌ 不好：嵌套 InputGroup -->
<ldesign-input-group>
  <ldesign-input-group>
    ...
  </ldesign-input-group>
</ldesign-input-group>
```

## 相关组件

- [Input 输入框](./input.md)
- [Select 选择器](./select.md)
- [Button 按钮](./button.md)
- [DatePicker 日期选择器](./date-picker.md)
