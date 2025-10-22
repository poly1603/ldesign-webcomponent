import { Component, Prop, Event, EventEmitter, State, h, Host } from '@stencil/core';

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'done' | 'error';
  percent?: number;
  url?: string;
  response?: any;
  error?: any;
}

/**
 * Upload 文件上传组件
 */
@Component({
  tag: 'ldesign-upload',
  styleUrl: 'upload.less',
  shadow: false,
})
export class LdesignUpload {
  /**
   * 接受的文件类型
   */
  @Prop() accept?: string;

  /**
   * 是否支持多选
   */
  @Prop() multiple: boolean = false;

  /**
   * 是否支持拖拽上传
   */
  @Prop() drag: boolean = false;

  /**
   * 最大文件大小（字节）
   */
  @Prop() maxSize?: number;

  /**
   * 最大文件数量
   */
  @Prop() maxCount?: number;

  /**
   * 是否禁用
   */
  @Prop() disabled: boolean = false;

  /**
   * 文件列表
   */
  @State() fileList: UploadFile[] = [];

  /**
   * 是否拖拽悬停
   */
  @State() isDragOver: boolean = false;

  /**
   * 文件选择事件
   */
  @Event() ldesignChange!: EventEmitter<UploadFile[]>;

  /**
   * 文件上传前事件
   */
  @Event() ldesignBeforeUpload!: EventEmitter<File>;

  /**
   * 上传进度事件
   */
  @Event() ldesignProgress!: EventEmitter<{ file: UploadFile; percent: number }>;

  /**
   * 上传成功事件
   */
  @Event() ldesignSuccess!: EventEmitter<UploadFile>;

  /**
   * 上传失败事件
   */
  @Event() ldesignError!: EventEmitter<{ file: UploadFile; error: any }>;

  private inputRef?: HTMLInputElement;

  /**
   * 触发文件选择
   */
  private handleClick = (): void => {
    if (!this.disabled && this.inputRef) {
      this.inputRef.click();
    }
  };

  /**
   * 处理文件选择
   */
  private handleFileChange = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files || []);

    this.addFiles(files);

    // 重置 input
    if (this.inputRef) {
      this.inputRef.value = '';
    }
  };

  /**
   * 添加文件
   */
  private addFiles(files: File[]): void {
    files.forEach((file) => {
      // 检查文件大小
      if (this.maxSize && file.size > this.maxSize) {
        console.error(`文件 ${file.name} 超过最大大小限制`);
        return;
      }

      // 检查文件数量
      if (this.maxCount && this.fileList.length >= this.maxCount) {
        console.error('已达到最大文件数量限制');
        return;
      }

      const uploadFile: UploadFile = {
        uid: `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        percent: 0,
      };

      this.fileList = [...this.fileList, uploadFile];
      this.ldesignBeforeUpload.emit(file);
      this.simulateUpload(uploadFile, file);
    });

    this.ldesignChange.emit(this.fileList);
  }

  /**
   * 模拟上传（实际项目中应该调用真实的上传接口）
   */
  private async simulateUpload(uploadFile: UploadFile, file: File): Promise<void> {
    // 模拟上传进度
    for (let percent = 0; percent <= 100; percent += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const index = this.fileList.findIndex((f) => f.uid === uploadFile.uid);
      if (index !== -1) {
        this.fileList[index].percent = percent;
        this.fileList = [...this.fileList];
        this.ldesignProgress.emit({ file: this.fileList[index], percent });
      }
    }

    // 完成上传
    const index = this.fileList.findIndex((f) => f.uid === uploadFile.uid);
    if (index !== -1) {
      this.fileList[index].status = 'done';
      this.fileList[index].url = URL.createObjectURL(file);
      this.fileList = [...this.fileList];
      this.ldesignSuccess.emit(this.fileList[index]);
    }
  }

  /**
   * 移除文件
   */
  private handleRemove(uid: string): void {
    this.fileList = this.fileList.filter((f) => f.uid !== uid);
    this.ldesignChange.emit(this.fileList);
  }

  /**
   * 拖拽处理
   */
  private handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    if (!this.disabled) {
      this.isDragOver = true;
    }
  };

  private handleDragLeave = (): void => {
    this.isDragOver = false;
  };

  private handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    this.isDragOver = false;

    if (this.disabled) return;

    const files = Array.from(e.dataTransfer?.files || []);
    this.addFiles(files);
  };

  /**
   * 渲染文件列表
   */
  private renderFileList(): any {
    if (this.fileList.length === 0) return null;

    return (
      <div class="ldesign-upload__file-list">
        {this.fileList.map((file) => (
          <div key={file.uid} class={`ldesign-upload__file-item ldesign-upload__file-item--${file.status}`}>
            <ldesign-icon name="file" class="ldesign-upload__file-icon" />
            <span class="ldesign-upload__file-name">{file.name}</span>
            {file.status === 'uploading' && (
              <span class="ldesign-upload__file-percent">{file.percent}%</span>
            )}
            {file.status === 'done' && (
              <ldesign-icon name="check-circle" class="ldesign-upload__file-status" />
            )}
            {file.status === 'error' && (
              <ldesign-icon name="x-circle" class="ldesign-upload__file-status ldesign-upload__file-status--error" />
            )}
            <ldesign-icon
              name="x"
              class="ldesign-upload__file-remove"
              onClick={() => this.handleRemove(file.uid)}
            />
          </div>
        ))}
      </div>
    );
  }

  render(): any {
    const classes = {
      'ldesign-upload': true,
      'ldesign-upload--drag': this.drag,
      'ldesign-upload--drag-over': this.isDragOver,
      'ldesign-upload--disabled': this.disabled,
    };

    const dragHandlers = this.drag
      ? {
        onDragOver: this.handleDragOver,
        onDragLeave: this.handleDragLeave,
        onDrop: this.handleDrop,
      }
      : {};

    return (
      <Host class={classes}>
        <div class="ldesign-upload__trigger" onClick={this.handleClick} {...dragHandlers}>
          <input
            ref={(el) => (this.inputRef = el)}
            type="file"
            class="ldesign-upload__input"
            accept={this.accept}
            multiple={this.multiple}
            disabled={this.disabled}
            onChange={this.handleFileChange}
          />
          {this.drag ? (
            <div class="ldesign-upload__drag-content">
              <ldesign-icon name="upload-cloud" size="large" />
              <p>点击或拖拽文件到此区域上传</p>
            </div>
          ) : (
            <slot />
          )}
        </div>
        {this.renderFileList()}
      </Host>
    );
  }
}



