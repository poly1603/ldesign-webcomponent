# 🎯 从这里开始

欢迎使用 @ldesign/webcomponent v2.0！

---

## ⚡ 30秒快速开始

```bash
# 1. 安装
npm install @ldesign/webcomponent

# 2. 使用
```

```html
<script type="module">
  import '@ldesign/webcomponent/button';
</script>

<ldesign-button type="primary">点击我</ldesign-button>
```

**✅ 就这么简单！**

---

## 🗺️ 文档导航

### 🚀 快速入门（5分钟）
- [快速参考](./QUICK_REFERENCE.md) - 最常用的功能和组件

### 📖 完整指南（30分钟）
- [README v2.0](./README_V2.md) - 详细使用指南
- [迁移指南](./MIGRATION.md) - 从 v1.x 升级

### 🎨 框架集成（15分钟）
- [原生 HTML](./docs/integration/html.md) - HTML/JS 使用
- [Vue 3](./docs/integration/vue.md) - Vue 项目集成
- [React](./docs/integration/react.md) - React 项目集成

### 📊 项目信息（10分钟）
- [完成报告](./FINAL_COMPLETION_REPORT.md) - 项目成果
- [变更日志](./CHANGELOG_V2.md) - 版本变更
- [交付清单](./DELIVERY_CHECKLIST.md) - 完整交付

---

## 🎓 学习路径

### 初学者路线

1. **第1天**: 阅读 [快速参考](./QUICK_REFERENCE.md)
2. **第2天**: 查看 [HTML 集成文档](./docs/integration/html.md)
3. **第3天**: 运行 [综合示例](./examples/comprehensive-demo.html)
4. **第4-5天**: 在项目中使用

### 进阶路线

1. 阅读 [完整文档](./README_V2.md)
2. 了解 [性能优化](./OPTIMIZATION_SUMMARY.md)
3. 学习 [主题定制](./docs/guide/theming.md)
4. 深入 [源码实现](./src/)

### 框架开发者

#### Vue 3 开发者
1. 安装 `@ldesign/webcomponent-vue`
2. 阅读 [Vue 集成文档](./docs/integration/vue.md)
3. 运行 [Vue 示例](./examples/vue3-example/)
4. 开始使用

#### React 开发者
1. 安装 `@ldesign/webcomponent-react`
2. 阅读 [React 集成文档](./docs/integration/react.md)
3. 运行 [React 示例](./examples/react-example/)
4. 开始使用

---

## 💡 常见场景

### 场景1: 我想快速原型开发

**推荐**: 使用 CDN 全量导入

```html
<script type="module" src="https://unpkg.com/@ldesign/webcomponent"></script>
<ldesign-button type="primary">快速开始</ldesign-button>
```

### 场景2: 我想优化包体积

**推荐**: 使用按需导入

```javascript
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';
// 仅导入需要的组件，减少 95% 体积
```

### 场景3: 我有长列表性能问题

**推荐**: 使用虚拟滚动

```html
<ldesign-virtual-list
  item-height="60"
  height="500"
/>
<!-- 支持 100,000+ 项，流畅 60fps -->
```

### 场景4: 我想支持暗色主题

**推荐**: 使用内置主题系统

```javascript
// 切换主题
document.documentElement.setAttribute('data-theme', 'dark');
```

---

## 🎯 选择合适的方案

### 问题1: 我应该使用哪个包？

```
原生 HTML/JS 项目
  └─→ @ldesign/webcomponent

Vue 3 项目
  ├─→ @ldesign/webcomponent (基础)
  └─→ @ldesign/webcomponent-vue (推荐)

React 项目
  ├─→ @ldesign/webcomponent (基础)
  └─→ @ldesign/webcomponent-react (推荐)

Angular/Svelte/其他
  └─→ @ldesign/webcomponent (原生支持)
```

### 问题2: 应该全量导入还是按需导入？

```
快速原型/小项目
  └─→ 全量导入 (简单方便)

生产项目/大型项目
  └─→ 按需导入 (性能最优)

性能要求极高
  └─→ 按需 + 虚拟滚动 (极致性能)
```

### 问题3: 我需要虚拟滚动吗？

```
列表项 < 100
  └─→ 不需要

列表项 100-1000
  └─→ 可选（建议使用）

列表项 > 1000
  └─→ 强烈建议使用

列表项 > 10,000
  └─→ 必须使用
```

---

## 🆘 遇到问题？

### 1. 组件没有样式
→ 检查是否正确导入了组件 JS 文件

### 2. Vue 报错 "Unknown custom element"
→ 配置 `isCustomElement` 识别自定义元素

### 3. React 中类型错误
→ 安装 `@ldesign/webcomponent-react` 获取完整类型

### 4. 性能问题
→ 长列表使用虚拟滚动，切换到按需导入

### 5. 主题不生效
→ 检查 `data-theme` 属性和 CSS 变量

---

## 📊 性能速查

| 场景 | 使用组件 | 性能 |
|------|----------|------|
| 长列表 | VirtualList | 100,000+ 项 60fps |
| 大表格 | Table (virtual) | 流畅滚动 |
| 骨架屏 | Skeleton | 加载体验优化 |
| 空状态 | Empty | 用户体验提升 |

---

## 🎁 示例代码

### 完整的工作示例

1. [综合示例](./examples/comprehensive-demo.html) - HTML
2. [Vue 3 示例](./examples/vue3-example/App.vue) - Vue
3. [React 示例](./examples/react-example/App.tsx) - React

**直接复制代码即可运行！**

---

## 🔗 快速链接

| 需求 | 文档 |
|------|------|
| 快速上手 | [快速参考](./QUICK_REFERENCE.md) |
| 完整文档 | [README v2](./README_V2.md) |
| 升级指南 | [迁移指南](./MIGRATION.md) |
| HTML 使用 | [HTML 集成](./docs/integration/html.md) |
| Vue 使用 | [Vue 集成](./docs/integration/vue.md) |
| React 使用 | [React 集成](./docs/integration/react.md) |
| 性能优化 | [优化总结](./OPTIMIZATION_SUMMARY.md) |
| 项目信息 | [完成报告](./FINAL_COMPLETION_REPORT.md) |

---

## 🎉 开始使用

选择您的框架，开始使用：

### → [原生 HTML/JS](./docs/integration/html.md)
### → [Vue 3](./docs/integration/vue.md)
### → [React](./docs/integration/react.md)

---

**祝您使用愉快！🚀**

如有问题，请查阅文档或提交 Issue。



