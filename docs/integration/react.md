# 在 React 中使用

@ldesign/webcomponent 完美支持 React 18+，提供两种使用方式。

## 安装

```bash
# 核心包
npm install @ldesign/webcomponent

# React 集成包（推荐）
npm install @ldesign/webcomponent-react
```

## 使用方式

### 方式1: 直接使用 Web Components

```tsx
import { useEffect } from 'react';
// 导入组件
import '@ldesign/webcomponent/button';
import '@ldesign/webcomponent/input';

// TypeScript 类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ldesign-button': any;
      'ldesign-input': any;
    }
  }
}

function App() {
  const handleClick = (e: any) => {
    console.log('点击', e.detail);
  };

  return (
    <div>
      <ldesign-button 
        type="primary"
        onLdesignClick={handleClick}
      >
        点击我
      </ldesign-button>
      
      <ldesign-input placeholder="请输入" />
    </div>
  );
}
```

### 方式2: 使用 React 集成包（推荐）

```tsx
import { Button, Input, Table } from '@ldesign/webcomponent-react';
import type { ButtonProps } from '@ldesign/webcomponent-react';

function App() {
  const handleClick = (event: MouseEvent) => {
    console.log('点击', event);
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        点击我
      </Button>
      
      <Input 
        placeholder="请输入"
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}
```

## 完整示例

### 基础组件

```tsx
import { useState } from 'react';
import { Button, Input, Card } from '@ldesign/webcomponent-react';

function BasicExample() {
  const [value, setValue] = useState('');

  return (
    <Card title="基础组件示例">
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button type="primary">Primary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
      </div>
      
      <Input
        value={value}
        onChange={setValue}
        placeholder="请输入内容"
      />
      
      <p>当前值: {value}</p>
    </Card>
  );
}
```

### 数据表格

```tsx
import { useState, useEffect } from 'react';
import { Table, Card } from '@ldesign/webcomponent-react';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

function TableExample() {
  const [data, setData] = useState<User[]>([]);

  const columns = [
    { key: 'id', title: 'ID', width: 60, sortable: true },
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 80, sortable: true },
    { key: 'email', title: '邮箱' }
  ];

  useEffect(() => {
    // 生成大量数据测试虚拟滚动
    const users = Array.from({ length: 5000 }, (_, i) => ({
      id: i + 1,
      name: `用户 ${i + 1}`,
      age: 20 + (i % 40),
      email: `user${i + 1}@example.com`
    }));
    setData(users);
  }, []);

  const handleSort = (sort: { key: string; order: 'asc' | 'desc' }) => {
    console.log('排序:', sort);
    // 实现排序逻辑
  };

  const handleRowClick = (data: { row: User; index: number }) => {
    console.log('点击行:', data);
  };

  return (
    <Card title="用户列表（虚拟滚动 5000 行）">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        striped
        virtual
        height={500}
        rowHeight={48}
        onSort={handleSort}
        onRowClick={handleRowClick}
      />
    </Card>
  );
}
```

### 虚拟列表

```tsx
import { useRef, useEffect } from 'react';

function VirtualListExample() {
  const listRef = useRef<any>(null);

  useEffect(() => {
    if (listRef.current) {
      // 设置数据
      listRef.current.items = Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        name: `项目 ${i + 1}`,
        description: `这是第 ${i + 1} 个项目`
      }));

      // 设置渲染函数
      listRef.current.renderItem = (item: any, index: number) => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 16px; border-bottom: 1px solid #eee;';
        div.innerHTML = `
          <strong>${item.name}</strong>
          <p style="margin: 4px 0 0; color: #666;">${item.description}</p>
        `;
        return div;
      };
    }
  }, []);

  return (
    <ldesign-virtual-list
      ref={listRef}
      item-height={60}
      height={500}
    />
  );
}
```

### 表单处理

```tsx
import { useRef } from 'react';
import { Form, Button, Card } from '@ldesign/webcomponent-react';

function FormExample() {
  const formRef = useRef<any>(null);

  const handleSubmit = async (e: CustomEvent) => {
    console.log('表单提交:', e.detail);
    alert('提交成功！');
  };

  const handleValidateError = (e: CustomEvent) => {
    console.error('验证错误:', e.detail);
  };

  const validateManually = async () => {
    if (formRef.current) {
      const { valid, errors } = await formRef.current.validate();
      console.log('验证结果:', { valid, errors });
    }
  };

  return (
    <Card title="表单示例">
      <Form
        ref={formRef}
        layout="horizontal"
        labelWidth={100}
        onSubmit={handleSubmit}
        onValidateError={handleValidateError}
      >
        <ldesign-form-item label="用户名" name="username" required>
          <ldesign-input placeholder="请输入用户名" />
        </ldesign-form-item>

        <ldesign-form-item label="邮箱" name="email" required>
          <ldesign-input type="email" placeholder="请输入邮箱" />
        </ldesign-form-item>

        <ldesign-form-item label="密码" name="password" required>
          <ldesign-input type="password" placeholder="请输入密码" />
        </ldesign-form-item>

        <ldesign-form-item>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={validateManually}>手动验证</Button>
          </div>
        </ldesign-form-item>
      </Form>
    </Card>
  );
}
```

## TypeScript 支持

### 类型定义

```typescript
import type { 
  ButtonProps, 
  InputProps,
  TableProps,
  TableColumn,
  FormRule 
} from '@ldesign/webcomponent-react';

// 定义表格列
const columns: TableColumn[] = [
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', sortable: true }
];

// 定义组件 Props
interface MyButtonProps extends ButtonProps {
  customProp?: string;
}
```

### 事件类型

```typescript
import type { MouseEvent } from 'react';

const handleClick = (event: MouseEvent) => {
  console.log(event);
};

const handleSort = (sort: { key: string; order: 'asc' | 'desc' }) => {
  console.log(sort);
};
```

## 主题定制

```tsx
import { useEffect, useState } from 'react';
import { Button } from '@ldesign/webcomponent-react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 暗色' : '🌞 亮色'}
    </Button>
  );
}
```

## 性能优化建议

### 1. 使用 React.memo 减少重渲染

```tsx
import React from 'react';
import { Table } from '@ldesign/webcomponent-react';

const MemoTable = React.memo(Table, (prev, next) => {
  return prev.dataSource === next.dataSource && 
         prev.columns === next.columns;
});
```

### 2. 长列表使用虚拟滚动

```tsx
// ❌ 不推荐
{items.map(item => <div key={item.id}>{item.name}</div>)}

// ✅ 推荐
<ldesign-virtual-list items={items} itemHeight={60} height={500} />
```

### 3. 按需导入组件

```tsx
// ❌ 不推荐：全量导入 380KB
import '@ldesign/webcomponent';

// ✅ 推荐：按需导入 15KB
import { Button, Input } from '@ldesign/webcomponent-react';
```

## 常见问题

### Q1: 如何处理 ref？

```tsx
import { useRef } from 'react';

function MyComponent() {
  const tableRef = useRef<any>(null);

  const scrollToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollToIndex(0);
    }
  };

  return <ldesign-table ref={tableRef} />;
}
```

### Q2: 事件处理器类型？

```tsx
// Web Component 原生事件
const handleNative = (e: any) => {
  console.log(e.detail);
};

// React 包装组件
const handleWrapped = (value: string) => {
  console.log(value);
};
```

### Q3: 如何设置样式？

```tsx
// 方式1：内联样式
<Button style={{ marginRight: '12px' }}>Click</Button>

// 方式2：className
<Button className="my-button">Click</Button>

// 方式3：CSS Modules
import styles from './App.module.css';
<Button className={styles.button}>Click</Button>
```

## 完整示例

查看 [examples/react-example/](../../examples/react-example/) 获取完整的示例项目。

## 下一步

- [Vue 3 集成指南](./vue.md)
- [组件 API 文档](../components/)
- [主题定制](../guide/theming.md)



