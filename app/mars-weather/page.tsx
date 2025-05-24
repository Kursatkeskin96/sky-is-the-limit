"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import MarsWeatherCard from "@/components/Card";
import Modal from "@/components/Modal";
import WindDirectionChart from "@/components/WindDirectionChart";
import api from "@/app/api/api";

interface WindDirectionData {
  compass_point: string;
  ct: number;
}

interface WeatherData {
  AT?: {
    av: number;
    ct: number;
    mn: number;
    mx: number;
  };
  PRE?: {
    av: number;
  };
  HWS?: {
    av: number;
  };
  Season?: string;
  First_UTC?: string;
  WD?: Record<string, WindDirectionData>;
}

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [marsWeather, setMarsWeather] = useState<Record<string, WeatherData>>(
    {}
  );
  const [selectedSol, setSelectedSol] = useState<string | null>(null);
  const [sols, setSols] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarsWeather = async () => {
      setLoading(true);
      try {
        const res = await api.get("/insight_weather/", {
          params: {
            feedtype: "json",
            ver: 1.0,
            api_key: process.env.NEXT_PUBLIC_NASA_API_KEY,
          },
        });

        const data = res.data;
        const sol_keys: string[] = data.sol_keys;
        const weatherData: Record<string, WeatherData> = {};

        sol_keys.forEach((sol) => {
          weatherData[sol] = data[sol];
        });

        setSols(sol_keys);
        setMarsWeather(weatherData);
      } catch (error) {
        console.error("Failed to fetch Mars weather:", error);
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMarsWeather();
  }, []);

  if (loading) {
    return <Loading />;
  }
  
  const generateDirectionData = (sol: string): Record<string, number> => {
    const wd = marsWeather[sol]?.WD;
    if (!wd) return {};

    const frequencyMap: Record<string, number> = {};

    Object.entries(wd).forEach(([key, val]) => {
      if (key === "most_common") return;
      const point = val.compass_point;
      const count = val.ct;
      if (point && count) {
        frequencyMap[point] = (frequencyMap[point] || 0) + count;
      }
    });

    return frequencyMap;
  };

  const primarySol = sols[0];
  const secondarySols = sols.slice(1);

  const formatDate = (isoString?: string) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 min-h-screen">
      <div
        className="w-full h-auto xl:h-[500px] bg-cover bg-no-repeat p-[24px]"
        style={{ backgroundImage: "url('/mars-weather.webp')" }}
      >
        <h1 className="text-[#FF8854] text-[24px] font-semibold">
          Mars Weather
        </h1>
        <p className="text-[#e2e1e1] text-[14px] mt-2 max-w-[80%]">
          Daily atmospheric data from NASA&apos;s InSight lander, including
          temperature highs and lows recorded on Mars.
        </p>

        {/* Primary Sol section */}
        {primarySol && (
          <div className="flex justify-start items-start mt-[48px] gap-10">
            <div>
              <h3 className="text-white text-[22px]">Sol {primarySol}</h3>
              <p className="text-[18px] text-[#e2e1e1]">
                {formatDate(marsWeather[primarySol]?.First_UTC)}
              </p>
            </div>
            <div>
              <h5 className="text-[#e2e1e1] text-[14px] pt-1">
                High:{" "}
                <span className="text-white font-semibold">
                  {Math.round(marsWeather[primarySol]?.AT?.mx ?? 0)}°C
                </span>
              </h5>
              <h5 className="text-[#e2e1e1] text-[14px] pt-3">
                Low:{" "}
                <span className="text-white font-semibold">
                  {Math.round(marsWeather[primarySol]?.AT?.mn ?? 0)}°C
                </span>
              </h5>
            </div>
          </div>
        )}

        {/* Cards for other Sols */}
        <div className="mt-[48px] flex flex-wrap gap-6 lg:justify-between">
          {secondarySols.map((sol) => {
            const weather = marsWeather[sol];
            return (
              <MarsWeatherCard
                key={sol}
                sol={sol}
                earthDate={formatDate(weather?.First_UTC)}
                high={
                  weather?.AT?.mx !== undefined
                    ? Math.round(weather.AT.mx)
                    : "N/A"
                }
                low={
                  weather?.AT?.mn !== undefined
                    ? Math.round(weather.AT.mn)
                    : "N/A"
                }
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-start  mt-[42px] flex-wrap">
        <div className="flex-col xl:max-w-[50%]">
          <h2 className="text-[#FF8854] pb-4  text-[24px] text-left font-semibold">
            Wind direction
          </h2>
          <p className="text-[#e2e1e1]">
            Pick a Sol to explore how the Martian winds were blowing that day.
          </p>
          <select
            value={selectedSol ?? ""}
            onChange={(e) => setSelectedSol(e.target.value)}
            className="p-2 rounded bg-black text-white border border-gray-600 mt-4 focus:outline-none focus:ring-2 focus:ring-[#FF8854]"
          >
            <option value="" disabled>
              Select a Sol
            </option>
            {sols.map((sol) => (
              <option key={sol} value={sol}>
                Sol {sol}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 mt-4 lg:mt-0">
          {/* Wind direction chart */}
          {selectedSol && (
            <WindDirectionChart
              frequencyData={generateDirectionData(selectedSol)}
            />
          )}
        </div>
      </div>
      {/* Modal for error handling */}
      {showModal && (
        <Modal
          title="Something went wrong"
          description="We ran into an issue while loading the data. Please try again in a moment."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
