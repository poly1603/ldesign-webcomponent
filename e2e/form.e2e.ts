import { test, expect } from '@playwright/test';

test.describe('Form E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/form');
    await page.waitForLoadState('networkidle');
  });

  test('should render form component', async ({ page }) => {
    const form = page.locator('ldesign-form').first();
    await expect(form).toBeVisible();
  });

  test('should validate required field', async ({ page }) => {
    const form = page.locator('ldesign-form').first();
    const submitBtn = page.locator('button[type="submit"]').first();

    await submitBtn.click();

    const errorMsg = page.locator('.form-item__error').first();
    await expect(errorMsg).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/components/form?demo=validation');

    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    await page.waitForTimeout(300);

    const errorMsg = page.locator('.form-item__error');
    await expect(errorMsg).toContainText('邮箱');
  });

  test('should perform async validation', async ({ page }) => {
    await page.goto('/components/form?demo=async-validation');

    const usernameInput = page.locator('input[name="username"]');
    await usernameInput.fill('admin');
    await usernameInput.blur();

    // 等待异步验证
    await page.waitForTimeout(1000);

    const errorMsg = page.locator('.form-item__error');
    await expect(errorMsg).toBeVisible();
  });

  test('should handle field linkage', async ({ page }) => {
    await page.goto('/components/form?demo=field-linkage');

    const countrySelect = page.locator('ldesign-select[name="country"]');
    await countrySelect.click();

    const option = page.locator('.select__option').filter({ hasText: 'USA' });
    await option.click();

    await page.waitForTimeout(300);

    const provinceSelect = page.locator('ldesign-select[name="province"]');
    await expect(provinceSelect).not.toBeDisabled();
  });

  test('should submit form successfully', async ({ page }) => {
    const form = page.locator('ldesign-form').first();

    // 填写表单
    await page.locator('input[name="username"]').fill('testuser');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="password"]').fill('123456');

    // 提交
    await page.locator('button[type="submit"]').click();

    // 验证成功消息
    await page.waitForTimeout(500);
    const successMsg = page.locator('.message--success');
    await expect(successMsg).toBeVisible();
  });

  test('should reset form', async ({ page }) => {
    // 填写表单
    await page.locator('input[name="username"]').first().fill('testuser');
    await page.locator('input[name="email"]').first().fill('test@example.com');

    // 重置
    await page.locator('button[type="reset"]').first().click();

    // 验证已清空
    const usernameValue = await page.locator('input[name="username"]').first().inputValue();
    const emailValue = await page.locator('input[name="email"]').first().inputValue();

    expect(usernameValue).toBe('');
    expect(emailValue).toBe('');
  });

  test('should handle form snapshot', async ({ page }) => {
    await page.goto('/components/form?demo=snapshot');

    // 填写表单
    await page.locator('input[name="name"]').fill('John');
    await page.locator('input[name="age"]').fill('30');

    // 创建快照
    await page.locator('button[data-action="snapshot"]').click();

    // 修改值
    await page.locator('input[name="name"]').fill('Jane');

    // 恢复快照
    await page.locator('button[data-action="restore"]').click();

    const nameValue = await page.locator('input[name="name"]').inputValue();
    expect(nameValue).toBe('John');
  });

  test('should support dynamic form list', async ({ page }) => {
    await page.goto('/components/form?demo=form-list');

    // 添加表单项
    await page.locator('button[data-action="add"]').click();
    await page.waitForTimeout(200);

    const items = page.locator('.form-list__item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    // 删除表单项
    await page.locator('button[data-action="remove"]').first().click();
    await page.waitForTimeout(200);

    const newCount = await items.count();
    expect(newCount).toBe(count - 1);
  });

  test('should handle form layout', async ({ page }) => {
    await page.goto('/components/form?demo=layout');

    const horizontalForm = page.locator('ldesign-form[layout="horizontal"]');
    await expect(horizontalForm).toHaveClass(/form--horizontal/);

    const verticalForm = page.locator('ldesign-form[layout="vertical"]');
    await expect(verticalForm).toHaveClass(/form--vertical/);
  });

  test('should be accessible', async ({ page }) => {
    const form = page.locator('ldesign-form').first();

    // 检查表单标签
    const labels = form.locator('label');
    const count = await labels.count();
    expect(count).toBeGreaterThan(0);

    // 检查必填标记
    const required = form.locator('.form-item__required');
    await expect(required.first()).toBeVisible();
  });
});
