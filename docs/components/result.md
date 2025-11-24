# Result 结果

用于反馈一系列操作任务的处理结果。

## 何时使用

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## 代码演示

### 成功

成功的结果。

<div class="demo-container">
  <ldesign-result
    status="success"
    title="提交成功"
    sub-title="订单号: 2017182818828182881 云服务器 ECS 配置需要 1-5 分钟，请耐心等待。">
    <ldesign-button type="primary">返回首页</ldesign-button>
    <ldesign-button>查看订单</ldesign-button>
  </ldesign-result>
</div>

```html
<ldesign-result
  status="success"
  title="提交成功"
  sub-title="订单处理中...">
  <ldesign-button type="primary">返回首页</ldesign-button>
  <ldesign-button>查看订单</ldesign-button>
</ldesign-result>
```

### 信息提示

信息提示的结果。

<div class="demo-container">
  <ldesign-result
    status="info"
    title="您的操作已经提交"
    sub-title="预计审核时间为 1-3 个工作日，请耐心等待。">
    <ldesign-button type="primary">返回首页</ldesign-button>
  </ldesign-result>
</div>

```html
<ldesign-result
  status="info"
  title="您的操作已经提交">
  <ldesign-button type="primary">返回首页</ldesign-button>
</ldesign-result>
```

### 警告

警告类型的结果。

<div class="demo-container">
  <ldesign-result
    status="warning"
    title="存在部分问题"
    sub-title="部分数据导入失败，请检查后重新上传。">
    <ldesign-button type="primary">查看详情</ldesign-button>
    <ldesign-button>返回</ldesign-button>
  </ldesign-result>
</div>

```html
<ldesign-result
  status="warning"
  title="存在部分问题">
  <ldesign-button type="primary">查看详情</ldesign-button>
</ldesign-result>
```

### 错误

错误类型的结果。

<div class="demo-container">
  <ldesign-result
    status="error"
    title="提交失败"
    sub-title="请检查并修改以下信息后，再重新提交。">
    <ldesign-button type="primary">重新提交</ldesign-button>
    <ldesign-button>返回</ldesign-button>
  </ldesign-result>
</div>

```html
<ldesign-result
  status="error"
  title="提交失败"
  sub-title="请检查信息后重试">
  <ldesign-button type="primary">重新提交</ldesign-button>
</ldesign-result>
```

### 404

404 页面。

<div class="demo-container">
  <ldesign-result
    status="404"
    title="404"
    sub-title="抱歉，您访问的页面不存在。">
    <ldesign-button type="primary">返回首页</ldesign-button>
  </ldesign-result>
</div>

```html
<ldesign-result
  status="404"
  title="404"
  sub-title="页面不存在">
  <ldesign-button type="primary">返回首页</ldesign-button>
</ldesign-result>
```

### 403

403 页面。

<div class="demo-container">
  <ldesign-result
    status="403"
    title="403"
    sub-title="抱歉，您无权访问该页面。">
    <ldesign-button type="primary">返回首页</ldesign-button>
  </ldesign-result>
</div>

```html
<ldesign-result
  status="403"
  title="403"
  sub-title="无权访问">
  <ldesign-button type="primary">返回首页</ldesign-button>
</ldesign-result>
```

### 500

500 页面。

<div class="demo-container">
  <ldesign-result
    status="500"
    title="500"
    sub-title="抱歉，服务器出错了。">
    <ldesign-button type="primary">返回首页</ldesign-button>
  </ldesign-result>
</div>

```html
<ldesign-result
  status="500"
  title="500"
  sub-title="服务器错误">
  <ldesign-button type="primary">返回首页</ldesign-button>
</ldesign-result>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const retry = () => {
  // 重试逻辑
};
</script>

<template>
  <ldesign-result
    status="success"
    title="提交成功"
    sub-title="您的订单已提交">
    <ldesign-button type="primary" @ldesignClick="goHome">
      返回首页
    </ldesign-button>
    <ldesign-button @ldesignClick="retry">
      再来一单
    </ldesign-button>
  </ldesign-result>
</template>
```

### React

```tsx
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate('/');
  };
  
  const retry = () => {
    // 重试逻辑
  };
  
  return (
    <ldesign-result
      status="success"
      title="提交成功"
      sub-title="您的订单已提交">
      <ldesign-button type="primary" onLdesignClick={goHome}>
        返回首页
      </ldesign-button>
      <ldesign-button onLdesignClick={retry}>
        再来一单
      </ldesign-button>
    </ldesign-result>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `status` | 结果的状态 | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500'` | `'info'` |
| `title` | 标题 | `string` | - |
| `sub-title` | 副标题 | `string` | - |
| `icon` | 自定义图标 | `string` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义操作区域 |
| `icon` | 自定义图标 |
| `title` | 自定义标题 |
| `sub-title` | 自定义副标题 |
| `extra` | 自定义额外内容 |

## 相关组件

- [Empty 空状态](./empty.md)
- [Alert 警告提示](./alert.md)
