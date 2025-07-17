import { Bounds } from "@/types/resizeableBox.types";

const selectionCondition = (
  selectionType: "partial" | "full",
  box: Bounds,
  selectionRect: Bounds
) => {
  const partialSelectionCondition =
    box.x < selectionRect.x + selectionRect.width &&
    box.x + box.width > selectionRect.x &&
    box.y < selectionRect.y + selectionRect.height &&
    box.y + box.height > selectionRect.y;

  const fullSelectionCondition =
    box.x > selectionRect.x &&
    box.x + box.width < selectionRect.x + selectionRect.width &&
    box.y > selectionRect.y &&
    box.y + box.height < selectionRect.y + selectionRect.height;

  if (selectionType === "partial") {
    return partialSelectionCondition;
  }
  if (selectionType === "full") {
    return fullSelectionCondition;
  }
};

export const getAllselectedBoxes = (
  boxes: Record<string, Bounds>,
  selectionRect: Bounds
) => {
  let targetIds: string[] = [];
  // console.log("boxes", Object.entries(boxes));
  for (const [id, box] of Object.entries(boxes)) {
    // console.log(id, "-->", box);
    if (selectionCondition("partial", box, selectionRect)) {
      targetIds.push(id);
    } else {
      continue;
    }
  }

  return targetIds;
};
