import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import VConsole from 'vconsole';

var DEFAULT_CONFIG = {
  COUNT: 7,
  INTERVAL: 300,
  DURATION: 7 * 1000,
  CLOSE_COUNT: 10,
  CLOSE_DURATION: 10 * 1000
};
var vConsoleInstance = null;
var toggleVConsole = function toggleVConsole() {
  if (vConsoleInstance) {
    vConsoleInstance.destroy();
    vConsoleInstance = null;
    console.log("vConsole is closed");
  } else {
    vConsoleInstance = new VConsole();
    console.log("vConsole is started", vConsoleInstance);
  }
};
var isMobile = function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
var getTarget = function getTarget(target) {
  if (typeof target === "string") {
    var t = document.querySelector(target);
    if (t) {
      return t;
    } else {
      throw new Error("can not find target");
    }
  } else if (target instanceof HTMLElement) {
    return target;
  } else {
    throw new Error("target is required");
  }
};

// 快速点击 - 点击 openCount 次开启，点击 closeCount 次关闭
var rapidClicks = function rapidClicks(_ref) {
  var target = _ref.target,
    _ref$openCount = _ref.openCount,
    openCount = _ref$openCount === void 0 ? DEFAULT_CONFIG.COUNT : _ref$openCount,
    _ref$closeCount = _ref.closeCount,
    closeCount = _ref$closeCount === void 0 ? DEFAULT_CONFIG.CLOSE_COUNT : _ref$closeCount,
    _ref$interval = _ref.interval,
    interval = _ref$interval === void 0 ? DEFAULT_CONFIG.INTERVAL : _ref$interval;
  var t = getTarget(target);
  var clickTimer = null;
  var clickCount = 0;
  var handler = function handler() {
    clearTimeout(clickTimer);
    clickCount += 1;
    var threshold = vConsoleInstance ? closeCount : openCount;
    if (clickCount === threshold) {
      toggleVConsole();
      clickCount = 0;
    }
    clickTimer = setTimeout(function () {
      clickCount = 0;
    }, interval);
  };
  t.addEventListener("click", handler);
  return function () {
    t.removeEventListener("click", handler);
    clearTimeout(clickTimer);
  };
};

// 长按 - 长按 openDuration 开启，长按 closeDuration 关闭
var longPress = function longPress(_ref2) {
  var target = _ref2.target,
    _ref2$openDuration = _ref2.openDuration,
    openDuration = _ref2$openDuration === void 0 ? DEFAULT_CONFIG.DURATION : _ref2$openDuration,
    _ref2$closeDuration = _ref2.closeDuration,
    closeDuration = _ref2$closeDuration === void 0 ? DEFAULT_CONFIG.CLOSE_DURATION : _ref2$closeDuration;
  var t = getTarget(target);
  var timer = null;
  var onPress = function onPress() {
    clearTimeout(timer);
    var duration = vConsoleInstance ? closeDuration : openDuration;
    timer = setTimeout(toggleVConsole, duration);
  };
  var clearTimer = function clearTimer() {
    clearTimeout(timer);
    timer = null;
  };
  var events = isMobile() ? {
    touchstart: onPress,
    touchend: clearTimer,
    touchcancel: clearTimer
  } : {
    mousedown: onPress,
    mouseup: clearTimer,
    mouseleave: clearTimer
  };
  Object.entries(events).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      event = _ref4[0],
      handler = _ref4[1];
    return t.addEventListener(event, handler);
  });
  return function () {
    Object.entries(events).forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        event = _ref6[0],
        handler = _ref6[1];
      return t.removeEventListener(event, handler);
    });
    clearTimer();
  };
};

export { longPress, rapidClicks, toggleVConsole };
//# sourceMappingURL=index.mjs.map
