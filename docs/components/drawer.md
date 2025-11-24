# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 何时使用

- 抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。
- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## 代码演示

### 基础用法

基础抽屉，点击触发按钮抽屉从右侧滑出。

<div class="demo-container">
  <ldesign-button id="basic-drawer-btn">打开抽屉</ldesign-button>
  
  <ldesign-drawer id="basic-drawer" title="基础抽屉">
    <p>抽屉内容</p>
    <p>抽屉内容</p>
    <p>抽屉内容</p>
  </ldesign-drawer>
</div>


```html
<ldesign-button id="open-btn">打开抽屉</ldesign-button>

<ldesign-drawer id="drawer" title="基础抽屉">
  <p>抽屉内容</p>
</ldesign-drawer>

<script>
  const btn = document.getElementById('open-btn');
  const drawer = document.getElementById('drawer');
  
  btn.addEventListener('ldesignClick', () => {
    drawer.visible = true;
  });
</script>
```

### 不同位置

抽屉可以从四个方向滑出。

<div class="demo-container">
  <ldesign-button id="left-drawer-btn">左侧</ldesign-button>
  <ldesign-button id="right-drawer-btn">右侧</ldesign-button>
  <ldesign-button id="top-drawer-btn">顶部</ldesign-button>
  <ldesign-button id="bottom-drawer-btn">底部</ldesign-button>
  
  <ldesign-drawer id="left-drawer" title="左侧抽屉" placement="left">
    <p>从左侧滑出</p>
  </ldesign-drawer>
  
  <ldesign-drawer id="right-drawer" title="右侧抽屉" placement="right">
    <p>从右侧滑出</p>
  </ldesign-drawer>
  
  <ldesign-drawer id="top-drawer" title="顶部抽屉" placement="top">
    <p>从顶部滑出</p>
  </ldesign-drawer>
  
  <ldesign-drawer id="bottom-drawer" title="底部抽屉" placement="bottom">
    <p>从底部滑出</p>
  </ldesign-drawer>
</div>


```html
<ldesign-drawer placement="left">左侧</ldesign-drawer>
<ldesign-drawer placement="right">右侧</ldesign-drawer>
<ldesign-drawer placement="top">顶部</ldesign-drawer>
<ldesign-drawer placement="bottom">底部</ldesign-drawer>
```

### 自定义宽度

可以自定义抽屉的宽度或高度。

<div class="demo-container">
  <ldesign-button id="custom-width-btn">自定义宽度</ldesign-button>
  
  <ldesign-drawer id="custom-width-drawer" title="自定义宽度" width="720">
    <p>宽度为 720px</p>
  </ldesign-drawer>
</div>


```html
<ldesign-drawer width="720">
  自定义宽度
</ldesign-drawer>
```

### 自定义页脚

可以自定义抽屉的页脚按钮。

<div class="demo-container">
  <ldesign-button id="custom-footer-drawer-btn">自定义页脚</ldesign-button>
  
  <ldesign-drawer id="custom-footer-drawer" title="自定义页脚">
    <p>抽屉内容</p>
    <div slot="footer">
      <ldesign-button id="drawer-cancel-btn">取消</ldesign-button>
      <ldesign-button type="primary" id="drawer-ok-btn">确定</ldesign-button>
    </div>
  </ldesign-drawer>
</div>


```html
<ldesign-drawer title="自定义页脚">
  <p>内容</p>
  
  <div slot="footer">
    <ldesign-button>取消</ldesign-button>
    <ldesign-button type="primary">确定</ldesign-button>
  </div>
</ldesign-drawer>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const visible = ref(false);

const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};
</script>

<template>
  <ldesign-button @ldesignClick="showDrawer">
    打开抽屉
  </ldesign-button>
  
  <ldesign-drawer
    :visible="visible"
    title="抽屉标题"
    @ldesignClose="onClose"
  >
    <p>抽屉内容</p>
  </ldesign-drawer>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <ldesign-button onLdesignClick={() => setVisible(true)}>
        打开抽屉
      </ldesign-button>
      
      <ldesign-drawer
        visible={visible}
        title="抽屉标题"
        onLdesignClose={() => setVisible(false)}
      >
        <p>抽屉内容</p>
      </ldesign-drawer>
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `visible` | 是否可见 | `boolean` | `false` |
| `title` | 标题 | `string` | - |
| `placement` | 抽屉的方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| `width` | 宽度 | `number \| string` | `378` |
| `height` | 高度（placement为top或bottom时生效） | `number \| string` | `378` |
| `closable` | 是否显示关闭按钮 | `boolean` | `true` |
| `mask` | 是否显示遮罩 | `boolean` | `true` |
| `mask-closable` | 点击遮罩是否关闭 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignClose` | 关闭时触发 | `() => void` |
| `ldesignAfterOpen` | 打开动画完成后触发 | `() => void` |
| `ldesignAfterClose` | 关闭动画完成后触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 抽屉内容 |
| `title` | 自定义标题 |
| `footer` | 自定义页脚 |

## 相关组件

- [Modal 对话框](./modal.md)

<script>
if (typeof window !== 'undefined') {
  const initDrawers = () => {
    // 基础用法
    const basicBtn = document.getElementById('basic-drawer-btn');
    const basicDrawer = document.getElementById('basic-drawer');
    if (basicBtn && basicDrawer) {
      basicBtn.addEventListener('ldesignClick', () => {
        basicDrawer.visible = true;
      });
    }
    
    // 不同位置
    ['left', 'right', 'top', 'bottom'].forEach(placement => {
      const btn = document.getElementById(`${placement}-drawer-btn`);
      const drawer = document.getElementById(`${placement}-drawer`);
      if (btn && drawer) {
        btn.addEventListener('ldesignClick', () => {
          drawer.visible = true;
        });
      }
    });
    
    // 自定义宽度
    const customWidthBtn = document.getElementById('custom-width-btn');
    const customWidthDrawer = document.getElementById('custom-width-drawer');
    if (customWidthBtn && customWidthDrawer) {
      customWidthBtn.addEventListener('ldesignClick', () => {
        customWidthDrawer.visible = true;
      });
    }
    
    // 自定义页脚
    const customFooterBtn = document.getElementById('custom-footer-drawer-btn');
    const customFooterDrawer = document.getElementById('custom-footer-drawer');
    if (customFooterBtn && customFooterDrawer) {
      customFooterBtn.addEventListener('ldesignClick', () => {
        customFooterDrawer.visible = true;
      });
      
      const cancelBtn = document.getElementById('drawer-cancel-btn');
      const okBtn = document.getElementById('drawer-ok-btn');
      
      if (cancelBtn) {
        cancelBtn.addEventListener('ldesignClick', () => {
          customFooterDrawer.visible = false;
        });
      }
      
      if (okBtn) {
        okBtn.addEventListener('ldesignClick', () => {
          customFooterDrawer.visible = false;
        });
      }
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrawers);
  } else {
    initDrawers();
  }
}
</script>
