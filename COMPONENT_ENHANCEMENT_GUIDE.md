# 现有组件功能增强指南

## 🔴 P0 - 核心组件增强（必须优化）

### 1. Form 表单 ⭐⭐⭐

**当前状态**: ⚠️ 功能较弱，仅支持基础验证

**缺失功能清单**:

#### 1.1 复杂验证规则 ⭐⭐⭐
```typescript
// 当前只支持
<ldesign-form-item required>

// 需要支持
interface FormRule {
  required?: boolean;
  type?: 'string' | 'number' | 'email' | 'url' | 'array' | 'object';
  pattern?: RegExp | string;
  min?: number;  // 最小长度/值
  max?: number;  // 最大长度/值
  len?: number;  // 精确长度
  validator?: (value: any) => boolean | string | Promise<boolean | string>;
  message?: string;
  trigger?: 'change' | 'blur' | 'submit';
}

// 使用示例
<ldesign-form-item 
  name="email"
  :rules="[
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' },
    { 
      validator: async (value) => {
        const exists = await checkEmailExists(value);
        return !exists || '该邮箱已被注册';
      }
    }
  ]"
>
```

#### 1.2 动态表单项 ⭐⭐⭐
```html
<!-- 动态添加/删除表单项 -->
<ldesign-form id="dynamic-form">
  <ldesign-form-list name="users">
    <template v-for="(field, index) in fields" :key="field.key">
      <ldesign-form-item 
        :label="`用户 ${index + 1}`"
        :name="['users', index, 'name']"
        required
      >
        <ldesign-input placeholder="姓名" />
        <ldesign-button 
          icon="minus" 
          @click="removeField(index)"
        />
      </ldesign-form-item>
    </template>
    
    <ldesign-button 
      type="dashed" 
      icon="plus"
      @click="addField"
    >
      添加用户
    </ldesign-button>
  </ldesign-form-list>
</ldesign-form>

<script>
const form = document.getElementById('dynamic-form');
form.addField = () => {
  // 添加逻辑
};
form.removeField = (index) => {
  // 移除逻辑
};
</script>
```

#### 1.3 表单数组 ⭐⭐
```typescript
// 支持数组类型字段
interface FormData {
  users: Array<{
    name: string;
    email: string;
    roles: string[];
  }>;
}

// 使用
<ldesign-form :model="formData">
  <ldesign-form-item name="users[0].name">
    <ldesign-input />
  </ldesign-form-item>
  <ldesign-form-item name="users[0].roles">
    <ldesign-checkbox-group />
  </ldesign-form-item>
</ldesign-form>
```

#### 1.4 异步验证 ⭐⭐⭐
```javascript
// 支持异步验证（防抖）
<ldesign-form-item 
  name="username"
  :rules="[
    {
      validator: debounce(async (value) => {
        const available = await checkUsername(value);
        return available || '用户名已存在';
      }, 300)
    }
  ]"
>
```

#### 1.5 字段联动 ⭐⭐
```javascript
// 监听其他字段变化
form.watch('country', (value) => {
  if (value === 'USA') {
    form.setFieldValue('state', '');
    form.setFieldOptions('state', USAStates);
  } else {
    form.setFieldOptions('state', []);
  }
});

// 条件显示
<ldesign-form-item 
  name="idCard"
  :visible="formData.country === 'China'"
>
```

#### 1.6 表单快照 ⭐
```javascript
// 保存/恢复表单状态
const snapshot = await form.snapshot();
await form.restore(snapshot);

// 对比变化
const hasChanged = form.isChanged();
const changedFields = form.getChangedFields();
```

**工作量评估**: 10-12天

---

### 2. Select 选择器 ⭐⭐⭐

**当前状态**: ⚠️ 基础功能完整，缺少高级特性

**缺失功能清单**:

#### 2.1 虚拟滚动 ⭐⭐⭐
```html
<!-- 处理10,000+选项 -->
<ldesign-select 
  virtual-scroll
  :options="largeDataset"
  :virtual-item-height="32"
>
```

**技术方案**: 
- 复用VirtualList组件核心逻辑
- 只渲染可见范围内的选项
- 保持滚动性能60fps

**工作量**: 2-3天

#### 2.2 远程搜索 ⭐⭐⭐
```html
<ldesign-select
  remote
  :remote-method="searchUsers"
  :loading="loading"
  filterable
  @search="handleSearch"
>
```

```javascript
const searchUsers = debounce(async (query) => {
  loading.value = true;
  try {
    const results = await api.searchUsers(query);
    options.value = results;
  } finally {
    loading.value = false;
  }
}, 300);
```

**必需特性**:
- ✅ 防抖处理（300ms）
- ✅ 加载状态显示
- ✅ 空结果提示
- ✅ 搜索失败处理

**工作量**: 2天

#### 2.3 自定义渲染 ⭐⭐
```html
<!-- 自定义选项模板 -->
<ldesign-select>
  <template #option="{ option }">
    <div class="custom-option">
      <img :src="option.avatar" />
      <div>
        <div>{{ option.name }}</div>
        <div class="desc">{{ option.title }}</div>
      </div>
    </div>
  </template>
</ldesign-select>

<!-- 自定义已选项显示 -->
<ldesign-select>
  <template #tag="{ option, onClose }">
    <ldesign-tag closable @close="onClose">
      {{ option.label }}
    </ldesign-tag>
  </template>
</ldesign-select>
```

**工作量**: 2-3天

#### 2.4 创建新选项 ⭐⭐
```html
<ldesign-select
  allow-create
  filterable
  @create="handleCreate"
>
```

```javascript
const handleCreate = (inputValue) => {
  const newOption = {
    label: inputValue,
    value: generateId()
  };
  options.value.push(newOption);
  return newOption.value;
};
```

**工作量**: 1-2天

#### 2.5 最大选择数 ⭐
```html
<ldesign-select
  multiple
  :max-tag-count="3"
  :max-tag-placeholder="(omittedCount) => `+${omittedCount}`"
/>
```

**工作量**: 1天

#### 2.6 分组选择 ⭐⭐
```html
<ldesign-select>
  <ldesign-option-group label="热门城市">
    <ldesign-option value="beijing">北京</ldesign-option>
    <ldesign-option value="shanghai">上海</ldesign-option>
  </ldesign-option-group>
  <ldesign-option-group label="其他城市">
    <ldesign-option value="hangzhou">杭州</ldesign-option>
  </ldesign-option-group>
</ldesign-select>
```

**工作量**: 2天

**总工作量**: 10-13天

---

### 3. Table 表格 ⭐⭐⭐

**当前状态**: ✅ 虚拟滚动完善，⚠️ 缺少高级功能

**缺失功能清单**:

#### 3.1 可编辑单元格 ⭐⭐⭐
```html
<ldesign-table :data="tableData" editable>
  <ldesign-table-column 
    prop="name" 
    label="姓名"
    editable
    :editor="{ type: 'input' }"
  />
  <ldesign-table-column 
    prop="age" 
    label="年龄"
    editable
    :editor="{ type: 'input-number', min: 0, max: 150 }"
  />
  <ldesign-table-column 
    prop="gender" 
    label="性别"
    editable
    :editor="{ 
      type: 'select', 
      options: [{label: '男', value: 'M'}, {label: '女', value: 'F'}]
    }"
  />
</ldesign-table>
```

**支持的编辑器类型**:
- input - 文本输入
- input-number - 数字输入
- select - 下拉选择
- checkbox - 复选框
- date-picker - 日期选择
- custom - 自定义编辑器

**编辑模式**:
- cell - 单元格编辑（双击）
- row - 行编辑（点击编辑按钮）

**工作量**: 4-5天

#### 3.2 列拖拽排序 ⭐⭐
```html
<ldesign-table 
  :data="tableData"
  :columns="columns"
  column-draggable
  @column-drag-end="handleColumnDragEnd"
>
```

**技术方案**: 使用HTML5 Drag & Drop API

**工作量**: 2-3天

#### 3.3 固定列 ⭐⭐⭐
```html
<ldesign-table :data="tableData">
  <ldesign-table-column 
    prop="id" 
    label="ID"
    width="80"
    fixed="left"
  />
  <ldesign-table-column prop="name" label="姓名" width="120" />
  <ldesign-table-column prop="description" label="描述" width="300" />
  <!-- 更多列... -->
  <ldesign-table-column 
    label="操作"
    width="150"
    fixed="right"
  >
    <template #default="{ row }">
      <ldesign-button size="small">编辑</ldesign-button>
      <ldesign-button size="small">删除</ldesign-button>
    </template>
  </ldesign-table-column>
</ldesign-table>
```

**技术要点**:
- 左右固定列独立滚动
- 固定列阴影效果
- 与虚拟滚动兼容

**工作量**: 3-4天

#### 3.4 树形数据 ⭐⭐⭐
```html
<ldesign-table 
  :data="treeData"
  row-key="id"
  tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  :default-expand-all="false"
>
  <ldesign-table-column prop="name" label="名称" />
  <ldesign-table-column prop="size" label="大小" />
</ldesign-table>
```

**必需特性**:
- ✅ 展开/收起
- ✅ 默认展开层级
- ✅ 懒加载子节点
- ✅ 缩进显示层级
- ✅ 自定义展开图标

**工作量**: 3-4天

#### 3.5 行选择 ⭐⭐⭐
```html
<ldesign-table 
  :data="tableData"
  row-selection
  :row-selection-config="{
    type: 'checkbox', // 或 'radio'
    fixed: true,
    selectedRowKeys: selectedKeys,
    onChange: handleSelectionChange
  }"
>
```

**必需特性**:
- ✅ 复选框/单选按钮
- ✅ 全选/反选
- ✅ 跨页选择
- ✅ 禁用某些行

**工作量**: 2-3天

#### 3.6 展开行 ⭐⭐
```html
<ldesign-table :data="tableData" expandable>
  <template #expandedRowRender="{ row }">
    <div class="expanded-content">
      <p>详情信息：{{ row.details }}</p>
    </div>
  </template>
</ldesign-table>
```

**工作量**: 2天

#### 3.7 合并单元格 ⭐
```javascript
<ldesign-table 
  :data="tableData"
  :span-method="spanMethod"
>
</ldesign-table>

<script>
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return [2, 1]; // rowspan: 2, colspan: 1
    } else {
      return [0, 0]; // 不渲染
    }
  }
};
</script>
```

**工作量**: 2天

#### 3.8 汇总行 ⭐
```html
<ldesign-table 
  :data="tableData"
  show-summary
  :summary-method="getSummaries"
>
```

```javascript
const getSummaries = ({ columns, data }) => {
  return columns.map((column) => {
    if (column.property === 'amount') {
      const total = data.reduce((sum, row) => sum + row.amount, 0);
      return `总计: ${total}`;
    }
    return '';
  });
};
```

**工作量**: 2天

**总工作量**: 20-26天

---

### 4. Tree 树形控件 ⭐⭐

**当前状态**: ⚠️ 基础功能完整，缺少高级特性

**缺失功能清单**:

#### 4.1 拖拽排序 ⭐⭐⭐
```html
<ldesign-tree
  :data="treeData"
  draggable
  :allow-drop="allowDrop"
  :allow-drag="allowDrag"
  @node-drag-start="handleDragStart"
  @node-drag-end="handleDragEnd"
>
```

**必需特性**:
- ✅ 拖拽节点调整顺序
- ✅ 拖拽节点到其他父节点
- ✅ 拖拽放置位置提示（before/inner/after）
- ✅ 限制拖拽规则
- ✅ 拖拽动画

**工作量**: 3-4天

#### 4.2 虚拟滚动 ⭐⭐⭐
```html
<ldesign-tree
  :data="largeTreeData"
  virtual-scroll
  :item-height="32"
  :buffer-size="10"
>
```

**技术方案**: 
- 扁平化树结构
- 只渲染可见节点
- 保持展开/收起性能

**工作量**: 3-4天

#### 4.3 搜索高亮 ⭐⭐
```html
<ldesign-tree
  :data="treeData"
  filterable
  :filter-method="filterNode"
  filter-highlight
>
  <ldesign-input 
    v-model="filterText"
    placeholder="搜索节点"
  />
</ldesign-tree>
```

**必需特性**:
- ✅ 高亮匹配文本
- ✅ 展开匹配节点路径
- ✅ 模糊搜索
- ✅ 拼音搜索

**工作量**: 2-3天

#### 4.4 懒加载 ⭐⭐
```html
<ldesign-tree
  :data="treeData"
  lazy
  :load="loadNode"
>
```

```javascript
const loadNode = async (node) => {
  if (node.level === 0) {
    return rootNodes;
  }
  const children = await api.getChildren(node.data.id);
  return children;
};
```

**工作量**: 2天

#### 4.5 右键菜单 ⭐
```html
<ldesign-tree
  :data="treeData"
  @node-contextmenu="handleContextMenu"
>
```

```javascript
const handleContextMenu = (event, node) => {
  showContextMenu({
    x: event.clientX,
    y: event.clientY,
    items: [
      { label: '新增子节点', handler: () => addChild(node) },
      { label: '编辑', handler: () => editNode(node) },
      { label: '删除', handler: () => deleteNode(node) }
    ]
  });
};
```

**工作量**: 2天

**总工作量**: 12-15天

---

## 🟡 P1 - 其他组件增强

### 5. DatePicker 日期选择器 ⭐⭐

#### 5.1 快捷选项 ⭐⭐
```html
<ldesign-date-picker
  type="daterange"
  :shortcuts="[
    { text: '最近一周', value: () => [startOfWeek(), endOfWeek()] },
    { text: '最近一个月', value: () => [startOfMonth(), endOfMonth()] },
    { text: '最近三个月', value: () => [threeMonthsAgo(), today()] }
  ]"
/>
```

**工作量**: 2天

#### 5.2 周/月/季度/年选择器 ⭐⭐
```html
<ldesign-date-picker type="week" />
<ldesign-date-picker type="month" />
<ldesign-date-picker type="quarter" />
<ldesign-date-picker type="year" />
```

**工作量**: 3-4天

---

### 6. Input 输入框 ⭐

#### 6.1 字数统计 ⭐
```html
<ldesign-input
  v-model="text"
  show-count
  :maxlength="200"
/>
<!-- 显示: 50/200 -->
```

**工作量**: 1天

#### 6.2 输入格式化 ⭐
```html
<ldesign-input
  v-model="amount"
  :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
  :parser="value => value.replace(/\$\s?|(,*)/g, '')"
/>
<!-- 输入1000显示为$1,000 -->
```

**工作量**: 1-2天

---

### 7. Upload 上传 ⭐⭐

#### 7.1 图片裁剪 ⭐⭐
```html
<ldesign-upload
  crop-before-upload
  :crop-options="{
    aspectRatio: 1,
    minWidth: 200,
    minHeight: 200
  }"
/>
```

**工作量**: 3-4天（需要ImageCropper）

#### 7.2 大文件分片上传 ⭐⭐
```html
<ldesign-upload
  :chunk-size="5 * 1024 * 1024"
  :max-concurrent-uploads="3"
  resumable
/>
```

**工作量**: 4-5天

---

## 💡 实施优先级建议

### Sprint 1 (2周): Form核心增强
- 复杂验证规则
- 动态表单项
- 异步验证

### Sprint 2 (2周): Select & Table基础增强
- Select虚拟滚动
- Select远程搜索
- Table固定列
- Table行选择

### Sprint 3 (2周): Table高级功能
- 可编辑单元格
- 树形数据
- 展开行

### Sprint 4 (2周): Tree增强
- 拖拽排序
- 虚拟滚动
- 搜索高亮

### Sprint 5 (1周): 其他组件优化
- DatePicker快捷选项
- Input字数统计
- 其他小优化

---

## 📊 总工作量估算

| 组件 | 功能 | 工作量 | 优先级 |
|------|------|--------|--------|
| Form | 全部增强 | 10-12天 | P0 |
| Select | 全部增强 | 10-13天 | P0 |
| Table | 全部增强 | 20-26天 | P0 |
| Tree | 全部增强 | 12-15天 | P1 |
| DatePicker | 增强 | 5-6天 | P1 |
| Input | 增强 | 2-3天 | P1 |
| Upload | 增强 | 7-9天 | P1 |

**P0总计**: 40-51天  
**P1总计**: 26-33天  
**总计**: 66-84天（约3-4个月，1-2人）
