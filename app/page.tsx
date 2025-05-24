"use client";
import Image from "next/image";
import TechStack from "@/components/TechStack";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import api from "./api/api";
import Modal from "@/components/Modal";
import mars from "@/lib/images/mars.webp";
import { ApodData } from "@/lib/types";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [apod, setApod] = useState<ApodData>({
    url: "",
    title: "",
    explanation: "",
  });

  useEffect(() => {
    const fetchApod = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/planetary/apod");
        setApod({
          url: data.url,
          title: data.title,
          explanation: data.explanation,
        });
      } catch (err) {
        console.error("Failed to fetch APOD:", err);
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto  px-4 md:px-8 xl:px-0">
      <div className="flex justify-between items-center mt-[42px] flex-wrap">
        <div className="flex-col xl:max-w-[50%]">
          <h1 className="text-[#FF8854] pb-4  text-[24px] font-semibold">
            About this project
          </h1>
          <p className="text-[#e2e1e1]">
            The name <span className="font-semibold">Sky Is The Limit</span>{" "}
            reflects both the theme and the mindset behind this project.
            It&apos;s not just about space, it&apos;s about showcasing my skills
            as a frontend developer while expressing{" "}
            <span className="font-semibold">
              my passion for continuous learning
            </span>
            . In tech, there&apos;s always something new to discover. I see the
            sky as my only limit—a symbol of infinite growth in the world of
            development.
          </p>
          <p className="text-[#e2e1e1] pt-4">
            This project includes loading states, error handling, and dynamic
            filtering by camera categories to retrieve specific sets of images
            from NASA&apos;s Mars Rover API. It&apos;s fully responsive across
            devices, ensuring a seamless experience on mobile and desktop.
            You&apos;ll explore the Astronomy Picture of the Day (APOD), which
            features daily imagery and insights from deep space. The project
            also includes Mars Rover Imagery, showcasing real photos captured by
            NASA&apos;s rovers on the Martian surface. Additionally,
            there&apos;s a Mars Weather Dashboard that presents detailed
            atmospheric data along with a polar chart visualizing wind
            direction, offering an interactive look into the Martian climate.
          </p>
        </div>
        <Image
          src={mars}
          width={500}
          alt="earth"
          className="flex md:hidden lg:hidden xl:flex"
        />
      </div>
      <div>
        <h2 className="text-[#FF8854] pb-4  text-[24px] mt-[82px] text-center font-semibold">
          Tech stack
        </h2>
        <TechStack />
      </div>
      {apod.url && apod.url !== "" && apod.url.endsWith(".jpg") && (
        <>
          <h3 className="text-[#FF8854] pb-4  text-[24px] mt-[82px] text-center font-semibold">
            Astronomy picture of the day
          </h3>
          <div className="flex justify-between items-center flex-wrap">
            <Image
              src={apod.url}
              alt="apod"
              width={500}
              height={300}
              className="mt-8 rounded-lg mx-auto"
            />
            <div className="flex-col xl:max-w-[50%] mt-4 xl:mt-0">
              <h4 className="text-white text-left text-[18px] ">{apod.title}</h4>
              <p className="text-[#e2e1e1] text-left text-[14px] mt-4">
                {apod.explanation}
              </p>
            </div>
          </div>
        </>
      )}
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
