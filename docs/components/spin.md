# Spin 加载指示器

用于页面和区块的加载中状态。

## 何时使用

- 页面局部处于等待异步数据或正在渲染过程时
- 需要一个简洁的加载动画

## 基础用法

:::demo

```html
<ldesign-spin></ldesign-spin>
```

:::

## 不同尺寸

:::demo

```html
<div style="display: flex; gap: 32px; align-items: center;">
  <ldesign-spin size="small"></ldesign-spin>
  <ldesign-spin size="medium"></ldesign-spin>
  <ldesign-spin size="large"></ldesign-spin>
</div>
```

:::

## 带提示文字

:::demo

```html
<ldesign-spin tip="加载中..." size="large"></ldesign-spin>
```

:::

## 包裹内容

:::demo

```html
<div id="spinDemo">
  <ldesign-button id="toggleSpin" type="primary">切换加载状态</ldesign-button>
  <br><br>
  
  <ldesign-spin id="contentSpin" spinning="false" tip="加载中...">
    <ldesign-card title="内容区域">
      <p>这是一些内容</p>
      <p>更多内容...</p>
    </ldesign-card>
  </ldesign-spin>
</div>

<script>
const btn = document.getElementById('toggleSpin');
const spin = document.getElementById('contentSpin');

btn.addEventListener('ldesignClick', () => {
  spin.spinning = !spin.spinning;
});
</script>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| spinning | `boolean` | `true` | 是否旋转 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| tip | `string` | - | 提示文字 |
| delay | `number` | `0` | 延迟显示（毫秒） |
| icon | `string` | - | 自定义图标 |

