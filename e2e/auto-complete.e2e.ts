import { test, expect } from '@playwright/test';

test.describe('AutoComplete E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/auto-complete');
    await page.waitForLoadState('networkidle');
  });

  test('should render autocomplete component', async ({ page }) => {
    const autoComplete = page.locator('ldesign-auto-complete').first();
    await expect(autoComplete).toBeVisible();
  });

  test('should show dropdown on focus', async ({ page }) => {
    const input = page.locator('ldesign-auto-complete input').first();
    await input.click();

    const dropdown = page.locator('.auto-complete__dropdown');
    await expect(dropdown).toBeVisible();
  });

  test('should filter options on input', async ({ page }) => {
    const input = page.locator('ldesign-auto-complete input').first();
    await input.fill('app');

    await page.waitForTimeout(500); // 等待过滤

    const options = page.locator('.auto-complete__option');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);

    // 验证过滤结果
    const firstOption = options.first();
    const text = await firstOption.textContent();
    expect(text?.toLowerCase()).toContain('app');
  });

  test('should select option on click', async ({ page }) => {
    const input = page.locator('ldesign-auto-complete input').first();
    await input.click();

    const firstOption = page.locator('.auto-complete__option').first();
    const optionText = await firstOption.textContent();
    await firstOption.click();

    const inputValue = await input.inputValue();
    expect(inputValue).toBe(optionText);
  });

  test('should navigate with keyboard', async ({ page }) => {
    const input = page.locator('ldesign-auto-complete input').first();
    await input.click();

    // 按下箭头键
    await input.press('ArrowDown');
    await page.waitForTimeout(100);

    const activeOption = page.locator('.auto-complete__option--active');
    await expect(activeOption).toBeVisible();

    // 按 Enter 选择
    await input.press('Enter');

    const dropdown = page.locator('.auto-complete__dropdown');
    await expect(dropdown).not.toBeVisible();
  });

  test('should clear value', async ({ page }) => {
    const autoComplete = page.locator('ldesign-auto-complete[clearable]').first();
    const input = autoComplete.locator('input');

    await input.fill('test');
    await page.waitForTimeout(100);

    const clearBtn = autoComplete.locator('.auto-complete__clear');
    await clearBtn.click();

    const value = await input.inputValue();
    expect(value).toBe('');
  });

  test('should support disabled state', async ({ page }) => {
    const input = page.locator('ldesign-auto-complete[disabled] input').first();
    await expect(input).toBeDisabled();
  });

  test('should handle large dataset', async ({ page }) => {
    // 测试大数据量场景
    await page.goto('/components/auto-complete?demo=large-data');

    const input = page.locator('ldesign-auto-complete input').first();
    await input.click();
    await input.fill('item');

    await page.waitForTimeout(500);

    const options = page.locator('.auto-complete__option');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(10); // maxOptions
  });

  test('should show loading state', async ({ page }) => {
    await page.goto('/components/auto-complete?demo=remote');

    const input = page.locator('ldesign-auto-complete input').first();
    await input.fill('search');

    const loading = page.locator('.auto-complete__loading');
    await expect(loading).toBeVisible();

    await page.waitForTimeout(1000);
    await expect(loading).not.toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    const autoComplete = page.locator('ldesign-auto-complete').first();

    // 检查 ARIA 属性
    const input = autoComplete.locator('input');
    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(input).toHaveAttribute('aria-autocomplete', 'list');
  });
});
