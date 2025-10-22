# Statistic 统计数值

展示统计数值，支持数字动画效果。

## 何时使用

- 展示关键指标
- 数据看板
- 实时数据展示

## 基础用法

:::demo

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
  <ldesign-statistic title="用户数" value="93123" animated></ldesign-statistic>
  <ldesign-statistic title="增长率" value="12.8" suffix="%" animated></ldesign-statistic>
  <ldesign-statistic title="销售额" prefix="¥" value="125690" animated></ldesign-statistic>
</div>
```

:::

## 带颜色

:::demo

```html
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
  <ldesign-card size="small">
    <ldesign-statistic 
      title="成功" 
      value="256" 
      value-color="var(--ld-color-success)"
      animated
    ></ldesign-statistic>
  </ldesign-card>
  
  <ldesign-card size="small">
    <ldesign-statistic 
      title="警告" 
      value="48" 
      value-color="var(--ld-color-warning)"
      animated
    ></ldesign-statistic>
  </ldesign-card>
  
  <ldesign-card size="small">
    <ldesign-statistic 
      title="错误" 
      value="12" 
      value-color="var(--ld-color-error)"
      animated
    ></ldesign-statistic>
  </ldesign-card>
  
  <ldesign-card size="small">
    <ldesign-statistic 
      title="总计" 
      value="316" 
      value-color="var(--ld-color-primary)"
      animated
    ></ldesign-statistic>
  </ldesign-card>
</div>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `number` | - | 数值（必需） |
| title | `string` | - | 标题 |
| prefix | `string` | - | 前缀 |
| suffix | `string` | - | 后缀 |
| precision | `number` | `0` | 小数位数 |
| separator | `string` | `','` | 千分位分隔符 |
| decimalSeparator | `string` | `'.'` | 小数点符号 |
| animated | `boolean` | `false` | 是否启用动画 |
| duration | `number` | `1000` | 动画时长（毫秒） |
| valueColor | `string` | - | 数值颜色 |

