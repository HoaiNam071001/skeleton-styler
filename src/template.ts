import { ElementBuilder } from "./element-builder";

const SkeletonLineDefault = {
  w: "100%",
  h: 16,
  count: 1,
  isRandomWidth: false,
};
/**
 * Creates a single or multiple skeleton lines.
 * If count > 1, it returns a flex container.
 *
 * @param w - The width of the line or container (default: '100%')
 * @param h - The height of each line (default: 16)
 * @param count - The number of lines to create (default: 1)
 * @param isRandomWidth - If true, lines (in count > 1) will have random widths (60%-100%)
 */
export const SkeletonLine = (
  params: {
    w?: string | number;
    h?: number;
    count?: number;
    isRandomWidth?: boolean;
  } = SkeletonLineDefault
) => {
  const { w, h, count, isRandomWidth } = { ...SkeletonLineDefault, ...params };

  // --- Case 1: Single line ---
  if (count === 1) {
    // Apply random width only if specified, otherwise use 'w'
    const width = isRandomWidth ? `${Math.floor(60 + Math.random() * 40)}%` : w;
    return new ElementBuilder().markAsSkeleton().s_w(width).s_h(h).s_rounded(4);
  }

  // --- Case 2: Multiple lines ---
  // Create a container for the lines
  const container = new ElementBuilder()
    .s_flex()
    .s_flexColumn()
    .s_gap(8) // Default gap between lines
    .s_w(w); // Apply overall width to the container

  const lines: ElementBuilder[] = [];
  for (let i = 0; i < count; i++) {
    let lineWidth = "100%"; // Lines fill the container by default

    if (isRandomWidth) {
      lineWidth = `${Math.floor(60 + Math.random() * 40)}%`;
    } else if (i === count - 1) {
      // Common pattern: last line is shorter (if not random)
      lineWidth = "80%";
    }

    lines.push(
      new ElementBuilder().markAsSkeleton().s_w(lineWidth).s_h(h).s_rounded(4)
    );
  }

  container.append(...lines);
  return container;
};

/**
 * Creates a circular avatar skeleton.
 *
 * @param size - The width and height of the avatar (default: 40)
 */
export const SkeletonAvatar = (
  { size = 40 }: { size?: number } = { size: 40 }
) => new ElementBuilder().markAsSkeleton().s_w(size).s_h(size).s_roundedFull(); // 9999px border radius

/**
 * Creates a user profile skeleton (Avatar + Text lines).
 *
 * @param r - The radius of the avatar (default: 20, so size is 40)
 * @param line - The number of text lines next to the avatar (default: 1)
 */
const SkeletonUserAvatarDefault = {
  r: 20,
  line: 1,
};
export const SkeletonUserAvatar = (
  param: {
    r?: number;
    line?: number;
  } = { r: 20, line: 1 }
) => {
  const { r, line } = { ...SkeletonUserAvatarDefault, ...param };
  const avatarSize = r * 2;
  const avatar = SkeletonAvatar({ size: avatarSize });

  // Create a container for the text lines
  const textBlock = new ElementBuilder()
    .s_flexColumn()
    .s_gap(8) // Gap between lines
    .s_flex1(); // Take remaining space

  const lines: ElementBuilder[] = [];
  for (let i = 0; i < line; i++) {
    const isFirstLine = i === 0;

    // Make the first line (title) slightly taller and longer
    const h = line > 1 && isFirstLine ? 16 : 14;
    const w = line > 1 && isFirstLine ? "80%" : "60%";

    // Use SkeletonLine helper to create a single line
    lines.push(SkeletonLine({ w, h, count: 1 }));
  }
  textBlock.append(...lines);

  // Return the combined component
  return new ElementBuilder()
    .s_flex()
    .s_itemsCenter() // Vertically align avatar and text
    .s_gap(12) // Space between avatar and text
    .s_wFull() // Take full width
    .append(avatar, textBlock);
};

/**
 * Creates a button-shaped skeleton.
 *
 * @param w - The width of the button (default: 80)
 * @param h - The height of the button (default: 36)
 */
const SkeletonButtonDefault = {
  w: 80,
  h: 36,
};
export const SkeletonButton = (
  param: {
    w?: string | number;
    h?: number;
  } = { w: 80, h: 36 }
) => {
  const { w, h } = { ...SkeletonButtonDefault, ...param };
  return new ElementBuilder().markAsSkeleton().s_w(w).s_h(h).s_rounded(6);
}; // Standard button border-radius

/**
 * Creates a card skeleton (Image + Title + Paragraph).
 *
 * @param w - The width of the card (default: 300)
 */
export const SkeletonCard = (
  { w = 300 }: { w?: string | number } = { w: 300 }
) => {
  // 1. Image placeholder (aspect ratio 16:9)
  const image = new ElementBuilder()
    .markAsSkeleton()
    .s_wFull()
    .s_aspectRatio("16 / 9");

  // 2. Content block (title + paragraph)
  const content = new ElementBuilder()
    .s_p(16) // Padding for content
    .s_flexColumn()
    .s_gap(12) // Gap between title and paragraph
    .append(
      // Title line
      SkeletonLine({ w: "70%", h: 20, count: 1 }),
      // Paragraph
      SkeletonLine({ w: "100%", h: 14, count: 2, isRandomWidth: true })
    );

  // 3. The card container
  return new ElementBuilder()
    .s_w(w)
    .s_flexColumn()
    .s_border(1, "solid", "#eee") // Optional border
    .s_rounded(8)
    .s_overflowHidden() // Ensure image corners are rounded
    .append(image, content);
};


interface SkeletonTableParams {
  colW?: string | number; // <-- Đã thay đổi: không còn là mảng
  colH: number;
  spaceX: number;
  spaceY: number;
  cols: number;
  rows: number;
}

const TableConstants: SkeletonTableParams = {
  colW: undefined, // <-- Mặc định là undefined (để table tự chia)
  colH: 16,
  spaceX: 8,
  spaceY: 8,
  cols: 4,
  rows: 5,
};
/**
 * Creates a table skeleton using real <table>, <tr>, <td> tags.
 *
 * @param colW - A single width value to apply to ALL columns (e.g., 100, '20%')
 * @param colH - Height of each row's line (default: 16)
 * @param spaceX - Horizontal padding for each cell (default: 8)
 * @param spaceY - Vertical padding for each cell (default: 8)
 * @param cols - Number of columns (default: 3)
 * @param rows - Number of data rows (default: 5)
 */
export const SkeletonTable = (
  param: {
    colW?: string | number;
    colH?: number;
    spaceX?: number;
    spaceY?: number;
    cols?: number;
    rows?: number;
  } = TableConstants
) => {
  // 1. Lấy các tham số
  const {
    colW,
    colH,
    spaceX,
    spaceY,
    cols, // <-- cols bây giờ luôn là nguồn chính cho số cột
    rows,
  } = {
    ...TableConstants,
    ...param,
  } as SkeletonTableParams;

  const table = new ElementBuilder()
  .setClass('table-skeleton')
  .s_w('100%')
  .setTagName('table')
  .append(
    ...Array.from({ length: rows }).map(() =>
      new ElementBuilder()
        .setTagName('tr')
        .s_w('100%')
        .append(
          ...Array.from({ length: cols }).map(() =>
            new ElementBuilder()
              .setTagName('td')
              .s_px(spaceX)
              .s_py(spaceY)
              .append(
                new ElementBuilder()
                  .s_w(colW || '100%')
                  .s_h(colH)
                  .s_rounded(4)
                  .markAsSkeleton()
              )
          )
        )
    )
  );

  return table;
};
/**
 * Creates a sidebar skeleton.
 * Simulates a user profile and a list of navigation items.
 */
export const SkeletonSidebar = () => {
  // --- Navigation Items ---
  const navItems: ElementBuilder[] = [];
  for (let i = 0; i < 4; i++) {
    const navItem = new ElementBuilder()
      .s_flex()
      .s_itemsCenter()
      .s_gap(12)
      .append(
        SkeletonAvatar({ size: 20 }), // Icon placeholder
        SkeletonLine({ w: "70%", h: 14, count: 1 }) // Menu text
      );
    navItems.push(navItem);
  }

  // --- Main Container ---
  return new ElementBuilder()
    .s_flexColumn()
    .s_w(240) // Typical sidebar width
    .s_hFull()
    .s_p(16)
    .s_borderRight(1, "solid", "#eee")
    .append(
      // 1. User Profile Section
      SkeletonUserAvatar({ r: 24, line: 2 }),

      // 2. Nav Items Section
      new ElementBuilder()
        .s_flexColumn()
        .s_gap(16)
        .s_mt(32) // Space from profile
        .append(...navItems),

      // 3. Bottom/Logout Section
      new ElementBuilder()
        .s_flex()
        .s_itemsCenter()
        .s_gap(12)
        .s_mtAuto() // Pushes this item to the bottom
        .append(
          SkeletonAvatar({ size: 20 }), // Icon placeholder
          SkeletonLine({ w: "70%", h: 14, count: 1 }) // "Settings" or "Logout"
        )
    );
};

export const SkeletonTemplate = {
  Line: SkeletonLine,
  Avatar: SkeletonAvatar,
  UserAvatar: SkeletonUserAvatar,
  Button: SkeletonButton,
  Card: SkeletonCard,
  Table: SkeletonTable,
  Sidebar: SkeletonSidebar,
};
