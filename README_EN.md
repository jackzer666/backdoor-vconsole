# backdoor-vconsole

> English | [中文](./README.md)

A production environment vConsole backdoor trigger. Allows you to show the vConsole debugging panel in production via hidden trigger gestures.

## Installation

```bash
npm install backdoor-vconsole
```

## Usage

### Rapid Clicks (rapidClicks)

Tap the target element N times to show vConsole, tap M times again to hide it.

```js
import { rapidClicks } from 'backdoor-vconsole';

// Default: 7 taps to show, 10 taps to hide
rapidClicks({
  target: '#myButton',
});

// Custom config
rapidClicks({
  target: '#myButton',
  openCount: 5,      // 5 taps to show
  closeCount: 8,     // 8 taps to hide
  interval: 300,     // tap interval timeout in ms
});
```

### Long Press (longPress)

Long press the target element to show vConsole, long press again to hide it.

```js
import { longPress } from 'backdoor-vconsole';

// Default: long press 7s to show, long press 10s to hide
longPress({
  target: '#myButton',
});

// Custom config
longPress({
  target: '#myButton',
  openDuration: 5000,    // long press 5s to show
  closeDuration: 8000,   // long press 8s to hide
});
```

### Manual Toggle

Manually toggle vConsole on/off.

```js
import { toggleVConsole } from 'backdoor-vconsole';

toggleVConsole(); // Toggle vConsole state
```

## API

### rapidClicks(options)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `target` | `string \| HTMLElement` | required | Target element (selector or DOM element) |
| `openCount` | `number` | `7` | Number of taps to show vConsole |
| `closeCount` | `number` | `10` | Number of taps to hide vConsole |
| `interval` | `number` | `300` | Tap interval timeout (ms) |

Returns an unbind function that removes the event listeners when called.

### longPress(options)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `target` | `string \| HTMLElement` | required | Target element (selector or DOM element) |
| `openDuration` | `number` | `7000` | Long press duration to show (ms) |
| `closeDuration` | `number` | `10000` | Long press duration to hide (ms) |

Returns an unbind function that removes the event listeners when called.

## Examples

Run examples:

```bash
npm run dev:examples

# Visit http://localhost:5173/01.rapid-clicks.html
```

## License

MIT
