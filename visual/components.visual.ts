import { test, expect } from '@playwright/test';

/**
 * 视觉回归测试套件
 * 使用 Playwright 的截图对比功能
 */
test.describe('Visual Regression Tests', () => {
  test.describe('Button Visual', () => {
    test('should match button snapshots', async ({ page }) => {
      await page.goto('/components/button');

      const button = page.locator('ldesign-button').first();
      await expect(button).toHaveScreenshot('button-default.png');
    });

    test('should match button states', async ({ page }) => {
      await page.goto('/components/button?demo=states');

      // 默认状态
      const defaultBtn = page.locator('ldesign-button').first();
      await expect(defaultBtn).toHaveScreenshot('button-default-state.png');

      // Hover 状态
      await defaultBtn.hover();
      await expect(defaultBtn).toHaveScreenshot('button-hover-state.png');

      // Focus 状态
      await defaultBtn.focus();
      await expect(defaultBtn).toHaveScreenshot('button-focus-state.png');

      // Disabled 状态
      const disabledBtn = page.locator('ldesign-button[disabled]').first();
      await expect(disabledBtn).toHaveScreenshot('button-disabled-state.png');
    });

    test('should match button types', async ({ page }) => {
      await page.goto('/components/button?demo=types');

      const container = page.locator('.demo-container').first();
      await expect(container).toHaveScreenshot('button-types.png');
    });
  });

  test.describe('AutoComplete Visual', () => {
    test('should match autocomplete default state', async ({ page }) => {
      await page.goto('/components/auto-complete');

      const autoComplete = page.locator('ldesign-auto-complete').first();
      await expect(autoComplete).toHaveScreenshot('autocomplete-closed.png');
    });

    test('should match autocomplete dropdown', async ({ page }) => {
      await page.goto('/components/auto-complete');

      const input = page.locator('ldesign-auto-complete input').first();
      await input.click();

      await page.waitForTimeout(300);

      const dropdown = page.locator('.auto-complete__dropdown').first();
      await expect(dropdown).toHaveScreenshot('autocomplete-dropdown.png');
    });

    test('should match autocomplete loading state', async ({ page }) => {
      await page.goto('/components/auto-complete?demo=loading');

      const autoComplete = page.locator('ldesign-auto-complete').first();
      await autoComplete.locator('input').fill('search');

      await page.waitForTimeout(100);

      await expect(autoComplete).toHaveScreenshot('autocomplete-loading.png');
    });
  });

  test.describe('Select Visual', () => {
    test('should match select default state', async ({ page }) => {
      await page.goto('/components/select');

      const select = page.locator('ldesign-select').first();
      await expect(select).toHaveScreenshot('select-closed.png');
    });

    test('should match select dropdown', async ({ page }) => {
      await page.goto('/components/select');

      const select = page.locator('ldesign-select').first();
      await select.click();

      await page.waitForTimeout(300);

      const dropdown = page.locator('.select__dropdown').first();
      await expect(dropdown).toHaveScreenshot('select-dropdown.png');
    });

    test('should match multiple select with tags', async ({ page }) => {
      await page.goto('/components/select?demo=multiple');

      const select = page.locator('ldesign-select[multiple]').first();
      await select.click();

      // 选择几个选项
      await page.locator('.select__option').nth(0).click();
      await page.locator('.select__option').nth(1).click();
      await page.locator('.select__option').nth(2).click();

      await select.click(); // 关闭下拉

      await expect(select).toHaveScreenshot('select-multiple-tags.png');
    });
  });

  test.describe('Form Visual', () => {
    test('should match form layout', async ({ page }) => {
      await page.goto('/components/form');

      const form = page.locator('ldesign-form').first();
      await expect(form).toHaveScreenshot('form-default.png');
    });

    test('should match form validation errors', async ({ page }) => {
      await page.goto('/components/form');

      const submitBtn = page.locator('button[type="submit"]').first();
      await submitBtn.click();

      await page.waitForTimeout(300);

      const form = page.locator('ldesign-form').first();
      await expect(form).toHaveScreenshot('form-validation-errors.png');
    });

    test('should match form layouts', async ({ page }) => {
      await page.goto('/components/form?demo=layouts');

      const container = page.locator('.demo-container').first();
      await expect(container).toHaveScreenshot('form-layouts.png');
    });
  });

  test.describe('Table Visual', () => {
    test('should match table default', async ({ page }) => {
      await page.goto('/components/table');

      const table = page.locator('ldesign-table').first();
      await expect(table).toHaveScreenshot('table-default.png');
    });

    test('should match table with row selection', async ({ page }) => {
      await page.goto('/components/table?demo=row-selection');

      // 选择几行
      await page.locator('.table__checkbox').nth(0).click();
      await page.locator('.table__checkbox').nth(2).click();

      const table = page.locator('ldesign-table').first();
      await expect(table).toHaveScreenshot('table-row-selection.png');
    });

    test('should match table with expanded rows', async ({ page }) => {
      await page.goto('/components/table?demo=expandable');

      // 展开第一行
      await page.locator('.table__expand-icon').first().click();

      await page.waitForTimeout(300);

      const table = page.locator('ldesign-table').first();
      await expect(table).toHaveScreenshot('table-expanded-row.png');
    });

    test('should match table with tree data', async ({ page }) => {
      await page.goto('/components/table?demo=tree-data');

      // 展开节点
      await page.locator('.table__tree-expand-icon').first().click();

      await page.waitForTimeout(300);

      const table = page.locator('ldesign-table').first();
      await expect(table).toHaveScreenshot('table-tree-data.png');
    });
  });

  test.describe('Popover Visual', () => {
    test('should match popover closed', async ({ page }) => {
      await page.goto('/components/popover');

      const trigger = page.locator('[slot="trigger"]').first();
      await expect(trigger).toHaveScreenshot('popover-trigger.png');
    });

    test('should match popover opened', async ({ page }) => {
      await page.goto('/components/popover');

      const trigger = page.locator('[slot="trigger"]').first();
      await trigger.click();

      await page.waitForTimeout(300);

      const popover = page.locator('.popover__content').first();
      await expect(popover).toHaveScreenshot('popover-content.png');
    });

    test('should match popover placements', async ({ page }) => {
      await page.goto('/components/popover?demo=placements');

      const container = page.locator('.demo-container').first();
      await expect(container).toHaveScreenshot('popover-placements.png');
    });
  });

  test.describe('InputGroup Visual', () => {
    test('should match input group default', async ({ page }) => {
      await page.goto('/components/input-group');

      const inputGroup = page.locator('ldesign-input-group').first();
      await expect(inputGroup).toHaveScreenshot('input-group-default.png');
    });

    test('should match input group compact', async ({ page }) => {
      await page.goto('/components/input-group?demo=compact');

      const inputGroup = page.locator('ldesign-input-group[compact]').first();
      await expect(inputGroup).toHaveScreenshot('input-group-compact.png');
    });

    test('should match input group with addons', async ({ page }) => {
      await page.goto('/components/input-group?demo=addons');

      const container = page.locator('.demo-container').first();
      await expect(container).toHaveScreenshot('input-group-addons.png');
    });
  });

  test.describe('TreeSelect Visual', () => {
    test('should match tree select closed', async ({ page }) => {
      await page.goto('/components/tree-select');

      const treeSelect = page.locator('ldesign-tree-select').first();
      await expect(treeSelect).toHaveScreenshot('tree-select-closed.png');
    });

    test('should match tree select dropdown', async ({ page }) => {
      await page.goto('/components/tree-select');

      const treeSelect = page.locator('ldesign-tree-select').first();
      await treeSelect.click();

      await page.waitForTimeout(300);

      const dropdown = page.locator('.tree-select__dropdown').first();
      await expect(dropdown).toHaveScreenshot('tree-select-dropdown.png');
    });

    test('should match tree select with expanded nodes', async ({ page }) => {
      await page.goto('/components/tree-select');

      const treeSelect = page.locator('ldesign-tree-select').first();
      await treeSelect.click();

      await page.waitForTimeout(300);

      // 展开节点
      await page.locator('.tree-node__expand-icon').first().click();

      await page.waitForTimeout(200);

      const dropdown = page.locator('.tree-select__dropdown').first();
      await expect(dropdown).toHaveScreenshot('tree-select-expanded.png');
    });
  });

  test.describe('Responsive Design', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      test(`should match components on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/components');

        const container = page.locator('.components-overview');
        await expect(container).toHaveScreenshot(`components-${viewport.name}.png`);
      });
    }
  });

  test.describe('Dark Mode', () => {
    test('should match dark mode', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/components');

      const container = page.locator('.components-overview');
      await expect(container).toHaveScreenshot('components-dark-mode.png');
    });
  });
});
