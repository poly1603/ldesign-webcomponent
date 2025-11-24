# Modal 模态框

模态对话框，在浮层中显示，引导用户进行相关操作。

## 何时使用

- 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。
- 另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `Modal.confirm()` 等方法。

## 代码演示

### 基础用法

最简单的用法。

<div class="demo-container">
  <ldesign-button type="primary" id="basic-modal-btn">打开模态框</ldesign-button>
  
  <ldesign-modal id="basic-modal" modal-title="基础模态框">
    <p>这是一个基础的模态框内容</p>
    <p>支持任意的 HTML 内容</p>
  </ldesign-modal>
</div>


```html
<ldesign-button id="open-btn">打开模态框</ldesign-button>

<ldesign-modal id="my-modal" modal-title="基础模态框">
  <p>模态框内容</p>
</ldesign-modal>

<script>
  const btn = document.getElementById('open-btn');
  const modal = document.getElementById('my-modal');
  
  btn.addEventListener('ldesignClick', () => {
    modal.visible = true;
  });
</script>
```

### 不同尺寸

提供 small、medium、large、full 四种尺寸。

<div class="demo-container">
  <ldesign-button id="small-modal-btn">Small</ldesign-button>
  <ldesign-button id="medium-modal-btn">Medium</ldesign-button>
  <ldesign-button id="large-modal-btn">Large</ldesign-button>
  <ldesign-button id="full-modal-btn">Full</ldesign-button>
  
  <ldesign-modal id="small-modal" size="small" modal-title="小型模态框">
    <p>这是一个小型模态框</p>
  </ldesign-modal>
  
  <ldesign-modal id="medium-modal" size="medium" modal-title="中型模态框">
    <p>这是一个中型模态框（默认）</p>
  </ldesign-modal>
  
  <ldesign-modal id="large-modal" size="large" modal-title="大型模态框">
    <p>这是一个大型模态框</p>
  </ldesign-modal>
  
  <ldesign-modal id="full-modal" size="full" modal-title="全屏模态框">
    <p>这是一个全屏模态框</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal size="small">Small</ldesign-modal>
<ldesign-modal size="medium">Medium</ldesign-modal>
<ldesign-modal size="large">Large</ldesign-modal>
<ldesign-modal size="full">Full</ldesign-modal>
```

### 自定义宽高

可以自定义模态框的宽度和高度。

<div class="demo-container">
  <ldesign-button id="custom-size-btn">自定义尺寸</ldesign-button>
  
  <ldesign-modal id="custom-size-modal" width="800" height="400" modal-title="自定义尺寸">
    <p>宽度: 800px</p>
    <p>高度: 400px</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal width="800" height="400">
  自定义尺寸
</ldesign-modal>
```

### 居中显示

设置 `centered` 属性使模态框垂直居中。

<div class="demo-container">
  <ldesign-button id="centered-btn">居中模态框</ldesign-button>
  
  <ldesign-modal id="centered-modal" centered modal-title="居中模态框">
    <p>这个模态框垂直居中显示</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal centered>
  居中显示
</ldesign-modal>
```

### 可拖拽

设置 `is-draggable` 属性使模态框可拖拽。

<div class="demo-container">
  <ldesign-button id="draggable-btn">可拖拽模态框</ldesign-button>
  
  <ldesign-modal id="draggable-modal" is-draggable modal-title="试试拖动我">
    <p>按住标题栏拖动我！</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal is-draggable>
  可拖拽
</ldesign-modal>
```

### 可调整大小

设置 `resizable` 属性使模态框可调整大小。

<div class="demo-container">
  <ldesign-button id="resizable-btn">可调整大小</ldesign-button>
  
  <ldesign-modal id="resizable-modal" resizable modal-title="可调整大小">
    <p>拖动边框调整大小</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal resizable>
  可调整大小
</ldesign-modal>
```

### 可最大化

设置 `maximizable` 属性在标题栏显示最大化按钮。

<div class="demo-container">
  <ldesign-button id="maximizable-btn">可最大化</ldesign-button>
  
  <ldesign-modal id="maximizable-modal" maximizable modal-title="可最大化">
    <p>点击标题栏的最大化按钮</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal maximizable>
  可最大化
</ldesign-modal>
```

### 不同动画

提供多种动画效果。

<div class="demo-container">
  <ldesign-button id="fade-btn">Fade</ldesign-button>
  <ldesign-button id="zoom-btn">Zoom</ldesign-button>
  <ldesign-button id="slide-down-btn">Slide Down</ldesign-button>
  
  <ldesign-modal id="fade-modal" animation="fade" modal-title="淡入淡出">
    <p>Fade 动画效果</p>
  </ldesign-modal>
  
  <ldesign-modal id="zoom-modal" animation="zoom" modal-title="缩放">
    <p>Zoom 动画效果</p>
  </ldesign-modal>
  
  <ldesign-modal id="slide-down-modal" animation="slide-down" modal-title="下滑">
    <p>Slide Down 动画效果</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal animation="fade">Fade</ldesign-modal>
<ldesign-modal animation="zoom">Zoom</ldesign-modal>
<ldesign-modal animation="slide-down">Slide Down</ldesign-modal>
```

### 抽屉模式

使用 `variant` 属性创建抽屉效果。

<div class="demo-container">
  <ldesign-button id="drawer-left-btn">左侧抽屉</ldesign-button>
  <ldesign-button id="drawer-right-btn">右侧抽屉</ldesign-button>
  
  <ldesign-modal id="drawer-left-modal" variant="drawer-left" modal-title="左侧抽屉">
    <p>从左侧滑出的抽屉</p>
  </ldesign-modal>
  
  <ldesign-modal id="drawer-right-modal" variant="drawer-right" modal-title="右侧抽屉">
    <p>从右侧滑出的抽屉</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal variant="drawer-left">左侧抽屉</ldesign-modal>
<ldesign-modal variant="drawer-right">右侧抽屉</ldesign-modal>
```

### 底部表单

使用 `variant="bottom-sheet"` 创建底部表单效果。

<div class="demo-container">
  <ldesign-button id="bottom-sheet-btn">底部表单</ldesign-button>
  
  <ldesign-modal id="bottom-sheet-modal" variant="bottom-sheet" modal-title="底部表单">
    <p>从底部滑出的表单</p>
  </ldesign-modal>
</div>


```html
<ldesign-modal variant="bottom-sheet">
  底部表单
</ldesign-modal>
```

### 自定义页脚

可以自定义页脚按钮。

<div class="demo-container">
  <ldesign-button id="custom-footer-btn">自定义页脚</ldesign-button>
  
  <ldesign-modal id="custom-footer-modal" modal-title="自定义页脚">
    <p>自定义页脚按钮</p>
    <div slot="footer">
      <ldesign-button id="custom-cancel">取消</ldesign-button>
      <ldesign-button type="primary" id="custom-ok">确定</ldesign-button>
    </div>
  </ldesign-modal>
</div>


```html
<ldesign-modal modal-title="自定义页脚">
  <p>内容</p>
  
  <div slot="footer">
    <ldesign-button>取消</ldesign-button>
    <ldesign-button type="primary">确定</ldesign-button>
  </div>
</ldesign-modal>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const visible = ref(false);
const loading = ref(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
  loading.value = true;
  
  setTimeout(() => {
    loading.value = false;
    visible.value = false;
  }, 2000);
};

const handleCancel = () => {
  visible.value = false;
};
</script>

<template>
  <ldesign-button @ldesignClick="showModal">
    打开模态框
  </ldesign-button>
  
  <ldesign-modal
    :visible="visible"
    modal-title="模态框标题"
    :ok-loading="loading"
    @ldesignOk="handleOk"
    @ldesignCancel="handleCancel"
  >
    <p>模态框内容</p>
  </ldesign-modal>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleOk = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 2000);
  };
  
  return (
    <>
      <ldesign-button onLdesignClick={() => setVisible(true)}>
        打开模态框
      </ldesign-button>
      
      <ldesign-modal
        visible={visible}
        modal-title="模态框标题"
        ok-loading={loading}
        onLdesignOk={handleOk}
        onLdesignCancel={() => setVisible(false)}
      >
        <p>模态框内容</p>
      </ldesign-modal>
    </>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `visible` | 是否可见 | `boolean` | `false` |
| `modal-title` | 标题 | `string` | - |
| `size` | 尺寸 | `'small' \| 'medium' \| 'large' \| 'full' \| 'auto'` | `'medium'` |
| `width` | 自定义宽度 | `number \| string` | - |
| `height` | 自定义高度 | `number \| string` | - |
| `variant` | 变体 | `'modal' \| 'drawer-left' \| 'drawer-right' \| 'bottom-sheet'` | `'modal'` |
| `centered` | 垂直居中 | `boolean` | `false` |
| `closable` | 是否显示关闭按钮 | `boolean` | `true` |
| `mask` | 是否显示遮罩 | `boolean` | `true` |
| `mask-closable` | 点击遮罩是否关闭 | `boolean` | `true` |
| `keyboard` | 按ESC是否关闭 | `boolean` | `true` |
| `is-draggable` | 是否可拖拽 | `boolean` | `false` |
| `resizable` | 是否可调整大小 | `boolean` | `false` |
| `maximizable` | 是否可最大化 | `boolean` | `false` |
| `animation` | 动画类型 | `'fade' \| 'zoom' \| 'slide-down' \| 'slide-up' \| 'slide-left' \| 'slide-right'` | `'zoom'` |
| `destroy-on-close` | 关闭时销毁内容 | `boolean` | `false` |
| `ok-text` | 确定按钮文字 | `string` | `'确定'` |
| `cancel-text` | 取消按钮文字 | `string` | `'取消'` |
| `ok-type` | 确定按钮类型 | `ButtonType` | `'primary'` |
| `ok-loading` | 确定按钮加载状态 | `boolean` | `false` |
| `ok-disabled` | 确定按钮禁用状态 | `boolean` | `false` |
| `z-index` | z-index值 | `number` | `1000` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignOk` | 点击确定按钮时触发 | `() => void` |
| `ldesignCancel` | 点击取消按钮或关闭按钮时触发 | `() => void` |
| `ldesignAfterOpen` | 打开动画完成后触发 | `() => void` |
| `ldesignAfterClose` | 关闭动画完成后触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 模态框内容 |
| `header` | 自定义标题 |
| `footer` | 自定义页脚 |

## 相关组件

- [Drawer 抽屉](./drawer.md)
- [Button 按钮](./button.md)

<script>
if (typeof window !== 'undefined') {
  const initModals = () => {
    // 基础用法
    const basicBtn = document.getElementById('basic-modal-btn');
    const basicModal = document.getElementById('basic-modal');
    if (basicBtn && basicModal) {
      basicBtn.addEventListener('ldesignClick', () => {
        basicModal.visible = true;
      });
    }
    
    // 不同尺寸
    ['small', 'medium', 'large', 'full'].forEach(size => {
      const btn = document.getElementById(`${size}-modal-btn`);
      const modal = document.getElementById(`${size}-modal`);
      if (btn && modal) {
        btn.addEventListener('ldesignClick', () => {
          modal.visible = true;
        });
      }
    });
    
    // 自定义尺寸
    const customSizeBtn = document.getElementById('custom-size-btn');
    const customSizeModal = document.getElementById('custom-size-modal');
    if (customSizeBtn && customSizeModal) {
      customSizeBtn.addEventListener('ldesignClick', () => {
        customSizeModal.visible = true;
      });
    }
    
    // 居中显示
    const centeredBtn = document.getElementById('centered-btn');
    const centeredModal = document.getElementById('centered-modal');
    if (centeredBtn && centeredModal) {
      centeredBtn.addEventListener('ldesignClick', () => {
        centeredModal.visible = true;
      });
    }
    
    // 可拖拽
    const draggableBtn = document.getElementById('draggable-btn');
    const draggableModal = document.getElementById('draggable-modal');
    if (draggableBtn && draggableModal) {
      draggableBtn.addEventListener('ldesignClick', () => {
        draggableModal.visible = true;
      });
    }
    
    // 可调整大小
    const resizableBtn = document.getElementById('resizable-btn');
    const resizableModal = document.getElementById('resizable-modal');
    if (resizableBtn && resizableModal) {
      resizableBtn.addEventListener('ldesignClick', () => {
        resizableModal.visible = true;
      });
    }
    
    // 可最大化
    const maximizableBtn = document.getElementById('maximizable-btn');
    const maximizableModal = document.getElementById('maximizable-modal');
    if (maximizableBtn && maximizableModal) {
      maximizableBtn.addEventListener('ldesignClick', () => {
        maximizableModal.visible = true;
      });
    }
    
    // 不同动画
    ['fade', 'zoom', 'slide-down'].forEach(anim => {
      const btn = document.getElementById(`${anim}-btn`);
      const modal = document.getElementById(`${anim}-modal`);
      if (btn && modal) {
        btn.addEventListener('ldesignClick', () => {
          modal.visible = true;
        });
      }
    });
    
    // 抽屉模式
    ['drawer-left', 'drawer-right'].forEach(type => {
      const btn = document.getElementById(`${type}-btn`);
      const modal = document.getElementById(`${type}-modal`);
      if (btn && modal) {
        btn.addEventListener('ldesignClick', () => {
          modal.visible = true;
        });
      }
    });
    
    // 底部表单
    const bottomSheetBtn = document.getElementById('bottom-sheet-btn');
    const bottomSheetModal = document.getElementById('bottom-sheet-modal');
    if (bottomSheetBtn && bottomSheetModal) {
      bottomSheetBtn.addEventListener('ldesignClick', () => {
        bottomSheetModal.visible = true;
      });
    }
    
    // 自定义页脚
    const customFooterBtn = document.getElementById('custom-footer-btn');
    const customFooterModal = document.getElementById('custom-footer-modal');
    if (customFooterBtn && customFooterModal) {
      customFooterBtn.addEventListener('ldesignClick', () => {
        customFooterModal.visible = true;
      });
      
      const cancelBtn = document.getElementById('custom-cancel');
      const okBtn = document.getElementById('custom-ok');
      
      if (cancelBtn) {
        cancelBtn.addEventListener('ldesignClick', () => {
          customFooterModal.visible = false;
        });
      }
      
      if (okBtn) {
        okBtn.addEventListener('ldesignClick', () => {
          customFooterModal.visible = false;
        });
      }
    }
  };
  
  // 初次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModals);
  } else {
    initModals();
  }
}
</script>
