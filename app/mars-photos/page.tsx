"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { cameraData } from "@/lib/data/cameraData";
import { useImageStore } from "@/store/ImageStore";
import api from "../api/api";
import Image from "next/image";
import type { NasaPhotoResponse } from "@/lib/types";

const roverOptions = ["Curiosity"] as const;
type Rover = (typeof roverOptions)[number];
type ImageItem = {
  id: number;
  cameraName: string;
  roverName: string;
  earthDate: string;
  imgSrc: string;
};

export default function RoverCameraAccordion() {
  const { setImages: cacheImages, getImages } = useImageStore();

  const [openCameras, setOpenCameras] = useState<boolean>(false);
  const [openImages, setOpenImages] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRover, setSelectedRover] = useState<Rover | "">("");
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [images, setImages] = useState<ImageItem[]>([]);

  const getAvailableCameras = () => {
    return cameraData.filter(
      (camera) =>
        camera.curiosity && !["MARDI", "MAHLI"].includes(camera.abbreviation)
    );
  };

  const handleSearch = async () => {
    const key = `${selectedRover.toLowerCase()}-${selectedCamera}`;
    const cached = getImages(key);

    setImages([]);
    if (cached) {
      setImages(cached);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get<NasaPhotoResponse>(
        `/mars-photos/api/v1/rovers/${selectedRover.toLowerCase()}/photos`,
        {
          params: {
            sol: 1000,
          },
        }
      );
      const filtered: ImageItem[] = data.photos
        .filter(
          (photo) =>
            photo.camera.name.toLowerCase() === selectedCamera.toLowerCase()
        )
        .slice(0, 10)
        .map((photo) => ({
          id: photo.id,
          cameraName: photo.camera.full_name,
          roverName: photo.rover.name,
          earthDate: photo.earth_date,
          imgSrc: photo.img_src,
        }));

      cacheImages(key, filtered);
      setImages(filtered);
    } catch (err) {
      console.error("API fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 min-h-screen">
      {/* Rover Camera Types Accordion */}
      <div className="border border-gray-700 rounded-xl overflow-hidden mt-8">
        <button
          onClick={() => setOpenCameras(!openCameras)}
          className="w-full px-6 py-4 bg-[#111827] text-white text-xl font-semibold hover:bg-[#1f2937] transition-colors flex justify-between items-center cursor-pointer"
        >
          <span className="playfair">Rover Camera Types</span>
          {openCameras ? (
            <FiChevronUp size={24} />
          ) : (
            <FiChevronDown size={24} />
          )}
        </button>

        {openCameras && (
          <div className="p-4 bg-transparent">
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-left text-white border border-gray-700 bg-transparent">
                <thead className="bg-transparent border-b border-gray-600">
                  <tr>
                    <th className="px-4 py-3">Abbreviation</th>
                    <th className="px-4 py-3">Camera</th>
                    <th className="px-4 py-3">Curiosity</th>
                    <th className="px-4 py-3">Opportunity</th>
                    <th className="px-4 py-3">Spirit</th>
                  </tr>
                </thead>
                <tbody>
                  {cameraData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="px-4 py-3">{row.abbreviation}</td>
                      <td className="px-4 py-3">{row.name}</td>
                      <td className="px-4 py-3 text-center">
                        {row.curiosity ? "✔️" : ""}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.opportunity ? "✔️" : ""}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.spirit ? "✔️" : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Mars Images Accordion */}
      <div className="border border-gray-700 rounded-xl overflow-hidden mt-8">
        <button
          onClick={() => setOpenImages(!openImages)}
          className="w-full px-6 py-4 bg-[#111827] text-white text-xl font-semibold hover:bg-[#1f2937] transition-colors flex justify-between items-center cursor-pointer"
        >
          <span className="playfair">Mars Images</span>
          {openImages ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </button>

        {openImages && (
          <div className="p-6 flex flex-col gap-8 ">
            <p className="text-xs text-[#FF8854] p-2 bg-[#c1440e1e]">
              ⚠️ <strong>Important:</strong> Only the <strong>Curiosity</strong>{" "}
              rover is available for image browsing. The other rovers (
              <strong>Opportunity</strong> and <strong>Spirit</strong>) return
              invalid image data (HTML instead of images), which cannot be
              rendered. <br />
              Additionally, cameras like <strong>MARDI</strong> and{" "}
              <strong>MAHLI</strong> are excluded due to limited or unsupported
              image formats.
            </p>

            <div className="flex justify-start items-end gap-10 flex-wrap">
              {/* Rover Select */}
              <div>
                <label className="block text-white mb-1">Select Rover</label>
                <select
                  value={selectedRover}
                  onChange={(e) => {
                    setSelectedRover(e.target.value as Rover);
                    setSelectedCamera("");
                    setImages([]);
                  }}
                  className="p-2 rounded bg-black text-white border border-gray-600 w-full max-w-sm"
                >
                  <option value="" disabled>
                    Select a Rover
                  </option>
                  {roverOptions.map((rover) => (
                    <option key={rover} value={rover}>
                      {rover}
                    </option>
                  ))}
                </select>
              </div>

              {/* Camera Select */}
              {selectedRover && (
                <div>
                  <label className="block text-white mb-1">Select Camera</label>
                  <select
                    value={selectedCamera}
                    onChange={(e) => setSelectedCamera(e.target.value)}
                    className="p-2 rounded bg-black text-white border border-gray-600 w-full max-w-sm"
                  >
                    <option value="" disabled>
                      Select a Camera
                    </option>
                    {getAvailableCameras().map((camera) => (
                      <option
                        key={camera.abbreviation}
                        value={camera.abbreviation}
                      >
                        {camera.abbreviation} - {camera.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Search Button */}
              {selectedRover && selectedCamera && (
                <button
                  onClick={handleSearch}
                  className="h-[38px] w-[100px] bg-[#FF8854] text-white rounded hover:bg-[#ff6d2c] transition cursor-pointer"
                >
                  Search
                </button>
              )}
            </div>

            {/* Images Display */}
            {loading && (
              <div className="flex justify-center items-center w-full">
                <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
              </div>
            )}
            {images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="bg-black/30 border border-gray-700 rounded-xl p-4"
                  >
                    <Image
                      src={img.imgSrc}
                      alt="Mars"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg mb-3"
                    />

                    <p className="text-white text-sm">
                      <span className="font-semibold">Camera:</span>{" "}
                      {img.cameraName}
                    </p>
                    <p className="text-white text-sm">
                      <span className="font-semibold">Rover:</span>{" "}
                      {img.roverName}
                    </p>
                    <p className="text-white text-sm">
                      <span className="font-semibold">Earth Date:</span>{" "}
                      {img.earthDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
