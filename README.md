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
import { ElementBuilder, StyleBuilder } from "skeleton-styler";

// Create a skeleton element
const skeleton = new ElementBuilder("div")
  .s_w("200px")
  .s_h("20px")
  .setClass("skeleton")
  .markAsSkeleton()
  .generate();

document.body.appendChild(skeleton);

// Apply skeleton style
StyleBuilder.addSkeletonStyle({
  background: "#e0e0e0",
  animation: "pulse 1.5s infinite"
});
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
              .markAsSkeleton(SkeletonAnimation.Progress)
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
                  .markAsSkeleton(SkeletonAnimation.Progress)
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
                  .markAsSkeleton(SkeletonAnimation.Progress)
              )
            )
        )
      );

    this.host.nativeElement
      .querySelector("div")
      .appendChild(skeletonCard.generate());
  }
}
```

---

### Gradient Skeleton

```ts
StyleBuilder.addSkeletonStyle({
  colors: ["#e0e0e0", "#c0c0c0"],
  animation: "progress 2s infinite"
});
```

This will render a skeleton with a **shimmer effect** using gradient colors.

---

## Features

- 🟦 Lightweight, no dependencies  
- 🟪 Easy skeleton element builder  
- 🟧 Flexible style customization  
- ✨ Built-in animations (pulse, progress, shimmer, etc.)  
- 🌍 Framework-agnostic (works with React, Vue, Angular, Vanilla JS)

---

# Skeleton Library API Reference

Below is a list of the main methods in the `ElementBuilder` and `StyleBuilder` library.

| Class | Method | Description |
|-------|--------|-------------|
| **StyleBuilder** | `s_display(v: string)` | Set the display property of an element |
|  | `s_flex()` | Set display to flex |
|  | `s_block()` | Set display to block |
|  | `s_inline()` | Set display to inline |
|  | `s_flexDirection(d)` | Set the flex-direction property |
|  | `s_itemsCenter()` | Set align-items to center |
|  | `s_justifyCenter()` | Set justify-content to center |
|  | `s_gap(v)` | Set the gap between elements |
|  | `s_m(v)` | Set margin |
|  | `s_p(v)` | Set padding |
|  | `s_w(v)` | Set width |
|  | `s_h(v)` | Set height |
|  | `s_textColor(c)` | Set text color |
|  | `s_bg(c)` | Set background color |
|  | `s_border(w, s, c)` | Set border properties |
|  | `s_rounded(r)` | Set border-radius |
|  | `s_shadow(v)` | Set box-shadow |
|  | ... | ... |
| **ElementBuilder** | `setTagName(tag: string)` | Set the HTML tag |
|  | `setCount(count: number)` | Set the number of elements to create |
|  | `setClass(name: string)` | Add a class to the element |
|  | `setGlobalStyle(style: string)` | Add global styles |
|  | `markAsSkeleton(animation)` | Mark the element as a skeleton with optional animation |
|  | `setSkeletonColors(colors)` | Set skeleton colors |
|  | `appendOne(builder)` | Append a single child element |
|  | `appendMany(builders)` | Append multiple child elements |
|  | `append(...children)` | Append given ElementBuilder children |
|  | `getElement()` | Generate HTMLElement(s) based on configuration |
|  | `generate()` | Generate the root HTMLElement with all children and keyframes included

## License

MIT © 2025 Hoai Nam
