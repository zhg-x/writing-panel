import { PanelConfigOption } from './model';
/**
 * 书写面板[组件类]
 */
export declare class WritingPanel {
    /** 鼠标按下或屏幕被触摸[事件标志] */
    private readonly _Down;
    /** 鼠标移动/书写[事件标志] */
    private readonly _Writing;
    /** 鼠标松开[事件标志] */
    private readonly _Up;
    /** 是否处于移动端环境下 */
    private readonly _isMobilePlatform;
    /** 面板配置选项 */
    private _panelConfig;
    /** 画布元素 */
    private _canvas;
    /** 2D上下文 */
    private _context;
    /** 是否正在书写 */
    private _writingFlag;
    /** 线条记录 */
    private _lineRecord;
    /** 当前正在操作的线条 */
    private _line;
    /** 线条索引 */
    private _lineIndex;
    /** 面板初始化标志 */
    private _initialized;
    constructor(canvas: HTMLCanvasElement, options: PanelConfigOption);
    /** 初始化面板 */
    private _initPanel;
    /**
     * 重置画布
     * <ul>
     *     <li>1.初始化时需要设置画布</li>
     *     <li>2.当开启autoResize且浏览器窗口大小变化时需要重置画布</li>
     * </ul>
     */
    private _resetCanvas;
    /** 设置事件监听 */
    private _setEventListeners;
    /** 当窗口被调整大小时重置画布 */
    private _windowOnResize;
    /**
     * [鼠标按下|屏幕被触摸]事件方法--准备进行书写
     * @param event Events
     */
    private _readyWriteFun;
    /**
     * 在[鼠标按下|屏幕被触摸]的过程中进行书写(画线)
     * @param event Events
     */
    private _writingFun;
    /**
     * [鼠标放开|屏幕触摸结束|触点离开面板区域]时立即停止书写
     * @param event Events
     */
    private _stopWriting;
    /**
     * 开始进行笔画书写
     * @param event Event事件
     * @param eventFlag 事件标志
     */
    private _strokeWrite;
    /**
     * 设置面板背景色
     * @param color 颜色值，默认值为null，使用PanelConfig.panelBgColor属性值
     * @param lineRewriteFlag {boolean} 线条重绘标志
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
     * @returns {string}
     */
    getPanelHeight: () => string;
    /**
     * 设置写字板的宽度
     * @param width {number} 线条宽度
     * @returns 当前写字板实例对象
     */
    setPanelWidth: (width: number) => WritingPanel;
    /**
     * 获取面板的宽度
     * <p>获取计算后的综合的宽度值</p>
     * @returns {string}
     */
    getPanelWidth: () => string;
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
     * @param resetPanelBgcFlag 是否清除面板背景色，默认值为 true.
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
     * 线条重新绘制
     * <p>先清空面板上的线条，再根据线条记录中可使用的线条上的点重新绘制</p>
     * @param clearPanelBgcFlag {boolean} 是否需要先清除面板内所有内容(线条和背景色)
     * @param resetPanelBgcFlag {boolean} 是否根据最后一个可用线条的记录重绘面板背景色
     */
    private _lineRewrite;
    /**
     * 设置绘制线条时的样式
     * @param lineItem Line or PanelConfig 包含线条样式的对象
     * @param readyWriteFlag {boolean} 准备写入标志，默认为false
     */
    private _setLineStyleOnWriting;
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
}
