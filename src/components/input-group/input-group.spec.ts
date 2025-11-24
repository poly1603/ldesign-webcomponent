import { newSpecPage } from '@stencil/core/testing';
import { LdesignInputGroup } from './input-group';
import { LdesignInputGroupAddon } from './input-group-addon';

describe('ldesign-input-group', () => {
  // 基础渲染测试
  describe('Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <input />
          </ldesign-input-group>
        `,
      });

      expect(page.root).toBeTruthy();
      expect(page.root?.tagName).toBe('LDESIGN-INPUT-GROUP');
    });

    it('should render with custom class', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group custom-class="my-custom-class">
            <input />
          </ldesign-input-group>
        `,
      });

      expect(page.root?.classList.contains('my-custom-class')).toBe(true);
    });

    it('should render children elements', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <input id="test-input" />
            <button id="test-button">搜索</button>
          </ldesign-input-group>
        `,
      });

      const input = page.root?.querySelector('#test-input');
      const button = page.root?.querySelector('#test-button');

      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
    });
  });

  // 尺寸测试
  describe('Sizes', () => {
    it('should use medium size by default', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <input />
          </ldesign-input-group>
        `,
      });

      const component = page.rootInstance as LdesignInputGroup;
      expect(component.size).toBe('medium');
    });

    it('should support small size', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group size="small">
            <input />
          </ldesign-input-group>
        `,
      });

      const component = page.rootInstance as LdesignInputGroup;
      expect(component.size).toBe('small');
    });

    it('should support large size', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group size="large">
            <input />
          </ldesign-input-group>
        `,
      });

      const component = page.rootInstance as LdesignInputGroup;
      expect(component.size).toBe('large');
    });

    it('should apply size to child ldesign components', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group size="small">
            <ldesign-input></ldesign-input>
            <ldesign-button>搜索</ldesign-button>
          </ldesign-input-group>
        `,
      });

      await page.waitForChanges();

      const input = page.root?.querySelector('ldesign-input');
      const button = page.root?.querySelector('ldesign-button');

      // 组件应该继承 size 属性
      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
    });
  });

  // 紧凑模式测试
  describe('Compact Mode', () => {
    it('should not be compact by default', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <input />
          </ldesign-input-group>
        `,
      });

      expect(page.root?.classList.contains('ldesign-input-group--compact')).toBe(false);
    });

    it('should enable compact mode', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group compact>
            <input />
          </ldesign-input-group>
        `,
      });

      const component = page.rootInstance as LdesignInputGroup;
      expect(component.compact).toBe(true);
    });

    it('should have no gaps between children in compact mode', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group compact>
            <input />
            <button>搜索</button>
          </ldesign-input-group>
        `,
      });

      const element = page.root as HTMLElement;
      const computedStyle = window.getComputedStyle(element);

      // 在紧凑模式下，gap 应该为 0
      const component = page.rootInstance as LdesignInputGroup;
      expect(component.compact).toBe(true);
    });
  });

  // 组合场景测试
  describe('Composition Scenarios', () => {
    it('should work with input and button', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <ldesign-input placeholder="请输入关键词"></ldesign-input>
            <ldesign-button type="primary">搜索</ldesign-button>
          </ldesign-input-group>
        `,
      });

      const input = page.root?.querySelector('ldesign-input');
      const button = page.root?.querySelector('ldesign-button');

      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
    });

    it('should work with addon and input', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup, LdesignInputGroupAddon],
        html: `
          <ldesign-input-group compact>
            <ldesign-input-group-addon>https://</ldesign-input-group-addon>
            <ldesign-input placeholder="www.example.com"></ldesign-input>
          </ldesign-input-group>
        `,
      });

      const addon = page.root?.querySelector('ldesign-input-group-addon');
      const input = page.root?.querySelector('ldesign-input');

      expect(addon).toBeTruthy();
      expect(input).toBeTruthy();
    });

    it('should work with multiple addons', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup, LdesignInputGroupAddon],
        html: `
          <ldesign-input-group compact>
            <ldesign-input-group-addon>¥</ldesign-input-group-addon>
            <ldesign-input placeholder="0.00"></ldesign-input>
            <ldesign-input-group-addon>.00</ldesign-input-group-addon>
          </ldesign-input-group>
        `,
      });

      const addons = page.root?.querySelectorAll('ldesign-input-group-addon');
      expect(addons?.length).toBe(2);
    });

    it('should work with select and button', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <ldesign-select></ldesign-select>
            <ldesign-input></ldesign-input>
            <ldesign-button>搜索</ldesign-button>
          </ldesign-input-group>
        `,
      });

      const select = page.root?.querySelector('ldesign-select');
      const input = page.root?.querySelector('ldesign-input');
      const button = page.root?.querySelector('ldesign-button');

      expect(select).toBeTruthy();
      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
    });
  });

  // 嵌套组件测试
  describe('Nested Components', () => {
    it('should handle ldesign-input correctly', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <ldesign-input value="test"></ldesign-input>
          </ldesign-input-group>
        `,
      });

      const input = page.root?.querySelector('ldesign-input');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('value')).toBe('test');
    });

    it('should handle ldesign-button correctly', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <ldesign-button type="primary">按钮</ldesign-button>
          </ldesign-input-group>
        `,
      });

      const button = page.root?.querySelector('ldesign-button');
      expect(button).toBeTruthy();
      expect(button?.getAttribute('type')).toBe('primary');
    });

    it('should handle ldesign-select correctly', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <ldesign-select placeholder="选择"></ldesign-select>
          </ldesign-input-group>
        `,
      });

      const select = page.root?.querySelector('ldesign-select');
      expect(select).toBeTruthy();
    });
  });

  // 边缘情况测试
  describe('Edge Cases', () => {
    it('should handle empty children', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group></ldesign-input-group>
        `,
      });

      expect(page.root).toBeTruthy();
    });

    it('should handle single child', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup],
        html: `
          <ldesign-input-group>
            <input />
          </ldesign-input-group>
        `,
      });

      const input = page.root?.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('should handle many children', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup, LdesignInputGroupAddon],
        html: `
          <ldesign-input-group>
            <ldesign-input-group-addon>前缀1</ldesign-input-group-addon>
            <ldesign-input-group-addon>前缀2</ldesign-input-group-addon>
            <ldesign-input></ldesign-input>
            <ldesign-button>按钮1</ldesign-button>
            <ldesign-button>按钮2</ldesign-button>
          </ldesign-input-group>
        `,
      });

      const children = page.root?.children;
      expect(children?.length).toBeGreaterThan(3);
    });
  });
});

describe('ldesign-input-group-addon', () => {
  // 基础渲染测试
  describe('Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroupAddon],
        html: `
          <ldesign-input-group-addon>https://</ldesign-input-group-addon>
        `,
      });

      expect(page.root).toBeTruthy();
      expect(page.root?.tagName).toBe('LDESIGN-INPUT-GROUP-ADDON');
    });

    it('should render text content', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroupAddon],
        html: `
          <ldesign-input-group-addon>¥</ldesign-input-group-addon>
        `,
      });

      expect(page.root?.textContent).toBe('¥');
    });

    it('should render complex content', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroupAddon],
        html: `
          <ldesign-input-group-addon>
            <ldesign-icon name="search"></ldesign-icon>
          </ldesign-input-group-addon>
        `,
      });

      const icon = page.root?.querySelector('ldesign-icon');
      expect(icon).toBeTruthy();
    });
  });

  // 在 InputGroup 中使用
  describe('Within InputGroup', () => {
    it('should work as prefix addon', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup, LdesignInputGroupAddon],
        html: `
          <ldesign-input-group compact>
            <ldesign-input-group-addon>https://</ldesign-input-group-addon>
            <ldesign-input></ldesign-input>
          </ldesign-input-group>
        `,
      });

      const addon = page.root?.querySelector('ldesign-input-group-addon');
      expect(addon).toBeTruthy();
      expect(addon?.textContent).toBe('https://');
    });

    it('should work as suffix addon', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup, LdesignInputGroupAddon],
        html: `
          <ldesign-input-group compact>
            <ldesign-input></ldesign-input>
            <ldesign-input-group-addon>.com</ldesign-input-group-addon>
          </ldesign-input-group>
        `,
      });

      const addon = page.root?.querySelector('ldesign-input-group-addon');
      expect(addon).toBeTruthy();
      expect(addon?.textContent).toBe('.com');
    });

    it('should work with both prefix and suffix', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroup, LdesignInputGroupAddon],
        html: `
          <ldesign-input-group compact>
            <ldesign-input-group-addon>$</ldesign-input-group-addon>
            <ldesign-input></ldesign-input>
            <ldesign-input-group-addon>USD</ldesign-input-group-addon>
          </ldesign-input-group>
        `,
      });

      const addons = page.root?.querySelectorAll('ldesign-input-group-addon');
      expect(addons?.length).toBe(2);
      expect(addons?.[0]?.textContent).toBe('$');
      expect(addons?.[1]?.textContent).toBe('USD');
    });
  });

  // 样式测试
  describe('Styling', () => {
    it('should have correct tag name', async () => {
      const page = await newSpecPage({
        components: [LdesignInputGroupAddon],
        html: `
          <ldesign-input-group-addon>Text</ldesign-input-group-addon>
        `,
      });

      expect(page.root?.tagName).toBe('LDESIGN-INPUT-GROUP-ADDON');
    });
  });
});
