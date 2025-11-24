import { newSpecPage } from '@stencil/core/testing';
import { LdesignAutoComplete } from './auto-complete';

describe('ldesign-auto-complete', () => {
  // 基础渲染测试
  describe('Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      expect(page.root).toBeTruthy();
      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.placeholder).toBe('请输入');
    });

    it('should render with custom placeholder', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete placeholder="搜索用户"></ldesign-auto-complete>`,
      });

      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input?.placeholder).toBe('搜索用户');
    });

    it('should render with disabled state', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete disabled></ldesign-auto-complete>`,
      });

      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input?.disabled).toBe(true);
      expect(page.root?.classList.contains('auto-complete--disabled')).toBe(true);
    });

    it('should render with different sizes', async () => {
      const sizes = ['small', 'medium', 'large'] as const;

      for (const size of sizes) {
        const page = await newSpecPage({
          components: [LdesignAutoComplete],
          html: `<ldesign-auto-complete size="${size}"></ldesign-auto-complete>`,
        });

        expect(page.root?.classList.contains(`auto-complete--${size}`)).toBe(true);
      }
    });

    it('should render clear button when clearable and has value', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete clearable value="test"></ldesign-auto-complete>`,
      });

      await page.waitForChanges();
      const clearBtn = page.root?.shadowRoot?.querySelector('.auto-complete__clear');
      expect(clearBtn).toBeTruthy();
    });
  });

  // 选项过滤测试
  describe('Options Filtering', () => {
    const testOptions = [
      { value: '1', label: 'Apple' },
      { value: '2', label: 'Banana' },
      { value: '3', label: 'Cherry' },
      { value: '4', label: 'Date' },
    ];

    it('should filter options based on input', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      page.root!.options = testOptions;
      await page.waitForChanges();

      // 模拟输入
      const input = page.root?.shadowRoot?.querySelector('input');
      input!.value = 'ap';
      input?.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      const dropdown = page.root?.shadowRoot?.querySelector('.auto-complete__dropdown');
      expect(dropdown).toBeTruthy();
    });

    it('should show all options when input is empty', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      page.root!.options = testOptions;
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      const options = page.root?.shadowRoot?.querySelectorAll('.auto-complete__option');
      expect(options?.length).toBe(4);
    });

    it('should respect maxOptions limit', async () => {
      const manyOptions = Array.from({ length: 100 }, (_, i) => ({
        value: String(i),
        label: `Option ${i}`,
      }));

      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete max-options="10"></ldesign-auto-complete>`,
      });

      page.root!.options = manyOptions;
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      const options = page.root?.shadowRoot?.querySelectorAll('.auto-complete__option');
      expect(options?.length).toBeLessThanOrEqual(10);
    });
  });

  // 事件测试
  describe('Events', () => {
    it('should emit ldesignInput event on input', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      const inputSpy = jest.fn();
      page.root?.addEventListener('ldesignInput', inputSpy);

      const input = page.root?.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));

      expect(inputSpy).toHaveBeenCalled();
      expect(inputSpy.mock.calls[0][0].detail).toBe('test');
    });

    it('should emit ldesignSelect event on option select', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      const testOptions = [
        { value: '1', label: 'Apple' },
        { value: '2', label: 'Banana' },
      ];
      page.root!.options = testOptions;

      const selectSpy = jest.fn();
      page.root?.addEventListener('ldesignSelect', selectSpy);

      await page.waitForChanges();

      // 打开下拉
      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      // 点击选项
      const firstOption = page.root?.shadowRoot?.querySelector('.auto-complete__option');
      (firstOption as HTMLElement)?.click();

      expect(selectSpy).toHaveBeenCalled();
      expect(selectSpy.mock.calls[0][0].detail).toEqual(testOptions[0]);
    });

    it('should emit ldesignClear event on clear', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete clearable value="test"></ldesign-auto-complete>`,
      });

      const clearSpy = jest.fn();
      page.root?.addEventListener('ldesignClear', clearSpy);

      await page.waitForChanges();

      const clearBtn = page.root?.shadowRoot?.querySelector('.auto-complete__clear') as HTMLElement;
      clearBtn?.click();

      expect(clearSpy).toHaveBeenCalled();
    });

    it('should emit ldesignFocus and ldesignBlur events', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      const focusSpy = jest.fn();
      const blurSpy = jest.fn();
      page.root?.addEventListener('ldesignFocus', focusSpy);
      page.root?.addEventListener('ldesignBlur', blurSpy);

      const input = page.root?.shadowRoot?.querySelector('input');

      input?.dispatchEvent(new Event('focus'));
      expect(focusSpy).toHaveBeenCalled();

      input?.dispatchEvent(new Event('blur'));
      expect(blurSpy).toHaveBeenCalled();
    });
  });

  // 键盘导航测试
  describe('Keyboard Navigation', () => {
    const testOptions = [
      { value: '1', label: 'Apple' },
      { value: '2', label: 'Banana' },
      { value: '3', label: 'Cherry' },
    ];

    it('should navigate down with ArrowDown key', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      page.root!.options = testOptions;
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      // 按下 ArrowDown
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      const activeOption = page.root?.shadowRoot?.querySelector('.auto-complete__option--active');
      expect(activeOption).toBeTruthy();
    });

    it('should navigate up with ArrowUp key', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      page.root!.options = testOptions;
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      // 先按下 ArrowDown 两次
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      // 然后按 ArrowUp
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await page.waitForChanges();

      const activeOption = page.root?.shadowRoot?.querySelector('.auto-complete__option--active');
      expect(activeOption).toBeTruthy();
    });

    it('should select option with Enter key', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      page.root!.options = testOptions;
      await page.waitForChanges();

      const selectSpy = jest.fn();
      page.root?.addEventListener('ldesignSelect', selectSpy);

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      // 按下 ArrowDown 选中第一个
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      // 按 Enter 确认
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(selectSpy).toHaveBeenCalled();
    });

    it('should close dropdown with Escape key', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      page.root!.options = testOptions;
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      let dropdown = page.root?.shadowRoot?.querySelector('.auto-complete__dropdown');
      expect(dropdown).toBeTruthy();

      // 按 Escape
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await page.waitForChanges();

      dropdown = page.root?.shadowRoot?.querySelector('.auto-complete__dropdown');
      expect(dropdown).toBeFalsy();
    });
  });

  // 禁用选项测试
  describe('Disabled Options', () => {
    it('should not select disabled option', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      const testOptions = [
        { value: '1', label: 'Apple', disabled: false },
        { value: '2', label: 'Banana', disabled: true },
      ];
      page.root!.options = testOptions;

      const selectSpy = jest.fn();
      page.root?.addEventListener('ldesignSelect', selectSpy);

      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      // 尝试点击禁用的选项
      const options = page.root?.shadowRoot?.querySelectorAll('.auto-complete__option');
      (options?.[1] as HTMLElement)?.click();

      expect(selectSpy).not.toHaveBeenCalled();
    });

    it('should skip disabled options in keyboard navigation', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      const testOptions = [
        { value: '1', label: 'Apple', disabled: false },
        { value: '2', label: 'Banana', disabled: true },
        { value: '3', label: 'Cherry', disabled: false },
      ];
      page.root!.options = testOptions;
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      // 按 ArrowDown 两次，应该跳过禁用项
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();
      input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      // 当前高亮应该是第三个（Cherry）
      const activeOption = page.root?.shadowRoot?.querySelector('.auto-complete__option--active');
      expect(activeOption?.textContent?.trim()).toBe('Cherry');
    });
  });

  // 加载状态测试
  describe('Loading State', () => {
    it('should show loading indicator', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete loading></ldesign-auto-complete>`,
      });

      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      const loadingIndicator = page.root?.shadowRoot?.querySelector('.auto-complete__loading');
      expect(loadingIndicator).toBeTruthy();
    });
  });

  // 空状态测试
  describe('Empty State', () => {
    it('should show empty message when no options', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      page.root!.options = [];
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      input?.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      const emptyMessage = page.root?.shadowRoot?.querySelector('.auto-complete__empty');
      expect(emptyMessage).toBeTruthy();
    });

    it('should show empty message when filter returns no results', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      page.root!.options = [
        { value: '1', label: 'Apple' },
        { value: '2', label: 'Banana' },
      ];
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'xyz';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      const emptyMessage = page.root?.shadowRoot?.querySelector('.auto-complete__empty');
      expect(emptyMessage).toBeTruthy();
    });
  });

  // 方法测试
  describe('Methods', () => {
    it('should focus input when focus() method is called', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      const component = page.rootInstance as LdesignAutoComplete;
      await component.focus();
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      expect(document.activeElement).toBe(input);
    });

    it('should blur input when blur() method is called', async () => {
      const page = await newSpecPage({
        components: [LdesignAutoComplete],
        html: `<ldesign-auto-complete></ldesign-auto-complete>`,
      });

      const component = page.rootInstance as LdesignAutoComplete;
      await component.focus();
      await page.waitForChanges();

      await component.blur();
      await page.waitForChanges();

      const input = page.root?.shadowRoot?.querySelector('input');
      expect(document.activeElement).not.toBe(input);
    });
  });
});
