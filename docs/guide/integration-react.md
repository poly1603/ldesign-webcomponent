# 在 React 中使用

本指南介绍如何在 React 项目中使用 LDesign WebComponent。

## 安装

```bash
# 核心包
npm install @ldesign/webcomponent

# React 集成包（推荐）
npm install @ldesign/webcomponent-react
```

## 使用方式

### 方式1：使用 React 集成包（推荐）

```tsx
import { Button, Input, Table, Card } from '@ldesign/webcomponent-react';
import type { TableColumn } from '@ldesign/webcomponent-react';

function App() {
  const columns: TableColumn[] = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true }
  ];

  const data = [
    { id: 1, name: '张三', age: 28 },
    { id: 2, name: '李四', age: 32 }
  ];

  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <Card title="用户列表">
      <Button type="primary" onClick={handleClick}>
        新增用户
      </Button>
      
      <Table
        columns={columns}
        dataSource={data}
        bordered
        striped
      />
    </Card>
  );
}
```

### 方式2：直接使用 Web Components

```tsx
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
    console.log('Clicked:', e.detail);
  };

  return (
    <div>
      <ldesign-button 
        type="primary"
        onLdesignClick={handleClick}
      >
        Click me
      </ldesign-button>
    </div>
  );
}
```

## Hook 使用

### useState 状态管理

```tsx
import { useState } from 'react';
import { Button, Input } from '@ldesign/webcomponent-react';

function FormExample() {
  const [value, setValue] = useState('');

  return (
    <div>
      <Input 
        value={value}
        onChange={(newValue) => setValue(newValue)}
        placeholder="Enter text"
      />
      <p>Value: {value}</p>
    </div>
  );
}
```

### useEffect 副作用

```tsx
import { useEffect, useState } from 'react';
import { Table } from '@ldesign/webcomponent-react';

function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 获取数据
    fetchData().then(setData);
  }, []);

  useEffect(() => {
    // 数据变化时的副作用
    console.log('Data updated:', data.length);
  }, [data]);

  return <Table dataSource={data} columns={columns} />;
}
```

### useRef 引用

```tsx
import { useRef } from 'react';
import { Form } from '@ldesign/webcomponent-react';

function MyForm() {
  const formRef = useRef<any>(null);

  const handleValidate = async () => {
    if (formRef.current) {
      const { valid, errors } = await formRef.current.validate();
      console.log('Valid:', valid, 'Errors:', errors);
    }
  };

  return (
    <div>
      <Form ref={formRef}>
        <ldesign-form-item label="用户名" name="username" required>
          <ldesign-input placeholder="请输入" />
        </ldesign-form-item>
      </Form>
      
      <button onClick={handleValidate}>验证</button>
    </div>
  );
}
```

## 虚拟列表示例

```tsx
import { useRef, useEffect } from 'react';

function VirtualListExample() {
  const listRef = useRef<any>(null);

  useEffect(() => {
    if (listRef.current) {
      // 设置数据
      listRef.current.items = Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        name: `项目 ${i + 1}`
      }));

      // 设置渲染函数
      listRef.current.renderItem = (item: any) => {
        const div = document.createElement('div');
        div.style.padding = '16px';
        div.innerHTML = `<strong>${item.name}</strong>`;
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

## 数据表格示例

```tsx
import { useState, useEffect } from 'react';
import { Table, Card } from '@ldesign/webcomponent-react';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

function UserTable() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: 'id', title: 'ID', width: 60, sortable: true },
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true },
    { key: 'email', title: '邮箱' }
  ];

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      const users = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        name: `用户 ${i + 1}`,
        age: 20 + (i % 40),
        email: `user${i + 1}@example.com`
      }));
      setData(users);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (sort: { key: string; order: 'asc' | 'desc' }) => {
    console.log('排序:', sort);
    // 实现排序逻辑
  };

  const handleRowClick = ({ row, index }: { row: User; index: number }) => {
    console.log('点击行:', row, index);
  };

  return (
    <Card title="用户列表（虚拟滚动 5000 行）">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
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

## 主题切换

```tsx
import { useState, useEffect } from 'react';
import { Button } from '@ldesign/webcomponent-react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // 从本地存储读取主题
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) setTheme(saved);
  }, []);

  return (
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙 暗色' : '🌞 亮色'}
    </Button>
  );
}
```

## TypeScript 类型

### 完整类型支持

```tsx
import type { 
  ButtonProps,
  InputProps,
  TableProps,
  TableColumn,
  FormRule 
} from '@ldesign/webcomponent-react';

// 定义组件 Props
interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

const MyButton: React.FC<MyButtonProps> = (props) => {
  return <Button {...props} />;
};
```

### 事件处理器类型

```tsx
// 点击事件
const handleClick = (event: MouseEvent) => {
  console.log(event);
};

// 变化事件
const handleChange = (value: string) => {
  console.log(value);
};

// 排序事件
const handleSort = (sort: { key: string; order: 'asc' | 'desc' }) => {
  console.log(sort);
};
```

## 性能优化

### 1. 使用 React.memo

```tsx
import React from 'react';
import { Table } from '@ldesign/webcomponent-react';

const MemoTable = React.memo(Table, (prevProps, nextProps) => {
  return prevProps.dataSource === nextProps.dataSource &&
         prevProps.columns === nextProps.columns;
});

function App() {
  return <MemoTable columns={columns} dataSource={data} />;
}
```

### 2. 虚拟滚动

```tsx
// ❌ 不推荐：大量数据会卡顿
{data.map(item => <div key={item.id}>{item.name}</div>)}

// ✅ 推荐：使用虚拟列表
<ldesign-virtual-list items={data} itemHeight={60} height={500} />
```

### 3. 按需导入

```tsx
// ❌ 不推荐：全量导入 380KB
import '@ldesign/webcomponent';

// ✅ 推荐：按需导入 15-35KB
import { Button, Input, Table } from '@ldesign/webcomponent-react';
```

## 常见问题

### Q1: 事件处理器类型错误？

使用 React 集成包可以自动处理类型：

```tsx
// 使用集成包，类型自动正确
import { Button } from '@ldesign/webcomponent-react';

<Button onClick={(e) => console.log(e)} />
```

### Q2: ref 如何使用？

```tsx
const buttonRef = useRef<any>(null);

useEffect(() => {
  if (buttonRef.current) {
    // 可以调用组件方法
    console.log(buttonRef.current);
  }
}, []);

<Button ref={buttonRef}>Click</Button>
```

### Q3: 如何设置复杂属性？

直接传递对象，React 集成包会自动处理：

```tsx
// ✅ React 集成包自动处理
<Table columns={columns} dataSource={data} />

// 或使用原生方式
<ldesign-table 
  columns={JSON.stringify(columns)}
  dataSource={JSON.stringify(data)}
/>
```

## 完整示例

查看 [React 示例项目](../../examples/react-example/)

## 下一步

- [Vue 3 集成](/guide/integration-vue)
- [按需导入](/guide/on-demand)
- [性能优化](/guide/performance)

