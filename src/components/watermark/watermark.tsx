import { Component, Prop, Element, State, h, Host } from '@stencil/core';
import { ResourceManager } from '../../utils/resource-manager';

/**
 * Watermark 水印组件
 * 为页面添加防删除水印
 */
@Component({
  tag: 'ldesign-watermark',
  styleUrl: 'watermark.less',
  shadow: false,
})
export class LdesignWatermark {
  @Element() el!: HTMLElement;

  /**
   * 水印文字
   */
  @Prop() content?: string | string[];

  /**
   * 水印图片
   */
  @Prop() image?: string;

  /**
   * 水印宽度
   */
  @Prop() width: number = 120;

  /**
   * 水印高度
   */
  @Prop() height: number = 64;

  /**
   * 旋转角度
   */
  @Prop() rotate: number = -22;

  /**
   * 水印透明度
   */
  @Prop() opacity: number = 0.15;

  /**
   * 字体大小
   */
  @Prop() fontSize: number = 14;

  /**
   * 字体颜色
   */
  @Prop() fontColor: string = 'rgba(0, 0, 0, 0.15)';

  /**
   * 水印间距
   */
  @Prop() gapX: number = 100;

  /**
   * 垂直间距
   */
  @Prop() gapY: number = 100;

  /**
   * Z-index
   */
  @Prop() zIndex: number = 9;

  /**
   * 水印背景图 URL
   */
  @State() watermarkUrl: string = '';

  private mutationObserver?: MutationObserver;
  private watermarkDiv?: HTMLDivElement;
  private resources = new ResourceManager();

  componentDidLoad(): void {
    this.generateWatermark();
    this.setupMutationObserver();
  }

  disconnectedCallback(): void {
    this.resources.cleanup();
  }

  /**
   * 生成水印
   */
  private generateWatermark(): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.width + this.gapX;
    canvas.height = this.height + this.gapY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = this.opacity;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((Math.PI / 180) * this.rotate);

    if (this.image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
        this.watermarkUrl = canvas.toDataURL();
      };
      img.src = this.image;
    } else if (this.content) {
      ctx.font = `${this.fontSize}px sans-serif`;
      ctx.fillStyle = this.fontColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const texts = Array.isArray(this.content) ? this.content : [this.content];
      texts.forEach((text, index) => {
        ctx.fillText(text, 0, index * 20);
      });

      this.watermarkUrl = canvas.toDataURL();
    }
  }

  /**
   * 设置 MutationObserver 防止删除
   */
  private setupMutationObserver(): void {
    const callback = (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          if (!this.watermarkDiv || !this.el.contains(this.watermarkDiv)) {
            this.forceRender();
          }
        } else if (mutation.type === 'attributes') {
          if (mutation.target === this.watermarkDiv) {
            this.forceRender();
          }
        }
      });
    };

    this.mutationObserver = this.resources.observeMutation(callback, this.el, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }

  /**
   * 强制重新渲染
   */
  private forceRender(): void {
    const temp = this.watermarkUrl;
    this.watermarkUrl = '';
    requestAnimationFrame(() => {
      this.watermarkUrl = temp;
    });
  }

  render(): any {
    return (
      <Host class="ldesign-watermark">
        <div class="ldesign-watermark__content">
          <slot />
        </div>
        {this.watermarkUrl && (
          <div
            ref={(el) => (this.watermarkDiv = el)}
            class="ldesign-watermark__overlay"
            style={{
              backgroundImage: `url(${this.watermarkUrl})`,
              zIndex: this.zIndex.toString(),
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        )}
      </Host>
    );
  }
}



