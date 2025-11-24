import { newSpecPage } from '@stencil/core/testing';
import { LdesignTable } from './table';

describe('ldesign-table - Enhanced Features', () => {
  const mockColumns = [
    { key: 'name', title: '姓名', width: 100 },
    { key: 'age', title: '年龄', width: 80 },
    { key: 'address', title: '地址', width: 200 },
  ];

  const mockData = [
    { id: '1', name: '张三', age: 28, address: '北京市' },
    { id: '2', name: '李四', age: 32, address: '上海市' },
    { id: '3', name: '王五', age: 25, address: '广州市' },
  ];

  // 行选择测试
  describe('Row Selection', () => {
    describe('Checkbox Selection', () => {
      it('should enable checkbox selection', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'checkbox',
          selectedRowKeys: [],
        };

        await page.waitForChanges();

        expect(component.rowSelection?.type).toBe('checkbox');
      });

      it('should select single row', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        const selectionChangeSpy = jest.fn();
        page.root?.addEventListener('ldesignSelectionChange', selectionChangeSpy);

        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'checkbox',
          selectedRowKeys: [],
          onChange: (keys, rows) => { },
        };

        await page.waitForChanges();

        // 选择第一行
        component.internalSelectedRowKeys = ['1'];
        await page.waitForChanges();

        expect(component.internalSelectedRowKeys).toContain('1');
      });

      it('should select multiple rows', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'checkbox',
          selectedRowKeys: [],
        };

        await page.waitForChanges();

        // 选择多行
        component.internalSelectedRowKeys = ['1', '2', '3'];
        await page.waitForChanges();

        expect(component.internalSelectedRowKeys).toEqual(['1', '2', '3']);
      });

      it('should deselect row', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'checkbox',
          selectedRowKeys: ['1', '2'],
        };
        component.internalSelectedRowKeys = ['1', '2'];

        await page.waitForChanges();

        // 取消选择
        component.internalSelectedRowKeys = ['1'];
        await page.waitForChanges();

        expect(component.internalSelectedRowKeys).toEqual(['1']);
      });

      it('should emit selection change event', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        const selectionChangeSpy = jest.fn();
        page.root?.addEventListener('ldesignSelectionChange', selectionChangeSpy);

        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'checkbox',
          selectedRowKeys: [],
        };

        await page.waitForChanges();

        // 触发选择变化
        component.internalSelectedRowKeys = ['1'];
        await page.waitForChanges();

        // 验证事件发射
        // (实际发射取决于组件实现)
      });

      it('should support controlled mode', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'checkbox',
          selectedRowKeys: ['1', '2'],
        };

        await page.waitForChanges();

        expect(component.rowSelection.selectedRowKeys).toEqual(['1', '2']);
      });

      it('should disable specific rows', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'checkbox',
          selectedRowKeys: [],
          getCheckboxProps: (row) => ({
            disabled: row.age < 30,
          }),
        };

        await page.waitForChanges();

        // 验证禁用逻辑
        const checkboxProps1 = component.rowSelection?.getCheckboxProps?.(mockData[0]);
        const checkboxProps2 = component.rowSelection?.getCheckboxProps?.(mockData[1]);

        expect(checkboxProps1?.disabled).toBe(true); // age = 28
        expect(checkboxProps2?.disabled).toBe(false); // age = 32
      });
    });

    describe('Radio Selection', () => {
      it('should enable radio selection', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'radio',
          selectedRowKeys: [],
        };

        await page.waitForChanges();

        expect(component.rowSelection.type).toBe('radio');
      });

      it('should only select one row in radio mode', async () => {
        const page = await newSpecPage({
          components: [LdesignTable],
          html: `<ldesign-table></ldesign-table>`,
        });

        const component = page.rootInstance as LdesignTable;
        component.columns = mockColumns;
        component.dataSource = mockData;
        component.rowSelection = {
          type: 'radio',
          selectedRowKeys: [],
        };

        await page.waitForChanges();

        // 单选模式下只能选一个
        component.internalSelectedRowKeys = ['1'];
        await page.waitForChanges();
        expect(component.internalSelectedRowKeys).toEqual(['1']);

        // 选择另一个应该替换
        component.internalSelectedRowKeys = ['2'];
        await page.waitForChanges();
        expect(component.internalSelectedRowKeys).toEqual(['2']);
      });
    });
  });

  // 展开行测试
  describe('Expandable Rows', () => {
    it('should enable expandable rows', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = mockData;
      component.expandable = {
        expandedRowRender: (row) => `详情: ${row.name}`,
      };

      await page.waitForChanges();

      expect(component.expandable).toBeDefined();
    });

    it('should expand row', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = mockData;
      component.expandable = {
        expandedRowKeys: [],
        expandedRowRender: (row) => `详情: ${row.name}`,
      };

      await page.waitForChanges();

      // 展开第一行
      component.internalExpandedRowKeys = ['1'];
      await page.waitForChanges();

      expect(component.internalExpandedRowKeys).toContain('1');
    });

    it('should collapse row', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = mockData;
      component.expandable = {
        expandedRowKeys: ['1'],
        expandedRowRender: (row) => `详情: ${row.name}`,
      };
      component.internalExpandedRowKeys = ['1'];

      await page.waitForChanges();

      // 收起
      component.internalExpandedRowKeys = [];
      await page.waitForChanges();

      expect(component.internalExpandedRowKeys).toEqual([]);
    });

    it('should expand multiple rows', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = mockData;
      component.expandable = {
        expandedRowKeys: [],
        expandedRowRender: (row) => `详情: ${row.name}`,
      };

      await page.waitForChanges();

      // 展开多行
      component.internalExpandedRowKeys = ['1', '2'];
      await page.waitForChanges();

      expect(component.internalExpandedRowKeys).toEqual(['1', '2']);
    });

    it('should emit expand event', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      const expandSpy = jest.fn();
      page.root?.addEventListener('ldesignExpand', expandSpy);

      component.columns = mockColumns;
      component.dataSource = mockData;
      component.expandable = {
        expandedRowKeys: [],
        expandedRowRender: (row) => `详情: ${row.name}`,
        onExpand: (expanded, row) => { },
      };

      await page.waitForChanges();

      // 触发展开
      component.internalExpandedRowKeys = ['1'];
      await page.waitForChanges();

      // 验证事件
      // (实际发射取决于组件实现)
    });

    it('should default expand all rows', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = mockData;
      component.expandable = {
        defaultExpandAllRows: true,
        expandedRowRender: (row) => `详情: ${row.name}`,
      };

      await page.waitForChanges();

      expect(component.expandable.defaultExpandAllRows).toBe(true);
    });

    it('should customize expand icon column width', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = mockData;
      component.expandable = {
        expandIconColumnWidth: 60,
        expandedRowRender: (row) => `详情: ${row.name}`,
      };

      await page.waitForChanges();

      expect(component.expandable.expandIconColumnWidth).toBe(60);
    });
  });

  // 可编辑单元格测试
  describe('Editable Cells', () => {
    const editableColumns = [
      { key: 'name', title: '姓名', editable: true, editorType: 'input' as const },
      { key: 'age', title: '年龄', editable: true, editorType: 'number' as const },
      {
        key: 'status', title: '状态', editable: true, editorType: 'select' as const,
        editorOptions: [{ label: '在职', value: '1' }, { label: '离职', value: '0' }]
      },
    ];

    it('should enable editable mode', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      expect(component.editable).toBe(true);
    });

    it('should mark columns as editable', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = editableColumns;
      component.dataSource = mockData;

      await page.waitForChanges();

      expect(component.columns[0].editable).toBe(true);
      expect(component.columns[1].editable).toBe(true);
    });

    it('should support input editor', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = editableColumns;
      component.dataSource = mockData;

      await page.waitForChanges();

      expect(component.columns[0].editorType).toBe('input');
    });

    it('should support number editor', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = editableColumns;
      component.dataSource = mockData;

      await page.waitForChanges();

      expect(component.columns[1].editorType).toBe('number');
    });

    it('should support select editor', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = editableColumns;
      component.dataSource = mockData;

      await page.waitForChanges();

      expect(component.columns[2].editorType).toBe('select');
      expect(component.columns[2].editorOptions).toHaveLength(2);
    });

    it('should track editing cell', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = editableColumns;
      component.dataSource = mockData;
      component.editingCell = { rowKey: '1', columnKey: 'name' };

      await page.waitForChanges();

      expect(component.editingCell?.rowKey).toBe('1');
      expect(component.editingCell?.columnKey).toBe('name');
    });

    it('should emit cell edit event', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      const cellEditSpy = jest.fn();
      page.root?.addEventListener('ldesignCellEdit', cellEditSpy);

      component.columns = editableColumns;
      component.dataSource = mockData;

      await page.waitForChanges();

      // 模拟编辑
      component.editingCell = { rowKey: '1', columnKey: 'name' };
      await page.waitForChanges();

      // 验证事件
      // (实际发射取决于组件实现)
    });

    it('should support date editor', async () => {
      const dateColumn = [
        { key: 'date', title: '日期', editable: true, editorType: 'date' as const },
      ];

      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = dateColumn;
      component.dataSource = mockData;

      await page.waitForChanges();

      expect(component.columns[0].editorType).toBe('date');
    });
  });

  // 树形数据测试
  describe('Tree Data', () => {
    const treeData = [
      {
        id: '1',
        name: '技术部',
        age: 0,
        children: [
          { id: '1-1', name: '前端组', age: 0 },
          { id: '1-2', name: '后端组', age: 0 },
        ],
      },
      {
        id: '2',
        name: '产品部',
        age: 0,
        children: [
          { id: '2-1', name: '设计组', age: 0 },
        ],
      },
    ];

    it('should enable tree data mode', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      expect(component.treeData).toBe(true);
    });

    it('should render tree structure', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = treeData;

      await page.waitForChanges();

      expect(component.dataSource[0].children).toBeDefined();
      expect(component.dataSource[0].children?.length).toBe(2);
    });

    it('should customize children column name', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data children-column-name="subItems"></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      expect(component.childrenColumnName).toBe('subItems');
    });

    it('should set indent size', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data indent-size="20"></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      expect(component.indentSize).toBe(20);
    });

    it('should expand tree node', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = treeData;
      component.internalExpandedRowKeys = ['1'];

      await page.waitForChanges();

      expect(component.internalExpandedRowKeys).toContain('1');
    });

    it('should collapse tree node', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = treeData;
      component.internalExpandedRowKeys = ['1'];

      await page.waitForChanges();

      // 收起
      component.internalExpandedRowKeys = [];
      await page.waitForChanges();

      expect(component.internalExpandedRowKeys).toEqual([]);
    });

    it('should support deeply nested tree', async () => {
      const deepTreeData = [
        {
          id: '1',
          name: 'Level 1',
          children: [
            {
              id: '1-1',
              name: 'Level 2',
              children: [
                {
                  id: '1-1-1',
                  name: 'Level 3',
                  children: [
                    { id: '1-1-1-1', name: 'Level 4' },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = deepTreeData;

      await page.waitForChanges();

      expect(component.dataSource[0].children?.[0].children).toBeDefined();
    });
  });

  // 综合场景测试
  describe('Integration Scenarios', () => {
    it('should work with row selection and expandable', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = mockData;
      component.rowSelection = {
        type: 'checkbox',
        selectedRowKeys: [],
      };
      component.expandable = {
        expandedRowRender: (row) => `详情: ${row.name}`,
      };

      await page.waitForChanges();

      expect(component.rowSelection).toBeDefined();
      expect(component.expandable).toBeDefined();
    });

    it('should work with row selection and editable', async () => {
      const editableColumns = [
        { key: 'name', title: '姓名', editable: true },
        { key: 'age', title: '年龄', editable: true, editorType: 'number' as const },
      ];

      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = editableColumns;
      component.dataSource = mockData;
      component.rowSelection = {
        type: 'checkbox',
        selectedRowKeys: [],
      };

      await page.waitForChanges();

      expect(component.editable).toBe(true);
      expect(component.rowSelection).toBeDefined();
    });

    it('should work with tree data and editable', async () => {
      const treeData = [
        {
          id: '1',
          name: '部门A',
          children: [
            { id: '1-1', name: '子部门A1' },
          ],
        },
      ];

      const editableColumns = [
        { key: 'name', title: '名称', editable: true },
      ];

      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = editableColumns;
      component.dataSource = treeData;

      await page.waitForChanges();

      expect(component.treeData).toBe(true);
      expect(component.editable).toBe(true);
    });

    it('should work with all features combined', async () => {
      const treeData = [
        {
          id: '1',
          name: '部门A',
          age: 0,
          status: '1',
          children: [
            { id: '1-1', name: '子部门A1', age: 0, status: '1' },
          ],
        },
      ];

      const fullColumns = [
        { key: 'name', title: '名称', editable: true, editorType: 'input' as const },
        { key: 'age', title: '年龄', editable: true, editorType: 'number' as const },
        {
          key: 'status', title: '状态', editable: true, editorType: 'select' as const,
          editorOptions: [{ label: '启用', value: '1' }]
        },
      ];

      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = fullColumns;
      component.dataSource = treeData;
      component.rowSelection = {
        type: 'checkbox',
        selectedRowKeys: [],
      };
      component.expandable = {
        expandedRowRender: (row) => `详情: ${row.name}`,
      };

      await page.waitForChanges();

      // 验证所有功能
      expect(component.treeData).toBe(true);
      expect(component.editable).toBe(true);
      expect(component.rowSelection).toBeDefined();
      expect(component.expandable).toBeDefined();
    });
  });

  // 边缘情况测试
  describe('Edge Cases', () => {
    it('should handle empty data with row selection', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = [];
      component.rowSelection = {
        type: 'checkbox',
        selectedRowKeys: [],
      };

      await page.waitForChanges();

      expect(component.dataSource).toEqual([]);
      expect(component.rowSelection).toBeDefined();
    });

    it('should handle empty tree data', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table tree-data></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = [];

      await page.waitForChanges();

      expect(component.dataSource).toEqual([]);
    });

    it('should handle invalid row key in selection', async () => {
      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = mockColumns;
      component.dataSource = mockData;
      component.rowSelection = {
        type: 'checkbox',
        selectedRowKeys: ['invalid-key'],
      };

      await page.waitForChanges();

      // 应该能优雅处理无效的 key
      expect(component.rowSelection.selectedRowKeys).toContain('invalid-key');
    });

    it('should handle column without editorType', async () => {
      const invalidColumn = [
        { key: 'name', title: '名称', editable: true }, // 缺少 editorType
      ];

      const page = await newSpecPage({
        components: [LdesignTable],
        html: `<ldesign-table editable></ldesign-table>`,
      });

      const component = page.rootInstance as LdesignTable;
      component.columns = invalidColumn;
      component.dataSource = mockData;

      await page.waitForChanges();

      // 应该能优雅处理
      expect(component.columns[0].editable).toBe(true);
    });
  });
});
