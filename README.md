# writing-panel

JS 实现写字板功能

## Functions

- 绘画书写
- 设置面板样式(面板大小/线条宽度及颜色/线帽样式/...)
- 支持线条撤销和恢复
- 图片保存/下载
- 获取`Base64`字符串
- 获取`Blob|File`对象
- 开启/关闭面板蒙层
- 销毁
- ......

---

## Installation

Using npm:

```
$ npm i -g npm
$ npm i writing-panel
```

 In web browsers:

 ```html
<script src="bundle.js"></script>
 ```

---

## Usages

### PanelConfigOption-面板配置项

- PanelConfigOption.width: 面板宽度
- PanelConfigOption.height:  面板高度
- PanelConfigOption.panelBgColor: 面板背景色
- PanelConfigOption.lineWidth: 线条宽度
- PanelConfigOption.lineCap: 线帽样式
- PanelConfigOption.lineJoin: 线条交汇处边角的类型
- PanelConfigOption.imgType: 图片类型
- PanelConfigOption.cursorStyle: 鼠标移动到面板区域时的光标样式
- PanelConfigOption.autoResize: 浏览器窗口改变时是否重置面板，默认为true
- PanelConfigOption.enableDPR: 是否启用设备像素比 `window.devicePixelRatio`，如果开始此选项，则在设置画布/面板的width和height属性值时，需要根据设备像素比进行计算，默认为`false`。

---

### 书写面板组件类

#### 创建一个写字板组件类

```ts
const writingPanel = new WritingPanel(canvasElement, panelConfigOption);
```

参数：
- `canvasElement`: `HTMLCanvasElement`，canvas画布元素 
- `options`: `PanelConfigOption`，面板参数配置对象的实例

---

#### 设置面板背景色

```ts
writingPanel.setPanelBgColor(color);
```

参数：
- `color` 颜色值，默认值为`null`，使用`PanelConfig.panelBgColor`属性值

返回：
- `writingPanel` - 当前面板实例对象

---

#### 获取当前面板的背景色

```ts
writingPanel.getPanelBgColor();
```

返回：
- `string` | `undefined`

---

#### 设置写字板高度

```ts
writingPanel.setPanelHeight(height);
```

参数：
- `height`：`number`类型

返回：
- `writingPanel`-当前写字板实例对象

---

#### 获取写字板的高度

```ts
writingPanel.getPanelHeight();
```

获取计算后的面板元素的综合高度值

返回：
- 高度值，`string`类型，单位：`px`

---

#### 设置写字板的宽度

```ts
writingPanel.setPanelWidth(width);
```

参数：
- `width`：`number`类型

返回：
- `writingPanel`-当前写字板实例对象

---

#### 获取写字板的宽度

```ts
writingPanel.getPanelWidth();
```

获取计算后的面板元素的综合宽度值

返回：
- 宽度值，`string`类型，单位：`px`

---

#### 还原面板原始宽高比例

```ts
writingPanel.restorePanelWH(rstWidth, rstHeight);
```

还原面板原始宽高比例。在设置了面板的宽度或高度后，可以使用此方法对面板宽度或高度进行还原。

参数：
- `rstWidth`: `boolean`，还原面板宽度，默认值为 `true`。
- `rstHeight`: `boolean`，还原面板高度，默认值为 `true`。

返回：
- `void`

---

#### 设置线条宽度

```ts
writingPanel.setLineWidth(width);
```

参数：
- `width`: `number` 类型

返回：
- `writingPanel` - 当前写字板实例对象

---

#### 设置线条线帽的样式

```ts
writingPanel.setLineCap(value);
```

参数：
- `value`: `CanvasLineCap` 类型

返回：
- `writingPanel` - 当前写字板实例对象

---

#### 设置线条颜色

```ts
writingPanel.setLineColor(color);
```

参数：
- `color`: `string` 类型

返回：
- `writingPanel` - 当前写字板实例对象

---

#### 清除面板内容

```ts
writingPanel.clearPanel(clearRecordFlag, resetPanelBgcFlag);
```

参数：
- `clearRecordFlag`: `boolean`类型，是否清除线条记录，默认值为 `true`.
- `resetPanelBgcFlag`: `boolean`类型，是否重置面板背景色，默认值为 `true`.

---

#### 获取画布的Base64编码字符串

```ts
writingPanel.getBase64();
```

返回：
- base64编码字符串

---

#### 获取画布的Blob|File对象

```ts
writingPanel.getImgBlobOrFile(type, fileName);
```

参数：
- type: `string`类型，有两种可选类型(`blob`|`file`)，默认值为`blob`，可选。
- fileName: `string`，文件名称，可选。

返回
- `Promise`: `Promise<Blob | File>`

---

#### 保存图片

```ts
writingPanel.saveImgFile(fileName);
```

功能同`downloadImgFile()`方法，返回值为`Promise`类型，下载结束后可使用`.then()`方法执行其它相关操作。

参数：
- `fileName`: 图片文件名称，如果不传则使用随机文件名称

返回：
- `Promise`: `Promise<any>`

---

#### 下载图片

```ts
writingPanel.downloadImgFile(fileName);
```

功能同`功能同saveImgFile()`方法，返回值为`Promise`类型，下载结束后可使用`.then()`方法执行其它相关操作。

参数：
- `fileName`: 图片文件名称，如果不传则使用随机文件名称

返回：
- `Promise`: `Promise<any>`

---

#### 撤销/单步撤销操作

```ts
writingPanel.revoke();
```

---

#### 恢复撤销操作

```ts
writingPanel.recover();
```

---

#### 设置面板区域的光标样式

```ts
writingPanel.setPanelCursorStyle(cursorStyle);
```

参数：
- `cursorStyle`: `string`类型，光标样式

返回：
- `void`

---

#### 判断面板是否为空

```ts
writingPanel.isEmpty();
```

返回：
- `boolean`

---

#### 销毁

```ts
writingPanel.destroy();
```

返回：
- `void`

---

#### 开启蒙层

```ts
writingPanel.openMask();
```

仅针对当前面板容器的范围设置蒙层，当面板容器的大小发生变化时，蒙层大小不会随之而改变。

返回：
- `void`

---

#### 关闭蒙层

```ts
writingPanel.closeMask();
```

返回：
- `void`

---

更新日期：2022-08-07

---
