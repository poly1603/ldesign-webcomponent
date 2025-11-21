# 组件内存泄漏修复模板

> 使用此模板快速修复组件内存泄漏问题

---

## 📋 修复步骤清单

### 步骤 1: 检查组件是否有内存泄漏

查找以下模式：

```typescript
// ❌ 直接使用 addEventListener
window.addEventListener('resize', handler);
document.addEventListener('click', handler);

// ❌ 直接使用 setTimeout/setInterval
setTimeout(() => {}, 1000);
setInterval(() => {}, 1000);

// ❌ 直接使用 Observer
new ResizeObserver(callback);
new MutationObserver(callback);
new IntersectionObserver(callback);

// ❌ 直接使用 RAF
requestAnimationFrame(callback);
```

### 步骤 2: 让组件继承 BaseComponent

```typescript
// ❌ 修复前
import { Component } from '@stencil/core';

@Component({
  tag: 'ldesign-your-component',
  styleUrl: 'your-component.less',
  shadow: false,
})
export class LdesignYourComponent {
  // ...
}

// ✅ 修复后
import { Component } from '@stencil/core';
import { BaseComponent } from '../base/base-component';

@Component({
  tag: 'ldesign-your-component',
  styleUrl: 'your-component.less',
  shadow: false,
})
export class LdesignYourComponent extends BaseComponent {
  // ...
}
```

### 步骤 3: 替换所有资源管理方法

#### 3.1 事件监听器

```typescript
// ❌ 修复前
componentDidLoad() {
  window.addEventListener('resize', this.handleResize);
  document.addEventListener('click', this.handleClick);
}

disconnectedCallback() {
  window.removeEventListener('resize', this.handleResize);
  document.removeEventListener('click', this.handleClick);
}

// ✅ 修复后
componentDidLoad() {
  this.addSafeEventListener(window, 'resize', this.handleResize.bind(this));
  this.addSafeEventListener(document, 'click', this.handleClick.bind(this));
}

disconnectedCallback() {
  super.disconnectedCallback(); // 自动清理
}
```

#### 3.2 定时器

```typescript
// ❌ 修复前
private timer: any;

componentDidLoad() {
  this.timer = setTimeout(() => {
    this.doSomething();
  }, 1000);
}

disconnectedCallback() {
  clearTimeout(this.timer);
}

// ✅ 修复后
componentDidLoad() {
  this.addSafeTimeout(() => {
    this.doSomething();
  }, 1000);
}

disconnectedCallback() {
  super.disconnectedCallback(); // 自动清理
}
```

#### 3.3 定期任务

```typescript
// ❌ 修复前
private interval: any;

componentDidLoad() {
  this.interval = setInterval(() => {
    this.update();
  }, 1000);
}

disconnectedCallback() {
  clearInterval(this.interval);
}

// ✅ 修复后
componentDidLoad() {
  this.addSafeInterval(() => {
    this.update();
  }, 1000);
}

disconnectedCallback() {
  super.disconnectedCallback(); // 自动清理
}
```

#### 3.4 ResizeObserver

```typescript
// ❌ 修复前
private resizeObserver?: ResizeObserver;

componentDidLoad() {
  this.resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(entry => {
      this.handleResize(entry);
    });
  });
  this.resizeObserver.observe(this.el);
}

disconnectedCallback() {
  if (this.resizeObserver) {
    this.resizeObserver.disconnect();
  }
}

// ✅ 修复后
componentDidLoad() {
  this.observeResize((entry) => {
    this.handleResize(entry);
  });
}

disconnectedCallback() {
  super.disconnectedCallback(); // 自动清理
}
```

#### 3.5 IntersectionObserver

```typescript
// ❌ 修复前
private intersectionObserver?: IntersectionObserver;

componentDidLoad() {
  this.intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadContent();
      }
    });
  });
  this.intersectionObserver.observe(this.el);
}

disconnectedCallback() {
  if (this.intersectionObserver) {
    this.intersectionObserver.disconnect();
  }
}

// ✅ 修复后
componentDidLoad() {
  this.observeIntersection(
    this.el,
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadContent();
        }
      });
    }
  );
}

disconnectedCallback() {
  super.disconnectedCallback(); // 自动清理
}
```

#### 3.6 requestAnimationFrame

```typescript
// ❌ 修复前
private rafId?: number;

private animate() {
  this.rafId = requestAnimationFrame(() => {
    this.update();
    this.animate();
  });
}

componentDidLoad() {
  this.animate();
}

disconnectedCallback() {
  if (this.rafId) {
    cancelAnimationFrame(this.rafId);
  }
}

// ✅ 修复后
private animate() {
  this.addSafeRAF(() => {
    this.update();
    this.animate(); // 递归调用也是安全的
  });
}

componentDidLoad() {
  this.animate();
}

disconnectedCallback() {
  super.disconnectedCallback(); // 自动清理所有RAF
}
```

### 步骤 4: 删除手动清理代码

```typescript
// ❌ 修复前 - 手动清理
disconnectedCallback() {
  // 清理事件
  window.removeEventListener('resize', this.handleResize);
  window.removeEventListener('scroll', this.handleScroll);
  
  // 清理定时器
  clearTimeout(this.timer);
  clearInterval(this.interval);
  
  // 清理 Observer
  if (this.resizeObserver) {
    this.resizeObserver.disconnect();
  }
  if (this.intersectionObserver) {
    this.intersectionObserver.disconnect();
  }
  
  // 清理 RAF
  if (this.rafId) {
    cancelAnimationFrame(this.rafId);
  }
}

// ✅ 修复后 - 自动清理
disconnectedCallback() {
  super.disconnectedCallback(); // 一行搞定！
}
```

### 步骤 5: 删除不需要的私有属性

```typescript
// ❌ 修复前 - 需要保存引用
private timer: any;
private interval: any;
private resizeObserver?: ResizeObserver;
private intersectionObserver?: IntersectionObserver;
private rafId?: number;

// ✅ 修复后 - 不需要保存引用
// BaseComponent 内部管理，删除这些属性
```

---

## 🎯 完整示例

### 示例 1: Modal 组件修复

```typescript
// ❌ 修复前
import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'ldesign-modal',
  styleUrl: 'modal.less',
  shadow: false,
})
export class LdesignModal {
  @Prop() visible: boolean = false;
  @Prop() closeOnEsc: boolean = true;
  @Prop() closeOnClickOutside: boolean = true;
  
  @Event() ldesignClose!: EventEmitter<void>;
  
  private closeTimer: any;
  
  componentDidLoad() {
    if (this.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
    if (this.closeOnClickOutside) {
      document.addEventListener('click', this.handleClickOutside);
    }
  }
  
  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }
  
  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.visible) {
      this.ldesignClose.emit();
    }
  };
  
  private handleClickOutside = (e: MouseEvent) => {
    // ...
  };
  
  private autoClose() {
    this.closeTimer = setTimeout(() => {
      this.ldesignClose.emit();
    }, 3000);
  }
  
  render() {
    // ...
  }
}

// ✅ 修复后
import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';
import { BaseComponent } from '../base/base-component';

@Component({
  tag: 'ldesign-modal',
  styleUrl: 'modal.less',
  shadow: false,
})
export class LdesignModal extends BaseComponent {
  @Prop() visible: boolean = false;
  @Prop() closeOnEsc: boolean = true;
  @Prop() closeOnClickOutside: boolean = true;
  
  @Event() ldesignClose!: EventEmitter<void>;
  
  componentDidLoad() {
    super.componentDidLoad();
    
    if (this.closeOnEsc) {
      this.addSafeEventListener(document, 'keydown', this.handleKeyDown);
    }
    if (this.closeOnClickOutside) {
      this.addSafeEventListener(document, 'click', this.handleClickOutside);
    }
  }
  
  disconnectedCallback() {
    super.disconnectedCallback(); // 自动清理所有资源
  }
  
  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.visible) {
      this.ldesignClose.emit();
    }
  };
  
  private handleClickOutside = (e: MouseEvent) => {
    // ...
  };
  
  private autoClose() {
    this.addSafeTimeout(() => {
      this.ldesignClose.emit();
    }, 3000);
  }
  
  render() {
    // ...
  }
}
```

**改进点**:
- ✅ 继承 BaseComponent
- ✅ 使用 addSafeEventListener
- ✅ 使用 addSafeTimeout
- ✅ 删除手动清理代码
- ✅ 删除 closeTimer 属性
- ✅ 代码减少约 15 行

---

### 示例 2: Draggable 组件修复

```typescript
// ❌ 修复前
@Component({
  tag: 'ldesign-draggable',
  styleUrl: 'draggable.less',
  shadow: false,
})
export class LdesignDraggable {
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  
  private onMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  };
  
  private onMouseMove = (e: MouseEvent) => {
    // ...
  };
  
  private onMouseUp = (e: MouseEvent) => {
    this.isDragging = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };
  
  disconnectedCallback() {
    // 如果组件在拖拽中被移除，需要清理
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }
}

// ✅ 修复后
@Component({
  tag: 'ldesign-draggable',
  styleUrl: 'draggable.less',
  shadow: false,
})
export class LdesignDraggable extends BaseComponent {
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  
  private onMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    
    this.addSafeEventListener(window, 'mousemove', this.onMouseMove);
    this.addSafeEventListener(window, 'mouseup', this.onMouseUp);
  };
  
  private onMouseMove = (e: MouseEvent) => {
    // ...
  };
  
  private onMouseUp = (e: MouseEvent) => {
    this.isDragging = false;
    // 不需要手动移除，BaseComponent 会管理
  };
  
  disconnectedCallback() {
    super.disconnectedCallback(); // 自动清理所有事件
  }
}
```

**改进点**:
- ✅ 继承 BaseComponent
- ✅ 使用 addSafeEventListener
- ✅ 删除所有 removeEventListener 调用
- ✅ 代码减少约 8 行
- ✅ 更安全：即使在拖拽中被移除也不会泄漏

---

## ✅ 修复验证清单

完成修复后，检查以下项目：

### 代码检查
- [ ] 组件继承 BaseComponent
- [ ] 没有直接使用 `addEventListener`
- [ ] 没有直接使用 `setTimeout/setInterval`
- [ ] 没有直接使用 `new ResizeObserver/MutationObserver/IntersectionObserver`
- [ ] 没有直接使用 `requestAnimationFrame`
- [ ] `disconnectedCallback` 只调用 `super.disconnectedCallback()`
- [ ] 删除了所有手动清理代码
- [ ] 删除了不需要的私有属性（timer、observer 等）

### 功能测试
- [ ] 组件基本功能正常
- [ ] 事件触发正常
- [ ] 动画/定时任务正常
- [ ] 多次添加/删除组件无错误

### 性能测试
- [ ] 打开 Chrome DevTools Memory 面板
- [ ] 录制快照 1
- [ ] 添加 100 个组件实例
- [ ] 删除所有组件
- [ ] 触发垃圾回收（点击垃圾桶图标）
- [ ] 录制快照 2
- [ ] 对比快照，确认内存已释放

---

## 📊 预期收益

| 指标 | 修复前 | 修复后 | 改进 |
|------|--------|--------|------|
| 代码行数 | +15行清理代码 | 1行 | -93% |
| 内存泄漏风险 | 高 | 无 | -100% |
| 维护成本 | 高 | 低 | -80% |
| 开发体验 | 需要记住清理 | 自动清理 | +100% |

---

## 🔧 批量修复脚本

如果需要批量修复多个组件，可以使用以下查找替换模式：

### VS Code 正则查找替换

1. **查找继承声明**
```regex
export class (Ldesign\w+) \{
```

替换为：
```
export class $1 extends BaseComponent {
```

2. **查找 addEventListener**
```regex
(\w+)\.addEventListener\(([^,]+),\s*([^,)]+)(?:,\s*([^)]+))?\)
```

手动检查并替换为：
```
this.addSafeEventListener($1, $2, $3.bind(this), $4)
```

3. **查找 setTimeout**
```regex
(?:this\.(\w+)\s*=\s*)?setTimeout\(([^,]+),\s*(\d+)\)
```

替换为：
```
this.addSafeTimeout($2, $3)
```

---

## 📚 相关文档

- [BaseComponent API 文档](../src/components/base/base-component.ts)
- [内存泄漏修复记录](./MEMORY_LEAK_FIXES.md)
- [代码问题分析](./CODE_ISSUES_AND_FIXES.md)

---

**维护者**: LDesign Team  
**创建日期**: 2024-11-20  
**最后更新**: 2024-11-20
