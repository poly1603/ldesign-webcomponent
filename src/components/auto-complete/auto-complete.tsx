import { Component, Prop, State, Event, EventEmitter, Method, h, Host, Watch, Element, Listen } from '@stencil/core';
import { debounce } from '../../utils';

export interface AutoCompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any;
}

/**
 * AutoComplete 自动完成组件
 * 用于输入建议、搜索框等场景
 */
@Component({
  tag: 'ldesign-auto-complete',
  styleUrl: 'auto-complete.less',
  shadow: true,
})
export class LdesignAutoComplete {
  @Element() el!: HTMLElement;

  /**
   * 输入值
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * 占位符
   */
  @Prop() placeholder: string = '请输入';

  /**
   * 选项数据
   */
  @Prop() options: AutoCompleteOption[] = [];

  /**
   * 是否禁用
   */
  @Prop() disabled: boolean = false;

  /**
   * 是否允许清空
   */
  @Prop() clearable: boolean = true;

  /**
   * 尺寸
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 是否开启本地过滤
   */
  @Prop() filterOption: boolean = true;

  /**
   * 防抖延迟（毫秒）
   */
  @Prop() debounceTime: number = 300;

  /**
   * 最大显示选项数
   */
  @Prop() maxOptions: number = 50;

  /**
   * 是否高亮匹配文本
   */
  @Prop() highlightMatch: boolean = true;

  /**
   * 面板是否显示
   */
  @State() visible: boolean = false;

  /**
   * 过滤后的选项
   */
  @State() filteredOptions: AutoCompleteOption[] = [];

  /**
   * 当前激活的选项索引
   */
  @State() activeIndex: number = -1;

  /**
   * 是否正在加载
   */
  @State() loading: boolean = false;

  /**
   * 输入变化事件
   */
  @Event({ eventName: 'ldesignInput' }) ldesignInput!: EventEmitter<string>;

  /**
   * 搜索事件（用于远程搜索）
   */
  @Event({ eventName: 'ldesignSearch' }) ldesignSearch!: EventEmitter<string>;

  /**
   * 选择事件
   */
  @Event({ eventName: 'ldesignSelect' }) ldesignSelect!: EventEmitter<AutoCompleteOption>;

  /**
   * 清空事件
   */
  @Event({ eventName: 'ldesignClear' }) ldesignClear!: EventEmitter<void>;

  /**
   * 焦点事件
   */
  @Event({ eventName: 'ldesignFocus' }) ldesignFocus!: EventEmitter<void>;

  /**
   * 失焦事件
   */
  @Event({ eventName: 'ldesignBlur' }) ldesignBlur!: EventEmitter<void>;

  private inputRef?: HTMLInputElement;
  private dropdownRef?: HTMLDivElement;
  private debouncedSearch: (value: string) => void;

  constructor() {
    this.debouncedSearch = debounce((value: string) => {
      this.ldesignSearch.emit(value);
    }, this.debounceTime);
  }

  componentWillLoad() {
    this.updateFilteredOptions();
  }

  @Watch('options')
  watchOptions() {
    this.updateFilteredOptions();
  }

  @Watch('value')
  watchValue() {
    this.updateFilteredOptions();
  }

  /**
   * 更新过滤后的选项
   */
  private updateFilteredOptions() {
    if (!this.filterOption || !this.value) {
      this.filteredOptions = this.options.slice(0, this.maxOptions);
      return;
    }

    const searchValue = this.value.toLowerCase();
    this.filteredOptions = this.options
      .filter(option => option.label.toLowerCase().includes(searchValue))
      .slice(0, this.maxOptions);
  }

  /**
   * 处理输入
   */
  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.value = value;
    this.visible = true;
    this.activeIndex = -1;

    this.ldesignInput.emit(value);
    this.debouncedSearch(value);

    if (this.filterOption) {
      this.updateFilteredOptions();
    }
  };

  /**
   * 处理焦点
   */
  private handleFocus = () => {
    this.visible = true;
    this.ldesignFocus.emit();
  };

  /**
   * 处理失焦
   */
  private handleBlur = () => {
    // 延迟关闭，以便点击选项时不会立即关闭
    setTimeout(() => {
      this.visible = false;
      this.ldesignBlur.emit();
    }, 200);
  };

  /**
   * 处理选择
   */
  private handleSelect = (option: AutoCompleteOption) => {
    if (option.disabled) return;

    this.value = option.label;
    this.visible = false;
    this.activeIndex = -1;

    this.ldesignSelect.emit(option);

    // 更新输入框值
    if (this.inputRef) {
      this.inputRef.value = option.label;
    }
  };

  /**
   * 处理清空
   */
  private handleClear = (event: Event) => {
    event.stopPropagation();

    this.value = '';
    this.visible = false;
    this.activeIndex = -1;

    if (this.inputRef) {
      this.inputRef.value = '';
      this.inputRef.focus();
    }

    this.ldesignClear.emit();
    this.updateFilteredOptions();
  };

  /**
   * 处理键盘事件
   */
  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (!this.visible) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex = Math.min(this.activeIndex + 1, this.filteredOptions.length - 1);
        this.scrollToActiveOption();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        this.scrollToActiveOption();
        break;

      case 'Enter':
        event.preventDefault();
        if (this.activeIndex >= 0 && this.filteredOptions[this.activeIndex]) {
          this.handleSelect(this.filteredOptions[this.activeIndex]);
        }
        break;

      case 'Escape':
        this.visible = false;
        this.activeIndex = -1;
        break;
    }
  }

  /**
   * 滚动到激活的选项
   */
  private scrollToActiveOption() {
    if (!this.dropdownRef || this.activeIndex < 0) return;

    const activeOption = this.dropdownRef.querySelector('.auto-complete__option--active');
    if (activeOption) {
      activeOption.scrollIntoView({ block: 'nearest' });
    }
  }

  /**
   * 高亮匹配文本
   */
  private highlightText(text: string): any {
    if (!this.highlightMatch || !this.value) {
      return text;
    }

    const searchValue = this.value.toLowerCase();
    const index = text.toLowerCase().indexOf(searchValue);

    if (index === -1) {
      return text;
    }

    const before = text.slice(0, index);
    const match = text.slice(index, index + this.value.length);
    const after = text.slice(index + this.value.length);

    return [
      before,
      <mark class="auto-complete__highlight">{match}</mark>,
      after
    ];
  }

  /**
   * 渲染选项列表
   */
  private renderOptions() {
    if (!this.visible) return null;

    if (this.loading) {
      return (
        <div class="auto-complete__dropdown">
          <div class="auto-complete__loading">
            <ldesign-spin size="small" />
            <span>加载中...</span>
          </div>
        </div>
      );
    }

    if (this.filteredOptions.length === 0) {
      return (
        <div class="auto-complete__dropdown">
          <div class="auto-complete__empty">
            <ldesign-empty description="暂无数据" />
          </div>
        </div>
      );
    }

    return (
      <div
        class="auto-complete__dropdown"
        ref={el => this.dropdownRef = el}
      >
        <div class="auto-complete__options">
          {this.filteredOptions.map((option, index) => (
            <div
              key={option.value}
              class={{
                'auto-complete__option': true,
                'auto-complete__option--active': index === this.activeIndex,
                'auto-complete__option--disabled': option.disabled,
              }}
              onClick={() => this.handleSelect(option)}
              onMouseEnter={() => this.activeIndex = index}
            >
              {this.highlightText(option.label)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /**
   * 聚焦输入框
   */
  @Method()
  async focus(): Promise<void> {
    this.inputRef?.focus();
  }

  /**
   * 失焦输入框
   */
  @Method()
  async blur(): Promise<void> {
    this.inputRef?.blur();
  }

  render() {
    const showClear = this.clearable && this.value && !this.disabled;

    return (
      <Host
        class={{
          'auto-complete': true,
          'auto-complete--disabled': this.disabled,
          [`auto-complete--${this.size}`]: true,
        }}
      >
        <div class="auto-complete__wrapper">
          <input
            ref={el => this.inputRef = el}
            class="auto-complete__input"
            type="text"
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          {showClear && (
            <span
              class="auto-complete__clear"
              onClick={this.handleClear}
            >
              <ldesign-icon name="close-circle" />
            </span>
          )}
        </div>

        {this.renderOptions()}
      </Host>
    );
  }
}
