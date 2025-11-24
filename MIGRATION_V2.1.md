# @ldesign/webcomponent v2.1 迁移指南

> 从 v2.0 升级到 v2.1

## 📋 目录

- [概述](#概述)
- [快速升级](#快速升级)
- [新增组件使用](#新增组件使用)
- [增强组件迁移](#增强组件迁移)
- [常见问题](#常见问题)

---

## 概述

### 🎉 好消息

v2.1.0 是一个**完全向后兼容**的版本，所有 v2.0 的代码无需修改即可运行！

- ✅ **零 Breaking Changes**
- ✅ **所有现有 API 保持不变**
- ✅ **新功能都是可选的**
- ✅ **无需修改现有代码**

### 升级收益

升级到 v2.1 后，你将获得：

1. **4 个全新组件**（AutoComplete、Popover、InputGroup、TreeSelect）
2. **Form 表单业界最强能力**（10+验证类型、异步验证、字段联动、快照）
3. **Select 海量数据支持**（10,000+ 选项虚拟滚动）
4. **Table 企业级功能**（行选择、展开行、可编辑、树形数据）
5. **70+ 新增 API**

---

## 快速升级

### 1. 更新依赖

```bash
# 使用 npm
npm update @ldesign/webcomponent

# 使用 yarn
yarn upgrade @ldesign/webcomponent

# 使用 pnpm
pnpm update @ldesign/webcomponent
```

### 2. 验证版本

```bash
npm list @ldesign/webcomponent
```

应该看到：`@ldesign/webcomponent@2.1.0`

### 3. 重启开发服务器

```bash
npm run dev
```

### 4. 完成！

✅ 升级完成，所有现有功能正常工作。

---

## 新增组件使用

### AutoComplete - 自动完成

**适用场景**: 替换简单的 Input + Dropdown 组合

#### 基础用法

```html
<ldesign-auto-complete
  placeholder="搜索用户"
  :options="userOptions"
  @ldesignSelect="handleSelect"
/>
```

#### 远程搜索

```html
<ldesign-auto-complete
  placeholder="搜索"
  :options="filteredOptions"
  debounceTime="300"
  @ldesignSearch="handleRemoteSearch"
/>

<script>
const handleRemoteSearch = async (e) => {
  const query = e.detail;
  const results = await api.search(query);
  filteredOptions.value = results;
};
</script>
```

---

### Popover - 气泡卡片

**适用场景**: 替换 Tooltip（当需要更复杂内容时）

#### 基础用法

```html
<ldesign-popover title="用户信息" trigger="click">
  <ldesign-button slot="trigger">查看详情</ldesign-button>
  <div>
    <p>姓名：张三</p>
    <p>部门：技术部</p>
  </div>
</ldesign-popover>
```

#### 确认框

```html
<ldesign-popover title="确认删除" trigger="click">
  <ldesign-button slot="trigger" danger>删除</ldesign-button>
  <div>
    <p>确定要删除这条数据吗？</p>
    <div style="text-align: right; margin-top: 12px">
      <ldesign-button size="small" @click="handleCancel">取消</ldesign-button>
      <ldesign-button size="small" type="primary" @click="handleConfirm">确定</ldesign-button>
    </div>
  </div>
</ldesign-popover>
```

---

### InputGroup - 输入框组合

**适用场景**: URL输入、金额输入、搜索框等组合场景

#### 搜索框

```html
<ldesign-input-group>
  <ldesign-input placeholder="请输入关键词" />
  <ldesign-button type="primary">搜索</ldesign-button>
</ldesign-input-group>
```

#### URL 输入

```html
<ldesign-input-group compact>
  <ldesign-input-group-addon>https://</ldesign-input-group-addon>
  <ldesign-input placeholder="www.example.com" />
</ldesign-input-group>
```

#### 金额输入

```html
<ldesign-input-group compact>
  <ldesign-input-group-addon>¥</ldesign-input-group-addon>
  <ldesign-input-number placeholder="0.00" />
  <ldesign-input-group-addon>.00</ldesign-input-group-addon>
</ldesign-input-group>
```

---

### TreeSelect - 树选择

**适用场景**: 替换 Select（当数据有层级结构时）

#### 部门选择

```html
<ldesign-tree-select
  placeholder="请选择部门"
  :treeData="departmentData"
  searchable
  @ldesignChange="handleChange"
/>

<script>
const departmentData = [
  {
    value: 'tech',
    label: '技术部',
    children: [
      { value: 'frontend', label: '前端组' },
      { value: 'backend', label: '后端组' },
    ],
  },
  {
    value: 'product',
    label: '产品部',
    children: [
      { value: 'design', label: '设计组' },
      { value: 'pm', label: '产品经理组' },
    ],
  },
];
</script>
```

#### 多选模式

```html
<ldesign-tree-select
  multiple
  checkable
  :treeData="categoryData"
  placeholder="请选择分类"
/>
```

---

## 增强组件迁移

### Form - 表单增强

#### 1. 升级验证规则（可选）

**v2.0 写法**（仍然支持）：

```html
<ldesign-form-item required>
  <ldesign-input />
</ldesign-form-item>
```

**v2.1 推荐写法**（更强大）：

```html
<ldesign-form-item 
  name="email"
  :rules="[
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' },
    { 
      asyncValidator: async (value) => {
        const exists = await checkEmail(value);
        return !exists || '该邮箱已被注册';
      },
      debounce: 300
    }
  ]"
>
  <ldesign-input />
</ldesign-form-item>
```

#### 2. 使用字段联动（新功能）

```javascript
const form = document.querySelector('ldesign-form');

// 监听国家变化，自动更新省份
await form.watch('country', (value, oldValue, allValues) => {
  if (value === 'China') {
    form.setFieldValue('province', '');
    // 加载中国的省份列表
  }
});
```

#### 3. 使用表单快照（新功能）

```javascript
// 保存草稿
const saveButton = document.querySelector('#save-draft');
saveButton.addEventListener('click', async () => {
  const snapshot = await form.snapshot();
  localStorage.setItem('form-draft', JSON.stringify(snapshot));
  message.success('草稿已保存');
});

// 恢复草稿
const loadButton = document.querySelector('#load-draft');
loadButton.addEventListener('click', async () => {
  const draft = localStorage.getItem('form-draft');
  if (draft) {
    await form.restore(JSON.parse(draft));
    message.success('草稿已恢复');
  }
});

// 检查是否有未保存的修改
window.addEventListener('beforeunload', async (e) => {
  const hasChanges = await form.isChanged();
  if (hasChanges) {
    e.preventDefault();
    e.returnValue = '您有未保存的修改，确定要离开吗？';
  }
});
```

#### 4. 使用动态表单项（新功能）

```html
<ldesign-form id="dynamic-form">
  <ldesign-form-list name="contacts">
    <!-- 动态联系人列表 -->
  </ldesign-form-list>
</ldesign-form>

<script>
const formList = document.querySelector('ldesign-form-list');

// 添加联系人
addButton.addEventListener('click', async () => {
  await formList.add({ name: '', phone: '' });
});

// 删除联系人
removeButton.addEventListener('click', async () => {
  await formList.remove(index);
});
</script>
```

---

### Select - 选择器增强

#### 1. 处理大数据量（新功能）

**v2.0 写法**（1000+ 选项时卡顿）：

```html
<ldesign-select :options="largeDataset" />
```

**v2.1 推荐写法**（10,000+ 选项流畅）：

```html
<ldesign-select
  virtualScroll
  virtualItemHeight="32"
  :options="largeDataset"
/>
```

#### 2. 远程搜索（新功能）

```html
<ldesign-select
  remote
  filterable
  :remoteMethod="searchUsers"
  :loading="loading"
  placeholder="搜索用户"
  @ldesignSearch="handleSearch"
/>

<script>
const searchUsers = debounce(async (query) => {
  loading.value = true;
  try {
    const results = await api.searchUsers(query);
    options.value = results;
  } finally {
    loading.value = false;
  }
}, 300);
</script>
```

#### 3. 自定义选项渲染（新功能）

```html
<ldesign-select
  :options="userOptions"
  :optionRenderer="renderUserOption"
/>

<script>
const renderUserOption = (option, selected) => {
  return (
    <div class="user-option" style="display: flex; align-items: center">
      <img src={option.avatar} style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px" />
      <div>
        <div>{option.name}</div>
        <div style="font-size: 12px; color: #999">{option.email}</div>
      </div>
      {selected && <ldesign-icon name="check" style="margin-left: auto; color: #722ED1" />}
    </div>
  );
};
</script>
```

#### 4. 创建新选项（新功能）

```html
<ldesign-select
  allowCreate
  filterable
  :options="tagOptions"
  placeholder="输入或选择标签"
/>
```

---

### Table - 表格增强

#### 1. 行选择（新功能）

```html
<ldesign-table
  :dataSource="tableData"
  :columns="columns"
  :rowSelection="{
    type: 'checkbox',
    selectedRowKeys: selectedRowKeys,
    onChange: handleSelectionChange
  }"
/>

<script>
const selectedRowKeys = ref([]);

const handleSelectionChange = ({ selectedRowKeys, selectedRows }) => {
  console.log('已选中:', selectedRowKeys, selectedRows);
};

// 批量删除
const handleBatchDelete = () => {
  if (selectedRowKeys.value.length === 0) {
    message.warning('请先选择要删除的数据');
    return;
  }
  // 执行删除
};
</script>
```

#### 2. 展开行（新功能）

```html
<ldesign-table
  :dataSource="tableData"
  :columns="columns"
  :expandable="{
    expandedRowRender: (row, index) => {
      return (
        <div style='padding: 16px'>
          <h4>订单详情</h4>
          <p>订单号: {row.orderNo}</p>
          <p>收货地址: {row.address}</p>
          <p>备注: {row.remark}</p>
        </div>
      );
    }
  }"
/>
```

#### 3. 可编辑单元格（新功能）

```html
<ldesign-table
  :dataSource="tableData"
  :columns="editableColumns"
  editable
  @ldesignCellEdit="handleCellEdit"
/>

<script>
const editableColumns = [
  { key: 'name', title: '姓名', editable: true, editorType: 'input' },
  { key: 'age', title: '年龄', editable: true, editorType: 'number' },
  { 
    key: 'status', 
    title: '状态', 
    editable: true, 
    editorType: 'select',
    editorOptions: [
      { label: '在职', value: '1' },
      { label: '离职', value: '0' }
    ]
  },
];

const handleCellEdit = ({ row, column, value }) => {
  console.log('单元格编辑:', row, column.key, value);
  // 保存到后端
  api.updateRecord(row.id, { [column.key]: value });
};
</script>
```

#### 4. 树形数据（新功能）

```html
<ldesign-table
  :dataSource="treeData"
  :columns="columns"
  treeData
  childrenColumnName="children"
  indentSize="20"
/>

<script>
const treeData = [
  {
    id: '1',
    name: '技术部',
    children: [
      { id: '1-1', name: '前端组' },
      { id: '1-2', name: '后端组' },
    ],
  },
  {
    id: '2',
    name: '产品部',
    children: [
      { id: '2-1', name: '设计组' },
    ],
  },
];
</script>
```

---

## 常见问题

### Q1: 升级后原有代码会受影响吗？

**A**: 不会。v2.1 完全向后兼容 v2.0，所有现有代码无需修改。

---

### Q2: 新功能是可选的吗？

**A**: 是的，所有新功能都是可选的，你可以按需使用。

---

### Q3: Form 的 rules 必须用新格式吗？

**A**: 不是必须的。旧格式仍然支持：

```html
<!-- 旧格式（仍支持） -->
<ldesign-form-item required>

<!-- 新格式（推荐） -->
<ldesign-form-item :rules="[{ required: true, type: 'email' }]">
```

---

### Q4: Select 虚拟滚动会自动启用吗？

**A**: 不会自动启用，需要手动配置 `virtualScroll` 属性。

---

### Q5: Table 的 editable 会影响现有表格吗？

**A**: 不会，`editable` 默认为 `false`，需要显式启用。

---

### Q6: 新组件的浏览器兼容性如何？

**A**: 与 v2.0 保持一致，支持所有现代浏览器（Chrome/Firefox/Safari/Edge）。

---

### Q7: 如何回退到 v2.0？

```bash
npm install @ldesign/webcomponent@2.0.0
```

不过我们建议保持在 v2.1，因为它完全向后兼容且提供了更多功能。

---

### Q8: 性能会受影响吗？

**A**: 不会，反而会有提升：
- Select 虚拟滚动让大数据更流畅
- Form 防抖减少不必要的验证
- Table 事件委托减少内存占用

---

### Q9: TypeScript 类型定义完整吗？

**A**: 是的，所有新增 API 都有完整的 TypeScript 类型定义。

---

### Q10: 文档在哪里？

**A**: 
- 组件文档：`docs/components/`
- CHANGELOG：`CHANGELOG_V2.1.md`
- 本迁移指南：`MIGRATION_V2.1.md`

---

## 最佳实践

### 1. 渐进式升级

不需要一次性升级所有代码，可以：
1. 先升级依赖到 v2.1
2. 继续使用原有代码
3. 逐步在新功能中使用新 API
4. 在重构时采用新的最佳实践

### 2. 优先使用新组件

遇到以下场景时，优先考虑新组件：
- 搜索建议 → AutoComplete
- 复杂提示 → Popover
- 组合输入 → InputGroup
- 树形选择 → TreeSelect

### 3. 大数据场景启用虚拟滚动

当 Select 或 Table 数据量超过 1000 时，启用虚拟滚动：

```html
<ldesign-select virtualScroll />
<ldesign-table virtual />
```

### 4. 表单使用新验证系统

新项目推荐使用 v2.1 的验证系统：
- 类型安全
- 异步验证
- 更好的错误提示

---

## 获取帮助

- 📖 查看[完整文档](./docs/components/)
- 💬 [GitHub Discussions](https://github.com/.../discussions)
- 🐛 [提交 Issue](https://github.com/.../issues)
- 📧 邮件支持：support@example.com

---

## 总结

v2.1 是一个**纯增强版本**，升级过程简单且安全：

✅ **升级步骤**：`npm update @ldesign/webcomponent`  
✅ **代码修改**：无需修改  
✅ **新功能**：按需使用  
✅ **性能**：只升不降  
✅ **文档**：完整齐全  

**现在就升级，享受更强大的组件库！** 🚀
