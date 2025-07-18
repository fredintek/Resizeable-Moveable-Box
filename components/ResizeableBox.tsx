"use client";
import { useLayerStorage } from "@/context/LayerStorage";
import { Bounds, ResizeableBoxProps, SIDE } from "@/types/resizeableBox.types";
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

export default function ResizeableBox({
  id,
  x,
  y,
  width,
  height,
  limits,
  fill = "#ef4444",
}: ResizeableBoxProps) {
  const { updateBoxes, selectedBoxesIds } = useLayerStorage();
  const [bounds, setBounds] = useState<Bounds>({
    height,
    width,
    x,
    y,
  });
  const [draggingType, setDraggingType] = useState<
    null | "moving" | "resizing"
  >(null);

  const dragging = useRef<
    | {
        type: "resizing";
        side: number;
        startX: number;
        startY: number;
        startBound: Bounds;
      }
    | {
        type: "moving";
        startX: number;
        startY: number;
        startBound: Bounds;
      }
    | null
  >(null);

  const onHandleMouseDown = (side: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dragging.current = {
      type: "resizing",
      side,
      startX: e.clientX,
      startY: e.clientY,
      startBound: { ...bounds },
    };

    setDraggingType("resizing");
  };

  const onBoxMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dragging.current = {
      type: "moving",
      startX: e.clientX,
      startY: e.clientY,
      startBound: { ...bounds },
    };
    setDraggingType("moving");
  };

  const onMouseMove = (e: MouseEvent) => {
    const dragState = dragging.current;
    if (!dragState) return;

    const dy = e.clientY - dragState?.startY;
    const dx = e.clientX - dragState?.startX;
    if (dragState.type === "resizing") {
      const newValues = resizeBounds(
        dragState?.side,
        dragState?.startBound,
        dx,
        dy,
        limits
      );
      setBounds(newValues);
      updateBoxes({
        id,
        ...newValues,
      });
    }

    if (dragState.type === "moving") {
      // console.log("startingX", dragState?.startX);
      // console.log("startingY", dragState?.startY);
      // console.log("dx", dx);
      // console.log("dy", dy);

      setBounds((prevBounds) => {
        return {
          ...dragState.startBound,
          x: dragState.startBound.x + dx,
          y: dragState.startBound.y + dy,
        };
      });
      updateBoxes({
        id,
        x: dragState.startBound.x + dx,
        y: dragState.startBound.y + dy,
        width: dragState.startBound.width,
        height: dragState.startBound.height,
      });
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!dragging?.current) return;

    dragging.current = null;
    setDraggingType(null);
  };

  // console.log("dragging", dragging?.current);

  useEffect(() => {
    updateBoxes({
      id,
      width,
      height,
      x,
      y,
    });

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      onMouseDown={(e) => onBoxMouseDown(e)}
      className={`absolute rounded-lg overflow-hidden ${
        draggingType === "moving" ? "cursor-grabbing" : "cursor-grab"
      } ${
        selectedBoxesIds.includes(id)
          ? "border-2 border-black border-dashed"
          : ""
      }`}
      style={{
        width: bounds.width,
        height: bounds.height,
        left: bounds.x,
        top: bounds.y,
        backgroundColor: `${fill}`,
      }}
    >
      {handles?.map((handle: any, idx: number) => (
        <div
          style={{
            ...handle?.style,
          }}
          key={idx}
          className="absolute w-[14px] h-[14px]"
          onMouseDown={(e) => onHandleMouseDown(handle.side, e)}
        ></div>
      ))}
    </div>
  );
}
