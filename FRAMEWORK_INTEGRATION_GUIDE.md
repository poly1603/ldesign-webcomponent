# 框架集成详细指南

> 完整的 Vue 3、React、Angular、原生 HTML 集成方案

---

## 📦 安装

```bash
# 主包
npm install @ldesign/webcomponent

# Vue 3 适配器（推荐）
npm install @ldesign/webcomponent-vue

# React 适配器（推荐）
npm install @ldesign/webcomponent-react

# Angular 适配器（推荐）
npm install @ldesign/webcomponent-angular
```

---

## 🎨 原生 HTML 集成

### 方式 1：CDN 引入（最简单）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>LDesign WebComponent Demo</title>
</head>
<body>
  <!-- ✅ 方式 1.1: ESM（推荐） -->
  <script type="module">
    import { defineCustomElements } from 
      'https://cdn.jsdelivr.net/npm/@ldesign/webcomponent/loader';
    defineCustomElements();
  </script>

  <!-- ✅ 方式 1.2: 按需加载 -->
  <script type="module">
    import 'https://cdn.jsdelivr.net/npm/@ldesign/webcomponent/dist/components/button.js';
    import 'https://cdn.jsdelivr.net/npm/@ldesign/webcomponent/dist/components/input.js';
  </script>

  <!-- 使用组件 -->
  <ldesign-button type="primary">点击我</ldesign-button>
  <ldesign-input placeholder="请输入内容"></ldesign-input>

  <script>
    // 事件监听
    const button = document.querySelector('ldesign-button');
    button.addEventListener('ldesignClick', (e) => {
      console.log('Button clicked!', e.detail);
    });

    // 获取输入值
    const input = document.querySelector('ldesign-input');
    input.addEventListener('ldesignChange', (e) => {
      console.log('Input value:', e.detail);
    });
  </script>
</body>
</html>
```

### 方式 2：NPM 安装 + 构建工具

```javascript
// main.js
import { defineCustomElements } from '@ldesign/webcomponent/loader';

defineCustomElements();

// 或者按需导入
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/table';
```

### 方式 3：懒加载（性能最优）

```javascript
// lazy-loader.js
import { ComponentLoader } from '@ldesign/webcomponent/utils';

// 创建懒加载器
const loader = new ComponentLoader({
  preload: ['button', 'input'],  // 预加载常用组件
  threshold: 0.1,
  rootMargin: '50px',
});

// 自动观察并加载组件
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lazy]').forEach(el => {
    loader.observeComponent(el);
  });
});
```

```html
<!-- 懒加载使用 -->
<ldesign-table data-lazy columns="..." dataSource="..." />
<ldesign-calendar data-lazy />
```

---

## ⚡ Vue 3 集成

### 方式 1：使用 Vue 适配器（推荐）

```typescript
// main.ts
import { createApp } from 'vue';
import { LDesignPlugin } from '@ldesign/webcomponent-vue';
import App from './App.vue';

const app = createApp(App);

// 安装插件（自动配置 + 类型支持）
app.use(LDesignPlugin);

app.mount('#app');
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('');
const tableData = ref([
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32 },
]);

const handleClick = (e: CustomEvent) => {
  console.log('Button clicked:', e.detail);
};

const handleInputChange = (e: CustomEvent<string>) => {
  inputValue.value = e.detail;
};
</script>

<template>
  <div class="app">
    <!-- ✅ 完整的类型提示和自动补全 -->
    <ldesign-button 
      type="primary" 
      size="large"
      @ldesignClick="handleClick"
    >
      点击我
    </ldesign-button>

    <ldesign-input
      v-model:value="inputValue"
      placeholder="请输入内容"
      @ldesignChange="handleInputChange"
    />

    <!-- ✅ 复杂数据通过属性传递 -->
    <ldesign-table
      :columns="columns"
      :dataSource="tableData"
      virtual
      :height="400"
    />
  </div>
</template>
```

### 方式 2：手动配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // ✅ 配置自定义元素
          isCustomElement: (tag) => tag.startsWith('ldesign-')
        }
      }
    })
  ]
});
```

```typescript
// main.ts
import { createApp } from 'vue';
import { defineCustomElements } from '@ldesign/webcomponent/loader';
import App from './App.vue';

// 定义自定义元素
defineCustomElements();

createApp(App).mount('#app');
```

### Vue 3 组合式 API 封装

```typescript
// composables/useLDesign.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useLDesignComponent<T extends HTMLElement>(
  selector: string,
  eventName: string
) {
  const element = ref<T | null>(null);
  const value = ref<any>(null);
  
  let handler: EventListener | null = null;
  
  onMounted(() => {
    const el = document.querySelector<T>(selector);
    if (el) {
      element.value = el;
      
      handler = ((e: CustomEvent) => {
        value.value = e.detail;
      }) as EventListener;
      
      el.addEventListener(eventName, handler);
    }
  });
  
  onUnmounted(() => {
    if (element.value && handler) {
      element.value.removeEventListener(eventName, handler);
    }
  });
  
  return {
    element,
    value,
  };
}
```

**使用方式**:

```vue
<script setup lang="ts">
import { useLDesignComponent } from './composables/useLDesign';

const { value: inputValue } = useLDesignComponent(
  '#my-input',
  'ldesignChange'
);

watch(inputValue, (newVal) => {
  console.log('Input changed:', newVal);
});
</script>

<template>
  <ldesign-input id="my-input" placeholder="请输入" />
</template>
```

---

## ⚛️ React 集成

### 方式 1：使用 React 适配器（推荐）

```tsx
// App.tsx
import React, { useState } from 'react';
import { 
  Button, 
  Input, 
  Table,
  Select,
  Modal 
} from '@ldesign/webcomponent-react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, name: '张三', age: 28 },
    { id: 2, name: '李四', age: 32 },
  ]);

  return (
    <div className="app">
      {/* ✅ React 友好的组件封装 */}
      <Button 
        type="primary"
        size="large"
        onClick={(e) => console.log('Clicked:', e.detail)}
      >
        点击我
      </Button>

      {/* ✅ 双向绑定支持 */}
      <Input
        value={inputValue}
        placeholder="请输入内容"
        onChange={(e) => setInputValue(e.detail)}
      />

      {/* ✅ 复杂属性自动处理 */}
      <Table
        columns={columns}
        dataSource={tableData}
        virtual
        height={400}
        onRowClick={(e) => console.log('Row clicked:', e.detail)}
      />
    </div>
  );
}

export default App;
```

### 方式 2：直接使用 Web Components

```tsx
// App.tsx
import React, { useRef, useEffect, useState } from 'react';
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';

// ✅ TypeScript 类型定义
import type { 
  HTMLLdesignButtonElement,
  HTMLLdesignInputElement 
} from '@ldesign/webcomponent';

function App() {
  const buttonRef = useRef<HTMLLdesignButtonElement>(null);
  const inputRef = useRef<HTMLLdesignInputElement>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    // ✅ 通过 ref 访问元素
    const button = buttonRef.current;
    const input = inputRef.current;

    if (button) {
      const handleClick = (e: Event) => {
        console.log('Button clicked:', (e as CustomEvent).detail);
      };
      button.addEventListener('ldesignClick', handleClick);
      
      return () => {
        button.removeEventListener('ldesignClick', handleClick);
      };
    }

    if (input) {
      const handleChange = (e: Event) => {
        setValue((e as CustomEvent).detail);
      };
      input.addEventListener('ldesignChange', handleChange);
      
      return () => {
        input.removeEventListener('ldesignChange', handleChange);
      };
    }
  }, []);

  return (
    <div>
      <ldesign-button 
        ref={buttonRef}
        type="primary"
      >
        点击我
      </ldesign-button>

      <ldesign-input
        ref={inputRef}
        placeholder="请输入内容"
        value={value}
      />
    </div>
  );
}
```

### React Hooks 封装

```typescript
// hooks/useLDesign.ts
import { useRef, useEffect, useState, RefObject } from 'react';

export function useLDesignEvent<T extends HTMLElement, D = any>(
  ref: RefObject<T>,
  eventName: string
): D | null {
  const [value, setValue] = useState<D | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handler = (e: Event) => {
      setValue((e as CustomEvent<D>).detail);
    };

    element.addEventListener(eventName, handler);
    
    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, [ref, eventName]);

  return value;
}

export function useLDesignMethod<T extends HTMLElement>(
  ref: RefObject<T>
) {
  const callMethod = <R = any>(methodName: string, ...args: any[]): R | undefined => {
    const element = ref.current;
    if (!element) return undefined;
    
    const method = (element as any)[methodName];
    if (typeof method === 'function') {
      return method.apply(element, args);
    }
    
    return undefined;
  };

  return { callMethod };
}
```

**使用方式**:

```tsx
function MyComponent() {
  const modalRef = useRef<HTMLLdesignModalElement>(null);
  const { callMethod } = useLDesignMethod(modalRef);
  
  const openModal = () => {
    callMethod('open');
  };
  
  const closeModal = () => {
    callMethod('close');
  };
  
  return (
    <>
      <button onClick={openModal}>打开弹窗</button>
      <ldesign-modal ref={modalRef} title="提示">
        <p>这是一个弹窗</p>
      </ldesign-modal>
    </>
  );
}
```

---

## 🅰️ Angular 集成

### 方式 1：使用 Angular 适配器（推荐）

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LDesignModule } from '@ldesign/webcomponent-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LDesignModule  // ✅ 导入适配器模块
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // ✅ 必需
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <!-- ✅ 使用组件 -->
      <ldesign-button 
        type="primary"
        (ldesignClick)="handleClick($event)"
      >
        点击我
      </ldesign-button>

      <ldesign-input
        [value]="inputValue"
        placeholder="请输入内容"
        (ldesignChange)="handleInputChange($event)"
      ></ldesign-input>

      <ldesign-table
        [columns]="columns"
        [dataSource]="tableData"
        [virtual]="true"
        [height]="400"
      ></ldesign-table>
    </div>
  `
})
export class AppComponent {
  inputValue = '';
  columns = [...];
  tableData = [...];

  handleClick(event: CustomEvent) {
    console.log('Button clicked:', event.detail);
  }

  handleInputChange(event: CustomEvent<string>) {
    this.inputValue = event.detail;
  }
}
```

### 方式 2：手动配置

```typescript
// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ldesign/webcomponent/loader';
import { AppModule } from './app/app.module';

// ✅ 在 Angular 启动前定义自定义元素
defineCustomElements().then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
```

---

## 🔧 高级用法

### 1. 动态组件加载

```typescript
// utils/dynamic-loader.ts
export async function loadComponentOnDemand(
  componentName: string
): Promise<void> {
  try {
    await import(
      `@ldesign/webcomponent/dist/components/${componentName}.js`
    );
    console.log(`Component ${componentName} loaded successfully`);
  } catch (error) {
    console.error(`Failed to load component ${componentName}:`, error);
  }
}

// 使用方式
loadComponentOnDemand('table').then(() => {
  const table = document.createElement('ldesign-table');
  document.body.appendChild(table);
});
```

### 2. 主题定制

```javascript
// theme-manager.js
class ThemeManager {
  setTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }
  
  customizeColors(colors) {
    const root = document.documentElement;
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--ld-color-${key}`, value);
    });
  }
}

export const themeManager = new ThemeManager();

// 使用
themeManager.setTheme('dark');
themeManager.customizeColors({
  primary: '#1890ff',
  success: '#52c41a',
  error: '#ff4d4f',
});
```

### 3. 全局配置

```typescript
// config/ldesign-config.ts
import { ComponentConfig } from '@ldesign/webcomponent';

export const ldesignConfig: ComponentConfig = {
  // 全局尺寸
  size: 'middle',
  
  // 国际化
  locale: 'zh-CN',
  
  // 主题
  theme: {
    token: {
      colorPrimary: '#7334cb',
      borderRadius: 6,
    },
  },
  
  // 组件默认配置
  components: {
    Button: {
      autoInsertSpace: true,
    },
    Table: {
      virtual: true,
      pageSize: 20,
    },
  },
};

// 应用配置
import { applyConfig } from '@ldesign/webcomponent';
applyConfig(ldesignConfig);
```

### 4. 性能监控集成

```typescript
// monitoring/performance.ts
import { PerformanceMonitor } from '@ldesign/webcomponent/utils';

// 自定义性能监控
class CustomPerfMonitor extends PerformanceMonitor {
  reportToServer(metrics: any) {
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics),
    });
  }
  
  checkThreshold() {
    const report = this.getReport();
    
    Object.entries(report).forEach(([key, data]) => {
      if (data.avg > 16) {  // 超过 16ms
        console.warn(`⚠️ Performance issue detected in ${key}`);
        this.reportToServer({ component: key, ...data });
      }
    });
  }
}

export const perfMonitor = new CustomPerfMonitor();

// 定期检查
setInterval(() => {
  perfMonitor.checkThreshold();
}, 60000);  // 每分钟检查一次
```

---

## 📚 常见问题

### Q1: 为什么组件样式不生效？

**A**: 确保正确引入了样式文件或启用了 Shadow DOM。

```html
<!-- 方式1：引入全局样式 -->
<link rel="stylesheet" href="node_modules/@ldesign/webcomponent/dist/ldesign/ldesign.css">

<!-- 方式2：在 JS 中导入 -->
<script>
  import '@ldesign/webcomponent/dist/ldesign/ldesign.css';
</script>
```

### Q2: Vue 3 中如何使用 v-model？

**A**: 使用自定义事件绑定。

```vue
<template>
  <!-- 手动双向绑定 -->
  <ldesign-input
    :value="inputValue"
    @ldesignChange="inputValue = $event.detail"
  />
  
  <!-- 使用适配器自动处理 -->
  <LdesignInput v-model="inputValue" />
</template>
```

### Q3: React 中类型提示不完整？

**A**: 安装 React 适配器或手动添加类型声明。

```typescript
// types/ldesign.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ldesign-button': any;
      'ldesign-input': any;
      // ... 其他组件
    }
  }
}

export {};
```

### Q4: 如何实现按需加载？

**A**: 使用动态 import 或懒加载器。

```javascript
// 动态加载
import('@ /webcomponent/button').then(() => {
  // 组件已加载
});

// 懒加载器
import { ComponentLoader } from '@ldesign/webcomponent/utils';
const loader = new ComponentLoader();
```

---

## 🎯 最佳实践

### 1. 性能优化

✅ **使用按需导入**
```javascript
// 推荐
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';

// 不推荐（加载所有组件）
import '@ldesign/webcomponent';
```

✅ **启用虚拟滚动**
```html
<ldesign-table virtual height="400" />
<ldesign-virtual-list height="600" />
```

✅ **使用懒加载**
```html
<ldesign-table data-lazy />
```

### 2. 代码组织

✅ **统一导入入口**
```typescript
// lib/ldesign.ts
export * from '@ldesign/webcomponent/button';
export * from '@ldesign/webcomponent/input';
export * from '@ldesign/webcomponent/table';

// 其他文件
import { LdesignButton } from '@/lib/ldesign';
```

✅ **类型定义**
```typescript
// types/components.d.ts
import type { Components } from '@ldesign/webcomponent';

export type LdesignButton = Components.LdesignButton;
export type LdesignInput = Components.LdesignInput;
```

### 3. 错误处理

✅ **全局错误监听**
```typescript
window.addEventListener('ldesign:error', (e: CustomEvent) => {
  console.error('LDesign component error:', e.detail);
  // 上报错误
});
```

---

**维护者**: LDesign Team  
**最后更新**: 2024-11-20
