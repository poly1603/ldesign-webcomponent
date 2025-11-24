import { test, expect } from '@playwright/test';

test.describe('Table E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/table');
    await page.waitForLoadState('networkidle');
  });

  test('should render table component', async ({ page }) => {
    const table = page.locator('ldesign-table').first();
    await expect(table).toBeVisible();
  });

  test('should display table data', async ({ page }) => {
    const rows = page.locator('.table__row');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should sort column', async ({ page }) => {
    await page.goto('/components/table?demo=sortable');

    const sortableHeader = page.locator('.table__header[sortable]').first();
    await sortableHeader.click();

    await page.waitForTimeout(300);

    // 验证排序图标
    const sortIcon = sortableHeader.locator('.table__sort-icon');
    await expect(sortIcon).toBeVisible();
  });

  test('should select rows with checkbox', async ({ page }) => {
    await page.goto('/components/table?demo=row-selection');

    // 选择第一行
    const firstCheckbox = page.locator('.table__checkbox').first();
    await firstCheckbox.click();

    const selectedRow = page.locator('.table__row--selected');
    await expect(selectedRow).toHaveCount(1);

    // 全选
    const headerCheckbox = page.locator('.table__header-checkbox');
    await headerCheckbox.click();

    const allSelected = page.locator('.table__row--selected');
    const count = await allSelected.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should expand row', async ({ page }) => {
    await page.goto('/components/table?demo=expandable');

    const expandBtn = page.locator('.table__expand-icon').first();
    await expandBtn.click();

    await page.waitForTimeout(300);

    const expandedContent = page.locator('.table__expanded-row').first();
    await expect(expandedContent).toBeVisible();
  });

  test('should edit cell', async ({ page }) => {
    await page.goto('/components/table?demo=editable');

    const cell = page.locator('.table__cell[editable]').first();
    await cell.dblclick();

    const input = cell.locator('input');
    await expect(input).toBeVisible();

    await input.fill('New Value');
    await input.press('Enter');

    await page.waitForTimeout(300);
    await expect(cell).toContainText('New Value');
  });

  test('should handle tree data', async ({ page }) => {
    await page.goto('/components/table?demo=tree-data');

    const expandIcon = page.locator('.table__tree-expand-icon').first();
    await expandIcon.click();

    await page.waitForTimeout(300);

    const childRows = page.locator('.table__row--child');
    await expect(childRows.first()).toBeVisible();
  });

  test('should paginate', async ({ page }) => {
    await page.goto('/components/table?demo=pagination');

    const nextBtn = page.locator('.pagination__next');
    await nextBtn.click();

    await page.waitForTimeout(500);

    const currentPage = page.locator('.pagination__item--active');
    await expect(currentPage).toContainText('2');
  });

  test('should filter data', async ({ page }) => {
    await page.goto('/components/table?demo=filter');

    const filterIcon = page.locator('.table__filter-icon').first();
    await filterIcon.click();

    const filterDropdown = page.locator('.table__filter-dropdown');
    await expect(filterDropdown).toBeVisible();

    await page.locator('.filter__option').first().click();
    await page.locator('.filter__confirm').click();

    await page.waitForTimeout(500);

    // 验证过滤结果
    const rows = page.locator('.table__row');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle virtual scroll', async ({ page }) => {
    await page.goto('/components/table?demo=virtual-scroll');

    const tableBody = page.locator('.table__body');

    // 滚动测试
    await tableBody.evaluate(el => el.scrollTop = 5000);
    await page.waitForTimeout(500);

    // 验证仍然流畅
    const visibleRows = page.locator('.table__row:visible');
    const count = await visibleRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle fixed columns', async ({ page }) => {
    await page.goto('/components/table?demo=fixed-columns');

    const fixedLeftColumn = page.locator('.table__cell--fixed-left').first();
    await expect(fixedLeftColumn).toBeVisible();

    // 水平滚动
    const tableBody = page.locator('.table__body');
    await tableBody.evaluate(el => el.scrollLeft = 500);
    await page.waitForTimeout(300);

    // 固定列仍然可见
    await expect(fixedLeftColumn).toBeVisible();
  });

  test('should handle loading state', async ({ page }) => {
    await page.goto('/components/table?demo=loading');

    const loading = page.locator('.table__loading');
    await expect(loading).toBeVisible();

    await page.waitForTimeout(2000);
    await expect(loading).not.toBeVisible();
  });

  test('should show empty state', async ({ page }) => {
    await page.goto('/components/table?demo=empty');

    const emptyState = page.locator('.table__empty');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('暂无数据');
  });

  test('should be accessible', async ({ page }) => {
    const table = page.locator('ldesign-table').first();

    // 检查表格语义
    await expect(table).toHaveAttribute('role', 'table');

    const headers = page.locator('[role="columnheader"]');
    const count = await headers.count();
    expect(count).toBeGreaterThan(0);
  });
});
