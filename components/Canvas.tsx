"use client";
import ResizeableBox from "./ResizeableBox";
import fillColors from "./../utils/colors";
import React, { JSX, useEffect, useRef, useState } from "react";
import {
  Bounds,
  Point,
  ResizeableBoxWithId,
} from "@/types/resizeableBox.types";
import SelectionBox from "./SelectionBox";
import { getAllselectedBoxes } from "@/utils/helpers";
import { nanoid } from "nanoid";
import { useLayerStorage } from "@/context/LayerStorage";

const limit = 50;

export default function Canvas() {
  const { getBoxes, updateSelectedBoxesIds } = useLayerStorage();
  const [boxes, setBoxes] = useState<ResizeableBoxWithId[]>([]);

  const selectionNetRef = useRef<Point | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectionBoxIsVisible, setSelectionBoxIsVisible] =
    useState<boolean>(false);
  const [selectionRect, setSelectionRect] = useState<Bounds>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onCanvasMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.target === e.currentTarget) {
      selectionNetRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
      setSelectionRect({
        x: e.clientX,
        y: e.clientY,
        width: 0,
        height: 0,
      });
      setIsSelecting(true);
      setSelectionBoxIsVisible(true);
    }
  };

  const onCanvasMouseUp = (e: React.MouseEvent) => {
    if (isSelecting) {
      // get all boxes intersected
      updateSelectedBoxesIds(getAllselectedBoxes(getBoxes(), selectionRect));
    }
    setIsSelecting(false);
    setSelectionBoxIsVisible(false);
    setSelectionRect({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  };

  const onCanvasMouseMove = (e: React.MouseEvent) => {
    if (isSelecting && selectionNetRef.current) {
      const newSelectionValues: Bounds = {
        x: Math.min(selectionNetRef.current?.x, e.clientX),
        y: Math.min(selectionNetRef.current?.y, e.clientY),
        width: Math.abs(e.clientX - selectionNetRef.current.x),
        height: Math.abs(e.clientY - selectionNetRef.current.y),
      };

      setSelectionRect(newSelectionValues);
    }
  };

  useEffect(() => {
    setBoxes(
      Array.from({ length: 4 }).map((_, idx: number) => {
        const factorNum = Math.ceil(limit * Math.random() + limit);
        const colorIndex = Math.ceil(factorNum % fillColors.length);
        return {
          id: nanoid(),
          width: factorNum,
          height: factorNum,
          x: factorNum,
          y: factorNum,
          fill: fillColors[colorIndex],
        };
      })
    );
  }, []);

  return (
    <div
      onMouseDown={onCanvasMouseDown}
      onMouseUp={onCanvasMouseUp}
      onMouseMove={onCanvasMouseMove}
      className="w-screen h-screen relative py-4 border-4 border-pink-300"
    >
      {boxes?.length > 0 &&
        boxes?.map((boxItem, idx) => {
          return (
            <ResizeableBox
              id={boxItem.id}
              key={boxItem.id}
              width={boxItem.width}
              height={boxItem.height}
              x={boxItem.x}
              y={boxItem.y}
              fill={boxItem.fill}
              limits={boxItem.limits}
            />
          );
        })}

      <SelectionBox
        bounds={{ ...selectionRect }}
        isVisible={selectionBoxIsVisible}
      />
    </div>
  );
}
