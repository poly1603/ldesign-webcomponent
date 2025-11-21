import { Element, Prop, State, Watch } from '@stencil/core';
import { bem, classNames, generateId, debounce, throttle } from '../../utils';
import { Size, Theme } from '../../types';

/**
 * 组件基类
 * 提供通用的属性和方法
 * 注意：这是一个普通的 TypeScript 类，不是 Stencil 组件
 */
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
   * 存储 MutationObserver 实例
   */
  private mutationObservers: Set<MutationObserver> = new Set();

  /**
   * 存储 IntersectionObserver 实例
   */
  private intersectionObservers: Set<IntersectionObserver> = new Set();

  /**
   * 存储 requestAnimationFrame ID
   */
  private rafIds: Set<number> = new Set();

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

    // 清理 MutationObserver
    this.mutationObservers.forEach(observer => observer.disconnect());
    this.mutationObservers.clear();

    // 清理 IntersectionObserver
    this.intersectionObservers.forEach(observer => observer.disconnect());
    this.intersectionObservers.clear();

    // 清理 requestAnimationFrame
    this.rafIds.forEach(id => cancelAnimationFrame(id));
    this.rafIds.clear();
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
   * @deprecated 使用 addSafeEventListener 代替
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
   * 安全地添加事件监听器（自动清理） - 推荐使用
   */
  protected addSafeEventListener<K extends keyof HTMLElementEventMap>(
    target: HTMLElement | Window | Document,
    event: K | string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ): void {
    target.addEventListener(event, handler, options);
    this.eventListeners.push({ target, event, handler, options });
  }

  /**
   * 安全地设置 setTimeout（自动清理） - 推荐使用
   */
  protected addSafeTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout> {
    return this.setTimeout(callback, delay);
  }

  /**
   * 安全地设置 setInterval（自动清理） - 推荐使用
   */
  protected addSafeInterval(callback: () => void, delay: number): ReturnType<typeof setInterval> {
    return this.setInterval(callback, delay);
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
   * 安全地观察 DOM 变化（自动清理）
   */
  protected observeMutation(
    target: Node,
    callback: MutationCallback,
    options?: MutationObserverInit
  ): MutationObserver {
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    this.mutationObservers.add(observer);
    return observer;
  }

  /**
   * 安全地观察元素可见性（自动清理）
   */
  protected observeIntersection(
    target: Element,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
    this.intersectionObservers.add(observer);
    return observer;
  }

  /**
   * 安全地使用 requestAnimationFrame（自动清理）
   */
  protected addSafeRAF(callback: FrameRequestCallback): number {
    const id = requestAnimationFrame((time) => {
      this.rafIds.delete(id);
      callback(time);
    });
    this.rafIds.add(id);
    return id;
  }

  /**
   * 取消 requestAnimationFrame
   */
  protected cancelSafeRAF(id: number): void {
    cancelAnimationFrame(id);
    this.rafIds.delete(id);
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
