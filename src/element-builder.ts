import { StyleBuilder } from "./style-builder";
import "./skeleton.css";

/**
 * Defines the available skeleton animation types.
 */
export enum SkeletonAnimation {
  Progress = "progress",
  Pulse = "pulse",
  Wave = "wave",
  Fade = "fade",
  Scale = "scale",
  None = "none",
}

const DEFAULT_GLOBAL_ANIMATION: SkeletonAnimation = SkeletonAnimation.Pulse;
const DEFAULT_GLOBAL_COLORS: string[] = [
  "var(--sg-skeleton)",
  "var(--sg-skeleton-light)",
];
const DEFAULT_KEYFRAME_CONTENTS: Record<SkeletonAnimation, string> = {
  [SkeletonAnimation.Progress]: `
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    `,
  [SkeletonAnimation.Pulse]: `
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    `,
  [SkeletonAnimation.Wave]: `
      0% { transform: translateX(-50%); }
      100% { transform: translateX(50%); }
    `,
  [SkeletonAnimation.Fade]: `
      0% { opacity: 0; }
      100% { opacity: 1; }
    `,
  [SkeletonAnimation.Scale]: `
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    `,
  [SkeletonAnimation.None]: ``,
};

/**
 * An interface for configuring global skeleton properties.
 */
export interface GlobalConfig {
  /** The default animation type for all skeleton loaders. */
  animation?: SkeletonAnimation;
  /** The default colors for the skeleton loaders. */
  colors?: string[];
  /** Custom keyframe content to override a specific animation. */
  keyframe?: { animation: SkeletonAnimation; content: string };
}

/**
 * A builder class to create and configure HTML elements with skeleton loading effects.
 */
export class ElementBuilder extends StyleBuilder {
  private static globalAnimation: SkeletonAnimation = DEFAULT_GLOBAL_ANIMATION;
  private static globalColors: string[] = DEFAULT_GLOBAL_COLORS;
  private static _keyframeContents: Record<SkeletonAnimation, string> =
    DEFAULT_KEYFRAME_CONTENTS;

  // Static methods for global configuration

  /**
   * Sets the default skeleton animation type for all loaders.
   * @param animation The desired skeleton animation type.
   */
  static setAnimation(animation: SkeletonAnimation) {
    this.globalAnimation = animation;
  }

  /**
   * Gets the current default skeleton animation.
   * @returns The global skeleton animation type.
   */
  static getAnimation(): SkeletonAnimation {
    return this.globalAnimation;
  }

  /**
   * Sets the default colors for skeleton loaders.
   * @param colors An array of color strings (e.g., `['#ccc', '#eee']`).
   */
  static setColors(colors: string[]) {
    this.globalColors = colors;
  }

  /**
   * Gets the current default colors for skeleton loaders.
   * @returns An array of color strings.
   */
  static getColors(): string[] {
    return this.globalColors;
  }

  /**
   * Overrides the CSS keyframe content for a specific animation type.
   * @param animation The animation type to customize.
   * @param content The new CSS keyframe content.
   */
  static setKeyframe(animation: SkeletonAnimation, content: string) {
    this._keyframeContents[animation] = content;
  }

  /**
   * Gets the CSS keyframe content for a specific animation type.
   * @param animation The animation type to get content for.
   * @returns The CSS keyframe content string.
   */
  static getKeyframe(animation: SkeletonAnimation): string {
    return this._keyframeContents[animation];
  }

  /**
   * Sets multiple global configurations at once.
   * @param config An object containing the global settings to apply.
   */
  static setConfigs(config: GlobalConfig): void {
    if (config.animation) {
      this.setAnimation(config.animation);
    }
    if (config.colors) {
      this.setColors(config.colors);
    }
    if (config.keyframe) {
      this.setKeyframe(config.keyframe.animation, config.keyframe.content);
    }
  }

  /**
   * Gets the current global configuration settings.
   * @returns An object containing the current global animation and colors.
   */
  static getConfigs(): GlobalConfig {
    return {
      animation: this.getAnimation(),
      colors: this.getColors(),
    };
  }

  private tagName: string = "div";
  private count: number = 1;
  private className = "";
  private children: ElementBuilder[] = [];
  private isSkeleton = false;
  private animation: SkeletonAnimation | undefined;
  private colors: string[] | undefined;
  private styleSheet: string;

  // ⚡️ build methods

  /**
   * Sets the HTML tag for the element. Defaults to 'div'.
   * @param tag The HTML tag name (e.g., 'div', 'span', 'p').
   * @returns The current instance for method chaining.
   */
  setTagName(tag: string) {
    this.tagName = tag;
    return this;
  }

  /**
   * Sets the number of elements to generate.
   * @param count The number of elements.
   * @returns The current instance for method chaining.
   */
  setCount(count: number) {
    this.count = count;
    return this;
  }

  /**
   * Adds a CSS class to the element.
   * @param name The CSS class name.
   * @returns The current instance for method chaining.
   */
  setClass(name: string) {
    this.className = name;
    return this;
  }

  /**
   * Adds a global style sheet to the root of the generated component.
   * This is useful for custom CSS rules not handled by other methods.
   * @param style A string of CSS rules.
   * @returns The current instance for method chaining.
   */
  setGlobalStyle(style: string) {
    this.styleSheet = style;
    return this;
  }

  // ⚡️ skeleton methods

  /**
   * Marks the element as a skeleton loader.
   * @param animation (Optional) The animation type for this specific element. If not provided, the global animation will be used.
   * @returns The current instance for method chaining.
   */
  markAsSkeleton(animation?: SkeletonAnimation) {
    this.isSkeleton = true;
    if (animation !== undefined) {
      this.animation = animation;
    }
    return this;
  }

  /**
   * Sets the specific skeleton animation for this instance.
   * This overrides any global animation settings.
   * @param animation The desired animation type for this element.
   * @returns The current instance for method chaining.
   */
  setAnimation(animation: SkeletonAnimation) {
    this.animation = animation;
    return this;
  }

  /**
   * Sets the colors for this specific skeleton element, overriding the global colors.
   * @param colors An array of color strings.
   * @returns The current instance for method chaining.
   */
  setSkeletonColors(colors: string[]) {
    this.colors = colors;
    return this;
  }

  // ⚡️ append methods

  /**
   * Appends a single child element to the current element.
   * @param builder A function that takes an `ElementBuilder` instance and returns a configured one.
   * @returns The current instance for method chaining.
   */
  appendOne(builder: (child: ElementBuilder) => ElementBuilder) {
    const child = builder(new ElementBuilder());
    this.children.push(child);
    return this;
  }

  /**
   * Appends multiple children to the current element using a set of builder functions.
   * @param builders An array of builder functions.
   * @returns The current instance for method chaining.
   */
  appendMany(builders: ((child: ElementBuilder) => ElementBuilder)[]) {
    builders.forEach((fn) => {
      const child = fn(new ElementBuilder());
      this.children.push(child);
    });
    return this;
  }

  /**
   * Appends one or more pre-configured `ElementBuilder` instances as children.
   * @param children A spread array of `ElementBuilder` instances.
   * @returns The current instance for method chaining.
   */
  append(...children: ElementBuilder[]) {
    this.children.push(...children);
    return this;
  }

  // ⚡️ keyframes (skeleton animation)

  /**
   * Generates a CSS string containing all global keyframe definitions.
   * This method is for internal use.
   * @returns A CSS string with `@keyframes` rules.
   */
  static getKeyframes(): string {
    let keyframes = "";
    for (const animationType of Object.values(SkeletonAnimation)) {
      if (animationType !== SkeletonAnimation.None) {
        keyframes += `
          @keyframes ${animationType} {${this.getKeyframe(animationType)}}
        `;
      }
    }
    return keyframes;
  }

  // ⚡️ generate elements
  /**
   * Recursively generates an array of HTMLElements based on the builder's configuration.
   *
   * This is an internal method and should not be called directly.
   * Use the public `generate()` method to render the final component.
   *
   * @param params An object containing inherited properties from the parent element.
   * @param {SkeletonAnimation} [params.animation] The animation type inherited from the parent.
   * @param {string[]} [params.colors] The colors inherited from the parent.
   * @returns An array of HTMLElements.
   */
  getElement(
    params: { animation?: SkeletonAnimation; colors?: string[] } = {}
  ): HTMLElement[] {
    const styles = { borderRadius: "3px", ...this.getStyle() };
    const animation =
      this.animation || params.animation || ElementBuilder.getAnimation();
    const colors = this.colors || params.colors || ElementBuilder.getColors();

    if (this.isSkeleton) {
      Object.assign(styles, {
        background:
          animation === SkeletonAnimation.Progress
            ? `linear-gradient(
            90deg,
            ${colors[0]} 25%,
            ${colors[1] || "var(--sg-skeleton-light)"} 50%,
            ${colors[0]} 75%
          )`
            : colors[0],
        backgroundSize:
          animation === SkeletonAnimation.Progress ? "200% 100%" : undefined,
        borderRadius: "4px",
        animation:
          animation !== SkeletonAnimation.None
            ? `${animation} 2.5s ease infinite`
            : "none",
      });
    }

    return Array.from({ length: this.count }, () => {
      const el = document.createElement(this.tagName);
      if (this.className) el.className = this.className;
      Object.assign(el.style, styles);

      this.children.forEach((child) =>
        child
          .getElement({
            animation: animation,
            colors: colors,
          })
          .forEach((c) => el.appendChild(c))
      );

      return el;
    });
  }

  /**
   * Generates and returns the final root HTMLElement with all styles and children applied.
   * This is the main method to call to render the component.
   * @returns The root HTMLElement.
   */
  generate(): HTMLElement {
    const root = document.createElement("div");
    root.style.width = "100%";
    root.style.height = "100%";

    const styleSheet = document.createElement("style");
    styleSheet.textContent = ElementBuilder.getKeyframes();

    if (this.styleSheet) styleSheet.textContent += this.styleSheet;
    root.appendChild(styleSheet);

    this.getElement().forEach((el) => root.appendChild(el));
    return root;
  }
}
