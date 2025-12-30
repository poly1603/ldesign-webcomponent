import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

/**
 * ErrorBoundary 错误边界组件
 * 捕获子组件中的错误，防止整个应用崩溃
 * 提供统一的错误处理和上报机制
 * 
 * @slot - 默认插槽，包裹需要错误保护的内容
 * @slot fallback - 自定义错误展示内容
 */
@Component({
  tag: 'ldesign-error-boundary',
  styleUrl: 'error-boundary.less',
  shadow: false,
})
export class LdesignErrorBoundary {
  /**
   * 是否显示错误详情（开发环境建议开启）
   */
  @Prop() showDetails: boolean = false;

  /**
   * 自定义错误标题
   */
  @Prop() errorTitle: string = '组件加载失败';

  /**
   * 自定义错误描述
   */
  @Prop() errorMessage: string = '抱歉，组件遇到了一些问题';

  /**
   * 是否显示重试按钮
   */
  @Prop() showRetry: boolean = true;

  /**
   * 重试按钮文本
   */
  @Prop() retryText: string = '重试';

  /**
   * 错误图标
   */
  @Prop() errorIcon: string = 'alert-circle';

  /**
   * 自动上报错误到监控系统
   */
  @Prop() autoReport: boolean = true;

  /**
   * 错误状态
   */
  @State() hasError: boolean = false;

  /**
   * 错误对象
   */
  @State() error?: Error;

  /**
   * 错误信息
   */
  @State() errorInfo?: string;

  /**
   * 错误发生时触发
   */
  @Event() ldesignError!: EventEmitter<{
    error: Error;
    errorInfo?: string;
  }>;

  /**
   * 重试时触发
   */
  @Event() ldesignRetry!: EventEmitter<void>;

  /**
   * 捕获错误（通过全局错误监听实现）
   */
  componentDidLoad() {
    // Stencil不支持原生的componentDidCatch
    // 使用全局错误监听作为替代方案
    this.setupErrorHandling();
  }

  disconnectedCallback() {
    this.cleanupErrorHandling();
  }

  private errorHandler?: (event: ErrorEvent) => void;
  private unhandledRejectionHandler?: (event: PromiseRejectionEvent) => void;

  private setupErrorHandling() {
    // 捕获JavaScript运行时错误
    this.errorHandler = (event: ErrorEvent) => {
      if (this.isErrorFromChildren(event.error)) {
        this.handleError(event.error, event.message);
        event.preventDefault();
      }
    };

    // 捕获Promise未处理的rejection
    this.unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      if (this.isErrorFromChildren(event.reason)) {
        const error = event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason));
        this.handleError(error, 'Unhandled Promise Rejection');
        event.preventDefault();
      }
    };

    window.addEventListener('error', this.errorHandler);
    window.addEventListener('unhandledrejection', this.unhandledRejectionHandler);
  }

  private cleanupErrorHandling() {
    if (this.errorHandler) {
      window.removeEventListener('error', this.errorHandler);
    }
    if (this.unhandledRejectionHandler) {
      window.removeEventListener('unhandledrejection', this.unhandledRejectionHandler);
    }
  }

  /**
   * 判断错误是否来自子组件
   */
  private isErrorFromChildren(error: any): boolean {
    // 简单判断：检查错误堆栈是否包含当前组件的子元素
    // 实际项目中可能需要更复杂的判断逻辑
    return true; // 简化实现
  }

  /**
   * 处理错误
   */
  private handleError(error: Error, info?: string) {
    this.hasError = true;
    this.error = error;
    this.errorInfo = info;

    // 触发错误事件
    this.ldesignError.emit({ error, errorInfo: info });

    // 自动上报错误
    if (this.autoReport) {
      this.reportError(error, info);
    }

    console.error('ErrorBoundary caught an error:', error, info);
  }

  /**
   * 上报错误到监控系统
   */
  private reportError(error: Error, info?: string) {
    // 集成错误监控服务（如Sentry、LogRocket等）
    if ((window as any).errorReporter) {
      (window as any).errorReporter.log({
        error,
        info,
        component: 'ldesign-error-boundary',
        timestamp: new Date().toISOString(),
      });
    }

    // 也可以发送到自己的后端API
    // fetch('/api/errors', {
    //   method: 'POST',
    //   body: JSON.stringify({ error: error.message, stack: error.stack, info }),
    // });
  }

  /**
   * 重试处理
   */
  private handleRetry = () => {
    this.hasError = false;
    this.error = undefined;
    this.errorInfo = undefined;
    this.ldesignRetry.emit();
  };

  /**
   * 渲染错误UI
   */
  private renderError() {
    // 检查是否有自定义fallback插槽
    const hasCustomFallback = !!this.el.querySelector('[slot="fallback"]');

    if (hasCustomFallback) {
      return <slot name="fallback" />;
    }

    // 默认错误UI
    return (
      <div class="ldesign-error-boundary">
        <div class="ldesign-error-boundary__container">
          <div class="ldesign-error-boundary__icon">
            <ldesign-icon name={this.errorIcon} size="large" />
          </div>
          <h3 class="ldesign-error-boundary__title">{this.errorTitle}</h3>
          <p class="ldesign-error-boundary__message">{this.errorMessage}</p>

          {this.showDetails && this.error && (
            <div class="ldesign-error-boundary__details">
              <p class="ldesign-error-boundary__error-name">
                <strong>错误类型：</strong>{this.error.name}
              </p>
              <p class="ldesign-error-boundary__error-message">
                <strong>错误信息：</strong>{this.error.message}
              </p>
              {this.error.stack && (
                <pre class="ldesign-error-boundary__stack">
                  <code>{this.error.stack}</code>
                </pre>
              )}
            </div>
          )}

          {this.showRetry && (
            <div class="ldesign-error-boundary__actions">
              <ldesign-button
                type="primary"
                onClick={this.handleRetry}
              >
                {this.retryText}
              </ldesign-button>
            </div>
          )}
        </div>
      </div>
    );
  }

  private el!: HTMLElement;

  render() {
    if (this.hasError) {
      return (
        <Host class="ldesign-error-boundary--error">
          {this.renderError()}
        </Host>
      );
    }

    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
