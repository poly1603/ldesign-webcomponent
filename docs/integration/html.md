# 在原生 HTML 中使用

@ldesign/webcomponent 是标准的 Web Components，可以在任何 HTML 页面中直接使用。

## 安装

### 方式1：通过 npm 安装

```bash
npm install @ldesign/webcomponent
```

### 方式2：通过 CDN 引入

```html
<!-- 使用 unpkg -->
<script type="module" src="https://unpkg.com/@ldesign/webcomponent"></script>

<!-- 或使用 jsdelivr -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ldesign/webcomponent"></script>
```

## 使用方式

### 全量导入

适合快速原型开发或组件使用较多的场景。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LDesign WebComponent Example</title>
  
  <!-- 全量导入所有组件 -->
  <script type="module" src="https://unpkg.com/@ldesign/webcomponent"></script>
</head>
<body>
  <h1>Hello LDesign!</h1>
  
  <!-- 使用组件 -->
  <ldesign-button type="primary">Primary Button</ldesign-button>
  <ldesign-button type="default">Default Button</ldesign-button>
  
  <ldesign-input placeholder="请输入内容"></ldesign-input>
  
  <ldesign-switch checked></ldesign-switch>
</body>
</html>
```

### 按需导入（推荐）

只导入需要的组件，可显著减小加载体积。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>按需导入示例</title>
  
  <script type="module">
    // 只导入需要的组件
    import '@ldesign/webcomponent/button';
    import '@ldesign/webcomponent/input';
    import '@ldesign/webcomponent/table';
  </script>
</head>
<body>
  <ldesign-button type="primary">Click me</ldesign-button>
  <ldesign-input placeholder="Enter text"></ldesign-input>
</body>
</html>
```

## 事件处理

Web Components 使用自定义事件，可以通过 `addEventListener` 或直接在 HTML 中监听。

```html
<ldesign-button id="myButton" type="primary">Click me</ldesign-button>

<script>
  const button = document.getElementById('myButton');
  
  // 方式1：使用 addEventListener
  button.addEventListener('ldesignClick', (event) => {
    console.log('按钮被点击', event.detail);
  });
  
  // 方式2：直接在 HTML 中监听（不推荐）
  // <ldesign-button onldesignclick="handleClick(event)">
</script>
```

## 属性设置

### 设置简单属性

```html
<ldesign-button 
  type="primary"
  size="large"
  disabled
>
  Disabled Button
</ldesign-button>
```

### 设置复杂属性（对象/数组）

对于复杂类型的属性，有两种方式：

#### 方式1：使用 JSON 字符串

```html
<ldesign-table 
  id="myTable"
  columns='[{"key":"name","title":"姓名"},{"key":"age","title":"年龄"}]'
  dataSource='[{"id":1,"name":"张三","age":28}]'
>
</ldesign-table>
```

#### 方式2：通过 JavaScript 设置

```html
<ldesign-table id="myTable"></ldesign-table>

<script>
  const table = document.getElementById('myTable');
  
  table.columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true },
    { key: 'address', title: '地址' }
  ];
  
  table.dataSource = [
    { id: 1, name: '张三', age: 28, address: '北京' },
    { id: 2, name: '李四', age: 32, address: '上海' },
    { id: 3, name: '王五', age: 25, address: '广州' }
  ];
</script>
```

## 完整示例

### 数据表格示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Table Example</title>
  <script type="module" src="https://unpkg.com/@ldesign/webcomponent/table"></script>
  
  <style>
    body {
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  </style>
</head>
<body>
  <h1>用户列表</h1>
  
  <ldesign-table 
    id="userTable"
    bordered
    striped
    hoverable
    height="400"
  ></ldesign-table>
  
  <script>
    const table = document.getElementById('userTable');
    
    // 设置列配置
    table.columns = [
      { 
        key: 'id', 
        title: 'ID', 
        width: 80,
        align: 'center'
      },
      { 
        key: 'name', 
        title: '姓名',
        sortable: true 
      },
      { 
        key: 'age', 
        title: '年龄',
        width: 100,
        sortable: true,
        align: 'center'
      },
      { 
        key: 'email', 
        title: '邮箱' 
      },
      { 
        key: 'address', 
        title: '地址' 
      }
    ];
    
    // 设置数据
    table.dataSource = [
      { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', address: '北京市朝阳区' },
      { id: 2, name: '李四', age: 32, email: 'lisi@example.com', address: '上海市浦东新区' },
      { id: 3, name: '王五', age: 25, email: 'wangwu@example.com', address: '广州市天河区' },
      { id: 4, name: '赵六', age: 30, email: 'zhaoliu@example.com', address: '深圳市南山区' }
    ];
    
    // 监听行点击事件
    table.addEventListener('ldesignRowClick', (event) => {
      const { row, index } = event.detail;
      console.log('点击了第', index, '行:', row);
      alert(`你点击了: ${row.name}`);
    });
    
    // 监听排序事件
    table.addEventListener('ldesignSort', (event) => {
      const { key, order } = event.detail;
      console.log('排序:', key, order);
    });
  </script>
</body>
</html>
```

### 虚拟列表示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Virtual List Example</title>
  <script type="module" src="https://unpkg.com/@ldesign/webcomponent/virtual-list"></script>
  
  <style>
    .list-item {
      padding: 15px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .list-item:hover {
      background-color: #f5f5f5;
    }
    .item-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #7334cb;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>虚拟列表（10000项）</h1>
  
  <ldesign-virtual-list 
    id="myList"
    item-height="70"
    height="500"
  ></ldesign-virtual-list>
  
  <script>
    const list = document.getElementById('myList');
    
    // 生成 10000 条数据
    const items = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `用户 ${i + 1}`,
      email: `user${i + 1}@example.com`
    }));
    
    // 设置数据
    list.items = items;
    
    // 设置渲染函数
    list.renderItem = (item, index) => {
      const div = document.createElement('div');
      div.className = 'list-item';
      div.innerHTML = `
        <div class="item-avatar">${item.name.charAt(2)}</div>
        <div>
          <div><strong>${item.name}</strong></div>
          <div style="font-size: 12px; color: #666;">${item.email}</div>
        </div>
      `;
      return div;
    };
  </script>
</body>
</html>
```

## 主题切换

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <title>Theme Example</title>
  <script type="module" src="https://unpkg.com/@ldesign/webcomponent"></script>
  
  <style>
    body {
      background-color: var(--ld-bg-body, #ffffff);
      color: var(--ld-text-primary, rgba(0, 0, 0, 0.87));
      transition: background-color 0.3s, color 0.3s;
    }
  </style>
</head>
<body>
  <h1>主题切换示例</h1>
  
  <ldesign-button id="toggleTheme" type="primary">
    切换主题
  </ldesign-button>
  
  <ldesign-button type="success">Success</ldesign-button>
  <ldesign-button type="warning">Warning</ldesign-button>
  <ldesign-button type="danger">Danger</ldesign-button>
  
  <script>
    const html = document.documentElement;
    const toggleBtn = document.getElementById('toggleTheme');
    
    toggleBtn.addEventListener('ldesignClick', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
    });
  </script>
</body>
</html>
```

## 常见问题

### 1. 组件没有样式？

确保正确引入了组件的 JavaScript 文件。Web Components 的样式是封装在组件内部的。

### 2. 如何设置复杂属性？

对于对象和数组类型的属性，使用 JavaScript 直接设置，而不是 HTML 属性。

### 3. 事件名称是什么？

所有事件都以 `ldesign` 开头，例如：`ldesignClick`、`ldesignChange`、`ldesignSort` 等。

### 4. 如何实现双向绑定？

Web Components 不支持原生双向绑定，需要手动监听事件并更新属性：

```javascript
const input = document.getElementById('myInput');

// 监听变化事件
input.addEventListener('ldesignChange', (e) => {
  console.log('新值:', e.detail);
  // 更新其他地方的数据
});

// 更新输入框的值
input.value = 'new value';
```

## 下一步

- [在 Vue 3 中使用](./vue.md)
- [在 React 中使用](./react.md)
- [组件 API 文档](../components/)
- [主题定制指南](../guide/theming.md)




