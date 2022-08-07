# writing-panel

JS 实现写字板功能

## Functions

- 绘画书写
- 设置面板样式(面板大小/线条宽度及颜色/线帽样式/...)
- 支持线条撤销和恢复
- 图片保存/下载
- 获取Base64字符串
- 获取Blob|File对象
- 开启/关闭面板蒙层
- 销毁
- ......


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
- PanelConfigOption.enableDPR: 是否启用设备像素比 window.devicePixelRatio，如果开始此选项，则在设置画布/面板的width和height属性值时，需要根据设备像素比进行计算，默认为false。


### 书写面板组件类

#### 创建一个写字板组件类

```ts
const writingPanel = new WritingPanel(canvasElement, panelConfigOption);
```

参数：
- canvasElement: HTMLCanvasElement，canvas画布元素 
- options: PanelConfigOption，面板参数配置对象的实例

#### 实例方法

```typescript
class WritingPanel {
    
    /**
     * 设置面板背景色
     * @param color 颜色值，默认值为null，使用PanelConfig.panelBgColor属性值
     * @param lineRewriteFlag {boolean} 线条重绘标志，默认值为 false
     * @returns WritingPanel 当前面板实例对象
     */
    setPanelBgColor(color?: any, lineRewriteFlag?: boolean): WritingPanel;
    /** 获取当前面板的背景色 */
    getPanelBgColor(): string | undefined;
    /**
     * 设置写字板高度
     * @param height {number} 高度值
     * @returns 当前写字板实例对象
     */
    setPanelHeight: (height: number) => WritingPanel;
    /**
     * 获取面板的高度
     * <p>获取计算后的综合的高度值</p>
     * @returns {string} 单位：px
     */
    getPanelHeight: () => string;
    /**
     * 设置写字板的宽度
     * @param width {number} 宽度值
     * @returns 当前写字板实例对象
     */
    setPanelWidth: (width: number) => WritingPanel;
    /**
     * 获取面板的宽度
     * <p>获取计算后的综合的宽度值</p>
     * @returns {string} 单位：px
     */
    getPanelWidth: () => string;
    /**
     * <p>还原面板原始宽高比例
     * <p>在设置了面板的宽度或高度后，可以使用此方法对面板宽度或高度进行还原</p>
     * @param rstWidth {boolean} 还原面板宽度，默认为true
     * @param rstHeight {boolean} 还原面板高度，默认为true
     */
    restorePanelWH: (rstWidth?: boolean, rstHeight?: boolean) => void;
    /**
     * 设置线条宽度
     * @param width {number} 线条宽度
     * @returns 当前写字板实例对象
     */
    setLineWidth: (width: number) => WritingPanel;
    /**
     * 设置线条线帽的样式
     * @param value 样式值
     * @returns 当前写字板实例对象
     */
    setLineCap: (value: CanvasLineCap) => WritingPanel;
    /**
     * 设置线条颜色
     * @param color {string} 颜色值
     * @returns 当前写字板实例对象
     */
    setLineColor: (color: string) => WritingPanel;
    /**
     * 清除面板内容 (包括面板上的线条和背景色)
     * @param clearRecordFlag {boolean} 是否清除线条记录，默认值为 true.
     * @param resetPanelBgcFlag {boolean} 是否重置面板背景色，默认值为 true.
     */
    clearPanel: (clearRecordFlag?: boolean, resetPanelBgcFlag?: boolean) => void;
    /**
     * 获取画布的Base64编码字符串
     */
    getBase64: () => string;
    /**
     * 获取画布的Blob|File对象
     * @param type {string} [可选]类型：'blob'|'file'，默认值为blob
     * @param fileName [可选] 文件名称
     */
    getImgBlobOrFile: (type?: 'blob' | 'file', fileName?: string) => Promise<Blob | File>;
    /**
     * 保存图片
     * <p>功能同downloadImgFile()方法</p>
     * <p>下载结束后可使用.then()方法执行其它相关操作</p>
     * @param fileName 图片文件名称，如果不传则使用随机文件名称
     */
    saveImgFile: (fileName?: string) => Promise<any>;
    /**
     * 下载图片
     * <p>功能同saveImgFile()方法</p>
     * <p>下载结束后可使用.then()方法执行其它相关操作</p>
     * @param fileName 图片文件名称
     */
    downloadImgFile: (fileName?: string) => Promise<any>;
    /**
     * <p>撤销/单步撤销操作</p>
     * <p>设置最后一个线条为不可用状态，然后清空画布，根据剩下的可用状态的线条重新绘制</p>
     */
    revoke: () => void;
    /**
     * 恢复撤销操作
     */
    recover: () => void;
    /**
     * 设置面板区域的光标样式
     * @param cursorStyle {string} 光标样式
     */
    setPanelCursorStyle: (cursorStyle?: any) => void;
    /**
     * 移除所有事件监听
     * @param {boolean} rmOnResizeEventListener 是否移除窗口onresize事件监听，默认为false
     */
    private _removeAllEvtListeners;
    /** 判断面板是否为空 */
    isEmpty: () => boolean;
    /**
     * 销毁
     * <p>使用同等宽高的canvas替换现有的canvas</p>
     */
    destroy: () => void;
    /**
     * 开启蒙层
     * <p>仅针对当前面板容器的范围设置蒙层，当面板容器的大小发生变化时，蒙层大小不会随之而改变</p>
     */
    openMask: () => void;
    /**
     * 关闭蒙层
     */
    closeMask: () => void;
}

```

---

更新日期：2022-08-07

---
