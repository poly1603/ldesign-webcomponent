/**
 * 工具函数集合
 */

// 导出虚拟滚动
export * from './virtual-scroll';

// 导出对象池
export * from './object-pool';

// 导出资源管理器
export * from './resource-manager';

/**
 * 生成BEM类名
 * @param block 块名
 * @param element 元素名
 * @param modifier 修饰符
 * @returns BEM类名
 */
export function bem(block: string, element?: string, modifier?: string | string[]): string {
  let className = `ldesign-${block}`;

  if (element) {
    className += `__${element}`;
  }

  if (modifier) {
    if (Array.isArray(modifier)) {
      modifier.forEach(mod => {
        if (mod) {
          className += ` ldesign-${block}${element ? `__${element}` : ''}--${mod}`;
        }
      });
    } else {
      className += `--${modifier}`;
    }
  }

  return className;
}

/**
 * 合并类名
 * @param classes 类名数组
 * @returns 合并后的类名字符串
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 生成唯一ID
 * @param prefix 前缀
 * @returns 唯一ID
 */
export function generateId(prefix: string = 'ldesign'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 等待时间
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
}

/**
 * 判断是否为空值
 * @param value 要判断的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param sources 源对象
 * @returns 合并后的对象
 */
export function deepMerge<T>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * 判断是否为对象
 * @param item 要判断的项
 * @returns 是否为对象
 */
function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * 获取元素的滚动父元素
 * @param element 目标元素
 * @returns 滚动父元素
 */
export function getScrollParent(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;

  let parent = element.parentElement;

  while (parent) {
    const { overflow, overflowY } = window.getComputedStyle(parent);
    if (/(auto|scroll)/.test(overflow + overflowY)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return document.documentElement;
}

/**
 * 检测是否为移动设备
 * @returns 是否为移动设备
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 获取元素相对于文档的位置
 * @param element 目标元素
 * @returns 位置信息
 */
export function getElementOffset(element: HTMLElement): { top: number; left: number } {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}

/**
 * 等待动画完成
 * @param element 目标元素
 * @param duration 动画时长（毫秒）
 * @returns Promise
 */
export function waitForAnimation(element: HTMLElement, duration: number): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve();
    }, duration);

    // 如果动画提前结束，清除定时器
    const onAnimationEnd = () => {
      clearTimeout(timer);
      element.removeEventListener('animationend', onAnimationEnd);
      resolve();
    };

    element.addEventListener('animationend', onAnimationEnd);
  });
}

/**
 * 克隆对象（深拷贝）
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof Array) {
    return obj.map(item => cloneDeep(item)) as any;
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = cloneDeep(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数
 * @returns 格式化后的字符串
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 将驼峰命名转为短横线命名
 * @param str 驼峰字符串
 * @returns 短横线字符串
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * 将短横线命名转为驼峰命名
 * @param str 短横线字符串
 * @returns 驼峰字符串
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}