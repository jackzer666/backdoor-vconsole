import VConsole from "vconsole";

const DEFAULT_CONFIG = {
  COUNT: 7,
  INTERVAL: 300,
  DURATION: 7 * 1000,
};

const startVConsole = () => {
  const vConsole = new VConsole();
  console.log("vConsole is started", vConsole);
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
    throw new Error("can not find target");
  }
};

// 快速点击
const rapidClicks = ({
  target,
  count = DEFAULT_CONFIG.COUNT,
  interval = DEFAULT_CONFIG.INTERVAL,
}) => {
  const t = getTarget(target);
  const clickInner = () => {
    let clickTimer;
    let clickCount = 0;
    return () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
      clickCount += 1;
      if (clickCount === count) {
        startVConsole();
        clickCount = 0;
      } else {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, interval);
      }
    };
  };
  t.addEventListener("click", clickInner());
};

// 长按
const longPress = ({ target, duration = DEFAULT_CONFIG.DURATION }) => {
  const t = getTarget(target);
  let longPressInner;
  if (isMobile()) {
    longPressInner = () => {
      return () => {
        let timer;
        t.addEventListener("touchstart", () => {
          timer = setTimeout(() => {
            startVConsole();
          }, duration);
        });
        t.addEventListener("touchend", () => {
          if (timer) {
            clearTimeout(timer);
          }
        });
        t.addEventListener("touchcancel", () => {
          if (timer) {
            clearTimeout(timer);
          }
        });
      };
    };
  } else {
    longPressInner = () => {
      return () => {
        let timer;
        t.addEventListener("mousedown", () => {
          timer = setTimeout(() => {
            startVConsole();
          }, duration);
        });
        t.addEventListener("mouseup", () => {
          if (timer) {
            clearTimeout(timer);
          }
        });
        t.addEventListener("mouseleave", () => {
          if (timer) {
            clearTimeout(timer);
          }
        });
      };
    };
  }
};

export { rapidClicks, longPress };
