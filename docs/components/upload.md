# Upload 上传

文件选择上传和拖拽上传控件。

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

## 代码演示

### 基础用法

经典款式，用户点击按钮弹出文件选择框。

<div class="demo-container">
  <ldesign-upload action="/upload">
    <ldesign-button icon="upload">点击上传</ldesign-button>
  </ldesign-upload>
</div>

```html
<ldesign-upload action="/upload">
  <ldesign-button icon="upload">点击上传</ldesign-button>
</ldesign-upload>

<script>
  const upload = document.querySelector('ldesign-upload');
  
  upload.addEventListener('ldesignChange', (e) => {
    console.log('文件列表:', e.detail);
  });
  
  upload.addEventListener('ldesignSuccess', (e) => {
    console.log('上传成功:', e.detail);
  });
  
  upload.addEventListener('ldesignError', (e) => {
    console.log('上传失败:', e.detail);
  });
</script>
```

### 文件列表

使用 `list-type` 属性来设置文件列表的样式。

<div class="demo-container">
  <ldesign-upload action="/upload" list-type="picture">
    <ldesign-button icon="upload">上传图片</ldesign-button>
  </ldesign-upload>
</div>

```html
<ldesign-upload action="/upload" list-type="picture">
  <ldesign-button>上传</ldesign-button>
</ldesign-upload>
```

### 拖拽上传

把文件拖入指定区域，完成上传，同样支持点击上传。

<div class="demo-container">
  <ldesign-upload action="/upload" drag>
    <div style="padding: 40px; text-align: center;">
      <ldesign-icon name="upload-cloud" size="48"></ldesign-icon>
      <p>点击或拖拽文件到这里上传</p>
    </div>
  </ldesign-upload>
</div>

```html
<ldesign-upload action="/upload" drag>
  <div class="upload-area">
    <p>点击或拖拽文件到这里上传</p>
  </div>
</ldesign-upload>
```

### 照片墙

用户可以上传图片并在列表中显示缩略图。

<div class="demo-container">
  <ldesign-upload action="/upload" list-type="picture-card">
    <ldesign-icon name="plus"></ldesign-icon>
  </ldesign-upload>
</div>

```html
<ldesign-upload action="/upload" list-type="picture-card">
  <ldesign-icon name="plus"></ldesign-icon>
</ldesign-upload>
```

### 限制文件数量

通过 `limit` 和 `on-exceed` 来限制上传文件的个数。

<div class="demo-container">
  <ldesign-upload action="/upload" limit="3">
    <ldesign-button icon="upload">最多上传3个文件</ldesign-button>
  </ldesign-upload>
</div>

```html
<ldesign-upload action="/upload" limit="3">
  <ldesign-button>上传</ldesign-button>
</ldesign-upload>
```

## 框架集成

### Vue 3

```vue
<script setup>
import { ref } from 'vue';

const fileList = ref([]);

const handleChange = (e) => {
  fileList.value = e.detail;
  console.log('文件列表:', fileList.value);
};

const handleSuccess = (e) => {
  console.log('上传成功:', e.detail);
};

const handleError = (e) => {
  console.error('上传失败:', e.detail);
};
</script>

<template>
  <ldesign-upload
    action="/upload"
    :file-list="fileList"
    @ldesignChange="handleChange"
    @ldesignSuccess="handleSuccess"
    @ldesignError="handleError"
  >
    <ldesign-button icon="upload">点击上传</ldesign-button>
  </ldesign-upload>
</template>
```

### React

```tsx
import { useState } from 'react';

function App() {
  const [fileList, setFileList] = useState([]);
  
  const handleChange = (e) => {
    setFileList(e.detail);
    console.log('文件列表:', e.detail);
  };
  
  const handleSuccess = (e) => {
    console.log('上传成功:', e.detail);
  };
  
  const handleError = (e) => {
    console.error('上传失败:', e.detail);
  };
  
  return (
    <ldesign-upload
      action="/upload"
      file-list={fileList}
      onLdesignChange={handleChange}
      onLdesignSuccess={handleSuccess}
      onLdesignError={handleError}
    >
      <ldesign-button icon="upload">点击上传</ldesign-button>
    </ldesign-upload>
  );
}
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `action` | 上传地址 | `string` | - |
| `accept` | 接受上传的文件类型 | `string` | - |
| `multiple` | 是否支持多选文件 | `boolean` | `false` |
| `limit` | 最大允许上传个数 | `number` | - |
| `drag` | 是否启用拖拽上传 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `list-type` | 文件列表的类型 | `'text' \| 'picture' \| 'picture-card'` | `'text'` |
| `auto-upload` | 是否在选取文件后立即上传 | `boolean` | `true` |
| `show-file-list` | 是否显示已上传文件列表 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `ldesignChange` | 文件状态改变时触发 | `(event: CustomEvent<FileList>) => void` |
| `ldesignSuccess` | 文件上传成功时触发 | `(event: CustomEvent) => void` |
| `ldesignError` | 文件上传失败时触发 | `(event: CustomEvent) => void` |
| `ldesignProgress` | 文件上传进度更新时触发 | `(event: CustomEvent<number>) => void` |
| `ldesignRemove` | 文件列表移除文件时触发 | `(event: CustomEvent) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 触发文件选择框的内容 |
| `tip` | 提示说明文字 |

## 相关组件

- [Image 图片](./image.md)
- [Progress 进度条](./progress.md)
