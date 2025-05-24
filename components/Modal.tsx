"use client";

import { useEffect } from "react";
import { PiSmileySadLight } from "react-icons/pi";


export default function Modal({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again later.",
  onClose,
}: {
  title?: string;
  description?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [onClose]);

  return (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" >
      <div className="bg-white rounded-2xl p-6 max-w-[90%] md:max-w-[350px] lg:max-w-md shadow-lg text-center">
        <PiSmileySadLight className="text-[#c1440e] w-12 h-12 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <button
          onClick={onClose}
          className="mt-6 px-12 py-2 bg-[#c1440e] hover:bg-[#c1440ed1] text-white rounded-xl cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
