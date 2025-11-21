# 内存泄漏修复记录

> 记录已修复的内存泄漏问题和修复方案

---

## ✅ 已完成的修复

### 1. BaseComponent 增强（2024-11-20）

**问题**：原有 BaseComponent 只支持基础的事件监听器和定时器清理，缺少对其他 API 的支持。

**修复内容**：
- ✅ 添加 MutationObserver 管理和自动清理
- ✅ 添加 IntersectionObserver 管理和自动清理
- ✅ 添加 requestAnimationFrame 管理和自动清理
- ✅ 提供 `addSafe*` 系列方法，命名更清晰

**新增方法**：
```typescript
// 安全的事件监听
protected addSafeEventListener()

// 安全的定时器
protected addSafeTimeout()
protected addSafeInterval()

// 安全的 Observer
protected observeMutation()
protected observeIntersection()
protected observeResize()

// 安全的 RAF
protected addSafeRAF()
protected cancelSafeRAF()
```

**使用示例**：
```typescript
export class YourComponent extends BaseComponent {
  componentDidLoad() {
    // ✅ 自动清理
    this.addSafeEventListener(window, 'resize', this.handleResize);
    this.addSafeInterval(() => this.update(), 1000);
    this.observeResize((entry) => console.log(entry));
  }
  
  // ✅ disconnectedCallback 自动清理所有资源
}
```

---

### 2. ResizeBox 组件修复（2024-11-20）

**文件**: `src/components/resize-box/resize-box-fixed.tsx`

**问题**：
- 在 window 上添加 pointermove 和 pointerup 事件监听器
- 手动管理清理逻辑，容易遗漏
- 没有继承 BaseComponent 的自动清理能力

**修复方案**：
1. 继承 BaseComponent
2. 使用 `addSafeEventListener` 替代直接的 `addEventListener`
3. 删除手动清理代码，依赖父类自动清理

**修改对比**：

```typescript
// ❌ 修复前
export class LdesignResizeBox {
  private onEdgePointerDown = (edge) => (e) => {
    // ...
    window.addEventListener('pointermove', this.onWindowPointerMove, { passive: false });
    window.addEventListener('pointerup', this.onWindowPointerUp, { passive: false });
  };
  
  disconnectedCallback() {
    // 手动清理
    window.removeEventListener('pointermove', this.onWindowPointerMove as any);
    window.removeEventListener('pointerup', this.onWindowPointerUp as any);
  }
}

// ✅ 修复后
export class LdesignResizeBox extends BaseComponent {
  private onEdgePointerDown = (edge) => (e) => {
    // ...
    // 使用安全方法，自动清理
    this.addSafeEventListener(window, 'pointermove', this.onWindowPointerMove as EventListener, { passive: false });
    this.addSafeEventListener(window, 'pointerup', this.onWindowPointerUp as EventListener, { passive: false });
  };
  
  disconnectedCallback() {
    super.disconnectedCallback(); // 自动清理所有资源
  }
}
```

**收益**：
- 100% 自动清理，无需手动管理
- 代码更简洁，减少约 10 行
- 避免遗漏清理导致的内存泄漏

---

## 🔄 待修复的组件

### 高优先级（P0）

#### 1. Draggable 组件
**文件**: `src/components/draggable/draggable.tsx`

**已知问题**：
- 使用 window 事件监听器（mousemove, mouseup）
- 没有清理逻辑

**修复计划**：
- [ ] 继承 BaseComponent
- [ ] 使用 addSafeEventListener
- [ ] 测试拖拽功能

#### 2. Scrollbar 组件
**文件**: `src/components/scrollbar/scrollbar.tsx`

**已知问题**：
- 可能有 ResizeObserver 未清理
- 滚动事件监听器管理

**修复计划**：
- [ ] 检查现有实现
- [ ] 继承 BaseComponent（如果未继承）
- [ ] 使用 observeResize 方法

#### 3. Modal 组件
**文件**: `src/components/modal/modal.tsx`

**已知问题**：
- body 的 click 事件监听器（点击外部关闭）
- ESC 键盘事件监听器
- 可能没有清理

**修复计划**：
- [ ] 继承 BaseComponent
- [ ] 使用 addSafeEventListener
- [ ] 添加键盘事件清理

#### 4. Drawer 组件
**文件**: `src/components/drawer/drawer.tsx`

**已知问题**：
- 类似 Modal 的问题
- 可能有过渡动画相关的定时器

**修复计划**：
- [ ] 继承 BaseComponent
- [ ] 使用 addSafeTimeout
- [ ] 清理所有事件监听器

#### 5. Dropdown 组件
**文件**: `src/components/dropdown/dropdown.tsx`

**已知问题**：
- 点击外部关闭的全局事件
- window resize 事件

**修复计划**：
- [ ] 继承 BaseComponent
- [ ] 使用 addSafeEventListener
- [ ] 处理位置计算的 RAF

---

### 中等优先级（P1）

#### 6. Table 组件
**文件**: `src/components/table/table.tsx`

**已知问题**：
- 虚拟滚动的 scroll 事件
- ResizeObserver
- 可能有大量 DOM 节点缓存

**修复计划**：
- [ ] 检查虚拟滚动实现
- [ ] 使用 BaseComponent 方法
- [ ] 优化 DOM 节点管理

#### 7. Tree 组件
**文件**: `src/components/tree/tree.tsx`

**已知问题**：
- 展开/收起动画定时器
- 可能有节点缓存

**修复计划**：
- [ ] 继承 BaseComponent
- [ ] 使用 addSafeTimeout
- [ ] 清理节点缓存

#### 8. Tooltip 组件
**文件**: `src/components/tooltip/tooltip.tsx`

**已知问题**：
- mouseover/mouseout 事件
- 延迟显示/隐藏的定时器

**修复计划**：
- [ ] 继承 BaseComponent
- [ ] 使用 addSafeTimeout
- [ ] 清理所有事件

#### 9. Popconfirm 组件
**文件**: `src/components/popconfirm/popconfirm.tsx`

**已知问题**：
- 点击外部关闭
- 定时自动关闭

**修复计划**：
- [ ] 继承 BaseComponent
- [ ] 统一使用安全方法

#### 10. Image 组件
**文件**: `src/components/image/image.tsx`

**已知问题**：
- 图片加载事件
- IntersectionObserver（懒加载）

**修复计划**：
- [ ] 继承 BaseComponent
- [ ] 使用 observeIntersection
- [ ] 清理图片加载监听器

---

### 低优先级（P2）

#### 11-15. 其他组件
- Countdown: 定时器管理
- Swiper: 自动播放定时器
- Calendar: 日期计算的定时器
- Upload: 文件上传的 XMLHttpRequest
- Mention: input 事件监听器

---

## 📋 修复检查清单

在修复每个组件时，请遵循以下检查清单：

### 代码检查
- [ ] 组件继承 BaseComponent
- [ ] 所有 `addEventListener` 改为 `addSafeEventListener`
- [ ] 所有 `setTimeout` 改为 `addSafeTimeout`
- [ ] 所有 `setInterval` 改为 `addSafeInterval`
- [ ] 所有 `new ResizeObserver` 改为 `observeResize`
- [ ] 所有 `new MutationObserver` 改为 `observeMutation`
- [ ] 所有 `new IntersectionObserver` 改为 `observeIntersection`
- [ ] 所有 `requestAnimationFrame` 改为 `addSafeRAF`
- [ ] `disconnectedCallback` 调用 `super.disconnectedCallback()`
- [ ] 删除手动清理代码（已由父类处理）

### 功能测试
- [ ] 组件基本功能正常
- [ ] 交互事件正常触发
- [ ] 多次添加/删除组件无内存泄漏
- [ ] 浏览器开发工具 Memory 面板验证

### 性能测试
- [ ] 使用 Chrome DevTools Performance 录制
- [ ] 检查没有长任务（> 50ms）
- [ ] 验证 FPS 稳定在 60fps
- [ ] Memory 面板确认无持续增长

---

## 🧪 测试方法

### 1. 手动测试

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="/dist/components/your-component.js"></script>
</head>
<body>
  <button id="add">添加组件</button>
  <button id="remove">删除组件</button>
  <div id="container"></div>
  
  <script>
    const container = document.getElementById('container');
    let count = 0;
    
    document.getElementById('add').onclick = () => {
      const el = document.createElement('ldesign-your-component');
      el.id = `comp-${count++}`;
      container.appendChild(el);
    };
    
    document.getElementById('remove').onclick = () => {
      const children = container.children;
      if (children.length > 0) {
        container.removeChild(children[children.length - 1]);
      }
    };
    
    // 自动测试：快速添加和删除
    let interval = setInterval(() => {
      document.getElementById('add').click();
      setTimeout(() => {
        document.getElementById('remove').click();
      }, 100);
    }, 200);
    
    // 10秒后停止并检查内存
    setTimeout(() => {
      clearInterval(interval);
      console.log('测试完成，请在 Memory 面板检查内存使用');
    }, 10000);
  </script>
</body>
</html>
```

### 2. 自动化测试

```typescript
// __tests__/memory-leak.spec.ts
import { newSpecPage } from '@stencil/core/testing';
import { LdesignYourComponent } from '../your-component';

describe('Memory Leak Test', () => {
  it('should cleanup event listeners', async () => {
    const page = await newSpecPage({
      components: [LdesignYourComponent],
      html: `<ldesign-your-component></ldesign-your-component>`,
    });
    
    const component = page.rootInstance as any;
    
    // 验证有清理方法
    expect(component.disconnectedCallback).toBeDefined();
    
    // 验证继承了 BaseComponent
    expect(component.cleanup).toBeDefined();
    
    // 移除组件
    page.root.remove();
    
    // 验证清理被调用
    // （实际测试需要 mock 和 spy）
  });
});
```

---

## 📈 进度追踪

| 组件 | 状态 | 修复人 | 完成日期 |
|------|------|--------|---------|
| BaseComponent | ✅ 完成 | System | 2024-11-20 |
| ResizeBox | ✅ 完成 | System | 2024-11-20 |
| Draggable | 🔄 进行中 | - | - |
| Scrollbar | ⏳ 待修复 | - | - |
| Modal | ⏳ 待修复 | - | - |
| Drawer | ⏳ 待修复 | - | - |
| Dropdown | ⏳ 待修复 | - | - |
| Table | ⏳ 待修复 | - | - |
| Tree | ⏳ 待修复 | - | - |
| Tooltip | ⏳ 待修复 | - | - |
| ... | ⏳ 待修复 | - | - |

**总进度**: 2/78 (2.6%)

---

## 🎯 目标

- **短期目标**（1周）：修复所有 P0 组件（5个）
- **中期目标**（1月）：修复所有 P1 组件（10个）
- **长期目标**（2月）：修复所有组件（78个）

---

**维护者**: LDesign Team  
**创建日期**: 2024-11-20  
**最后更新**: 2024-11-20
