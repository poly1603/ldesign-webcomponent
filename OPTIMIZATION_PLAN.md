# @ldesign/webcomponent 优化计划

## 当前状态

- ✅ 70+ 组件已实现
- ✅ 基于 Stencil 构建
- ✅ 支持按需导入
- ⚠️ 缺少完整的 Storybook 文档
- ⚠️ 测试覆盖率较低
- ⚠️ Tree-shaking 可以进一步优化

## 优化目标

### 1. Storybook 文档

**目标**: 为所有 70+ 组件添加交互式文档

**实施步骤**:
```bash
# 安装 Storybook
pnpm add -D @storybook/web-components @storybook/addon-essentials

# 初始化配置
npx storybook@latest init --type web_components

# 为每个组件创建 story
# 示例: src/components/button/button.stories.ts
```

**Story 模板**:
```typescript
import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './button'

const meta: Meta = {
  title: 'Components/Button',
  component: 'ld-button',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <ld-button type="${args.type}" size="${args.size}">
      Click Me
    </ld-button>
  `,
}
```

### 2. 测试覆盖率提升

**目标**: 测试覆盖率从当前 <50% 提升到 >85%

**实施步骤**:
```bash
# 运行测试覆盖率检查
pnpm test --coverage

# 为每个组件添加单元测试
# 示例: src/components/button/button.spec.ts
```

**测试模板**:
```typescript
import { newSpecPage } from '@stencil/core/testing'
import { LdButton } from './button'

describe('ld-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button>Click Me</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button>
        <mock:shadow-root>
          <button class="ld-button">
            Click Me
          </button>
        </mock:shadow-root>
      </ld-button>
    `)
  })

  it('emits click event', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button>Click Me</ld-button>`,
    })
    
    const clickSpy = jest.fn()
    page.root.addEventListener('ldClick', clickSpy)
    
    const button = page.root.shadowRoot.querySelector('button')
    button.click()
    
    expect(clickSpy).toHaveBeenCalled()
  })
})
```

### 3. Tree-shaking 优化

**目标**: 优化打包配置，确保按需导入只打包使用的组件

**实施步骤**:

1. 确保 package.json 配置正确:
```json
{
  "sideEffects": [
    "*.css",
    "*.less",
    "dist/loader/**"
  ]
}
```

2. 优化导出方式，为每个组件提供独立入口:
```json
{
  "exports": {
    "./button": "./dist/components/button.js",
    "./input": "./dist/components/input.js",
    // ... 每个组件独立导出
  }
}
```

3. 添加 Bundle 大小检查:
```bash
# 安装 size-limit
pnpm add -D size-limit @size-limit/preset-small-lib

# package.json 添加配置
{
  "size-limit": [
    {
      "path": "dist/components/button.js",
      "limit": "10 KB"
    }
  ]
}
```

### 4. 性能监控

**目标**: 添加组件性能监控

**实施步骤**:

1. 添加性能测试:
```typescript
import { measurePerformance } from '@ldesign/shared'

// 测试组件渲染性能
const renderTime = await measurePerformance(async () => {
  const element = document.createElement('ld-button')
  document.body.appendChild(element)
  await element.componentOnReady()
})

console.log(`Button render time: ${renderTime}ms`)
```

2. 添加 Lighthouse CI:
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm build
      - run: pnpm lhci autorun
```

## 优先级

- **P0 高优先级**: Storybook 文档（提升开发体验）
- **P1 中优先级**: 测试覆盖率（保证质量）
- **P2 低优先级**: Tree-shaking 优化（性能优化）

## 预期成果

- 📚 完整的 Storybook 文档，覆盖 70+ 组件
- ✅ 测试覆盖率 >85%
- ⚡ Tree-shaking 优化，按需导入体积减小 30%
- 📊 性能监控数据收集

---

**文档版本**: 1.0  
**创建时间**: 2025-10-22






