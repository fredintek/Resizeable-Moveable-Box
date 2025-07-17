import { Bounds, SIDE, resizeLimits } from "@/types/resizeableBox.types";

export const resizeBounds = (
  corner: number,
  bounds: Bounds,
  dx: number,
  dy: number,
  limits: resizeLimits
) => {
  const { height, width, x, y } = bounds;

  let newX = x;
  let newY = y;
  let newWidth = width;
  let newHeight = height;

  if (corner & SIDE.LEFT) {
    if (limits && newWidth - dx > limits.width) {
      newX += dx;
      newWidth -= dx;
    } else {
      newX += dx;
      newWidth -= dx;
    }
  }

  if (corner & SIDE.TOP) {
    if (limits && newHeight - dy > limits.height) {
      newY += dy;
      newHeight -= dy;
    } else {
      newY += dy;
      newHeight -= dy;
    }
  }

  if (corner & SIDE.RIGHT) {
    if (limits && +dx > limits.width) {
      newWidth += dx;
    } else {
      newWidth += dx;
    }
  }

  if (corner & SIDE.BOTTOM) {
    if (limits && newHeight + dy > limits.height) {
      newHeight += dy;
    } else {
      newHeight += dy;
    }
  }

  return {
    height: newHeight,
    width: newWidth,
    x: newX,
    y: newY,
  };
};
