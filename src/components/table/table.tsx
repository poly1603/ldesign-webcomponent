import { Component, Prop, State, Element, Event, EventEmitter, h, Host, Watch } from '@stencil/core';
import { createVirtualScroll, VirtualScrollRange } from '../../utils/virtual-scroll';

export interface TableColumn {
  /** 列键值 */
  key: string;
  /** 列标题 */
  title: string;
  /** 列宽度 */
  width?: number | string;
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可筛选 */
  filterable?: boolean;
  /** 固定列 */
  fixed?: 'left' | 'right';
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 自定义渲染函数 */
  render?: (value: any, row: any, index: number) => any;
}

export interface TableSort {
  key: string;
  order: 'asc' | 'desc';
}

/**
 * Table 高性能数据表格组件
 * 支持虚拟滚动、排序、筛选、固定列/表头
 */
@Component({
  tag: 'ldesign-table',
  styleUrl: 'table.less',
  shadow: false,
})
export class LdesignTable {
  @Element() el!: HTMLElement;

  /**
   * 表格列配置
   */
  @Prop() columns: TableColumn[] | string = [];

  /**
   * 表格数据
   */
  @Prop() dataSource: any[] | string = [];

  /**
   * 行键值字段
   */
  @Prop() rowKey: string = 'id';

  /**
   * 是否显示边框
   */
  @Prop() bordered: boolean = false;

  /**
   * 是否显示斑马纹
   */
  @Prop() striped: boolean = false;

  /**
   * 表格大小
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 是否启用虚拟滚动
   */
  @Prop() virtual: boolean = false;

  /**
   * 行高（用于虚拟滚动）
   */
  @Prop() rowHeight: number = 48;

  /**
   * 表格高度（启用虚拟滚动时必须指定）
   */
  @Prop() height?: number | string;

  /**
   * 是否显示表头
   */
  @Prop() showHeader: boolean = true;

  /**
   * 是否允许hover高亮
   */
  @Prop() hoverable: boolean = true;

  /**
   * 是否加载中
   */
  @Prop() loading: boolean = false;

  /**
   * 空数据提示文字
   */
  @Prop() emptyText: string = '暂无数据';

  /**
   * 当前排序
   */
  @State() currentSort?: TableSort;

  /**
   * 可见范围（虚拟滚动）
   */
  @State() visibleRange: VirtualScrollRange = {
    start: 0,
    end: 0,
    offset: 0,
  };

  /**
   * 排序变化事件
   */
  @Event() ldesignSort!: EventEmitter<TableSort>;

  /**
   * 行点击事件
   */
  @Event() ldesignRowClick!: EventEmitter<{ row: any; index: number }>;

  private virtualScroll: ReturnType<typeof createVirtualScroll> | null = null;
  private scrollContainerRef?: HTMLDivElement;
  private parsedColumns: TableColumn[] = [];
  private parsedData: any[] = [];

  componentWillLoad(): void {
    this.parseProps();
    if (this.virtual && this.height) {
      this.initVirtualScroll();
    }
  }

  @Watch('columns')
  @Watch('dataSource')
  watchProps(): void {
    this.parseProps();
    if (this.virtual && this.virtualScroll) {
      this.virtualScroll.updateOptions({ total: this.parsedData.length });
      this.updateVisibleRange();
    }
  }

  /**
   * 解析 Props（支持 JSON 字符串）
   */
  private parseProps(): void {
    this.parsedColumns = typeof this.columns === 'string'
      ? JSON.parse(this.columns)
      : this.columns;

    this.parsedData = typeof this.dataSource === 'string'
      ? JSON.parse(this.dataSource)
      : this.dataSource;
  }

  /**
   * 初始化虚拟滚动
   */
  private initVirtualScroll(): void {
    if (!this.height) return;

    const containerHeight = typeof this.height === 'number'
      ? this.height
      : parseInt(this.height as string, 10);

    this.virtualScroll = createVirtualScroll({
      total: this.parsedData.length,
      itemHeight: this.rowHeight,
      containerHeight,
      buffer: 3,
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
    if (!this.virtualScroll || !this.scrollContainerRef) return;

    const scrollTop = this.scrollContainerRef.scrollTop;
    this.visibleRange = this.virtualScroll.updateScroll(scrollTop);
  }

  /**
   * 处理滚动
   */
  private handleScroll = (): void => {
    if (this.virtual) {
      requestAnimationFrame(() => {
        this.updateVisibleRange();
      });
    }
  };

  /**
   * 处理排序
   */
  private handleSort(column: TableColumn): void {
    if (!column.sortable) return;

    let order: 'asc' | 'desc' = 'asc';
    if (this.currentSort && this.currentSort.key === column.key) {
      order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    }

    this.currentSort = { key: column.key, order };
    this.ldesignSort.emit(this.currentSort);
  }

  /**
   * 处理行点击
   */
  private handleRowClick(row: any, index: number): void {
    this.ldesignRowClick.emit({ row, index });
  }

  /**
   * 渲染表头
   */
  private renderHeader(): any {
    if (!this.showHeader) return null;

    return (
      <thead class="ldesign-table__header">
        <tr>
          {this.parsedColumns.map((column) => (
            <th
              key={column.key}
              class={{
                'ldesign-table__cell': true,
                'ldesign-table__cell--sortable': !!column.sortable,
                'ldesign-table__cell--sorted': this.currentSort?.key === column.key,
                [`ldesign-table__cell--align-${column.align || 'left'}`]: true,
              }}
              style={{
                width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : undefined,
              }}
              onClick={() => column.sortable && this.handleSort(column)}
            >
              <div class="ldesign-table__cell-content">
                <span>{column.title}</span>
                {column.sortable && (
                  <span class="ldesign-table__sort-icon">
                    <ldesign-icon
                      name={
                        this.currentSort?.key === column.key
                          ? this.currentSort.order === 'asc'
                            ? 'arrow-up'
                            : 'arrow-down'
                          : 'arrow-up-down'
                      }
                      size="small"
                    />
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  /**
   * 渲染表体
   */
  private renderBody(): any {
    if (this.parsedData.length === 0) {
      return (
        <tbody class="ldesign-table__body ldesign-table__body--empty">
          <tr>
            <td colSpan={this.parsedColumns.length} class="ldesign-table__empty">
              {this.emptyText}
            </td>
          </tr>
        </tbody>
      );
    }

    const { start, end } = this.virtual ? this.visibleRange : { start: 0, end: this.parsedData.length - 1 };
    const rows: any[] = [];

    for (let i = start; i <= end && i < this.parsedData.length; i++) {
      const row = this.parsedData[i];
      const rowKeyValue = row[this.rowKey] || i;

      rows.push(
        <tr
          key={rowKeyValue}
          class="ldesign-table__row"
          onClick={() => this.handleRowClick(row, i)}
        >
          {this.parsedColumns.map((column) => {
            const value = row[column.key];
            const content = column.render ? column.render(value, row, i) : value;

            return (
              <td
                key={column.key}
                class={{
                  'ldesign-table__cell': true,
                  [`ldesign-table__cell--align-${column.align || 'left'}`]: true,
                }}
              >
                {content}
              </td>
            );
          })}
        </tr>
      );
    }

    return (
      <tbody class="ldesign-table__body">
        {rows}
      </tbody>
    );
  }

  render(): any {
    const classes = {
      'ldesign-table': true,
      'ldesign-table--bordered': this.bordered,
      'ldesign-table--striped': this.striped,
      'ldesign-table--hoverable': this.hoverable,
      'ldesign-table--loading': this.loading,
      'ldesign-table--virtual': this.virtual,
      [`ldesign-table--${this.size}`]: true,
    };

    const containerStyle = this.height
      ? {
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
        overflow: 'auto',
      }
      : undefined;

    return (
      <Host class={classes}>
        {this.loading && (
          <div class="ldesign-table__loading">
            <ldesign-loading />
          </div>
        )}
        <div
          ref={(el) => (this.scrollContainerRef = el)}
          class="ldesign-table__container"
          style={containerStyle}
          onScroll={this.handleScroll}
        >
          <table class="ldesign-table__inner">
            {this.renderHeader()}
            {this.renderBody()}
          </table>
        </div>
      </Host>
    );
  }
}




