import { StyleBuilder } from "./style-builder";
import "./skeleton.css";

export enum SkeletonAnimation {
  Progress = "progress",
  Pulse = "pulse",
  Wave = "wave",
  Fade = "fade",
  Scale = "scale",
  None = "none",
}


export class ElementBuilder extends StyleBuilder {
  private tagName: string = "div";
  private count: number = 1;
  private className = "";
  private children: ElementBuilder[] = [];
  private isSkeleton = false;
  private skeletonAnimation: SkeletonAnimation = SkeletonAnimation.Pulse;
  private skeletonColors: string[] = ["var(--sg-skeleton)", "var(--sg-skeleton-light)"];
  private globalStyle: string;

  // ⚡️ build các loại element
  setTagName(tag: string) {
    this.tagName = tag;
    return this;
  }

  setCount(count: number) {
    this.count = count;
    return this;
  }

  setClass(name: string) {
    this.className = name;
    return this;
  }

  setGlobalStyle(style: string) {
    this.globalStyle = style;
    return this;
  }

  // ⚡️ skeleton
  markAsSkeleton(animation: SkeletonAnimation = SkeletonAnimation.Pulse) {
    this.isSkeleton = true;
    this.skeletonAnimation = animation;
    return this;
  }

  setSkeletonColors(colors: string[]) {
    this.skeletonColors = colors;
    return this;
  }

  // ⚡️ append children
  appendOne(builder: (child: ElementBuilder) => ElementBuilder) {
    const child = builder(new ElementBuilder());
    this.children.push(child);
    return this;
  }

  appendMany(builders: ((child: ElementBuilder) => ElementBuilder)[]) {
    builders.forEach((fn) => this.children.push(fn(new ElementBuilder())));
    return this;
  }

  append(...children: ElementBuilder[]) {
    this.children.push(...children);
    return this;
  }

  // ⚡️ keyframes (skeleton animation)
  static getKeyframes(): string {
    return `
      @keyframes ${SkeletonAnimation.Progress} {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes ${SkeletonAnimation.Pulse} {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes ${SkeletonAnimation.Wave} {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(50%); }
      }
      @keyframes ${SkeletonAnimation.Fade} {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes ${SkeletonAnimation.Scale} {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;
  }

  // ⚡️ generate elements
  getElement(): HTMLElement[] {
    const styles = { borderRadius: "3px", ...this.getStyle() };

    if (this.isSkeleton) {
      if (this.skeletonAnimation === SkeletonAnimation.Progress) {
        const [c1, c2] =
          this.skeletonColors.length >= 2
            ? this.skeletonColors
            : [this.skeletonColors[0], 'var(']; // fallback

        Object.assign(styles, {
          background: `linear-gradient(
        90deg,
        ${c1} 25%,
        ${c2} 50%,
        ${c1} 75%
      )`,
          backgroundSize: "200% 100%",
          animation: `${SkeletonAnimation.Progress} 1.8s ease infinite`,
        });
      } else {
        Object.assign(styles, {
          background: this.skeletonColors[0],
          borderRadius: "4px",
          animation:
            this.skeletonAnimation !== SkeletonAnimation.None
              ? `${this.skeletonAnimation} 1.8s ease infinite`
              : "none",
        });
      }
    }

    return Array.from({ length: this.count }, () => {
      const el = document.createElement(this.tagName);
      if (this.className) el.className = this.className;
      Object.assign(el.style, styles);

      this.children.forEach((child) =>
        child.getElement().forEach((c) => el.appendChild(c))
      );

      return el;
    });
  }

  generate(): HTMLElement {
    const root = document.createElement("div");
    root.style.width = "100%";
    root.style.height = "100%";

    const styleSheet = document.createElement("style");
    styleSheet.textContent = ElementBuilder.getKeyframes();
    if (this.globalStyle) styleSheet.textContent += this.globalStyle;
    root.appendChild(styleSheet);

    this.getElement().forEach((el) => root.appendChild(el));
    return root;
  }
}
