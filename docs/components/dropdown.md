# Dropdown 下拉菜单

向下弹出的列表。

## 何时使用

- 当页面上的操作命令过多时，用此组件可以收纳操作元素。
- 点击或移入触点，会出现一个下拉菜单。

## 代码演示

### 基础用法

最简单的下拉菜单。

<div class="demo-container">
  <ldesign-dropdown>
    <ldesign-button>
      下拉菜单
      <ldesign-icon name="chevron-down" slot="suffix"></ldesign-icon>
    </ldesign-button>
    
    <ldesign-dropdown-panel slot="content">
      <ldesign-menu-item>菜单项 1</ldesign-menu-item>
      <ldesign-menu-item>菜单项 2</ldesign-menu-item>
      <ldesign-menu-item>菜单项 3</ldesign-menu-item>
    </ldesign-dropdown-panel>
  </ldesign-dropdown>
</div>

```html
<ldesign-dropdown>
  <ldesign-button>
    下拉菜单
  </ldesign-button>
  
  <ldesign-dropdown-panel slot="content">
    <ldesign-menu-item>菜单项 1</ldesign-menu-item>
    <ldesign-menu-item>菜单项 2</ldesign-menu-item>
  </ldesign-dropdown-panel>
</ldesign-dropdown>
```

### 触发方式

通过 `trigger` 属性设置触发方式。

<div class="demo-container">
  <ldesign-dropdown trigger="hover">
    <ldesign-button>Hover 触发</ldesign-button>
    <ldesign-dropdown-panel slot="content">
      <ldesign-menu-item>菜单项 1</ldesign-menu-item>
      <ldesign-menu-item>菜单项 2</ldesign-menu-item>
    </ldesign-dropdown-panel>
  </ldesign-dropdown>
  
  <ldesign-dropdown trigger="click">
    <ldesign-button>Click 触发</ldesign-button>
    <ldesign-dropdown-panel slot="content">
      <ldesign-menu-item>菜单项 1</ldesign-menu-item>
      <ldesign-menu-item>菜单项 2</ldesign-menu-item>
    </ldesign-dropdown-panel>
  </ldesign-dropdown>
</div>

```html
<ldesign-dropdown trigger="hover">...</ldesign-dropdown>
<ldesign-dropdown trigger="click">...</ldesign-dropdown>
```

### 弹出位置

支持 12 个弹出位置。

<div class="demo-container">
  <ldesign-dropdown placement="bottom-start">
    <ldesign-button>Bottom Start</ldesign-button>
    <ldesign-dropdown-panel slot="content">
      <ldesign-menu-item>菜单项</ldesign-menu-item>
    </ldesign-dropdown-panel>
  </ldesign-dropdown>
  
  <ldesign-dropdown placement="bottom">
    <ldesign-button>Bottom</ldesign-button>
    <ldesign-dropdown-panel slot="content">
      <ldesign-menu-item>菜单项</ldesign-menu-item>
    </ldesign-dropdown-panel>
  </ldesign-dropdown>
  
  <ldesign-dropdown placement="bottom-end">
    <ldesign-button>Bottom End</ldesign-button>
    <ldesign-dropdown-panel slot="content">
      <ldesign-menu-item>菜单项</ldesign-menu-item>
    </ldesign-dropdown-panel>
  </ldesign-dropdown>
</div>

```html
<ldesign-dropdown placement="bottom-start">...</ldesign-dropdown>
<ldesign-dropdown placement="bottom">...</ldesign-dropdown>
<ldesign-dropdown placement="bottom-end">...</ldesign-dropdown>
```

## 框架集成

### Vue 3

```vue
<script setup>
const handleMenuClick = (item) => {
  console.log('点击:', item);
};
</script>

<template>
  <ldesign-dropdown>
    <ldesign-button>下拉菜单</ldesign-button>
    
    <ldesign-dropdown-panel slot="content">
      <ldesign-menu-item @click="handleMenuClick('item1')">
        菜单项 1
      </ldesign-menu-item>
      <ldesign-menu-item @click="handleMenuClick('item2')">
        菜单项 2
      </ldesign-menu-item>
    </ldesign-dropdown-panel>
  </ldesign-dropdown>
</template>
```

### React

```tsx
function App() {
  const handleMenuClick = (item) => {
    console.log('点击:', item);
  };
  
  return (
    <ldesign-dropdown>
      <ldesign-button>下拉菜单</ldesign-button>
      
      <ldesign-dropdown-panel slot="content">
        <ldesign-menu-item onClick={() => handleMenuClick('item1')}>
          菜单项 1
        </ldesign-menu-item>
        <ldesign-menu-item onClick={() => handleMenuClick('item2')}>
          菜单项 2
        </ldesign-menu-item>
      </ldesign-dropdown-panel>
    </ldesign-dropdown>
  );
}
```

## API

### Dropdown Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `trigger` | 触发方式 | `'hover' \| 'click' \| 'focus'` | `'hover'` |
| `placement` | 弹出位置 | `Placement` | `'bottom-start'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `visible` | 是否显示（受控） | `boolean` | - |

### Dropdown Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 触发元素 |
| `content` | 下拉内容 |

### Dropdown Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignVisibleChange` | 显示/隐藏时触发 | `(event: CustomEvent<boolean>) => void` |

## 相关组件

- [Menu 菜单](./menu.md)
- [Popover 弹出框](./popover.md)
