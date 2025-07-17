"use client";
import { Bounds, SIDE } from "@/types/resizeableBox.types";
import { resizeBounds } from "@/utils/resizeBounds";
import { useEffect, useRef, useState } from "react";

const handles = [
  // corners
  {
    side: SIDE.TOP | SIDE.LEFT,
    style: { top: 0, left: 0, cursor: "nwse-resize" },
  },
  {
    side: SIDE.TOP | SIDE.RIGHT,
    style: { top: 0, right: 0, cursor: "nesw-resize" },
  },
  {
    side: SIDE.BOTTOM | SIDE.LEFT,
    style: { bottom: 0, left: 0, cursor: "nesw-resize" },
  },
  {
    side: SIDE.BOTTOM | SIDE.RIGHT,
    style: { bottom: 0, right: 0, cursor: "nwse-resize" },
  },

  // sides
  {
    side: SIDE.TOP,
    style: {
      top: 0,
      left: "50%",
      transform: "TranslateX(-50%)",
      cursor: "ns-resize",
    },
  },
  {
    side: SIDE.BOTTOM,
    style: {
      bottom: 0,
      left: "50%",
      transform: "TranslateX(-50%)",
      cursor: "ns-resize",
    },
  },
  {
    side: SIDE.LEFT,
    style: {
      left: 0,
      top: "50%",
      transform: "TranslateY(-50%)",
      cursor: "ew-resize",
    },
  },
  {
    side: SIDE.RIGHT,
    style: {
      right: 0,
      top: "50%",
      transform: "TranslateY(-50%)",
      cursor: "ew-resize",
    },
  },
];

export default function ResizeableBox() {
  const [bounds, setBounds] = useState<Bounds>({
    height: 100,
    width: 150,
    x: 100,
    y: 100,
  });

  const dragging = useRef<{
    side: number;
    startX: number;
    startY: number;
    startBound: Bounds;
  } | null>(null);

  const onMouseDown = (side: number, e: React.MouseEvent) => {
    dragging.current = {
      side,
      startX: e.clientX,
      startY: e.clientY,
      startBound: { ...bounds },
    };

    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging?.current) return;

    // console.log("X", e.clientX);
    // console.log("Y", e.clientY);

    const dy = e.clientY - dragging?.current?.startY;
    const dx = e.clientX - dragging?.current?.startX;

    // console.log("DY", dy);
    // console.log("DX", dx);

    const newValues = resizeBounds(
      dragging?.current?.side,
      dragging?.current?.startBound,
      dx,
      dy
    );

    // console.log("newValues", newValues);
    setBounds(newValues);
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!dragging?.current) return null;

    dragging.current = null;
  };

  // console.log("dragging", dragging?.current);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      className="bg-red-500 absolute rounded-lg overflow-hidden"
      style={{
        width: bounds.width,
        height: bounds.height,
        left: bounds.x,
        top: bounds.y,
      }}
    >
      {handles?.map((handle: any, idx: number) => (
        <div
          style={{
            ...handle?.style,
          }}
          key={idx}
          className="absolute bg-blue-500 w-[14px] h-[14px]"
          onMouseDown={(e) => onMouseDown(handle.side, e)}
        ></div>
      ))}
    </div>
  );
}
