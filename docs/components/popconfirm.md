# Popconfirm 气泡确认框

点击元素，弹出气泡确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `Modal` 的区别是：
- 更加轻量，不会遮罩全屏。
- 比 `Popover` 多了确认/取消按钮。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-popconfirm title="确定删除吗？">
    <ldesign-button>删除</ldesign-button>
  </ldesign-popconfirm>
</div>

```html
<ldesign-popconfirm title="确定删除吗？">
  <ldesign-button>删除</ldesign-button>
</ldesign-popconfirm>

<script>
  const popconfirm = document.querySelector('ldesign-popconfirm');
  popconfirm.addEventListener('ldesignConfirm', () => {
    console.log('已确认');
  });
  
  popconfirm.addEventListener('ldesignCancel', () => {
    console.log('已取消');
  });
</script>
```

### 弹出位置

支持 12 个弹出位置。

<div class="demo-container">
  <ldesign-popconfirm title="确定删除吗？" placement="top">
    <ldesign-button>Top</ldesign-button>
  </ldesign-popconfirm>
  
  <ldesign-popconfirm title="确定删除吗？" placement="bottom">
    <ldesign-button>Bottom</ldesign-button>
  </ldesign-popconfirm>
  
  <ldesign-popconfirm title="确定删除吗？" placement="left">
    <ldesign-button>Left</ldesign-button>
  </ldesign-popconfirm>
  
  <ldesign-popconfirm title="确定删除吗？" placement="right">
    <ldesign-button>Right</ldesign-button>
  </ldesign-popconfirm>
</div>

```html
<ldesign-popconfirm title="确定吗？" placement="top">
  <ldesign-button>Top</ldesign-button>
</ldesign-popconfirm>
```

### 自定义按钮文字

自定义确认和取消按钮的文字。

<div class="demo-container">
  <ldesign-popconfirm 
    title="确定提交吗？" 
    ok-text="提交" 
    cancel-text="返回">
    <ldesign-button>提交</ldesign-button>
  </ldesign-popconfirm>
</div>

```html
<ldesign-popconfirm 
  title="确定提交吗？"
  ok-text="提交"
  cancel-text="返回">
  <ldesign-button>提交</ldesign-button>
</ldesign-popconfirm>
```

### 自定义图标

自定义提示图标。

<div class="demo-container">
  <ldesign-popconfirm 
    title="确定要执行此操作吗？" 
    icon="help-circle">
    <ldesign-button>操作</ldesign-button>
  </ldesign-popconfirm>
</div>

```html
<ldesign-popconfirm 
  title="确定操作吗？"
  icon="help-circle">
  <ldesign-button>操作</ldesign-button>
</ldesign-popconfirm>
```

## 框架集成

### Vue 3

```vue
<script setup>
const handleConfirm = () => {
  console.log('确认删除');
  // 执行删除操作
};

const handleCancel = () => {
  console.log('取消操作');
};
</script>

<template>
  <ldesign-popconfirm
    title="确定删除吗？"
    @ldesignConfirm="handleConfirm"
    @ldesignCancel="handleCancel"
  >
    <ldesign-button danger>删除</ldesign-button>
  </ldesign-popconfirm>
</template>
```

### React

```tsx
function App() {
  const handleConfirm = () => {
    console.log('确认删除');
    // 执行删除操作
  };
  
  const handleCancel = () => {
    console.log('取消操作');
  };
  
  return (
    <ldesign-popconfirm
      title="确定删除吗？"
      onLdesignConfirm={handleConfirm}
      onLdesignCancel={handleCancel}
    >
      <ldesign-button danger>删除</ldesign-button>
    </ldesign-popconfirm>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `title` | 确认框的标题 | `string` | - |
| `ok-text` | 确认按钮文字 | `string` | `'确定'` |
| `cancel-text` | 取消按钮文字 | `string` | `'取消'` |
| `ok-type` | 确认按钮类型 | `ButtonType` | `'primary'` |
| `placement` | 气泡框位置 | `Placement` | `'top'` |
| `icon` | 自定义图标 | `string` | `'alert-circle'` |
| `disabled` | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignConfirm` | 点击确认按钮时触发 | `() => void` |
| `ldesignCancel` | 点击取消按钮时触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 触发元素 |

## 相关组件

- [Popover 气泡卡片](./popover.md)
- [Modal 对话框](./modal.md)
