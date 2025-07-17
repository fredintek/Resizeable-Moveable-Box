export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

export enum SIDE {
  TOP = 1,
  BOTTOM = 2,
  LEFT = 4,
  RIGHT = 8,
}

export type ResizeableBoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  limits?: resizeLimits;
  fill?: string;
};

export type resizeLimits =
  | {
      width: number;
      height: number;
    }
  | undefined;
