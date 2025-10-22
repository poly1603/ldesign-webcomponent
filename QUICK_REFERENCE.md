# LDesign WebComponent v2.0 - 快速参考

## 🚀 5分钟上手

### 安装
```bash
npm install @ldesign/webcomponent
```

### 使用（三选一）

#### 1️⃣ 原生 HTML/JS（最简单）
```html
<script type="module">
  import '@ldesign/webcomponent/button';
  import '@ldesign/webcomponent/table';
</script>

<ldesign-button type="primary">Click</ldesign-button>
```

#### 2️⃣ Vue 3
```bash
npm install @ldesign/webcomponent-vue
```

```vue
<script setup>
import { defineButton } from '@ldesign/webcomponent-vue';
defineButton();
</script>

<template>
  <ldesign-button type="primary">Click</ldesign-button>
</template>
```

#### 3️⃣ React
```bash
npm install @ldesign/webcomponent-react
```

```tsx
import { Button } from '@ldesign/webcomponent-react';

<Button type="primary">Click</Button>
```

---

## 📦 按需导入清单

### 常用组件
```javascript
// 按钮
import '@ldesign/webcomponent/button';

// 输入框
import '@ldesign/webcomponent/input';

// 表格（带虚拟滚动）
import '@ldesign/webcomponent/table';

// 卡片
import '@ldesign/webcomponent/card';

// 表单
import '@ldesign/webcomponent/form';

// 虚拟列表
import '@ldesign/webcomponent/virtual-list';

// 骨架屏
import '@ldesign/webcomponent/skeleton';

// 空状态
import '@ldesign/webcomponent/empty';

// 分割线
import '@ldesign/webcomponent/divider';

// 面包屑
import '@ldesign/webcomponent/breadcrumb';
```

### 全量导入（不推荐）
```javascript
import '@ldesign/webcomponent'; // 380KB
```

---

## 🎨 主题切换

```javascript
// 切换到暗色主题
document.documentElement.setAttribute('data-theme', 'dark');

// 切换到亮色主题
document.documentElement.setAttribute('data-theme', 'light');
```

```css
/* 自定义主题变量 */
:root {
  --ld-color-primary: #7334cb;
  --ld-color-success: #42bd42;
  --ld-spacing-4: 16px;
  --ld-radius-lg: 8px;
}
```

---

## ⚡ 性能优化技巧

### 1. 长列表使用虚拟滚动
```html
<!-- ❌ 不推荐：普通列表 10,000 项会卡顿 -->
<div>
  <div *ngFor="item in 10000 items">...</div>
</div>

<!-- ✅ 推荐：虚拟列表流畅 60fps -->
<ldesign-virtual-list
  item-height="50"
  height="500"
/>
```

### 2. 表格启用虚拟滚动
```html
<ldesign-table
  virtual
  height="500"
  row-height="48"
  :dataSource="bigData"
/>
```

### 3. 按需导入而非全量导入
```javascript
// ❌ 不推荐：380KB
import '@ldesign/webcomponent';

// ✅ 推荐：8-35KB
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
```

---

## 📋 常用组件速查

### Button - 按钮
```html
<ldesign-button type="primary" size="medium" icon="check">
  Click me
</ldesign-button>

<!-- Props -->
type: primary | default | success | warning | danger
size: small | medium | large
loading: boolean
disabled: boolean
icon: string
shape: default | round | circle

<!-- Event -->
@ldesignClick
```

### Input - 输入框
```html
<ldesign-input 
  placeholder="请输入"
  clearable
  show-password
/>

<!-- Props -->
type: text | password | email | number
value: string
placeholder: string
clearable: boolean
disabled: boolean

<!-- Events -->
@ldesignChange
@ldesignInput
@ldesignFocus
@ldesignBlur
```

### Table - 数据表格
```html
<ldesign-table
  :columns="columns"
  :dataSource="data"
  bordered
  striped
  virtual
  height="400"
/>

<!-- Props -->
columns: TableColumn[]
dataSource: any[]
virtual: boolean
height: number | string
rowHeight: number
bordered: boolean
striped: boolean

<!-- Events -->
@ldesignSort
@ldesignRowClick
```

### Card - 卡片
```html
<ldesign-card title="标题" hoverable shadow="always">
  <p>内容</p>
  
  <div slot="extra">额外内容</div>
  <div slot="footer">底部内容</div>
</ldesign-card>

<!-- Props -->
title: string
size: small | medium | large
bordered: boolean
hoverable: boolean
shadow: never | hover | always
```

### Form - 表单
```html
<ldesign-form layout="horizontal" label-width="100">
  <ldesign-form-item label="用户名" name="username" required>
    <ldesign-input placeholder="用户名" />
  </ldesign-form-item>
  
  <ldesign-form-item>
    <ldesign-button type="primary" html-type="submit">
      提交
    </ldesign-button>
  </ldesign-form-item>
</ldesign-form>

<!-- Props -->
layout: horizontal | vertical | inline
labelWidth: string | number
size: small | medium | large

<!-- Events -->
@ldesignSubmit
@ldesignReset
@ldesignValidateError

<!-- Methods -->
await form.validate()
await form.getFieldsValue()
await form.reset()
```

### Skeleton - 骨架屏
```html
<ldesign-skeleton 
  :loading="isLoading"
  avatar
  rows="3"
  animated
>
  <!-- 加载完成后显示的内容 -->
  <div>真实内容</div>
</ldesign-skeleton>

<!-- Props -->
loading: boolean
avatar: boolean
rows: number
animated: boolean
type: text | rect | circle | image
```

### Empty - 空状态
```html
<ldesign-empty 
  image-type="default"
  description="暂无数据"
>
  <ldesign-button type="primary">创建数据</ldesign-button>
</ldesign-empty>

<!-- Props -->
description: string
imageType: default | simple | search
imageSize: small | medium | large
```

---

## 🎯 完整组件列表（78个）

### 基础组件
Button, Icon, Ripple

### 表单组件
Input, InputNumber, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, Select, DatePicker, TimePicker, Calendar, Picker, Cascader, ColorPicker, ColorInput, Slider, Rate, Mention, Transfer, **Form**, **FormItem**

### 数据展示
**Table**, **VirtualList**, **Empty**, Tree, Pagination, Avatar, AvatarGroup, Tag, TagGroup, Image, ImageGroup, ImageViewer, Countdown, Progress, Ellipsis

### 反馈组件
Alert, Message, Notification, Modal, Drawer, Popconfirm, Loading, **Skeleton**

### 导航组件
Menu, Dropdown, Tabs, **Breadcrumb**, **BreadcrumbItem**

### 布局组件
Grid, GridItem, Row, Col, Space, Split, **Card**, **Divider**

### 其他组件
Tooltip, Popup, Affix, Backtop, Collapse, Draggable, ResizeBox, Scrollbar, Swiper, CircleNavigation

---

## 💡 最佳实践

### 1. 性能优化
- ✅ 大列表使用虚拟滚动
- ✅ 按需导入组件
- ✅ 启用懒加载

### 2. 类型安全
- ✅ 使用 TypeScript
- ✅ 导入类型定义
- ✅ 严格模式

### 3. 主题定制
- ✅ 使用 CSS 变量
- ✅ 遵循设计 Token
- ✅ 支持暗色主题

### 4. 无障碍
- ✅ 使用语义化 HTML
- ✅ 添加 ARIA 属性
- ✅ 键盘导航支持

---

## 🔗 相关链接

- [完整文档](./README_V2.md)
- [变更日志](./CHANGELOG_V2.md)
- [HTML 集成](./docs/integration/html.md)
- [Vue3 集成](./packages/vue/README.md)
- [React 集成](./packages/react/README.md)

---

## 📞 获取帮助

- 📖 查看文档：[README_V2.md](./README_V2.md)
- 🐛 报告问题：GitHub Issues
- 💬 讨论交流：GitHub Discussions
- 📧 联系我们：ldesign@example.com

---

**最后更新**: 2024-10-22  
**版本**: v2.0.0




