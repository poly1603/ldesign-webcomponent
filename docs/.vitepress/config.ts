import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'LDesign WebComponent',
  description: '高性能、现代化的 Web Components 组件库',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/overview' },
      { text: '资源', link: '/resources/overview' },
      {
        text: 'v2.0.0',
        items: [
          { text: '更新日志', link: '/changelog' },
          { text: '迁移指南', link: '/guide/migration' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
          ]
        },
        {
          text: '框架集成',
          items: [
            { text: '原生 HTML', link: '/guide/integration-html' },
            { text: 'Vue 3', link: '/guide/integration-vue' },
            { text: 'React', link: '/guide/integration-react' },
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '按需导入', link: '/guide/on-demand' },
            { text: '主题定制', link: '/guide/theming' },
            { text: '性能优化', link: '/guide/performance' },
            { text: '最佳实践', link: '/guide/best-practices' },
          ]
        },
        {
          text: '其他',
          items: [
            { text: '迁移指南', link: '/guide/migration' },
            { text: 'FAQ', link: '/guide/faq' },
          ]
        }
      ],

      '/components/': [
        {
          text: '组件总览',
          items: [
            { text: '组件概览', link: '/components/overview' },
          ]
        },
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入', link: '/components/input-number' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'DatePicker 日期选择', link: '/components/date-picker' },
            { text: 'TimePicker 时间选择', link: '/components/time-picker' },
            { text: 'Upload 文件上传', link: '/components/upload' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Slider 滑块', link: '/components/slider' },
            { text: 'ColorPicker 颜色选择', link: '/components/color-picker' },
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Table 表格', link: '/components/table' },
            { text: 'VirtualList 虚拟列表', link: '/components/virtual-list' },
            { text: 'Empty 空状态', link: '/components/empty' },
            { text: 'Timeline 时间轴', link: '/components/timeline' },
            { text: 'Steps 步骤条', link: '/components/steps' },
            { text: 'Descriptions 描述列表', link: '/components/descriptions' },
            { text: 'Statistic 统计数值', link: '/components/statistic' },
            { text: 'Result 结果页', link: '/components/result' },
            { text: 'Tree 树形控件', link: '/components/tree' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Progress 进度条', link: '/components/progress' },
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
            { text: 'Spin 加载指示', link: '/components/spin' },
            { text: 'Alert 警告提示', link: '/components/alert' },
            { text: 'Message 全局提示', link: '/components/message' },
            { text: 'Notification 通知', link: '/components/notification' },
            { text: 'Modal 对话框', link: '/components/modal' },
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Popconfirm 气泡确认', link: '/components/popconfirm' },
            { text: 'Loading 加载中', link: '/components/loading' },
          ]
        },
        {
          text: '导航组件',
          items: [
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'Anchor 锚点', link: '/components/anchor' },
            { text: 'Menu 导航菜单', link: '/components/menu' },
            { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
          ]
        },
        {
          text: '布局组件',
          items: [
            { text: 'Layout 布局', link: '/components/layout' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Grid 网格', link: '/components/grid' },
            { text: 'Space 间距', link: '/components/space' },
            { text: 'Split 分割面板', link: '/components/split' },
          ]
        },
        {
          text: '其他组件',
          items: [
            { text: 'Watermark 水印', link: '/components/watermark' },
            { text: 'Tour 漫游式引导', link: '/components/tour' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            { text: 'Affix 固钉', link: '/components/affix' },
            { text: 'Backtop 回到顶部', link: '/components/backtop' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ldesign/webcomponent' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present LDesign Team'
    },

    search: {
      provider: 'local'
    }
  },

  markdown: {
    lineNumbers: true,
  },

  vite: {
    ssr: {
      noExternal: ['@ldesign/webcomponent']
    }
  }
});
