export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum SIDE {
  TOP = 1,
  BOTTOM = 2,
  LEFT = 4,
  RIGHT = 8,
}

export type resizeLimits =
  | {
      width: number;
      height: number;
    }
  | undefined;
