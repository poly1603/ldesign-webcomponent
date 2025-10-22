# Result 结果页

用于反馈一系列操作任务的处理结果。

## 何时使用

- 提交表单后显示结果
- 操作成功/失败反馈
- 404、403、500 等异常页面

## 成功状态

:::demo

```html
<ldesign-result 
  status="success" 
  title="提交成功" 
  sub-title="您的订单已提交，我们将尽快处理"
>
  <ldesign-button type="primary">返回首页</ldesign-button>
</ldesign-result>
```

:::

## 错误状态

:::demo

```html
<ldesign-result 
  status="error" 
  title="提交失败" 
  sub-title="请检查网络连接后重试"
>
  <ldesign-button type="primary">重试</ldesign-button>
  <ldesign-button>返回</ldesign-button>
</ldesign-result>
```

:::

## 404 页面

:::demo

```html
<ldesign-result 
  status="404" 
  title="404" 
  sub-title="抱歉，您访问的页面不存在"
>
  <ldesign-button type="primary">返回首页</ldesign-button>
</ldesign-result>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| status | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500'` | `'info'` | 结果状态 |
| title | `string` | - | 标题 |
| subTitle | `string` | - | 副标题 |
| icon | `string` | - | 自定义图标 |

