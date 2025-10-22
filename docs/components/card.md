# Card 卡片

通用卡片容器，用于内容分组展示。

## 何时使用

- 需要将信息分组展示
- 需要突出显示某块内容
- 构建数据看板

## 基础用法

:::demo

```html
<ldesign-card title="卡片标题" bordered>
  <p>卡片内容</p>
  <p>更多内容...</p>
</ldesign-card>
```

:::

## 带额外操作

:::demo

```html
<ldesign-card title="用户信息" bordered>
  <div slot="extra">
    <ldesign-button size="small" type="text">编辑</ldesign-button>
    <ldesign-button size="small" type="text">删除</ldesign-button>
  </div>
  
  <p>姓名：张三</p>
  <p>年龄：28岁</p>
  <p>邮箱：zhangsan@example.com</p>
  
  <div slot="footer">
    <ldesign-button type="primary">保存</ldesign-button>
    <ldesign-button>取消</ldesign-button>
  </div>
</ldesign-card>
```

:::

## 不同尺寸

:::demo

```html
<div style="display: grid; gap: 16px;">
  <ldesign-card title="小卡片" size="small" bordered>
    <p>小尺寸卡片内容</p>
  </ldesign-card>
  
  <ldesign-card title="中卡片" size="medium" bordered>
    <p>中等尺寸卡片内容</p>
  </ldesign-card>
  
  <ldesign-card title="大卡片" size="large" bordered>
    <p>大尺寸卡片内容</p>
  </ldesign-card>
</div>
```

:::

## 悬浮效果

:::demo

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
  <ldesign-card title="悬浮卡片" hoverable shadow="hover">
    <p>鼠标悬停试试</p>
  </ldesign-card>
  
  <ldesign-card title="一直有阴影" shadow="always">
    <p>始终显示阴影</p>
  </ldesign-card>
  
  <ldesign-card title="无阴影" shadow="never">
    <p>从不显示阴影</p>
  </ldesign-card>
</div>
```

:::

## 加载状态

:::demo

```html
<ldesign-card title="加载中的卡片" loading bordered>
  <p>真实内容（被骨架屏替代）</p>
</ldesign-card>
```

:::

## Vue 3 使用

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/card';
import '@ldesign/webcomponent/button';

const loading = ref(false);

const handleRefresh = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <ldesign-card title="数据卡片" :loading="loading" bordered>
    <template #extra>
      <ldesign-button size="small" @ldesignClick="handleRefresh">
        刷新
      </ldesign-button>
    </template>
    
    <p>卡片内容...</p>
  </ldesign-card>
</template>
```

## React 使用

```tsx
import { useState } from 'react';
import { Card, Button } from '@ldesign/webcomponent-react';

function MyCard() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Card title="数据卡片" loading={loading} bordered>
      <ldesign-button size="small" onClick={handleRefresh}>
        刷新
      </ldesign-button>
      
      <p>卡片内容...</p>
    </Card>
  );
}
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | - | 卡片标题 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 卡片尺寸 |
| bordered | `boolean` | `true` | 是否显示边框 |
| hoverable | `boolean` | `false` | 鼠标悬停时是否浮起 |
| loading | `boolean` | `false` | 是否加载中 |
| shadow | `'never' \| 'hover' \| 'always'` | `'hover'` | 阴影显示时机 |
| headerStyle | `string` | - | 头部样式 |
| bodyStyle | `string` | - | 主体样式 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 卡片内容 |
| title | 自定义标题 |
| extra | 卡片右上角额外操作 |
| footer | 卡片底部 |

## CSS Variables

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--ld-card-radius` | `var(--ld-radius-lg)` | 卡片圆角 |
| `--ld-card-padding` | `var(--ld-spacing-6)` | 内边距 |
| `--ld-card-shadow` | `var(--ld-shadow)` | 阴影 |

