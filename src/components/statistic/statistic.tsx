import { Component, Prop, State, Watch, h, Host } from '@stencil/core';
import { ResourceManager } from '../../utils/resource-manager';

/**
 * Statistic 统计数值组件
 * 展示统计数值，支持动画效果
 */
@Component({
  tag: 'ldesign-statistic',
  styleUrl: 'statistic.less',
  shadow: false,
})
export class LdesignStatistic {
  /**
   * 数值
   */
  @Prop() value!: number;

  /**
   * 标题
   */
  @Prop() title?: string;

  /**
   * 前缀
   */
  @Prop() prefix?: string;

  /**
   * 后缀
   */
  @Prop() suffix?: string;

  /**
   * 精度（小数位数）
   */
  @Prop() precision: number = 0;

  /**
   * 千分位分隔符
   */
  @Prop() separator: string = ',';

  /**
   * 小数点
   */
  @Prop() decimalSeparator: string = '.';

  /**
   * 是否启用数字动画
   */
  @Prop() animated: boolean = false;

  /**
   * 动画持续时间（毫秒）
   */
  @Prop() duration: number = 1000;

  /**
   * 数值颜色
   */
  @Prop() valueColor?: string;

  /**
   * 显示的数值（用于动画）
   */
  @State() displayValue: number = 0;

  private animationFrame?: number;
  private startTime?: number;
  private startValue: number = 0;
  private resources = new ResourceManager();

  componentDidLoad(): void {
    if (this.animated) {
      this.animateValue(0, this.value);
    } else {
      this.displayValue = this.value;
    }
  }

  @Watch('value')
  watchValue(newValue: number, oldValue: number): void {
    if (this.animated) {
      this.animateValue(oldValue || 0, newValue);
    } else {
      this.displayValue = newValue;
    }
  }

  disconnectedCallback(): void {
    this.resources.cleanup();
  }

  /**
   * 数值动画
   */
  private animateValue(from: number, to: number): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }

    this.startValue = from;
    this.startTime = performance.now();

    const animate = (currentTime: number): void => {
      if (!this.startTime) return;

      const elapsed = currentTime - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // 使用 easeOutQuart 缓动函数
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      this.displayValue = this.startValue + (to - this.startValue) * easeProgress;

      if (progress < 1) {
        this.animationFrame = this.resources.addSafeRAF(animate);
      } else {
        this.displayValue = to;
        this.animationFrame = undefined;
      }
    };

    this.animationFrame = this.resources.addSafeRAF(animate);
  }

  /**
   * 格式化数值
   */
  private formatValue(value: number): string {
    const fixed = value.toFixed(this.precision);
    const [integer, decimal] = fixed.split('.');

    // 添加千分位分隔符
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);

    return decimal
      ? `${formattedInteger}${this.decimalSeparator}${decimal}`
      : formattedInteger;
  }

  render(): any {
    const valueStyle = this.valueColor ? { color: this.valueColor } : {};

    return (
      <Host class="ldesign-statistic">
        {this.title && (
          <div class="ldesign-statistic__title">{this.title}</div>
        )}
        <div class="ldesign-statistic__content">
          {this.prefix && (
            <span class="ldesign-statistic__prefix">{this.prefix}</span>
          )}
          <span class="ldesign-statistic__value" style={valueStyle}>
            {this.formatValue(this.displayValue)}
          </span>
          {this.suffix && (
            <span class="ldesign-statistic__suffix">{this.suffix}</span>
          )}
        </div>
      </Host>
    );
  }
}



