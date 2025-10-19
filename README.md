# skeleton-styler

A lightweight **TypeScript library** to generate **skeleton loading UIs** with customizable styles and animations.  
Works with plain JavaScript, React, Vue, Angular, or any frontend framework.

---

## Demo

[![Demo on CodeSandbox](https://img.shields.io/badge/demo-codesandbox-blue)](https://codesandbox.io/p/devbox/6z3d87)

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
const skeleton = new ElementBuilder("div")
  .s_w("200px")
  .s_h("20px")
  .setClass("skeleton")
  .markAsSkeleton()
  .generate();

document.body.appendChild(skeleton);
```

This will render:

```html
<div class="skeleton" style="width:200px;height:20px;"></div>
```

---

## Example Usage

### 1. Vanilla HTML + JS

```ts
import { ElementBuilder, SkeletonAnimation } from "skeleton-styler";

const app = document.getElementById("app");

// Set global animation to 'Progress' for a shimmer effect
ElementBuilder.setAnimation(SkeletonAnimation.Progress);

const skeletonCard = new ElementBuilder()
  .s_flexColumn()
  .s_w("100%")
  .s_border("1px", "solid", "#ddd")
  .append(
    ...Array.from({ length: 3 }).map(() =>
      new ElementBuilder()
        .s_flex()
        .s_borderBottom("1px", "solid", "#eee")
        .append(
          ...Array.from({ length: 3 }).map(() =>
            new ElementBuilder()
              .s_flex1()
              .s_h("20px")
              .s_m("8px")
              .markAsSkeleton() // Inherits the global Progress animation
          )
        )
    )
  );

app?.appendChild(skeletonCard.generate());
```

### 2. React Example

```tsx
import React, { useEffect, useRef } from "react";
import { ElementBuilder, SkeletonAnimation } from "skeleton-styler";

const SkeletonCard: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ElementBuilder.setAnimation(SkeletonAnimation.Progress);

    const skeletonCard = new ElementBuilder()
      .s_flexColumn()
      .s_w("100%")
      .s_border("1px", "solid", "#ddd")
      .append(
        ...Array.from({ length: 3 }).map(() =>
          new ElementBuilder()
            .s_flex()
            .s_borderBottom("1px", "solid", "#eee")
            .append(
              ...Array.from({ length: 3 }).map(() =>
                new ElementBuilder()
                  .s_flex1()
                  .s_h("20px")
                  .s_m("8px")
                  .markAsSkeleton()
              )
            )
        )
      );

    if (ref.current) {
      ref.current.appendChild(skeletonCard.generate());
    }
  }, []);

  return <div ref={ref}></div>;
};

export default SkeletonCard;
```

### 3. Angular Example

```ts
import { Component, ElementRef, AfterViewInit } from "@angular/core";
import { ElementBuilder, SkeletonAnimation } from "skeleton-styler";

@Component({
  selector: "app-skeleton-card",
  template: "<div #container></div>"
})
export class SkeletonCardComponent implements AfterViewInit {
  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    ElementBuilder.setAnimation(SkeletonAnimation.Progress);

    const skeletonCard = new ElementBuilder()
      .s_flexColumn()
      .s_w("100%")
      .s_border("1px", "solid", "#ddd")
      .append(
        ...Array.from({ length: 3 }).map(() =>
          new ElementBuilder()
            .s_flex()
            .s_borderBottom("1px", "solid", "#eee")
            .append(
              ...Array.from({ length: 3 }).map(() =>
                new ElementBuilder()
                  .s_flex1()
                  .s_h("20px")
                  .s_m("8px")
                  .markAsSkeleton()
              )
            )
        )
      );

    this.host.nativeElement.appendChild(skeletonCard.generate());
  }
}
```

---

## Features

- 🟦 Lightweight, no dependencies  
- 🟪 Easy skeleton element builder  
- 🟧 Flexible style customization  
- ✨ Built-in animations (pulse, progress, wave, fade, scale, none)  
- 🌍 Framework-agnostic (works with React, Vue, Angular, Vanilla JS)

---

## Global Configuration

You can configure global defaults using static methods of `ElementBuilder`.

| Method | Description |
|--------|-------------|
| `setAnimation(animation: SkeletonAnimation)` | Sets the default skeleton animation type for all loaders. |
| `getAnimation(): SkeletonAnimation` | Gets the current default skeleton animation type. |
| `setColors(colors: string[])` | Sets the default colors for skeleton loaders. |
| `getColors(): string[]` | Gets the current default colors. |
| `setKeyframe(animation: SkeletonAnimation, content: string)` | Overrides the CSS keyframe content for a specific animation type. |
| `getKeyframe(animation: SkeletonAnimation): string` | Gets the CSS keyframe content for a specific animation type. |
| `setConfigs(config: GlobalConfig)` | Sets multiple global configurations at once. |
| `getConfigs(): GlobalConfig` | Gets the current global configuration settings. |

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

| Method | Description |
|--------|-------------|
| `s_display(v)` | Set display property |
| `s_flex()` | Display flex |
| `s_block()` | Display block |
| `s_inline()` | Display inline |
| `s_flexDirection(d)` | Set flex-direction |
| `s_itemsCenter()` | Align items center |
| `s_justifyCenter()` | Justify content center |
| `s_gap(v)` | Set gap |
| `s_m(v)` | Set margin |
| `s_p(v)` | Set padding |
| `s_w(v)` | Set width |
| `s_h(v)` | Set height |
| `s_textColor(c)` | Set text color |
| `s_bg(c)` | Set background color |
| `s_border(w, s, c)` | Set border |
| `s_rounded(r)` | Set border-radius |
| `s_shadow(v)` | Set box-shadow |
| ... | ... |

### `ElementBuilder`

| Method | Description |
|--------|-------------|
| `setTagName(tag)` | Set HTML tag |
| `setAnimation(animation: SkeletonAnimation)` | Sets the animation for a specific element instance, overriding the global setting. |
| `setCount(count)` | Number of elements |
| `setClass(name)` | Add class |
| `setGlobalStyle(style)` | Add global CSS |
| `markAsSkeleton(animation?)` | Mark as skeleton loader |
| `setSkeletonColors(colors)` | Override skeleton colors |
| `appendOne(builder)` | Append one child |
| `appendMany(builders)` | Append multiple children |
| `append(...children)` | Append children |
| `getElement()` | Generate HTMLElement(s) |
| `generate()` | Generate root HTMLElement |

---

## License

MIT © 2025 Hoai Nam
