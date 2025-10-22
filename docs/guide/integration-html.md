# 在原生 HTML 中使用

Web Components 是浏览器原生支持的技术，可以在任何 HTML 页面中直接使用。

## 安装

### 方式1：npm 安装（推荐）

```bash
npm install @ldesign/webcomponent
```

### 方式2：CDN 引入

```html
<!-- unpkg -->
<script type="module" src="https://unpkg.com/@ldesign/webcomponent"></script>

<!-- jsdelivr -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ldesign/webcomponent"></script>
```

## 快速开始

### 全量导入

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>LDesign Example</title>
  
  <!-- 全量导入所有组件 -->
  <script type="module" src="https://unpkg.com/@ldesign/webcomponent"></script>
</head>
<body>
  <h1>Hello LDesign!</h1>
  
  <ldesign-button type="primary">Primary Button</ldesign-button>
  <ldesign-input placeholder="请输入"></ldesign-input>
  <ldesign-switch checked></ldesign-switch>
</body>
</html>
```

### 按需导入（推荐）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>按需导入示例</title>
  
  <script type="module">
    // 只导入需要的组件（减少95%体积）
    import '@ldesign/webcomponent/button';
    import '@ldesign/webcomponent/input';
    import '@ldesign/webcomponent/card';
  </script>
</head>
<body>
  <ldesign-card title="登录">
    <ldesign-input placeholder="用户名"></ldesign-input>
    <ldesign-input type="password" placeholder="密码"></ldesign-input>
    <ldesign-button type="primary">登录</ldesign-button>
  </ldesign-card>
</body>
</html>
```

## 事件处理

```html
<ldesign-button id="myBtn" type="primary">Click me</ldesign-button>

<script>
  const btn = document.getElementById('myBtn');
  
  // 监听点击事件
  btn.addEventListener('ldesignClick', (event) => {
    console.log('按钮被点击', event.detail);
    alert('Hello!');
  });
</script>
```

## 属性设置

### 简单属性

```html
<ldesign-button 
  type="primary"
  size="large"
  disabled
  loading
>
  Button
</ldesign-button>
```

### 复杂属性（对象/数组）

```html
<ldesign-table id="myTable"></ldesign-table>

<script>
  const table = document.getElementById('myTable');
  
  // 通过 JavaScript 设置复杂属性
  table.columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true }
  ];
  
  table.dataSource = [
    { id: 1, name: '张三', age: 28 },
    { id: 2, name: '李四', age: 32 }
  ];
</script>
```

## 完整示例

### 数据表格

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Table Example</title>
  <script type="module">
    import '@ldesign/webcomponent/table';
    import '@ldesign/webcomponent/card';
  </script>
  
  <style>
    body {
      padding: 24px;
      font-family: -apple-system, sans-serif;
    }
  </style>
</head>
<body>
  <ldesign-card title="用户列表">
    <ldesign-table 
      id="userTable"
      bordered
      striped
      virtual
      height="500"
      row-height="48"
    ></ldesign-table>
  </ldesign-card>
  
  <script>
    const table = document.getElementById('userTable');
    
    table.columns = [
      { key: 'id', title: 'ID', width: 60, sortable: true },
      { key: 'name', title: '姓名', sortable: true },
      { key: 'age', title: '年龄', sortable: true },
      { key: 'email', title: '邮箱' }
    ];
    
    // 生成大量数据测试虚拟滚动
    table.dataSource = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `用户 ${i + 1}`,
      age: 20 + (i % 40),
      email: `user${i + 1}@example.com`
    }));
    
    // 监听排序事件
    table.addEventListener('ldesignSort', (e) => {
      console.log('排序:', e.detail);
    });
  </script>
</body>
</html>
```

### 表单提交

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@ldesign/webcomponent/form';
    import '@ldesign/webcomponent/input';
    import '@ldesign/webcomponent/button';
    import '@ldesign/webcomponent/card';
  </script>
</head>
<body>
  <ldesign-card title="用户注册">
    <ldesign-form id="regForm" layout="vertical">
      <ldesign-form-item label="用户名" name="username" required>
        <ldesign-input id="username" placeholder="请输入用户名"></ldesign-input>
      </ldesign-form-item>
      
      <ldesign-form-item label="邮箱" name="email" required>
        <ldesign-input id="email" type="email" placeholder="请输入邮箱"></ldesign-input>
      </ldesign-form-item>
      
      <ldesign-form-item>
        <ldesign-button type="primary" html-type="submit">提交</ldesign-button>
      </ldesign-form-item>
    </ldesign-form>
  </ldesign-card>
  
  <script>
    const form = document.getElementById('regForm');
    
    form.addEventListener('ldesignSubmit', async (e) => {
      const values = e.detail;
      console.log('表单值:', values);
      alert('提交成功！');
    });
  </script>
</body>
</html>
```

## 主题切换

```html
<!DOCTYPE html>
<html data-theme="light">
<head>
  <script type="module">
    import '@ldesign/webcomponent/button';
  </script>
  
  <style>
    body {
      background: var(--ld-bg-body);
      color: var(--ld-text-primary);
      transition: all 0.3s;
    }
  </style>
</head>
<body>
  <ldesign-button id="themeToggle" type="primary">
    切换主题
  </ldesign-button>
  
  <script>
    const btn = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    btn.addEventListener('ldesignClick', () => {
      const theme = html.getAttribute('data-theme');
      html.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
    });
  </script>
</body>
</html>
```

## 常见问题

### Q1: 组件没有样式？

确保正确导入了组件的 JS 文件。Web Components 的样式封装在 JS 中。

### Q2: 如何设置复杂属性？

使用 JavaScript 直接设置元素属性，而不是 HTML 属性：

```javascript
// ✅ 正确
element.dataSource = [...];

// ❌ 错误
<element dataSource="[...]">
```

### Q3: 事件名称是什么？

所有事件以 `ldesign` 开头：
- `ldesignClick`
- `ldesignChange`
- `ldesignInput`
- `ldesignSubmit`
- 等等...

## 下一步

- [Vue 3 集成](/guide/integration-vue)
- [React 集成](/guide/integration-react)
- [按需导入](/guide/on-demand)

