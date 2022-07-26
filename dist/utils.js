/**
 * 检验参数是否为Object对象
 * @param arg 参数值
 * @returns boolean true or false
 */
export function isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
}
/**
 * 判断参数是否为非NaN的安全数值范围内Number值
 * @param arg 参数值
 * @returns boolean true/false
 */
export function isValidNumber(arg) {
    return Object.prototype.toString.call(arg) === '[object Number]' && !isNaN(arg) && isFinite(arg);
}
/**
 * 判断参数是否为合法数值，如果不合法，则返回默认值
 * @param arg 需要校验的参数
 * @param defaultValue {number} 默认值，默认值为0
 * @returns 合法参数值或者默认值-0
 */
export function toNumber(arg, defaultValue = 0) {
    arg = Number(arg);
    return isValidNumber(arg) ? arg : defaultValue;
}
/**
 * 检测浏览器是否处于移动平台环境下
 */
export function isMobilePlatform() {
    return /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);
}
/**
 * <p>根据是否是移动端环境来过滤事件</p>
 * <p>如果是移动端环境，则过滤出touch开头的事件名，否则过滤出mouse开头的事件名称</p>
 * @param eventNames 事件名称数组
 */
export function filterEvents(eventNames) {
    return eventNames.filter(d => isMobilePlatform() ? d.startsWith('touch') : d.startsWith('mouse'));
}
/**
 * 获取日期格式化字符串
 * @param date 日期
 * @param fmt 格式化
 */
export function dateFormat(date, fmt = 'YYYY-MM-dd') {
    const opt = {
        "[Y|y]+": date.getFullYear().toString(),
        "M+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "h+": (date.getHours() >= 12 ? date.getHours() - 12 : date.getHours()).toString(),
        "m+": date.getMinutes().toString(),
        "s+": date.getSeconds().toString(),
        "q+": Math.floor((date.getMonth() + 3) / 3).toString(),
        "S+": date.getMilliseconds().toString() // 毫秒
    };
    let matchRes; // 正则匹配结果
    for (const k in opt) {
        matchRes = fmt.match(new RegExp(k, 'g')); // match()方法检索正则表达式的匹配，如果没有找到任何匹配的文本，返回null，否则返回数组
        matchRes && matchRes.forEach(matchedItem => {
            fmt = fmt.replace(matchedItem, opt[k].padStart(matchedItem.length, '0'));
        });
    }
    return fmt;
}
/**
 * <p>生成随机的文件名称</p>
 * <p>生成规则: IMG_+年月日时分秒+6位随机数字</p>
 * @example IMG_20220723142036_445638
 */
export function getRandomFileName() {
    return 'IMG_' + dateFormat(new Date(), 'YYYYMMddHHmmss') + '_' + (Math.random() * Math.pow(10, 8)).toString().slice(0, 6);
}
