# 文档问题排查指南

## 问题现象

文档页面中的**演示组件不显示**，只能看到代码块，无法与组件交互。

截图示例：
- Button 页面：只显示代码，没有按钮组件
- Form 页面：只显示代码，没有表单组件

## 问题原因

**组件库没有构建，VitePress 文档无法加载 Web Components**

VitePress 文档需要从 `dist/components/` 目录加载已构建的组件库文件。如果该目录为空或不存在，Web Components 无法注册，文档中的组件标签就无法正常渲染。

## 解决方案

### 步骤 1：构建组件库

在项目根目录运行：

```bash
npm run build
```

这将生成以下目录：
- `dist/components/` - 组件库 JS 文件
- `dist/ldesign-webcomponent/` - Stencil 构建输出
- `dist/types/` - TypeScript 类型定义

构建时间约 15-20 秒。

### 步骤 2：启动文档服务器

构建完成后，启动文档开发服务器：

```bash
npm run docs:dev
```

或生产环境预览：

```bash
npm run docs:build
npm run docs:preview
```

### 步骤 3：验证

访问文档页面（如 http://localhost:5173/components/button.html），确认：

✅ 按钮组件正常显示
✅ 可以与组件交互（点击、输入等）
✅ 样式正确应用
✅ 控制台无错误信息

## 常见问题

### Q1: 构建后文档仍然不显示组件

**原因**：浏览器缓存或 VitePress 服务器缓存

**解决方案**：
1. 硬刷新浏览器（Ctrl + Shift + R 或 Cmd + Shift + R）
2. 重启 VitePress 开发服务器
3. 清除 `.vitepress/cache/` 目录

### Q2: 控制台报错 "Failed to fetch"

**原因**：组件库文件路径不正确

**解决方案**：
检查 `.vitepress/theme/index.ts` 中的加载路径：
```typescript
const p = '../../../dist/components/' + 'index.js'
await import(/* @vite-ignore */ (p as any))
```

### Q3: 部分组件显示，部分不显示

**原因**：组件未正确注册或懒加载失败

**解决方案**：
1. 检查浏览器控制台的错误信息
2. 确认组件名称拼写正确（必须是 kebab-case）
3. 重新构建组件库

### Q4: 样式不正确或缺失

**原因**：CSS 文件未加载

**解决方案**：
1. 检查 `dist/ldesign-webcomponent/` 目录中是否有 CSS 文件
2. 确认 `.vitepress/theme/index.ts` 中导入了 `custom.css`
3. 检查 Shadow DOM 样式是否正确封装

## 开发流程建议

### 首次使用

```bash
# 1. 安装依赖
npm install

# 2. 构建组件库
npm run build

# 3. 启动文档
npm run docs:dev
```

### 日常开发

当修改组件代码后：

```bash
# 1. 重新构建组件库
npm run build

# 2. 刷新浏览器查看更改
```

**提示**：可以使用 `npm run build:watch` 监听文件变化自动重新构建

## 自动化脚本

创建一个一键启动脚本 `start-docs.ps1`：

```powershell
# 检查 dist 目录是否存在组件文件
$distExists = Test-Path "dist/components/index.js"

if (-not $distExists) {
    Write-Host "组件库未构建，正在构建..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "构建失败！" -ForegroundColor Red
        exit 1
    }
}

Write-Host "启动文档服务器..." -ForegroundColor Green
npm run docs:dev
```

使用方式：
```bash
powershell -ExecutionPolicy Bypass -File start-docs.ps1
```

## 检查清单

在提交代码或部署前，确认：

- [ ] 运行 `npm run build` 成功
- [ ] `dist/components/` 目录包含组件文件
- [ ] 文档开发服务器可以正常启动
- [ ] 所有组件在文档中正确显示
- [ ] 交互功能正常工作
- [ ] 无控制台错误
- [ ] 样式显示正确

## 相关文件

- 组件库源代码: `src/components/`
- 构建输出: `dist/`
- 文档源码: `docs/`
- VitePress 配置: `docs/.vitepress/`
- 主题配置: `docs/.vitepress/theme/index.ts`
- 样式文件: `docs/.vitepress/theme/custom.css`

## 获取帮助

如果问题仍未解决，请检查：

1. Node.js 版本（建议 v18 或更高）
2. npm 版本
3. package.json 中的依赖版本
4. 是否有其他服务占用端口
5. 浏览器控制台的完整错误信息

---

**最后更新**: 2024年11月24日
**适用版本**: v2.0.0+
