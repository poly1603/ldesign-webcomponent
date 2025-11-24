# VirtualList 虚拟列表

高性能长列表渲染组件，仅渲染可见区域的项目，适合处理大量数据的列表场景。

## 何时使用

- 需要展示成千上万条数据时
- 列表滚动性能有要求时
- 移动端需要流畅滚动大量数据时
- 需要减少 DOM 节点数量，提升页面性能时

## 代码演示

### 基础用法

最简单的虚拟列表用法，渲染 1000 条数据。

<div class="demo-container">
  <ldesign-virtual-list id="basic-list" height="400"></ldesign-virtual-list>
</div>


```html
<ldesign-virtual-list id="basic-list" height="400"></ldesign-virtual-list>

<script>
  const list = document.getElementById('basic-list');
  
  // 准备数据
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is description for item ${i + 1}`
  }));
  
  // 配置虚拟列表
  list.items = items;
  list.itemHeight = 60;
  list.renderItem = (item, index) => {
    const div = document.createElement('div');
    div.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid #f0f0f0;';
    div.innerHTML = `
      <div style="font-weight: 500; margin-bottom: 4px;">${item.title}</div>
      <div style="color: #666; font-size: 14px;">${item.description}</div>
    `;
    return div;
  };
</script>
```

### 大数据量渲染

演示 10000 条数据的流畅渲染，滚动依然丝滑。

<div class="demo-container">
  <ldesign-virtual-list id="large-list" height="500"></ldesign-virtual-list>
  <div style="margin-top: 12px; padding: 8px 12px; background: #f5f5f5; border-radius: 4px;">
    <strong>性能提示：</strong>仅渲染可见区域，实际 DOM 节点数量 < 20 个
  </div>
</div>


```html
<ldesign-virtual-list id="large-list" height="500"></ldesign-virtual-list>

<script>
  const largeList = document.getElementById('large-list');
  
  // 10000 条数据
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: i % 3 === 0 ? 'active' : 'inactive'
  }));
  
  largeList.items = items;
  largeList.itemHeight = 56;
  largeList.buffer = 5; // 缓冲区增加到5个项目
</script>
```

### 动态高度支持

每个列表项可以有不同的高度。

<div class="demo-container">
  <ldesign-virtual-list id="dynamic-list" height="400"></ldesign-virtual-list>
</div>


```html
<ldesign-virtual-list id="dynamic-list" height="400"></ldesign-virtual-list>

<script>
  const dynamicList = document.getElementById('dynamic-list');
  const items = [...]; // 数据
  
  dynamicList.items = items;
  dynamicList.itemHeight = 80; // 预估平均高度
  
  // 动态计算每项高度
  dynamicList.getItemHeight = (index) => {
    const item = items[index];
    if (item.content.length < 20) return 60;
    if (item.content.length < 80) return 100;
    return 140;
  };
</script>
```

### 滚动到指定项

通过方法控制滚动位置。

<div class="demo-container">
  <div style="margin-bottom: 12px; display: flex; gap: 8px;">
    <ldesign-button id="scroll-to-top" size="small">滚动到顶部</ldesign-button>
    <ldesign-button id="scroll-to-500" size="small">滚动到第500项</ldesign-button>
    <ldesign-button id="scroll-to-bottom" size="small">滚动到底部</ldesign-button>
  </div>
  <ldesign-virtual-list id="scroll-list" height="400"></ldesign-virtual-list>
</div>


```html
<ldesign-button onclick="scrollList.scrollToIndex(0)">滚动到顶部</ldesign-button>
<ldesign-button onclick="scrollList.scrollToIndex(500)">滚动到第500项</ldesign-button>
<ldesign-button onclick="scrollList.scrollToIndex(999)">滚动到底部</ldesign-button>

<ldesign-virtual-list id="scroll-list" height="400"></ldesign-virtual-list>

<script>
  const scrollList = document.getElementById('scroll-list');
  // 使用 scrollToIndex 方法控制滚动
  scrollList.scrollToIndex(500);
</script>
```

## 框架集成

### Vue 3 使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@ldesign/webcomponent';

const virtualListRef = ref<any>(null);

const items = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}));

onMounted(() => {
  if (virtualListRef.value) {
    virtualListRef.value.items = items;
    virtualListRef.value.itemHeight = 60;
    virtualListRef.value.renderItem = (item: any) => {
      const div = document.createElement('div');
      div.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid #f0f0f0;';
      div.innerHTML = `
        <div style="font-weight: 500;">${item.title}</div>
        <div style="color: #666;">${item.description}</div>
      `;
      return div;
    };
  }
});

const scrollTo = (index: number) => {
  virtualListRef.value?.scrollToIndex(index);
};
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <button @click="scrollTo(0)">顶部</button>
      <button @click="scrollTo(2500)">中间</button>
      <button @click="scrollTo(4999)">底部</button>
    </div>
    <ldesign-virtual-list
      ref="virtualListRef"
      height="500"
    />
  </div>
</template>
```

### React 使用

```tsx
import React, { useRef, useEffect } from 'react';
import '@ldesign/webcomponent';

function VirtualListExample() {
  const listRef = useRef<any>(null);

  const items = Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`
  }));

  useEffect(() => {
    if (listRef.current) {
      listRef.current.items = items;
      listRef.current.itemHeight = 60;
      listRef.current.renderItem = (item: any) => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid #f0f0f0;';
        div.innerHTML = `
          <div style="font-weight: 500;">${item.title}</div>
          <div style="color: #666;">${item.description}</div>
        `;
        return div;
      };
    }
  }, []);

  const scrollTo = (index: number) => {
    listRef.current?.scrollToIndex(index);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => scrollTo(0)}>顶部</button>
        <button onClick={() => scrollTo(2500)}>中间</button>
        <button onClick={() => scrollTo(4999)}>底部</button>
      </div>
      <ldesign-virtual-list
        ref={listRef}
        height="500"
      />
    </div>
  );
}

export default VirtualListExample;
```

### Angular 使用

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import '@ldesign/webcomponent';

@Component({
  selector: 'app-virtual-list',
  template: `
    <div>
      <div style="margin-bottom: 16px;">
        <button (click)="scrollTo(0)">顶部</button>
        <button (click)="scrollTo(2500)">中间</button>
        <button (click)="scrollTo(4999)">底部</button>
      </div>
      <ldesign-virtual-list
        #virtualList
        height="500"
      ></ldesign-virtual-list>
    </div>
  `
})
export class VirtualListComponent implements AfterViewInit {
  @ViewChild('virtualList') virtualList!: ElementRef;

  items = Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`
  }));

  ngAfterViewInit() {
    const list = this.virtualList.nativeElement;
    list.items = this.items;
    list.itemHeight = 60;
    list.renderItem = (item: any) => {
      const div = document.createElement('div');
      div.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid #f0f0f0;';
      div.innerHTML = `
        <div style="font-weight: 500;">${item.title}</div>
        <div style="color: #666;">${item.description}</div>
      `;
      return div;
    };
  }

  scrollTo(index: number) {
    this.virtualList.nativeElement.scrollToIndex(index);
  }
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `items` | 列表数据数组 | `any[]` | `[]` |
| `itemHeight` | 列表项固定高度（像素），动态高度时为预估平均高度 | `number` | `50` |
| `height` | 容器高度，支持数字（像素）或字符串（如 '400px'） | `number \| string` | `400` |
| `buffer` | 缓冲区项目数量，渲染可见区域外的额外项目数，增加此值可减少快速滚动时的白屏 | `number` | `3` |
| `renderItem` | 渲染函数，接收项目数据和索引，返回 DOM 元素 | `(item: any, index: number) => HTMLElement` | **必需** |
| `getItemHeight` | 动态获取项目高度的函数，用于变高列表项场景 | `(index: number) => number` | - |
| `getItemKey` | 获取项目唯一标识的函数，用于优化渲染性能 | `(item: any, index: number) => string \| number` | - |
| `horizontal` | 是否水平滚动模式 | `boolean` | `false` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `scrollToIndex` | 滚动到指定索引的项目 | `(index: number) => void` | `Promise<void>` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| - | 组件通过 `renderItem` 函数渲染内容，不使用插槽 |

## 性能优化

### 最佳实践

✅ **推荐做法**
- 合理设置 `buffer` 值，通常 3-5 即可，避免过大影响性能
- 固定高度列表性能最佳，尽量使用 `itemHeight` 固定高度
- 使用 `getItemKey` 提供唯一标识，优化 DOM 复用
- `renderItem` 函数保持简单高效，避免复杂计算
- 数据量超过 1000 条时使用虚拟列表

✅ **性能对比**
- **普通列表**：10000 条数据 = 10000 个 DOM 节点 → 页面卡顿
- **虚拟列表**：10000 条数据 ≈ 15-20 个 DOM 节点 → 流畅滚动

❌ **不推荐做法**  
- 不要在 `renderItem` 中进行数据请求或复杂计算
- 避免频繁修改 `items` 数组的引用（使用不可变更新）
- 动态高度场景下不要频繁改变项目高度，会影响滚动准确性
- 不要设置过大的 `buffer` 值（>10），会降低性能优势

### 性能对比

| 场景 | 普通列表 | 虚拟列表 | 性能提升 |
|------|----------|----------|----------|
| 1000 条数据 | 1000 DOM | ~15 DOM | **66x** |
| 10000 条数据 | 10000 DOM | ~20 DOM | **500x** |
| 首次渲染时间 | 2000ms | 20ms | **100x** |
| 滚动帧率 | 30fps | 60fps | **2x** |

### 常见问题

**Q: 为什么快速滚动时会出现白屏？**

A: 增加 `buffer` 属性值，如设置为 5-8，可以预渲染更多项目：
```html
<ldesign-virtual-list buffer="5"></ldesign-virtual-list>
```

**Q: 动态高度列表滚动位置不准确？**

A: 确保 `getItemHeight` 返回的高度与实际渲染高度一致，并设置合理的 `itemHeight` 作为平均预估值：
```javascript
list.itemHeight = 80; // 设置接近真实平均高度的值
list.getItemHeight = (index) => {
  // 返回精确的高度值
  return calculateActualHeight(items[index]);
};
```

**Q: 如何实现无限滚动加载？**

A: 监听滚动事件，当接近底部时加载更多数据：
```javascript
const list = document.getElementById('virtual-list');
list.addEventListener('scroll', (e) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    // 加载更多数据
    loadMoreData();
  }
});
```

## 设计指南

### 使用场景

**适合虚拟列表的场景：**
- 聊天记录列表（消息数量多）
- 用户列表、数据表格（数据量大）
- 日志查看器（持续增长的数据）
- 商品列表（需要流畅滚动体验）

**不适合虚拟列表的场景：**
- 数据量 < 100 条（普通列表即可）
- 需要展示所有内容（如打印页面）
- 复杂的嵌套交互（如拖拽排序）

## 无障碍性

虚拟列表组件会动态管理 DOM 节点，需要注意：
- 确保 `renderItem` 返回的元素包含适当的 ARIA 属性
- 键盘导航：使用方向键滚动时，考虑使用 `scrollToIndex` 跳转
- 屏幕阅读器：虚拟列表对屏幕阅读器不够友好，少量数据时建议使用普通列表

## 相关组件

- [Table 表格](./table.md) - 适合展示结构化表格数据
- [Scrollbar 滚动条](./scrollbar.md) - 自定义滚动条样式
- [Empty 空状态](./empty.md) - 列表数据为空时的展示

<script>
if (typeof window !== 'undefined') {
  const initVirtualList = () => {
    // 基础用法
    const basicList = document.getElementById('basic-list');
    if (basicList) {
      const items = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        title: `Item ${i + 1}`,
        description: `This is description for item ${i + 1}`
      }));
      
      basicList.items = items;
      basicList.itemHeight = 60;
      basicList.renderItem = (item, index) => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid #f0f0f0;';
        div.innerHTML = `
          <div style="font-weight: 500; margin-bottom: 4px;">${item.title}</div>
          <div style="color: #666; font-size: 14px;">${item.description}</div>
        `;
        return div;
      };
    }
    
    // 大数据量渲染
    const largeList = document.getElementById('large-list');
    if (largeList) {
      const largeItems = Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: i % 3 === 0 ? 'active' : 'inactive'
      }));
      
      largeList.items = largeItems;
      largeList.itemHeight = 56;
      largeList.buffer = 5;
      largeList.renderItem = (item) => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 10px 16px; border-bottom: 1px solid #e8e8e8; display: flex; align-items: center; justify-content: space-between;';
        const statusColor = item.status === 'active' ? '#52c41a' : '#999';
        div.innerHTML = `
          <div>
            <div style="font-weight: 500;">${item.name}</div>
            <div style="color: #666; font-size: 12px;">${item.email}</div>
          </div>
          <span style="color: ${statusColor}; font-size: 12px;">${item.status}</span>
        `;
        return div;
      };
    }
    
    // 动态高度支持
    const dynamicList = document.getElementById('dynamic-list');
    if (dynamicList) {
      const dynamicItems = Array.from({ length: 500 }, (_, i) => ({
        id: i + 1,
        title: `Dynamic Item ${i + 1}`,
        content: i % 3 === 0 
          ? 'Short content' 
          : i % 3 === 1 
          ? 'Medium length content with more details about this item' 
          : 'Long content with extensive information. This item has much more text to display, which will make the item height larger than others. Perfect for demonstrating dynamic height rendering.'
      }));
      
      dynamicList.items = dynamicItems;
      dynamicList.itemHeight = 80;
      dynamicList.getItemHeight = (index) => {
        const item = dynamicItems[index];
        return item.content.length < 20 ? 60 : item.content.length < 80 ? 100 : 140;
      };
      dynamicList.renderItem = (item) => {
        const div = document.createElement('div');
        const height = dynamicList.getItemHeight(item.id - 1);
        div.style.cssText = `padding: 12px 16px; border-bottom: 1px solid #f0f0f0; min-height: ${height}px; display: flex; flex-direction: column; justify-content: center;`;
        div.innerHTML = `
          <div style="font-weight: 500; margin-bottom: 8px;">${item.title}</div>
          <div style="color: #666; font-size: 14px; line-height: 1.6;">${item.content}</div>
        `;
        return div;
      };
    }
    
    // 滚动到指定项
    const scrollList = document.getElementById('scroll-list');
    if (scrollList) {
      const scrollItems = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        label: `Item ${i + 1}`
      }));
      
      scrollList.items = scrollItems;
      scrollList.itemHeight = 50;
      scrollList.renderItem = (item) => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 12px 16px; border-bottom: 1px solid #f0f0f0;';
        div.textContent = item.label;
        return div;
      };
      
      // 按钮事件
      const scrollTopBtn = document.getElementById('scroll-to-top');
      const scroll500Btn = document.getElementById('scroll-to-500');
      const scrollBottomBtn = document.getElementById('scroll-to-bottom');
      
      if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
          scrollList.scrollToIndex(0);
        });
      }
      if (scroll500Btn) {
        scroll500Btn.addEventListener('click', () => {
          scrollList.scrollToIndex(500);
        });
      }
      if (scrollBottomBtn) {
        scrollBottomBtn.addEventListener('click', () => {
          scrollList.scrollToIndex(999);
        });
      }
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVirtualList);
  } else {
    initVirtualList();
  }
}
</script>
