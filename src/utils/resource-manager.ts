/**
 * 资源管理器 - 用于统一管理组件的资源清理
 * 
 * 符合 Stencil 最佳实践，使用组合模式而非继承
 * 
 * @example
 * ```typescript
 * class MyComponent {
 *   private resources = new ResourceManager();
 * 
 *   componentDidLoad() {
 *     this.resources.addSafeEventListener(window, 'resize', this.handleResize);
 *     this.resources.addSafeTimeout(() => console.log('delayed'), 1000);
 *   }
 * 
 *   disconnectedCallback() {
 *     this.resources.cleanup(); // 自动清理所有资源
 *   }
 * }
 * ```
 */
export class ResourceManager {
  /**
   * 存储定时器引用
   */
  private timers: Set<ReturnType<typeof setTimeout>> = new Set();

  /**
   * 存储事件监听器
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
   * 添加安全的 setTimeout
   * @param callback 回调函数
   * @param delay 延迟时间（毫秒）
   * @returns 定时器 ID
   */
  addSafeTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout> {
    const timer = setTimeout(() => {
      this.timers.delete(timer);
      callback();
    }, delay);
    this.timers.add(timer);
    return timer;
  }

  /**
   * 添加安全的 setInterval
   * @param callback 回调函数
   * @param interval 间隔时间（毫秒）
   * @returns 定时器 ID
   */
  addSafeInterval(callback: () => void, interval: number): ReturnType<typeof setInterval> {
    const timer = setInterval(callback, interval);
    this.timers.add(timer);
    return timer;
  }

  /**
   * 添加安全的事件监听器
   * @param target 目标元素
   * @param event 事件名称
   * @param handler 事件处理器
   * @param options 事件选项
   */
  addSafeEventListener(
    target: EventTarget,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ): void {
    target.addEventListener(event, handler, options);
    this.eventListeners.push({ target, event, handler, options });
  }

  /**
   * 添加 ResizeObserver
   * @param callback 回调函数
   * @param target 观察目标（可选）
   * @returns ResizeObserver 实例
   */
  observeResize(callback: ResizeObserverCallback, target?: Element): ResizeObserver {
    const observer = new ResizeObserver(callback);
    if (target) {
      observer.observe(target);
    }
    this.resizeObserver = observer;
    return observer;
  }

  /**
   * 添加 MutationObserver
   * @param callback 回调函数
   * @param target 观察目标（可选）
   * @param options 观察选项（可选）
   * @returns MutationObserver 实例
   */
  observeMutation(
    callback: MutationCallback,
    target?: Node,
    options?: MutationObserverInit
  ): MutationObserver {
    const observer = new MutationObserver(callback);
    if (target) {
      observer.observe(target, options);
    }
    this.mutationObservers.add(observer);
    return observer;
  }

  /**
   * 添加 IntersectionObserver
   * @param callback 回调函数
   * @param target 观察目标（可选）
   * @param options 观察选项（可选）
   * @returns IntersectionObserver 实例
   */
  observeIntersection(
    callback: IntersectionObserverCallback,
    target?: Element,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const observer = new IntersectionObserver(callback, options);
    if (target) {
      observer.observe(target);
    }
    this.intersectionObservers.add(observer);
    return observer;
  }

  /**
   * 添加安全的 requestAnimationFrame
   * @param callback 回调函数
   * @returns RAF ID
   */
  addSafeRAF(callback: FrameRequestCallback): number {
    const id = requestAnimationFrame((time) => {
      this.rafIds.delete(id);
      callback(time);
    });
    this.rafIds.add(id);
    return id;
  }

  /**
   * 清理所有资源
   * 应在组件的 disconnectedCallback 中调用
   */
  cleanup(): void {
    // 清理定时器
    this.timers.forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    this.timers.clear();

    // 清理事件监听器
    this.eventListeners.forEach(({ target, event, handler }) => {
      target.removeEventListener(event, handler);
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
   * 获取当前管理的资源统计
   * 用于调试和监控
   */
  getStats() {
    return {
      timers: this.timers.size,
      eventListeners: this.eventListeners.length,
      hasResizeObserver: !!this.resizeObserver,
      mutationObservers: this.mutationObservers.size,
      intersectionObservers: this.intersectionObservers.size,
      rafIds: this.rafIds.size,
    };
  }
}
