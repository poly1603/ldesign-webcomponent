import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * 可访问性测试套件
 * 使用 axe-core 检查 WCAG 2.1 AA 标准合规性
 */
test.describe('Accessibility Tests', () => {
  test.describe('AutoComplete A11y', () => {
    test('should not have accessibility violations', async ({ page }) => {
      await page.goto('/components/auto-complete');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have correct ARIA attributes', async ({ page }) => {
      await page.goto('/components/auto-complete');

      const input = page.locator('ldesign-auto-complete input').first();

      await expect(input).toHaveAttribute('role', 'combobox');
      await expect(input).toHaveAttribute('aria-autocomplete', 'list');
      await expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    });

    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/components/auto-complete');

      const input = page.locator('ldesign-auto-complete input').first();

      // Tab 聚焦
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();

      // 打开下拉
      await page.keyboard.press('ArrowDown');
      const dropdown = page.locator('.auto-complete__dropdown');
      await expect(dropdown).toBeVisible();

      // 导航选项
      await page.keyboard.press('ArrowDown');
      const activeOption = page.locator('.auto-complete__option--active');
      await expect(activeOption).toBeVisible();

      // 选择
      await page.keyboard.press('Enter');
      await expect(dropdown).not.toBeVisible();
    });

    test('should announce changes to screen readers', async ({ page }) => {
      await page.goto('/components/auto-complete');

      const input = page.locator('ldesign-auto-complete input').first();
      await input.click();

      // 检查 aria-live 区域
      const liveRegion = page.locator('[aria-live="polite"]');
      await expect(liveRegion).toBeAttached();
    });
  });

  test.describe('Form A11y', () => {
    test('should not have accessibility violations', async ({ page }) => {
      await page.goto('/components/form');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have proper form labels', async ({ page }) => {
      await page.goto('/components/form');

      const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"]');
      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');

        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          await expect(label).toBeAttached();
        }
      }
    });

    test('should indicate required fields', async ({ page }) => {
      await page.goto('/components/form');

      const requiredInputs = page.locator('input[required]');
      const count = await requiredInputs.count();

      for (let i = 0; i < count; i++) {
        const input = requiredInputs.nth(i);
        await expect(input).toHaveAttribute('aria-required', 'true');
      }
    });

    test('should associate error messages with fields', async ({ page }) => {
      await page.goto('/components/form');

      const submitBtn = page.locator('button[type="submit"]').first();
      await submitBtn.click();

      await page.waitForTimeout(300);

      const errorInputs = page.locator('input[aria-invalid="true"]');
      const count = await errorInputs.count();

      for (let i = 0; i < count; i++) {
        const input = errorInputs.nth(i);
        const errorId = await input.getAttribute('aria-describedby');

        if (errorId) {
          const errorMsg = page.locator(`#${errorId}`);
          await expect(errorMsg).toBeVisible();
        }
      }
    });
  });

  test.describe('Select A11y', () => {
    test('should not have accessibility violations', async ({ page }) => {
      await page.goto('/components/select');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have correct ARIA attributes', async ({ page }) => {
      await page.goto('/components/select');

      const select = page.locator('ldesign-select').first();

      await expect(select).toHaveAttribute('role', 'combobox');
      await expect(select).toHaveAttribute('aria-haspopup', 'listbox');
    });

    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/components/select');

      const select = page.locator('ldesign-select').first();

      // Tab 聚焦
      await page.keyboard.press('Tab');
      await expect(select).toBeFocused();

      // 打开
      await page.keyboard.press('Enter');
      const dropdown = page.locator('.select__dropdown');
      await expect(dropdown).toBeVisible();

      // 导航
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      // 选择
      await page.keyboard.press('Enter');
      await expect(dropdown).not.toBeVisible();
    });
  });

  test.describe('Table A11y', () => {
    test('should not have accessibility violations', async ({ page }) => {
      await page.goto('/components/table');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have proper table semantics', async ({ page }) => {
      await page.goto('/components/table');

      const table = page.locator('ldesign-table').first();
      await expect(table).toHaveAttribute('role', 'table');

      const headers = page.locator('[role="columnheader"]');
      const headerCount = await headers.count();
      expect(headerCount).toBeGreaterThan(0);

      const cells = page.locator('[role="cell"]');
      const cellCount = await cells.count();
      expect(cellCount).toBeGreaterThan(0);
    });

    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/components/table?demo=row-selection');

      // Tab 到第一个复选框
      await page.keyboard.press('Tab');

      const firstCheckbox = page.locator('.table__checkbox').first();
      await expect(firstCheckbox).toBeFocused();

      // 空格选择
      await page.keyboard.press('Space');

      const selectedRow = page.locator('.table__row--selected');
      await expect(selectedRow).toHaveCount(1);
    });
  });

  test.describe('Color Contrast', () => {
    test('should have sufficient color contrast', async ({ page }) => {
      await page.goto('/components/button');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .include('.ldesign-button')
        .analyze();

      const contrastViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'color-contrast'
      );

      expect(contrastViolations).toEqual([]);
    });
  });

  test.describe('Focus Management', () => {
    test('should have visible focus indicators', async ({ page }) => {
      await page.goto('/components/button');

      const button = page.locator('ldesign-button').first();
      await button.focus();

      // 检查是否有 focus 样式
      const outline = await button.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.outline || style.boxShadow;
      });

      expect(outline).not.toBe('');
      expect(outline).not.toBe('none');
    });

    test('should trap focus in modal dialogs', async ({ page }) => {
      await page.goto('/components/modal');

      const openBtn = page.locator('button[data-action="open-modal"]');
      await openBtn.click();

      const modal = page.locator('.modal');
      await expect(modal).toBeVisible();

      // Tab 循环测试
      await page.keyboard.press('Tab');
      const firstFocusable = await page.evaluate(() => document.activeElement?.tagName);

      // 按多次 Tab
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
      }

      // 焦点应该仍在 modal 内
      const focusedElement = await page.evaluate(() => {
        const active = document.activeElement;
        return active?.closest('.modal') !== null;
      });

      expect(focusedElement).toBe(true);
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should have descriptive button labels', async ({ page }) => {
      await page.goto('/components/button');

      const buttons = page.locator('ldesign-button');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');

        // 按钮应该有文本或 aria-label
        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('should announce dynamic content changes', async ({ page }) => {
      await page.goto('/components/alert');

      const showAlertBtn = page.locator('button[data-action="show-alert"]');
      await showAlertBtn.click();

      const liveRegion = page.locator('[role="alert"]');
      await expect(liveRegion).toBeVisible();
      await expect(liveRegion).toHaveAttribute('aria-live', 'assertive');
    });
  });
});
