# Upload 文件上传

文件选择上传和拖拽上传组件。

## 何时使用

- 需要上传文件到服务器
- 支持拖拽上传
- 需要显示上传进度

## 基础用法

:::demo

```html
<ldesign-upload accept="image/*">
  <ldesign-button icon="upload">点击上传</ldesign-button>
</ldesign-upload>
```

:::

## 拖拽上传

:::demo

```html
<ldesign-upload drag accept="image/*" multiple>
  <!-- 拖拽区域会自动显示 -->
</ldesign-upload>
```

:::

## 文件列表

:::demo

```html
<ldesign-upload id="uploadWithList" multiple>
  <ldesign-button type="primary" icon="upload">选择文件</ldesign-button>
</ldesign-upload>

<script>
const upload = document.getElementById('uploadWithList');

upload.addEventListener('ldesignChange', (e) => {
  console.log('文件列表:', e.detail);
});

upload.addEventListener('ldesignSuccess', (e) => {
  console.log('上传成功:', e.detail);
});
</script>
```

:::

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| accept | `string` | - | 接受的文件类型 |
| multiple | `boolean` | `false` | 是否支持多选 |
| drag | `boolean` | `false` | 是否支持拖拽 |
| maxSize | `number` | - | 最大文件大小（字节） |
| maxCount | `number` | - | 最大文件数量 |
| disabled | `boolean` | `false` | 是否禁用 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| ldesignChange | `files: UploadFile[]` | 文件列表变化 |
| ldesignBeforeUpload | `file: File` | 上传前 |
| ldesignProgress | `{ file, percent }` | 上传进度 |
| ldesignSuccess | `file: UploadFile` | 上传成功 |
| ldesignError | `{ file, error }` | 上传失败 |

