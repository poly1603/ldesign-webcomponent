# Watermark 水印

为页面添加防删除水印。

## 何时使用

- 需要保护页面内容
- 防止截图泄露
- 版权声明

## 基础用法

:::demo

```html
<ldesign-watermark content="LDesign" style="height: 300px;">
  <ldesign-card title="内容区域">
    <p>这里是需要添加水印的内容。</p>
    <p>水印会覆盖整个区域。</p>
  </ldesign-card>
</ldesign-watermark>
```

:::

## 多行文字

:::demo

```html
<ldesign-watermark 
  content='["保密文档", "请勿外传"]'
  style="height: 300px;"
>
  <div style="padding: 24px; background: white;">
    <h3>保密内容</h3>
    <p>这是一段保密内容...</p>
  </div>
</ldesign-watermark>
```

:::

## 图片水印

:::demo

```html
<ldesign-watermark 
  image="https://via.placeholder.com/120x60/7334cb/ffffff?text=LOGO"
  style="height: 300px;"
>
  <div style="padding: 24px; background: white;">
    <p>使用图片作为水印</p>
  </div>
</ldesign-watermark>
```

:::

## 自定义配置

:::demo

```html
<ldesign-watermark 
  content="Confidential"
  width="150"
  height="80"
  rotate="-30"
  opacity="0.2"
  font-size="16"
  font-color="rgba(255, 0, 0, 0.3)"
  gap-x="120"
  gap-y="120"
  style="height: 300px;"
>
  <div style="padding: 24px; background: white;">
    <h3>自定义水印样式</h3>
    <p>可以自定义大小、旋转角度、透明度、颜色等。</p>
  </div>
</ldesign-watermark>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | `string \| string[]` | - | 水印文字 |
| image | `string` | - | 水印图片URL |
| width | `number` | `120` | 水印宽度 |
| height | `number` | `64` | 水印高度 |
| rotate | `number` | `-22` | 旋转角度 |
| opacity | `number` | `0.15` | 透明度（0-1） |
| fontSize | `number` | `14` | 字体大小 |
| fontColor | `string` | `'rgba(0,0,0,0.15)'` | 字体颜色 |
| gapX | `number` | `100` | 水平间距 |
| gapY | `number` | `100` | 垂直间距 |
| zIndex | `number` | `9` | z-index层级 |

## 特性

- ✅ 防删除机制（使用 MutationObserver）
- ✅ 支持文字和图片水印
- ✅ 完全可定制样式
- ✅ 不影响页面交互

