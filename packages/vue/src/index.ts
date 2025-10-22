/**
 * @ldesign/webcomponent-vue
 * Vue 3 集成包
 */

import type { App, Plugin } from 'vue';

/**
 * Vue 插件：配置 Vue 识别 LDesign Web Components
 */
export const LDesignVue: Plugin = {
  install(app: App) {
    // 告诉 Vue 编译器 ldesign- 开头的标签是自定义元素
    app.config.compilerOptions.isCustomElement = (tag: string) => {
      return tag.startsWith('ldesign-');
    };
  },
};

/**
 * 默认导出
 */
export default LDesignVue;

/**
 * 按需导入辅助函数
 */

/**
 * 定义 Button 组件
 */
export function defineButton() {
  import('@ldesign/webcomponent/button');
}

/**
 * 定义 Input 组件
 */
export function defineInput() {
  import('@ldesign/webcomponent/input');
}

/**
 * 定义 Table 组件
 */
export function defineTable() {
  import('@ldesign/webcomponent/table');
}

/**
 * 定义 VirtualList 组件
 */
export function defineVirtualList() {
  import('@ldesign/webcomponent/virtual-list');
}

/**
 * 定义 Card 组件
 */
export function defineCard() {
  import('@ldesign/webcomponent/card');
}

/**
 * 定义 Form 组件
 */
export function defineForm() {
  import('@ldesign/webcomponent/form');
}

/**
 * 定义所有组件
 */
export function defineAllComponents() {
  import('@ldesign/webcomponent');
}

/**
 * 导出类型定义
 */
export type {
  Size,
  ButtonType,
  ButtonColor,
  ButtonShape,
  ButtonIconPosition,
  InputType,
  Theme,
  ComponentStatus,
} from '@ldesign/webcomponent';




