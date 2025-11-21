# 代码问题分析与修复方案

> 本文档列出了项目中发现的不规范代码和潜在问题，并提供详细的修复方案

---

## 🔴 严重问题

### 1. Shadow DOM 未启用导致样式泄漏

**问题位置**: 所有组件（78个）

**问题代码**:
```typescript
@Component({
  tag: 'ldesign-button',
  styleUrls: ['button.less'],
  shadow: false,  // ❌ 问题
})
```

**问题说明**:
- 组件样式暴露在全局作用域
- 外部样式可能污染组件内部
- 组件样式可能影响页面其他元素
- 不符合 Web Components 封装原则

**修复方案**:
```typescript
@Component({
  tag: 'ldesign-button',
  styleUrls: ['button.less'],
  shadow: true,  // ✅ 修复
})
export class LdesignButton {
  render() {
    return (
      <Host>
        <button class="button-inner">
          <slot />
        </button>
      </Host>
    );
  }
}
```

**样式适配**:
```less
// BEFORE - 全局样式
.ldesign-button {
  display: inline-flex;
}

// AFTER - Shadow DOM 样式
:host {
  display: inline-flex;
  // 通过 CSS 变量允许外部定制
  --button-bg: var(--ld-color-primary);
}

.button-inner {
  background: var(--button-bg);
}
```

---

### 2. 事件监听器未清理导致内存泄漏

**问题位置**: 多个组件（如 ResizeBox、Draggable、Scrollbar）

**问题代码**:
```typescript
export class LdesignResizeBox {
  componentDidLoad() {
    // ❌ 添加事件监听但未清理
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }
  
  // ❌ 缺少清理逻辑
}
```

**问题说明**:
- 组件销毁后事件监听器仍然存在
- 导致内存泄漏
- 可能引发意外的事件触发

**修复方案**:
```typescript
export class LdesignResizeBox extends BaseComponent {
  componentDidLoad() {
    // ✅ 使用 BaseComponent 的安全方法
    this.addSafeEventListener(
      window, 
      'mousemove', 
      this.handleMouseMove.bind(this)
    );
    this.addSafeEventListener(
      window, 
      'mouseup', 
      this.handleMouseUp.bind(this)
    );
  }
  
  // ✅ disconnectedCallback 会自动清理
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
```

---

### 3. 定时器未清理

**问题位置**: Countdown、Carousel、AutoComplete 等组件

**问题代码**:
```typescript
export class LdesignCountdown {
  private timer: any;
  
  componentDidLoad() {
    // ❌ 创建定时器但未清理
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  }
  
  // ❌ 缺少清理逻辑
}
```

**问题说明**:
- 组件销毁后定时器继续运行
- 浪费 CPU 资源
- 可能引发错误（访问已销毁的组件）

**修复方案**:
```typescript
export class LdesignCountdown extends BaseComponent {
  componentDidLoad() {
    // ✅ 使用 BaseComponent 的安全方法
    this.addSafeInterval(() => {
      this.updateTime();
    }, 1000);
  }
  
  // ✅ 自动清理
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
```

---

## 🟡 中等问题

### 4. 缺少防抖和节流优化

**问题位置**: Input、Select、Table 等组件的搜索和滚动功能

**问题代码**:
```typescript
export class LdesignInput {
  @Event() ldesignInput: EventEmitter<string>;
  
  handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    // ❌ 每次输入都触发事件，频繁触发
    this.ldesignInput.emit(value);
  }
}
```

**问题说明**:
- 高频事件触发导致性能问题
- 可能引发不必要的网络请求
- 用户体验差（输入卡顿）

**修复方案**:
```typescript
export class LdesignInput extends BaseComponent {
  @Event() ldesignInput: EventEmitter<string>;
  @Prop() debounce?: number = 0;
  
  private debouncedEmit: Function;
  
  componentWillLoad() {
    // ✅ 创建防抖函数
    if (this.debounce > 0) {
      this.debouncedEmit = this.createDebouncedFn(
        (value: string) => this.ldesignInput.emit(value),
        this.debounce
      );
    }
  }
  
  handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    
    if (this.debouncedEmit) {
      // ✅ 使用防抖
      this.debouncedEmit(value);
    } else {
      this.ldesignInput.emit(value);
    }
  }
}
```

**使用方式**:
```html
<!-- 输入延迟 300ms 后触发 -->
<ldesign-input debounce="300" placeholder="搜索..." />
```

---

### 5. 过度使用 @State 导致不必要的重渲染

**问题位置**: 多个组件

**问题代码**:
```typescript
export class LdesignSelect {
  // ❌ 所有状态都用 @State，即使不影响渲染
  @State() private internalValue: string;
  @State() private options: any[];
  @State() private loading: boolean;
  @State() private focused: boolean;
  @State() private tempData: any;  // ❌ 临时数据不应该用 @State
}
```

**问题说明**:
- @State 变化会触发重渲染
- 不必要的状态变化导致性能问题
- 应该区分渲染状态和内部状态

**修复方案**:
```typescript
export class LdesignSelect {
  // ✅ 仅影响渲染的用 @State
  @State() private internalValue: string;
  @State() private options: any[];
  @State() private loading: boolean;
  @State() private focused: boolean;
  
  // ✅ 内部数据使用私有属性
  private tempData: any;
  private cache: Map<string, any> = new Map();
}
```

---

### 6. 大型对象直接存储在组件属性中

**问题位置**: Table、Tree、Transfer 等数据密集型组件

**问题代码**:
```typescript
export class LdesignTable {
  // ❌ 大数据直接存在属性中
  @Prop() dataSource: any[] = [];  // 可能有上万条数据
  
  render() {
    // ❌ 每次都渲染所有数据
    return this.dataSource.map(item => <tr>...</tr>);
  }
}
```

**问题说明**:
- 大数据量导致渲染卡顿
- 内存占用高
- 滚动性能差

**修复方案**:
```typescript
export class LdesignTable {
  @Prop() dataSource: any[] = [];
  @Prop() virtual: boolean = false;  // ✅ 启用虚拟滚动
  
  private virtualScroll: VirtualScrollV2;
  
  componentDidLoad() {
    if (this.virtual && this.dataSource.length > 100) {
      // ✅ 使用虚拟滚动
      this.virtualScroll = new VirtualScrollV2(
        this.el.querySelector('.table-body'),
        this.dataSource.length,
        {
          itemHeight: 40,
          buffer: 5,
          overscan: 10,
        }
      );
    }
  }
  
  render() {
    const data = this.virtual 
      ? this.virtualScroll.getVisibleItems()  // ✅ 只渲染可见项
      : this.dataSource;
      
    return data.map(item => <tr>...</tr>);
  }
}
```

---

### 7. CSS 选择器性能问题

**问题位置**: 多个组件的样式文件

**问题代码**:
```less
// ❌ 复杂的后代选择器
.ldesign-table .table-body tr td .cell-content span.text {
  color: #333;
}

// ❌ 通配符选择器
.ldesign-dropdown * {
  box-sizing: border-box;
}

// ❌ 属性选择器嵌套
.ldesign-input[type="text"][disabled] .input-inner[readonly] {
  background: #f5f5f5;
}
```

**问题说明**:
- 复杂选择器计算性能差
- 增加浏览器渲染负担
- 样式优先级难以控制

**修复方案**:
```less
// ✅ 使用 BEM 命名，降低选择器复杂度
.ldesign-table__cell-text {
  color: #333;
}

// ✅ 使用直接子选择器
.ldesign-dropdown > * {
  box-sizing: border-box;
}

// ✅ 减少嵌套层级
.ldesign-input--disabled .ldesign-input__inner {
  background: #f5f5f5;
}
```

---

## 🟢 小问题

### 8. 硬编码文本缺少国际化

**问题位置**: 几乎所有组件

**问题代码**:
```typescript
export class LdesignModal {
  render() {
    return (
      <div class="modal-footer">
        <button>确定</button>  {/* ❌ 硬编码中文 */}
        <button>取消</button>  {/* ❌ 硬编码中文 */}
      </div>
    );
  }
}
```

**修复方案**:
```typescript
import { i18n } from '@/utils/i18n';

export class LdesignModal {
  render() {
    return (
      <div class="modal-footer">
        <button>{i18n.t('modal.ok')}</button>  {/* ✅ 国际化 */}
        <button>{i18n.t('modal.cancel')}</button>  {/* ✅ 国际化 */}
      </div>
    );
  }
}
```

---

### 9. 缺少 ARIA 属性

**问题位置**: Button、Input、Modal 等交互组件

**问题代码**:
```typescript
export class LdesignButton {
  render() {
    return (
      // ❌ 缺少无障碍属性
      <button 
        disabled={this.disabled}
        onClick={this.handleClick}
      >
        <slot />
      </button>
    );
  }
}
```

**修复方案**:
```typescript
export class LdesignButton {
  @Prop() ariaLabel?: string;
  
  render() {
    return (
      <button 
        disabled={this.disabled}
        onClick={this.handleClick}
        // ✅ 添加 ARIA 属性
        aria-label={this.ariaLabel}
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-busy={this.loading ? 'true' : 'false'}
        role="button"
      >
        <slot />
      </button>
    );
  }
}
```

---

### 10. 重复的工具函数

**问题位置**: 多个组件内部实现相同功能

**问题代码**:
```typescript
// ❌ 在 button.tsx 中
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// ❌ 在 input.tsx 中也有
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// ❌ 在 select.tsx 中还有
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
```

**修复方案**:
```typescript
// ✅ 统一使用 utils 中的函数
import { classNames } from '@/utils';

export class LdesignButton {
  render() {
    const classes = classNames(
      'ldesign-button',
      `ldesign-button--${this.type}`,
      this.disabled && 'ldesign-button--disabled'
    );
    
    return <button class={classes}>...</button>;
  }
}
```

---

### 11. 不合理的默认值

**问题位置**: 多个组件

**问题代码**:
```typescript
export class LdesignPagination {
  // ❌ 默认显示 1 条/页，不合理
  @Prop() pageSize: number = 1;
  
  // ❌ 默认总数为 0，没意义
  @Prop() total: number = 0;
}
```

**修复方案**:
```typescript
export class LdesignPagination {
  // ✅ 合理的默认值
  @Prop() pageSize: number = 10;
  
  // ✅ 总数可以不设置默认值（必填）
  @Prop() total!: number;
}
```

---

### 12. 控制台错误和警告未捕获

**问题位置**: 多个组件

**问题代码**:
```typescript
export class LdesignImage {
  handleImageError(e: Event) {
    // ❌ 错误未处理，直接抛出到控制台
    console.error('Image load failed');
  }
  
  async loadData() {
    // ❌ Promise 错误未捕获
    const data = await fetch('/api/data');
    return data.json();
  }
}
```

**修复方案**:
```typescript
export class LdesignImage {
  @Event() ldesignError: EventEmitter<Error>;
  @State() private hasError: boolean = false;
  
  handleImageError(e: Event) {
    // ✅ 错误处理
    this.hasError = true;
    const error = new Error('Failed to load image');
    this.ldesignError.emit(error);
    
    if (process.env.NODE_ENV === 'development') {
      console.error('[ldesign-image] Image load failed:', e);
    }
  }
  
  async loadData() {
    try {
      // ✅ 添加错误处理
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      this.ldesignError.emit(error as Error);
      return null;
    }
  }
  
  render() {
    if (this.hasError) {
      // ✅ 显示错误状态
      return <div class="image-error">Failed to load image</div>;
    }
    return <img src={this.src} onError={this.handleImageError} />;
  }
}
```

---

## 📊 问题优先级统计

| 问题类型 | 数量 | 优先级 | 预计修复时间 |
|---------|------|--------|-------------|
| Shadow DOM 未启用 | 78 | P0 | 2-3周 |
| 事件监听未清理 | 15+ | P0 | 1周 |
| 定时器未清理 | 8+ | P0 | 3天 |
| 缺少防抖节流 | 20+ | P1 | 1周 |
| 过度使用 @State | 30+ | P1 | 1周 |
| 大对象渲染 | 5 | P1 | 1周 |
| CSS 性能问题 | 50+ | P2 | 2周 |
| 缺少国际化 | 78 | P2 | 2周 |
| ARIA 属性缺失 | 60+ | P2 | 2周 |
| 重复代码 | 40+ | P3 | 持续优化 |
| 不合理默认值 | 15+ | P3 | 1周 |
| 错误处理不足 | 35+ | P2 | 1周 |

---

## ✅ 修复检查清单

### 组件级别
- [ ] 启用 Shadow DOM
- [ ] 继承 BaseComponent
- [ ] 清理所有事件监听器
- [ ] 清理所有定时器
- [ ] 添加防抖节流
- [ ] 优化 @State 使用
- [ ] 添加虚拟滚动（大数据组件）
- [ ] 优化 CSS 选择器
- [ ] 添加国际化
- [ ] 添加 ARIA 属性
- [ ] 添加错误处理
- [ ] 移除重复代码
- [ ] 检查默认值合理性
- [ ] 添加单元测试

### 项目级别
- [ ] 统一代码风格（ESLint + Prettier）
- [ ] 启用更严格的 TypeScript 检查
- [ ] 建立 CI/CD 流程
- [ ] 添加性能监控
- [ ] 添加包体积检查
- [ ] 完善文档
- [ ] 添加示例项目

---

**维护者**: LDesign Team  
**最后更新**: 2024-11-20
