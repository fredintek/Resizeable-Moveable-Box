"use client";
import React from "react";
import { LayerStorageProvider } from "@/context/LayerStorage";

type AppWrapperProps = {
  children: React.ReactNode;
};

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <>
      <LayerStorageProvider>{children}</LayerStorageProvider>
    </>
  );
}
