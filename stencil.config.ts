import { Config } from '@stencil/core';
import { less } from '@stencil-community/less';

export const config: Config = {
  namespace: 'ldesign-webcomponent',
  globalScript: 'src/global/global.ts',
  globalStyle: 'src/global/global.less',
  taskQueue: 'async',
  plugins: [
    less()
  ],
  outputTargets: [
    // 1. 全量分发构建（用于 CDN 和传统引入）
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      // 启用代码分割以支持按需加载
      copy: [
        {
          src: '../scripts/custom-elements-loader.js',
          dest: 'custom-elements-loader.js',
          warn: false
        }
      ]
    },
    // 2. 自定义元素构建（支持 Tree-shaking 和按需导入）
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      dir: 'dist/components',
      externalRuntime: false,
      generateTypeDeclarations: true,
      includeGlobalScripts: false,
      // 每个组件生成独立的文件
      minify: true,
    },
    // 3. 类型定义
    {
      type: 'dist-types',
      dir: 'dist/types',
    },
    // 4. 文档生成
    {
      type: 'docs-readme',
      strict: true,
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
    // 5. 开发服务器输出
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'global' },
        { src: '../examples', dest: 'examples', warn: false }
      ]
    },
  ],
  devServer: {
    reloadStrategy: 'pageReload',
    port: 3333,
    openBrowser: false,
  },
  testing: {
    browserHeadless: "new",
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/*.spec.{ts,tsx}',
      '!src/**/*.e2e.{ts,tsx}',
      '!src/**/test/**',
      '!src/**/*.stories.{ts,tsx}',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
      '^.+\\.(ts|tsx)$': '@stencil/core/testing/jest-preprocessor.js'
    },
    testEnvironment: 'jsdom',
    testMatch: [
      '**/__tests__/**/*.{ts,tsx}',
      '**/*.{spec,test}.{ts,tsx}'
    ],
  },
  extras: {
    enableImportInjection: true,
    shadowDomShim: true,
    scriptDataOpts: true,
    appendChildSlotFix: false,
    // 启用实验性功能
    experimentalImportInjection: true,
  },
  // 优化构建
  buildEs5: false, // 不构建 ES5（减小包体积）
  minifyJs: true,
  minifyCss: true,
  sourceMap: true,
  // 哈希文件名以支持长期缓存
  hashedFileNameLength: 8,
};
