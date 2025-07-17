import ResizeableBox from "@/components/ResizeableBox";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen relative py-4">
      <p className="text-lg italic font-medium text-center">Resizeable Box</p>
      <ResizeableBox />
    </div>
  );
}
