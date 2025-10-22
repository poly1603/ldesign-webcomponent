# Timeline 时间轴

垂直展示的时间流信息。

## 何时使用

- 展示时间流程
- 展示历史记录
- 展示操作日志

## 基础用法

:::demo

```html
<ldesign-timeline>
  <ldesign-timeline-item color="primary" timestamp="2024-01-01">
    创建项目
  </ldesign-timeline-item>
  <ldesign-timeline-item color="success" timestamp="2024-02-15">
    完成开发
  </ldesign-timeline-item>
  <ldesign-timeline-item color="primary" timestamp="2024-03-20">
    发布上线
  </ldesign-timeline-item>
</ldesign-timeline>
```

:::

## 自定义图标

:::demo

```html
<ldesign-timeline>
  <ldesign-timeline-item icon="check" color="success">
    任务完成
  </ldesign-timeline-item>
  <ldesign-timeline-item icon="clock" color="primary">
    进行中
  </ldesign-timeline-item>
  <ldesign-timeline-item icon="x" color="error">
    任务失败
  </ldesign-timeline-item>
</ldesign-timeline>
```

:::

## API

### Timeline Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| mode | `'left' \| 'right' \| 'alternate'` | `'left'` | 时间轴模式 |
| reverse | `boolean` | `false` | 是否反转 |

### TimelineItem Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| color | `'primary' \| 'success' \| 'warning' \| 'error' \| 'gray'` | `'primary'` | 节点颜色 |
| icon | `string` | - | 自定义图标 |
| timestamp | `string` | - | 时间戳 |
| label | `string` | - | 标签文字 |

