# 安装

## 环境要求

- Node.js >= 18
- 支持 ES2017+ 的现代浏览器

### 浏览器兼容性

| 浏览器 | 版本 |
|--------|------|
| Chrome | >= 90 |
| Edge | >= 90 |
| Firefox | >= 88 |
| Safari | >= 14 |
| iOS Safari | >= 14 |
| Android Chrome | >= 90 |

## 包管理器安装

### npm

```bash
npm install @ldesign/webcomponent
```

### yarn

```bash
yarn add @ldesign/webcomponent
```

### pnpm（推荐）

```bash
pnpm add @ldesign/webcomponent
```

## CDN 引入

### unpkg

```html
<!-- 最新版本 -->
<script type="module" src="https://unpkg.com/@ldesign/webcomponent"></script>

<!-- 指定版本 -->
<script type="module" src="https://unpkg.com/@ldesign/webcomponent@2.0.0"></script>
```

### jsdelivr

```html
<!-- 最新版本 -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ldesign/webcomponent"></script>

<!-- 指定版本 -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ldesign/webcomponent@2.0.0"></script>
```

## 框架集成包

### Vue 3

```bash
# 核心包
npm install @ldesign/webcomponent

# Vue 集成包（推荐）
npm install @ldesign/webcomponent-vue
```

### React

```bash
# 核心包
npm install @ldesign/webcomponent

# React 集成包（推荐）
npm install @ldesign/webcomponent-react
```

## 版本说明

### 稳定版本

推荐使用最新的稳定版本：

```bash
npm install @ldesign/webcomponent@latest
```

### 开发版本

如果需要体验最新特性（可能不稳定）：

```bash
npm install @ldesign/webcomponent@next
```

## 验证安装

安装完成后，创建一个简单的 HTML 文件验证：

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@ldesign/webcomponent/button';
  </script>
</head>
<body>
  <ldesign-button type="primary">验证成功！</ldesign-button>
</body>
</html>
```

如果能看到按钮，说明安装成功！

## 问题排查

### 安装失败？

1. 检查 Node.js 版本（需要 >= 18）
2. 清除 npm 缓存：`npm cache clean --force`
3. 删除 node_modules 重新安装

### 组件不显示？

1. 检查是否正确导入组件
2. 检查浏览器控制台是否有错误
3. 确认浏览器版本符合要求

### TypeScript 报错？

1. 确保安装了类型定义
2. 检查 tsconfig.json 配置
3. 重启 IDE/编辑器

## 下一步

- [快速开始](/guide/getting-started) - 5分钟上手
- [按需导入](/guide/on-demand) - 优化包体积
- [组件概览](/components/overview) - 查看所有组件
