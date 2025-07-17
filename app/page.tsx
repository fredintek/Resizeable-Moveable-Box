import ResizeableBox from "@/components/ResizeableBox";

export default function Home() {
  return (
    <div className="w-screen h-screen relative py-4">
      <p className="text-lg italic font-medium text-center">
        Resizeable And Moveable Box
      </p>
      <ResizeableBox />
    </div>
  );
}
