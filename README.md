# backdoor-vconsole

> [English](./README_EN.md) | 中文

生产环境 vConsole 后门触发器。通过隐藏的触发方式在生产环境唤起 vConsole 调试面板。

## 安装

```bash
npm install backdoor-vconsole
```

## 使用方式

### 快速点击 (rapidClicks)

连续点击指定元素 N 次唤起 vConsole，再次点击 M 次关闭。

```js
import { rapidClicks } from 'backdoor-vconsole';

// 默认配置：7 次点击开启，10 次点击关闭
rapidClicks({
  target: '#myButton',
});

// 自定义配置
rapidClicks({
  target: '#myButton',
  openCount: 5,      // 5 次点击开启
  closeCount: 8,    // 8 次点击关闭
  interval: 300,    // 点击间隔超时 300ms
});
```

### 长按 (longPress)

长按指定元素一定时长唤起 vConsole，再次长按关闭。

```js
import { longPress } from 'backdoor-vconsole';

// 默认配置：长按 7 秒开启，长按 10 秒关闭
longPress({
  target: '#myButton',
});

// 自定义配置
longPress({
  target: '#myButton',
  openDuration: 5000,   // 长按 5 秒开启
  closeDuration: 8000,  // 长按 8 秒关闭
});
```

### 手动切换

手动控制 vConsole 开关状态。

```js
import { toggleVConsole } from 'backdoor-vconsole';

toggleVConsole(); // 切换 vConsole 状态
```

## API

### rapidClicks(options)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `target` | `string \| HTMLElement` | 必填 | 触发元素（选择器或 DOM 元素） |
| `openCount` | `number` | `7` | 开启所需点击次数 |
| `closeCount` | `number` | `10` | 关闭所需点击次数 |
| `interval` | `number` | `300` | 点击间隔超时时间（ms） |

返回解绑函数，调用后可移除事件监听。

### longPress(options)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `target` | `string \| HTMLElement` | 必填 | 触发元素（选择器或 DOM 元素） |
| `openDuration` | `number` | `7000` | 开启所需长按时长（ms） |
| `closeDuration` | `number` | `10000` | 关闭所需长按时长（ms） |

返回解绑函数，调用后可移除事件监听。

## 示例

运行示例：

```bash
npm run dev:examples
```

## 许可证

MIT
