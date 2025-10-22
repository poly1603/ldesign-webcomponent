/**
 * 虚拟滚动工具类
 * 用于优化长列表性能
 */

export interface VirtualScrollOptions {
  /**
   * 列表项总数
   */
  total: number;

  /**
   * 每项的高度（固定高度）
   */
  itemHeight?: number;

  /**
   * 容器高度
   */
  containerHeight: number;

  /**
   * 缓冲区项目数（渲染可见区域外的项目数）
   */
  buffer?: number;

  /**
   * 获取项目高度的函数（用于动态高度）
   */
  getItemHeight?: (index: number) => number;

  /**
   * 滚动回调
   */
  onScroll?: (range: VirtualScrollRange) => void;
}

export interface VirtualScrollRange {
  /**
   * 起始索引
   */
  start: number;

  /**
   * 结束索引
   */
  end: number;

  /**
   * 偏移量
   */
  offset: number;
}

export class VirtualScroll {
  private options: Required<VirtualScrollOptions>;
  private scrollTop: number = 0;
  private cachedHeights: Map<number, number> = new Map();

  constructor(options: VirtualScrollOptions) {
    this.options = {
      itemHeight: options.itemHeight || 50,
      buffer: options.buffer || 3,
      getItemHeight: options.getItemHeight || ((index) => this.options.itemHeight),
      onScroll: options.onScroll || (() => { }),
      ...options,
    };
  }

  /**
   * 更新滚动位置
   */
  public updateScroll(scrollTop: number): VirtualScrollRange {
    this.scrollTop = scrollTop;
    return this.calculateRange();
  }

  /**
   * 计算可见范围
   */
  private calculateRange(): VirtualScrollRange {
    const { total, containerHeight, buffer, getItemHeight } = this.options;

    let start = 0;
    let offset = 0;
    let currentHeight = 0;

    // 找到起始索引
    for (let i = 0; i < total; i++) {
      const itemHeight = this.getOrCacheHeight(i);
      if (currentHeight + itemHeight > this.scrollTop) {
        start = Math.max(0, i - buffer);
        offset = this.calculateOffset(start);
        break;
      }
      currentHeight += itemHeight;
    }

    // 找到结束索引
    let end = start;
    let visibleHeight = 0;
    const targetHeight = containerHeight + buffer * this.options.itemHeight;

    for (let i = start; i < total; i++) {
      const itemHeight = this.getOrCacheHeight(i);
      visibleHeight += itemHeight;
      if (visibleHeight >= targetHeight) {
        end = Math.min(total - 1, i + buffer);
        break;
      }
      end = i;
    }

    const range = { start, end, offset };
    this.options.onScroll(range);
    return range;
  }

  /**
   * 计算偏移量
   */
  private calculateOffset(index: number): number {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += this.getOrCacheHeight(i);
    }
    return offset;
  }

  /**
   * 获取或缓存项目高度
   */
  private getOrCacheHeight(index: number): number {
    if (this.cachedHeights.has(index)) {
      return this.cachedHeights.get(index)!;
    }

    const height = this.options.getItemHeight(index);
    this.cachedHeights.set(index, height);
    return height;
  }

  /**
   * 获取总高度
   */
  public getTotalHeight(): number {
    let total = 0;
    for (let i = 0; i < this.options.total; i++) {
      total += this.getOrCacheHeight(i);
    }
    return total;
  }

  /**
   * 更新配置
   */
  public updateOptions(options: Partial<VirtualScrollOptions>): void {
    Object.assign(this.options, options);
    if (options.total !== undefined) {
      this.cachedHeights.clear();
    }
  }

  /**
   * 清除缓存
   */
  public clearCache(): void {
    this.cachedHeights.clear();
  }

  /**
   * 滚动到指定索引
   */
  public scrollToIndex(index: number): number {
    return this.calculateOffset(index);
  }
}

/**
 * 创建虚拟滚动实例
 */
export function createVirtualScroll(options: VirtualScrollOptions): VirtualScroll {
  return new VirtualScroll(options);
}




