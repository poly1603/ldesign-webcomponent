import { Component, Prop, State, Event, EventEmitter, Method, h, Host } from '@stencil/core';

export interface TourStep {
  /** 目标元素选择器 */
  target: string | HTMLElement;
  /** 标题 */
  title: string;
  /** 描述 */
  description?: string;
  /** 位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 遮罩 */
  mask?: boolean;
}

/**
 * Tour 漫游式引导组件
 */
@Component({
  tag: 'ldesign-tour',
  styleUrl: 'tour.less',
  shadow: false,
})
export class LdesignTour {
  /**
   * 是否打开
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * 步骤配置
   */
  @Prop() steps: TourStep[] | string = [];

  /**
   * 当前步骤
   */
  @State() current: number = 0;

  /**
   * 当前目标元素位置
   */
  @State() targetRect?: DOMRect;

  /**
   * 关闭事件
   */
  @Event() ldesignClose!: EventEmitter<void>;

  /**
   * 步骤变化事件
   */
  @Event() ldesignStepChange!: EventEmitter<number>;

  /**
   * 完成事件
   */
  @Event() ldesignFinish!: EventEmitter<void>;

  private parsedSteps: TourStep[] = [];

  componentWillLoad(): void {
    this.parseSteps();
  }

  componentDidLoad(): void {
    if (this.open) {
      this.updateTargetPosition();
    }
  }

  /**
   * 解析步骤
   */
  private parseSteps(): void {
    this.parsedSteps = typeof this.steps === 'string'
      ? JSON.parse(this.steps)
      : this.steps;
  }

  /**
   * 更新目标元素位置
   */
  private updateTargetPosition(): void {
    const step = this.parsedSteps[this.current];
    if (!step) return;

    const target = typeof step.target === 'string'
      ? document.querySelector(step.target)
      : step.target;

    if (target) {
      this.targetRect = target.getBoundingClientRect();

      // 滚动到目标元素
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * 下一步
   */
  @Method()
  async next(): Promise<void> {
    if (this.current < this.parsedSteps.length - 1) {
      this.current++;
      this.ldesignStepChange.emit(this.current);
      this.updateTargetPosition();
    } else {
      this.finish();
    }
  }

  /**
   * 上一步
   */
  @Method()
  async prev(): Promise<void> {
    if (this.current > 0) {
      this.current--;
      this.ldesignStepChange.emit(this.current);
      this.updateTargetPosition();
    }
  }

  /**
   * 跳到指定步骤
   */
  @Method()
  async goTo(index: number): Promise<void> {
    if (index >= 0 && index < this.parsedSteps.length) {
      this.current = index;
      this.ldesignStepChange.emit(this.current);
      this.updateTargetPosition();
    }
  }

  /**
   * 关闭引导
   */
  @Method()
  async close(): Promise<void> {
    this.open = false;
    this.current = 0;
    this.ldesignClose.emit();
  }

  /**
   * 完成引导
   */
  private async finish(): Promise<void> {
    this.ldesignFinish.emit();
    this.close();
  }

  /**
   * 渲染遮罩高亮
   */
  private renderMask(): any {
    if (!this.targetRect) return null;

    const step = this.parsedSteps[this.current];
    if (step.mask === false) return null;

    const padding = 8;
    const maskStyle = {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.45)',
      zIndex: '1000',
    };

    const holeStyle = {
      position: 'absolute' as const,
      top: `${this.targetRect.top - padding}px`,
      left: `${this.targetRect.left - padding}px`,
      width: `${this.targetRect.width + padding * 2}px`,
      height: `${this.targetRect.height + padding * 2}px`,
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45)',
      borderRadius: '4px',
    };

    return (
      <div style={maskStyle} onClick={() => this.close()}>
        <div style={holeStyle} />
      </div>
    );
  }

  /**
   * 渲染弹窗
   */
  private renderPopover(): any {
    if (!this.targetRect) return null;

    const step = this.parsedSteps[this.current];
    const placement = step.placement || 'bottom';

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = this.targetRect.top - 16;
        left = this.targetRect.left + this.targetRect.width / 2;
        break;
      case 'bottom':
        top = this.targetRect.bottom + 16;
        left = this.targetRect.left + this.targetRect.width / 2;
        break;
      case 'left':
        top = this.targetRect.top + this.targetRect.height / 2;
        left = this.targetRect.left - 16;
        break;
      case 'right':
        top = this.targetRect.top + this.targetRect.height / 2;
        left = this.targetRect.right + 16;
        break;
    }

    const popoverStyle = {
      position: 'fixed' as const,
      top: `${top}px`,
      left: `${left}px`,
      transform: placement === 'left' || placement === 'right'
        ? 'translateY(-50%)'
        : 'translateX(-50%)',
      zIndex: '1001',
    };

    return (
      <div class="ldesign-tour__popover" style={popoverStyle}>
        <div class="ldesign-tour__content">
          <div class="ldesign-tour__header">
            <span class="ldesign-tour__title">{step.title}</span>
            <ldesign-icon
              name="x"
              class="ldesign-tour__close"
              onClick={() => this.close()}
            />
          </div>
          {step.description && (
            <div class="ldesign-tour__description">{step.description}</div>
          )}
          <div class="ldesign-tour__footer">
            <div class="ldesign-tour__indicators">
              {this.current + 1} / {this.parsedSteps.length}
            </div>
            <div class="ldesign-tour__actions">
              {this.current > 0 && (
                <ldesign-button size="small" onClick={() => this.prev()}>
                  上一步
                </ldesign-button>
              )}
              <ldesign-button
                type="primary"
                size="small"
                onClick={() => this.next()}
              >
                {this.current === this.parsedSteps.length - 1 ? '完成' : '下一步'}
              </ldesign-button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render(): any {
    if (!this.open) return null;

    return (
      <Host class="ldesign-tour">
        {this.renderMask()}
        {this.renderPopover()}
      </Host>
    );
  }
}



