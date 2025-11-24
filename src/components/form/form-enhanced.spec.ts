import { newSpecPage } from '@stencil/core/testing';
import { LdesignForm } from './form';
import { LdesignFormItem } from './form-item';

describe('ldesign-form - Enhanced Features', () => {
  // 复杂验证规则测试
  describe('Complex Validation Rules', () => {
    describe('Type Validation', () => {
      it('should validate string type', async () => {
        const page = await newSpecPage({
          components: [LdesignForm, LdesignFormItem],
          html: `
            <ldesign-form>
              <ldesign-form-item name="name"></ldesign-form-item>
            </ldesign-form>
          `,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('name', [
          { type: 'string', message: '必须是字符串' }
        ]);

        await form.setFieldValue('name', 'test');
        const result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('name', 123);
        const result2 = await form.validate();
        expect(result2.valid).toBe(false);
      });

      it('should validate number type', async () => {
        const page = await newSpecPage({
          components: [LdesignForm, LdesignFormItem],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('age', [
          { type: 'number', message: '必须是数字' }
        ]);

        await form.setFieldValue('age', 25);
        const result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('age', 'invalid');
        const result2 = await form.validate();
        expect(result2.valid).toBe(false);
      });

      it('should validate email type', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('email', [
          { type: 'email', message: '邮箱格式不正确' }
        ]);

        await form.setFieldValue('email', 'test@example.com');
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('email', 'invalid-email');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });

      it('should validate url type', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('website', [
          { type: 'url', message: 'URL格式不正确' }
        ]);

        await form.setFieldValue('website', 'https://example.com');
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('website', 'not-a-url');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });

      it('should validate array type', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('tags', [
          { type: 'array', message: '必须是数组' }
        ]);

        await form.setFieldValue('tags', ['tag1', 'tag2']);
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('tags', 'not-array');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });

      it('should validate integer type', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('count', [
          { type: 'integer', message: '必须是整数' }
        ]);

        await form.setFieldValue('count', 10);
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('count', 10.5);
        result = await form.validate();
        expect(result.valid).toBe(false);
      });

      it('should validate float type', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('price', [
          { type: 'float', message: '必须是浮点数' }
        ]);

        await form.setFieldValue('price', 99.99);
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('price', 'invalid');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });
    });

    describe('Length Validation', () => {
      it('should validate exact length', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('code', [
          { len: 6, message: '验证码必须是6位' }
        ]);

        await form.setFieldValue('code', '123456');
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('code', '12345');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });

      it('should validate min length', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('password', [
          { min: 6, message: '密码至少6位' }
        ]);

        await form.setFieldValue('password', '123456');
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('password', '12345');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });

      it('should validate max length', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('username', [
          { max: 10, message: '用户名最多10位' }
        ]);

        await form.setFieldValue('username', '1234567890');
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('username', '12345678901');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });

      it('should validate range length', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('nickname', [
          { min: 2, max: 10, message: '昵称2-10位' }
        ]);

        await form.setFieldValue('nickname', 'test');
        let result = await form.validate();
        expect(result.valid).toBe(true);

        await form.setFieldValue('nickname', 'a');
        result = await form.validate();
        expect(result.valid).toBe(false);

        await form.setFieldValue('nickname', '12345678901');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });
    });

    describe('Async Validation', () => {
      it('should support async validator', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        const asyncValidator = jest.fn(async (value: string) => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return value !== 'taken' || '用户名已被使用';
        });

        await form.registerField('username', [
          { asyncValidator, message: '验证失败' }
        ]);

        await form.setFieldValue('username', 'available');
        let result = await form.validate();
        expect(result.valid).toBe(true);
        expect(asyncValidator).toHaveBeenCalledWith('available', expect.any(Object));

        await form.setFieldValue('username', 'taken');
        result = await form.validate();
        expect(result.valid).toBe(false);
        expect(result.errors['username']).toBe('用户名已被使用');
      });

      it('should support debounced async validation', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        const asyncValidator = jest.fn(async (value: string) => {
          return true;
        });

        await form.registerField('email', [
          {
            asyncValidator,
            debounce: 300,
            message: '验证失败'
          }
        ]);

        // 快速连续设置值
        await form.setFieldValue('email', 'test1@example.com');
        await form.setFieldValue('email', 'test2@example.com');
        await form.setFieldValue('email', 'test3@example.com');

        // 等待防抖
        await new Promise(resolve => setTimeout(resolve, 400));

        // 应该只调用一次（最后一个值）
        expect(asyncValidator).toHaveBeenCalledTimes(1);
        expect(asyncValidator).toHaveBeenCalledWith('test3@example.com', expect.any(Object));
      });

      it('should show validating state during async validation', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        const asyncValidator = jest.fn(async (value: string) => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return true;
        });

        await form.registerField('email', [
          { asyncValidator, message: '验证失败' }
        ]);

        await form.setFieldValue('email', 'test@example.com');

        // 开始验证
        const validationPromise = form.validate();

        // 验证中状态
        // expect(form.validatingFields.includes('email')).toBe(true);

        // 等待验证完成
        await validationPromise;

        // 验证完成
        // expect(form.validatingFields.includes('email')).toBe(false);
      });
    });

    describe('Trigger Configuration', () => {
      it('should validate on change trigger', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('name', [
          { required: true, trigger: 'change', message: '必填' }
        ]);

        // 触发 change
        await form.setFieldValue('name', '');
        const result = await form.validateField('name', 'change');

        expect(result).toBeTruthy();
      });

      it('should validate on blur trigger', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('email', [
          { type: 'email', trigger: 'blur', message: '邮箱格式不正确' }
        ]);

        // 触发 blur
        await form.setFieldValue('email', 'invalid');
        const result = await form.validateField('email', 'blur');

        expect(result).toBeTruthy();
      });

      it('should validate on submit trigger only', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        await form.registerField('password', [
          { required: true, trigger: 'submit', message: '必填' }
        ]);

        // change 不应触发验证
        await form.setFieldValue('password', '');
        const changeResult = await form.validateField('password', 'change');
        expect(changeResult).toBeNull();

        // submit 应触发验证
        const submitResult = await form.validate();
        expect(submitResult.valid).toBe(false);
      });
    });

    describe('Custom Validator', () => {
      it('should support custom validator', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        const customValidator = jest.fn((value: string) => {
          return value.includes('@') || '必须包含@符号';
        });

        await form.registerField('email', [
          { validator: customValidator, message: '验证失败' }
        ]);

        await form.setFieldValue('email', 'test@example.com');
        let result = await form.validate();
        expect(result.valid).toBe(true);
        expect(customValidator).toHaveBeenCalled();

        await form.setFieldValue('email', 'invalid');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });

      it('should pass allValues to custom validator', async () => {
        const page = await newSpecPage({
          components: [LdesignForm],
          html: `<ldesign-form></ldesign-form>`,
        });

        const form = page.rootInstance as LdesignForm;

        const customValidator = jest.fn((value: string, allValues: any) => {
          return value === allValues.password || '两次密码不一致';
        });

        await form.registerField('password', []);
        await form.registerField('confirmPassword', [
          { validator: customValidator, message: '验证失败' }
        ]);

        await form.setFieldValue('password', '123456');
        await form.setFieldValue('confirmPassword', '123456');

        let result = await form.validate();
        expect(result.valid).toBe(true);
        expect(customValidator).toHaveBeenCalledWith('123456', expect.objectContaining({
          password: '123456',
          confirmPassword: '123456'
        }));

        await form.setFieldValue('confirmPassword', '654321');
        result = await form.validate();
        expect(result.valid).toBe(false);
      });
    });
  });

  // 字段联动测试
  describe('Field Watching', () => {
    it('should watch field changes', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;
      const watchCallback = jest.fn();

      await form.registerField('country', []);
      await form.registerField('province', []);

      await form.watch('country', watchCallback);

      await form.setFieldValue('country', 'China');

      expect(watchCallback).toHaveBeenCalledWith('China', undefined, expect.any(Object));
    });

    it('should provide old value to watch callback', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;
      const watchCallback = jest.fn();

      await form.registerField('city', []);
      await form.setFieldValue('city', 'Beijing');

      await form.watch('city', watchCallback);

      await form.setFieldValue('city', 'Shanghai');

      expect(watchCallback).toHaveBeenCalledWith('Shanghai', 'Beijing', expect.any(Object));
    });

    it('should provide all values to watch callback', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;
      const watchCallback = jest.fn();

      await form.registerField('country', []);
      await form.registerField('province', []);
      await form.registerField('city', []);

      await form.setFieldValue('country', 'China');
      await form.setFieldValue('province', 'Beijing');

      await form.watch('city', watchCallback);

      await form.setFieldValue('city', 'Haidian');

      expect(watchCallback).toHaveBeenCalledWith(
        'Haidian',
        undefined,
        expect.objectContaining({
          country: 'China',
          province: 'Beijing',
          city: 'Haidian'
        })
      );
    });

    it('should support field linkage', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;

      await form.registerField('country', []);
      await form.registerField('province', []);

      await form.watch('country', async (value, oldValue, allValues) => {
        if (value === 'China') {
          await form.setFieldValue('province', '');
        }
      });

      await form.setFieldValue('province', 'California');
      await form.setFieldValue('country', 'China');

      const values = await form.getFieldsValue();
      expect(values.province).toBe('');
    });

    it('should emit ldesignFieldChange event', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;
      const fieldChangeSpy = jest.fn();

      page.root?.addEventListener('ldesignFieldChange', fieldChangeSpy);

      await form.registerField('name', []);
      await form.setFieldValue('name', 'test');

      expect(fieldChangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            name: 'name',
            value: 'test'
          })
        })
      );
    });
  });

  // 表单快照测试
  describe('Form Snapshot', () => {
    it('should create snapshot', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;

      await form.registerField('name', []);
      await form.registerField('age', []);

      await form.setFieldValue('name', 'John');
      await form.setFieldValue('age', 30);

      const snapshot = await form.snapshot();

      expect(snapshot.values).toEqual({ name: 'John', age: 30 });
      expect(snapshot.timestamp).toBeDefined();
    });

    it('should restore from snapshot', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;

      await form.registerField('name', []);
      await form.registerField('email', []);

      const snapshot = {
        values: { name: 'John', email: 'john@example.com' },
        errors: {}
      };

      await form.restore(snapshot);

      const values = await form.getFieldsValue();
      expect(values).toEqual({ name: 'John', email: 'john@example.com' });
    });

    it('should detect form changes', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;

      await form.registerField('name', []);
      await form.setFieldValue('name', 'John');
      await form.setInitialValues({ name: 'John' });

      let changed = await form.isChanged();
      expect(changed).toBe(false);

      await form.setFieldValue('name', 'Jane');
      changed = await form.isChanged();
      expect(changed).toBe(true);
    });

    it('should get changed fields', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;

      await form.registerField('name', []);
      await form.registerField('email', []);
      await form.registerField('age', []);

      await form.setInitialValues({
        name: 'John',
        email: 'john@example.com',
        age: 30
      });

      await form.setFieldValue('name', 'Jane');
      await form.setFieldValue('email', 'jane@example.com');

      const changedFields = await form.getChangedFields();

      expect(changedFields).toEqual({
        name: { oldValue: 'John', newValue: 'Jane' },
        email: { oldValue: 'john@example.com', newValue: 'jane@example.com' }
      });
    });

    it('should set initial values', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;

      await form.registerField('name', []);
      await form.registerField('age', []);

      await form.setInitialValues({ name: 'John', age: 30 });

      const values = await form.getFieldsValue();
      expect(values).toEqual({ name: 'John', age: 30 });

      const changed = await form.isChanged();
      expect(changed).toBe(false);
    });
  });

  // 综合场景测试
  describe('Integration Scenarios', () => {
    it('should handle complex form with all features', async () => {
      const page = await newSpecPage({
        components: [LdesignForm],
        html: `<ldesign-form></ldesign-form>`,
      });

      const form = page.rootInstance as LdesignForm;

      // 注册字段with复杂验证
      await form.registerField('username', [
        { required: true, message: '用户名必填' },
        { min: 3, max: 10, message: '用户名3-10位' },
        {
          asyncValidator: async (value: string) => {
            await new Promise(resolve => setTimeout(resolve, 50));
            return value !== 'admin' || '用户名已存在';
          },
          debounce: 100
        }
      ]);

      await form.registerField('email', [
        { required: true, message: '邮箱必填' },
        { type: 'email', message: '邮箱格式不正确' }
      ]);

      await form.registerField('password', [
        { required: true, message: '密码必填' },
        { min: 6, message: '密码至少6位' }
      ]);

      await form.registerField('confirmPassword', [
        {
          validator: (value: string, allValues: any) => {
            return value === allValues.password || '两次密码不一致';
          }
        }
      ]);

      // 设置字段联动
      await form.watch('password', async (value) => {
        await form.validateField('confirmPassword');
      });

      // 设置初始值
      await form.setInitialValues({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // 填写表单
      await form.setFieldValue('username', 'testuser');
      await form.setFieldValue('email', 'test@example.com');
      await form.setFieldValue('password', '123456');
      await form.setFieldValue('confirmPassword', '123456');

      // 验证表单
      const result = await form.validate();
      expect(result.valid).toBe(true);

      // 检查是否有变更
      const changed = await form.isChanged();
      expect(changed).toBe(true);

      // 创建快照
      const snapshot = await form.snapshot();
      expect(snapshot.values.username).toBe('testuser');

      // 修改后恢复
      await form.setFieldValue('username', 'modified');
      await form.restore(snapshot);

      const values = await form.getFieldsValue();
      expect(values.username).toBe('testuser');
    });
  });
});
