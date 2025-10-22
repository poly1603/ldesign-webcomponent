# Form 表单

表单容器组件，提供统一的数据收集、验证和提交功能。

## 何时使用

- 需要收集用户输入
- 需要统一的表单验证
- 需要规范的表单布局

## 基础用法

:::demo

```html
<ldesign-form id="basicForm" layout="horizontal" label-width="100">
  <ldesign-form-item label="用户名" name="username" required>
    <ldesign-input placeholder="请输入用户名"></ldesign-input>
  </ldesign-form-item>
  
  <ldesign-form-item label="密码" name="password" required>
    <ldesign-input type="password" placeholder="请输入密码"></ldesign-input>
  </ldesign-form-item>
  
  <ldesign-form-item>
    <ldesign-button type="primary" html-type="submit">提交</ldesign-button>
    <ldesign-button html-type="reset">重置</ldesign-button>
  </ldesign-form-item>
</ldesign-form>

<script>
const form = document.getElementById('basicForm');

form.addEventListener('ldesignSubmit', (e) => {
  console.log('表单提交:', e.detail);
  alert('提交成功！\n' + JSON.stringify(e.detail, null, 2));
});
</script>
```

:::

## 表单布局

### 水平布局

```html
<ldesign-form layout="horizontal" label-width="120">
  <ldesign-form-item label="用户名">
    <ldesign-input />
  </ldesign-form-item>
</ldesign-form>
```

### 垂直布局

```html
<ldesign-form layout="vertical">
  <ldesign-form-item label="用户名">
    <ldesign-input />
  </ldesign-form-item>
</ldesign-form>
```

### 内联布局

```html
<ldesign-form layout="inline">
  <ldesign-form-item label="用户名">
    <ldesign-input />
  </ldesign-form-item>
  <ldesign-form-item label="密码">
    <ldesign-input type="password" />
  </ldesign-form-item>
  <ldesign-form-item>
    <ldesign-button type="primary">搜索</ldesign-button>
  </ldesign-form-item>
</ldesign-form>
```

## 表单验证

:::demo

```html
<ldesign-form id="validateForm" layout="vertical">
  <ldesign-form-item label="邮箱" name="email" required>
    <ldesign-input type="email" placeholder="请输入邮箱"></ldesign-input>
  </ldesign-form-item>
  
  <ldesign-form-item label="年龄" name="age" required>
    <ldesign-input-number min="1" max="120"></ldesign-input-number>
  </ldesign-form-item>
  
  <ldesign-form-item>
    <ldesign-button type="primary" html-type="submit">提交</ldesign-button>
  </ldesign-form-item>
</ldesign-form>

<script>
const form = document.getElementById('validateForm');

form.addEventListener('ldesignSubmit', async (e) => {
  const { valid, errors } = await form.validate();
  
  if (valid) {
    alert('验证通过！');
  } else {
    alert('验证失败：' + JSON.stringify(errors));
  }
});

form.addEventListener('ldesignValidateError', (e) => {
  console.error('验证错误:', e.detail);
});
</script>
```

:::

## Vue 3 使用

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@ldesign/webcomponent/form';
import '@ldesign/webcomponent/input';
import '@ldesign/webcomponent/button';

const formRef = ref<any>(null);
const formData = ref({
  username: '',
  email: '',
  password: ''
});

const handleSubmit = async (e: CustomEvent) => {
  const values = e.detail;
  console.log('提交:', values);
  
  try {
    await submitToAPI(values);
    alert('提交成功！');
  } catch (error) {
    alert('提交失败');
  }
};

const validateManually = async () => {
  if (formRef.value) {
    const { valid, errors } = await formRef.value.validate();
    console.log({ valid, errors });
  }
};
</script>

<template>
  <ldesign-form 
    ref="formRef"
    layout="vertical"
    @ldesignSubmit="handleSubmit"
  >
    <ldesign-form-item label="用户名" name="username" required>
      <ldesign-input 
        :value="formData.username"
        @ldesignChange="(e) => formData.username = e.detail"
        placeholder="请输入用户名"
      />
    </ldesign-form-item>
    
    <ldesign-form-item label="邮箱" name="email" required>
      <ldesign-input 
        :value="formData.email"
        @ldesignChange="(e) => formData.email = e.detail"
        type="email"
        placeholder="请输入邮箱"
      />
    </ldesign-form-item>
    
    <ldesign-form-item>
      <ldesign-button type="primary" html-type="submit">
        提交
      </ldesign-button>
      <ldesign-button @ldesignClick="validateManually">
        手动验证
      </ldesign-button>
    </ldesign-form-item>
  </ldesign-form>
</template>
```

## React 使用

```tsx
import { useRef } from 'react';
import { Form, Button } from '@ldesign/webcomponent-react';

function MyForm() {
  const formRef = useRef<any>(null);

  const handleSubmit = (e: CustomEvent) => {
    console.log('提交:', e.detail);
  };

  const validateForm = async () => {
    if (formRef.current) {
      const result = await formRef.current.validate();
      console.log(result);
    }
  };

  return (
    <Form ref={formRef} layout="vertical" onSubmit={handleSubmit}>
      <ldesign-form-item label="用户名" name="username" required>
        <ldesign-input placeholder="请输入用户名" />
      </ldesign-form-item>
      
      <ldesign-form-item>
        <Button type="primary" htmlType="submit">提交</Button>
      </ldesign-form-item>
    </Form>
  );
}
```

## API

### Form Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| layout | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` | 表单布局 |
| labelWidth | `string \| number` | - | 标签宽度 |
| labelAlign | `'left' \| 'right'` | `'right'` | 标签对齐 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 表单尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |

### FormItem Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | `string` | - | 标签文字 |
| name | `string` | - | 字段名称（必需） |
| required | `boolean` | `false` | 是否必填 |
| error | `string` | - | 错误提示 |
| help | `string` | - | 帮助文本 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| ldesignSubmit | `values: Record<string, any>` | 表单提交 |
| ldesignReset | - | 表单重置 |
| ldesignValidateError | `errors: Record<string, string>` | 验证失败 |

### Methods

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| validate | - | `Promise<{ valid: boolean, errors: Record<string, string> }>` | 验证表单 |
| getFieldsValue | - | `Promise<Record<string, any>>` | 获取表单值 |
| setFieldValue | `(name, value)` | `Promise<void>` | 设置字段值 |
| reset | - | `Promise<void>` | 重置表单 |

## 相关组件

- [Input](/components/input) - 输入框
- [Upload](/components/upload) - 文件上传
- [Button](/components/button) - 按钮

