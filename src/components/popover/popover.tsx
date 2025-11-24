import { Component, Prop, State, Event, EventEmitter, h, Host, Element, Method, Watch } from '@stencil/core';
import { computePosition, flip, shift, offset, arrow, autoUpdate, Placement } from '@floating-ui/dom';

export type PopoverTrigger = 'hover' | 'click' | 'focus' | 'manual';
export type PopoverPlacement = Placement;

/**
 * Popover 气泡卡片
 * 比 Tooltip 更强大，支持复杂 HTML 内容和交互
 */
@Component({
  tag: 'ldesign-popover',
  styleUrl: 'popover.less',
  shadow: true,
})
export class LdesignPopover {
  @Element() el!: HTMLElement;

  /**
   * 是否显示
   */
  @Prop({ mutable: true, reflect: true }) visible: boolean = false;

  /**
   * 标题
   */
  @Prop() title?: string;

  /**
   * 内容（简单文本）
   */
  @Prop() content?: string;

  /**
   * 触发方式
   */
  @Prop() trigger: PopoverTrigger = 'hover';

  /**
   * 弹出位置
   */
  @Prop() placement: PopoverPlacement = 'top';

  /**
   * 是否显示箭头
   */
  @Prop() arrow: boolean = true;

  /**
   * 是否禁用
   */
  @Prop() disabled: boolean = false;

  /**
   * 偏移距离
   */
  @Prop() offset: number = 12;

  /**
   * 宽度
   */
  @Prop() width?: number | string;

  /**
   * 内容区域可交互（hover 触发时是否保持打开）
   */
  @Prop() interactive: boolean = true;

  /**
   * 点击外部关闭
   */
  @Prop() closeOnClickOutside: boolean = true;

  /**
   * 显示延迟（毫秒）
   */
  @Prop() showDelay: number = 100;

  /**
   * 隐藏延迟（毫秒）
   */
  @Prop() hideDelay: number = 100;

  /**
   * 显示/隐藏变化事件
   */
  @Event({ eventName: 'ldesignVisibleChange' }) ldesignVisibleChange!: EventEmitter<boolean>;

  @State() actualPlacement: Placement = 'top';

  private triggerElement?: HTMLElement;
  private popoverElement?: HTMLElement;
  private arrowElement?: HTMLElement;
  private cleanup?: () => void;
  private showTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private isHoveringTrigger = false;
  private isHoveringPopover = false;

  componentDidLoad() {
    this.setupTrigger();
  }

  disconnectedCallback() {
    this.clearTimers();
    this.cleanup?.();
    this.removeOutsideClickListener();
  }

  @Watch('visible')
  watchVisible(newValue: boolean) {
    if (newValue) {
      this.show();
    } else {
      this.hide();
    }
  }

  @Watch('trigger')
  watchTrigger() {
    this.setupTrigger();
  }

  /**
   * 设置触发器
   */
  private setupTrigger() {
    // 获取触发元素（默认插槽的第一个元素）
    const slot = this.el.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (slot) {
      const assignedElements = slot.assignedElements();
      this.triggerElement = assignedElements[0] as HTMLElement;
    }

    if (!this.triggerElement) return;

    // 移除旧的事件监听
    this.removeTriggerListeners();

    // 添加新的事件监听
    switch (this.trigger) {
      case 'hover':
        this.triggerElement.addEventListener('mouseenter', this.handleTriggerMouseEnter);
        this.triggerElement.addEventListener('mouseleave', this.handleTriggerMouseLeave);
        break;
      case 'click':
        this.triggerElement.addEventListener('click', this.handleTriggerClick);
        break;
      case 'focus':
        this.triggerElement.addEventListener('focus', this.handleTriggerFocus);
        this.triggerElement.addEventListener('blur', this.handleTriggerBlur);
        break;
    }
  }

  /**
   * 移除触发器监听
   */
  private removeTriggerListeners() {
    if (!this.triggerElement) return;

    this.triggerElement.removeEventListener('mouseenter', this.handleTriggerMouseEnter);
    this.triggerElement.removeEventListener('mouseleave', this.handleTriggerMouseLeave);
    this.triggerElement.removeEventListener('click', this.handleTriggerClick);
    this.triggerElement.removeEventListener('focus', this.handleTriggerFocus);
    this.triggerElement.removeEventListener('blur', this.handleTriggerBlur);
  }

  /**
   * 触发器鼠标进入
   */
  private handleTriggerMouseEnter = () => {
    if (this.disabled) return;
    this.isHoveringTrigger = true;
    this.clearHideTimer();
    this.showTimer = setTimeout(() => {
      this.showPopover();
    }, this.showDelay);
  };

  /**
   * 触发器鼠标离开
   */
  private handleTriggerMouseLeave = () => {
    this.isHoveringTrigger = false;
    this.clearShowTimer();

    if (!this.interactive) {
      this.hideTimer = setTimeout(() => {
        this.hidePopover();
      }, this.hideDelay);
    } else {
      // 交互模式：延迟检查是否悬停在 popover 上
      this.hideTimer = setTimeout(() => {
        if (!this.isHoveringPopover) {
          this.hidePopover();
        }
      }, this.hideDelay);
    }
  };

  /**
   * 触发器点击
   */
  private handleTriggerClick = (e: Event) => {
    e.stopPropagation();
    if (this.disabled) return;

    if (this.visible) {
      this.hidePopover();
    } else {
      this.showPopover();
    }
  };

  /**
   * 触发器获得焦点
   */
  private handleTriggerFocus = () => {
    if (this.disabled) return;
    this.showPopover();
  };

  /**
   * 触发器失去焦点
   */
  private handleTriggerBlur = () => {
    this.hidePopover();
  };

  /**
   * Popover 鼠标进入
   */
  private handlePopoverMouseEnter = () => {
    if (this.trigger !== 'hover' || !this.interactive) return;
    this.isHoveringPopover = true;
    this.clearHideTimer();
  };

  /**
   * Popover 鼠标离开
   */
  private handlePopoverMouseLeave = () => {
    if (this.trigger !== 'hover' || !this.interactive) return;
    this.isHoveringPopover = false;

    this.hideTimer = setTimeout(() => {
      if (!this.isHoveringTrigger) {
        this.hidePopover();
      }
    }, this.hideDelay);
  };

  /**
   * 显示 Popover
   */
  @Method()
  async show() {
    this.showPopover();
  }

  /**
   * 隐藏 Popover
   */
  @Method()
  async hide() {
    this.hidePopover();
  }

  /**
   * 切换显示/隐藏
   */
  @Method()
  async toggle() {
    if (this.visible) {
      this.hidePopover();
    } else {
      this.showPopover();
    }
  }

  private showPopover() {
    if (this.visible || this.disabled) return;

    this.visible = true;
    this.ldesignVisibleChange.emit(true);

    // 下一帧更新位置
    requestAnimationFrame(() => {
      this.updatePosition();

      if (this.closeOnClickOutside && this.trigger === 'click') {
        this.addOutsideClickListener();
      }
    });
  }

  private hidePopover() {
    if (!this.visible) return;

    this.visible = false;
    this.ldesignVisibleChange.emit(false);
    this.cleanup?.();
    this.removeOutsideClickListener();
  }

  /**
   * 更新位置
   */
  private async updatePosition() {
    if (!this.triggerElement || !this.popoverElement) return;

    const middleware = [
      offset(this.offset),
      flip(),
      shift({ padding: 8 }),
    ];

    if (this.arrow && this.arrowElement) {
      middleware.push(arrow({ element: this.arrowElement }));
    }

    const { x, y, placement, middlewareData } = await computePosition(
      this.triggerElement,
      this.popoverElement,
      {
        placement: this.placement,
        middleware,
      }
    );

    this.actualPlacement = placement;

    Object.assign(this.popoverElement.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    // 更新箭头位置
    if (this.arrow && this.arrowElement && middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      Object.assign(this.arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
      });
    }

    // 自动更新位置
    this.cleanup?.();
    this.cleanup = autoUpdate(
      this.triggerElement,
      this.popoverElement,
      () => this.updatePosition()
    );
  }

  /**
   * 外部点击处理
   */
  private handleOutsideClick = (e: Event) => {
    const target = e.target as HTMLElement;

    if (
      this.el.contains(target) ||
      this.popoverElement?.contains(target)
    ) {
      return;
    }

    this.hidePopover();
  };

  private addOutsideClickListener() {
    setTimeout(() => {
      document.addEventListener('click', this.handleOutsideClick);
    }, 0);
  }

  private removeOutsideClickListener() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  /**
   * 清除定时器
   */
  private clearTimers() {
    this.clearShowTimer();
    this.clearHideTimer();
  }

  private clearShowTimer() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
  }

  private clearHideTimer() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  /**
   * 渲染内容
   */
  private renderContent() {
    const hasContentSlot = this.el.querySelector('[slot="content"]');

    if (hasContentSlot) {
      return <slot name="content" />;
    }

    if (this.content) {
      return <div class="popover__text">{this.content}</div>;
    }

    return null;
  }

  render() {
    const widthStyle = this.width
      ? typeof this.width === 'number'
        ? `${this.width}px`
        : this.width
      : undefined;

    return (
      <Host
        class={{
          'popover': true,
          'popover--visible': this.visible,
        }}
      >
        {/* 触发器 */}
        <div class="popover__trigger">
          <slot />
        </div>

        {/* 弹出层 */}
        {this.visible && (
          <div
            ref={el => this.popoverElement = el}
            class={{
              'popover__content': true,
              [`popover__content--${this.actualPlacement}`]: true,
            }}
            style={{ width: widthStyle }}
            onMouseEnter={this.handlePopoverMouseEnter}
            onMouseLeave={this.handlePopoverMouseLeave}
          >
            {/* 标题 */}
            {this.title && (
              <div class="popover__title">{this.title}</div>
            )}

            {/* 内容区域 */}
            <div class="popover__body">
              {this.renderContent()}
            </div>

            {/* 箭头 */}
            {this.arrow && (
              <div
                ref={el => this.arrowElement = el}
                class="popover__arrow"
              />
            )}
          </div>
        )}
      </Host>
    );
  }
}
