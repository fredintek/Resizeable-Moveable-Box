import { Bounds } from "@/types/resizeableBox.types";

type SelectionBoxProps = {
  bounds: Bounds;
  isVisible?: boolean;
};

export default function SelectionBox({
  bounds,
  isVisible = false,
}: SelectionBoxProps) {
  return (
    <div
      className={`border-2 border-pink-300 border-dashed bg-transparent absolute z-50 ${
        isVisible ? "opacity-1 visible" : "opacity-0 invisible"
      }`}
      style={{
        width: bounds.width,
        height: bounds.height,
        left: bounds.x,
        top: bounds.y,
      }}
    ></div>
  );
}
