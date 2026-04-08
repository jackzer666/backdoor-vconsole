import VConsole from "vconsole";

const DEFAULT_CONFIG = {
  COUNT: 7,
  INTERVAL: 300,
  DURATION: 7 * 1000,
  CLOSE_COUNT: 10,
  CLOSE_INTERVAL: 300,
  CLOSE_DURATION: 10 * 1000,
};

let vConsoleInstance: VConsole | null = null;

const toggleVConsole = (): void => {
  if (vConsoleInstance) {
    vConsoleInstance.destroy();
    vConsoleInstance = null;
    console.log("vConsole is closed");
  } else {
    vConsoleInstance = new VConsole();
    console.log("vConsole is started", vConsoleInstance);
  }
};

const isMobile = (): boolean =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const getTarget = (target: string | HTMLElement): HTMLElement => {
  if (typeof target === "string") {
    const t = document.querySelector(target);
    if (t instanceof HTMLElement) {
      return t;
    } else {
      throw new Error(`can not find target`);
    }
  } else if (target instanceof HTMLElement) {
    return target;
  } else {
    throw new Error("target is required");
  }
};

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
export const rapidClicks = (options: RapidClicksOptions): (() => void) => {
  const { target, openCount = DEFAULT_CONFIG.COUNT, closeCount = DEFAULT_CONFIG.CLOSE_COUNT, interval = DEFAULT_CONFIG.INTERVAL } = options;
  const t = getTarget(target);
  let clickTimer: ReturnType<typeof setTimeout> | null = null;
  let clickCount = 0;

  const handler = (): void => {
    if (clickTimer) clearTimeout(clickTimer);
    clickCount += 1;
    const threshold = vConsoleInstance ? closeCount : openCount;
    if (clickCount === threshold) {
      toggleVConsole();
      clickCount = 0;
    }
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, interval);
  };

  t.addEventListener("click", handler);

  return () => {
    t.removeEventListener("click", handler);
    if (clickTimer) clearTimeout(clickTimer);
  };
};

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
export const longPress = (options: LongPressOptions): (() => void) => {
  const { target, openDuration = DEFAULT_CONFIG.DURATION, closeDuration = DEFAULT_CONFIG.CLOSE_DURATION } = options;
  const t = getTarget(target);
  let timer: ReturnType<typeof setTimeout> | null = null;

  const onPress = (): void => {
    if (timer) clearTimeout(timer);
    const duration = vConsoleInstance ? closeDuration : openDuration;
    timer = setTimeout(toggleVConsole, duration);
  };

  const clearTimer = (): void => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  const events = isMobile()
    ? { touchstart: onPress, touchend: clearTimer, touchcancel: clearTimer }
    : { mousedown: onPress, mouseup: clearTimer, mouseleave: clearTimer };

  Object.entries(events).forEach(([event, handler]) =>
    t.addEventListener(event, handler)
  );

  return () => {
    Object.entries(events).forEach(([event, handler]) =>
      t.removeEventListener(event, handler)
    );
    clearTimer();
  };
};

/**
 * 手动切换 vConsole 开关状态
 */
export { toggleVConsole };
