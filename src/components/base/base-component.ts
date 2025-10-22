import { Component, Element, Prop, State, Watch } from '@stencil/core';
import { bem, classNames, generateId, debounce, throttle } from '../../utils';
import { Size, Theme } from '../../types';

/**
 * 组件基类
 * 提供通用的属性和方法
 */
@Component({
  tag: 'base-component',
  shadow: false
})
export class BaseComponent {
  @Element() el!: HTMLElement;

  /**
   * 组件类名
   */
  @Prop() class?: string;

  /**
   * 组件ID
   */
  @Prop() componentId?: string;

  /**
   * 是否禁用
   */
  @Prop() disabled: boolean = false;

  /**
   * 组件尺寸
   */
  @Prop() size: Size = 'medium';

  /**
   * 主题
   */
  @Prop() theme: Theme = 'light';

  /**
   * 内部状态：组件是否已初始化
   */
  @State() initialized: boolean = false;

  /**
   * 内部状态：组件唯一ID
   */
  @State() internalId!: string;

  /**
   * 存储定时器引用，用于清理
   */
  private timers: Set<ReturnType<typeof setTimeout>> = new Set();

  /**
   * 存储事件监听器，用于清理
   */
  private eventListeners: Array<{
    target: EventTarget;
    event: string;
    handler: EventListener;
    options?: AddEventListenerOptions;
  }> = [];

  /**
   * 存储 ResizeObserver 实例
   */
  private resizeObserver?: ResizeObserver;

  /**
   * 监听disabled属性变化
   */
  @Watch('disabled')
  watchDisabled(newValue: boolean): void {
    this.updateAriaDisabled(newValue);
  }

  /**
   * 组件加载前的生命周期
   */
  componentWillLoad(): void {
    this.internalId = this.componentId || generateId();
  }

  /**
   * 组件加载完成后的生命周期
   */
  componentDidLoad(): void {
    this.initialized = true;
    this.updateAriaDisabled(this.disabled);
  }

  /**
   * 组件卸载时的清理工作
   */
  disconnectedCallback(): void {
    this.cleanup();
  }

  /**
   * 清理所有资源
   */
  protected cleanup(): void {
    // 清理定时器
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();

    // 清理事件监听器
    this.eventListeners.forEach(({ target, event, handler, options }) => {
      target.removeEventListener(event, handler, options);
    });
    this.eventListeners = [];

    // 清理 ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }

  /**
   * 安全地设置定时器（自动清理）
   */
  protected setTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout> {
    const timer = setTimeout(() => {
      callback();
      this.timers.delete(timer);
    }, delay);
    this.timers.add(timer);
    return timer;
  }

  /**
   * 安全地设置间隔定时器（自动清理）
   */
  protected setInterval(callback: () => void, delay: number): ReturnType<typeof setInterval> {
    const timer = setInterval(callback, delay);
    this.timers.add(timer as any);
    return timer;
  }

  /**
   * 安全地添加事件监听器（自动清理）
   */
  protected addEventListener<K extends keyof HTMLElementEventMap>(
    target: HTMLElement | Window | Document,
    event: K | string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ): void {
    target.addEventListener(event, handler, options);
    this.eventListeners.push({ target, event, handler, options });
  }

  /**
   * 移除事件监听器
   */
  protected removeEventListener(
    target: EventTarget,
    event: string,
    handler: EventListener
  ): void {
    target.removeEventListener(event, handler);
    const index = this.eventListeners.findIndex(
      listener => listener.target === target && listener.event === event && listener.handler === handler
    );
    if (index !== -1) {
      this.eventListeners.splice(index, 1);
    }
  }

  /**
   * 观察元素大小变化
   */
  protected observeResize(callback: (entry: ResizeObserverEntry) => void): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(callback);
    });

    this.resizeObserver.observe(this.el);
  }

  /**
   * 更新aria-disabled属性
   */
  private updateAriaDisabled(disabled: boolean): void {
    if (this.el) {
      if (disabled) {
        this.el.setAttribute('aria-disabled', 'true');
      } else {
        this.el.removeAttribute('aria-disabled');
      }
    }
  }

  /**
   * 生成BEM类名
   */
  protected bem(block: string, element?: string, modifier?: string | string[]): string {
    return bem(block, element, modifier);
  }

  /**
   * 合并类名
   */
  protected classNames(...classes: (string | undefined | null | false)[]): string {
    return classNames(...classes);
  }

  /**
   * 获取组件根类名
   */
  protected getRootClass(componentName: string, modifiers?: string[]): string {
    const baseClass = this.bem(componentName);
    const sizeClass = this.bem(componentName, undefined, this.size);
    const themeClass = this.bem(componentName, undefined, this.theme);
    const disabledClass = this.disabled ? this.bem(componentName, undefined, 'disabled') : '';

    const modifierClasses = modifiers ? modifiers.map(mod =>
      this.bem(componentName, undefined, mod)
    ).join(' ') : '';

    return this.classNames(
      baseClass,
      sizeClass,
      themeClass,
      disabledClass,
      modifierClasses,
      this.class
    );
  }

  /**
   * 触发自定义事件
   */
  protected emitEvent<T = any>(eventName: string, detail?: T): CustomEvent<T> {
    const event = new CustomEvent(`ldesign${eventName}`, {
      detail,
      bubbles: true,
      cancelable: true
    });
    this.el.dispatchEvent(event);
    return event;
  }

  /**
   * 获取组件内部ID
   */
  protected getInternalId(): string {
    return this.internalId || generateId();
  }

  /**
   * 检查组件是否可交互
   */
  protected isInteractive(): boolean {
    return !this.disabled;
  }

  /**
   * 处理键盘事件的通用方法
   */
  protected handleKeyDown(event: KeyboardEvent, callback?: (event: KeyboardEvent) => void): void {
    if (!this.isInteractive()) {
      event.preventDefault();
      return;
    }

    if (callback) {
      callback(event);
    }
  }

  /**
   * 处理点击事件的通用方法
   */
  protected handleClick(event: MouseEvent, callback?: (event: MouseEvent) => void): void {
    if (!this.isInteractive()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (callback) {
      callback(event);
    }
  }

  /**
   * 创建防抖函数
   */
  protected createDebounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    return debounce(func, wait);
  }

  /**
   * 创建节流函数
   */
  protected createThrottle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    return throttle(func, wait);
  }

  /**
   * 使用 requestAnimationFrame 优化渲染
   */
  protected requestUpdate(callback: () => void): void {
    requestAnimationFrame(() => {
      if (this.el && this.el.isConnected) {
        callback();
      }
    });
  }
}
