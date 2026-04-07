import VConsole from "vconsole";

const DEFAULT_CONFIG = {
  COUNT: 7,
  INTERVAL: 300,
  DURATION: 7 * 1000,
  CLOSE_COUNT: 10,
  CLOSE_INTERVAL: 300,
  CLOSE_DURATION: 10 * 1000,
};

let vConsoleInstance = null;

const toggleVConsole = () => {
  if (vConsoleInstance) {
    vConsoleInstance.destroy();
    vConsoleInstance = null;
    console.log("vConsole is closed");
  } else {
    vConsoleInstance = new VConsole();
    console.log("vConsole is started", vConsoleInstance);
  }
};

const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const getTarget = (target) => {
  if (typeof target === "string") {
    const t = document.querySelector(target);
    if (t) {
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

// 快速点击 - 点击 openCount 次开启，点击 closeCount 次关闭
const rapidClicks = ({
  target,
  openCount = DEFAULT_CONFIG.COUNT,
  closeCount = DEFAULT_CONFIG.CLOSE_COUNT,
  interval = DEFAULT_CONFIG.INTERVAL,
}) => {
  const t = getTarget(target);
  let clickTimer = null;
  let clickCount = 0;

  const handler = () => {
    clearTimeout(clickTimer);
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
    clearTimeout(clickTimer);
  };
};

// 长按 - 长按 openDuration 开启，长按 closeDuration 关闭
const longPress = ({
  target,
  openDuration = DEFAULT_CONFIG.DURATION,
  closeDuration = DEFAULT_CONFIG.CLOSE_DURATION,
}) => {
  const t = getTarget(target);
  let timer = null;

  const onPress = () => {
    clearTimeout(timer);
    const duration = vConsoleInstance ? closeDuration : openDuration;
    timer = setTimeout(toggleVConsole, duration);
  };

  const clearTimer = () => {
    clearTimeout(timer);
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

export { rapidClicks, longPress, toggleVConsole };
