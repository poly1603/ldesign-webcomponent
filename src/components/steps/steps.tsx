import { Component, Prop, State, h, Host } from '@stencil/core';

/**
 * Steps 步骤条组件
 */
@Component({
  tag: 'ldesign-steps',
  styleUrl: 'steps.less',
  shadow: false,
})
export class LdesignSteps {
  /**
   * 当前步骤
   */
  @Prop() current: number = 0;

  /**
   * 步骤条方向
   */
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * 步骤条尺寸
   */
  @Prop() size: 'small' | 'default' = 'default';

  /**
   * 当前步骤的状态
   */
  @Prop() status: 'wait' | 'process' | 'finish' | 'error' = 'process';

  render(): any {
    const classes = {
      'ldesign-steps': true,
      [`ldesign-steps--${this.direction}`]: true,
      [`ldesign-steps--${this.size}`]: true,
    };

    return (
      <Host class={classes}>
        <slot />
      </Host>
    );
  }
}

/**
 * StepItem 步骤项
 */
@Component({
  tag: 'ldesign-step-item',
  styleUrl: 'steps.less',
  shadow: false,
})
export class LdesignStepItem {
  /**
   * 标题
   */
  @Prop() title!: string;

  /**
   * 描述
   */
  @Prop() description?: string;

  /**
   * 图标
   */
  @Prop() icon?: string;

  /**
   * 状态
   */
  @State() status: 'wait' | 'process' | 'finish' | 'error' = 'wait';

  /**
   * 步骤索引
   */
  @State() index: number = 0;

  componentWillLoad(): void {
    const steps = (this as any).el.closest('ldesign-steps');
    if (steps) {
      const items = Array.from(steps.querySelectorAll('ldesign-step-item'));
      this.index = items.indexOf((this as any).el);

      if (this.index < steps.current) {
        this.status = 'finish';
      } else if (this.index === steps.current) {
        this.status = steps.status || 'process';
      } else {
        this.status = 'wait';
      }
    }
  }

  render(): any {
    const classes = {
      'ldesign-step-item': true,
      [`ldesign-step-item--${this.status}`]: true,
    };

    return (
      <Host class={classes}>
        <div class="ldesign-step-item__container">
          <div class="ldesign-step-item__icon">
            {this.icon ? (
              <ldesign-icon name={this.icon} />
            ) : this.status === 'finish' ? (
              <ldesign-icon name="check" />
            ) : this.status === 'error' ? (
              <ldesign-icon name="x" />
            ) : (
              <span class="ldesign-step-item__number">{this.index + 1}</span>
            )}
          </div>
          <div class="ldesign-step-item__content">
            <div class="ldesign-step-item__title">{this.title}</div>
            {this.description && (
              <div class="ldesign-step-item__description">{this.description}</div>
            )}
          </div>
        </div>
        <div class="ldesign-step-item__tail" />
      </Host>
    );
  }
}



