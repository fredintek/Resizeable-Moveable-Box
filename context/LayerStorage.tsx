import { Bounds, ResizeableBoxWithId } from "@/types/resizeableBox.types";
import React, { createContext, useContext, useState } from "react";

interface LayerStorageContextProps {
  boxes: Record<string, Bounds>;
  updateBoxes: (box: ResizeableBoxWithId) => void;
  getBoxes: () => Record<string, Bounds>;
  getBox: (id: string) => Bounds;
  selectedBoxesIds: string[];
  updateSelectedBoxesIds: (boxesIds: string[]) => void;
}

const LayerStorageContext = createContext<LayerStorageContextProps | undefined>(
  undefined
);

type LayerStorageProviderProps = {
  children: React.ReactNode;
};

export const LayerStorageProvider = ({
  children,
}: LayerStorageProviderProps) => {
  const [boxes, setBoxes] = useState<Record<string, Bounds>>({});
  const [selectedBoxesIds, setSelectedBoxesIds] = useState<string[]>([]);

  const updateBoxes = (box: ResizeableBoxWithId) => {
    setBoxes((preBoxes) => {
      return {
        ...preBoxes,
        [box.id]: { height: box.height, width: box.width, x: box.x, y: box.y },
      };
    });
  };

  const updateSelectedBoxesIds = (boxesIds: string[]) =>
    setSelectedBoxesIds(boxesIds);

  const getBoxes = () => boxes;
  const getBox = (id: string) => boxes[id];

  return (
    <LayerStorageContext.Provider
      value={{
        boxes,
        updateBoxes,
        getBoxes,
        getBox,
        selectedBoxesIds,
        updateSelectedBoxesIds,
      }}
    >
      {children}
    </LayerStorageContext.Provider>
  );
};

export const useLayerStorage = () => {
  const context = useContext(LayerStorageContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
