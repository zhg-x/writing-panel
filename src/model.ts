import { isObject, toNumber } from './utils';

/**
 * 事件类型
 */
export type ElementEvents = MouseEvent | TouchEvent | Event;

/**
 * 鼠标按下/触摸开始--事件名称
 */
export const DownEvents = ['mousedown', 'touchstart'];

/**
 * 鼠标移动/触摸移动--事件名称
 */
export const MoveEvents = ['mousemove', 'touchmove'];

/**
 * 鼠标抬起/触摸结束/离开面板区域--事件名称
 */
export const UpEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];

/**
 * 图片类型
 */
export type ImgType = 'png' | 'jpg' | 'jpeg';

export class PanelConfigOption {
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
    /** 浏览器窗口改变时是否重置面板，默认为true */
    autoResize?: boolean;
    /**
     * <p>是否启用设备像素比 window.devicePixelRatio</p>
     * <p>如果开始此选项，则在设置画布/面板的width和height属性值时，需要根据设备像素比进行计算</p>
     * <p>默认为false</p>
     */
    enableDPR?: boolean;
}

/**
 * 面板配置选项类
 */
export class PanelConfig {

    /** 面板高度 */
    private _height?: number;
    /** 面板宽度 */
    private _width?: number;
    /** 面板背景色 */
    private _panelBgColor?: any;
    /** 当前线条宽度 */
    private _lineWidth?: number;
    /** 线条颜色 */
    private _lineColor?: string;
    /** 线条末端线帽的样式 */
    private _lineCap?: CanvasLineCap;
    /** 线条交汇时边角的类型 */
    private _lineJoin?: CanvasLineJoin;
    /** 图片类型 */
    private _imgType?: null | undefined | ImgType;
    /** 图片格式的MIME类型 */
    private _imageMimeType?: any;
    /** 鼠标移动到面板区域时的光标样式 */
    private _cursorStyle?: string;
    /** 设备的物理像素分辨率与CSS 像素分辨率之比 */
    private _scale: number = 1;
    /** 浏览器窗口改变时是否重置面板 */
    private readonly _autoResize: boolean;
    /** 启用设备像素比 window.devicePixelRatio */
    private readonly _enableDPR?: boolean;

    constructor(options: PanelConfigOption) {
        const _options = isObject(options) ? options : {};
        this.height = toNumber(_options.height);
        this.width = toNumber(_options.width);
        this.panelBgColor = _options.panelBgColor;
        this.lineWidth = toNumber(_options.lineWidth, 1);
        this.lineCap = _options.lineCap || 'round';
        this.lineJoin = _options.lineJoin || 'round';
        this.imgType = _options.imgType || 'png';
        this.cursorStyle = _options.cursorStyle;
        this._autoResize = _options.autoResize !== false;
        this._enableDPR = !!_options.enableDPR;
        this.scale = this.enableDPR ? window.devicePixelRatio : 1;
    }

    get scale(): number {
        return this._scale || 1;
    }

    set scale(value: number) {
        this._scale = value;
    }

    get height(): number {
        return this._height || 0;
    }

    set height(value: number) {
        this._height = Math.floor(toNumber(value) * this._scale);
    }

    get width(): number {
        return this._width || 0;
    }

    set width(value: number) {
        this._width = Math.floor(toNumber(value) * this._scale);
    }

    get panelBgColor(): any {
        return this._panelBgColor;
    }

    /***
     * 设置面板背景色
     * @param value 颜色值，默认为'#ffffff'
     */
    set panelBgColor(value: any) {
        this._panelBgColor = value || '#ffffff';
    }

    get lineWidth(): number {
        return this._lineWidth || 1;
    }

    set lineWidth(value: number) {
        this._lineWidth = toNumber(value, 1);
    }

    get lineColor(): string {
        return this._lineColor || '#000000';
    }

    set lineColor(value: string) {
        this._lineColor = value || '#000000';
    }

    get lineCap(): CanvasLineCap {
        return this._lineCap || 'round';
    }

    set lineCap(value: CanvasLineCap) {
        this._lineCap = ['butt', 'round', 'square'].includes(value) ? value : 'round';
    }

    get lineJoin(): CanvasLineJoin {
        return this._lineJoin || 'round';
    }

    set lineJoin(value: CanvasLineJoin) {
        this._lineJoin = value || 'round';
    }

    get imgType(): ImgType {
        return this._imgType || 'png';
    }

    /**
     * 设置图片类型，同时图片设置对应格式的MIME类型
     * @param value 图片类型
     */
    set imgType(value: ImgType) {
        if (value && !['png', 'jpg', 'jpeg'].includes(value.toLowerCase())) {
            throw Error(`图片类型必须是png/jpg/jpeg中的一种`);
        }
        this._imgType = value || 'png';
        this.imageMimeType = this._imgType === 'png' ? 'image/png' : 'image/jpeg';
    }

    /** 获取对应图片格式的MIME类型 */
    get imageMimeType(): any {
        return this._imageMimeType || 'image/png';
    }

    set imageMimeType(value: any) {
        this._imageMimeType = value;
    }

    get cursorStyle(): string {
        return this._cursorStyle || 'crosshair';
    }

    /** 设置光标样式 */
    set cursorStyle(value: string) {
        this._cursorStyle = value || 'crosshair';
    }

    /** 启用浏览器窗口缩放时重置面板功能 */
    get autoResize(): boolean {
        return !!this._autoResize;
    }

    /** 启用设别像素比 window.devicePixelRatio */
    get enableDPR(): boolean {
        return !!this._enableDPR;
    }
}

/**
 * 触点
 */
export class Point {

    /** 横坐标 */
    private _x?: number;
    /** 纵坐标 */
    private _y?: number;

    constructor(point: { x: number; y: number }) {
        if (!isObject(point)) throw Error(`Point constructor() 传入参数必须是对象`);
        this.x = point.x;
        this.y = point.y;
    }

    get x(): number {
        return this._x!;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y!;
    }

    set y(value: number) {
        this._y = value;
    }
}

export class LineOption {
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
export class Line {

    /** 线条的key */
    private _key?: string;
    /** 线条的index编号 */
    private _index?: number;
    /** 线条是否可用/显示 */
    private _usable?: boolean;
    /** 线条操作时面板的背景色 */
    private _panelBgColor?: any;
    /** 线条颜色 */
    private _lineColor?: any;
    /** 线条样式 */
    private _lineCap?: CanvasLineCap;
    /** 线条宽度 */
    private _lineWidth?: any;
    /** 线条交汇时边角的类型 */
    private _lineJoin?: CanvasLineJoin;
    /** 组成线条的点 */
    private _pointList?: Point[];

    constructor() {
        this.key = '';
        this.pointList = [];
    }

    setLine(lineOption: LineOption) {
        if (!isObject(lineOption)) throw Error('Line constructor() 传入的参数必须为对象');
        this.index = lineOption.index;
        this.key = 'line_' + lineOption.index;
        this.pointList = lineOption.pointList || [];
        this.usable = true; // 新添加的线条默认为true
        this.panelBgColor = lineOption.panelBgColor;
        this.lineColor = lineOption.lineColor;
        this.lineCap = lineOption.lineCap || 'round';
        this.lineJoin = lineOption.lineJoin || 'round';
        this.lineWidth = lineOption.lineWidth;
    }

    get key(): string {
        return this._key || '';
    }

    set key(value: string) {
        this._key = value;
    }

    get index(): number | undefined {
        return this._index;
    }

    set index(value: number | undefined) {
        this._index = value;
    }

    get usable(): boolean {
        return this._usable || false;
    }

    set usable(value: boolean) {
        this._usable = value;
    }

    get panelBgColor(): any {
        return this._panelBgColor;
    }

    set panelBgColor(value: any) {
        this._panelBgColor = value;
    }

    get lineColor(): any {
        return this._lineColor;
    }

    set lineColor(value: any) {
        this._lineColor = value;
    }

    get lineCap(): CanvasLineCap {
        return this._lineCap || 'round';
    }

    set lineCap(value: CanvasLineCap) {
        this._lineCap = value;
    }

    get lineJoin(): CanvasLineJoin {
        return this._lineJoin || 'round';
    }

    set lineJoin(value: CanvasLineJoin) {
        this._lineJoin = value;
    }

    get lineWidth(): number {
        return this._lineWidth;
    }

    set lineWidth(value: number) {
        this._lineWidth = value;
    }

    get pointList(): Point[] {
        return this._pointList || [];
    }

    set pointList(value: Point[]) {
        this._pointList = value;
    }

    /** 向线条中添加触点信息 */
    addPoint(point: Point): void {
        this.pointList.push(point);
    }

    /** 禁用线条：将线条置为不可用状态 */
    disable(): void {
        this.usable = false;
    }

    /** 启用线条 */
    enable(): void {
        this.usable = true;
    }

    /**
     * 查找当前线条上的最后一个点，如果线条上不存在点则返回undefined
     * @returns point|undefined
     */
    getLastPoint(): Point | undefined {
        return this.pointList && !!this.pointList.length ? this.pointList[this.pointList.length - 1] : undefined;
    }

    /** 清空线条信息 */
    empty(): void {
        this.key = '';
        this.index = 0;
        this.pointList = [];
        this.usable = false;
        this.lineColor = null;
        this.lineCap = 'round';
        this.lineWidth = 1;
        this.lineJoin = 'round';
    }
}

/**
 * 线条记录[实体类]
 * <p>一次面板操作，记录多个线条信息</p>
 */
export class LineRecord {

    private _lineList?: Line[];

    constructor() {
        this.lineList = [];
    }

    /** 设置线条信息 */
    setLineRecord(lineList?: Line[]) {
        this.lineList = lineList || [];
    }

    set lineList(value: Line[]) {
        this._lineList = value;
    }

    get lineList(): Line[] {
        return this._lineList || [];
    }

    /**
     * 判断线条是否存在
     * @param line 线条的key或者line对象
     * @returns boolean true or false
     */
    hasLine(line: string | Line): boolean {
        return this.lineList.findIndex(d => d.key === (typeof line === 'string' ? line : line.key)) !== -1;
    }

    /**
     * 禁用指定线条
     * @param line 线条的key或者线条对象
     */
    disableLine(line: string | Line): void {
        if (this.hasLine(line)) {
            const item = this.lineList.find(d => d.key === (typeof line === 'string' ? line : line.key));
            item!.usable = false;
        }
    }

    /**
     * 添加线条
     * @param line 线条对象
     */
    addLine(line: Line): void {
        !this.hasLine(line) && !!line.key && this.lineList.push(line);
    }

    /**
     * 查找最后一条可用的线条
     * @returns Line|null 查找到则返回线条，查找不到则返回undefined
     */
    findLastUsableLine(): Line | undefined {
        const lines = this.lineList.filter(d => d.usable);
        return lines.length ? lines[lines.length - 1] : undefined;
    }

    /** 获取可用的线条列表 */
    getUsableLine(): Line[] {
        return this.lineList.filter(d => d.usable);
    }

    /**
     * 查找第一个被禁用/不可用的线条
     * @returns Line|null 查找到则返回线条，查找不到则返回undefined
     */
    findFirstDisabledLine(): Line | undefined {
        return this.lineList.find(d => !d.usable);
    }

    /** 线条记录是否为空 */
    isEmpty(): boolean {
        return !!this.lineList.length;
    }

    /** 清空已记录的线条信息 */
    empty(): void {
        this.lineList = [];
    }

}
