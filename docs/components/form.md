# Form 表单

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## 代码演示

### 基础表单

基本的表单数据域包括输入框、选择器、日期、时间选择器等。

<div class="demo-container">
  <ldesign-form id="basic-form" layout="vertical">
    <ldesign-form-item label="用户名" name="username">
      <ldesign-input placeholder="请输入用户名"></ldesign-input>
    </ldesign-form-item>
    
    <ldesign-form-item label="密码" name="password">
      <ldesign-input type="password" placeholder="请输入密码"></ldesign-input>
    </ldesign-form-item>
    
    <ldesign-form-item>
      <ldesign-button type="primary">提交</ldesign-button>
    </ldesign-form-item>
  </ldesign-form>
</div>

```html
<ldesign-form id="my-form">
  <ldesign-form-item label="用户名" name="username">
    <ldesign-input placeholder="请输入用户名"></ldesign-input>
  </ldesign-form-item>
  
  <ldesign-form-item label="密码" name="password">
    <ldesign-input type="password"></ldesign-input>
  </ldesign-form-item>
  
  <ldesign-form-item>
    <ldesign-button type="primary">提交</ldesign-button>
  </ldesign-form-item>
</ldesign-form>
```

### 表单布局

提供三种布局：horizontal（水平）、vertical（垂直）、inline（行内）。

<div class="demo-container">
  <ldesign-form layout="horizontal" label-width="100">
    <ldesign-form-item label="用户名">
      <ldesign-input placeholder="水平布局"></ldesign-input>
    </ldesign-form-item>
  </ldesign-form>
  
  <ldesign-form layout="vertical">
    <ldesign-form-item label="用户名">
      <ldesign-input placeholder="垂直布局"></ldesign-input>
    </ldesign-form-item>
  </ldesign-form>
  
  <ldesign-form layout="inline">
    <ldesign-form-item label="用户名">
      <ldesign-input placeholder="行内布局"></ldesign-input>
    </ldesign-form-item>
    <ldesign-form-item label="密码">
      <ldesign-input type="password"></ldesign-input>
    </ldesign-form-item>
  </ldesign-form>
</div>

```html
<!-- 水平布局 -->
<ldesign-form layout="horizontal" label-width="100">
  ...
</ldesign-form>

<!-- 垂直布局 -->
<ldesign-form layout="vertical">
  ...
</ldesign-form>

<!-- 行内布局 -->
<ldesign-form layout="inline">
  ...
</ldesign-form>
```

### 表单尺寸

设置 `size` 属性统一控制表单项尺寸。

<div class="demo-container">
  <ldesign-form layout="vertical" size="small">
    <ldesign-form-item label="小尺寸">
      <ldesign-input placeholder="Small"></ldesign-input>
    </ldesign-form-item>
  </ldesign-form>
  
  <ldesign-form layout="vertical" size="medium">
    <ldesign-form-item label="中尺寸">
      <ldesign-input placeholder="Medium"></ldesign-input>
    </ldesign-form-item>
  </ldesign-form>
  
  <ldesign-form layout="vertical" size="large">
    <ldesign-form-item label="大尺寸">
      <ldesign-input placeholder="Large"></ldesign-input>
    </ldesign-form-item>
  </ldesign-form>
</div>

```html
<ldesign-form size="small">...</ldesign-form>
<ldesign-form size="medium">...</ldesign-form>
<ldesign-form size="large">...</ldesign-form>
```

### 表单验证

通过 `required`、`rules` 等属性配置验证规则。

<div class="demo-container">
  <ldesign-form id="validate-form" layout="vertical">
    <ldesign-form-item label="用户名" name="username" required>
      <ldesign-input placeholder="必填项"></ldesign-input>
    </ldesign-form-item>
    
    <ldesign-form-item label="邮箱" name="email">
      <ldesign-input type="email" placeholder="请输入邮箱"></ldesign-input>
    </ldesign-form-item>
    
    <ldesign-form-item>
      <ldesign-button type="primary">验证</ldesign-button>
    </ldesign-form-item>
  </ldesign-form>
</div>

```html
<ldesign-form-item label="用户名" required>
  <ldesign-input></ldesign-input>
</ldesign-form-item>
```

### 禁用状态

设置 `disabled` 属性禁用整个表单。

<div class="demo-container">
  <ldesign-form layout="vertical" disabled>
    <ldesign-form-item label="用户名">
      <ldesign-input value="禁用状态"></ldesign-input>
    </ldesign-form-item>
    
    <ldesign-form-item label="密码">
      <ldesign-input type="password" value="password"></ldesign-input>
    </ldesign-form-item>
  </ldesign-form>
</div>

```html
<ldesign-form disabled>
  ...
</ldesign-form>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref, reactive } from 'vue';

const formData = reactive({
  username: '',
  password: '',
  email: ''
});

const handleSubmit = async () => {
  const form = document.querySelector('ldesign-form');
  const valid = await form.validate();
  
  if (valid) {
    console.log('提交:', formData);
  }
};
</script>

<template>
  <ldesign-form layout="vertical" @ldesignSubmit="handleSubmit">
    <ldesign-form-item label="用户名" name="username" required>
      <ldesign-input 
        v-model="formData.username"
        placeholder="请输入用户名"
      />
    </ldesign-form-item>
    
    <ldesign-form-item label="密码" name="password" required>
      <ldesign-input 
        v-model="formData.password"
        type="password"
      />
    </ldesign-form-item>
    
    <ldesign-form-item label="邮箱" name="email">
      <ldesign-input 
        v-model="formData.email"
        type="email"
      />
    </ldesign-form-item>
    
    <ldesign-form-item>
      <ldesign-button type="primary" html-type="submit">
        提交
      </ldesign-button>
      <ldesign-button>取消</ldesign-button>
    </ldesign-form-item>
  </ldesign-form>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.querySelector('ldesign-form');
    const valid = await form.validate();
    
    if (valid) {
      console.log('提交:', formData);
    }
  };
  
  return (
    <ldesign-form layout="vertical" onLdesignSubmit={handleSubmit}>
      <ldesign-form-item label="用户名" name="username" required>
        <ldesign-input 
          value={formData.username}
          onLdesignInput={(e) => 
            setFormData({...formData, username: e.detail})
          }
        />
      </ldesign-form-item>
      
      <ldesign-form-item label="密码" name="password" required>
        <ldesign-input 
          type="password"
          value={formData.password}
          onLdesignInput={(e) => 
            setFormData({...formData, password: e.detail})
          }
        />
      </ldesign-form-item>
      
      <ldesign-form-item>
        <ldesign-button type="primary" html-type="submit">
          提交
        </ldesign-button>
      </ldesign-form-item>
    </ldesign-form>
  );
}
```

## API

### Form Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `layout` | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| `label-width` | 标签宽度 | `string \| number` | - |
| `label-align` | 标签对齐 | `'left' \| 'right'` | `'right'` |
| `size` | 表单尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `disabled` | 是否禁用 | `boolean` | `false` |

### Form Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| `validate` | 验证整个表单 | - | `Promise<boolean>` |
| `validateField` | 验证指定字段 | `name: string` | `Promise<boolean>` |
| `resetFields` | 重置表单 | - | `void` |
| `getFieldsValue` | 获取表单值 | - | `Promise<Record<string, any>>` |
| `setFieldValue` | 设置字段值 | `name: string, value: any` | `Promise<void>` |

### Form Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignSubmit` | 提交表单时触发 | `(event: CustomEvent<Record<string, any>>) => void` |
| `ldesignReset` | 重置表单时触发 | `() => void` |
| `ldesignValidateError` | 验证失败时触发 | `(event: CustomEvent<Record<string, string>>) => void` |

### FormItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `label` | 标签文本 | `string` | - |
| `name` | 字段名 | `string` | - |
| `required` | 是否必填 | `boolean` | `false` |
| `rules` | 验证规则 | `FormRule[]` | - |
| `error` | 错误提示 | `string` | - |

### FormRule

```typescript
interface FormRule {
  required?: boolean;
  pattern?: RegExp | string;
  min?: number;
  max?: number;
  validator?: (value: any) => boolean | string | Promise<boolean | string>;
  message?: string;
}
```

## 相关组件

- [Input 输入框](./input.md)
- [Select 选择器](./select.md)
- [Checkbox 多选框](./checkbox.md)
- [Radio 单选框](./radio.md)
- [Switch 开关](./switch.md)
