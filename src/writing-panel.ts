import {
    DownEvents,
    ElementEvents,
    Line,
    LineRecord,
    MoveEvents,
    PanelConfig,
    PanelConfigOption,
    Point,
    UpEvents
} from './model';
import { filterEvents, getRandomFileName, isMobilePlatform } from './utils';


/**
 * 书写面板[组件类]
 */
export class WritingPanel {

    /** 鼠标按下或屏幕被触摸[事件标志] */
    private readonly _Down = 1;
    /** 鼠标移动/书写[事件标志] */
    private readonly _Writing = 2;
    /** 鼠标松开[事件标志] */
    private readonly _Up = 3;
    /** 是否处于移动端环境下 */
    private readonly _isMobilePlatform: boolean;

    /** 面板配置选项 */
    private _panelConfig: PanelConfig;
    /** 画布元素 */
    private _canvas: HTMLCanvasElement;
    /** 2D上下文 */
    private _context!: CanvasRenderingContext2D;
    /** 是否正在书写 */
    private _writingFlag = false;
    /** 线条记录 */
    private _lineRecord!: LineRecord;
    /** 当前正在操作的线条 */
    private _line!: Line;
    /** 线条索引 */
    private _lineIndex = 0;
    /** 面板初始化标志 */
    private _initialized = false;

    constructor(canvas: HTMLCanvasElement, options: PanelConfigOption) {
        if (!canvas.getContext) {
            throw Error('您的浏览器不支持 HTML5 canvas 标签');
        }
        this._canvas = canvas;
        this._context = this._canvas.getContext('2d')!;
        this._panelConfig = new PanelConfig(options);
        this._isMobilePlatform = isMobilePlatform();
        this._initPanel();
    }

    /** 初始化面板 */
    private _initPanel(): void {
        this._line = new Line();
        this._lineRecord = new LineRecord();
        if (this._panelConfig.autoResize) {
            window.addEventListener('resize', this._windowOnResize);
        }
        this._resetCanvas(); // 初始化时设置面板信息
        this._setEventListeners();
        console.log(`写字板初始化完毕`);
    }

    /**
     * 重置画布
     * <ul>
     *     <li>1.初始化时需要设置画布</li>
     *     <li>2.当开启autoResize且浏览器窗口大小变化时需要重置画布</li>
     * </ul>
     */
    private _resetCanvas = (): void => {
        if (this._initialized && (!this._panelConfig.enableDPR ||
            this._panelConfig.enableDPR && this._panelConfig.scale === window.devicePixelRatio)) {
            return;
        }
        if (this._panelConfig.enableDPR) {
            this._panelConfig.scale = window.devicePixelRatio;
        }
        this._canvas.width = this._panelConfig.width; // 设置写字板的宽度和高度
        this._canvas.height = this._panelConfig.height;
        this._context.scale(this._panelConfig.scale, this._panelConfig.scale); // 设置缩放
        this.setPanelBgColor(); // 初始化时设置写字板背景色
        this.setPanelCursorStyle();
        this._initialized && console.log(`检测到窗口大小改变，面板已重置.`);
        this._initialized = true;
    };

    /** 设置事件监听 */
    private _setEventListeners(): void {
        filterEvents(DownEvents).forEach(evtName => {
            this._canvas.addEventListener(evtName, this._readyWriteFun);
        });
        // 当以下事件被触发时停止书写操作
        filterEvents(UpEvents).forEach((evtName) => {
            this._canvas.addEventListener(evtName, this._stopWriting);
        });
    }

    /** 当窗口被调整大小时重置画布 */
    private _windowOnResize = () => {
        this._panelConfig.autoResize && this._resetCanvas(); // 当开启autoResize时，窗口大小改变会重置面板
    };

    /**
     * [鼠标按下|屏幕被触摸]事件方法--准备进行书写
     * @param event Events
     */
    private _readyWriteFun = (event: ElementEvents): void => {
        filterEvents(MoveEvents).forEach(evtName => {
            this._canvas.addEventListener(evtName, this._writingFun);
        });
        this._writingFlag = true; // 鼠标按下表示开始在画布上进行书写/画线，将正在书写的标志置为true
        this._line = new Line();
        this._line.setLine({
            index: this._lineIndex++,
            panelBgColor: this._panelConfig.panelBgColor,
            lineColor: this._panelConfig.lineColor,
            pointList: []
        });
        this._strokeWrite(event, this._Down);
    };

    /**
     * 在[鼠标按下|屏幕被触摸]的过程中进行书写(画线)
     * @param event Events
     */
    private _writingFun = (event: ElementEvents): void => {
        console.log('writing...');
        this._strokeWrite(event, this._Writing);
    };

    /**
     * [鼠标放开|屏幕触摸结束|触点离开面板区域]时立即停止书写
     * @param event Events
     */
    private _stopWriting = (event: ElementEvents): void => {
        this._canvas.removeEventListener('mousemove', this._writingFun);
        this._canvas.removeEventListener('touchmove', this._writingFun);
        this._strokeWrite(event, this._Up);
    };

    /**
     * 开始进行笔画书写
     * @param event Event事件
     * @param eventFlag 事件标志
     */
    private _strokeWrite(event: ElementEvents, eventFlag: number): void {
        event.preventDefault();
        let evt: ElementEvents | Touch = event;
        if (this._isMobilePlatform) {
            const touchEvt = event as TouchEvent;
            evt = touchEvt.changedTouches[0]
        }
        const rect = this._canvas.getBoundingClientRect();
        const point: Point = {
            x: ((evt as any).clientX - rect.left) * (this._canvas.width / parseFloat(this.getPanelWidth())),
            y: ((evt as any).clientY - rect.top) * (this._canvas.height / parseFloat(this.getPanelHeight()))
        };
        point.x = point.x / this._panelConfig.scale;
        point.y = point.y / this._panelConfig.scale;
        switch (eventFlag) {
            case this._Down:
                console.log('start writing');
                this._context.beginPath();
                this._context.moveTo(point.x, point.y);
                this._context.lineTo(point.x, point.y);
                // this._context.arc(point.x, point.y, this._panelConfig.lineWidth / 2, 0, 2 * Math.PI);
                this._setLineStyleOnWriting(this._panelConfig, true); // 绘制新的点或线
                this._context.stroke();
                this._line.addPoint(point);
                this._writingFlag = true;
                break;
            case this._Writing:
                if (this._writingFlag) {
                    const prePoint = this._line.getLastPoint(); // 上一个点
                    if (prePoint) { // 当上一个触点存在时，使用二次贝塞尔曲线绘制线条，增加线条平滑度
                        const cpx = (point.x + prePoint.x) / 2;
                        const cpy = (point.y + prePoint.y) / 2;
                        this._context.quadraticCurveTo(cpx, cpy, point.x, point.y);
                    } else {
                        this._context.lineTo(point.x, point.y);
                    }
                    this._context.stroke(); // 绘制已定义的路径
                    this._line.addPoint(point);
                }
                break;
            case this._Up:
            default:
                if (this._writingFlag) {
                    this._context.lineTo(point.x, point.y);
                    this._context.stroke(); // 绘制已定义的路径
                    this._line.addPoint(point);
                    this._writingFlag = false;
                    this._context.stroke();
                    console.log('end writing');
                }
                this._lineRecord.addLine(this._line); // 将线条加入到线条记录中
                this._context.beginPath();
                break;
        }
    }

    /**
     * 设置面板背景色
     * @param color 颜色值，默认值为null，使用PanelConfig.panelBgColor属性值
     * @param lineRewriteFlag {boolean} 线条重绘标志
     * @returns WritingPanel 当前面板实例对象
     */
    setPanelBgColor(color: any = null, lineRewriteFlag = false): WritingPanel {
        if (color) {
            this._panelConfig.panelBgColor = color;
        }
        this._context.fillStyle = this._panelConfig.panelBgColor; // 设置背景填充颜色
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height); // 绘制已填充的矩形，里面已有的的内容会被覆盖
        if (lineRewriteFlag) {
            this._lineRewrite(false, false);
        }
        return this;
    }

    /** 获取当前面板的背景色 */
    getPanelBgColor(): string | undefined {
        return this._panelConfig.panelBgColor;
    }

    /**
     * 设置写字板高度
     * @param height {number} 高度值
     * @returns 当前写字板实例对象
     */
    setPanelHeight = (height: number): WritingPanel => {
        this._canvas.style.height = (height || 0) + 'px';
        this._canvas.style.width = this.getPanelWidth(); // 保持现有宽度不变
        return this;
    };

    /**
     * 获取面板的高度
     * <p>获取计算后的综合的高度值</p>
     * @returns {string} 单位：px
     */
    getPanelHeight = (): string => {
        return window.getComputedStyle(this._canvas).getPropertyValue('height');
    };

    /**
     * 设置写字板的宽度
     * @param width {number} 线条宽度
     * @returns 当前写字板实例对象
     */
    setPanelWidth = (width: number): WritingPanel => {
        this._canvas.style.width = (width || 0) + 'px';
        this._canvas.style.height = this.getPanelHeight(); // 保持现有高度不变
        return this;
    };

    /**
     * 获取面板的宽度
     * <p>获取计算后的综合的宽度值</p>
     * @returns {string} 单位：px
     */
    getPanelWidth = (): string => {
        return window.getComputedStyle(this._canvas).getPropertyValue('width');
    };

    /**
     * <p>还原面板原始宽高比例
     * <p>在设置了面板的宽度或高度后，可以使用此方法对面板宽度或高度进行还原</p>
     * @param rstWidth {boolean} 还原面板宽度，默认为true
     * @param rstHeight {boolean} 还原面板高度，默认为true
     */
    restorePanelWH = (rstWidth = true, rstHeight = true): void => {
        rstWidth && (this._canvas.style.width = '');
        rstHeight && (this._canvas.style.height = '');
    }

    /**
     * 设置线条宽度
     * @param width {number} 线条宽度
     * @returns 当前写字板实例对象
     */
    setLineWidth = (width: number): WritingPanel => {
        this._panelConfig.lineWidth = width;
        return this;
    };

    /**
     * 设置线条线帽的样式
     * @param value 样式值
     * @returns 当前写字板实例对象
     */
    setLineCap = (value: CanvasLineCap): WritingPanel => {
        this._panelConfig.lineCap = value;
        return this;
    };

    /**
     * 设置线条颜色
     * @param color {string} 颜色值
     * @returns 当前写字板实例对象
     */
    setLineColor = (color: string): WritingPanel => {
        this._panelConfig.lineColor = color;
        return this;
    };

    /**
     * 清除面板内容 (包括面板上的线条和背景色)
     * @param clearRecordFlag {boolean} 是否清除线条记录，默认值为 true.
     * @param resetPanelBgcFlag 是否清除面板背景色，默认值为 true.
     */
    clearPanel = (clearRecordFlag = true, resetPanelBgcFlag = true): void => {
        if (clearRecordFlag) {
            this._line.empty(); // 清空当前正在操作的线条信息
            this._lineRecord.empty(); // 清空线条记录
            this._lineIndex = 0; // 将线条索引置0
        }
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        resetPanelBgcFlag && this.setPanelBgColor();
    };

    /**
     * 获取画布的Base64编码字符串
     */
    getBase64 = (): string => {
        return this._canvas.toDataURL(this._panelConfig.imageMimeType, 1);
    };

    /**
     * 获取画布的Blob|File对象
     * @param type {string} [可选]类型：'blob'|'file'，默认值为blob
     * @param fileName [可选] 文件名称
     */
    getImgBlobOrFile = (type?: 'blob' | 'file', fileName?: string): Promise<Blob | File> => {
        return new Promise<Blob | File>((resolve, reject) => {
            try {
                const base64Str = this.getBase64();
                const arr = base64Str.split(',');
                const mimeType = arr[0].match(/:(.*?);/)![1];
                const bStr = atob(arr[1]); // 将base64解码
                let length = bStr.length;
                const u8Arr = new Uint8Array(length);
                while (length--) {
                    u8Arr[length] = bStr.charCodeAt(length);
                }
                let res;
                if (type === 'file') {
                    fileName = fileName || getRandomFileName();
                    res = new File([u8Arr], fileName, {type: mimeType});
                } else {
                    res = new Blob([u8Arr], {type: mimeType});
                }
                resolve(res);
            } catch (error) {
                console.error(error);
                reject(`getImgBlobOrFile()执行异常 ==> 获取Blob|File对象失败`);
            }
        });
    };

    /**
     * 保存图片
     * <p>功能同downloadImgFile()方法</p>
     * <p>下载结束后可使用.then()方法执行其它相关操作</p>
     * @param fileName 图片文件名称，如果不传则使用随机文件名称
     */
    saveImgFile = (fileName?: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            try {
                const a = document.createElement('a');
                a.href = this.getBase64().replace(this._panelConfig.imageMimeType, 'image/octet-stream');
                a.download = (fileName || getRandomFileName()) + `.${this._panelConfig.imgType}`;
                a.click();
                a.remove(); // 使用完毕后删除a标签
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * 下载图片
     * <p>功能同saveImgFile()方法</p>
     * <p>下载结束后可使用.then()方法执行其它相关操作</p>
     * @param fileName 图片文件名称
     */
    downloadImgFile = (fileName?: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            try {
                this.getImgBlobOrFile().then((blob) => {
                    const tabUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.download = (fileName || getRandomFileName()) + `.${this._panelConfig.imgType}`;
                    a.href = tabUrl;
                    a.click();
                    a.remove(); // 使用完毕后删除a标签
                    window.URL.revokeObjectURL(tabUrl);
                    resolve(true);
                }).catch(e => {
                    throw e;
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    /**
     * <p>撤销/单步撤销操作</p>
     * <p>设置最后一个线条为不可用状态，然后清空画布，根据剩下的可用状态的线条重新绘制</p>
     */
    revoke = (): void => {
        const lastUsableLine = this._lineRecord.findLastUsableLine();
        if (lastUsableLine) {
            lastUsableLine.disable();
            this._lineRewrite(true, true); // 撤销时重绘所有线条，并重绘背景色
        } else {
            console.warn('revoke() ==>当前暂无可撤销的操作！');
        }
    };

    /**
     * 线条重新绘制
     * <p>先清空面板上的线条，再根据线条记录中可使用的线条上的点重新绘制</p>
     * @param clearPanelBgcFlag {boolean} 是否需要先清除面板内所有内容(线条和背景色)
     * @param resetPanelBgcFlag {boolean} 是否根据最后一个可用线条的记录重绘面板背景色
     */
    private _lineRewrite = (clearPanelBgcFlag = true, resetPanelBgcFlag = true): void => {
        if (clearPanelBgcFlag) {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
        const usableLines = this._lineRecord.getUsableLines();
        if (usableLines.length < 1) {
            console.warn('lineRewrite() ==> 暂无可重绘的线条');
            return;
        }
        if (resetPanelBgcFlag) {
            this.setPanelBgColor(usableLines[usableLines.length - 1].panelBgColor); // lineRewrite() ==> 根据最后一个线条中的面板背景色，还原线条操作时的面板背景色
        }
        for (let i = 0; i < usableLines.length; i++) {
            const lineItem = usableLines[i];
            this._context.beginPath(); // 在每个线条绘制时开始一条新路径
            lineItem.pointList.forEach((pointItem, pointIndex) => {
                if (pointIndex === 0) {
                    this._context.moveTo(pointItem.x, pointItem.y);
                }
                this._setLineStyleOnWriting(lineItem); // 根据线条记录进行线条重绘
                this._context.lineTo(pointItem.x, pointItem.y);
                this._context.stroke();
            });
            this._context.beginPath();
        }
    };

    /**
     * 设置绘制线条时的样式
     * @param lineItem Line or PanelConfig 包含线条样式的对象
     * @param readyWriteFlag {boolean} 准备写入标志，默认为false
     */
    private _setLineStyleOnWriting = (lineItem: Line | PanelConfig, readyWriteFlag = false) => {
        this._context.lineWidth = lineItem.lineWidth;
        this._context.lineCap = lineItem.lineCap;
        this._context.lineJoin = lineItem.lineJoin;
        this._context.strokeStyle = lineItem.lineColor;
        this._context.shadowBlur = 1; // 设置阴影模糊级别
        this._context.shadowColor = lineItem.lineColor; // 设置阴影模糊颜色
        if (readyWriteFlag) { // 当开始绘制新线条时，设置当前线条的样式
            this._line.lineWidth = lineItem.lineWidth;
            this._line.lineCap = lineItem.lineCap;
            this._line.lineJoin = lineItem.lineJoin;
            this._line.lineColor = lineItem.lineColor;
        }
    };

    /**
     * 恢复撤销操作
     */
    recover = (): void => {
        const lineItem = this._lineRecord.findFirstDisabledLine();
        if (lineItem) {
            lineItem.enable();
            this._lineRewrite(true, true); // 恢复时重绘所有可用线条
        } else {
            console.warn(`recover() ==>当前暂无可恢复的操作！`);
        }
    };

    /**
     * 设置面板区域的光标样式
     * @param cursorStyle {string} 光标样式
     */
    setPanelCursorStyle = (cursorStyle: any = null): void => {
        this._panelConfig.cursorStyle = cursorStyle;
        this._canvas.style.cursor = this._panelConfig.cursorStyle;
    };

    /**
     * 移除所有事件监听
     * @param {boolean} rmOnResizeEventListener 是否移除窗口onresize事件监听，默认为false
     */
    private _removeAllEvtListeners = (rmOnResizeEventListener = false): void => {
        [...DownEvents, ...MoveEvents, ...UpEvents].forEach(evtName => {
            this._canvas.removeEventListener(evtName, this._readyWriteFun);
            this._canvas.removeEventListener(evtName, this._writingFun);
            this._canvas.removeEventListener(evtName, this._stopWriting);
        });
        rmOnResizeEventListener && window.removeEventListener('resize', this._windowOnResize);
    };

    /** 判断面板是否为空 */
    isEmpty = (): boolean => {
        return this._lineRecord.getUsableLines().length === 0;
    }

    /**
     * 销毁
     * <p>使用同等宽高的canvas替换现有的canvas</p>
     */
    destroy = (): void => {
        this.clearPanel();
        const pElement = this._canvas.parentElement;
        if (pElement) {
            const _newCanvas = document.createElement('canvas');
            _newCanvas.setAttribute('width', String(this._panelConfig.width));
            _newCanvas.setAttribute('height', String(this._panelConfig.height));
            pElement.replaceChild(_newCanvas, this._canvas); // 用新画布替换现有的画布
            this._canvas = _newCanvas;
        }
        this._removeAllEvtListeners(true);
        console.log('destroy() ==> 写字板[canvas]已销毁.');
    };

}
