import { ElementBuilder } from "../element-builder";
import { StyleBuilder } from "../style-builder";

/**
 * Creates a 3-dot loading animation.
 * The CSS keyframes are injected directly via 'setGlobalStyle'.
 *
 * @param {object} params - Configuration object.
 * @param {string} [params.color="#353535"] - The color of the dots.
 * @param {string | number} [params.width=40] - The width of the loader.
 */
export const SkeletonDotLoading = ({
  color = "#353535",
  width = 40,
}: {
  color?: string;
  width?: number | string;
} = {}) => {
  const uniqueClass = StyleBuilder.s_uniqId();

  const formattedWidth = StyleBuilder.fmt(width);

  const dynamicStyle = `
    @keyframes ${uniqueClass}-anim {
        20%{background-position:0%   0%, 50%  50%,100%  50%}
        40%{background-position:0% 100%, 50%   0%,100%  50%}
        60%{background-position:0%  50%, 50% 100%,100%   0%}
        80%{background-position:0%  50%, 50%  50%,100% 100%}
    }

    .${uniqueClass} {
      width: ${formattedWidth};
      aspect-ratio: 2;
      --_g: no-repeat radial-gradient(circle closest-side, ${color} 90%, #0000);
      background:
        var(--_g) 0%   50%,
        var(--_g) 50%  50%,
        var(--_g) 100% 50%;
      background-size: calc(100%/3) 50%;
      animation: ${uniqueClass}-anim 1s infinite linear;
    }
  `;

  // 4. Trả về builder đã set class và style
  return new ElementBuilder()
    .setGlobalStyle(dynamicStyle)
    .setClass(uniqueClass);
};

/**
 * Creates a "clip-path" wipe loader.
 * The CSS keyframes are injected directly via 'setGlobalStyle'.
 *
 * @param {object} params - Configuration object.
 * @param {string | number} [params.size=50] - The width and height of the loader.
 * @param {string} [params.color="#353535"] - The border color.
 * @param {string | number} [params.borderWidth=8] - The border thickness.
 */
export const SkeletonClipLoader = ({
  size = 20,
  color = "#353535",
  borderWidth = 3,
}: {
  size?: string | number;
  color?: string;
  borderWidth?: string | number;
} = {}) => {
  const uniqueClass = StyleBuilder.s_uniqId();
  const anim1 = `${uniqueClass}-1`;
  const anim2 = `${uniqueClass}-2`;

  const formattedSize = StyleBuilder.fmt(size);
  const formattedBorderWidth = StyleBuilder.fmt(borderWidth);
  const dynamicStyle = `
    @keyframes ${anim1} {
      0% {clip-path: polygon(50% 50%,0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0% )}
      12.5% {clip-path: polygon(50% 50%,0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0% )}
      25% {clip-path: polygon(50% 50%,0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100% )}
      50% {clip-path: polygon(50% 50%,0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100% )}
      62.5% {clip-path: polygon(50% 50%,100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100% )}
      75% {clip-path: polygon(50% 50%,100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100% )}
      100% {clip-path: polygon(50% 50%,50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100% )}
    }
    @keyframes ${anim2} {
      0% {transform:scaleY(1) rotate(0deg)}
      49.99%{transform:scaleY(1) rotate(135deg)}
      50% {transform:scaleY(-1) rotate(0deg)}
      100% {transform:scaleY(-1) rotate(-135deg)}
    }

    .${uniqueClass} {
      width: ${formattedSize};
      aspect-ratio: 1;
      border-radius: 50%;
      border: ${formattedBorderWidth} solid ${color};
      animation:
        ${anim1} 0.8s infinite linear alternate,
        ${anim2} 1.6s infinite linear;
    }
  `;

  return new ElementBuilder()
    .setGlobalStyle(dynamicStyle)
    .setClass(uniqueClass);
};

/**
 * Creates a "masked conic" spinner.
 * The CSS keyframes are injected directly via 'setGlobalStyle'.
 *
 * @param {object} params - Configuration object.
 * @param {string | number} [params.size=50] - The width and height of the loader.
 * @param {string} [params.color="#353535"] - The background color.
 * @param {string | number} [params.padding=8] - The padding (controls thickness).
 */
export const SkeletonMaskedSpinner = ({
  size = 20,
  color = "#353535",
  padding = 5,
}: {
  size?: string | number;
  color?: string;
  padding?: string | number;
} = {}) => {
  const uniqueClass = StyleBuilder.s_uniqId();
  const animName = `${uniqueClass}-anim`;

  const formattedSize = StyleBuilder.fmt(size);
  const formattedPadding = StyleBuilder.fmt(padding);

  const dynamicStyle = `
    @keyframes ${animName} {
      to { transform: rotate(1turn); }
    }

    .${uniqueClass} {
      width: ${formattedSize};
      padding: ${formattedPadding};
      aspect-ratio: 1;
      border-radius: 50%;
      background: ${color};
      --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
      -webkit-mask: var(--_m);
              mask: var(--_m);
      -webkit-mask-composite: source-out;
              mask-composite: subtract;
      animation: ${animName} 1s infinite linear;
    }
  `;

  return new ElementBuilder()
    .setGlobalStyle(dynamicStyle)
    .setClass(uniqueClass);
};

/**
 * Creates a "legacy" shadow dot spinner.
 * The CSS keyframes are injected directly via 'setGlobalStyle'.
 *
 * @param {object} params - Configuration object.
 * @param {string | number} [params.size=10] - The font-size (in px) which controls the loader size.
 * @param {string} [params.color="#353535"] - The color of the dots.
 * @param {number} [params.duration=1.3] - The animation duration in seconds.
 * @param {string | number} radius - size of dot point
 */
export const SkeletonLegacySpinner = ({
  size = 5,
  color = "#353535",
  duration = 1.3,
  radius = 7,
}: {
  size?: string | number;
  color?: string;
  duration?: number;
  radius?: string | number;
} = {}) => {
  const uniqueClass = StyleBuilder.s_uniqId();
  const animName = `${uniqueClass}-anim`;

  const f_size = StyleBuilder.fmt(size);
  const f_duration = `${duration}s`;
  const f_r = StyleBuilder.fmt(radius);

  const dynamicStyle = `
    @keyframes ${animName} {
      0%,
      100% {
        box-shadow: 0 -3em 0 0.2em,
        2em -2em 0 0em, 3em 0 0 -1em,
        2em 2em 0 -1em, 0 3em 0 -1em,
        -2em 2em 0 -1em, -3em 0 0 -1em,
        -2em -2em 0 0;
      }
      12.5% {
        box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em,
        3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em,
        -2em 2em 0 -1em, -3em 0 0 -1em,
        -2em -2em 0 -1em;
      }
      25% {
        box-shadow: 0 -3em 0 -0.5em,
        2em -2em 0 0, 3em 0 0 0.2em,
        2em 2em 0 0, 0 3em 0 -1em,
        -2em 2em 0 -1em, -3em 0 0 -1em,
        -2em -2em 0 -1em;
      }
      37.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
         3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em,
         -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      50% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
         3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em,
         -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      62.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
         3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0,
         -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
      }
      75% {
        box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em,
        3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em,
        -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
      }
      87.5% {
        box-shadow: 0em -3em 0 0, 2em -2em 0 -1em,
        3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em,
        -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
      }
    }

    .${uniqueClass} {
      color: ${color};
      font-size: ${f_size};
      width: ${f_r};
      height: ${f_r};
      border-radius: 50%;
      position: relative;
      text-indent: -9999em;
      animation: ${animName} ${f_duration} infinite linear;
      transform: translateZ(0);
    }
  `;

  return new ElementBuilder()
    .setGlobalStyle(dynamicStyle)
    .setClass(uniqueClass);
};
