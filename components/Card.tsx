import React from "react";

interface MarsWeatherCardProps {
  sol: string;
  earthDate: string;
  high: number | string;
  low: number | string;
}

const MarsWeatherCard: React.FC<MarsWeatherCardProps> = ({
  sol,
  earthDate,
  high,
  low,
}) => {
  return (
    <div  style={{ backgroundColor: "rgba(91, 91, 91, 0.3)" }} className="backdrop-blur-md text-white p-4 rounded-xl w-[150px]">
      <h3 className="text-lg font-semibold">Sol {sol}</h3>
      <p className="text-sm mb-2">{earthDate}</p>
      <hr className="border-gray-400 mb-2" />
      <p className="text-sm">
        <span className="font-semibold">High:</span> {high}°C
      </p>
      <p className="text-sm">
        <span className="font-semibold">Low:</span> {low}°C
      </p>
    </div>
  );
};

export default MarsWeatherCard;
