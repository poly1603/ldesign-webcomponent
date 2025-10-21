# 锚点部分遮罩定位修复

## 问题描述

在"锚点定位 - 部分遮罩展开"示例中，点击四个方向按钮后出现以下问题：

1. **只显示全屏遮罩**：整个屏幕都被遮罩覆盖，而不是只在展开方向显示遮罩
2. **看不到抽屉**：抽屉元素没有显示，或者被遮罩盖住了

## 根本原因

### 1. 抽屉尺寸未铺满展开区域

在锚点部分遮罩模式下，抽屉使用固定的 `size` 属性（如 `size="300px"`），但用户期望抽屉能**铺满从按钮到屏幕边界的整个区域**。

**问题表现：**
- 向下展开：抽屉只有固定高度（如 300px），而不是铺满到屏幕底部
- 向右展开：抽屉只有固定宽度，而不是铺满到屏幕右边缘
- 遮罩区域显示正确，但抽屉本身太小，用户体验不佳

### 2. 坐标系统混淆

在 `drawer.anchor.ts` 的 `getElementBounds` 函数中：

**问题代码：**
```typescript
function getElementBounds(element: HTMLElement): ElementBounds {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,    // 加上了滚动偏移
    left: rect.left + window.scrollX,  // 加上了滚动偏移
    // ...
  };
}
```

**问题分析：**
- `createPartialMask` 创建的遮罩使用 `position: fixed` 定位
- `fixed` 定位相对于视口（viewport），不需要加上 `scrollY/scrollX`
- 但 `getElementBounds` 返回的坐标包含了滚动偏移
- 这导致遮罩位置计算错误，可能显示在错误的位置或覆盖整个屏幕

### 3. Z-index 层叠问题

部分遮罩的 z-index 设置不当：

**问题代码：**
```typescript
export function createPartialMask(...): HTMLElement {
  // ...
  mask.style.cssText = `
    // ...
    z-index: 999;
  `;
}
```

**问题分析：**
- 部分遮罩 z-index 是 999
- 抽屉组件的默认 z-index 是 1000
- 组件内置遮罩的 z-index 是 999 (`this.zIndex - 1`)
- 可能与内置遮罩冲突

### 4. 默认遮罩与部分遮罩冲突

在锚点模式下，组件仍然渲染默认的全屏遮罩：

**问题代码：**
```tsx
<Host class={this.getContainerClass()}>
  {/* 遮罩层 */}
  {this.mask && (  // 总是显示
    <div class={`drawer-mask ${this.maskClass}`} />
  )}
</Host>
```

**问题分析：**
- 锚点模式应该只显示部分遮罩
- 但组件仍然渲染默认的全屏遮罩
- 两个遮罩同时存在导致混乱

## 解决方案

### 修复 1: 部分遮罩模式下自动铺满展开区域

**文件：** `drawer.anchor.ts`

在 `calculateAnchorPosition` 函数中，当启用 `maskPartial` 时，自动计算抽屉尺寸以铺满展开方向的整个区域：

**向下展开修复：**
```typescript
case 'bottom':
  // ... 原有位置计算 ...
  
  if (config.maskPartial) {
    position.maskBounds = {
      top: anchorBounds.bottom,
      left: boundaryBounds.left,
      width: boundaryBounds.width,
      height: boundaryBounds.bottom - anchorBounds.bottom
    };
    
    // 🎯 部分遮罩模式：抽屉铺满展开方向的区域
    position.width = boundaryBounds.width;                        // 铺满屏幕宽度
    position.height = boundaryBounds.bottom - anchorBounds.bottom; // 从按钮到屏幕底部
    position.left = boundaryBounds.left;                          // 左对齐屏幕
  }
  break;
```

**向上展开修复：**
```typescript
case 'top':
  if (config.maskPartial) {
    // 抽屉从屏幕顶部延伸到按钮顶部
    position.width = boundaryBounds.width;
    position.height = anchorBounds.top - boundaryBounds.top;
    position.top = boundaryBounds.top;
    position.left = boundaryBounds.left;
  }
  break;
```

**向左展开修复：**
```typescript
case 'left':
  if (config.maskPartial) {
    // 抽屉从屏幕左边缘延伸到按钮左边缘
    position.width = anchorBounds.left - boundaryBounds.left;
    position.height = boundaryBounds.height;
    position.left = boundaryBounds.left;
    position.top = boundaryBounds.top;
  }
  break;
```

**向右展开修复：**
```typescript
case 'right':
  if (config.maskPartial) {
    // 抽屉从按钮右边缘延伸到屏幕右边缘
    position.width = boundaryBounds.right - anchorBounds.right;
    position.height = boundaryBounds.height;
    position.left = anchorBounds.right;
    position.top = boundaryBounds.top;
  }
  break;
```

### 修复 2: 支持视口坐标系统

**文件：** `drawer.anchor.ts`

**修改 `getElementBounds` 函数：**
```typescript
/**
 * 获取元素边界信息
 * @param useViewportCoords - 如果为 true，返回相对于视口的坐标（用于 fixed 定位）
 */
function getElementBounds(element: HTMLElement, useViewportCoords: boolean = false): ElementBounds {
  const rect = element.getBoundingClientRect();
  
  // 对于 fixed 定位，使用视口坐标；否则使用文档坐标
  if (useViewportCoords) {
    return {
      top: rect.top,      // 不加滚动偏移
      left: rect.left,    // 不加滚动偏移
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2
    };
  }
  
  // 文档坐标（用于 absolute 定位）
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    // ...
  };
}
```

**修改 `getViewportBounds` 函数：**
```typescript
/**
 * 获取视口边界
 * @param useViewportCoords - 如果为 true，返回相对于视口的坐标（用于 fixed 定位）
 */
function getViewportBounds(useViewportCoords: boolean = false): ElementBounds {
  if (useViewportCoords) {
    return {
      top: 0,              // 视口顶部是 0
      left: 0,             // 视口左侧是 0
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
      centerX: window.innerWidth / 2,
      centerY: window.innerHeight / 2
    };
  }
  
  // 文档坐标
  return {
    top: window.scrollY,
    left: window.scrollX,
    // ...
  };
}
```

**修改 `calculateAnchorPosition` 函数：**
```typescript
export function calculateAnchorPosition(
  anchorElement: HTMLElement,
  drawerSize: { width: number; height: number },
  config: AnchorConfig
): AnchorPosition {
  // 使用视口坐标系统（因为抽屉和遮罩都使用 fixed 定位）
  const anchorBounds = getElementBounds(anchorElement, true);
  const boundaryBounds = getViewportBounds(true);
  
  // ... 其余代码
}
```

### 修复 3: 调整 z-index 和样式

**文件：** `drawer.anchor.ts`

**修改 `createPartialMask` 函数：**
```typescript
export function createPartialMask(
  bounds: {
    top: number;
    left: number;
    width: number;
    height: number;
  },
  className: string = 'drawer-partial-mask'
): HTMLElement {
  const mask = document.createElement('div');
  mask.className = className;
  mask.style.cssText = `
    position: fixed;
    top: ${bounds.top}px;
    left: ${bounds.left}px;
    width: ${bounds.width}px;
    height: ${bounds.height}px;
    background-color: rgba(0, 0, 0, 0.45);  // 调整透明度
    pointer-events: auto;
    z-index: 998;                             // 低于抽屉的 1000
    transition: opacity 0.3s ease;            // 添加过渡动画
  `;
  return mask;
}
```

### 修复 4: 隐藏锚点模式下的默认遮罩

**文件：** `drawer.tsx`

**修改渲染方法：**
```tsx
return (
  <Host class={this.getContainerClass()}>
    {/* 遮罩层（锚点模式下使用部分遮罩，不显示默认遮罩） */}
    {this.mask && !this.isAnchorMode && (  // 添加 !this.isAnchorMode 条件
      <div
        class={`drawer-mask ${this.maskClass}`}
        onClick={this.handleMaskClick}
        style={{ zIndex: (this.zIndex - 1).toString() }}
      />
    )}
    
    {/* 抽屉主体 */}
    <div class="drawer-wrapper" style={this.getDrawerStyle()}>
      {/* ... */}
    </div>
  </Host>
);
```

## 工作原理

### 1. 坐标系统

现在有两种坐标系统：

#### 文档坐标（Document Coordinates）
- 相对于整个文档左上角
- 包含滚动偏移量
- 用于 `absolute` 定位

```typescript
const docCoords = getElementBounds(element, false);
// docCoords.top = rect.top + window.scrollY
```

#### 视口坐标（Viewport Coordinates）
- 相对于浏览器视口左上角
- 不包含滚动偏移量
- 用于 `fixed` 定位

```typescript
const viewportCoords = getElementBounds(element, true);
// viewportCoords.top = rect.top (不加 scrollY)
```

### 2. 部分遮罩的创建和定位

当启用 `anchor-mask-partial="true"` 时：

1. **计算锚点位置**（使用视口坐标）：
   ```typescript
   const anchorBounds = getElementBounds(anchorElement, true);
   ```

2. **计算遮罩范围**（根据展开方向）：
   ```typescript
   // 向下展开：遮罩覆盖按钮下方到屏幕底部
   if (placement === 'bottom') {
     position.maskBounds = {
       top: anchorBounds.bottom,  // 按钮底部
       left: 0,                   // 屏幕左侧
       width: window.innerWidth,  // 屏幕宽度
       height: window.innerHeight - anchorBounds.bottom  // 到屏幕底部
     };
   }
   ```

3. **创建遮罩元素**（使用 fixed 定位）：
   ```typescript
   const mask = createPartialMask(position.maskBounds);
   document.body.appendChild(mask);
   ```

4. **z-index 层叠**：
   - 页面内容: z-index < 998
   - 部分遮罩: z-index = 998
   - 抽屉: z-index = 1000
   - 确保抽屉显示在遮罩之上

### 3. 四个方向的遮罩范围

#### 向下展开 (bottom)
```
┌─────────────────────┐
│   可交互区域          │
│  ┌─────┐            │
│  │按钮 │            │
│  └─────┘            │
├─────────────────────┤ ← 按钮底部
│█████████████████████│
│█████  遮罩区域  █████│
│█████████████████████│
└─────────────────────┘
```

#### 向上展开 (top)
```
┌─────────────────────┐
│█████████████████████│
│█████  遮罩区域  █████│
│█████████████████████│
├─────────────────────┤ ← 按钮顶部
│  ┌─────┐            │
│  │按钮 │            │
│  └─────┘            │
│   可交互区域          │
└─────────────────────┘
```

#### 向左展开 (left)
```
┌──────────┬──────────┐
│██████████│          │
│██  遮罩 ██│  可交互  │
│██  区域 ██│  区域    │
│██████████│          │
└──────────┴──────────┘
     ↑ 按钮左侧
```

#### 向右展开 (right)
```
┌──────────┬──────────┐
│          │██████████│
│  可交互  │██  遮罩 ██│
│  区域    │██  区域 ██│
│          │██████████│
└──────────┴──────────┘
          ↑ 按钮右侧
```

## 验证方法

### 1. 测试步骤

1. **打开文档页面**
   ```
   packages/webcomponent/docs/components/drawer.md
   ```

2. **找到示例章节**
   - 找到"锚点定位 - 部分遮罩展开"
   - 看到四个按钮：向下展开 ▼、向上展开 ▲、向左展开 ◀、向右展开 ▶

3. **测试每个方向**
   - 点击"向下展开 ▼"
   - 点击"向上展开 ▲"
   - 点击"向左展开 ◀"
   - 点击"向右展开 ▶"

### 2. 预期效果

✅ **正确的表现：**
- 抽屉从按钮位置向指定方向展开
- **只在展开方向有遮罩**（关键）
- 未展开的区域保持透明，可以点击页面其他元素
- 抽屉完全可见，不会被遮罩盖住
- 遮罩对齐到按钮边缘，范围合理

❌ **错误的表现（修复前）：**
- 整个屏幕被遮罩覆盖
- 看不到抽屉或抽屉被遮罩盖住
- 无法点击页面其他元素

### 3. 开发者工具检查

打开浏览器开发者工具：

1. **检查部分遮罩元素**
   ```javascript
   const mask = document.querySelector('.drawer-partial-mask');
   console.log('Mask:', mask);
   console.log('Position:', mask.style.position);  // 应该是 "fixed"
   console.log('Top:', mask.style.top);
   console.log('Left:', mask.style.left);
   console.log('Width:', mask.style.width);
   console.log('Height:', mask.style.height);
   console.log('Z-index:', mask.style.zIndex);     // 应该是 "998"
   ```

2. **检查抽屉元素**
   ```javascript
   const drawer = document.querySelector('ldesign-drawer');
   const wrapper = drawer.shadowRoot.querySelector('.drawer-wrapper');
   console.log('Drawer wrapper:', wrapper);
   console.log('Z-index:', getComputedStyle(wrapper).zIndex);  // 应该是 "1000"
   ```

3. **检查默认遮罩**
   ```javascript
   const defaultMask = drawer.shadowRoot.querySelector('.drawer-mask');
   console.log('Default mask:', defaultMask);  // 应该是 null（锚点模式下）
   ```

## 影响范围

### 修复的功能
- ✅ 锚点部分遮罩现在正确显示在展开方向
- ✅ 抽屉可见且正确定位
- ✅ 未展开的区域保持可交互
- ✅ z-index 层叠正确
- ✅ 遮罩不会全屏覆盖

### 不影响的功能
- ✅ 普通抽屉模式不受影响
- ✅ 锚点定位（无部分遮罩）仍然正常工作
- ✅ 其他组件功能完全正常

## 相关文件

- `drawer.anchor.ts` - 锚点定位工具（已修复坐标系统和 z-index）
- `drawer.tsx` - 组件源码（已修复默认遮罩显示逻辑）
- `drawer.md` - 组件文档（示例正确，无需修改）
- `ANCHOR_PARTIAL_DRAWER_FIX.md` - 按钮事件绑定修复文档

## 技术要点

### 1. CSS 定位系统

| 定位类型 | 坐标原点 | 受滚动影响 | 使用场景 |
|---------|---------|-----------|----------|
| `fixed` | 视口左上角 | 否 | 固定在屏幕上的元素（遮罩、抽屉） |
| `absolute` | 最近定位祖先 | 是 | 相对于父元素定位 |
| `relative` | 元素原位置 | 是 | 微调元素位置 |
| `sticky` | 视口/容器 | 是/否 | 滚动吸顶/吸底 |

### 2. getBoundingClientRect()

- 返回相对于**视口**的坐标
- 不包含滚动偏移
- 适合 `fixed` 定位使用

```typescript
const rect = element.getBoundingClientRect();
// rect.top 是相对于视口顶部的距离，不需要加 scrollY
```

### 3. 滚动偏移

- `window.scrollY`: 页面垂直滚动距离
- `window.scrollX`: 页面水平滚动距离
- 只在需要文档坐标时添加

```typescript
// 文档坐标 = 视口坐标 + 滚动偏移
const docTop = rect.top + window.scrollY;
const docLeft = rect.left + window.scrollX;
```

## 修复效果对比

### 修复前 ❌
```
┌─────────────────────────────┐
│  可交互区域                  │
│  ┌─────┐                    │
│  │按钮 │                    │
│  └─────┘                    │
├─────────────────────────────┤ ← 按钮底部
│█████████████████████████████│
│█████  遮罩正确  █████████████│
│█████████████████████████████│
│  ┌───────┐ ← 抽屉太小！     │
│  │ 300px │                  │
│  └───────┘                  │
└─────────────────────────────┘
```

### 修复后 ✅
```
┌─────────────────────────────┐
│  可交互区域                  │
│  ┌─────┐                    │
│  │按钮 │                    │
│  └─────┘                    │
├─────────────────────────────┤ ← 按钮底部
│█████████████████████████████│
│█████  遮罩覆盖  █████████████│
│█████████████████████████████│
│┌───────────────────────────┐│
││  抽屉铺满整个区域！        ││
│└───────────────────────────┘│
└─────────────────────────────┘
```

## 测试文件

创建了专门的测试文件 `test-anchor-partial-fill.html` 来验证修复效果：

```bash
# 在浏览器中打开测试文件
test-anchor-partial-fill.html
```

测试文件包含：
- ✅ 四个方向的完整测试（上、下、左、右）
- ✅ 实时坐标显示
- ✅ 控制台日志输出预期值和实际值
- ✅ 详细的预期效果说明
- ✅ 开发者工具检查指南

## 总结

这次修复解决了锚点部分遮罩功能中的四个关键问题：

1. **抽屉尺寸问题**：部分遮罩模式下，抽屉现在自动铺满从按钮到屏幕边界的整个区域
2. **坐标系统混淆**：通过添加 `useViewportCoords` 参数，支持视口和文档两种坐标系统
3. **z-index 冲突**：调整部分遮罩的 z-index 为 998，确保抽屉显示在遮罩之上
4. **遮罩重复**：在锚点模式下隐藏默认的全屏遮罩，只显示部分遮罩

修复后，锚点部分遮罩功能完全符合预期：
- ✅ 抽屉从按钮位置向指定方向铺满整个区域
- ✅ 遮罩只覆盖展开方向
- ✅ 未展开的区域保持透明可交互
- ✅ 抽屉完全可见，不被遮罩盖住
- ✅ 四个方向均工作正常
