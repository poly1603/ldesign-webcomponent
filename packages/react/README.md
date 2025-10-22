# @ldesign/webcomponent-react

React integration for @ldesign/webcomponent with full TypeScript support.

## Installation

```bash
npm install @ldesign/webcomponent @ldesign/webcomponent-react
```

## Usage

### Basic Example

```tsx
import { Button, Input, Table } from '@ldesign/webcomponent-react';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleChange = (value: string) => {
    console.log('Input value:', value);
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Click me
      </Button>
      
      <Input 
        placeholder="Enter text"
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
```

### Table Example

```tsx
import { Table, Card } from '@ldesign/webcomponent-react';
import { useState } from 'react';

function UserTable() {
  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age', sortable: true },
    { key: 'email', title: 'Email' }
  ];

  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com' }
  ];

  const handleSort = (sort: { key: string; order: 'asc' | 'desc' }) => {
    console.log('Sort:', sort);
  };

  return (
    <Card title="Users">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        striped
        onSort={handleSort}
      />
    </Card>
  );
}
```

## API

### Components

All components from `@ldesign/webcomponent` are available as React components with proper TypeScript types:

- `Button` - Button component
- `Input` - Input component
- `Table` - Data table with virtual scrolling
- `Card` - Card container
- `Form` - Form container
- And 70+ more...

### TypeScript Support

Full TypeScript support with prop types and event handlers:

```tsx
import type { ButtonProps, InputProps } from '@ldesign/webcomponent-react';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Features

- ✅ Full TypeScript support
- ✅ React 18+ compatible
- ✅ Tree-shaking support
- ✅ Event handling with proper types
- ✅ All 78 components wrapped

## License

MIT




