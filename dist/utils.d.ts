/**
 * 检验参数是否为Object对象
 * @param arg 参数值
 * @returns boolean true or false
 */
export declare function isObject(arg: any): boolean;
/**
 * 判断参数是否为非NaN的安全数值范围内Number值
 * @param arg 参数值
 * @returns boolean true/false
 */
export declare function isValidNumber(arg: any): boolean;
/**
 * 判断参数是否为合法数值，如果不合法，则返回默认值
 * @param arg 需要校验的参数
 * @param defaultValue {number} 默认值，默认值为0
 * @returns 合法参数值或者默认值-0
 */
export declare function toNumber(arg: any, defaultValue?: number): number;
/**
 * 检测浏览器是否处于移动平台环境下
 */
export declare function isMobilePlatform(): boolean;
/**
 * <p>根据是否是移动端环境来过滤事件</p>
 * <p>如果是移动端环境，则过滤出touch开头的事件名，否则过滤出mouse开头的事件名称</p>
 * @param eventNames 事件名称数组
 * @param filterFlag 是否根据浏览器运行环境过滤事件
 */
export declare function filterEvents(eventNames: Array<string>, filterFlag?: boolean): Array<string>;
/**
 * 获取日期格式化字符串
 * @param date 日期
 * @param fmt 格式化
 */
export declare function dateFormat(date: Date, fmt?: string): string;
/**
 * <p>生成随机的文件名称</p>
 * <p>生成规则: IMG_+年月日时分秒+6位随机数字</p>
 * @example IMG_20220723142036_445638
 */
export declare function getRandomFileName(): string;
