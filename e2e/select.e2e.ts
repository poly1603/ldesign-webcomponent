import { test, expect } from '@playwright/test';

test.describe('Select E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/select');
    await page.waitForLoadState('networkidle');
  });

  test('should render select component', async ({ page }) => {
    const select = page.locator('ldesign-select').first();
    await expect(select).toBeVisible();
  });

  test('should open dropdown on click', async ({ page }) => {
    const select = page.locator('ldesign-select').first();
    await select.click();

    const dropdown = page.locator('.select__dropdown');
    await expect(dropdown).toBeVisible();
  });

  test('should select option', async ({ page }) => {
    const select = page.locator('ldesign-select').first();
    await select.click();

    const option = page.locator('.select__option').first();
    const optionText = await option.textContent();
    await option.click();

    const selectedValue = select.locator('.select__selected-text');
    await expect(selectedValue).toContainText(optionText || '');
  });

  test('should support multiple selection', async ({ page }) => {
    await page.goto('/components/select?demo=multiple');

    const select = page.locator('ldesign-select[multiple]').first();
    await select.click();

    // 选择多个选项
    await page.locator('.select__option').nth(0).click();
    await page.locator('.select__option').nth(1).click();

    const tags = select.locator('.select__tag');
    const count = await tags.count();
    expect(count).toBe(2);
  });

  test('should filter options', async ({ page }) => {
    await page.goto('/components/select?demo=filterable');

    const select = page.locator('ldesign-select[filterable]').first();
    await select.click();

    const input = select.locator('input[type="text"]');
    await input.fill('option');

    await page.waitForTimeout(300);

    const options = page.locator('.select__option:visible');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle virtual scroll with large dataset', async ({ page }) => {
    await page.goto('/components/select?demo=virtual-scroll');

    const select = page.locator('ldesign-select[virtual-scroll]').first();
    await select.click();

    // 等待渲染
    await page.waitForTimeout(500);

    // 滚动测试
    const dropdown = page.locator('.select__dropdown');
    await dropdown.evaluate(el => el.scrollTop = 1000);
    await page.waitForTimeout(300);

    // 验证仍然流畅
    const options = page.locator('.select__option:visible');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should perform remote search', async ({ page }) => {
    await page.goto('/components/select?demo=remote-search');

    const select = page.locator('ldesign-select[remote]').first();
    await select.click();

    const input = select.locator('input');
    await input.fill('search');

    // 等待远程搜索
    await page.waitForTimeout(1000);

    const options = page.locator('.select__option');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should create new option', async ({ page }) => {
    await page.goto('/components/select?demo=allow-create');

    const select = page.locator('ldesign-select[allow-create]').first();
    await select.click();

    const input = select.locator('input');
    await input.fill('New Option');
    await input.press('Enter');

    const tags = select.locator('.select__tag');
    await expect(tags.last()).toContainText('New Option');
  });

  test('should clear selection', async ({ page }) => {
    const select = page.locator('ldesign-select[clearable]').first();
    await select.click();

    await page.locator('.select__option').first().click();

    const clearBtn = select.locator('.select__clear');
    await clearBtn.click();

    const placeholder = select.locator('.select__placeholder');
    await expect(placeholder).toBeVisible();
  });

  test('should support disabled state', async ({ page }) => {
    const select = page.locator('ldesign-select[disabled]').first();
    await expect(select).toHaveAttribute('disabled');

    await select.click();
    const dropdown = page.locator('.select__dropdown');
    await expect(dropdown).not.toBeVisible();
  });

  test('should handle max tag count', async ({ page }) => {
    await page.goto('/components/select?demo=max-tag-count');

    const select = page.locator('ldesign-select[multiple]').first();
    await select.click();

    // 选择多个
    for (let i = 0; i < 5; i++) {
      await page.locator('.select__option').nth(i).click();
    }

    const tags = select.locator('.select__tag:visible');
    const count = await tags.count();
    expect(count).toBeLessThanOrEqual(3); // maxTagCount=3
  });

  test('should be accessible', async ({ page }) => {
    const select = page.locator('ldesign-select').first();

    // 检查 ARIA 属性
    await expect(select).toHaveAttribute('role', 'combobox');
    await expect(select).toHaveAttribute('aria-haspopup', 'listbox');
  });
});
