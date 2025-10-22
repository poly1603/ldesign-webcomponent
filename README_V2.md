# @ldesign/webcomponent

高性能、现代化的 Web Components 组件库，基于 Stencil 构建，支持原生 HTML、Vue 3、React 等所有现代框架。

[![npm version](https://img.shields.io/npm/v/@ldesign/webcomponent.svg)](https://www.npmjs.com/package/@ldesign/webcomponent)
[![license](https://img.shields.io/npm/l/@ldesign/webcomponent.svg)](https://github.com/ldesign/webcomponent/blob/main/LICENSE)

## ✨ 特性

- 🚀 **高性能** - 虚拟滚动、对象池、自动内存管理
- 📦 **按需导入** - 完整的 Tree-shaking 支持，只打包使用的组件
- 🎨 **主题系统** - 亮色/暗色主题，完整的设计 token 系统
- 💪 **TypeScript** - 完整的类型定义和类型安全
- 🌐 **框架无关** - 可在原生 HTML、Vue、React、Angular 等任何框架中使用
- ♿ **无障碍** - 遵循 WCAG 2.1 标准
- 📱 **响应式** - 移动端友好
- 🎯 **零依赖** - 除 Stencil 运行时外无其他依赖

## 📦 安装

```bash
npm install @ldesign/webcomponent
# 或
yarn add @ldesign/webcomponent
# 或
pnpm add @ldesign/webcomponent
```

## 🚀 快速开始

### 原生 HTML/JavaScript

#### 方式1：CDN 引入（全量）

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/@ldesign/webcomponent"></script>
</head>
<body>
  <ldesign-button type="primary">点击我</ldesign-button>
  <ldesign-input placeholder="请输入内容"></ldesign-input>
</body>
</html>
```

#### 方式2：按需导入（推荐）

```html
<script type="module">
  // 只导入需要的组件
  import '@ldesign/webcomponent/button';
  import '@ldesign/webcomponent/input';
  import '@ldesign/webcomponent/table';
</script>

<ldesign-button type="primary">点击我</ldesign-button>
<ldesign-input placeholder="请输入内容"></ldesign-input>
```

### Vue 3

#### 1. 配置自定义元素

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 告诉 Vue 将 ldesign- 开头的标签视为自定义元素
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ldesign-');

app.mount('#app');
```

#### 2. 使用组件

```vue
<script setup lang="ts">
// 按需导入
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/table';
import { ref } from 'vue';

const columns = ref([
  { key: 'name', title: '姓名' },
  { key: 'age', title: '年龄' },
  { key: 'address', title: '地址' }
]);

const data = ref([
  { id: 1, name: '张三', age: 28, address: '北京' },
  { id: 2, name: '李四', age: 32, address: '上海' }
]);

const handleClick = () => {
  console.log('按钮被点击');
};
</script>

<template>
  <div>
    <ldesign-button 
      type="primary"
      @ldesignClick="handleClick"
    >
      点击我
    </ldesign-button>
    
    <ldesign-table
      :columns="JSON.stringify(columns)"
      :dataSource="JSON.stringify(data)"
      bordered
      striped
    />
  </div>
</template>
```

### React

```tsx
import { useEffect } from 'react';
// 按需导入
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/table';

// TypeScript 类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ldesign-button': any;
      'ldesign-table': any;
    }
  }
}

function App() {
  const columns = [
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄' },
    { key: 'address', title: '地址' }
  ];

  const data = [
    { id: 1, name: '张三', age: 28, address: '北京' },
    { id: 2, name: '李四', age: 32, address: '上海' }
  ];

  return (
    <div>
      <ldesign-button 
        type="primary"
        onLdesignClick={(e) => console.log('点击', e)}
      >
        点击我
      </ldesign-button>
      
      <ldesign-table
        columns={JSON.stringify(columns)}
        dataSource={JSON.stringify(data)}
        bordered={true}
        striped={true}
      />
    </div>
  );
}

export default App;
```

## 📚 组件列表

### 基础组件
- ✅ Button - 按钮
- ✅ Icon - 图标
- ✅ Ripple - 水波纹效果

### 表单组件
- ✅ Input - 输入框
- ✅ InputNumber - 数字输入框
- ✅ Checkbox - 复选框
- ✅ CheckboxGroup - 复选框组
- ✅ Radio - 单选框
- ✅ RadioGroup - 单选框组
- ✅ Switch - 开关
- ✅ Select - 选择器
- ✅ DatePicker - 日期选择器
- ✅ TimePicker - 时间选择器
- ✅ Calendar - 日历
- ✅ Picker - 选择器
- ✅ Cascader - 级联选择
- ✅ ColorPicker - 颜色选择器
- ✅ ColorInput - 颜色输入框
- ✅ Slider - 滑块
- ✅ Rate - 评分
- ✅ Mention - 提及
- ✅ Transfer - 穿梭框

### 数据展示
- ✅ Table - 数据表格（支持虚拟滚动）
- ✅ VirtualList - 虚拟列表
- ✅ Empty - 空状态
- ✅ Tree - 树形控件
- ✅ Pagination - 分页
- ✅ Avatar - 头像
- ✅ AvatarGroup - 头像组
- ✅ Tag - 标签
- ✅ TagGroup - 标签组
- ✅ Image - 图片
- ✅ ImageGroup - 图片组
- ✅ ImageViewer - 图片查看器
- ✅ Countdown - 倒计时
- ✅ Progress - 进度条
- ✅ Ellipsis - 文本省略

### 反馈组件
- ✅ Alert - 警告提示
- ✅ Message - 全局提示
- ✅ Notification - 通知提醒
- ✅ Modal - 对话框
- ✅ Drawer - 抽屉
- ✅ Popconfirm - 气泡确认框
- ✅ Loading - 加载中
- ✅ Skeleton - 骨架屏

### 导航组件
- ✅ Menu - 导航菜单
- ✅ Dropdown - 下拉菜单
- ✅ Tabs - 标签页

### 布局组件
- ✅ Grid - 网格
- ✅ GridItem - 网格项
- ✅ Row - 行
- ✅ Col - 列
- ✅ Space - 间距
- ✅ Split - 分割面板

### 其他组件
- ✅ Tooltip - 文字提示
- ✅ Popup - 弹出层
- ✅ Affix - 固钉
- ✅ Backtop - 回到顶部
- ✅ Collapse - 折叠面板
- ✅ Draggable - 拖拽
- ✅ ResizeBox - 调整大小
- ✅ Scrollbar - 滚动条
- ✅ Swiper - 轮播图
- ✅ CircleNavigation - 圆形导航

## 🎨 主题定制

### 使用内置主题

```html
<!-- 亮色主题（默认） -->
<html data-theme="light">

<!-- 暗色主题 -->
<html data-theme="dark">
```

### 自定义主题变量

```css
:root {
  /* 主色调 */
  --ld-color-primary: #7334cb;
  --ld-color-primary-hover: #8c5ad3;
  --ld-color-primary-active: #5e2aa7;
  
  /* 语义色 */
  --ld-color-success: #42bd42;
  --ld-color-warning: #f5c538;
  --ld-color-error: #dd2222;
  
  /* 文本颜色 */
  --ld-text-primary: rgba(0, 0, 0, 0.87);
  --ld-text-secondary: rgba(0, 0, 0, 0.6);
  
  /* 间距 */
  --ld-spacing-4: 16px;
  --ld-spacing-6: 24px;
  
  /* 圆角 */
  --ld-radius-base: 4px;
  --ld-radius-lg: 8px;
  
  /* 更多变量请查看 src/styles/theme.less */
}
```

## ⚡ 性能优化

### 虚拟滚动

对于大数据量的列表和表格，使用虚拟滚动可以显著提升性能：

```html
<!-- 虚拟列表 -->
<ldesign-virtual-list
  items="[...]"
  item-height="50"
  height="400"
  render-item="..."
/>

<!-- 虚拟表格 -->
<ldesign-table
  columns="[...]"
  dataSource="[...]"
  virtual
  height="500"
  row-height="48"
/>
```

### 按需导入

只导入使用的组件，可以减小最终打包体积：

```js
// ❌ 不推荐：全量导入
import '@ldesign/webcomponent';

// ✅ 推荐：按需导入
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/table';
```

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm start

# 构建
pnpm build

# 运行测试
pnpm test

# 生成组件导出配置
node scripts/generate-exports.js
```

## 📖 文档

- [组件文档](./docs)
- [API 文档](./dist/docs.json)
- [设计 Token](./docs/design/tokens.md)
- [主题定制](./docs/guide/theming.md)
- [最佳实践](./docs/guide/best-practices.md)

## 🤝 贡献

欢迎贡献代码！请阅读 [贡献指南](./CONTRIBUTING.md)。

## 📄 许可证

[MIT License](./LICENSE)

## 🙏 致谢

感谢所有贡献者的辛勤付出！

---

Made with ❤️ by LDesign Team




