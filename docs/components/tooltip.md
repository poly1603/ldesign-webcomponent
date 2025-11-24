# Tooltip 文字提示

简洁的文字提示气泡框，用于鼠标悬停时显示补充说明信息。基于最新的 Popup 组件封装，支持丰富的交互和样式特性。

## 何时使用

- 需要为用户提供简短的辅助说明时
- 图标、缩略文本需要完整信息展示时
- 表单字段需要额外的帮助提示时
- 操作按钮需要说明其功能时

## 代码演示

### 基础用法

最简单的用法，鼠标悬停时显示提示信息。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip content="这是一个提示信息">
      <ldesign-button>悬停显示提示</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="这是一段较长的提示文字，用来演示文本在Tooltip中的换行效果，当内容超过最大宽度时会自动换行显示">
      <ldesign-button>长文本提示</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="快速提示" show-delay="0" hide-delay="0">
      <ldesign-button>无延迟显示</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<!-- 基础提示 -->
<ldesign-tooltip content="这是一个提示信息">
  <ldesign-button>悬停显示提示</ldesign-button>
</ldesign-tooltip>

<!-- 长文本自动换行 -->
<ldesign-tooltip content="这是一段较长的提示文字...">
  <ldesign-button>长文本提示</ldesign-button>
</ldesign-tooltip>

<!-- 无延迟显示 -->
<ldesign-tooltip content="快速提示" show-delay="0" hide-delay="0">
  <ldesign-button>无延迟显示</ldesign-button>
</ldesign-tooltip>
```

### 12个弹出位置

支持 12 个方向的弹出位置，自动检测边界并调整。

<div class="demo-container">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">
    <ldesign-tooltip content="Top Left" placement="top-start">
      <ldesign-button>TL</ldesign-button>
    </ldesign-tooltip>
    <ldesign-tooltip content="Top" placement="top">
      <ldesign-button>Top</ldesign-button>
    </ldesign-tooltip>
    <ldesign-tooltip content="Top Right" placement="top-end">
      <ldesign-button>TR</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="Left Top" placement="left-start">
      <ldesign-button>LT</ldesign-button>
    </ldesign-tooltip>
    <div></div>
    <ldesign-tooltip content="Right Top" placement="right-start">
      <ldesign-button>RT</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="Left" placement="left">
      <ldesign-button>Left</ldesign-button>
    </ldesign-tooltip>
    <div></div>
    <ldesign-tooltip content="Right" placement="right">
      <ldesign-button>Right</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="Left Bottom" placement="left-end">
      <ldesign-button>LB</ldesign-button>
    </ldesign-tooltip>
    <div></div>
    <ldesign-tooltip content="Right Bottom" placement="right-end">
      <ldesign-button>RB</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="Bottom Left" placement="bottom-start">
      <ldesign-button>BL</ldesign-button>
    </ldesign-tooltip>
    <ldesign-tooltip content="Bottom" placement="bottom">
      <ldesign-button>Bottom</ldesign-button>
    </ldesign-tooltip>
    <ldesign-tooltip content="Bottom Right" placement="bottom-end">
      <ldesign-button>BR</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<ldesign-tooltip content="Top Left" placement="top-start">
  <ldesign-button>TL</ldesign-button>
</ldesign-tooltip>

<ldesign-tooltip content="Top" placement="top">
  <ldesign-button>Top</ldesign-button>
</ldesign-tooltip>

<ldesign-tooltip content="Right" placement="right">
  <ldesign-button>Right</ldesign-button>
</ldesign-tooltip>

<!-- 支持: top, top-start, top-end, bottom, bottom-start, bottom-end, 
     left, left-start, left-end, right, right-start, right-end -->
```

### 主题样式

支持深色（默认）和浅色两种主题。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip content="深色主题（默认）" theme="dark">
      <ldesign-button>深色主题</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="浅色主题" theme="light">
      <ldesign-button>浅色主题</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<!-- 深色主题（默认） -->
<ldesign-tooltip content="深色主题" theme="dark">
  <ldesign-button>深色主题</ldesign-button>
</ldesign-tooltip>

<!-- 浅色主题 -->
<ldesign-tooltip content="浅色主题" theme="light">
  <ldesign-button>浅色主题</ldesign-button>
</ldesign-tooltip>
```

### 触发方式

支持 hover（默认）、click、focus 三种触发方式。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip content="鼠标悬停触发" trigger="hover">
      <ldesign-button>Hover 触发</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="点击触发，点击外部关闭" trigger="click">
      <ldesign-button>Click 触发</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="获得焦点时触发" trigger="focus">
      <ldesign-button>Focus 触发</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<!-- Hover 触发（默认） -->
<ldesign-tooltip content="鼠标悬停触发" trigger="hover">
  <ldesign-button>Hover</ldesign-button>
</ldesign-tooltip>

<!-- Click 触发 -->
<ldesign-tooltip content="点击触发" trigger="click">
  <ldesign-button>Click</ldesign-button>
</ldesign-tooltip>

<!-- Focus 触发 -->
<ldesign-tooltip content="获得焦点时触发" trigger="focus">
  <ldesign-button>Focus</ldesign-button>
</ldesign-tooltip>
```

### 尺寸大小

提供 small、medium（默认）、large 三种尺寸。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip content="小号提示文字" size="small">
      <ldesign-button size="small">Small</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="中号提示文字" size="medium">
      <ldesign-button>Medium</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="大号提示文字" size="large">
      <ldesign-button size="large">Large</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<ldesign-tooltip content="小号提示" size="small">
  <ldesign-button size="small">Small</ldesign-button>
</ldesign-tooltip>

<ldesign-tooltip content="中号提示" size="medium">
  <ldesign-button>Medium</ldesign-button>
</ldesign-tooltip>

<ldesign-tooltip content="大号提示" size="large">
  <ldesign-button size="large">Large</ldesign-button>
</ldesign-tooltip>
```

### 动画效果

支持 fade、scale、slide 三种动画效果。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip content="淡入淡出动画" animation="fade">
      <ldesign-button>Fade 动画</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="缩放动画（默认）" animation="scale">
      <ldesign-button>Scale 动画</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="滑动动画" animation="slide">
      <ldesign-button>Slide 动画</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<ldesign-tooltip content="淡入淡出" animation="fade">
  <ldesign-button>Fade</ldesign-button>
</ldesign-tooltip>

<ldesign-tooltip content="缩放动画" animation="scale">
  <ldesign-button>Scale</ldesign-button>
</ldesign-tooltip>

<ldesign-tooltip content="滑动动画" animation="slide">
  <ldesign-button>Slide</ldesign-button>
</ldesign-tooltip>
```

### 可交互提示

允许鼠标移入 Tooltip 内容区域，适合需要复制文本或点击链接的场景。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip interactive trigger="hover">
      <span slot="content">
        <div style="padding: 4px 0;">
          <div style="margin-bottom: 8px;">可交互的提示内容</div>
          <a href="#" style="color: #1890ff;">点击查看详情 →</a>
        </div>
      </span>
      <ldesign-button>可交互提示</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<ldesign-tooltip interactive trigger="hover">
  <span slot="content">
    <div>可交互的提示内容</div>
    <a href="#">点击查看详情 →</a>
  </span>
  <ldesign-button>可交互提示</ldesign-button>
</ldesign-tooltip>
```

### 带标题的提示

使用 `tooltip-title` 属性添加标题。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip 
      tooltip-title="提示标题" 
      content="这里是详细的提示内容说明，可以包含更多信息。"
      max-width="300">
      <ldesign-button>带标题的提示</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<ldesign-tooltip 
  tooltip-title="提示标题" 
  content="这里是详细的提示内容"
  max-width="300">
  <ldesign-button>带标题的提示</ldesign-button>
</ldesign-tooltip>
```

### 自动关闭

设置 `auto-close-delay` 属性，Tooltip 在显示指定时间后自动关闭。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip 
      content="此提示将在3秒后自动关闭" 
      auto-close-delay="3000"
      trigger="click">
      <ldesign-button>3秒后自动关闭</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<ldesign-tooltip 
  content="此提示将在3秒后自动关闭" 
  auto-close-delay="3000"
  trigger="click">
  <ldesign-button>自动关闭</ldesign-button>
</ldesign-tooltip>
```

### 隐藏箭头

通过 `arrow="false"` 隐藏箭头指示器。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip content="有箭头的提示" arrow="true">
      <ldesign-button>带箭头</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="无箭头的提示" arrow="false">
      <ldesign-button>无箭头</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<!-- 默认显示箭头 -->
<ldesign-tooltip content="有箭头" arrow="true">
  <ldesign-button>带箭头</ldesign-button>
</ldesign-tooltip>

<!-- 隐藏箭头 -->
<ldesign-tooltip content="无箭头" arrow="false">
  <ldesign-button>无箭头</ldesign-button>
</ldesign-tooltip>
```

### 禁用状态

通过 `disabled` 属性禁用 Tooltip。

<div class="demo-container">
  <div class="demo-row">
    <ldesign-tooltip content="正常提示">
      <ldesign-button>正常状态</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip content="此提示已禁用" disabled>
      <ldesign-button>禁用状态</ldesign-button>
    </ldesign-tooltip>
  </div>
</div>

```html
<ldesign-tooltip content="此提示已禁用" disabled>
  <ldesign-button>禁用状态</ldesign-button>
</ldesign-tooltip>
```

## 框架集成

### Vue 3 使用

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent';

const tooltipContent = ref('这是一个动态提示内容');
const visible = ref(false);

const updateContent = () => {
  tooltipContent.value = `更新时间：${new Date().toLocaleTimeString()}`;
};

const toggleTooltip = () => {
  visible.value = !visible.value;
};
</script>

<template>
  <div class="tooltip-demo">
    <!-- 基础用法 -->
    <ldesign-tooltip content="简单的提示信息">
      <ldesign-button>基础提示</ldesign-button>
    </ldesign-tooltip>

    <!-- 动态内容 -->
    <ldesign-tooltip :content="tooltipContent">
      <ldesign-button @click="updateContent">
        动态内容
      </ldesign-button>
    </ldesign-tooltip>

    <!-- 手动控制 -->
    <ldesign-tooltip 
      content="手动控制显示隐藏"
      trigger="manual"
      :visible="visible">
      <ldesign-button @click="toggleTooltip">
        手动控制
      </ldesign-button>
    </ldesign-tooltip>

    <!-- 不同位置 -->
    <ldesign-tooltip 
      content="顶部提示" 
      placement="top">
      <ldesign-button>顶部</ldesign-button>
    </ldesign-tooltip>
    
    <ldesign-tooltip 
      content="右侧提示" 
      placement="right">
      <ldesign-button>右侧</ldesign-button>
    </ldesign-tooltip>
  </div>
</template>

<style scoped>
.tooltip-demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```

### React 使用

```tsx
import React, { useState } from 'react';
import '@ldesign/webcomponent';

function TooltipExample() {
  const [content, setContent] = useState('这是一个动态提示');
  const [visible, setVisible] = useState(false);

  const updateContent = () => {
    setContent(`更新时间：${new Date().toLocaleTimeString()}`);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {/* 基础用法 */}
      <ldesign-tooltip content="简单的提示信息">
        <ldesign-button>基础提示</ldesign-button>
      </ldesign-tooltip>

      {/* 动态内容 */}
      <ldesign-tooltip content={content}>
        <ldesign-button onClick={updateContent}>
          动态内容
        </ldesign-button>
      </ldesign-tooltip>

      {/* 手动控制 */}
      <ldesign-tooltip 
        content="手动控制显示隐藏"
        trigger="manual"
        visible={visible}>
        <ldesign-button onClick={() => setVisible(!visible)}>
          手动控制
        </ldesign-button>
      </ldesign-tooltip>

      {/* 不同主题 */}
      <ldesign-tooltip content="深色主题" theme="dark">
        <ldesign-button>深色</ldesign-button>
      </ldesign-tooltip>
      
      <ldesign-tooltip content="浅色主题" theme="light">
        <ldesign-button>浅色</ldesign-button>
      </ldesign-tooltip>
    </div>
  );
}

export default TooltipExample;
```

### Angular 使用

```typescript
import { Component } from '@angular/core';
import '@ldesign/webcomponent';

@Component({
  selector: 'app-tooltip',
  template: `
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <!-- 基础用法 -->
      <ldesign-tooltip content="简单的提示信息">
        <ldesign-button>基础提示</ldesign-button>
      </ldesign-tooltip>

      <!-- 动态内容 -->
      <ldesign-tooltip [attr.content]="tooltipContent">
        <ldesign-button (click)="updateContent()">
          动态内容
        </ldesign-button>
      </ldesign-tooltip>

      <!-- 手动控制 -->
      <ldesign-tooltip 
        content="手动控制显示隐藏"
        trigger="manual"
        [attr.visible]="visible">
        <ldesign-button (click)="toggleTooltip()">
          手动控制
        </ldesign-button>
      </ldesign-tooltip>

      <!-- 不同位置 -->
      <ldesign-tooltip 
        content="顶部提示" 
        placement="top">
        <ldesign-button>顶部</ldesign-button>
      </ldesign-tooltip>
    </div>
  `
})
export class TooltipComponent {
  tooltipContent = '这是一个动态提示';
  visible = false;

  updateContent() {
    this.tooltipContent = `更新时间：${new Date().toLocaleTimeString()}`;
  }

  toggleTooltip() {
    this.visible = !this.visible;
  }
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `content` | 提示内容文本 | `string` | **必需** |
| `placement` | 弹出位置，支持12个方向 | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` |
| `theme` | 主题样式 | `'dark' \| 'light'` | `'dark'` |
| `trigger` | 触发方式 | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` |
| `size` | 尺寸大小，影响字号和内边距 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `animation` | 动画效果类型 | `'fade' \| 'scale' \| 'slide'` | `'scale'` |
| `disabled` | 是否禁用 Tooltip | `boolean` | `false` |
| `arrow` | 是否显示箭头指示器 | `boolean` | `true` |
| `show-delay` | 显示延迟时间（毫秒） | `number` | `100` |
| `hide-delay` | 隐藏延迟时间（毫秒） | `number` | `100` |
| `max-width` | 最大宽度，支持数字（像素）或字符串（如 '300px'） | `number \| string` | `250` |
| `width` | 固定宽度，设置后会覆盖 maxWidth | `number \| string` | - |
| `offset-distance` | 与触发元素的间距（像素） | `number \| string` | `8` |
| `interactive` | 是否可交互，允许鼠标移入 Tooltip 内容区域 | `boolean` | `false` |
| `auto-close-delay` | 自动关闭延迟时间（毫秒），0表示不自动关闭 | `number` | `0` |
| `closable` | 是否显示关闭按钮（仅 click 触发时有效） | `boolean` | `false` |
| `tooltip-class` | 自定义 Tooltip 弹出层的类名 | `string` | - |
| `tooltip-title` | Tooltip 标题 | `string` | - |
| `visible` | 是否显示（仅 trigger 为 manual 时生效） | `boolean` | `false` |
| `motion-duration` | 动画持续时间（毫秒） | `number` | `200` |
| `motion-distance` | 动画位移距离（像素） | `number` | `10` |
| `lock-on-scroll` | 是否在滚动时锁定位置，防止抖动 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 触发 Tooltip 的元素 |
| content | 自定义 Tooltip 内容（优先级高于 content 属性） |

### 样式变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--tooltip-bg-dark` | `rgba(0, 0, 0, 0.85)` | 深色主题背景色 |
| `--tooltip-bg-light` | `#fff` | 浅色主题背景色 |
| `--tooltip-color-dark` | `#fff` | 深色主题文字颜色 |
| `--tooltip-color-light` | `rgba(0, 0, 0, 0.85)` | 浅色主题文字颜色 |
| `--tooltip-shadow-light` | `0 2px 8px rgba(0, 0, 0, 0.15)` | 浅色主题阴影 |
| `--tooltip-padding-small` | `4px 8px` | 小号内边距 |
| `--tooltip-padding-medium` | `8px 12px` | 中号内边距 |
| `--tooltip-padding-large` | `12px 16px` | 大号内边距 |
| `--tooltip-font-size-small` | `12px` | 小号字体 |
| `--tooltip-font-size-medium` | `14px` | 中号字体 |
| `--tooltip-font-size-large` | `16px` | 大号字体 |

## 设计指南

### 最佳实践

✅ **推荐做法**
- 提示文本保持简洁，一般不超过两行
- 使用深色主题作为默认主题，对比度更好
- 为图标按钮添加 Tooltip 说明其功能
- 表单字段的帮助提示使用浅色主题更合适
- 触发方式优先使用 hover，体验最好

✅ **内容编写**
- 使用清晰、简洁的语言
- 避免重复触发元素已有的文本
- 提供有价值的补充信息
- 必要时使用 `tooltip-title` 区分标题和内容

❌ **不推荐做法**  
- 不要在 Tooltip 中放置复杂的交互元素（应使用 Popover）
- 避免 Tooltip 内容过长，影响阅读体验
- 不要在移动端依赖 hover 触发
- 避免多个 Tooltip 同时显示，造成视觉混乱
- 不要在 Tooltip 中放置关键操作或重要信息

### 与 Popover 的区别

| 特性 | Tooltip | Popover |
|------|---------|---------|
| **用途** | 简短提示 | 复杂内容展示 |
| **内容** | 纯文本为主 | 支持富文本、组件 |
| **触发** | 主要用 hover | 主要用 click |
| **交互** | 不可交互 | 可交互 |
| **样式** | 简洁、小巧 | 更大、更丰富 |

### 常见问题

**Q: Tooltip 在移动端不显示？**

A: 移动设备不支持 hover 事件，应使用 click 或 focus 触发方式：
```html
<ldesign-tooltip trigger="click" content="移动端友好">
  <ldesign-button>点击显示</ldesign-button>
</ldesign-tooltip>
```

**Q: 如何实现 Tooltip 内容可复制？**

A: 设置 `interactive="true"` 允许鼠标移入：
```html
<ldesign-tooltip interactive content="可复制的文本内容">
  <span>鼠标悬停</span>
</ldesign-tooltip>
```

**Q: Tooltip 显示位置不正确？**

A: 组件会自动检测边界并调整位置。如果需要固定位置，可以使用 `lock-on-scroll` 属性：
```html
<ldesign-tooltip content="固定位置" lock-on-scroll>
  <ldesign-button>按钮</ldesign-button>
</ldesign-tooltip>
```

**Q: 如何自定义 Tooltip 样式？**

A: 使用 CSS 变量或 `tooltip-class` 属性：
```html
<ldesign-tooltip 
  content="自定义样式" 
  tooltip-class="my-tooltip">
  <ldesign-button>自定义</ldesign-button>
</ldesign-tooltip>

<style>
.my-tooltip {
  --tooltip-bg-dark: #1890ff;
  --tooltip-padding-medium: 12px 20px;
  font-weight: 500;
}
</style>
```

## 无障碍性

Tooltip 组件遵循 WAI-ARIA 标准：
- 自动添加 `role="tooltip"` 属性
- 触发元素自动关联 `aria-describedby`
- 支持键盘操作：
  - `Tab`: 焦点移动到触发元素时显示（focus 触发模式）
  - `Esc`: 关闭 Tooltip（click 触发模式）
- 屏幕阅读器会自动读取 Tooltip 内容

## 相关组件

- [Popover 气泡卡片](./popover.md) - 用于显示更复杂的浮层内容
- [Dropdown 下拉菜单](./dropdown.md) - 下拉菜单操作列表
- [Popup 弹出层](./popup.md) - 通用弹出层基础组件
