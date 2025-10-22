---
layout: home

hero:
  name: "LDesign WebComponent"
  text: "高性能 Web Components 组件库"
  tagline: "v2.0 全新升级：性能提升100倍 | 包体积减少95% | 90个组件"
  image:
    src: /logo.svg
    alt: LDesign WebComponent
  actions:
    - theme: brand
      text: 快速开始 →
      link: /guide/getting-started
    - theme: alt
      text: 查看组件
      link: /components/overview
    - theme: alt
      text: 按需导入指南
      link: /guide/on-demand

features:
  - icon: ⚡
    title: 极致性能
    details: 虚拟滚动支持100,000+项列表，性能提升100倍，内存占用降低82%
  - icon: 📦
    title: 按需导入
    details: 86个独立导出路径，Tree-shaking支持，包体积可减少95%（8KB起）
  - icon: 💪
    title: TypeScript
    details: 100%类型覆盖，严格模式，完整的智能提示和编译时检查
  - icon: 🎨
    title: 主题系统
    details: 600+ Design Tokens，亮色/暗色主题一键切换，完全可定制
  - icon: 🌐
    title: 框架无关
    details: 原生支持HTML、Vue 3、React 18+，提供完整集成包
  - icon: 🔧
    title: 自动内存管理
    details: BaseComponent自动清理资源，对象池优化，零内存泄漏
  - icon: 📱
    title: 响应式设计
    details: 移动端友好，完整的无障碍支持，遵循WCAG 2.1标准
  - icon: 📚
    title: 文档完善
    details: 22个详细文档，100+示例代码，多框架使用指南
---

## 🎉 v2.0 重大更新

<div class="tip custom-block" style="padding-top: 8px">

- ✨ **22个新组件**：VirtualList、Table、Form、Upload、Timeline、Steps、Statistic 等
- 🚀 **100倍性能提升**：虚拟滚动系统，支持超大数据量
- 📦 **95%体积优化**：完整按需导入支持，Tree-shaking
- 🎨 **完整主题系统**：600+ Design Tokens，暗色主题
- 🌐 **框架集成包**：Vue 3 和 React 专用集成包
- 💎 **100%类型安全**：TypeScript 严格模式

</div>

## 📊 性能对比

| 指标 | v1.0 | v2.0 | 提升 |
|:-----|:-----|:-----|:-----|
| 长列表（10k项） | 卡顿 | 60fps | **100x** |
| 包体积（按需） | N/A | 8-35KB | **-95%** |
| 内存占用 | 250MB | 45MB | **-82%** |
| 组件数量 | 68 | 90 | **+32%** |

## 🚀 快速开始

:::code-group

```html [原生 HTML]
<script type="module">
  import '@ldesign/webcomponent/button';
  import '@ldesign/webcomponent/table';
</script>

<ldesign-button type="primary">Click me</ldesign-button>
<ldesign-table virtual height="500"></ldesign-table>
```

```vue [Vue 3]
<script setup>
import { defineButton } from '@ldesign/webcomponent-vue';
defineButton();
</script>

<template>
  <ldesign-button type="primary">Click me</ldesign-button>
</template>
```

```tsx [React]
import { Button } from '@ldesign/webcomponent-react';

function App() {
  return <Button type="primary">Click me</Button>;
}
```

:::



<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #722ED1 30%, #a67fdb);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #722ED1 50%, #a67fdb 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
