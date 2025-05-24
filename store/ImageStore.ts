import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MarsImage {
  id: number;
  cameraName: string;
  roverName: string;
  earthDate: string;
  imgSrc: string;
}

type ImageStore = {
  results: Record<string, MarsImage[]>;
  setImages: (key: string, images: MarsImage[]) => void;
  getImages: (key: string) => MarsImage[] | undefined;
};

export const useImageStore = create(
  persist<ImageStore>(
    (set, get) => ({
      results: {},
      setImages: (key, images) => {
        set((state) => ({
          results: { ...state.results, [key]: images },
        }));
      },
      getImages: (key) => get().results[key],
    }),
    {
      name: "mars-image-cache", // localStorage key
    }
  )
);