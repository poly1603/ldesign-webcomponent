# Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

- 需要展示更多信息时
- 代替传统的 Tooltip，显示复杂内容
- 表单验证提示
- 确认操作提示
- 用户信息卡片

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-popover content="这是气泡卡片的内容">
    <ldesign-button>Hover me</ldesign-button>
  </ldesign-popover>
</div>

```html
<ldesign-popover content="这是气泡卡片的内容">
  <ldesign-button>Hover me</ldesign-button>
</ldesign-popover>
```

### 带标题

添加标题栏。

<div class="demo-container">
  <ldesign-popover 
    title="提示标题" 
    content="这是一段说明文字，可以很长很长。"
  >
    <ldesign-button>With Title</ldesign-button>
  </ldesign-popover>
</div>

```html
<ldesign-popover 
  title="提示标题" 
  content="这是一段说明文字"
>
  <ldesign-button>With Title</ldesign-button>
</ldesign-popover>
```

### 自定义内容

使用插槽自定义内容。

<div class="demo-container">
  <ldesign-popover title="用户信息">
    <ldesign-button>User Card</ldesign-button>
    <div slot="content" style="padding: 10px;">
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <ldesign-avatar size="large">U</ldesign-avatar>
        <div style="margin-left: 12px;">
          <div style="font-weight: 500;">张三</div>
          <div style="font-size: 12px; color: #666;">前端工程师</div>
        </div>
      </div>
      <div style="font-size: 13px; color: #666;">
        <div>📧 zhangsan@example.com</div>
        <div>📱 138-0000-0000</div>
      </div>
    </div>
  </ldesign-popover>
</div>

```html
<ldesign-popover title="用户信息">
  <ldesign-button>User Card</ldesign-button>
  <div slot="content">
    <div class="user-card">
      <ldesign-avatar size="large">U</ldesign-avatar>
      <div class="user-info">
        <div class="user-name">张三</div>
        <div class="user-title">前端工程师</div>
        <div class="user-contact">
          <div>📧 zhangsan@example.com</div>
          <div>📱 138-0000-0000</div>
        </div>
      </div>
    </div>
  </div>
</ldesign-popover>
```

### 触发方式

支持 hover、click、focus 三种触发方式。

<div class="demo-container">
  <ldesign-popover content="Hover 触发" trigger="hover">
    <ldesign-button>Hover</ldesign-button>
  </ldesign-popover>
  
  <ldesign-popover content="Click 触发" trigger="click">
    <ldesign-button>Click</ldesign-button>
  </ldesign-popover>
  
  <ldesign-popover content="Focus 触发" trigger="focus">
    <ldesign-button>Focus</ldesign-button>
  </ldesign-popover>
</div>

```html
<ldesign-popover content="Hover 触发" trigger="hover">
  <ldesign-button>Hover</ldesign-button>
</ldesign-popover>

<ldesign-popover content="Click 触发" trigger="click">
  <ldesign-button>Click</ldesign-button>
</ldesign-popover>

<ldesign-popover content="Focus 触发" trigger="focus">
  <ldesign-button>Focus</ldesign-button>
</ldesign-popover>
```

### 12 个位置

提供 12 个不同的方位。

<div class="demo-container">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 600px;">
    <ldesign-popover content="Top Start" placement="top-start">
      <ldesign-button block>TL</ldesign-button>
    </ldesign-popover>
    
    <ldesign-popover content="Top" placement="top">
      <ldesign-button block>Top</ldesign-button>
    </ldesign-popover>
    
    <ldesign-popover content="Top End" placement="top-end">
      <ldesign-button block>TR</ldesign-button>
    </ldesign-popover>
    
    <ldesign-popover content="Left Start" placement="left-start">
      <ldesign-button block>LT</ldesign-button>
    </ldesign-popover>
    
    <div></div>
    
    <ldesign-popover content="Right Start" placement="right-start">
      <ldesign-button block>RT</ldesign-button>
    </ldesign-popover>
    
    <ldesign-popover content="Left" placement="left">
      <ldesign-button block>Left</ldesign-button>
    </ldesign-popover>
    
    <div></div>
    
    <ldesign-popover content="Right" placement="right">
      <ldesign-button block>Right</ldesign-button>
    </ldesign-popover>
    
    <ldesign-popover content="Left End" placement="left-end">
      <ldesign-button block>LB</ldesign-button>
    </ldesign-popover>
    
    <div></div>
    
    <ldesign-popover content="Right End" placement="right-end">
      <ldesign-button block>RB</ldesign-button>
    </ldesign-popover>
    
    <ldesign-popover content="Bottom Start" placement="bottom-start">
      <ldesign-button block>BL</ldesign-button>
    </ldesign-popover>
    
    <ldesign-popover content="Bottom" placement="bottom">
      <ldesign-button block>Bottom</ldesign-button>
    </ldesign-popover>
    
    <ldesign-popover content="Bottom End" placement="bottom-end">
      <ldesign-button block>BR</ldesign-button>
    </ldesign-popover>
  </div>
</div>

```html
<ldesign-popover placement="top">Top</ldesign-popover>
<ldesign-popover placement="top-start">Top Start</ldesign-popover>
<ldesign-popover placement="top-end">Top End</ldesign-popover>
<ldesign-popover placement="bottom">Bottom</ldesign-popover>
<ldesign-popover placement="bottom-start">Bottom Start</ldesign-popover>
<ldesign-popover placement="bottom-end">Bottom End</ldesign-popover>
<ldesign-popover placement="left">Left</ldesign-popover>
<ldesign-popover placement="left-start">Left Start</ldesign-popover>
<ldesign-popover placement="left-end">Left End</ldesign-popover>
<ldesign-popover placement="right">Right</ldesign-popover>
<ldesign-popover placement="right-start">Right Start</ldesign-popover>
<ldesign-popover placement="right-end">Right End</ldesign-popover>
```

### 无箭头

设置 `arrow` 为 `false` 隐藏箭头。

<div class="demo-container">
  <ldesign-popover 
    title="无箭头" 
    content="这是一个没有箭头的气泡卡片"
    :arrow="false"
  >
    <ldesign-button>No Arrow</ldesign-button>
  </ldesign-popover>
</div>

```html
<ldesign-popover arrow="false">
  <ldesign-button>No Arrow</ldesign-button>
</ldesign-popover>
```

### 自定义宽度

通过 `width` 属性设置宽度。

<div class="demo-container">
  <ldesign-popover 
    title="自定义宽度" 
    content="这是一个宽度为 500px 的气泡卡片，可以容纳更多内容。"
    width="500"
  >
    <ldesign-button>Custom Width</ldesign-button>
  </ldesign-popover>
</div>

```html
<ldesign-popover width="500">
  <ldesign-button>Custom Width</ldesign-button>
</ldesign-popover>
```

### 确认框

使用 Popover 实现确认操作。

<div class="demo-container">
  <ldesign-popover id="confirm-popover" trigger="click" placement="top">
    <ldesign-button type="danger">删除</ldesign-button>
    <div slot="content" style="padding: 4px 0;">
      <div style="margin-bottom: 12px;">确定要删除这条记录吗？</div>
      <div style="text-align: right;">
        <ldesign-button size="small" style="margin-right: 8px;">取消</ldesign-button>
        <ldesign-button size="small" type="primary" danger>确定</ldesign-button>
      </div>
    </div>
  </ldesign-popover>
</div>

```html
<ldesign-popover trigger="click" placement="top">
  <ldesign-button type="danger">删除</ldesign-button>
  <div slot="content">
    <div>确定要删除这条记录吗？</div>
    <div style="text-align: right; margin-top: 12px;">
      <ldesign-button size="small">取消</ldesign-button>
      <ldesign-button size="small" type="primary" danger>
        确定
      </ldesign-button>
    </div>
  </div>
</ldesign-popover>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const visible = ref(false);

const handleVisibleChange = (newVisible) => {
  console.log('Visible:', newVisible);
};
</script>

<template>
  <ldesign-popover
    v-model:visible="visible"
    title="标题"
    content="内容"
    @ldesignVisibleChange="handleVisibleChange"
  >
    <ldesign-button>Hover me</ldesign-button>
  </ldesign-popover>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (e) => {
    setVisible(e.detail);
    console.log('Visible:', e.detail);
  };

  return (
    <ldesign-popover
      visible={visible}
      title="标题"
      content="内容"
      onLdesignVisibleChange={handleVisibleChange}
    >
      <ldesign-button>Hover me</ldesign-button>
    </ldesign-popover>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `visible` | 是否显示 | `boolean` | `false` |
| `title` | 标题 | `string` | - |
| `content` | 内容（简单文本） | `string` | - |
| `trigger` | 触发方式 | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` |
| `placement` | 弹出位置 | `Placement` | `'top'` |
| `arrow` | 是否显示箭头 | `boolean` | `true` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `offset` | 偏移距离 | `number` | `12` |
| `width` | 宽度 | `number \| string` | - |
| `interactive` | 内容区域可交互 | `boolean` | `true` |
| `close-on-click-outside` | 点击外部关闭 | `boolean` | `true` |
| `show-delay` | 显示延迟（毫秒） | `number` | `100` |
| `hide-delay` | 隐藏延迟（毫秒） | `number` | `100` |

### Placement

```typescript
type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignVisibleChange` | 显示/隐藏变化时触发 | `(event: CustomEvent<boolean>) => void` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `show` | 显示 Popover | - | `Promise<void>` |
| `hide` | 隐藏 Popover | - | `Promise<void>` |
| `toggle` | 切换显示/隐藏 | - | `Promise<void>` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 触发元素 |
| `content` | 自定义内容 |

## 使用场景

### 表单验证提示

```html
<ldesign-popover 
  trigger="focus" 
  placement="right"
  title="密码要求"
>
  <ldesign-input type="password" placeholder="请输入密码" />
  <div slot="content">
    <ul style="margin: 0; padding-left: 20px;">
      <li>至少 8 个字符</li>
      <li>包含大小写字母</li>
      <li>包含数字</li>
      <li>包含特殊字符</li>
    </ul>
  </div>
</ldesign-popover>
```

### 用户信息卡片

```html
<ldesign-popover title="用户详情" width="300">
  <ldesign-avatar>U</ldesign-avatar>
  <div slot="content">
    <!-- 用户详细信息 -->
  </div>
</ldesign-popover>
```

### 操作确认

```html
<ldesign-popover trigger="click">
  <ldesign-button type="danger">删除</ldesign-button>
  <div slot="content">
    <p>确定要删除吗？</p>
    <div style="text-align: right;">
      <ldesign-button size="small">取消</ldesign-button>
      <ldesign-button size="small" type="primary">确定</ldesign-button>
    </div>
  </div>
</ldesign-popover>
```

## 最佳实践

### 1. 内容不宜过长

Popover 适合显示简短的提示信息。过长的内容建议使用 Modal。

```html
<!-- ✅ 好的做法 -->
<ldesign-popover content="这是一段简短的提示">
  <ldesign-button>提示</ldesign-button>
</ldesign-popover>

<!-- ❌ 不好的做法 -->
<ldesign-popover content="这是一段非常非常长的内容...（省略500字）">
  <ldesign-button>提示</ldesign-button>
</ldesign-popover>
```

### 2. 合理设置触发方式

- **hover**: 适合快速预览、提示信息
- **click**: 适合需要用户明确操作、确认操作
- **focus**: 适合表单输入提示

### 3. 注意内容可交互性

如果内容区域包含可点击元素，建议：
- 设置 `trigger="click"`
- 或设置 `interactive="true"`（hover 模式下）

### 4. 避免嵌套 Popover

不要在 Popover 内容中嵌套另一个 Popover，这会导致糟糕的用户体验。

## 与 Tooltip 的区别

| 特性 | Popover | Tooltip |
|------|---------|---------|
| 内容 | 支持复杂 HTML | 仅支持纯文本 |
| 交互 | 内容可交互 | 内容不可交互 |
| 触发 | hover/click/focus | 仅 hover |
| 样式 | 卡片式，有标题 | 简单气泡 |
| 用途 | 复杂提示、确认 | 简单提示 |

## 相关组件

- [Tooltip 文字提示](./tooltip.md)
- [Modal 对话框](./modal.md)
- [Dropdown 下拉菜单](./dropdown.md)
