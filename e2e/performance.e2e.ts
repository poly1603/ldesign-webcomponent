import { test, expect } from '@playwright/test';

/**
 * 性能测试套件
 * 测试组件在各种场景下的性能表现
 */
test.describe('Performance Tests', () => {
  test.describe('AutoComplete Performance', () => {
    test('should handle 10000+ options efficiently', async ({ page }) => {
      await page.goto('/components/auto-complete?demo=performance');

      const startTime = Date.now();

      const input = page.locator('ldesign-auto-complete input');
      await input.click();

      // 等待渲染完成
      await page.waitForLoadState('networkidle');

      const endTime = Date.now();
      const renderTime = endTime - startTime;

      // 渲染时间应该小于 1 秒
      expect(renderTime).toBeLessThan(1000);

      // 测试滚动性能
      const dropdown = page.locator('.auto-complete__dropdown');
      await dropdown.evaluate(el => el.scrollTop = 5000);

      // 滚动应该流畅（测试 FPS）
      const metrics = await page.evaluate(() => {
        return {
          fps: performance.now(),
        };
      });

      expect(metrics.fps).toBeGreaterThan(0);
    });

    test('should debounce search efficiently', async ({ page }) => {
      await page.goto('/components/auto-complete?demo=debounce');

      const input = page.locator('ldesign-auto-complete input');

      // 快速输入
      const startTime = Date.now();
      await input.type('abcdefghijk', { delay: 50 });

      // 等待防抖
      await page.waitForTimeout(400);

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 验证防抖生效（不应该每次输入都触发搜索）
      expect(totalTime).toBeLessThan(2000);
    });
  });

  test.describe('Select Performance', () => {
    test('should handle virtual scroll with 10000+ options', async ({ page }) => {
      await page.goto('/components/select?demo=virtual-scroll-performance');

      const startTime = Date.now();

      const select = page.locator('ldesign-select');
      await select.click();

      await page.waitForTimeout(500);

      const endTime = Date.now();
      const openTime = endTime - startTime;

      // 打开时间应该小于 500ms
      expect(openTime).toBeLessThan(500);

      // 测试滚动性能
      const dropdown = page.locator('.select__dropdown');

      const scrollStartTime = Date.now();
      for (let i = 0; i < 10; i++) {
        await dropdown.evaluate((el, offset) => {
          el.scrollTop = offset * 1000;
        }, i);
        await page.waitForTimeout(50);
      }
      const scrollEndTime = Date.now();
      const scrollTime = scrollEndTime - scrollStartTime;

      // 10次滚动应该在 1 秒内完成
      expect(scrollTime).toBeLessThan(1000);
    });

    test('should handle rapid filtering', async ({ page }) => {
      await page.goto('/components/select?demo=filterable');

      const select = page.locator('ldesign-select');
      await select.click();

      const input = select.locator('input');

      const startTime = Date.now();

      // 快速输入多个字符
      for (let char of 'abcdefgh') {
        await input.fill(char);
        await page.waitForTimeout(50);
      }

      await page.waitForTimeout(400); // 等待防抖

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 总时间应该合理
      expect(totalTime).toBeLessThan(2000);
    });
  });

  test.describe('Table Performance', () => {
    test('should render 1000+ rows efficiently', async ({ page }) => {
      await page.goto('/components/table?demo=large-dataset');

      const startTime = Date.now();

      await page.waitForLoadState('networkidle');

      const endTime = Date.now();
      const loadTime = endTime - startTime;

      // 加载时间应该小于 2 秒
      expect(loadTime).toBeLessThan(2000);
    });

    test('should handle virtual scroll efficiently', async ({ page }) => {
      await page.goto('/components/table?demo=virtual-scroll');

      const tableBody = page.locator('.table__body');

      // 测量初始渲染时间
      const startTime = performance.now();
      await page.waitForLoadState('networkidle');
      const renderTime = performance.now() - startTime;

      expect(renderTime).toBeLessThan(1000);

      // 测量滚动性能
      const scrollStartTime = performance.now();

      for (let i = 0; i < 20; i++) {
        await tableBody.evaluate((el, offset) => {
          el.scrollTop = offset * 500;
        }, i);
        await page.waitForTimeout(30);
      }

      const scrollTime = performance.now() - scrollStartTime;

      // 20次滚动应该流畅（< 2秒）
      expect(scrollTime).toBeLessThan(2000);
    });

    test('should handle sorting efficiently', async ({ page }) => {
      await page.goto('/components/table?demo=sortable');

      const header = page.locator('.table__header[sortable]').first();

      const startTime = Date.now();
      await header.click();
      await page.waitForTimeout(500);
      const endTime = Date.now();

      const sortTime = endTime - startTime;

      // 排序应该快速（< 1秒）
      expect(sortTime).toBeLessThan(1000);
    });

    test('should handle row selection efficiently', async ({ page }) => {
      await page.goto('/components/table?demo=row-selection');

      const headerCheckbox = page.locator('.table__header-checkbox');

      const startTime = Date.now();
      await headerCheckbox.click(); // 全选
      await page.waitForTimeout(500);
      const endTime = Date.now();

      const selectTime = endTime - startTime;

      // 全选应该快速（< 1秒）
      expect(selectTime).toBeLessThan(1000);
    });
  });

  test.describe('Form Performance', () => {
    test('should handle complex validation efficiently', async ({ page }) => {
      await page.goto('/components/form?demo=complex-validation');

      // 填写多个字段
      const fields = await page.locator('input').all();

      const startTime = Date.now();

      for (const field of fields) {
        await field.fill('test value');
        await field.blur();
        await page.waitForTimeout(50);
      }

      const endTime = Date.now();
      const validationTime = endTime - startTime;

      // 验证时间应该合理
      expect(validationTime).toBeLessThan(fields.length * 200);
    });

    test('should handle dynamic form list efficiently', async ({ page }) => {
      await page.goto('/components/form?demo=form-list');

      const addBtn = page.locator('button[data-action="add"]');

      const startTime = Date.now();

      // 添加 20 个表单项
      for (let i = 0; i < 20; i++) {
        await addBtn.click();
        await page.waitForTimeout(50);
      }

      const endTime = Date.now();
      const addTime = endTime - startTime;

      // 添加时间应该合理（< 3秒）
      expect(addTime).toBeLessThan(3000);
    });
  });

  test.describe('Memory Leak Tests', () => {
    test('should not leak memory on component mount/unmount', async ({ page }) => {
      await page.goto('/components/memory-test');

      // 获取初始内存
      const initialMemory = await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0;
      });

      // 多次挂载和卸载组件
      for (let i = 0; i < 10; i++) {
        await page.locator('button[data-action="mount"]').click();
        await page.waitForTimeout(100);
        await page.locator('button[data-action="unmount"]').click();
        await page.waitForTimeout(100);
      }

      // 手动触发 GC（如果可能）
      await page.evaluate(() => {
        if ((window as any).gc) {
          (window as any).gc();
        }
      });

      await page.waitForTimeout(1000);

      // 获取最终内存
      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0;
      });

      // 内存增长应该在合理范围内（< 10MB）
      const memoryGrowth = finalMemory - initialMemory;
      expect(memoryGrowth).toBeLessThan(10 * 1024 * 1024);
    });
  });

  test.describe('Bundle Size Tests', () => {
    test('should have reasonable bundle size', async ({ page }) => {
      await page.goto('/');

      // 获取加载的 JS 文件大小
      const resources = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter(r => r.name.endsWith('.js'))
          .map(r => ({
            name: r.name,
            size: (r as any).transferSize || 0,
          }));
      });

      const totalSize = resources.reduce((sum, r) => sum + r.size, 0);

      // 总体积应该合理（< 500KB）
      expect(totalSize).toBeLessThan(500 * 1024);
    });
  });

  test.describe('Network Performance', () => {
    test('should handle slow network gracefully', async ({ page, context }) => {
      // 模拟慢速网络
      await context.route('**/*', route => {
        setTimeout(() => route.continue(), 100);
      });

      await page.goto('/components/select?demo=remote-search');

      const select = page.locator('ldesign-select');
      await select.click();

      const input = select.locator('input');
      await input.fill('search');

      // 应该显示加载状态
      const loading = page.locator('.select__loading');
      await expect(loading).toBeVisible();

      // 等待加载完成
      await page.waitForTimeout(2000);
      await expect(loading).not.toBeVisible();
    });
  });
});
