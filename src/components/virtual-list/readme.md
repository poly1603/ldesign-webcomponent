# ldesign-virtual-list



<!-- Auto Generated Below -->


## Overview

VirtualList 虚拟列表组件
高性能长列表渲染，仅渲染可见区域的项目

## Properties

| Property                  | Attribute     | Description           | Type                                             | Default     |
| ------------------------- | ------------- | --------------------- | ------------------------------------------------ | ----------- |
| `buffer`                  | `buffer`      | 缓冲区项目数（渲染可见区域外的额外项目数） | `number`                                         | `3`         |
| `getItemHeight`           | --            | 获取项目高度的函数（动态高度模式）     | `(index: number) => number`                      | `undefined` |
| `getItemKey`              | --            | 获取项目的唯一key            | `(item: any, index: number) => string \| number` | `undefined` |
| `height`                  | `height`      | 容器高度                  | `number \| string`                               | `400`       |
| `horizontal`              | `horizontal`  | 水平模式                  | `boolean`                                        | `false`     |
| `itemHeight`              | `item-height` | 列表项高度（固定高度模式）         | `number`                                         | `50`        |
| `items`                   | --            | 列表项数据                 | `any[]`                                          | `[]`        |
| `renderItem` _(required)_ | --            | 渲染项目的函数               | `(item: any, index: number) => any`              | `undefined` |


## Slots

| Slot | Description               |
| ---- | ------------------------- |
|      | 列表项内容（通过 renderItem 属性渲染） |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
