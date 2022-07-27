import { isObject, toNumber } from './utils';
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
export class PanelConfigOption {
}
/**
 * 面板配置选项类
 */
export class PanelConfig {
    constructor(options) {
        /** 设备的物理像素分辨率与CSS 像素分辨率之比 */
        this._scale = 1;
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
    get scale() {
        return this._scale || 1;
    }
    set scale(value) {
        this._scale = value;
    }
    get height() {
        return this._height || 0;
    }
    set height(value) {
        this._height = Math.floor(toNumber(value) * this._scale);
    }
    get width() {
        return this._width || 0;
    }
    set width(value) {
        this._width = Math.floor(toNumber(value) * this._scale);
    }
    get panelBgColor() {
        return this._panelBgColor;
    }
    /***
     * 设置面板背景色
     * @param value 颜色值，默认为'#ffffff'
     */
    set panelBgColor(value) {
        this._panelBgColor = value || '#ffffff';
    }
    get lineWidth() {
        return this._lineWidth || 1;
    }
    set lineWidth(value) {
        this._lineWidth = toNumber(value, 1);
    }
    get lineColor() {
        return this._lineColor || '#000000';
    }
    set lineColor(value) {
        this._lineColor = value || '#000000';
    }
    get lineCap() {
        return this._lineCap || 'round';
    }
    set lineCap(value) {
        this._lineCap = ['butt', 'round', 'square'].includes(value) ? value : 'round';
    }
    get lineJoin() {
        return this._lineJoin || 'round';
    }
    set lineJoin(value) {
        this._lineJoin = value || 'round';
    }
    get imgType() {
        return this._imgType || 'png';
    }
    /**
     * 设置图片类型，同时图片设置对应格式的MIME类型
     * @param value 图片类型
     */
    set imgType(value) {
        if (value && !['png', 'jpg', 'jpeg'].includes(value.toLowerCase())) {
            throw Error(`图片类型必须是png/jpg/jpeg中的一种`);
        }
        this._imgType = value || 'png';
        this.imageMimeType = this._imgType === 'png' ? 'image/png' : 'image/jpeg';
    }
    /** 获取对应图片格式的MIME类型 */
    get imageMimeType() {
        return this._imageMimeType || 'image/png';
    }
    set imageMimeType(value) {
        this._imageMimeType = value;
    }
    get cursorStyle() {
        return this._cursorStyle || 'crosshair';
    }
    /** 设置光标样式 */
    set cursorStyle(value) {
        this._cursorStyle = value || 'crosshair';
    }
    /** 启用浏览器窗口缩放时重置面板功能 */
    get autoResize() {
        return !!this._autoResize;
    }
    /** 启用设别像素比 window.devicePixelRatio */
    get enableDPR() {
        return !!this._enableDPR;
    }
}
/**
 * 触点
 */
export class Point {
    constructor(point) {
        if (!isObject(point))
            throw Error(`Point constructor() 传入参数必须是对象`);
        this.x = point.x;
        this.y = point.y;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
}
export class LineOption {
}
/**
 * 线条[实体类]
 */
export class Line {
    constructor() {
        this.key = '';
        this.pointList = [];
    }
    setLine(lineOption) {
        if (!isObject(lineOption))
            throw Error('Line constructor() 传入的参数必须为对象');
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
    get key() {
        return this._key || '';
    }
    set key(value) {
        this._key = value;
    }
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
    }
    get usable() {
        return this._usable || false;
    }
    set usable(value) {
        this._usable = value;
    }
    get panelBgColor() {
        return this._panelBgColor;
    }
    set panelBgColor(value) {
        this._panelBgColor = value;
    }
    get lineColor() {
        return this._lineColor;
    }
    set lineColor(value) {
        this._lineColor = value;
    }
    get lineCap() {
        return this._lineCap || 'round';
    }
    set lineCap(value) {
        this._lineCap = value;
    }
    get lineJoin() {
        return this._lineJoin || 'round';
    }
    set lineJoin(value) {
        this._lineJoin = value;
    }
    get lineWidth() {
        return this._lineWidth;
    }
    set lineWidth(value) {
        this._lineWidth = value;
    }
    get pointList() {
        return this._pointList || [];
    }
    set pointList(value) {
        this._pointList = value;
    }
    /** 向线条中添加触点信息 */
    addPoint(point) {
        this.pointList.push(point);
    }
    /** 禁用线条：将线条置为不可用状态 */
    disable() {
        this.usable = false;
    }
    /** 启用线条 */
    enable() {
        this.usable = true;
    }
    /**
     * 查找当前线条上的最后一个点，如果线条上不存在点则返回undefined
     * @returns point|undefined
     */
    getLastPoint() {
        return this.pointList && !!this.pointList.length ? this.pointList[this.pointList.length - 1] : undefined;
    }
    /** 清空线条信息 */
    empty() {
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
    constructor() {
        this.lineList = [];
    }
    /** 设置线条信息 */
    setLineRecord(lineList) {
        this.lineList = lineList || [];
    }
    set lineList(value) {
        this._lineList = value;
    }
    get lineList() {
        return this._lineList || [];
    }
    /**
     * 判断线条是否存在
     * @param line 线条的key或者line对象
     * @returns boolean true or false
     */
    hasLine(line) {
        return this.lineList.findIndex(d => d.key === (typeof line === 'string' ? line : line.key)) !== -1;
    }
    /**
     * 禁用指定线条
     * @param line 线条的key或者线条对象
     */
    disableLine(line) {
        if (this.hasLine(line)) {
            const item = this.lineList.find(d => d.key === (typeof line === 'string' ? line : line.key));
            item.usable = false;
        }
    }
    /**
     * 添加线条
     * @param line 线条对象
     */
    addLine(line) {
        !this.hasLine(line) && !!line.key && this.lineList.push(line);
    }
    /**
     * 查找最后一条可用的线条
     * @returns Line|null 查找到则返回线条，查找不到则返回undefined
     */
    findLastUsableLine() {
        const lines = this.lineList.filter(d => d.usable);
        return lines.length ? lines[lines.length - 1] : undefined;
    }
    /** 获取可用的线条列表 */
    getUsableLines() {
        return this.lineList.filter(d => d.usable);
    }
    /**
     * 查找第一个被禁用/不可用的线条
     * @returns Line|null 查找到则返回线条，查找不到则返回undefined
     */
    findFirstDisabledLine() {
        return this.lineList.find(d => !d.usable);
    }
    /** 线条记录是否为空 */
    isEmpty() {
        return !this.lineList.length;
    }
    /** 清空已记录的线条信息 */
    empty() {
        this.lineList = [];
    }
}
