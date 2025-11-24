# Collapse 折叠面板

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## 代码演示

### 基础用法

可以同时展开多个面板。

<div class="demo-container">
  <ldesign-collapse>
    <ldesign-collapse-item title="这是面板标题 1" name="1">
      <p>面板内容 1</p>
    </ldesign-collapse-item>
    <ldesign-collapse-item title="这是面板标题 2" name="2">
      <p>面板内容 2</p>
    </ldesign-collapse-item>
    <ldesign-collapse-item title="这是面板标题 3" name="3">
      <p>面板内容 3</p>
    </ldesign-collapse-item>
  </ldesign-collapse>
</div>

```html
<ldesign-collapse>
  <ldesign-collapse-item title="面板 1" name="1">
    内容 1
  </ldesign-collapse-item>
  <ldesign-collapse-item title="面板 2" name="2">
    内容 2
  </ldesign-collapse-item>
</ldesign-collapse>
```

### 手风琴效果

每次只能展开一个面板。

<div class="demo-container">
  <ldesign-collapse accordion>
    <ldesign-collapse-item title="一致性 Consistency" name="1">
      <p>与现实生活一致：与现实生活的流程、逻辑保持一致。</p>
    </ldesign-collapse-item>
    <ldesign-collapse-item title="反馈 Feedback" name="2">
      <p>控制反馈：通过界面样式和交互动效让用户可以清晰地感知自己的操作。</p>
    </ldesign-collapse-item>
    <ldesign-collapse-item title="效率 Efficiency" name="3">
      <p>简化流程：设计简洁直观的操作流程。</p>
    </ldesign-collapse-item>
  </ldesign-collapse>
</div>

```html
<ldesign-collapse accordion>
  <ldesign-collapse-item title="面板 1" name="1">
    内容 1
  </ldesign-collapse-item>
  <ldesign-collapse-item title="面板 2" name="2">
    内容 2
  </ldesign-collapse-item>
</ldesign-collapse>
```

### 禁用状态

禁用某个面板。

<div class="demo-container">
  <ldesign-collapse>
    <ldesign-collapse-item title="正常面板" name="1">
      <p>这是正常的面板</p>
    </ldesign-collapse-item>
    <ldesign-collapse-item title="禁用面板" name="2" disabled>
      <p>这个面板被禁用了</p>
    </ldesign-collapse-item>
  </ldesign-collapse>
</div>

```html
<ldesign-collapse-item title="禁用" disabled>
  内容
</ldesign-collapse-item>
```

### 简洁模式

无边框风格。

<div class="demo-container">
  <ldesign-collapse bordered="false">
    <ldesign-collapse-item title="面板 1" name="1">
      <p>内容 1</p>
    </ldesign-collapse-item>
    <ldesign-collapse-item title="面板 2" name="2">
      <p>内容 2</p>
    </ldesign-collapse-item>
  </ldesign-collapse>
</div>

```html
<ldesign-collapse bordered="false">
  ...
</ldesign-collapse>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const activeNames = ref(['1']);

const handleChange = (e) => {
  activeNames.value = e.detail;
  console.log('展开的面板:', activeNames.value);
};
</script>

<template>
  <ldesign-collapse
    :active-names="activeNames"
    @ldesignChange="handleChange"
  >
    <ldesign-collapse-item title="面板 1" name="1">
      内容 1
    </ldesign-collapse-item>
    <ldesign-collapse-item title="面板 2" name="2">
      内容 2
    </ldesign-collapse-item>
  </ldesign-collapse>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [activeNames, setActiveNames] = useState(['1']);
  
  const handleChange = (e) => {
    setActiveNames(e.detail);
    console.log('展开的面板:', e.detail);
  };
  
  return (
    <ldesign-collapse
      active-names={activeNames}
      onLdesignChange={handleChange}
    >
      <ldesign-collapse-item title="面板 1" name="1">
        内容 1
      </ldesign-collapse-item>
      <ldesign-collapse-item title="面板 2" name="2">
        内容 2
      </ldesign-collapse-item>
    </ldesign-collapse>
  );
}
```

## API

### Collapse Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `active-names` | 当前激活的面板 | `string[] \| string` | - |
| `accordion` | 是否手风琴模式 | `boolean` | `false` |
| `bordered` | 是否显示边框 | `boolean` | `true` |

### Collapse Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 切换面板时触发 | `(event: CustomEvent<string[]>) => void` |

### CollapseItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `name` | 唯一标志符 | `string` | - |
| `title` | 面板标题 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |

### CollapseItem Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 面板内容 |
| `title` | 自定义面板标题 |

## 相关组件

- [Tabs 标签页](./tabs.md)
