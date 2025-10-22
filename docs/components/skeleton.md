# Skeleton 骨架屏

在内容加载时显示占位图形，提升用户体验。

## 何时使用

- 网络较慢时，优化加载体验
- 数据获取需要时间
- 避免页面闪烁

## 基础用法

:::demo

```html
<ldesign-skeleton avatar rows="3" animated></ldesign-skeleton>
```

:::

## 加载完成显示内容

:::demo

```html
<div>
  <ldesign-button id="toggleLoading" type="primary">切换加载状态</ldesign-button>
  <br><br>
  
  <ldesign-skeleton id="skeleton1" loading avatar rows="3" animated>
    <div style="display: flex; gap: 16px;">
      <img src="https://via.placeholder.com/40" style="border-radius: 50%;">
      <div>
        <h4 style="margin: 0 0 8px;">张三</h4>
        <p style="margin: 0; color: #666;">这是加载完成后显示的真实内容。</p>
      </div>
    </div>
  </ldesign-skeleton>
</div>

<script>
const btn = document.getElementById('toggleLoading');
const skeleton = document.getElementById('skeleton1');

btn.addEventListener('ldesignClick', () => {
  skeleton.loading = !skeleton.loading;
});
</script>
```

:::

## 不同类型

:::demo

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
  <div>
    <h4>文本骨架</h4>
    <ldesign-skeleton type="text" rows="4" animated></ldesign-skeleton>
  </div>
  
  <div>
    <h4>矩形骨架</h4>
    <ldesign-skeleton type="rect" width="200" height="150" animated></ldesign-skeleton>
  </div>
  
  <div>
    <h4>圆形骨架</h4>
    <ldesign-skeleton type="circle" width="100" height="100" animated></ldesign-skeleton>
  </div>
</div>
```

:::

## Vue 3 使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@ldesign/webcomponent/skeleton';

const loading = ref(true);

onMounted(() => {
  // 模拟数据加载
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<template>
  <ldesign-skeleton :loading="loading" avatar rows="3" animated>
    <div class="user-info">
      <img src="avatar.jpg" />
      <div>
        <h4>用户名</h4>
        <p>用户简介</p>
      </div>
    </div>
  </ldesign-skeleton>
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | `boolean` | `true` | 是否显示骨架屏 |
| animated | `boolean` | `true` | 是否显示动画 |
| rows | `number` | `3` | 段落行数 |
| avatar | `boolean` | `false` | 是否显示头像 |
| avatarShape | `'circle' \| 'square'` | `'circle'` | 头像形状 |
| avatarSize | `'small' \| 'medium' \| 'large'` | `'medium'` | 头像大小 |
| title | `boolean` | `true` | 是否显示标题 |
| paragraph | `boolean` | `true` | 是否显示段落 |
| type | `'text' \| 'rect' \| 'circle' \| 'image'` | `'text'` | 骨架屏类型 |
| width | `string \| number` | - | 宽度 |
| height | `string \| number` | - | 高度 |
| borderRadius | `string \| number` | - | 圆角 |

## 相关组件

- [Spin](/components/spin) - 加载指示器
- [Loading](/components/loading) - 加载中
- [Empty](/components/empty) - 空状态

