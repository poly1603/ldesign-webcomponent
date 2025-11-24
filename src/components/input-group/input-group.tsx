import { Component, Prop, h, Host, Element } from '@stencil/core';

/**
 * InputGroup 输入框组合
 * 用于组合多个输入控件
 */
@Component({
  tag: 'ldesign-input-group',
  styleUrl: 'input-group.less',
  shadow: true,
})
export class LdesignInputGroup {
  @Element() el!: HTMLElement;

  /**
   * 尺寸
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 紧凑模式（无间隙）
   */
  @Prop() compact: boolean = false;

  /**
   * 自定义类名
   */
  @Prop() customClass?: string;

  componentDidLoad() {
    // 为子元素添加尺寸属性
    this.updateChildrenSize();
  }

  componentDidUpdate() {
    this.updateChildrenSize();
  }

  /**
   * 更新子元素尺寸
   */
  private updateChildrenSize() {
    const slot = this.el.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    if (!slot) return;

    const children = slot.assignedElements();
    children.forEach((child: Element) => {
      // 为支持 size 属性的组件设置尺寸
      if (
        child.tagName.toLowerCase().startsWith('ldesign-') &&
        !child.hasAttribute('size')
      ) {
        child.setAttribute('size', this.size);
      }
    });
  }

  render() {
    return (
      <Host
        class={{
          'input-group': true,
          'input-group--compact': this.compact,
          [`input-group--${this.size}`]: true,
          [this.customClass || '']: !!this.customClass,
        }}
      >
        <slot />
      </Host>
    );
  }
}
