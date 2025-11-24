# Message 全局提示

全局展示操作反馈信息。

## 何时使用

- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## 代码演示

### 基础用法

信息提醒。

<div class="demo-container">
  <ldesign-button id="info-msg-btn">显示信息</ldesign-button>
</div>


```html
<ldesign-button id="btn">显示消息</ldesign-button>

<script>
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    const message = document.createElement('ldesign-message');
    message.type = 'info';
    message.content = '这是一条消息';
    document.body.appendChild(message);
  });
</script>
```

### 不同类型

包括成功、失败、警告。

<div class="demo-container">
  <ldesign-button id="success-msg-btn">成功</ldesign-button>
  <ldesign-button id="error-msg-btn">错误</ldesign-button>
  <ldesign-button id="warning-msg-btn">警告</ldesign-button>
</div>


```html
<!-- 成功 -->
<script>
  const message = document.createElement('ldesign-message');
  message.type = 'success';
  message.content = '操作成功！';
  document.body.appendChild(message);
</script>

<!-- 错误 -->
<script>
  const message = document.createElement('ldesign-message');
  message.type = 'error';
  message.content = '操作失败！';
  document.body.appendChild(message);
</script>
```

### 自定义时长

自定义时长，默认 3 秒。

```html
<script>
  const message = document.createElement('ldesign-message');
  message.content = '10秒后关闭';
  message.duration = 10000;
  document.body.appendChild(message);
</script>
```

## 框架集成

### Vue 3

```vue
<script setup>
const showSuccess = () => {
  const message = document.createElement('ldesign-message');
  message.type = 'success';
  message.content = '操作成功！';
  document.body.appendChild(message);
};

const showError = () => {
  const message = document.createElement('ldesign-message');
  message.type = 'error';
  message.content = '操作失败！';
  document.body.appendChild(message);
};
</script>

<template>
  <ldesign-button @ldesignClick="showSuccess">成功</ldesign-button>
  <ldesign-button @ldesignClick="showError">错误</ldesign-button>
</template>
```

### React

```tsx
function App() {
  const showSuccess = () => {
    const message = document.createElement('ldesign-message');
    message.type = 'success';
    message.content = '操作成功！';
    document.body.appendChild(message);
  };
  
  const showError = () => {
    const message = document.createElement('ldesign-message');
    message.type = 'error';
    message.content = '操作失败！';
    document.body.appendChild(message);
  };
  
  return (
    <>
      <ldesign-button onLdesignClick={showSuccess}>成功</ldesign-button>
      <ldesign-button onLdesignClick={showError}>错误</ldesign-button>
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 提示类型 | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| `content` | 提示内容 | `string` | - |
| `duration` | 自动关闭的延时（ms），设为 0 时不自动关闭 | `number` | `3000` |
| `closable` | 是否显示关闭按钮 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignClose` | 关闭时触发 | `() => void` |

## 相关组件

- [Notification 通知](./notification.md)
- [Alert 警告提示](./alert.md)

<script>
if (typeof window !== 'undefined') {
  const initMessages = () => {
    // 基础用法
    const infoBtn = document.getElementById('info-msg-btn');
    if (infoBtn) {
      infoBtn.addEventListener('ldesignClick', () => {
        const message = document.createElement('ldesign-message');
        message.type = 'info';
        message.content = '这是一条信息提示';
        document.body.appendChild(message);
      });
    }
    
    // 不同类型
    const successBtn = document.getElementById('success-msg-btn');
    const errorBtn = document.getElementById('error-msg-btn');
    const warningBtn = document.getElementById('warning-msg-btn');
    
    if (successBtn) {
      successBtn.addEventListener('ldesignClick', () => {
        const message = document.createElement('ldesign-message');
        message.type = 'success';
        message.content = '操作成功！';
        document.body.appendChild(message);
      });
    }
    
    if (errorBtn) {
      errorBtn.addEventListener('ldesignClick', () => {
        const message = document.createElement('ldesign-message');
        message.type = 'error';
        message.content = '操作失败！';
        document.body.appendChild(message);
      });
    }
    
    if (warningBtn) {
      warningBtn.addEventListener('ldesignClick', () => {
        const message = document.createElement('ldesign-message');
        message.type = 'warning';
        message.content = '警告信息';
        document.body.appendChild(message);
      });
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMessages);
  } else {
    initMessages();
  }
}
</script>
