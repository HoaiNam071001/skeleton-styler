# skeleton-styler

A lightweight **TypeScript library** to generate **skeleton loading UIs** with customizable styles and animations.  
Works with plain JavaScript, React, Vue, Angular, or any frontend framework.

---

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [1. Vanilla HTML + JS](#1-vanilla-html--js)
  - [2. ReactJS](#2-reactjs)
  - [3. Angular](#3-angular)
  - [4. JSON Configuration Example (fromJSON)](#4-json-configuration-example-fromjson)
- [🧩 SkeletonTemplate](#-skeletontemplate)
- [Global Configuration](#global-configuration)
- [API Reference](#api-reference)
- [License](#license)

---

## Demo

![Demo](https://github.com/HoaiNam071001/skeleton-styler/blob/main/demo-1.gif)

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

ElementBuilder.setConfigs({
  animation: SkeletonAnimation.Pulse,
  colors: ["#e0e0e0", "#c0c0c0"],
});

const skeleton = new ElementBuilder().setClass("skeleton").markAsSkeleton().generate();
document.body.appendChild(skeleton);
```

---

### 1. Vanilla HTML + JS

```ts
const app = document.getElementById("app");
const skeletonCard = new ElementBuilder()
  .s_flex()
  .append(...Array.from({ length: 3 }).map(() => new ElementBuilder().markAsSkeleton()));

app?.appendChild(skeletonCard.generate());
```

---

### 2. ReactJS

```tsx
import React, { useState, useEffect, useRef } from "react";
import { SkeletonTemplate, ElementBuilder } from "skeleton-styler";

const skeletonInstance = SkeletonTemplate.UserAvatar({ r: 24, line: 2 });

const SkeletonWrapper = ({ loading, children, instance }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (loading && el) {
      const skeleton = instance.generate();
      el.innerHTML = "";
      el.appendChild(skeleton);
    }
  }, [loading]);
  return loading ? <div ref={ref} /> : children;
};

export const MyComponent = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <SkeletonWrapper loading={loading} instance={skeletonInstance}>
      <div className="profile">
        <img src="/avatar.jpg" alt="User" width={48} height={48} />
        <p>Hello!</p>
      </div>
    </SkeletonWrapper>
  );
};
```

---

### 3. Angular

```ts
import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ElementBuilder } from 'skeleton-styler';

@Component({
  selector: 'app-skeleton-wrapper',
  template: '<ng-content *ngIf="!loading"></ng-content>',
  standalone: true,
})
export class SkeletonWrapperComponent implements OnChanges {
  @Input() loading = false;
  @Input() instance!: ElementBuilder;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    const container = this.elRef.nativeElement;
    if (this.loading && this.instance) {
      const skeleton = this.instance.generate();
      container.innerHTML = '';
      container.appendChild(skeleton);
    } else {
      container.innerHTML = '';
    }
  }
}
```

---

### 4. JSON Configuration Example (fromJSON)

```ts
import { ElementBuilder, SkeletonAnimation } from "skeleton-styler";

const jsonConfig = {
  skeleton: SkeletonAnimation.Progress,
  style: { display: "flex", flexDirection: "column", width: "100%" },
  children: [
    { skeleton: true, style: { width: "60px", height: "60px", borderRadius: "50%", margin: "8px" } },
    { skeleton: true, style: { width: "80%", height: "16px", margin: "8px 0" } },
  ],
};

const skeleton = ElementBuilder.fromJSON(jsonConfig);
document.body.appendChild(skeleton.generate());
```

---

## 🧩 SkeletonTemplate

`SkeletonTemplate` provides ready-to-use skeleton UI components — all powered by `ElementBuilder`.

### Example

```ts
import { SkeletonTemplate } from "skeleton-styler";

const card = SkeletonTemplate.Card({ w: 320 });
document.body.appendChild(card.generate());
```

### Common Templates

| Method | Description |
| ------- | ------------ |
| `SkeletonTemplate.Line()` | Simple text line skeleton |
| `SkeletonTemplate.Avatar()` | Circular avatar skeleton |
| `SkeletonTemplate.UserAvatar()` | Avatar with text lines |
| `SkeletonTemplate.Button()` | Rounded button skeleton |
| `SkeletonTemplate.Card()` | Image + text card skeleton |
| `SkeletonTemplate.Table()` | Table layout skeleton |
| `SkeletonTemplate.Sidebar()` | Sidebar placeholder |
| ... | ... |

---

## Global Configuration

You can set default animation and colors globally using `ElementBuilder`:

```ts
ElementBuilder.setAnimation(SkeletonAnimation.Progress);
ElementBuilder.setColors(["#ccc", "#eee"]);
console.log(ElementBuilder.getConfigs());
```

| Method | Description |
| ------- | ------------ |
| `setAnimation(animation)` | Set default animation |
| `setColors(colors)` | Set default skeleton colors |
| `setConfigs(config)` | Apply multiple configs |
| `getConfigs()` | Retrieve current config |
| ... | ... |

---

## API Reference

### `StyleBuilder` (commonly used)

| Method | Description |
| ------- | ------------ |
| `s_flex()` | Display flex |
| `s_w(v)` | Set width |
| `s_h(v)` | Set height |
| `s_m(v)` | Margin |
| `s_p(v)` | Padding |
| `s_bg(c)` | Background color |
| ... | ... |

### `ElementBuilder`

| Method | Description |
| ------- | ------------ |
| `setTagName(tag)` | Define HTML tag |
| `markAsSkeleton()` | Mark element as skeleton |
| `append(...children)` | Append child elements |
| `generate()` | Generate HTMLElement |
| `fromJSON(config)` | Build from JSON configuration |
| ... | ... |

---

## License

MIT © 2025 Hoai Nam
