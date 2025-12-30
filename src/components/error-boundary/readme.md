# ldesign-error-boundary

错误边界组件，用于捕获子组件中的错误，防止整个应用崩溃。

## 基础用法

```html
<ldesign-error-boundary>
  <your-component></your-component>
</ldesign-error-boundary>
```

## 自定义错误UI

```html
<ldesign-error-boundary
  error-title="加载失败"
  error-message="请稍后重试"
  show-details="true"
>
  <complex-component></complex-component>
</ldesign-error-boundary>
```

## 自定义Fallback

```html
<ldesign-error-boundary>
  <your-component></your-component>
  
  <div slot="fallback">
    <h3>自定义错误提示</h3>
    <p>请联系技术支持</p>
  </div>
</ldesign-error-boundary>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| showDetails | `boolean` | `false` | 是否显示错误详情 |
| errorTitle | `string` | `'组件加载失败'` | 错误标题 |
| errorMessage | `string` | `'抱歉，组件遇到了一些问题'` | 错误描述 |
| showRetry | `boolean` | `true` | 是否显示重试按钮 |
| retryText | `string` | `'重试'` | 重试按钮文本 |
| errorIcon | `string` | `'alert-circle'` | 错误图标 |
| autoReport | `boolean` | `true` | 自动上报错误 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| ldesignError | 错误发生时触发 | `{ error: Error, errorInfo?: string }` |
| ldesignRetry | 点击重试时触发 | - |

### Slots

| 名称 | 说明 |
|------|------|
| - | 默认插槽，包裹需要错误保护的内容 |
| fallback | 自定义错误展示内容 |

## 错误上报集成

```javascript
// 集成Sentry或其他监控服务
window.errorReporter = {
  log(errorInfo) {
    // Sentry.captureException(errorInfo.error);
    console.log('Error reported:', errorInfo);
  }
};
```
