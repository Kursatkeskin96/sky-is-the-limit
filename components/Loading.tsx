import React from "react";
import { RingLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RingLoader
        color={"#FF8854"}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
