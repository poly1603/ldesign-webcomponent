# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 何时使用

- 任务需要多步骤完成
- 需要明确的流程指引
- 需要展示当前进度

## 基础用法

:::demo

```html
<ldesign-steps current="1">
  <ldesign-step-item title="已完成" description="这是描述"></ldesign-step-item>
  <ldesign-step-item title="进行中" description="这是描述"></ldesign-step-item>
  <ldesign-step-item title="待进行" description="这是描述"></ldesign-step-item>
</ldesign-steps>
```

:::

## 带图标

:::demo

```html
<ldesign-steps current="1">
  <ldesign-step-item title="登录" icon="user"></ldesign-step-item>
  <ldesign-step-item title="验证" icon="shield"></ldesign-step-item>
  <ldesign-step-item title="完成" icon="check"></ldesign-step-item>
</ldesign-steps>
```

:::

## 状态

:::demo

```html
<ldesign-steps current="1" status="error">
  <ldesign-step-item title="步骤1"></ldesign-step-item>
  <ldesign-step-item title="步骤2（错误）"></ldesign-step-item>
  <ldesign-step-item title="步骤3"></ldesign-step-item>
</ldesign-steps>
```

:::

## API

### Steps Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| current | `number` | `0` | 当前步骤 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| size | `'small' \| 'default'` | `'default'` | 尺寸 |
| status | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'` | 当前状态 |

### StepItem Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | - | 标题 |
| description | `string` | - | 描述 |
| icon | `string` | - | 图标 |

