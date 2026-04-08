declare const toggleVConsole: () => void;
export interface RapidClicksOptions {
    /** 选择器或 HTMLElement */
    target: string | HTMLElement;
    /** 开启次数，默认 7 */
    openCount?: number;
    /** 关闭次数，默认 10 */
    closeCount?: number;
    /** 点击间隔，默认 300ms */
    interval?: number;
}
/**
 * 快速点击 - 点击 openCount 次开启，点击 closeCount 次关闭
 */
export declare const rapidClicks: (options: RapidClicksOptions) => (() => void);
export interface LongPressOptions {
    /** 选择器或 HTMLElement */
    target: string | HTMLElement;
    /** 开启时长，默认 7000ms */
    openDuration?: number;
    /** 关闭时长，默认 10000ms */
    closeDuration?: number;
}
/**
 * 长按 - 长按 openDuration 开启，长按 closeDuration 关闭
 */
export declare const longPress: (options: LongPressOptions) => (() => void);
/**
 * 手动切换 vConsole 开关状态
 */
export { toggleVConsole };
