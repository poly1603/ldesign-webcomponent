import { newSpecPage } from '@stencil/core/testing';
import { LdesignFormList } from './form-list';

describe('ldesign-form-list', () => {
  // 基础渲染测试
  describe('Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="contacts"></ldesign-form-list>`,
      });

      expect(page.root).toBeTruthy();
      const component = page.rootInstance as LdesignFormList;
      expect(component.name).toBe('contacts');
    });

    it('should render with initial count', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;
      const fields = await component.getFields();

      expect(fields.length).toBe(3);
    });

    it('should render field items', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="users" initial-count="2"></ldesign-form-list>`,
      });

      await page.waitForChanges();

      const items = page.root?.querySelectorAll('.ldesign-form-list__item');
      expect(items?.length).toBe(2);
    });
  });

  // 添加字段测试
  describe('Add Field', () => {
    it('should add new field', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="contacts"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      await component.add();
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields.length).toBe(1);
    });

    it('should add field with default value', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="contacts"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      await component.add({ name: 'John', phone: '123456' });
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields[0]).toMatchObject({
        name: expect.any(Number),
        key: expect.any(Number)
      });
    });

    it('should add multiple fields', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      await component.add();
      await component.add();
      await component.add();
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields.length).toBe(3);
    });

    it('should respect max count', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" max-count="2"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      await component.add();
      await component.add();
      await component.add(); // 应该被忽略
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields.length).toBe(2);
    });

    it('should auto-increment field name', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      await component.add();
      await component.add();
      await component.add();

      const fields = await component.getFields();
      expect(fields[0].name).toBe(0);
      expect(fields[1].name).toBe(1);
      expect(fields[2].name).toBe(2);
    });
  });

  // 删除字段测试
  describe('Remove Field', () => {
    it('should remove field by index', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      await component.remove(1);
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields.length).toBe(2);
    });

    it('should reindex after removal', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      await component.remove(1);
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields[0].name).toBe(0);
      expect(fields[1].name).toBe(1);
    });

    it('should handle invalid index gracefully', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="2"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      await component.remove(-1);
      await component.remove(10);
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields.length).toBe(2); // 不应该有变化
    });

    it('should remove last field', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      await component.remove(2);
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields.length).toBe(2);
    });

    it('should remove all fields', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      await component.remove(0);
      await component.remove(0);
      await component.remove(0);
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields.length).toBe(0);
    });
  });

  // 移动字段测试
  describe('Move Field', () => {
    it('should move field forward', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      const fieldsBefore = await component.getFields();
      const key0 = fieldsBefore[0].key;
      const key1 = fieldsBefore[1].key;
      const key2 = fieldsBefore[2].key;

      await component.move(2, 0);
      await page.waitForChanges();

      const fieldsAfter = await component.getFields();
      expect(fieldsAfter[0].key).toBe(key2);
      expect(fieldsAfter[1].key).toBe(key0);
      expect(fieldsAfter[2].key).toBe(key1);
    });

    it('should move field backward', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      const fieldsBefore = await component.getFields();
      const key0 = fieldsBefore[0].key;
      const key1 = fieldsBefore[1].key;
      const key2 = fieldsBefore[2].key;

      await component.move(0, 2);
      await page.waitForChanges();

      const fieldsAfter = await component.getFields();
      expect(fieldsAfter[0].key).toBe(key1);
      expect(fieldsAfter[1].key).toBe(key2);
      expect(fieldsAfter[2].key).toBe(key0);
    });

    it('should reindex after move', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      await component.move(2, 0);
      await page.waitForChanges();

      const fields = await component.getFields();
      expect(fields[0].name).toBe(0);
      expect(fields[1].name).toBe(1);
      expect(fields[2].name).toBe(2);
    });

    it('should handle invalid move indices', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      const fieldsBefore = await component.getFields();
      const keysBefore = fieldsBefore.map(f => f.key);

      await component.move(-1, 0);
      await component.move(0, 10);
      await component.move(10, 0);
      await page.waitForChanges();

      const fieldsAfter = await component.getFields();
      const keysAfter = fieldsAfter.map(f => f.key);

      expect(keysAfter).toEqual(keysBefore); // 顺序不应改变
    });

    it('should handle move to same position', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      const fieldsBefore = await component.getFields();
      const keysBefore = fieldsBefore.map(f => f.key);

      await component.move(1, 1);
      await page.waitForChanges();

      const fieldsAfter = await component.getFields();
      const keysAfter = fieldsAfter.map(f => f.key);

      expect(keysAfter).toEqual(keysBefore);
    });
  });

  // 获取字段测试
  describe('Get Fields', () => {
    it('should return all fields', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="3"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      const fields = await component.getFields();
      expect(fields.length).toBe(3);
    });

    it('should return empty array when no fields', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      const fields = await component.getFields();
      expect(fields).toEqual([]);
    });

    it('should return fields with correct structure', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="1"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      const fields = await component.getFields();
      expect(fields[0]).toHaveProperty('key');
      expect(fields[0]).toHaveProperty('name');
      expect(typeof fields[0].key).toBe('number');
      expect(typeof fields[0].name).toBe('number');
    });
  });

  // 复杂场景测试
  describe('Complex Scenarios', () => {
    it('should handle add and remove operations', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      // 添加3个
      await component.add();
      await component.add();
      await component.add();

      let fields = await component.getFields();
      expect(fields.length).toBe(3);

      // 删除1个
      await component.remove(1);

      fields = await component.getFields();
      expect(fields.length).toBe(2);

      // 再添加2个
      await component.add();
      await component.add();

      fields = await component.getFields();
      expect(fields.length).toBe(4);
    });

    it('should handle move and remove operations', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="4"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      // 移动
      await component.move(3, 0);

      let fields = await component.getFields();
      expect(fields.length).toBe(4);

      // 删除
      await component.remove(0);

      fields = await component.getFields();
      expect(fields.length).toBe(3);
      expect(fields[0].name).toBe(0);
      expect(fields[1].name).toBe(1);
      expect(fields[2].name).toBe(2);
    });

    it('should maintain unique keys', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      await component.add();
      await component.add();
      await component.add();
      await component.remove(1);
      await component.add();

      const fields = await component.getFields();
      const keys = fields.map(f => f.key);
      const uniqueKeys = new Set(keys);

      expect(uniqueKeys.size).toBe(keys.length); // 所有 key 都唯一
    });
  });

  // Slot 测试
  describe('Slots', () => {
    it('should render item slots', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `
          <ldesign-form-list name="contacts" initial-count="2">
            <div slot="item-0" id="item-0">Item 0</div>
            <div slot="item-1" id="item-1">Item 1</div>
          </ldesign-form-list>
        `,
      });

      await page.waitForChanges();

      const item0 = page.root?.querySelector('#item-0');
      const item1 = page.root?.querySelector('#item-1');

      expect(item0).toBeTruthy();
      expect(item1).toBeTruthy();
    });

    it('should render add button slot', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `
          <ldesign-form-list name="items">
            <button slot="add-button" id="custom-add">添加</button>
          </ldesign-form-list>
        `,
      });

      const addButton = page.root?.querySelector('#custom-add');
      expect(addButton).toBeTruthy();
    });
  });

  // 边缘情况测试
  describe('Edge Cases', () => {
    it('should handle very large initial count', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" initial-count="100"></ldesign-form-list>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as LdesignFormList;

      const fields = await component.getFields();
      expect(fields.length).toBe(100);
    });

    it('should handle rapid add/remove operations', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      // 快速添加和删除
      for (let i = 0; i < 10; i++) {
        await component.add();
      }
      for (let i = 0; i < 5; i++) {
        await component.remove(0);
      }
      for (let i = 0; i < 3; i++) {
        await component.add();
      }

      const fields = await component.getFields();
      expect(fields.length).toBe(8); // 10 - 5 + 3
    });

    it('should handle add when at max count', async () => {
      const page = await newSpecPage({
        components: [LdesignFormList],
        html: `<ldesign-form-list name="items" max-count="1"></ldesign-form-list>`,
      });

      const component = page.rootInstance as LdesignFormList;

      await component.add();
      await component.add();
      await component.add();

      const fields = await component.getFields();
      expect(fields.length).toBe(1);
    });
  });
});
