# Alert 警告提示

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 代码演示

### 基础用法

最简单的用法，适用于简短的警告提示。

<div class="demo-container">
  <ldesign-alert type="info" description="这是一条提示信息"></ldesign-alert>
  <ldesign-alert type="success" description="这是一条成功信息"></ldesign-alert>
  <ldesign-alert type="warning" description="这是一条警告信息"></ldesign-alert>
  <ldesign-alert type="error" description="这是一条错误信息"></ldesign-alert>
</div>

```html
<ldesign-alert type="info" description="提示信息"></ldesign-alert>
<ldesign-alert type="success" description="成功信息"></ldesign-alert>
<ldesign-alert type="warning" description="警告信息"></ldesign-alert>
<ldesign-alert type="error" description="错误信息"></ldesign-alert>
```

### 可关闭的警告提示

显示关闭按钮，点击可关闭警告提示。

<div class="demo-container">
  <ldesign-alert type="info" description="可关闭的提示信息" closable></ldesign-alert>
  <ldesign-alert type="success" description="可关闭的成功信息" closable></ldesign-alert>
</div>

```html
<ldesign-alert 
  type="info" 
  description="可关闭的提示" 
  closable>
</ldesign-alert>
```

### 含有标题

含有标题和辅助性文字介绍的警告提示。

<div class="demo-container">
  <ldesign-alert 
    type="success" 
    alert-title="成功提示" 
    description="这是一条带有标题的成功提示信息，包含详细的描述内容。">
  </ldesign-alert>
  
  <ldesign-alert 
    type="error" 
    alert-title="错误提示" 
    description="这是一条带有标题的错误提示信息，请及时处理。"
    closable>
  </ldesign-alert>
</div>

```html
<ldesign-alert 
  type="success" 
  alert-title="成功提示" 
  description="详细描述内容">
</ldesign-alert>
```

### 不同样式变体

提供 filled、outlined、light、gradient 四种样式变体。

<div class="demo-container">
  <ldesign-alert type="info" variant="filled" description="填充样式"></ldesign-alert>
  <ldesign-alert type="info" variant="outlined" description="描边样式"></ldesign-alert>
  <ldesign-alert type="info" variant="light" description="浅色样式"></ldesign-alert>
  <ldesign-alert type="info" variant="gradient" description="渐变样式"></ldesign-alert>
</div>

```html
<ldesign-alert variant="filled">填充样式</ldesign-alert>
<ldesign-alert variant="outlined">描边样式</ldesign-alert>
<ldesign-alert variant="light">浅色样式</ldesign-alert>
<ldesign-alert variant="gradient">渐变样式</ldesign-alert>
```

### 不同尺寸

提供 small、medium、large 三种尺寸。

<div class="demo-container">
  <ldesign-alert size="small" type="info" description="小尺寸提示"></ldesign-alert>
  <ldesign-alert size="medium" type="info" description="中尺寸提示"></ldesign-alert>
  <ldesign-alert size="large" type="info" description="大尺寸提示"></ldesign-alert>
</div>

```html
<ldesign-alert size="small">小尺寸</ldesign-alert>
<ldesign-alert size="medium">中尺寸</ldesign-alert>
<ldesign-alert size="large">大尺寸</ldesign-alert>
```

### 带图标

显示图标可以更清晰地表达提示类型。

<div class="demo-container">
  <ldesign-alert type="info" description="带图标的提示信息" show-icon></ldesign-alert>
  <ldesign-alert type="success" description="带图标的成功信息" show-icon></ldesign-alert>
  <ldesign-alert type="warning" description="带图标的警告信息" show-icon></ldesign-alert>
  <ldesign-alert type="error" description="带图标的错误信息" show-icon></ldesign-alert>
</div>

```html
<ldesign-alert type="info" show-icon>
  带图标的提示
</ldesign-alert>
```

### 自定义图标

可以自定义图标。

<div class="demo-container">
  <ldesign-alert 
    type="info" 
    icon-name="heart" 
    description="自定义图标"
    show-icon>
  </ldesign-alert>
  
  <ldesign-alert 
    type="success" 
    icon-name="star" 
    description="自定义星星图标"
    show-icon>
  </ldesign-alert>
</div>

```html
<ldesign-alert 
  type="info" 
  icon-name="heart"
  show-icon>
  自定义图标
</ldesign-alert>
```

### 横幅样式

页面顶部通告形式，带有背景色。

<div class="demo-container">
  <ldesign-alert 
    type="warning" 
    description="系统将在今晚 22:00 进行维护，请提前保存数据。"
    banner
    closable>
  </ldesign-alert>
</div>

```html
<ldesign-alert 
  type="warning" 
  description="系统维护通知"
  banner
  closable>
</ldesign-alert>
```

### 带阴影

为警告提示添加阴影效果。

<div class="demo-container">
  <ldesign-alert 
    type="info" 
    description="带阴影的提示信息"
    shadow>
  </ldesign-alert>
</div>

```html
<ldesign-alert shadow>
  带阴影效果
</ldesign-alert>
```

### 跑马灯效果

当内容过长时，可以使用跑马灯效果。

<div class="demo-container">
  <ldesign-alert 
    type="info" 
    description="这是一条很长很长很长很长很长很长很长很长很长很长的滚动通知信息。"
    marquee
    banner>
  </ldesign-alert>
</div>

```html
<ldesign-alert 
  description="很长的通知内容..."
  marquee
  banner>
</ldesign-alert>
```

### 自定义操作

通过 slot 可以添加自定义操作按钮。

<div class="demo-container">
  <ldesign-alert 
    type="info" 
    alert-title="提示"
    description="这是一条带有操作按钮的提示信息">
    <div slot="actions">
      <ldesign-button size="small" type="text">查看详情</ldesign-button>
    </div>
  </ldesign-alert>
</div>

```html
<ldesign-alert type="info" alert-title="提示">
  提示内容
  
  <div slot="actions">
    <ldesign-button size="small">操作</ldesign-button>
  </div>
</ldesign-alert>
```

### 自定义内容

使用默认插槽可以自定义内容。

<div class="demo-container">
  <ldesign-alert type="success" show-icon>
    <strong>成功提示：</strong>
    <p style="margin: 8px 0 0;">您的操作已成功完成，系统已自动保存。</p>
    <ul style="margin: 8px 0; padding-left: 20px;">
      <li>数据已备份</li>
      <li>相关用户已通知</li>
      <li>日志已记录</li>
    </ul>
  </ldesign-alert>
</div>

```html
<ldesign-alert type="success" show-icon>
  <strong>成功提示：</strong>
  <p>详细内容...</p>
  <ul>
    <li>项目1</li>
    <li>项目2</li>
  </ul>
</ldesign-alert>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const visible = ref(true);

const handleClose = () => {
  visible.value = false;
};
</script>

<template>
  <ldesign-alert
    v-if="visible"
    type="success"
    description="可关闭的提示"
    closable
    @ldesignClose="handleClose"
  />
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  return (
    <ldesign-alert
      type="success"
      description="可关闭的提示"
      closable
      onLdesignClose={() => setVisible(false)}
    />
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 警告类型 | `'info' \| 'success' \| 'warning' \| 'error' \| 'custom'` | `'info'` |
| `variant` | 样式变体 | `'filled' \| 'outlined' \| 'light' \| 'gradient'` | `'light'` |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `alert-title` | 标题 | `string` | - |
| `description` | 描述内容 | `string` | - |
| `closable` | 是否可关闭 | `boolean` | `false` |
| `show-icon` | 是否显示图标 | `boolean` | `true` |
| `icon-name` | 自定义图标 | `string` | - |
| `color` | 自定义颜色（type为custom时） | `string` | - |
| `banner` | 横幅样式 | `boolean` | `false` |
| `shadow` | 阴影效果 | `boolean` | `false` |
| `animated` | 动画效果 | `boolean` | `true` |
| `compact` | 紧凑模式 | `boolean` | `false` |
| `rounded` | 圆角 | `boolean` | `true` |
| `marquee` | 跑马灯效果 | `boolean` | `false` |
| `marquee-speed` | 跑马灯速度(px/s) | `number` | `60` |
| `marquee-pause-on-hover` | 悬停时暂停 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignClose` | 关闭时触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义内容 |
| `actions` | 自定义操作按钮 |

## 相关组件

- [Message 消息提示](./message.md)
- [Notification 通知](./notification.md)
