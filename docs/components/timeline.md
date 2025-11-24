# Timeline 时间轴

垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时。
- 需要有一条时间轴进行视觉上的串联时。

## 代码演示

### 基础用法

基本的时间轴。

<div class="demo-container">
  <ldesign-timeline>
    <ldesign-timeline-item>创建服务现场 2015-09-01</ldesign-timeline-item>
    <ldesign-timeline-item>初步排除网络异常 2015-09-01</ldesign-timeline-item>
    <ldesign-timeline-item>技术测试异常 2015-09-01</ldesign-timeline-item>
    <ldesign-timeline-item>网络异常正在修复 2015-09-01</ldesign-timeline-item>
  </ldesign-timeline>
</div>

```html
<ldesign-timeline>
  <ldesign-timeline-item>事件 1</ldesign-timeline-item>
  <ldesign-timeline-item>事件 2</ldesign-timeline-item>
  <ldesign-timeline-item>事件 3</ldesign-timeline-item>
</ldesign-timeline>
```

### 不同颜色

圆圈颜色，表示不同的状态。

<div class="demo-container">
  <ldesign-timeline>
    <ldesign-timeline-item color="primary">默认状态</ldesign-timeline-item>
    <ldesign-timeline-item color="success">成功状态</ldesign-timeline-item>
    <ldesign-timeline-item color="warning">警告状态</ldesign-timeline-item>
    <ldesign-timeline-item color="danger">错误状态</ldesign-timeline-item>
  </ldesign-timeline>
</div>

```html
<ldesign-timeline>
  <ldesign-timeline-item color="success">成功</ldesign-timeline-item>
  <ldesign-timeline-item color="warning">警告</ldesign-timeline-item>
  <ldesign-timeline-item color="danger">错误</ldesign-timeline-item>
</ldesign-timeline>
```

### 自定义图标

可以自定义时间轴点的图标。

<div class="demo-container">
  <ldesign-timeline>
    <ldesign-timeline-item icon="clock">创建时间</ldesign-timeline-item>
    <ldesign-timeline-item icon="check-circle" color="success">审核通过</ldesign-timeline-item>
    <ldesign-timeline-item icon="x-circle" color="danger">审核失败</ldesign-timeline-item>
  </ldesign-timeline>
</div>

```html
<ldesign-timeline>
  <ldesign-timeline-item icon="clock">创建</ldesign-timeline-item>
  <ldesign-timeline-item icon="check-circle">完成</ldesign-timeline-item>
</ldesign-timeline>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const activities = ref([
  { content: '创建服务', timestamp: '2023-01-01', color: 'primary' },
  { content: '通过审核', timestamp: '2023-01-02', color: 'success' },
  { content: '发布成功', timestamp: '2023-01-03', color: 'success' }
]);
</script>

<template>
  <ldesign-timeline>
    <ldesign-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :color="activity.color"
    >
      {{ activity.content }}
      <p>{{ activity.timestamp }}</p>
    </ldesign-timeline-item>
  </ldesign-timeline>
</template>
```

### React

```tsx
function App() {
  const activities = [
    { content: '创建服务', timestamp: '2023-01-01', color: 'primary' },
    { content: '通过审核', timestamp: '2023-01-02', color: 'success' },
    { content: '发布成功', timestamp: '2023-01-03', color: 'success' }
  ];
  
  return (
    <ldesign-timeline>
      {activities.map((activity, index) => (
        <ldesign-timeline-item key={index} color={activity.color}>
          {activity.content}
          <p>{activity.timestamp}</p>
        </ldesign-timeline-item>
      ))}
    </ldesign-timeline>
  );
}
```

## API

### Timeline Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `mode` | 时间轴和内容的相对位置 | `'left' \| 'right' \| 'alternate'` | `'left'` |
| `reverse` | 是否倒序 | `boolean` | `false` |

### TimelineItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `color` | 圆圈颜色 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| `icon` | 自定义图标 | `string` | - |

### TimelineItem Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 时间轴内容 |
| `dot` | 自定义时间轴点 |

## 相关组件

- [Steps 步骤条](./steps.md)
