# Descriptions 描述列表

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## 代码演示

### 基础用法

简单的展示。

<div class="demo-container">
  <ldesign-descriptions title="用户信息">
    <ldesign-descriptions-item label="姓名">张三</ldesign-descriptions-item>
    <ldesign-descriptions-item label="手机号">1810000000</ldesign-descriptions-item>
    <ldesign-descriptions-item label="居住地">浙江杭州</ldesign-descriptions-item>
    <ldesign-descriptions-item label="备注">无</ldesign-descriptions-item>
  </ldesign-descriptions>
</div>

```html
<ldesign-descriptions title="用户信息">
  <ldesign-descriptions-item label="姓名">张三</ldesign-descriptions-item>
  <ldesign-descriptions-item label="手机号">1810000000</ldesign-descriptions-item>
  <ldesign-descriptions-item label="地址">杭州</ldesign-descriptions-item>
</ldesign-descriptions>
```

### 带边框

带边框和背景颜色。

<div class="demo-container">
  <ldesign-descriptions title="用户信息" bordered>
    <ldesign-descriptions-item label="姓名">张三</ldesign-descriptions-item>
    <ldesign-descriptions-item label="手机号">1810000000</ldesign-descriptions-item>
    <ldesign-descriptions-item label="居住地">浙江杭州</ldesign-descriptions-item>
  </ldesign-descriptions>
</div>

```html
<ldesign-descriptions bordered>
  ...
</ldesign-descriptions>
```

### 响应式

通过 `column` 属性设置一行展示的列数。

```html
<ldesign-descriptions column="3">
  <ldesign-descriptions-item label="姓名">张三</ldesign-descriptions-item>
  <ldesign-descriptions-item label="手机号">1810000000</ldesign-descriptions-item>
  <ldesign-descriptions-item label="地址">杭州</ldesign-descriptions-item>
</ldesign-descriptions>
```

## 框架集成

### Vue 3

```vue
<script setup>
const userInfo = {
  name: '张三',
  phone: '1810000000',
  address: '浙江杭州',
  remark: '无'
};
</script>

<template>
  <ldesign-descriptions title="用户信息" bordered>
    <ldesign-descriptions-item label="姓名">
      {{ userInfo.name }}
    </ldesign-descriptions-item>
    <ldesign-descriptions-item label="手机号">
      {{ userInfo.phone }}
    </ldesign-descriptions-item>
    <ldesign-descriptions-item label="地址">
      {{ userInfo.address }}
    </ldesign-descriptions-item>
  </ldesign-descriptions>
</template>
```

### React

```tsx
function App() {
  const userInfo = {
    name: '张三',
    phone: '1810000000',
    address: '浙江杭州'
  };
  
  return (
    <ldesign-descriptions title="用户信息" bordered>
      <ldesign-descriptions-item label="姓名">
        {userInfo.name}
      </ldesign-descriptions-item>
      <ldesign-descriptions-item label="手机号">
        {userInfo.phone}
      </ldesign-descriptions-item>
      <ldesign-descriptions-item label="地址">
        {userInfo.address}
      </ldesign-descriptions-item>
    </ldesign-descriptions>
  );
}
```

## API

### Descriptions Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `title` | 描述列表的标题 | `string` | - |
| `bordered` | 是否展示边框 | `boolean` | `false` |
| `column` | 一行的 DescriptionItems 数量 | `number` | `3` |
| `size` | 设置列表的大小 | `'default' \| 'middle' \| 'small'` | `'default'` |

### DescriptionsItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `label` | 内容的描述 | `string` | - |
| `span` | 包含列的数量 | `number` | `1` |

### DescriptionsItem Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 内容 |

## 相关组件

- [Card 卡片](./card.md)
- [List 列表](./list.md)
