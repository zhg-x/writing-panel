/**
 * 事件类型
 */
export declare type ElementEvents = MouseEvent | TouchEvent | Event;
/**
 * 鼠标按下/触摸开始--事件名称
 */
export declare const DownEvents: string[];
/**
 * 鼠标移动/触摸移动--事件名称
 */
export declare const MoveEvents: string[];
/**
 * 鼠标抬起/触摸结束/离开面板区域--事件名称
 */
export declare const UpEvents: string[];
/**
 * 图片类型
 */
export declare type ImgType = 'png' | 'jpg' | 'jpeg';
export declare class PanelConfigOption {
    /** 面板宽度，值为number类型或者可以转换为有效数值的string类型 */
    width?: number | string;
    /** 面板高度，值为number类型或者可以转换为有效数值的string类型 */
    height?: number | string;
    panelBgColor?: string;
    lineWidth?: number;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
    imgType?: ImgType;
    /** 鼠标移动到面板区域时的光标样式 */
    cursorStyle?: any;
}
/**
 * 面板配置选项类
 */
export declare class PanelConfig {
    /** 面板高度 */
    private _height?;
    /** 面板宽度 */
    private _width?;
    /** 面板背景色 */
    private _panelBgColor?;
    /** 当前线条宽度 */
    private _lineWidth?;
    /** 线条颜色 */
    private _lineColor?;
    /** 线条末端线帽的样式 */
    private _lineCap?;
    /** 线条交汇时边角的类型 */
    private _lineJoin?;
    /** 图片类型 */
    private _imgType?;
    /** 图片格式的MIME类型 */
    private _imageMimeType?;
    /** 鼠标移动到面板区域时的光标样式 */
    private _cursorStyle?;
    /** 设备的物理像素分辨率与CSS 像素分辨率之比 */
    private _scale;
    constructor(options: PanelConfigOption);
    get scale(): number;
    set scale(value: number);
    get height(): number;
    set height(value: number);
    get width(): number;
    set width(value: number);
    get panelBgColor(): any;
    /***
     * 设置面板背景色
     * @param value 颜色值，默认为'#ffffff'
     */
    set panelBgColor(value: any);
    get lineWidth(): number;
    set lineWidth(value: number);
    get lineColor(): string;
    set lineColor(value: string);
    get lineCap(): CanvasLineCap;
    set lineCap(value: CanvasLineCap);
    get lineJoin(): CanvasLineJoin;
    set lineJoin(value: CanvasLineJoin);
    get imgType(): ImgType;
    /**
     * 设置图片类型，同时图片设置对应格式的MIME类型
     * @param value 图片类型
     */
    set imgType(value: ImgType);
    /** 获取对应图片格式的MIME类型 */
    get imageMimeType(): any;
    set imageMimeType(value: any);
    get cursorStyle(): string;
    /**
     * 设置光标样式
     * @param value
     */
    set cursorStyle(value: string);
}
/**
 * 触点
 */
export declare class Point {
    /** 横坐标 */
    private _x?;
    /** 纵坐标 */
    private _y?;
    constructor(point: {
        x: number;
        y: number;
    });
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
}
export declare class LineOption {
    index: number | undefined;
    /** 操作线条时面板的背景色 */
    panelBgColor?: any;
    /** 线条颜色 */
    lineColor?: any;
    lineWidth?: any;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
    /** 线条上的点的集合 */
    pointList?: Point[];
}
/**
 * 线条[实体类]
 */
export declare class Line {
    /** 线条的key */
    private _key?;
    /** 线条的index编号 */
    private _index?;
    /** 线条是否可用/显示 */
    private _usable?;
    /** 线条操作时面板的背景色 */
    private _panelBgColor?;
    /** 线条颜色 */
    private _lineColor?;
    /** 线条样式 */
    private _lineCap?;
    /** 线条宽度 */
    private _lineWidth?;
    /** 线条交汇时边角的类型 */
    private _lineJoin?;
    /** 组成线条的点 */
    private _pointList?;
    constructor();
    setLine(lineOption: LineOption): void;
    get key(): string;
    set key(value: string);
    get index(): number | undefined;
    set index(value: number | undefined);
    get usable(): boolean;
    set usable(value: boolean);
    get panelBgColor(): any;
    set panelBgColor(value: any);
    get lineColor(): any;
    set lineColor(value: any);
    get lineCap(): CanvasLineCap;
    set lineCap(value: CanvasLineCap);
    get lineJoin(): CanvasLineJoin;
    set lineJoin(value: CanvasLineJoin);
    get lineWidth(): number;
    set lineWidth(value: number);
    get pointList(): Point[];
    set pointList(value: Point[]);
    /** 向线条中添加触点信息 */
    addPoint(point: Point): void;
    /** 禁用线条：将线条置为不可用状态 */
    disable(): void;
    /** 启用线条 */
    enable(): void;
    /**
     * 查找当前线条上的最后一个点，如果线条上不存在点则返回undefined
     * @returns point|undefined
     */
    getLastPoint(): Point | undefined;
    /** 清空线条信息 */
    empty(): void;
}
/**
 * 线条记录[实体类]
 * <p>一次面板操作，记录多个线条信息</p>
 */
export declare class LineRecord {
    private _lineList?;
    constructor();
    /** 设置线条信息 */
    setLineRecord(lineList?: Line[]): void;
    set lineList(value: Line[]);
    get lineList(): Line[];
    /**
     * 判断线条是否存在
     * @param line 线条的key或者line对象
     * @returns boolean true or false
     */
    hasLine(line: string | Line): boolean;
    /**
     * 禁用指定线条
     * @param line 线条的key或者线条对象
     */
    disableLine(line: string | Line): void;
    /**
     * 添加线条
     * @param line 线条对象
     */
    addLine(line: Line): void;
    /**
     * 查找最后一条可用的线条
     * @returns Line|null 查找到则返回线条，查找不到则返回undefined
     */
    findLastUsableLine(): Line | undefined;
    /** 获取可用的线条列表 */
    getUsableLine(): Line[];
    /**
     * 查找第一个被禁用/不可用的线条
     * @returns Line|null 查找到则返回线条，查找不到则返回undefined
     */
    findFirstDisabledLine(): Line | undefined;
    /** 线条记录是否为空 */
    isEmpty(): boolean;
    /** 清空已记录的线条信息 */
    empty(): void;
}
