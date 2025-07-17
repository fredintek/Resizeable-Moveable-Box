import { Bounds, SIDE } from "@/types/resizeableBox.types";

export const resizeBounds = (
  corner: number,
  bounds: Bounds,
  dx: number,
  dy: number
) => {
  const { height, width, x, y } = bounds;

  let newX = x;
  let newY = y;
  let newWidth = width;
  let newHeight = height;

  if (corner & SIDE.LEFT) {
    newX += dx;
    newWidth -= dx;
  }

  if (corner & SIDE.TOP) {
    newY += dy;
    newHeight -= dy;
  }

  if (corner & SIDE.RIGHT) {
    newWidth += dx;
  }

  if (corner & SIDE.BOTTOM) {
    newHeight += dy;
  }

  return {
    height: newHeight,
    width: newWidth,
    x: newX,
    y: newY,
  };
};
