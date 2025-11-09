import { ElementBuilder } from "../element-builder";

/**
 * Creates a Flex container.
 * @param {object} params - Configuration object.
 * @param {"row" | "column"} [params.direction="row"] - The flex direction.
 * @param {string | number} [params.gap=8] - The gap between items.
 */
export const SkeletonFlex = ({
  direction = "row",
  gap = 8,
}: {
  direction?: "row" | "column";
  gap?: string | number;
} = {}) => {
  const flex = new ElementBuilder();

  if (direction === "column") {
    flex.s_flexColumn();
  } else {
    flex.s_flexRow();
  }

  flex.s_gap(gap ?? 8);
  return flex;
};

/**
 * Creates a Flex container centered on both axes.
 * @param {object} params - Configuration object.
 * @param {"row" | "column"} [params.direction="row"] - The flex direction.
 * @param {string | number} [params.gap=8] - The gap between items.
 */
export const SkeletonFlexCenter = ({
  direction = "row",
  gap = 8,
}: {
  direction?: "row" | "column";
  gap?: string | number;
} = {}) => {
  const flex = SkeletonFlex({ direction: direction ?? "row", gap: gap ?? 8 });

  flex.s_justifyCenter().s_itemsCenter();

  return flex;
};

/**
 * Creates a CSS Grid container.
 * @param {object} params - Configuration object.
 * @param {number} [params.cols=3] - Number of grid columns.
 * @param {string | number} [params.gap=8] - The gap between items.
 */
export const SkeletonGrid = ({
  cols = 3,
  gap = 8,
}: {
  cols?: number;
  gap?: string | number;
} = {}) => {
  return new ElementBuilder()
    .s_grid()
    .s_style("grid-template-columns", `repeat(${cols}, 1fr)`)
    .s_gap(gap);
};
