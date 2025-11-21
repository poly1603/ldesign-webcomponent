# 内存泄漏扫描报告

> **扫描时间**: 2025-11-20T08:05:13.236Z
> **扫描文件**: 87 个
> **发现问题**: 202 个

---

## 📊 问题统计

| 严重程度 | 数量 |
|----------|------|
| 🔴 High | 148 |
| 🟡 Medium | 24 |
| 🟢 Low | 30 |
| **总计** | **202** |

---

## 📋 详细问题列表

### 1. `tree\tree.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🔴 HIGH (2)

- **Line 936**: Direct addEventListener
  ```typescript
  el.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 954**: Direct addEventListener
  ```typescript
  el.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 2. `virtual-list\virtual-list.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 135**: Direct addEventListener
  ```typescript
  containerRef.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 3. `time-picker\time-picker.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 178**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 4. `tabs\tabs.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🔴 HIGH (1)

- **Line 153**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (1)

- **Line 132**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

---

### 5. `swiper\swiper.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 4

#### 🔴 HIGH (3)

- **Line 259**: Direct addEventListener
  ```typescript
  host.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 260**: Direct addEventListener
  ```typescript
  host.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 277**: Direct addEventListener
  ```typescript
  host.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (1)

- **Line 114**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

---

### 6. `split\split.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🔴 HIGH (2)

- **Line 76**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 77**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 7. `slider\slider.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🔴 HIGH (2)

- **Line 118**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 119**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 8. `scrollbar\scrollbar.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 14

#### 🔴 HIGH (12)

- **Line 123**: Direct addEventListener
  ```typescript
  wrapEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 127**: Direct addEventListener
  ```typescript
  wrapEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 133**: Direct addEventListener
  ```typescript
  wrapEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 133**: Direct addEventListener
  ```typescript
  wrapEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 133**: Direct addEventListener
  ```typescript
  wrapEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 138**: Direct addEventListener
  ```typescript
  wrapEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 334**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 335**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 343**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 344**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 508**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 509**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (2)

- **Line 149**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

- **Line 151**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

---

### 9. `ripple\ripple.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 152**: Direct addEventListener
  ```typescript
  target.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 10. `resize-box\resize-box.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 4

#### 🔴 HIGH (4)

- **Line 129**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 130**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 156**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 157**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 11. `radio-group\radio-group.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 87**: Direct addEventListener
  ```typescript
  radio.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 12. `popup\popup.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 10

#### 🔴 HIGH (10)

- **Line 140**: Direct addEventListener
  ```typescript
  triggerElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 141**: Direct addEventListener
  ```typescript
  triggerElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 144**: Direct addEventListener
  ```typescript
  triggerElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 148**: Direct addEventListener
  ```typescript
  triggerElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 152**: Direct addEventListener
  ```typescript
  triggerElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 153**: Direct addEventListener
  ```typescript
  triggerElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 169**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 174**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 490**: Direct addEventListener
  ```typescript
  popupElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 491**: Direct addEventListener
  ```typescript
  popupElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 13. `picker\picker.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 10

#### 🔴 HIGH (4)

- **Line 211**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 215**: Direct addEventListener
  ```typescript
  containerEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1345**: Direct setTimeout
  ```typescript
  searchDebounceTimer = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

- **Line 1396**: Direct setTimeout
  ```typescript
  quickJumpTimer = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

#### 🟢 LOW (6)

- **Line 705**: Direct requestAnimationFrame
  ```typescript
  raf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 707**: Direct requestAnimationFrame
  ```typescript
  raf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 770**: Direct requestAnimationFrame
  ```typescript
  raf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 772**: Direct requestAnimationFrame
  ```typescript
  raf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 1113**: Direct requestAnimationFrame
  ```typescript
  raf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 1115**: Direct requestAnimationFrame
  ```typescript
  raf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

### 14. `modal\modal.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 32

#### 🔴 HIGH (29)

- **Line 336**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 337**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 338**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 415**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 416**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 417**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 542**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 546**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 550**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 553**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 902**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 903**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 905**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 906**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 907**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1106**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1107**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1109**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1110**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1111**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1700**: Direct addEventListener
  ```typescript
  bodyElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1771**: Direct addEventListener
  ```typescript
  vv.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1772**: Direct addEventListener
  ```typescript
  vv.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1855**: Direct addEventListener
  ```typescript
  darkModeQuery.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1890**: Direct addEventListener
  ```typescript
  modalElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1897**: Direct addEventListener
  ```typescript
  modalElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1909**: Direct addEventListener
  ```typescript
  modalElement.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1961**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1962**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟢 LOW (3)

- **Line 851**: Direct requestAnimationFrame
  ```typescript
  dragRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 990**: Direct requestAnimationFrame
  ```typescript
  resizeRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 1680**: Direct requestAnimationFrame
  ```typescript
  resizeRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

### 15. `message\message.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 131**: Direct addEventListener
  ```typescript
  root.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 16. `menu\menu.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 6

#### 🔴 HIGH (5)

- **Line 143**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 144**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 149**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 309**: Direct addEventListener
  ```typescript
  el.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 328**: Direct addEventListener
  ```typescript
  el.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (1)

- **Line 147**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

---

### 17. `notification\notification.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 102**: Direct addEventListener
  ```typescript
  root.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 18. `mention\mention.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 185**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 19. `image-preview\image-preview.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 112**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 20. `image-viewer\image-viewer.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🔴 HIGH (2)

- **Line 205**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 296**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 21. `image\image.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 3

#### 🔴 HIGH (2)

- **Line 441**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 480**: Direct addEventListener
  ```typescript
  viewerEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (1)

- **Line 254**: New IntersectionObserver
  ```typescript
  new IntersectionObserver(
  ```
  **修复建议**: `this.observeIntersection(...)`

---

### 22. `grid\grid.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 4

#### 🔴 HIGH (2)

- **Line 109**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 186**: Direct addEventListener
  ```typescript
  btn.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (2)

- **Line 106**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

- **Line 145**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

---

### 23. `dropdown-panel\dropdown-panel.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🔴 HIGH (1)

- **Line 82**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (1)

- **Line 73**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

---

### 24. `dropdown\dropdown.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 139**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 25. `ellipsis\ellipsis.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 8

#### 🔴 HIGH (5)

- **Line 130**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 131**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 182**: Direct setTimeout
  ```typescript
  debounceTimer = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

- **Line 307**: Direct setTimeout
  ```typescript
  animationTimeout = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

- **Line 366**: Direct setTimeout
  ```typescript
  autoCollapseTimer = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

#### 🟡 MEDIUM (1)

- **Line 127**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

#### 🟢 LOW (2)

- **Line 302**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 335**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

### 26. `draggable\draggable.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 10

#### 🔴 HIGH (1)

- **Line 181**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (1)

- **Line 183**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

#### 🟢 LOW (8)

- **Line 408**: Direct requestAnimationFrame
  ```typescript
  moveRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 592**: Direct requestAnimationFrame
  ```typescript
  bounceRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 594**: Direct requestAnimationFrame
  ```typescript
  bounceRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 623**: Direct requestAnimationFrame
  ```typescript
  momentumRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 625**: Direct requestAnimationFrame
  ```typescript
  momentumRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 657**: Direct requestAnimationFrame
  ```typescript
  zoomRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 667**: Direct requestAnimationFrame
  ```typescript
  zoomRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 772**: Direct requestAnimationFrame
  ```typescript
  fpsRaf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

### 27. `drawer\drawer.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 15

#### 🔴 HIGH (11)

- **Line 658**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 659**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 660**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 661**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1008**: Direct addEventListener
  ```typescript
  drawerRef.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1009**: Direct addEventListener
  ```typescript
  drawerRef.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1010**: Direct addEventListener
  ```typescript
  drawerRef.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1060**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1061**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1070**: Direct addEventListener
  ```typescript
  visualViewport.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1180**: Direct addEventListener
  ```typescript
  contentRef.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (3)

- **Line 1238**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

- **Line 1116**: New IntersectionObserver
  ```typescript
  new IntersectionObserver(
  ```
  **修复建议**: `this.observeIntersection(...)`

- **Line 1136**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

#### 🟢 LOW (1)

- **Line 834**: Direct requestAnimationFrame
  ```typescript
  rafId = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

### 28. `countdown\countdown.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 105**: Direct setInterval
  ```typescript
  timer = setInterval(
  ```
  **修复建议**: `this.addSafeInterval(...)`

---

### 29. `color-picker-panel\color-picker-panel.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 5

#### 🔴 HIGH (4)

- **Line 361**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 361**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 390**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 390**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (1)

- **Line 104**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

---

### 30. `collapse\collapse.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 314**: Direct addEventListener
  ```typescript
  el.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 31. `collapse\collapse-panel.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🔴 HIGH (2)

- **Line 227**: Direct addEventListener
  ```typescript
  el.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 268**: Direct addEventListener
  ```typescript
  el.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 32. `checkbox-group\checkbox-group.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 78**: Direct addEventListener
  ```typescript
  box.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 33. `cascader\cascader.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 3

#### 🔴 HIGH (3)

- **Line 206**: Direct setTimeout
  ```typescript
  leaveTimer = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

- **Line 268**: Direct setTimeout
  ```typescript
  hoverTimer = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

- **Line 288**: Direct setTimeout
  ```typescript
  leaveTimer = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

---

### 34. `circle-navigation\circle-navigation.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 13

#### 🔴 HIGH (6)

- **Line 127**: Direct addEventListener
  ```typescript
  containerEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 130**: Direct addEventListener
  ```typescript
  containerEl.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 212**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 213**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 283**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 284**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (2)

- **Line 109**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

- **Line 118**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

#### 🟢 LOW (5)

- **Line 186**: Direct requestAnimationFrame
  ```typescript
  raf = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 366**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 369**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 404**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 408**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

### 35. `calendar\calendar.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 12

#### 🔴 HIGH (12)

- **Line 145**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 146**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 257**: Direct addEventListener
  ```typescript
  menuItem.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 667**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 668**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 941**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 942**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1226**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1367**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1368**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1456**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 1457**: Direct addEventListener
  ```typescript
  document.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 36. `button\button.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 202**: Direct setTimeout
  ```typescript
  loadingDelayTimer = setTimeout(
  ```
  **修复建议**: `this.addSafeTimeout(...)`

---

### 37. `backtop\backtop.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 3

#### 🔴 HIGH (3)

- **Line 76**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 101**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 103**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 38. `anchor\anchor.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🔴 HIGH (1)

- **Line 58**: Direct addEventListener
  ```typescript
  scrollContainer.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 39. `affix\affix.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 4

#### 🔴 HIGH (4)

- **Line 96**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 97**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 101**: Direct addEventListener
  ```typescript
  scrollContainer.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 102**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

---

### 40. `alert\alert.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 4

#### 🔴 HIGH (2)

- **Line 125**: Direct addEventListener
  ```typescript
  window.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

- **Line 192**: Direct addEventListener
  ```typescript
  root.addEventListener(
  ```
  **修复建议**: `this.addSafeEventListener($1, ...)`

#### 🟡 MEDIUM (2)

- **Line 121**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

- **Line 99**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

---

### 41. `watermark\watermark.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🟡 MEDIUM (1)

- **Line 132**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

---

### 42. `grid-item\grid-item.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🟡 MEDIUM (1)

- **Line 45**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

---

### 43. `col\col.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🟡 MEDIUM (2)

- **Line 51**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

- **Line 70**: New MutationObserver
  ```typescript
  new MutationObserver(
  ```
  **修复建议**: `this.observeMutation(...)`

---

### 44. `avatar\avatar.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🟡 MEDIUM (1)

- **Line 123**: New ResizeObserver
  ```typescript
  new ResizeObserver(
  ```
  **修复建议**: `this.observeResize(...)`

---

### 45. `tabs\tab-panel.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🟢 LOW (2)

- **Line 115**: Direct requestAnimationFrame
  ```typescript
  animationTimer = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 129**: Direct requestAnimationFrame
  ```typescript
  animationTimer = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

### 46. `statistic\statistic.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 2

#### 🟢 LOW (2)

- **Line 117**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

- **Line 123**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

### 47. `progress\progress.tsx` ❌

⚠️ **未继承 BaseComponent**

**问题数量**: 1

#### 🟢 LOW (1)

- **Line 168**: Direct requestAnimationFrame
  ```typescript
  animationFrame = requestAnimationFrame(
  ```
  **修复建议**: `this.addSafeRAF(...)`

---

## 🔧 修复步骤

1. **让组件继承 BaseComponent**
   ```typescript
   import { BaseComponent } from '../base/base-component';
   export class YourComponent extends BaseComponent { }
   ```

2. **替换资源管理方法**
   - `addEventListener` → `this.addSafeEventListener`
   - `setTimeout` → `this.addSafeTimeout`
   - `setInterval` → `this.addSafeInterval`
   - `new ResizeObserver` → `this.observeResize`
   - `new IntersectionObserver` → `this.observeIntersection`
   - `requestAnimationFrame` → `this.addSafeRAF`

3. **删除手动清理代码**
   ```typescript
   disconnectedCallback() {
     super.disconnectedCallback(); // 一行搞定！
   }
   ```

## 📚 相关文档

- [修复模板](./COMPONENT_FIX_TEMPLATE.md)
- [BaseComponent API](./src/components/base/base-component.ts)
- [修复记录](./MEMORY_LEAK_FIXES.md)

---

**报告生成**: 2025-11-20T08:05:13.236Z  
**工具版本**: 1.0.0  
