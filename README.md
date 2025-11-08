# skeleton-styler

A lightweight **TypeScript library** to generate **skeleton loading UIs** with customizable styles and animations.  
Works with plain JavaScript, React, Vue, Angular, or any frontend framework.

---
## Demo

![Demo](https://github.com/HoaiNam071001/skeleton-styler/blob/main/demo-1.gif)

---

[![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?logo=stackblitz)](https://stackblitz.com/edit/stackblitz-starters-7a4xw5wa)

---

## Installation

```bash
npm install skeleton-styler
```

or

```bash
yarn add skeleton-styler
```

---

## Usage

### Basic Example

```ts
import { ElementBuilder, SkeletonAnimation } from "skeleton-styler";

// Configure global skeleton animation and colors
ElementBuilder.setConfigs({
  animation: SkeletonAnimation.Pulse,
  colors: ["#e0e0e0", "#c0c0c0"], // The second color is used for 'Progress' animation
});

// Create a skeleton element
const skeleton = new ElementBuilder()
  .setClass("skeleton")
  .markAsSkeleton()
  .generate();

document.body.appendChild(skeleton);
```

This will render:

```html
<div class="skeleton"></div>
```

---

## Example Usage

### 1. Vanilla HTML + JS

```ts
const app = document.getElementById("app");
const skeletonCard = new ElementBuilder()
  .s_flex()
  .append(
    ...Array.from({ length: 3 }).map(() =>
      new ElementBuilder()
        .markAsSkeleton()
    )
  );

app?.appendChild(skeletonCard.generate());
```

### 2. ReactJS

```ts
const skeletonInstance = SkeletonTemplate.UserAvatar();
// Skeleton Wrapper Component
interface SkeletonProps {
  loading: boolean;
  children: ReactNode;
  instance: ElementBuilder;
  className?: string;
}

const SkeletonWrapper: React.FC<SkeletonProps> = ({
  loading,
  children,
  instance,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (loading && container) {
      const skeleton = instance.generate();
      container.innerHTML = "";
      container.appendChild(skeleton);

      return () => {
        if (container.contains(skeleton)) {
          container.removeChild(skeleton);
        }
      };
    }
  }, [loading, instance]);

  if (loading) return <div ref={containerRef} className={className} />;
  return <>{children}</>;
};

// Example usage component
const MyComponent: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonWrapper loading={loading} instance={skeletonInstance}>
      <div className="user-profile">
        <img src="/avatar.jpg" alt="User" width={48} height={48} />
        <p>Hello!</p>
      </div>
    </SkeletonWrapper>
  );
};
```


### 3. Angular

```ts
// skeleton-wrapper.component.ts
import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ElementBuilder } from 'skeleton-styler';

@Component({
  selector: 'app-skeleton-wrapper',
  template: `<ng-content *ngIf="!loading"></ng-content>`,
  standalone: true,
})
export class SkeletonWrapperComponent implements OnChanges {
  @Input() loading = false;
  @Input() instance!: ElementBuilder;
  @Input() className?: string;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const container = this.elRef.nativeElement;

    if (this.loading && this.instance) {
      const skeleton = this.instance.generate();
      container.innerHTML = '';
      container.appendChild(skeleton);
    } else if (!this.loading) {
      container.innerHTML = '';
    }
  }
}
```

### 4. JSON Configuration Example (`fromJSON`)

You can define skeleton structures declaratively using JSON.

```ts
import { ElementBuilder, SkeletonAnimation } from "skeleton-styler";

const jsonConfig = {
  skeleton: SkeletonAnimation.Progress,
  style: { display: "flex", flexDirection: "column", width: "100%" },
  children: [
    {
      skeleton: true,
      style: { width: "60px", height: "60px", borderRadius: "50%", margin: "8px" },
    },
    {
      skeleton: true,
      style: { width: "80%", height: "16px", margin: "8px 0" },
    },
  ],
};

const skeleton = ElementBuilder.fromJSON(jsonConfig);
document.body.appendChild(skeleton.generate());
```

This allows you to build complex skeleton structures programmatically or load them dynamically from JSON data.

---

## Features

* 🟦 Lightweight, no dependencies
* 🟪 Easy skeleton element builder
* 🟧 Flexible style customization
* ✨ Built-in animations (pulse, progress, wave, fade, scale, none)
- 🌍 Framework-agnostic (works with React, Vue, Angular, Vanilla JS)

---

## 🧩 SkeletonTemplate

`SkeletonTemplate` provides a collection of **ready-to-use skeleton UI components** — all powered by `ElementBuilder`.  
You can use them to create consistent, elegant loading placeholders for common interface patterns such as cards, buttons, tables, and sidebars.

### Example

```ts
import { SkeletonTemplate } from "skeleton-styler";

// Example: create and render a card skeleton
const card = SkeletonTemplate.Card({ w: 320 });
document.body.appendChild(card.generate());
```

| Method | Parameters | Description | Example |
| ------- | ----------- | ------------ | -------- |
| `SkeletonTemplate.Line(options?)` | `{ w?: string \| number; h?: number; count?: number; isRandomWidth?: boolean }` | Creates one or multiple skeleton lines. Supports random widths for a more natural text-like appearance. | `SkeletonTemplate.Line({ count: 3, isRandomWidth: true })` |
| `SkeletonTemplate.Avatar(options?)` | `{ size?: number }` | Creates a circular avatar skeleton. Ideal for profile images or icons. | `SkeletonTemplate.Avatar({ size: 50 })` |
| `SkeletonTemplate.UserAvatar(options?)` | `{ r?: number; line?: number }` | Combines an avatar and text lines — useful for user info placeholders. | `SkeletonTemplate.UserAvatar({ r: 24, line: 2 })` |
| `SkeletonTemplate.Button(options?)` | `{ w?: string \| number; h?: number }` | Creates a button-shaped skeleton with rounded corners. | `SkeletonTemplate.Button({ w: 120, h: 40 })` |
| `SkeletonTemplate.Card(options?)` | `{ w?: string \| number }` | Creates a card skeleton with an image (16:9) and text content block. | `SkeletonTemplate.Card({ w: 320 })` |
| `SkeletonTemplate.Table(options?)` | `{ colW?: string \| number; colH?: number; spaceX?: number; spaceY?: number; cols?: number; rows?: number }` | Creates a table-style skeleton using `<table>`, `<tr>`, `<td>` elements. | `SkeletonTemplate.Table({ cols: 3, rows: 6 })` |
| `SkeletonTemplate.Sidebar()` | _None_ | Creates a sidebar skeleton with a profile section, navigation items, and footer. | `SkeletonTemplate.Sidebar()` |

---

## Global Configuration

You can configure global defaults using static methods of `ElementBuilder`.

| Method                                                       | Description                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------------- |
| `setAnimation(animation: SkeletonAnimation)`                 | Sets the default skeleton animation type for all loaders.         |
| `getAnimation(): SkeletonAnimation`                          | Gets the current default skeleton animation type.                 |
| `setColors(colors: string[])`                                | Sets the default colors for skeleton loaders.                     |
| `getColors(): string[]`                                      | Gets the current default colors.                                  |
| `setKeyframe(animation: SkeletonAnimation, content: string)` | Overrides the CSS keyframe content for a specific animation type. |
| `getKeyframe(animation: SkeletonAnimation): string`          | Gets the CSS keyframe content for a specific animation type.      |
| `setConfigs(config: GlobalConfig)`                           | Sets multiple global configurations at once.                      |
| `getConfigs(): GlobalConfig`                                 | Gets the current global configuration settings.                   |

### Example

```ts
// Set global animation and colors
ElementBuilder.setAnimation(SkeletonAnimation.Progress);
ElementBuilder.setColors(["#ccc", "#eee"]);

// Get current global config
console.log(ElementBuilder.getConfigs());
```

---

## API Reference

### `StyleBuilder`

| Method               | Description            |
| -------------------- | ---------------------- |
| `s_display(v)`       | Set display property   |
| `s_flex()`           | Display flex           |
| `s_block()`          | Display block          |
| `s_inline()`         | Display inline         |
| `s_flexDirection(d)` | Set flex-direction     |
| `s_itemsCenter()`    | Align items center     |
| `s_justifyCenter()`  | Justify content center |
| `s_gap(v)`           | Set gap                |
| `s_m(v)`             | Set margin             |
| `s_p(v)`             | Set padding            |
| `s_w(v)`             | Set width              |
| `s_h(v)`             | Set height             |
| `s_textColor(c)`     | Set text color         |
| `s_bg(c)`            | Set background color   |
| `s_border(w, s, c)`  | Set border             |
| `s_rounded(r)`       | Set border-radius      |
| `s_shadow(v)`        | Set box-shadow         |
| ...                  | ...                    |

### `ElementBuilder`

| Method                                       | Description                                                                        |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| `setTagName(tag)`                            | Set HTML tag                                                                       |
| `setAnimation(animation: SkeletonAnimation)` | Sets the animation for a specific element instance, overriding the global setting. |
| `setCount(count)`                            | Number of elements                                                                 |
| `setClass(name)`                             | Add class                                                                          |
| `setGlobalStyle(style)`                      | Add global CSS                                                                     |
| `markAsSkeleton(animation?)`                 | Mark as skeleton loader                                                            |
| `setSkeletonColors(colors)`                  | Override skeleton colors                                                           |
| `appendOne(builder)`                         | Append one child                                                                   |
| `appendMany(builders)`                       | Append multiple children                                                           |
| `append(...children)`                        | Append children                                                                    |
| `getElement()`                               | Generate HTMLElement(s)                                                            |
| `generate()`                                 | Generate root HTMLElement                                                          |
| `fromJSON(config: SkeletonNode)`             | Create element(s) from JSON configuration                                          |

---

## License

MIT © 2025 Hoai Nam
