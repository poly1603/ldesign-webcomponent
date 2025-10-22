import { useState, useEffect } from 'react';
import { Button, Table, Card, Form } from '@ldesign/webcomponent-react';
import type { TableProps } from '@ldesign/webcomponent-react';

function App() {
  const [dataSource, setDataSource] = useState<any[]>([]);

  const columns = [
    { key: 'id', title: 'ID', width: 60, sortable: true },
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 80, sortable: true },
    { key: 'email', title: '邮箱' }
  ];

  // 生成测试数据
  useEffect(() => {
    const data = Array.from({ length: 5000 }, (_, i) => ({
      id: i + 1,
      name: `用户 ${i + 1}`,
      age: 20 + (i % 40),
      email: `user${i + 1}@example.com`
    }));
    setDataSource(data);
  }, []);

  const handleButtonClick = () => {
    alert('按钮被点击！');
  };

  const handleSort = (sort: { key: string; order: 'asc' | 'desc' }) => {
    console.log('排序:', sort);
  };

  const handleFormSubmit = (values: Record<string, any>) => {
    console.log('表单提交:', values);
    alert('提交成功！');
  };

  return (
    <div className="app" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--ld-color-primary)' }}>
        LDesign WebComponent - React 示例
      </h1>

      {/* 按钮示例 */}
      <Card title="按钮示例">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button type="primary" onClick={handleButtonClick}>
            Primary
          </Button>
          <Button type="success">Success</Button>
          <Button type="warning">Warning</Button>
          <Button type="danger">Danger</Button>
          <Button type="primary" loading={true}>Loading</Button>
        </div>
      </Card>

      {/* 表格示例 */}
      <Card title="数据表格（虚拟滚动 5000 行）" style={{ marginTop: '24px' }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered={true}
          striped={true}
          virtual={true}
          height={400}
          rowHeight={48}
          onSort={handleSort}
        />
      </Card>

      {/* 表单示例 */}
      <Card title="表单示例" style={{ marginTop: '24px' }}>
        <Form
          layout="horizontal"
          labelWidth={100}
          onSubmit={handleFormSubmit}
        >
          <ldesign-form-item label="用户名" name="username" required>
            <ldesign-input placeholder="请输入用户名" />
          </ldesign-form-item>

          <ldesign-form-item label="邮箱" name="email" required>
            <ldesign-input type="email" placeholder="请输入邮箱" />
          </ldesign-form-item>

          <ldesign-form-item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </ldesign-form-item>
        </Form>
      </Card>
    </div>
  );
}

export default App;




