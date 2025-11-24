# Swiper 轮播图

轮播图组件。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-swiper style="height: 300px;">
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">1</div>
    </ldesign-swiper-item>
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">2</div>
    </ldesign-swiper-item>
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">3</div>
    </ldesign-swiper-item>
  </ldesign-swiper>
</div>

```html
<ldesign-swiper>
  <ldesign-swiper-item>
    <img src="image1.jpg" />
  </ldesign-swiper-item>
  <ldesign-swiper-item>
    <img src="image2.jpg" />
  </ldesign-swiper-item>
  <ldesign-swiper-item>
    <img src="image3.jpg" />
  </ldesign-swiper-item>
</ldesign-swiper>
```

### 自动播放

设置 `autoplay` 属性可以自动切换。

<div class="demo-container">
  <ldesign-swiper autoplay style="height: 300px;">
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">1</div>
    </ldesign-swiper-item>
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">2</div>
    </ldesign-swiper-item>
  </ldesign-swiper>
</div>

```html
<ldesign-swiper autoplay>
  ...
</ldesign-swiper>
```

### 指示器位置

可以将指示器的位置设置为外部。

<div class="demo-container">
  <ldesign-swiper indicator-position="outside" style="height: 300px;">
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">1</div>
    </ldesign-swiper-item>
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">2</div>
    </ldesign-swiper-item>
  </ldesign-swiper>
</div>

```html
<ldesign-swiper indicator-position="outside">
  ...
</ldesign-swiper>
```

### 切换箭头

设置切换箭头的显示时机。

<div class="demo-container">
  <ldesign-swiper arrow="always" style="height: 300px;">
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">1</div>
    </ldesign-swiper-item>
    <ldesign-swiper-item>
      <div style="height: 100%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">2</div>
    </ldesign-swiper-item>
  </ldesign-swiper>
</div>

```html
<ldesign-swiper arrow="always">
  ...
</ldesign-swiper>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const currentIndex = ref(0);

const handleChange = (index) => {
  currentIndex.value = index;
  console.log('当前索引:', index);
};
</script>

<template>
  <ldesign-swiper
    :initial-index="currentIndex"
    autoplay
    @ldesignChange="handleChange"
  >
    <ldesign-swiper-item>
      <img src="image1.jpg" />
    </ldesign-swiper-item>
    <ldesign-swiper-item>
      <img src="image2.jpg" />
    </ldesign-swiper-item>
  </ldesign-swiper>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleChange = (e) => {
    setCurrentIndex(e.detail);
    console.log('当前索引:', e.detail);
  };
  
  return (
    <ldesign-swiper
      initial-index={currentIndex}
      autoplay
      onLdesignChange={handleChange}
    >
      <ldesign-swiper-item>
        <img src="image1.jpg" />
      </ldesign-swiper-item>
      <ldesign-swiper-item>
        <img src="image2.jpg" />
      </ldesign-swiper-item>
    </ldesign-swiper>
  );
}
```

## API

### Swiper Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `initial-index` | 初始状态激活的幻灯片索引 | `number` | `0` |
| `height` | 走马灯的高度 | `string` | - |
| `autoplay` | 是否自动切换 | `boolean` | `false` |
| `interval` | 自动切换的时间间隔（ms） | `number` | `3000` |
| `indicator-position` | 指示器的位置 | `'inside' \| 'outside' \| 'none'` | `'inside'` |
| `arrow` | 切换箭头的显示时机 | `'always' \| 'hover' \| 'never'` | `'hover'` |
| `loop` | 是否循环显示 | `boolean` | `true` |
| `direction` | 轮播方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |

### Swiper Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 幻灯片切换时触发 | `(event: CustomEvent<number>) => void` |

### Swiper Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| `setActiveItem` | 手动切换幻灯片 | `index: number` |
| `prev` | 切换至上一张幻灯片 | - |
| `next` | 切换至下一张幻灯片 | - |

## 相关组件

- [Image 图片](./image.md)
- [Tabs 标签页](./tabs.md)
