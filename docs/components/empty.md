# Empty 空状态

空状态占位图。

## 何时使用

- 列表为空时
- 搜索无结果时
- 数据加载失败时

## 基础用法

:::demo

```html
<ldesign-empty description="暂无数据"></ldesign-empty>
```

:::

## 不同类型

:::demo

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
  <div>
    <h4>默认</h4>
    <ldesign-empty image-type="default" description="暂无数据"></ldesign-empty>
  </div>
  
  <div>
    <h4>简单</h4>
    <ldesign-empty image-type="simple" description="空空如也"></ldesign-empty>
  </div>
  
  <div>
    <h4>搜索</h4>
    <ldesign-empty image-type="search" description="未找到结果"></ldesign-empty>
  </div>
</div>
```

:::

## 自定义操作

:::demo

```html
<ldesign-empty description="还没有数据">
  <ldesign-button type="primary">立即创建</ldesign-button>
</ldesign-empty>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| description | `string` | `'暂无数据'` | 描述文字 |
| image | `string` | - | 自定义图片URL |
| imageSize | `'small' \| 'medium' \| 'large'` | `'medium'` | 图片大小 |
| imageType | `'default' \| 'simple' \| 'search'` | `'default'` | 预设图片类型 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义底部内容（通常放置操作按钮） |

