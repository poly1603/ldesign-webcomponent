import { Component, Prop, State, Event, EventEmitter, h, Host, Element, Method, Watch } from '@stencil/core';
import { computePosition, flip, shift, offset as floatingOffset, autoUpdate } from '@floating-ui/dom';

export interface TreeSelectNode {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: TreeSelectNode[];
  icon?: string;
  [key: string]: any;
}

/**
 * TreeSelect 树选择
 * 类似 Select，但支持树形结构数据选择
 */
@Component({
  tag: 'ldesign-tree-select',
  styleUrl: 'tree-select.less',
  shadow: true,
})
export class LdesignTreeSelect {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) value?: string | number | (string | number)[];
  @Prop() treeData: TreeSelectNode[] = [];
  @Prop() placeholder: string = '请选择';
  @Prop() disabled: boolean = false;
  @Prop() clearable: boolean = false;
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() multiple: boolean = false;
  @Prop() searchable: boolean = false;
  @Prop() searchPlaceholder: string = '搜索...';
  @Prop() checkable: boolean = false;
  @Prop({ mutable: true }) expandedKeys: (string | number)[] = [];
  @Prop() defaultExpandAll: boolean = false;

  @State() visible: boolean = false;
  @State() searchKeyword: string = '';
  @State() filteredTreeData: TreeSelectNode[] = [];

  @Event({ eventName: 'ldesignChange' }) ldesignChange!: EventEmitter<any>;
  @Event({ eventName: 'ldesignClear' }) ldesignClear!: EventEmitter<void>;
  @Event({ eventName: 'ldesignSearch' }) ldesignSearch!: EventEmitter<string>;

  private inputElement?: HTMLElement;
  private dropdownElement?: HTMLElement;
  private cleanup?: () => void;
  private flatNodeMap: Map<string | number, TreeSelectNode> = new Map();

  componentWillLoad() {
    this.updateFilteredData();
    this.buildFlatNodeMap();
    if (this.defaultExpandAll) {
      this.expandAllNodes();
    }
  }

  componentDidLoad() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    this.cleanup?.();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  @Watch('treeData')
  watchTreeData() {
    this.buildFlatNodeMap();
    this.updateFilteredData();
  }

  @Watch('searchKeyword')
  watchSearchKeyword() {
    this.updateFilteredData();
  }

  private buildFlatNodeMap() {
    this.flatNodeMap.clear();
    const traverse = (nodes: TreeSelectNode[]) => {
      nodes.forEach(node => {
        this.flatNodeMap.set(node.value, node);
        if (node.children?.length) {
          traverse(node.children);
        }
      });
    };
    traverse(this.treeData);
  }

  private expandAllNodes() {
    const keys: (string | number)[] = [];
    const traverse = (nodes: TreeSelectNode[]) => {
      nodes.forEach(node => {
        if (node.children?.length) {
          keys.push(node.value);
          traverse(node.children);
        }
      });
    };
    traverse(this.treeData);
    this.expandedKeys = keys;
  }

  private updateFilteredData() {
    if (!this.searchKeyword) {
      this.filteredTreeData = this.treeData;
      return;
    }

    const keyword = this.searchKeyword.toLowerCase();
    const filterTree = (nodes: TreeSelectNode[]): TreeSelectNode[] => {
      return nodes.reduce((acc, node) => {
        const labelMatch = node.label.toLowerCase().includes(keyword);
        const filteredChildren = node.children ? filterTree(node.children) : [];

        if (labelMatch || filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren.length > 0 ? filteredChildren : node.children });
        }
        return acc;
      }, [] as TreeSelectNode[]);
    };

    this.filteredTreeData = filterTree(this.treeData);
  }

  @Method()
  async show() {
    if (this.disabled) return;
    this.visible = true;
    requestAnimationFrame(() => this.updatePosition());
  }

  @Method()
  async hide() {
    this.visible = false;
    this.searchKeyword = '';
    this.cleanup?.();
  }

  @Method()
  async clear() {
    this.value = this.multiple ? [] : undefined;
    this.ldesignChange.emit(this.value);
    this.ldesignClear.emit();
  }

  private async updatePosition() {
    if (!this.inputElement || !this.dropdownElement) return;

    const { x, y } = await computePosition(this.inputElement, this.dropdownElement, {
      placement: 'bottom-start',
      middleware: [floatingOffset(4), flip(), shift({ padding: 8 })],
    });

    Object.assign(this.dropdownElement.style, { left: `${x}px`, top: `${y}px` });
    this.cleanup?.();
    this.cleanup = autoUpdate(this.inputElement, this.dropdownElement, () => this.updatePosition());
  }

  private handleInputClick = (e: Event) => {
    e.stopPropagation();
    if (!this.disabled) {
      this.visible ? this.hide() : this.show();
    }
  };

  private handleOutsideClick = (e: Event) => {
    if (!this.el.contains(e.target as HTMLElement) && !this.dropdownElement?.contains(e.target as HTMLElement)) {
      this.hide();
    }
  };

  private handleClearClick = (e: Event) => {
    e.stopPropagation();
    this.clear();
  };

  private handleSearchInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.searchKeyword = input.value;
    this.ldesignSearch.emit(this.searchKeyword);
  };

  private handleNodeClick = (node: TreeSelectNode, e: Event) => {
    e.stopPropagation();
    if (node.disabled) return;

    if (this.multiple) {
      const values = Array.isArray(this.value) ? [...this.value] : [];
      const index = values.indexOf(node.value);
      if (index > -1) {
        values.splice(index, 1);
      } else {
        values.push(node.value);
      }
      this.value = values;
    } else {
      this.value = node.value;
      this.hide();
    }
    this.ldesignChange.emit(this.value);
  };

  private handleNodeExpand = (node: TreeSelectNode, e: Event) => {
    e.stopPropagation();
    const index = this.expandedKeys.indexOf(node.value);
    if (index > -1) {
      this.expandedKeys = this.expandedKeys.filter(key => key !== node.value);
    } else {
      this.expandedKeys = [...this.expandedKeys, node.value];
    }
  };

  private isNodeSelected(node: TreeSelectNode): boolean {
    if (this.multiple && Array.isArray(this.value)) {
      return this.value.includes(node.value);
    }
    return this.value === node.value;
  }

  private isNodeExpanded(node: TreeSelectNode): boolean {
    return this.expandedKeys.includes(node.value);
  }

  private getDisplayText(): string {
    if (!this.value) return '';
    if (this.multiple && Array.isArray(this.value)) {
      return this.value.map(val => this.flatNodeMap.get(val)?.label || val).join(', ');
    }
    const singleValue = Array.isArray(this.value) ? this.value[0] : this.value;
    return this.flatNodeMap.get(singleValue)?.label || String(singleValue);
  }

  private renderTreeNode = (node: TreeSelectNode, level: number = 0): any => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = this.isNodeExpanded(node);
    const isSelected = this.isNodeSelected(node);

    return [
      <div
        key={String(node.value)}
        class={{
          'tree-select__node': true,
          'tree-select__node--disabled': !!node.disabled,
          'tree-select__node--selected': isSelected,
        }}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
      >
        {hasChildren ? (
          <span
            class={{ 'tree-select__expand-icon': true, 'tree-select__expand-icon--expanded': isExpanded }}
            onClick={(e) => this.handleNodeExpand(node, e)}
          >
            ▶
          </span>
        ) : (
          <span class="tree-select__expand-icon tree-select__expand-icon--placeholder"></span>
        )}

        {this.multiple && this.checkable && (
          <input
            type="checkbox"
            class="tree-select__checkbox"
            checked={isSelected}
            disabled={node.disabled}
            onClick={(e) => this.handleNodeClick(node, e)}
          />
        )}

        {node.icon && <span class="tree-select__node-icon">{node.icon}</span>}

        <span class="tree-select__node-label" onClick={(e) => this.handleNodeClick(node, e)}>
          {node.label}
        </span>
      </div>,
      hasChildren && isExpanded && (
        <div key={`${node.value}-children`} class="tree-select__children">
          {node.children!.map(child => this.renderTreeNode(child, level + 1))}
        </div>
      )
    ];
  };

  render() {
    const displayText = this.getDisplayText();
    const showClear = this.clearable && displayText && !this.disabled;

    return (
      <Host class={{ 'tree-select': true, 'tree-select--disabled': this.disabled, [`tree-select--${this.size}`]: true }}>
        <div ref={el => this.inputElement = el} class={{ 'tree-select__input': true, 'tree-select__input--focused': this.visible }} onClick={this.handleInputClick}>
          <span class="tree-select__text">
            {displayText || <span class="tree-select__placeholder">{this.placeholder}</span>}
          </span>
          {showClear && <span class="tree-select__clear" onClick={this.handleClearClick}>✕</span>}
          <span class={{ 'tree-select__arrow': true, 'tree-select__arrow--open': this.visible }}>▼</span>
        </div>

        {this.visible && (
          <div ref={el => this.dropdownElement = el} class="tree-select__dropdown">
            {this.searchable && (
              <div class="tree-select__search">
                <input
                  type="text"
                  class="tree-select__search-input"
                  placeholder={this.searchPlaceholder}
                  value={this.searchKeyword}
                  onInput={this.handleSearchInput}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div class="tree-select__tree">
              {this.filteredTreeData.length > 0 ? (
                this.filteredTreeData.map(node => this.renderTreeNode(node))
              ) : (
                <div class="tree-select__empty">暂无数据</div>
              )}
            </div>
          </div>
        )}
      </Host>
    );
  }
}
