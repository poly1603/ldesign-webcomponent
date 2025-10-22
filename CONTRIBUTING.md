# 贡献指南

感谢您对 @ldesign/webcomponent 的贡献兴趣！

## 🎯 如何贡献

### 报告 Bug

1. 搜索现有 Issues 确认问题未被报告
2. 创建新 Issue，提供：
   - 清晰的问题描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 环境信息（浏览器、框架版本等）

### 提出新功能

1. 先开 Issue 讨论可行性
2. 说明使用场景和需求
3. 等待维护者反馈

### 提交代码

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 编写代码
4. 运行测试 (`pnpm test`)
5. 提交代码 (`git commit -m 'feat: add amazing feature'`)
6. 推送分支 (`git push origin feature/amazing-feature`)
7. 创建 Pull Request

## 🛠️ 开发环境设置

### 前置要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
git clone https://github.com/ldesign/webcomponent.git
cd webcomponent
pnpm install
```

### 开发流程

```bash
# 启动开发服务器
pnpm start

# 运行测试
pnpm test

# 构建
pnpm build

# Lint 检查
pnpm lint

# 类型检查
pnpm tsc --noEmit
```

## 📝 代码规范

### 命名规范

- 组件名: `ldesign-component-name`
- 文件名: `component-name.tsx`, `component-name.less`
- 类名: `LdesignComponentName`
- CSS 类: BEM 规范 `.ldesign-component__element--modifier`

### TypeScript

- 启用严格模式
- 所有公共 API 必须有类型定义
- 优先使用接口而非类型别名
- 导出类型使用 `export type`

### 代码风格

```typescript
// ✅ 推荐
export interface ButtonProps {
  type?: ButtonType;
  size?: Size;
  disabled?: boolean;
}

// ❌ 不推荐
export type ButtonProps = {
  type?: ButtonType,
  size?: Size,
  disabled?: boolean,
}
```

### 组件结构

```typescript
@Component({
  tag: 'ldesign-component',
  styleUrl: 'component.less',
  shadow: false,
})
export class LdesignComponent {
  @Element() el!: HTMLElement;

  // Props
  @Prop() prop1: string = 'default';
  
  // State
  @State() internalState: boolean = false;
  
  // Events
  @Event() ldesignEvent!: EventEmitter<any>;
  
  // Lifecycle
  componentWillLoad() {}
  componentDidLoad() {}
  disconnectedCallback() {
    // 清理资源
  }
  
  // Methods
  private method() {}
  
  render() {
    return <Host>...</Host>;
  }
}
```

## 🧪 测试规范

### 单元测试

每个组件都应该有对应的测试文件：

```typescript
// component.spec.ts
import { newSpecPage } from '@stencil/core/testing';
import { LdesignComponent } from './component';

describe('ldesign-component', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [LdesignComponent],
      html: `<ldesign-component></ldesign-component>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('should handle prop changes', async () => {
    // 测试用例
  });
});
```

### 测试覆盖率

- 目标覆盖率: 70%+
- 关键路径必须覆盖
- 边界情况测试

## 📚 文档规范

### 组件文档

每个组件应包含 README.md：

```markdown
# ComponentName

## 基础用法

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| prop1 | string | 'default' | 说明 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| ldesignEvent | detail | 说明 |

## Methods

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| method() | - | void | 说明 |

## 示例

### 原生 HTML
### Vue 3
### React

## CSS Variables

| 变量 | 默认值 | 说明 |
|------|--------|------|
| --ld-component-color | - | 颜色 |
```

## 🚀 发布流程

### 版本号规范

遵循语义化版本：

- **Major (x.0.0)**: 破坏性变更
- **Minor (1.x.0)**: 新功能，向后兼容
- **Patch (1.0.x)**: Bug 修复

### Commit 规范

使用约定式提交：

```bash
feat: 新功能
fix: Bug 修复
docs: 文档更新
style: 代码格式
refactor: 重构
perf: 性能优化
test: 测试相关
chore: 构建/工具相关
```

示例：
```bash
git commit -m "feat(table): add virtual scrolling support"
git commit -m "fix(button): resolve click event issue"
git commit -m "docs(readme): update installation guide"
```

## ✅ Pull Request 检查清单

提交 PR 前，请确认：

- [ ] 代码已通过 Lint 检查 (`pnpm lint`)
- [ ] 代码已通过类型检查 (`pnpm tsc --noEmit`)
- [ ] 所有测试通过 (`pnpm test`)
- [ ] 添加了必要的测试用例
- [ ] 更新了相关文档
- [ ] 遵循了代码规范
- [ ] Commit 消息符合规范
- [ ] 没有引入不必要的依赖

## 🏗️ 项目结构

```
libraries/webcomponent/
├── src/
│   ├── components/       # 组件源码
│   ├── utils/           # 工具函数
│   ├── styles/          # 全局样式
│   ├── types/           # 类型定义
│   └── global/          # 全局脚本
├── packages/
│   ├── vue/            # Vue 集成包
│   └── react/          # React 集成包
├── examples/           # 示例项目
├── docs/              # 文档
├── scripts/           # 构建脚本
└── .github/           # CI/CD 配置
```

## 🎨 样式指南

### CSS 变量命名

- 全局变量: `--ld-*`
- 组件变量: `--ld-component-*`
- 状态变量: `--ld-component-state-*`

### 组件样式结构

```less
.ldesign-component {
  // 基础样式
  
  &__element {
    // 元素样式
  }
  
  &--modifier {
    // 修饰符样式
  }
  
  // 暗色主题
  [data-theme="dark"] & {
    // 暗色主题样式
  }
}
```

## 🔍 Code Review 标准

### 必须满足

- ✅ 功能正确实现
- ✅ 代码可读性好
- ✅ 性能无明显问题
- ✅ 无明显的 Bug 风险
- ✅ 测试覆盖充分

### 优先考虑

- 代码复用性
- 扩展性
- 兼容性
- 无障碍性

## 📞 获取帮助

- 💬 Discussions: 提问和讨论
- 🐛 Issues: 报告问题
- 📧 Email: ldesign@example.com

## 🙏 感谢

感谢每一位贡献者！

您的贡献让 LDesign 变得更好！



