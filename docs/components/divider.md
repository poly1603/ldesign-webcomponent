# Divider 分割线

区隔内容的分割线。

## 何时使用

- 分隔不同章节的内容
- 分割行内文字

## 基础用法

:::demo

```html
<p>段落内容</p>
<ldesign-divider></ldesign-divider>
<p>另一段内容</p>
```

:::

## 带文字

:::demo

```html
<p>上方内容</p>
<ldesign-divider text="分割线文字"></ldesign-divider>
<p>下方内容</p>

<ldesign-divider text="左侧文字" text-position="left"></ldesign-divider>
<ldesign-divider text="右侧文字" text-position="right"></ldesign-divider>
```

:::

## 虚线

:::demo

```html
<ldesign-divider dashed></ldesign-divider>
<ldesign-divider text="虚线分割" dashed></ldesign-divider>
```

:::

## 垂直分割线

:::demo

```html
<div>
  文字1
  <ldesign-divider direction="vertical"></ldesign-divider>
  文字2
  <ldesign-divider direction="vertical"></ldesign-divider>
  文字3
</div>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| textPosition | `'left' \| 'center' \| 'right'` | `'center'` | 文字位置 |
| dashed | `boolean` | `false` | 是否虚线 |
| text | `string` | - | 文字内容 |

