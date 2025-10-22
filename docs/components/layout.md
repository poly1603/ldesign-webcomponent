# Layout 布局

协助进行页面级整体布局。

## 何时使用

- 构建后台管理系统
- 需要标准的页面布局
- Header、Sider、Content、Footer 组合

## 基础布局

:::demo

```html
<ldesign-layout style="height: 400px;">
  <ldesign-layout-header style="background: #7334cb; color: white; display: flex; align-items: center; padding: 0 24px;">
    Header
  </ldesign-layout-header>
  <ldesign-layout-content style="background: #f0f0f0; padding: 24px;">
    Content
  </ldesign-layout-content>
  <ldesign-layout-footer style="background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
    Footer
  </ldesign-layout-footer>
</ldesign-layout>
```

:::

## 侧边栏布局

:::demo

```html
<ldesign-layout direction="horizontal" style="height: 400px;">
  <ldesign-layout-sider collapsible width="200px" style="background: #f5f5f5;">
    <div style="padding: 16px;">Sider</div>
  </ldesign-layout-sider>
  <ldesign-layout>
    <ldesign-layout-header style="background: #7334cb; color: white;">
      Header
    </ldesign-layout-header>
    <ldesign-layout-content style="background: #f0f0f0;">
      Content
    </ldesign-layout-content>
    <ldesign-layout-footer style="background: #f5f5f5;">
      Footer
    </ldesign-layout-footer>
  </ldesign-layout>
</ldesign-layout>
```

:::

## API

### Layout Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | `'horizontal' \| 'vertical'` | `'vertical'` | 布局方向 |

### LayoutHeader Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| height | `string` | `'64px'` | 高度 |

### LayoutSider Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| width | `string` | `'200px'` | 宽度 |
| collapsible | `boolean` | `false` | 是否可折叠 |
| collapsed | `boolean` | `false` | 当前折叠状态 |
| collapsedWidth | `string` | `'80px'` | 折叠后宽度 |

### LayoutFooter Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| height | `string` | `'70px'` | 高度 |

