import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 测试配置
 * 用于 @ldesign/webcomponent 组件库的端到端测试
 */
export default defineConfig({
  // 测试目录
  testDir: './e2e',

  // 测试匹配模式
  testMatch: '**/*.e2e.ts',

  // 全局超时
  timeout: 30000,

  // 每个测试的超时
  expect: {
    timeout: 5000,
  },

  // 失败时重试次数
  retries: process.env.CI ? 2 : 0,

  // 并行执行的工作线程数
  workers: process.env.CI ? 1 : undefined,

  // 报告配置
  reporter: [
    ['html', { outputFolder: 'e2e-report' }],
    ['json', { outputFile: 'e2e-results.json' }],
    ['list'],
  ],

  // 全局设置
  use: {
    // 基础 URL
    baseURL: 'http://localhost:3333',

    // 截图设置
    screenshot: 'only-on-failure',

    // 视频录制
    video: 'retain-on-failure',

    // 追踪
    trace: 'retain-on-failure',

    // 浏览器上下文选项
    viewport: { width: 1280, height: 720 },

    // 忽略 HTTPS 错误
    ignoreHTTPSErrors: true,

    // 操作超时
    actionTimeout: 10000,

    // 导航超时
    navigationTimeout: 30000,
  },

  // 项目配置（多浏览器测试）
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // 移动端测试
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Web 服务器配置
  webServer: {
    command: 'npm run dev',
    port: 3333,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
