import {
  SkeletonAvatar,
  SkeletonLine,
  SkeletonUserAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonTable,
  SkeletonSidebar,
} from "./component";

import { SkeletonBlock, SkeletonFlex, SkeletonFlexCenter, SkeletonGrid } from "./layout";
import {
  SkeletonClipLoader,
  SkeletonDotLoading,
  SkeletonLegacySpinner,
  SkeletonMaskedSpinner,
} from "./loading";

export * from "./component";
export * from "./layout";
export * from "./loading";

export const SkeletonTemplate = {
  Line: SkeletonLine,
  Avatar: SkeletonAvatar,
  UserAvatar: SkeletonUserAvatar,
  Button: SkeletonButton,
  Card: SkeletonCard,
  Table: SkeletonTable,
  Sidebar: SkeletonSidebar,
  Flex: SkeletonFlex,
  FlexCenter: SkeletonFlexCenter,
  Grid: SkeletonGrid,
  Block: SkeletonBlock,
  Loading: {
    DotLoading: SkeletonDotLoading,
    LegacySpinner: SkeletonLegacySpinner,
    ClipLoader: SkeletonClipLoader,
    MaskedSpinner: SkeletonMaskedSpinner,
  },
};
