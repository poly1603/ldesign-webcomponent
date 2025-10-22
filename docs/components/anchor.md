# Anchor 锚点

用于跳转到页面指定位置。

## 何时使用

- 需要在页面内快速定位
- 长文档导航

## 基础用法

:::demo

```html
<div style="display: flex; gap: 24px;">
  <ldesign-anchor style="width: 200px;">
    <ldesign-anchor-link href="#basic" title="基础用法"></ldesign-anchor-link>
    <ldesign-anchor-link href="#api" title="API">
      <ldesign-anchor-link href="#props" title="Props"></ldesign-anchor-link>
      <ldesign-anchor-link href="#events" title="Events"></ldesign-anchor-link>
    </ldesign-anchor-link>
  </ldesign-anchor>
  
  <div style="flex: 1;">
    <div id="basic" style="height: 400px; background: #f5f5f5; padding: 20px;">
      <h3>基础用法</h3>
      <p>内容...</p>
    </div>
    
    <div id="api" style="height: 400px; background: #fafafa; padding: 20px;">
      <h3>API</h3>
      <div id="props" style="margin-top: 100px;">
        <h4>Props</h4>
      </div>
      <div id="events" style="margin-top: 100px;">
        <h4>Events</h4>
      </div>
    </div>
  </div>
</div>
```

:::

## API

### Anchor Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| affix | `boolean` | `true` | 固定位置 |
| offsetTop | `number` | `0` | 距离顶部偏移 |
| container | `string` | - | 滚动容器选择器 |

### AnchorLink Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| href | `string` | - | 锚点链接（必需） |
| title | `string` | - | 文字内容（必需） |

