# Notification 通知提醒框

全局展示通知提醒信息。

## 何时使用

- 在系统右上角显示通知提醒信息。经常用于以下情况：
  - 较为复杂的通知内容。
  - 带有交互的通知，给出用户下一步的行动点。
  - 系统主动推送。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-button id="basic-notification-btn">打开通知</ldesign-button>
</div>


```html
<script>
  const notification = document.createElement('ldesign-notification');
  notification.title = '通知标题';
  notification.content = '通知内容';
  document.body.appendChild(notification);
</script>
```

### 不同类型

包括成功、信息、警告、错误四种类型。

<div class="demo-container">
  <ldesign-button id="success-notification-btn">成功</ldesign-button>
  <ldesign-button id="info-notification-btn">信息</ldesign-button>
  <ldesign-button id="warning-notification-btn">警告</ldesign-button>
  <ldesign-button id="error-notification-btn">错误</ldesign-button>
</div>


```html
<!-- 成功 -->
<script>
  const notification = document.createElement('ldesign-notification');
  notification.type = 'success';
  notification.title = '成功';
  notification.content = '操作成功完成！';
  document.body.appendChild(notification);
</script>
```

### 位置

可以设置通知从右上角、右下角、左上角、左下角弹出。

<div class="demo-container">
  <ldesign-button id="top-right-btn">右上角</ldesign-button>
  <ldesign-button id="bottom-right-btn">右下角</ldesign-button>
  <ldesign-button id="top-left-btn">左上角</ldesign-button>
  <ldesign-button id="bottom-left-btn">左下角</ldesign-button>
</div>


```html
<script>
  const notification = document.createElement('ldesign-notification');
  notification.placement = 'top-right';
  document.body.appendChild(notification);
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
const openNotification = () => {
  const notification = document.createElement('ldesign-notification');
  notification.type = 'success';
  notification.title = '操作成功';
  notification.content = '您的操作已成功完成！';
  document.body.appendChild(notification);
};
</script>

<template>
  <ldesign-button @ldesignClick="openNotification">
    打开通知
  </ldesign-button>
</template>
```

### React

```tsx
function App() {
  const openNotification = () => {
    const notification = document.createElement('ldesign-notification');
    notification.type = 'success';
    notification.title = '操作成功';
    notification.content = '您的操作已成功完成！';
    document.body.appendChild(notification);
  };
  
  return (
    <ldesign-button onLdesignClick={openNotification}>
      打开通知
    </ldesign-button>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 通知类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| `title` | 通知标题 | `string` | - |
| `content` | 通知内容 | `string` | - |
| `duration` | 自动关闭的延时（ms），设为 0 时不自动关闭 | `number` | `4500` |
| `placement` | 弹出位置 | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` |
| `closable` | 是否显示关闭按钮 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignClose` | 关闭时触发 | `() => void` |

## 相关组件

- [Message 全局提示](./message.md)
- [Alert 警告提示](./alert.md)

<script>
if (typeof window !== 'undefined') {
  const initNotifications = () => {
    // 基础用法
    const basicBtn = document.getElementById('basic-notification-btn');
    if (basicBtn) {
      basicBtn.addEventListener('ldesignClick', () => {
        const notification = document.createElement('ldesign-notification');
        notification.title = '通知标题';
        notification.content = '这是通知的详细内容，可以是较长的文字描述。';
        document.body.appendChild(notification);
      });
    }
    
    // 不同类型
    const types = ['success', 'info', 'warning', 'error'];
    types.forEach(type => {
      const btn = document.getElementById(`${type}-notification-btn`);
      if (btn) {
        btn.addEventListener('ldesignClick', () => {
          const notification = document.createElement('ldesign-notification');
          notification.type = type;
          notification.title = `${type}通知`;
          notification.content = `这是一条${type}类型的通知消息`;
          document.body.appendChild(notification);
        });
      }
    });
    
    // 位置
    const positions = [
      { id: 'top-right', placement: 'top-right' },
      { id: 'bottom-right', placement: 'bottom-right' },
      { id: 'top-left', placement: 'top-left' },
      { id: 'bottom-left', placement: 'bottom-left' }
    ];
    
    positions.forEach(({ id, placement }) => {
      const btn = document.getElementById(`${id}-btn`);
      if (btn) {
        btn.addEventListener('ldesignClick', () => {
          const notification = document.createElement('ldesign-notification');
          notification.title = '通知标题';
          notification.content = `从${placement}弹出`;
          notification.placement = placement;
          document.body.appendChild(notification);
        });
      }
    });
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotifications);
  } else {
    initNotifications();
  }
}
</script>
