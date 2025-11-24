import { Component, Prop, Element, Method, State, h, Host } from '@stencil/core';

export interface FormListField {
  key: string | number;
  name: number;
  [key: string]: any;
}

/**
 * FormList 动态表单列表
 * 用于动态添加/删除表单项
 */
@Component({
  tag: 'ldesign-form-list',
  shadow: false,
})
export class LdesignFormList {
  @Element() el!: HTMLElement;

  /**
   * 字段名
   */
  @Prop() name!: string;

  /**
   * 初始数量
   */
  @Prop() initialCount: number = 0;

  /**
   * 最大数量
   */
  @Prop() maxCount?: number;

  /**
   * 字段列表
   */
  @State() fields: FormListField[] = [];

  private nextKey: number = 0;

  componentWillLoad() {
    // 初始化字段
    for (let i = 0; i < this.initialCount; i++) {
      this.addField();
    }
  }

  /**
   * 添加字段
   */
  @Method()
  async add(defaultValue?: any): Promise<void> {
    if (this.maxCount && this.fields.length >= this.maxCount) {
      return;
    }

    const key = this.nextKey++;
    this.fields = [
      ...this.fields,
      {
        key,
        name: this.fields.length,
        ...defaultValue,
      },
    ];
  }

  /**
   * 移除字段
   */
  @Method()
  async remove(index: number): Promise<void> {
    if (index < 0 || index >= this.fields.length) return;

    this.fields = this.fields.filter((_, i) => i !== index);

    // 重新索引
    this.fields = this.fields.map((field, i) => ({
      ...field,
      name: i,
    }));
  }

  /**
   * 移动字段
   */
  @Method()
  async move(from: number, to: number): Promise<void> {
    if (from < 0 || from >= this.fields.length || to < 0 || to >= this.fields.length) {
      return;
    }

    const newFields = [...this.fields];
    const [removed] = newFields.splice(from, 1);
    newFields.splice(to, 0, removed);

    // 重新索引
    this.fields = newFields.map((field, i) => ({
      ...field,
      name: i,
    }));
  }

  /**
   * 获取所有字段
   */
  @Method()
  async getFields(): Promise<FormListField[]> {
    return this.fields;
  }

  /**
   * 内部方法：添加字段
   */
  private addField = () => {
    this.add();
  };

  /**
   * 内部方法：移除字段
   */
  private removeField = (index: number) => {
    this.remove(index);
  };

  render() {
    return (
      <Host class="ldesign-form-list">
        {this.fields.map((field, index) => (
          <div key={field.key} class="ldesign-form-list__item" data-index={index} data-name={field.name}>
            <slot name={`item-${index}`} />
          </div>
        ))}
        <slot name="add-button" />
      </Host>
    );
  }
}
