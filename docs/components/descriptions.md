# Descriptions 描述列表

成组展示多个只读字段。

## 何时使用

- 详情页面展示数据
- 信息展示卡片

## 基础用法

:::demo

```html
<ldesign-descriptions title="用户信息">
  <ldesign-descriptions-item label="姓名">张三</ldesign-descriptions-item>
  <ldesign-descriptions-item label="手机号">1234567890</ldesign-descriptions-item>
  <ldesign-descriptions-item label="居住地">北京市朝阳区</ldesign-descriptions-item>
  <ldesign-descriptions-item label="备注" span="2">
    这是一段很长的备注信息，可以跨越多列显示。
  </ldesign-descriptions-item>
  <ldesign-descriptions-item label="邮箱">zhangsan@example.com</ldesign-descriptions-item>
</ldesign-descriptions>
```

:::

## 带边框

:::demo

```html
<ldesign-descriptions title="用户信息" bordered column="2">
  <ldesign-descriptions-item label="姓名">张三</ldesign-descriptions-item>
  <ldesign-descriptions-item label="年龄">28</ldesign-descriptions-item>
  <ldesign-descriptions-item label="邮箱" span="2">zhangsan@example.com</ldesign-descriptions-item>
  <ldesign-descriptions-item label="地址" span="2">北京市朝阳区某某街道</ldesign-descriptions-item>
</ldesign-descriptions>
```

:::

## API

### Descriptions Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | - | 标题 |
| column | `number` | `3` | 列数 |
| bordered | `boolean` | `false` | 是否显示边框 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| layout | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局 |

### DescriptionsItem Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 标签 |
| span | `number` | `1` | 跨列数 |

