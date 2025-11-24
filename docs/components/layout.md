# Layout 布局

协助进行页面级整体布局。

## 组件概述

- `ldesign-layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- `ldesign-header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `ldesign-sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `ldesign-content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `ldesign-footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

## 代码演示

### 基础布局

典型的页面布局。

<div class="demo-container">
  <ldesign-layout style="min-height: 400px;">
    <ldesign-header>Header</ldesign-header>
    <ldesign-content>Content</ldesign-content>
    <ldesign-footer>Footer</ldesign-footer>
  </ldesign-layout>
</div>

```html
<ldesign-layout>
  <ldesign-header>Header</ldesign-header>
  <ldesign-content>Content</ldesign-content>
  <ldesign-footer>Footer</ldesign-footer>
</ldesign-layout>
```

### 顶部-侧边布局

拥有顶部导航和侧边栏的页面，多用于后台管理系统。

<div class="demo-container">
  <ldesign-layout style="min-height: 400px;">
    <ldesign-header>Header</ldesign-header>
    <ldesign-layout>
      <ldesign-sider width="200">Sider</ldesign-sider>
      <ldesign-content>Content</ldesign-content>
    </ldesign-layout>
  </ldesign-layout>
</div>

```html
<ldesign-layout>
  <ldesign-header>Header</ldesign-header>
  <ldesign-layout>
    <ldesign-sider>Sider</ldesign-sider>
    <ldesign-content>Content</ldesign-content>
  </ldesign-layout>
</ldesign-layout>
```

### 侧边布局

侧边两列式布局。

<div class="demo-container">
  <ldesign-layout style="min-height: 400px;">
    <ldesign-sider width="200">Sider</ldesign-sider>
    <ldesign-layout>
      <ldesign-header>Header</ldesign-header>
      <ldesign-content>Content</ldesign-content>
      <ldesign-footer>Footer</ldesign-footer>
    </ldesign-layout>
  </ldesign-layout>
</div>

```html
<ldesign-layout>
  <ldesign-sider>Sider</ldesign-sider>
  <ldesign-layout>
    <ldesign-header>Header</ldesign-header>
    <ldesign-content>Content</ldesign-content>
    <ldesign-footer>Footer</ldesign-footer>
  </ldesign-layout>
</ldesign-layout>
```

## 框架集成

### Vue 3

```vue
<template>
  <ldesign-layout style="min-height: 100vh;">
    <ldesign-header>
      <h1>我的应用</h1>
    </ldesign-header>
    
    <ldesign-layout>
      <ldesign-sider width="256">
        <ldesign-menu mode="inline">
          <ldesign-menu-item key="1">菜单1</ldesign-menu-item>
          <ldesign-menu-item key="2">菜单2</ldesign-menu-item>
        </ldesign-menu>
      </ldesign-sider>
      
      <ldesign-content>
        <router-view />
      </ldesign-content>
    </ldesign-layout>
    
    <ldesign-footer>
      Footer © 2024
    </ldesign-footer>
  </ldesign-layout>
</template>
```

### React

```tsx
function App() {
  return (
    <ldesign-layout style={{ minHeight: '100vh' }}>
      <ldesign-header>
        <h1>我的应用</h1>
      </ldesign-header>
      
      <ldesign-layout>
        <ldesign-sider width="256">
          <ldesign-menu mode="inline">
            <ldesign-menu-item key="1">菜单1</ldesign-menu-item>
            <ldesign-menu-item key="2">菜单2</ldesign-menu-item>
          </ldesign-menu>
        </ldesign-sider>
        
        <ldesign-content>
          {/* 内容区域 */}
        </ldesign-content>
      </ldesign-layout>
      
      <ldesign-footer>
        Footer © 2024
      </ldesign-footer>
    </ldesign-layout>
  );
}
```

## API

### Layout

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `class` | 容器 className | `string` | - |
| `style` | 指定样式 | `string \| object` | - |

### Sider

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `width` | 宽度 | `string \| number` | `200` |
| `collapsible` | 是否可收起 | `boolean` | `false` |
| `collapsed` | 当前收起状态 | `boolean` | `false` |

### Sider Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignCollapse` | 展开/收起时触发 | `(event: CustomEvent<boolean>) => void` |

## 相关组件

- [Grid 栅格](./grid.md)
- [Space 间距](./space.md)
