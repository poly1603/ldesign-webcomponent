import { Component, Prop, State, Element, h, Host, Watch } from '@stencil/core';
import { createVirtualScroll, VirtualScrollRange } from '../../utils/virtual-scroll';

/**
 * VirtualList 虚拟列表组件
 * 高性能长列表渲染，仅渲染可见区域的项目
 * 
 * @slot - 列表项内容（通过 renderItem 属性渲染）
 */
@Component({
  tag: 'ldesign-virtual-list',
  styleUrl: 'virtual-list.less',
  shadow: false,
})
export class LdesignVirtualList {
  @Element() el!: HTMLElement;

  /**
   * 列表项数据
   */
  @Prop() items: any[] = [];

  /**
   * 列表项高度（固定高度模式）
   */
  @Prop() itemHeight: number = 50;

  /**
   * 容器高度
   */
  @Prop() height: number | string = 400;

  /**
   * 缓冲区项目数（渲染可见区域外的额外项目数）
   */
  @Prop() buffer: number = 3;

  /**
   * 渲染项目的函数
   */
  @Prop() renderItem!: (item: any, index: number) => any;

  /**
   * 获取项目高度的函数（动态高度模式）
   */
  @Prop() getItemHeight?: (index: number) => number;

  /**
   * 获取项目的唯一key
   */
  @Prop() getItemKey?: (item: any, index: number) => string | number;

  /**
   * 水平模式
   */
  @Prop() horizontal: boolean = false;

  /**
   * 当前可见范围
   */
  @State() visibleRange: VirtualScrollRange = {
    start: 0,
    end: 0,
    offset: 0,
  };

  private virtualScroll: ReturnType<typeof createVirtualScroll> | null = null;
  private containerRef?: HTMLDivElement;
  private scrollHandler?: () => void;

  componentWillLoad(): void {
    this.initVirtualScroll();
  }

  componentDidLoad(): void {
    this.attachScrollListener();
  }

  disconnectedCallback(): void {
    this.detachScrollListener();
  }

  @Watch('items')
  @Watch('itemHeight')
  @Watch('height')
  watchProps(): void {
    this.initVirtualScroll();
    this.updateVisibleRange();
  }

  /**
   * 初始化虚拟滚动
   */
  private initVirtualScroll(): void {
    const containerHeight = typeof this.height === 'number'
      ? this.height
      : parseInt(this.height as string, 10);

    this.virtualScroll = createVirtualScroll({
      total: this.items.length,
      itemHeight: this.itemHeight,
      containerHeight,
      buffer: this.buffer,
      getItemHeight: this.getItemHeight,
      onScroll: (range) => {
        this.visibleRange = range;
      },
    });

    this.updateVisibleRange();
  }

  /**
   * 更新可见范围
   */
  private updateVisibleRange(): void {
    if (!this.virtualScroll || !this.containerRef) return;

    const scrollTop = this.containerRef.scrollTop;
    this.visibleRange = this.virtualScroll.updateScroll(scrollTop);
  }

  /**
   * 添加滚动监听
   */
  private attachScrollListener(): void {
    if (!this.containerRef) return;

    this.scrollHandler = () => {
      requestAnimationFrame(() => {
        this.updateVisibleRange();
      });
    };

    this.containerRef.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  /**
   * 移除滚动监听
   */
  private detachScrollListener(): void {
    if (this.containerRef && this.scrollHandler) {
      this.containerRef.removeEventListener('scroll', this.scrollHandler);
    }
  }

  /**
   * 滚动到指定索引
   */
  public scrollToIndex(index: number): void {
    if (!this.virtualScroll || !this.containerRef) return;

    const scrollTop = this.virtualScroll.scrollToIndex(index);
    this.containerRef.scrollTop = scrollTop;
  }

  /**
   * 渲染列表项
   */
  private renderItems(): any[] {
    const { start, end } = this.visibleRange;
    const items: any[] = [];

    for (let i = start; i <= end && i < this.items.length; i++) {
      const item = this.items[i];
      const key = this.getItemKey ? this.getItemKey(item, i) : i;

      items.push(
        <div
          key={key}
          class="ldesign-virtual-list__item"
          data-index={i}
          style={{
            height: `${this.getItemHeight ? this.getItemHeight(i) : this.itemHeight}px`,
          }}
        >
          {this.renderItem(item, i)}
        </div>
      );
    }

    return items;
  }

  render(): any {
    const totalHeight = this.virtualScroll ? this.virtualScroll.getTotalHeight() : 0;
    const containerStyle = {
      height: typeof this.height === 'number' ? `${this.height}px` : this.height,
      overflow: 'auto',
      position: 'relative' as const,
    };

    const spacerStyle = {
      height: `${totalHeight}px`,
      position: 'relative' as const,
    };

    const contentStyle = {
      transform: `translateY(${this.visibleRange.offset}px)`,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
    };

    return (
      <Host class="ldesign-virtual-list">
        <div
          ref={(el) => (this.containerRef = el)}
          class="ldesign-virtual-list__container"
          style={containerStyle}
        >
          <div class="ldesign-virtual-list__spacer" style={spacerStyle}>
            <div class="ldesign-virtual-list__content" style={contentStyle}>
              {this.renderItems()}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}




